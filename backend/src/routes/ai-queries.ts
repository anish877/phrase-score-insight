import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { aiQueryService } from '../services/aiQueryService';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Define the models that will be displayed to the frontend
const DISPLAY_MODELS: ('GPT-4o' | 'Claude 3' | 'Gemini 1.5')[] = ['GPT-4o', 'Claude 3', 'Gemini 1.5'];

// All models will use GPT-4o under the hood
const AI_MODELS: ('GPT-4o' | 'Claude 3' | 'Gemini 1.5')[] = ['GPT-4o', 'Claude 3', 'Gemini 1.5'];

// Fallback models when timeouts are frequent
const FALLBACK_MODELS: ('GPT-4o' | 'Claude 3')[] = ['GPT-4o', 'Claude 3'];

// Rate limiting: track active requests per domain with cleanup
const activeRequests = new Map<number, number>();
const MAX_CONCURRENT_REQUESTS = 2;

// Track timeout frequency to switch to fallback models
const timeoutTracker = new Map<string, number>();
const TIMEOUT_THRESHOLD = 3; // Switch to fallback after 3 timeouts

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [domainId, count] of Array.from(activeRequests.entries())) {
    if (count === 0) {
      activeRequests.delete(domainId);
    }
  }
  
  // Reset timeout tracker every 10 minutes to allow retry with full models
  for (const [domainKey, count] of Array.from(timeoutTracker.entries())) {
    if (count > 0) {
      console.log(`Resetting timeout count for ${domainKey} (was ${count})`);
      timeoutTracker.set(domainKey, 0);
    }
  }
}, 5 * 60 * 1000);

// AI-powered scoring logic with timeout
async function scoreResponseWithAI(phrase: string, response: string, model: string, domain?: string, location?: string) {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Scoring timeout')), 60000)
  );
  
  try {
    return await Promise.race([
      aiQueryService.scoreResponse(phrase, response, model, domain, location),
      timeoutPromise
    ]);
  } catch (error) {
    // Robust fallback scoring: extract URLs, domains, and compute true visibility and ranking
    const lowerResponse = response.toLowerCase();
    const tokens = phrase.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const hasQueryTerms = tokens.some(term => lowerResponse.includes(term));
    const responseLength = response.length;
    const hasSubstantialContent = responseLength > 200;
    const hasProfessionalTone = !lowerResponse.includes('error') && responseLength > 120;

    // Extract URLs and domains in order of appearance
    const urlRegex = /https?:\/\/[^\s\)\]}"']+/g;
    const urls: string[] = response.match(urlRegex) || [];
    const allDomains: string[] = urls.map(u => {
      try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
    }).filter(Boolean);

    // Determine target domain presence and rank
    let presence = 0;
    let domainRank = 0;
    let foundDomains: string[] = [];
    if (domain) {
      const target = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
      for (let i = 0; i < allDomains.length; i++) {
        const d = allDomains[i];
        if (d === target || d.endsWith('.' + target) || target.endsWith('.' + d)) {
          presence = 1;
          domainRank = i + 1; // 1-based rank
          break;
        }
      }
    }
    // foundDomains includes all unique domains mentioned (excluding empty)
    foundDomains = Array.from(new Set(allDomains));

    // Competitor URLs: exclude target domain
    const competitorUrls = urls.filter((u, idx) => {
      const d = allDomains[idx];
      if (!domain) return true;
      const target = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
      return !(d === target || d.endsWith('.' + target) || target.endsWith('.' + d));
    }).slice(0, 8);

    // Heuristic competitor match score
    let competitorMatchScore = 58;
    if (competitorUrls.length >= 3) competitorMatchScore += 10;
    if (/(best|top|compare|vs|alternative|review)/i.test(lowerResponse)) competitorMatchScore += 8;
    competitorMatchScore = Math.min(92, competitorMatchScore);

    // Confidence based on evidence in response (calibrated)
    let confidence = 45;
    if (urls.length >= 1) confidence += 10;
    if (urls.length >= 3) confidence += 6;
    if (presence) confidence += 6;
    if (hasSubstantialContent) confidence += 5;
    confidence = Math.min(92, confidence);

    // Score components prioritizing visibility and ranking
    const relevance = presence ? (hasSubstantialContent ? 5 : 4) : (hasQueryTerms ? 3 : 2);
    const accuracy = (urls.length > 0 ? 4 : 3) + (hasProfessionalTone ? 1 : 0);
    const sentiment = hasProfessionalTone ? 4 : 3;
    const overallBase = presence ? 4 : 3;
    const overall = Math.max(1, Math.min(5, overallBase + (hasSubstantialContent ? 1 : 0)));

    return {
      presence,
      relevance,
      accuracy: Math.min(5, accuracy),
      sentiment,
      overall,
      domainRank,
      foundDomains,
      confidence,
      sources: urls.length ? ['Links Detected'] : ['AI Analysis'],
      competitorUrls,
      competitorMatchScore
    };
  }
}

async function calculateComprehensiveStats(results: any[], domainId: number) {
  console.log('calculateComprehensiveStats called with results:', results.length, 'items');
  
  const modelStats: Record<string, any> = {};
  let total = 0, presence = 0, relevance = 0, accuracy = 0, sentiment = 0, overall = 0;
  
  // Track competitors and insights
  const competitors = new Map<string, { frequency: number; threatLevel: string; marketShare: number; lastSeen: Date }>();
  const strengths: any[] = [];
  const weaknesses: any[] = [];
  const opportunities: any[] = [];
  const threats: any[] = [];
  
  for (const r of results) {
    // Skip invalid results
    if (!r || !r.model || !r.scores) {
      console.warn('Skipping invalid result:', r);
      continue;
    }
    
    if (!modelStats[r.model]) {
      modelStats[r.model] = { 
        total: 0, 
        presence: 0, 
        relevance: 0, 
        accuracy: 0, 
        sentiment: 0, 
        overall: 0,
        latency: 0,
        cost: 0
      };
    }
    
    // Ensure scores are numbers
    const presenceScore = Number(r.scores.presence) || 0;
    const relevanceScore = Number(r.scores.relevance) || 0;
    const accuracyScore = Number(r.scores.accuracy) || 0;
    const sentimentScore = Number(r.scores.sentiment) || 0;
    const overallScore = Number(r.scores.overall) || 0;
    
    modelStats[r.model].total++;
    modelStats[r.model].presence += presenceScore;
    modelStats[r.model].relevance += relevanceScore;
    modelStats[r.model].accuracy += accuracyScore;
    modelStats[r.model].sentiment += sentimentScore;
    modelStats[r.model].overall += overallScore;
    modelStats[r.model].latency += Number(r.latency) || 0;
    modelStats[r.model].cost += Number(r.cost) || 0;
    
    total++;
    presence += presenceScore;
    relevance += relevanceScore;
    accuracy += accuracyScore;
    sentiment += sentimentScore;
    overall += overallScore;
    
    // Track competitors (unchanged logic but with safer parsing already)
    if (r.scores.competitorUrls && Array.isArray(r.scores.competitorUrls)) {
      r.scores.competitorUrls.forEach((url: string) => {
        try {
          const domain = new URL(url).hostname;
          const existing = competitors.get(domain);
          const threatLevel = r.scores.competitorMatchScore > 0.7 ? 'High' : 
                             r.scores.competitorMatchScore > 0.4 ? 'Medium' : 'Low';
          
          if (existing) {
            existing.frequency += 1;
            existing.lastSeen = new Date();
          } else {
            competitors.set(domain, {
              frequency: 1,
              threatLevel,
              marketShare: Math.round((r.scores.competitorMatchScore || 0) * 100),
              lastSeen: new Date()
            });
          }
        } catch (e) {
          console.warn('Invalid competitor URL:', url);
        }
      });
    }
    
    // Generate insights based on scores
    if (relevanceScore >= 4.0) {
      strengths.push({
        area: 'Content Relevance',
        score: Math.round(relevanceScore * 20),
        description: `Strong relevance for "${r.phrase}" - AI models rate this content highly relevant`
      });
    }
    
    if (accuracyScore >= 4.0) {
      strengths.push({
        area: 'Content Accuracy',
        score: Math.round(accuracyScore * 20),
        description: `High accuracy for "${r.phrase}" - Content is rated as trustworthy and accurate`
      });
    }
    
    if (presenceScore < 0.5) {
      weaknesses.push({
        area: 'Domain Visibility',
        score: Math.round(presenceScore * 100),
        description: `Low domain presence for "${r.phrase}" - Domain not appearing in AI responses`
      });
    }
    
    if (overallScore < 2.5) {
      weaknesses.push({
        area: 'Overall Performance',
        score: Math.round(overallScore * 20),
        description: `Poor overall performance for "${r.phrase}" - Multiple metrics need improvement`
      });
    }
    
    if (presenceScore < 0.7 && relevanceScore >= 3.0) {
      opportunities.push({
        area: 'Visibility Improvement',
        potential: '40-60% increase',
        action: `Optimize content for "${r.phrase}" - High relevance but low visibility`
      });
    }
    
    if (relevanceScore < 3.5 && presenceScore > 0.5) {
      opportunities.push({
        area: 'Content Enhancement',
        potential: '25-35% improvement',
        action: `Enhance content relevance for "${r.phrase}" - Visible but needs better relevance`
      });
    }
  }
  
  // Analyze threats from competitors
  const highThreatCompetitors = Array.from(competitors.values()).filter(c => c.threatLevel === 'High');
  if (highThreatCompetitors.length > 0) {
    threats.push({
      area: 'Competitive Pressure',
      risk: `${highThreatCompetitors.length} high-threat competitors identified`,
      mitigation: 'Focus on unique value propositions and niche market positioning'
    });
  }
  
  // Calculate averages for model stats
  Object.keys(modelStats).forEach(model => {
    const stats = modelStats[model];
    if (stats.total > 0) {
      // avgPresence in percent (0-100)
      stats.avgPresence = Math.round((stats.presence / stats.total) * 100);
      // Convert 1-5 scales to percentages as well for UI friendliness
      stats.avgRelevance = Math.round(((stats.relevance / stats.total) / 5) * 100);
      stats.avgAccuracy = Math.round(((stats.accuracy / stats.total) / 5) * 100);
      stats.avgSentiment = Math.round(((stats.sentiment / stats.total) / 5) * 100);
      stats.avgOverall = Math.round(((stats.overall / stats.total) / 5) * 100);
      stats.avgLatency = Math.round((stats.latency / stats.total) * 100) / 100;
      stats.avgCost = Math.round((stats.cost / stats.total) * 100) / 100;
    }
  });
  
  // Save comprehensive data to database (commented out until Prisma models are generated)
  // await saveComprehensiveAnalysis(domainId, { ... })
  
  const stats = {
    models: Object.keys(modelStats).map(model => ({
      model,
      presenceRate: modelStats[model].avgPresence || 0,
      avgRelevance: modelStats[model].avgRelevance || 0,
      avgAccuracy: modelStats[model].avgAccuracy || 0,
      avgSentiment: modelStats[model].avgSentiment || 0,
      avgOverall: modelStats[model].avgOverall || 0,
      avgLatency: modelStats[model].avgLatency || 0,
      avgCost: modelStats[model].avgCost || 0,
      totalQueries: modelStats[model].total || 0
    })),
    overall: {
      presenceRate: total ? Math.round((presence / total) * 100) : 0,
      // 1-5 scales converted to 0-100 for UI
      avgRelevance: total ? Math.round(((relevance / total) / 5) * 100) : 0,
      avgAccuracy: total ? Math.round(((accuracy / total) / 5) * 100) : 0,
      avgSentiment: total ? Math.round(((sentiment / total) / 5) * 100) : 0,
      avgOverall: total ? Math.round(((overall / total) / 5) * 100) : 0
    },
    totalResults: total,
    competitors: Array.from(competitors.entries()).map(([domain, data]) => ({
      domain,
      ...data
    })),
    insights: { strengths, weaknesses, opportunities, threats }
  };
  
  console.log('Comprehensive stats calculated:', stats);
  console.log('Models in comprehensive stats:', stats.models.map(m => `${m.model}: ${m.totalQueries} queries, ${m.presenceRate}% presence`));
  console.log('All results models:', results.map(r => r.model));
  console.log('Model stats keys:', Object.keys(modelStats));
  return stats;
}

function generateRecommendations(data: any) {
  const recommendations = [];
  
  // Generate recommendations based on insights
  if (data.overall.avgPresence < 50) {
    recommendations.push({
      priority: 'High',
      type: 'Domain Visibility',
      description: 'Improve domain presence in search results by optimizing content for target keywords',
      impact: 'Could increase search visibility by 40-60%'
    });
  }
  
  if (data.overall.avgRelevance < 60) {
    recommendations.push({
      priority: 'High',
      type: 'Content Optimization',
      description: 'Enhance content relevance to better match user search intent',
      impact: 'Expected 25-35% improvement in search rankings'
    });
  }
  
  if (data.overall.avgOverall < 50) {
    recommendations.push({
      priority: 'Medium',
      type: 'Competitive Analysis',
      description: 'Focus on competitor gaps identified in AI analysis',
      impact: 'Potential to capture 15-25% market share in identified niches'
    });
  }
  
  const highThreatCompetitors = data.competitors.filter((c: any) => c.threatLevel === 'High');
  if (highThreatCompetitors.length > 0) {
    recommendations.push({
      priority: 'Medium',
      type: 'Competitive Strategy',
      description: `Address competitive pressure from ${highThreatCompetitors.length} high-threat competitors`,
      impact: 'Focus on unique value propositions and niche positioning'
    });
  }
  
  return recommendations;
}

function calculateStats(results: any[]) {
  console.log('calculateStats called with results:', results.length, 'items');
  
  const modelStats: Record<string, any> = {};
  let total = 0, presence = 0, relevance = 0, accuracy = 0, sentiment = 0, overall = 0;
  
  for (const r of results) {
    // Skip invalid results
    if (!r || !r.model || !r.scores) {
      console.warn('Skipping invalid result:', r);
      continue;
    }
    
    if (!modelStats[r.model]) {
      modelStats[r.model] = { total: 0, presence: 0, relevance: 0, accuracy: 0, sentiment: 0, overall: 0 };
    }
    
    // Ensure scores are numbers
    const presenceScore = Number(r.scores.presence) || 0;
    const relevanceScore = Number(r.scores.relevance) || 0;
    const accuracyScore = Number(r.scores.accuracy) || 0;
    const sentimentScore = Number(r.scores.sentiment) || 0;
    const overallScore = Number(r.scores.overall) || 0;
    
    modelStats[r.model].total++;
    modelStats[r.model].presence += presenceScore;
    modelStats[r.model].relevance += relevanceScore;
    modelStats[r.model].accuracy += accuracyScore;
    modelStats[r.model].sentiment += sentimentScore;
    modelStats[r.model].overall += overallScore;
    
    total++;
    presence += presenceScore;
    relevance += relevanceScore;
    accuracy += accuracyScore;
    sentiment += sentimentScore;
    overall += overallScore;
  }
  
  console.log('Model stats calculated:', modelStats);
  console.log('Total results processed:', total);
  console.log('Model breakdown:', Object.keys(modelStats).map(model => `${model}: ${modelStats[model].total} results`));
  console.log('Raw results models:', results.map(r => r.model));
  
  const stats = {
    models: Object.keys(modelStats).map(model => ({
      model,
      presenceRate: modelStats[model].total ? Math.round((modelStats[model].presence / modelStats[model].total) * 100) : 0,
      avgRelevance: modelStats[model].total ? Math.round((((modelStats[model].relevance / modelStats[model].total) / 5) * 100)) : 0,
      avgAccuracy: modelStats[model].total ? Math.round((((modelStats[model].accuracy / modelStats[model].total) / 5) * 100)) : 0,
      avgSentiment: modelStats[model].total ? Math.round((((modelStats[model].sentiment / modelStats[model].total) / 5) * 100)) : 0,
      avgOverall: modelStats[model].total ? Math.round((((modelStats[model].overall / modelStats[model].total) / 5) * 100)) : 0
    })),
    overall: {
      presenceRate: total ? Math.round((presence / total) * 100) : 0,
      avgRelevance: total ? Math.round((((relevance / total) / 5) * 100)) : 0,
      avgAccuracy: total ? Math.round((((accuracy / total) / 5) * 100)) : 0,
      avgSentiment: total ? Math.round((((sentiment / total) / 5) * 100)) : 0,
      avgOverall: total ? Math.round((((overall / total) / 5) * 100)) : 0
    },
    totalResults: total
  };
  
  console.log('Final stats:', stats);
  return stats;
}

// Add this function after the existing helper functions and before processQueryBatch
async function checkPhraseCompletion(phraseId: number): Promise<{ isComplete: boolean; existingModels: string[] }> {
  try {
    // Get all existing AI query results for this phrase
    const existingResults = await prisma.aIQueryResult.findMany({
      where: { phraseId },
      select: { model: true }
    });

    const existingModels = existingResults.map(result => result.model);
    
    // Check if we have results from all three AI models
    const requiredModels = ['GPT-4o', 'Claude 3', 'Gemini 1.5'];
    const isComplete = requiredModels.every(model => existingModels.includes(model));
    
    return { isComplete, existingModels };
  } catch (error) {
    console.error('Error checking phrase completion:', error);
    return { isComplete: false, existingModels: [] };
  }
}

// Process queries in batches to avoid overwhelming the system
async function processQueryBatch(
  queries: any[], 
  batchSize: number, 
  res: any, 
  allResults: any[], 
  completedQueries: { current: number }, 
  totalQueries: number,
  domain?: string,
  context?: string,
  location?: string
) {
  const batches = [];
  for (let i = 0; i < queries.length; i += batchSize) {
    batches.push(queries.slice(i, i + batchSize));
  }

  // Track processed queries to prevent duplicates
  const processedQueries = new Set<string>();

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    
    // Send batch progress update with realistic messaging
    res.write(`event: progress\ndata: ${JSON.stringify({ message: `Processing batch ${batchIndex + 1}/${batches.length} - Analyzing ${batch.length} phrases with AI models for domain visibility...` })}\n\n`);
    
    // Process each batch in parallel with realistic timing
    const batchPromises = batch.map(async (query) => {
      // Check if we should use fallback models due to frequent timeouts
      const domainKey = `domain-${query.domainId}`;
      const timeoutCount = timeoutTracker.get(domainKey) || 0;
      const modelsToUse = timeoutCount >= TIMEOUT_THRESHOLD ? FALLBACK_MODELS : AI_MODELS;
      
      if (timeoutCount >= TIMEOUT_THRESHOLD) {
        console.log(`Using fallback models for domain ${query.domainId} due to ${timeoutCount} timeouts`);
        res.write(`event: progress\ndata: ${JSON.stringify({ message: `Using fallback models due to frequent timeouts - continuing analysis...` })}\n\n`);
      }
      
      // Find the phrase record first to check completion
      const keywordRecord = await prisma.keyword.findFirst({
        where: { 
          term: query.keyword, 
          domainId: query.domainId
        },
      });
      
      let phraseRecord = null;
      if (keywordRecord) {
        phraseRecord = await prisma.generatedIntentPhrase.findFirst({
          where: { phrase: query.phrase, keywordId: keywordRecord.id, domainId: query.domainId },
        });
      }
      
      // Check if phrase already has responses from all three models
      if (phraseRecord) {
        const { isComplete, existingModels } = await checkPhraseCompletion(phraseRecord.id);
        
        if (isComplete) {
          console.log(`Skipping phrase "${query.phrase}" - already has responses from all three models: ${existingModels.join(', ')}`);
          res.write(`event: progress\ndata: ${JSON.stringify({ message: `Skipping "${query.phrase}" - already analyzed with all AI models` })}\n\n`);
          
          // Get existing results for this phrase and add them to allResults
          const existingResults = await prisma.aIQueryResult.findMany({
            where: { phraseId: phraseRecord.id },
            include: {
              phrase: {
                include: {
                  keyword: {
                    select: { term: true }
                  }
                }
              }
            }
          });
          
          // Convert existing results to the expected format and add to allResults
          existingResults.forEach(existingResult => {
            const result = {
              ...query,
              model: existingResult.model,
              response: existingResult.response,
              latency: existingResult.latency,
              cost: existingResult.cost,
              progress: 100,
              scores: {
                presence: existingResult.presence,
                relevance: existingResult.relevance,
                accuracy: existingResult.accuracy,
                sentiment: existingResult.sentiment,
                overall: existingResult.overall
              },
              aiQueryResultId: existingResult.id,
              phraseId: phraseRecord.id
            };
            
            allResults.push(result);
            res.write(`event: result\ndata: ${JSON.stringify(result)}\n\n`);
          });
          
          completedQueries.current += existingResults.length;
          return null; // Skip processing this phrase
        }
      }
      
      const modelPromises = modelsToUse.map(async (model) => {
        const startTime = Date.now();
        
        // Create unique identifier for this query to prevent duplicates
        const queryId = `${query.phrase}-${model}-${query.keyword}`;
        
        // Check if already processed
        if (processedQueries.has(queryId)) {
          console.warn(`Duplicate query detected: ${queryId}`);
          return null;
        }
        
        // If phrase record exists, check if this specific model already has a result
        if (phraseRecord) {
          const existingResult = await prisma.aIQueryResult.findFirst({
            where: { 
              phraseId: phraseRecord.id,
              model: model
            }
          });
          
          if (existingResult) {
            console.log(`Skipping "${query.phrase}" with ${model} - result already exists`);
            res.write(`event: progress\ndata: ${JSON.stringify({ message: `Skipping ${model} for "${query.phrase}" - result already exists` })}\n\n`);
            
            // Add existing result to allResults
            const result = {
              ...query,
              model: existingResult.model,
              response: existingResult.response,
              latency: existingResult.latency,
              cost: existingResult.cost,
              progress: 100,
              scores: {
                presence: existingResult.presence,
                relevance: existingResult.relevance,
                accuracy: existingResult.accuracy,
                sentiment: existingResult.sentiment,
                overall: existingResult.overall
              },
              aiQueryResultId: existingResult.id,
              phraseId: phraseRecord.id
            };
            
            allResults.push(result);
            res.write(`event: result\ndata: ${JSON.stringify(result)}\n\n`);
            completedQueries.current++;
            return null; // Skip processing this model
          }
        }
        
        try {
          console.log(`Processing query "${query.phrase}" with model: ${model}`);
          console.log(`Models to use: ${modelsToUse.join(', ')}`);
          console.log(`Model being processed: ${model}`);
          
          // Send individual query progress with realistic messaging
          res.write(`event: progress\ndata: ${JSON.stringify({ message: `Querying ${model} for "${query.phrase}" - Generating comprehensive search response...` })}\n\n`);
          
          // Get AI response using GPT-4o under the hood with timeout and domain context
          const queryPromise = aiQueryService.query(query.phrase, model, domain, location);
          const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Query timeout - AI model taking too long to respond')), 20000) // Reduced timeout to 20 seconds
          );
          
          const { response, cost } = await Promise.race([queryPromise, timeoutPromise]);
          const latency = (Date.now() - startTime) / 1000;

          // Send scoring progress with realistic messaging
          res.write(`event: progress\ndata: ${JSON.stringify({ message: `Evaluating ${model} response for "${query.phrase}" - Analyzing domain presence and SEO ranking potential...` })}\n\n`);
          
          // Score the response using AI with timeout and domain context
          const scores = await scoreResponseWithAI(query.phrase, response, model, domain, location) as {
            presence: number;
            relevance: number;
            accuracy: number;
            sentiment: number;
            overall: number;
            domainRank?: number;
            foundDomains?: string[];
            confidence: number;
            sources: string[];
            competitorUrls: string[];
            competitorMatchScore: number;
          };

          // If domain not visible, lower overall and relevance slightly to reflect visibility-first policy
          if (!scores.presence) {
            scores.relevance = Math.max(1, Math.min(5, (scores.relevance || 3) - 1));
            scores.overall = Math.max(2, Math.min(5, (scores.overall || 3) - 1));
          } else if (scores.domainRank && scores.domainRank > 0) {
            // Boost overall if rank is strong
            if (scores.domainRank <= 3) {
              scores.overall = Math.min(5, (scores.overall || 3) + 1);
            }
          }

          completedQueries.current++;
          const progress = (completedQueries.current / totalQueries) * 100;

          // Save AIQueryResult to DB if phraseRecord found
          let aiQueryResultRecord = null;
          if (phraseRecord) {
            aiQueryResultRecord = await prisma.aIQueryResult.create({
              data: {
                phraseId: phraseRecord.id,
                model, // This preserves the display name: 'GPT-4o', 'Claude 3', or 'Gemini 1.5'
                response,
                latency,
                cost,
                presence: scores.presence,
                relevance: scores.relevance,
                accuracy: scores.accuracy,
                sentiment: scores.sentiment,
                overall: scores.overall,
              }
            });
          }

          const result = {
            ...query,
            model, // This is the display name: 'GPT-4o', 'Claude 3', or 'Gemini 1.5'
            response,
            latency: Number(latency),
            cost: Number(cost),
            progress,
            scores,
            domainRank: scores.domainRank,
            foundDomains: scores.foundDomains,
            confidence: scores.confidence,
            sources: scores.sources,
            competitorUrls: scores.competitorUrls,
            competitorMatchScore: scores.competitorMatchScore,
            aiQueryResultId: aiQueryResultRecord ? aiQueryResultRecord.id : undefined,
            phraseId: phraseRecord ? phraseRecord.id : undefined
          };
          
          console.log(`Sending result with model: ${model} for phrase: "${query.phrase}"`);
          console.log(`Model mapping: ${model} -> Frontend will map to: ${model === 'GPT-4o' ? 'chatgpt' : model === 'Claude 3' ? 'claude' : 'gemini'}`);
          
          // Mark as processed
          processedQueries.add(queryId);
          
          allResults.push(result);
          res.write(`event: result\ndata: ${JSON.stringify(result)}\n\n`);

          return result;
        } catch (err: any) {
          console.error(`Failed for "${query.phrase}" with ${model}:`, err.message);
          
          // Handle timeout errors more gracefully - don't send error event, just log and continue
          if (err.message.includes('timeout') || err.message.includes('taking too long')) {
            console.warn(`Timeout for "${query.phrase}" with ${model} - continuing with other models`);
            
            // Track timeout for this domain
            const domainKey = `domain-${query.domainId}`;
            const currentTimeouts = timeoutTracker.get(domainKey) || 0;
            timeoutTracker.set(domainKey, currentTimeouts + 1);
            
            // Send a progress message instead of error to keep the stream alive
            res.write(`event: progress\ndata: ${JSON.stringify({ message: `${model} timeout for "${query.phrase}" - continuing with other models...` })}\n\n`);
          } else {
            // For non-timeout errors, send error event
            res.write(`event: error\ndata: ${JSON.stringify({ error: `Failed to process "${query.phrase}" with ${model}: ${err.message}` })}\n\n`);
          }
          return null;
        }
      });

      // Wait for all models to complete for this query, but continue even if some fail
      const modelResults = await Promise.allSettled(modelPromises);
      
      // Log success/failure rates for this query
      const successfulModels = modelResults.filter(result => result.status === 'fulfilled' && result.value !== null).length;
      const totalModels = modelsToUse.length; // Use modelsToUse here
      
      if (successfulModels < totalModels) {
        console.log(`Query "${query.phrase}" completed with ${successfulModels}/${totalModels} models successful`);
      }
    });

    // Wait for current batch to complete before moving to next
    await Promise.allSettled(batchPromises);
    
    // Send updated stats after each batch with realistic messaging
    const stats = calculateStats(allResults);
    res.write(`event: stats\ndata: ${JSON.stringify(stats)}\n\n`);
    
    // Add realistic delay between batches to simulate processing
    if (batchIndex < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

// Utility function to wrap async route handlers
function asyncHandler(fn: any) {
  return (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// POST /api/ai-queries/analyze - Analyze a single phrase with AI
router.post('/analyze', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { phrase, domainId, keyword } = req.body;

    if (!phrase || !domainId) {
      return res.status(400).json({ error: 'Phrase and domainId are required' });
    }

    // Check domain ownership
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      select: { url: true, userId: true, location: true }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log(`Analyzing phrase "${phrase}" for domain ${domainId}`);

    // Find or create the phrase
    let phraseRecord = await prisma.generatedIntentPhrase.findFirst({
      where: {
        phrase: phrase,
        domainId: parseInt(domainId)
      }
    });

    if (!phraseRecord) {
      // Find the keyword first
      const keywordRecord = await prisma.keyword.findFirst({
        where: {
          term: keyword,
          domainId: parseInt(domainId)
        }
      });

      if (!keywordRecord) {
        return res.status(404).json({ error: 'Keyword not found' });
      }

      // Create the phrase
      phraseRecord = await prisma.generatedIntentPhrase.create({
        data: {
          phrase: phrase,
          keywordId: keywordRecord.id,
          domainId: parseInt(domainId),
          isSelected: false
        }
      });
    }

    // Analyze with AI
    const aiQuery = await aiQueryService.query(phrase, 'GPT-4o', domain.url, domain.location || undefined);
    const scores = await aiQueryService.scoreResponse(phrase, aiQuery.response, 'GPT-4o', domain.url, domain.location || undefined);
    const result = {
      model: 'GPT-4o',
      response: aiQuery.response,
      latency: 0, // Optionally calculate if needed
      cost: aiQuery.cost,
      scores
    };

    // Save the result
    const aiResult = await prisma.aIQueryResult.create({
      data: {
        phraseId: phraseRecord.id,
        model: result.model,
        response: result.response,
        latency: result.latency,
        cost: result.cost,
        presence: result.scores.presence,
        relevance: result.scores.relevance,
        accuracy: result.scores.accuracy,
        sentiment: result.scores.sentiment,
        overall: result.scores.overall
      }
    });

    console.log(`Analysis completed for phrase "${phrase}"`);
    res.json({
      success: true,
      result: {
        ...aiResult,
        phrase: phrase,
        keyword: keyword
      }
    });
  } catch (error) {
    console.error('Error analyzing phrase:', error);
    res.status(500).json({ error: 'Failed to analyze phrase' });
  }
}));

// POST /api/ai-queries/batch-analyze - Analyze multiple phrases
router.post('/batch-analyze', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { phrases, domainId } = req.body;

    if (!phrases || !Array.isArray(phrases) || !domainId) {
      return res.status(400).json({ error: 'Phrases array and domainId are required' });
    }

    // Check domain ownership
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      select: { url: true, userId: true, location: true }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log(`Batch analyzing ${phrases.length} phrases for domain ${domainId}`);

    const results = [];
    const errors = [];

    for (const phraseData of phrases) {
      try {
        const { phrase, keyword } = phraseData;

        // Find or create the phrase
        let phraseRecord = await prisma.generatedIntentPhrase.findFirst({
          where: {
            phrase: phrase,
            domainId: parseInt(domainId)
          }
        });

        if (!phraseRecord) {
          // Find the keyword first
          const keywordRecord = await prisma.keyword.findFirst({
            where: {
              term: keyword,
              domainId: parseInt(domainId)
            }
          });

          if (!keywordRecord) {
            errors.push({ phrase, error: 'Keyword not found' });
            continue;
          }

          // Create the phrase
          phraseRecord = await prisma.generatedIntentPhrase.create({
            data: {
              phrase: phrase,
              keywordId: keywordRecord.id,
              domainId: parseInt(domainId),
              isSelected: false
            }
          });
        }

        // Analyze with AI
        const aiQuery = await aiQueryService.query(phrase, 'GPT-4o', domain.url, domain.location || undefined);
        const scores = await aiQueryService.scoreResponse(phrase, aiQuery.response, 'GPT-4o', domain.url, domain.location || undefined);
        const result = {
          model: 'GPT-4o',
          response: aiQuery.response,
          latency: 0, // Optionally calculate if needed
          cost: aiQuery.cost,
          scores
        };

        // Save the result
        const aiResult = await prisma.aIQueryResult.create({
          data: {
            phraseId: phraseRecord.id,
            model: result.model,
            response: result.response,
            latency: result.latency,
            cost: result.cost,
            presence: result.scores.presence,
            relevance: result.scores.relevance,
            accuracy: result.scores.accuracy,
            sentiment: result.scores.sentiment,
            overall: result.scores.overall
          }
        });

        results.push({
          phrase,
          keyword,
          result: aiResult
        });
      } catch (error) {
        console.error(`Error analyzing phrase "${phraseData.phrase}":`, error);
        if (error instanceof Error) {
          errors.push({ phrase: phraseData.phrase, error: error.message });
        } else {
          errors.push({ phrase: phraseData.phrase, error: String(error) });
        }
      }
    }

    console.log(`Batch analysis completed: ${results.length} successful, ${errors.length} failed`);
    res.json({
      success: true,
      results,
      errors,
      summary: {
        total: phrases.length,
        successful: results.length,
        failed: errors.length
      }
    });
  } catch (error) {
    console.error('Error in batch analysis:', error);
    res.status(500).json({ error: 'Failed to perform batch analysis' });
  }
}));

// GET /api/ai-queries/debug/:domainId - Debug endpoint (no auth) to test database
router.get('/debug/:domainId', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    
    console.log('AI Query Debug - Testing database for domain:', domainId);
    
    // Test 1: Check if domain exists
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) }
    });
    
    if (!domain) {
      return res.json({ 
        success: false, 
        error: 'Domain not found',
        domainId: parseInt(domainId)
      });
    }
    
    // Test 2: Check if there are any AI query results
    const resultCount = await prisma.aIQueryResult.count({
      where: {
        phrase: {
          domainId: parseInt(domainId)
        }
      }
    });
    
    // Test 3: Try to get one result without relations
    const oneResult = await prisma.aIQueryResult.findFirst({
      where: {
        phrase: {
          domainId: parseInt(domainId)
        }
      }
    });
    
    // Test 4: Try to get results with relations (this is where the error might be)
    let relationTest = null;
    try {
      relationTest = await prisma.aIQueryResult.findFirst({
        where: {
          phrase: {
            domainId: parseInt(domainId)
          }
        },
        include: {
          phrase: {
            include: {
              keyword: {
                select: {
                  term: true
                }
              }
            }
          }
        }
      });
    } catch (relationError) {
      relationTest = {
        error: relationError instanceof Error ? relationError.message : String(relationError)
      };
    }
    
    res.json({
      success: true,
      domain: {
        id: domain.id,
        url: domain.url,
        userId: domain.userId
      },
      resultCount,
      hasResults: resultCount > 0,
      sampleResult: oneResult ? {
        id: oneResult.id,
        model: oneResult.model,
        phraseId: oneResult.phraseId
      } : null,
      relationTest
    });
  } catch (error) {
    console.error('AI Query Debug - Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Debug failed',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}));

// GET /api/ai-queries/test/:domainId - Test endpoint to check basic functionality
router.get('/test/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { domainId } = req.params;
    
    console.log('AI Query Test - Testing basic functionality for domain:', domainId);
    
    // Test 1: Check if domain exists
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) }
    });
    
    if (!domain) {
      return res.json({ 
        success: false, 
        error: 'Domain not found',
        domainId: parseInt(domainId)
      });
    }
    
    // Test 2: Check if there are any AI query results
    const resultCount = await prisma.aIQueryResult.count({
      where: {
        phrase: {
          domainId: parseInt(domainId)
        }
      }
    });
    
    // Test 3: Try to get one result without relations
    const oneResult = await prisma.aIQueryResult.findFirst({
      where: {
        phrase: {
          domainId: parseInt(domainId)
        }
      }
    });
    
    res.json({
      success: true,
      domain: {
        id: domain.id,
        url: domain.url,
        userId: domain.userId
      },
      resultCount,
      hasResults: resultCount > 0,
      sampleResult: oneResult ? {
        id: oneResult.id,
        model: oneResult.model,
        phraseId: oneResult.phraseId
      } : null
    });
  } catch (error) {
    console.error('AI Query Test - Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Test failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}));

// GET /api/ai-queries/results/:domainId - Get AI query results for a domain
router.get('/results/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { domainId } = req.params;
    const { keyword, limit = 50, offset = 0 } = req.query;

    console.log('AI Query Results - Request details:', {
      domainId,
      keyword,
      limit,
      offset,
      userId: req.user?.userId,
      userEmail: req.user?.email
    });

    // Check domain ownership
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) }
    });

    console.log('AI Query Results - Domain lookup result:', {
      domainFound: !!domain,
      domainUserId: domain?.userId,
      requestUserId: req.user?.userId
    });

    if (!domain) {
      console.log('AI Query Results - Domain not found for ID:', domainId);
      return res.status(404).json({ error: 'Domain not found' });
    }

    // Check if domain has a userId (some domains might not be associated with users)
    if (domain.userId && domain.userId !== req.user.userId) {
      console.log('AI Query Results - Access denied:', {
        domainUserId: domain.userId,
        requestUserId: req.user.userId
      });
      return res.status(403).json({ error: 'Access denied' });
    }

    // Build where clause
    const whereClause: any = {
      phrase: {
        domainId: parseInt(domainId)
      }
    };

    if (keyword) {
      whereClause.phrase.keyword = {
        term: keyword
      };
    }

    console.log('AI Query Results - Query where clause:', whereClause);

    // First, let's check if there are any AI query results for this domain at all
    const basicResults = await prisma.aIQueryResult.findMany({
      where: {
        phrase: {
          domainId: parseInt(domainId)
        }
      },
      take: 5
    });

    console.log('AI Query Results - Basic query found:', basicResults.length, 'results');

    // Get results with pagination
    let results;
    let totalCount;
    
    try {
      // Try the full query with relations first
      results = await prisma.aIQueryResult.findMany({
        where: whereClause,
        include: {
          phrase: {
            include: {
              keyword: {
                select: {
                  term: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: parseInt(limit as string),
        skip: parseInt(offset as string)
      });

      // Get total count
      totalCount = await prisma.aIQueryResult.count({
        where: whereClause
      });
    } catch (queryError) {
      console.error('AI Query Results - Query error with relations:', {
        error: queryError instanceof Error ? queryError.message : String(queryError),
        stack: queryError instanceof Error ? queryError.stack : undefined,
        whereClause
      });
      
      // Fallback to basic query without relations
      try {
        results = await prisma.aIQueryResult.findMany({
          where: {
            phrase: {
              domainId: parseInt(domainId)
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: parseInt(limit as string),
          skip: parseInt(offset as string)
        });

        totalCount = await prisma.aIQueryResult.count({
          where: {
            phrase: {
              domainId: parseInt(domainId)
            }
          }
        });
        
        console.log('AI Query Results - Fallback query successful:', results.length, 'results');
      } catch (fallbackError) {
        console.error('AI Query Results - Fallback query also failed:', {
          error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
        });
        throw fallbackError;
      }
    }

    console.log(`AI Query Results - Retrieved ${results.length} results for domain ${domainId}, total: ${totalCount}`);
    
    // Transform and ENRICH results with evidence extracted from stored responses
    const transformedResults = results.map(result => {
      const r: any = result as any;
      const phraseText: string = r?.phrase?.phrase || '';
      const keywordTerm: string = r?.phrase?.keyword?.term || 'Unknown';
      const domainUrl = (domain?.url || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
      // Derive domain and found domains from response
      let domainRank = 0;
      let foundDomains: string[] = [];
      try {
        const urlRegex = /https?:\/\/[^\s\)\]}"']+/g;
        const urls = (result.response.match(urlRegex) || []) as string[];
        const domains = urls.map(u => {
          try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
        }).filter(Boolean);
        foundDomains = Array.from(new Set(domains));
        if (domainUrl && domains.length) {
          const idx = domains.findIndex(d => d === domainUrl || d.endsWith('.' + domainUrl) || domainUrl.endsWith('.' + d));
          if (idx >= 0) domainRank = idx + 1;
        }
      } catch {}
      // Extract confidence, sources, competitor data using shared logic (no extra AI calls)
      const { confidence, sources, competitorUrls, competitorMatchScore } = ((): { confidence: number; sources: string[]; competitorUrls: string[]; competitorMatchScore: number } => {
        try {
          const text = result.response || '';
          const urlRegex = /https?:\/\/[^\s\n\)\]}"']+/g;
          const urls = text.match(urlRegex) || [];
          const domains = urls.map(u => { try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; } }).filter(Boolean);
          const length = text.length;
          let conf = 50;
          if (length > 300) conf += 6;
          if (length > 600) conf += 5;
          if (urls.length) conf += Math.min(15, urls.length * 4);
          if (domains.length >= 3) conf += 5;
          if (!urls.length) conf = Math.min(conf, 70);
          conf = Math.max(25, Math.min(conf, 92));
          const srcs: string[] = [];
          const lower = text.toLowerCase();
          if (/(official|documentation|api|docs\.)/.test(lower)) srcs.push('Official Documentation');
          if (/(community|discussion|forum|stack overflow|stackoverflow)/.test(lower)) srcs.push('Community Discussions');
          if (/(industry|market|trend|gartner|forrester|research)/.test(lower)) srcs.push('Industry Reports');
          if (/(case study|success story|customer story|implementation)/.test(lower)) srcs.push('Case Studies');
          if (/(research|study|analysis|survey|academic)/.test(lower)) srcs.push('Research Data');
          if (/(benchmark|comparison|\svs\s|alternative|competitor)/.test(lower)) srcs.push('Benchmark Analysis');
          if (/(\bai\b|machine learning|\bml\b|predictive|neural|algorithm)/.test(lower)) srcs.push('AI & ML Insights');
          if (/(saas|cloud|platform|enterprise|business)/.test(lower)) srcs.push('Enterprise Solutions');
          if (/(startup|innovation|cutting-edge|emerging|future)/.test(lower)) srcs.push('Innovation Insights');
          if (/(tutorial|guide|how-to|step-by-step|practical)/.test(lower)) srcs.push('Practical Guides');
          if (srcs.length === 0) srcs.push(length > 400 ? 'Comprehensive Analysis' : length > 200 ? 'Detailed Insights' : 'AI-Generated Analysis');
          let compScore = 60;
          if (domains.length) compScore += Math.min(domains.length * 4, 15);
          if (/(competitor|alternative|\svs\s|compared to)/.test(lower)) compScore += 8;
          if (/(market leader|top|best|leading)/.test(lower)) compScore += 5;
          if (/(enterprise|saas|platform|solution)/.test(lower)) compScore += 3;
          if (/(recommend|suggest|consider)/.test(lower)) compScore += 2;
          compScore = Math.min(compScore, 92);
          return { confidence: Math.round(conf), sources: Array.from(new Set(srcs)), competitorUrls: urls.slice(0,5), competitorMatchScore: compScore };
        } catch { return { confidence: 60, sources: ['AI Analysis'], competitorUrls: [], competitorMatchScore: 0 }; }
      })();
      return {
        phrase: phraseText,
        keyword: keywordTerm,
        model: result.model,
        response: result.response,
        latency: result.latency,
        cost: result.cost,
        scores: {
          presence: result.presence,
          relevance: result.relevance,
          accuracy: result.accuracy,
          sentiment: result.sentiment,
          overall: result.overall,
          domainRank,
          foundDomains,
          confidence,
          sources,
          competitorUrls,
          competitorMatchScore
        },
        progress: 100
      };
    });

    // Calculate stats from existing results
    const stats = calculateStats(transformedResults);
    
    res.json({
      results: transformedResults,
      stats: stats
    });
  } catch (error) {
    console.error('AI Query Results - Error details:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      domainId: req.params.domainId,
      userId: req.user?.userId
    });
    res.status(500).json({ error: 'Failed to fetch AI query results' });
  }
}));

// DELETE /api/ai-queries/results/:resultId - Delete a specific AI query result
router.delete('/results/:resultId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { resultId } = req.params;

    // Get the result and check ownership
    const result = await prisma.aIQueryResult.findUnique({
      where: { id: parseInt(resultId) },
      include: {
        phrase: {
          include: {
            keyword: {
              include: {
                domain: true
              }
            }
          }
        }
      }
    });

    if (!result) {
      return res.status(404).json({ error: 'AI query result not found' });
    }

    if (result.phrase.keyword?.domain && result.phrase.keyword.domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete the result
    await prisma.aIQueryResult.delete({
      where: { id: parseInt(resultId) }
    });

    console.log(`Deleted AI query result ${resultId}`);
    res.json({ success: true, message: 'AI query result deleted successfully' });
  } catch (error) {
    console.error('Error deleting AI query result:', error);
    res.status(500).json({ error: 'Failed to delete AI query result' });
  }
}));

// GET /api/ai-queries/stats/:domainId - Get AI query statistics for a domain
router.get('/stats/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { domainId } = req.params;

    // Check domain ownership
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get all results for this domain
    const results = await prisma.aIQueryResult.findMany({
      where: {
        phrase: {
          keyword: {
            domainId: parseInt(domainId)
          }
        }
      },
      include: {
        phrase: {
          include: {
            keyword: {
              select: {
                term: true
              }
            }
          }
        }
      }
    });

    // Calculate statistics (convert averages to percentages)
    const totalQueries = results.length;
    const mentions = results.filter(r => r.presence === 1).length;
    const mentionRate = totalQueries > 0 ? (mentions / totalQueries) * 100 : 0;
    const avgRelevance = totalQueries > 0 ? (results.reduce((sum, r) => sum + r.relevance, 0) / totalQueries) : 0;
    const avgAccuracy = totalQueries > 0 ? (results.reduce((sum, r) => sum + r.accuracy, 0) / totalQueries) : 0;
    const avgSentiment = totalQueries > 0 ? (results.reduce((sum, r) => sum + r.sentiment, 0) / totalQueries) : 0;
    const avgOverall = totalQueries > 0 ? (results.reduce((sum, r) => sum + r.overall, 0) / totalQueries) : 0;

    // Group by keyword
    const keywordStats = results.reduce((acc, result) => {
      const keyword = result.phrase.keyword?.term || 'Unknown';
      if (!acc[keyword]) {
        acc[keyword] = {
          keyword,
          totalQueries: 0,
          mentions: 0,
          avgRelevance: 0,
          avgAccuracy: 0,
          avgSentiment: 0,
          avgOverall: 0
        };
      }
      
      acc[keyword].totalQueries++;
      if (result.presence === 1) acc[keyword].mentions++;
      acc[keyword].avgRelevance += result.relevance;
      acc[keyword].avgAccuracy += result.accuracy;
      acc[keyword].avgSentiment += result.sentiment;
      acc[keyword].avgOverall += result.overall;
      
      return acc;
    }, {} as Record<string, any>);

    // Calculate averages for each keyword (convert to 0-100)
    Object.values(keywordStats).forEach((stat: any) => {
      stat.avgRelevance = stat.totalQueries > 0 ? Math.round(((stat.avgRelevance / stat.totalQueries) / 5) * 100) : 0;
      stat.avgAccuracy = stat.totalQueries > 0 ? Math.round(((stat.avgAccuracy / stat.totalQueries) / 5) * 100) : 0;
      stat.avgSentiment = stat.totalQueries > 0 ? Math.round(((stat.avgSentiment / stat.totalQueries) / 5) * 100) : 0;
      stat.avgOverall = stat.totalQueries > 0 ? Math.round(((stat.avgOverall / stat.totalQueries) / 5) * 100) : 0;
      stat.mentionRate = stat.totalQueries > 0 ? Math.round((stat.mentions / stat.totalQueries) * 100) : 0;
    });

    const stats = {
      totalQueries,
      mentions,
      mentionRate: Math.round(mentionRate),
      avgRelevance: Math.round((avgRelevance / 5) * 100),
      avgAccuracy: Math.round((avgAccuracy / 5) * 100),
      avgSentiment: Math.round((avgSentiment / 5) * 100),
      avgOverall: Math.round((avgOverall / 5) * 100),
      keywordStats: Object.values(keywordStats)
    };

    console.log(`Retrieved AI query stats for domain ${domainId}`);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching AI query stats:', error);
    res.status(500).json({ error: 'Failed to fetch AI query statistics' });
  }
}));

// Existing SSE entrypoint remains unchanged except where stats are streamed
router.post('/:domainId', async (req, res) => {
    const domainId = Number(req.params.domainId);
    if (!domainId) {
        res.status(400).json({ error: 'Invalid domainId' });
        return;
    }

    // Check rate limiting
    const currentRequests = activeRequests.get(domainId) || 0;
    if (currentRequests >= MAX_CONCURRENT_REQUESTS) {
        res.status(429).json({ error: 'Too many concurrent requests for this domain. Please wait for the current analysis to complete.' });
        return;
    }

    // Increment active requests
    activeRequests.set(domainId, currentRequests + 1);

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
        // Fetch selected phrases from the database
        const selectedPhrases = await prisma.generatedIntentPhrase.findMany({
            where: {
                domainId: domainId,
                isSelected: true
            },
            include: {
                keyword: {
                    select: {
                        term: true
                    }
                }
            }
        });

        // Also check total phrases for comparison
        const totalPhrasesCount = await prisma.generatedIntentPhrase.count({
            where: {
                domainId: domainId
            }
        });

        console.log('AI Queries - Total phrases for domain:', totalPhrasesCount);
        console.log('AI Queries - Found selected phrases:', selectedPhrases.length);
        console.log('AI Queries - Selected phrases:', selectedPhrases.map(p => ({ id: p.id, phrase: p.phrase, keyword: p.keyword?.term || 'Unknown' })));

        if (selectedPhrases.length === 0) {
            res.write(`event: error\ndata: ${JSON.stringify({ error: 'No selected phrases found for this domain. Please go back and select phrases first.' })}\n\n`);
            res.end();
            return;
        }

        // Group phrases by keyword
        const phrasesByKeyword = selectedPhrases.reduce((acc, phrase) => {
            const keyword = phrase.keyword?.term || 'Unknown';
            if (!acc[keyword]) {
                acc[keyword] = [];
            }
            acc[keyword].push(phrase.phrase);
            return acc;
        }, {} as Record<string, string[]>);

        const phrases = Object.entries(phrasesByKeyword).map(([keyword, phrases]) => ({
            keyword,
            phrases
        }));

        // Validate input size to prevent overwhelming the system
        const totalPhrasesToProcess = phrases.reduce((sum, item) => sum + item.phrases.length, 0);
        const totalQueries = totalPhrasesToProcess * AI_MODELS.length;
        
        if (totalQueries > 1000) {
            res.write(`event: error\ndata: ${JSON.stringify({ error: `Too many queries requested: ${totalQueries}. Maximum allowed is 1000.` })}\n\n`);
            res.end();
            return;
        }

        // Get domain information for context
        const domainObj = await prisma.domain.findUnique({
            where: { id: domainId },
            select: { url: true, context: true, location: true }
        });

        if (!domainObj) {
            res.write(`event: error\ndata: ${JSON.stringify({ error: 'Domain not found' })}\n\n`);
            res.end();
            return;
        }
        const domain = domainObj.url || undefined;
        const context = domainObj.context || undefined;
        const location = domainObj.location || undefined;

        const allQueries = phrases.flatMap((item: any) =>
            item.phrases.map((phrase: string) => ({
                keyword: item.keyword,
                phrase,
                domainId
            }))
        );

        const completedQueries = { current: 0 };
        const allResults: any[] = [];

        // Determine batch size based on total queries - optimized for realistic processing
        const batchSize = totalQueries > 100 ? 4 : totalQueries > 50 ? 6 : totalQueries > 20 ? 8 : 10;
        
        res.write(`event: progress\ndata: ${JSON.stringify({ message: `Initializing AI analysis engine - Processing ${totalQueries} queries across ${AI_MODELS.length} AI models for domain visibility analysis...` })}\n\n`);

        // Process queries in optimized batches with domain context
        await processQueryBatch(allQueries, batchSize, res, allResults, completedQueries, totalQueries, domain, context, location);

        // Calculate and send comprehensive stats (already percentage-ready)
        if (allResults.length > 0) {
            try {
                const comprehensiveStats = await calculateComprehensiveStats(allResults, domainId);
                res.write(`event: stats\ndata: ${JSON.stringify(comprehensiveStats)}\n\n`);
            } catch (error) {
                console.error('Error calculating comprehensive stats:', error);
                // Fallback to basic stats
                const basicStats = calculateStats(allResults);
                res.write(`event: stats\ndata: ${JSON.stringify(basicStats)}\n\n`);
            }
        }

        res.write(`event: complete\ndata: {}\n\n`);
        res.end();

    } catch (err: any) {
        console.error('AI Query streaming error:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ error: `An unexpected error occurred: ${err.message}` })}\n\n`);
        res.end();
    } finally {
        // Decrement active requests
        const currentRequests = activeRequests.get(domainId) || 0;
        if (currentRequests > 0) {
            activeRequests.set(domainId, currentRequests - 1);
        }
    }
});

export default router; 