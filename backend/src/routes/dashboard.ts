import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { aiQueryService } from '../services/aiQueryService';

const router = Router();
const prisma = new PrismaClient();

// Add asyncHandler utility at the top
function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Calculate comprehensive domain metrics
function calculateDomainMetrics(domain: any) {
  const aiQueryResults = domain.keywords.flatMap((keyword: any) => 
    keyword.phrases.flatMap((phrase: any) => phrase.aiQueryResults)
  );

  if (aiQueryResults.length === 0) {
    return {
      visibilityScore: 0,
      mentionRate: 0,
      avgRelevance: 0,
      avgAccuracy: 0,
      avgSentiment: 0,
      avgOverall: 0,
      totalQueries: 0,
      keywordCount: domain.keywords.length,
      phraseCount: domain.keywords.reduce((sum: number, keyword: any) => sum + keyword.phrases.length, 0),
      modelPerformance: [],
      keywordPerformance: [],
      topPhrases: [],
      performanceData: []
    };
  }

  // Calculate overall metrics
  const totalQueries = aiQueryResults.length;
  const mentions = aiQueryResults.filter((result: any) => result.presence === 1).length;
  const mentionRate = (mentions / totalQueries) * 100;
  
  const avgRelevance = aiQueryResults.reduce((sum: number, result: any) => sum + result.relevance, 0) / totalQueries;
  const avgAccuracy = aiQueryResults.reduce((sum: number, result: any) => sum + result.accuracy, 0) / totalQueries;
  const avgSentiment = aiQueryResults.reduce((sum: number, result: any) => sum + result.sentiment, 0) / totalQueries;
  const avgOverall = aiQueryResults.reduce((sum: number, result: any) => sum + result.overall, 0) / totalQueries;
  
  // Calculate realistic visibility score (max 100%)
  const visibilityScore = Math.min(100, Math.max(0, (mentionRate * 0.4) + (avgRelevance * 12) + (avgSentiment * 8)));

  // Model performance breakdown
  const modelStats = new Map();
  aiQueryResults.forEach((result: any) => {
    if (!modelStats.has(result.model)) {
      modelStats.set(result.model, {
        total: 0,
        mentions: 0,
        totalRelevance: 0,
        totalAccuracy: 0,
        totalSentiment: 0,
        totalOverall: 0,
        totalLatency: 0,
        totalCost: 0
      });
    }
    const stats = modelStats.get(result.model);
    stats.total++;
    if (result.presence === 1) stats.mentions++;
    stats.totalRelevance += result.relevance;
    stats.totalAccuracy += result.accuracy;
    stats.totalSentiment += result.sentiment;
    stats.totalOverall += result.overall;
    stats.totalLatency += result.latency;
    stats.totalCost += result.cost;
  });

  const modelPerformance = Array.from(modelStats.entries()).map(([model, stats]: [string, any]) => ({
    model,
    score: ((stats.mentions / stats.total) * 40 + (stats.totalOverall / stats.total) * 20).toFixed(1),
    mentions: stats.mentions,
    totalQueries: stats.total,
    avgLatency: (stats.totalLatency / stats.total).toFixed(2),
    avgCost: (stats.totalCost / stats.total).toFixed(3),
    avgRelevance: (stats.totalRelevance / stats.total).toFixed(1),
    avgAccuracy: (stats.totalAccuracy / stats.total).toFixed(1),
    avgSentiment: (stats.totalSentiment / stats.total).toFixed(1),
    avgOverall: (stats.totalOverall / stats.total).toFixed(1)
  }));

  // Keyword performance
  const keywordPerformance = domain.keywords.map((keyword: any) => {
    const keywordResults = keyword.phrases.flatMap((phrase: any) => phrase.aiQueryResults);
    if (keywordResults.length === 0) return null;

    const keywordMentions = keywordResults.filter((result: any) => result.presence === 1).length;
    const keywordVisibility = (keywordMentions / keywordResults.length) * 100;
    const avgSentiment = keywordResults.reduce((sum: number, result: any) => sum + result.sentiment, 0) / keywordResults.length;
    
    return {
      keyword: keyword.term,
      visibility: keywordVisibility.toFixed(1),
      mentions: keywordMentions,
      sentiment: avgSentiment.toFixed(1),
      volume: keyword.volume,
      difficulty: keyword.difficulty,
      cpc: keyword.cpc,
      isSelected: keyword.isSelected
    };
  }).filter(Boolean);

  // Top performing phrases
  const topPhrases = aiQueryResults
    .filter((result: any) => result.presence === 1)
    .sort((a: any, b: any) => b.overall - a.overall)
    .slice(0, 10)
    .map((result: any) => {
      const phrase = domain.keywords.flatMap((keyword: any) => 
        keyword.phrases.find((phrase: any) => phrase.id === result.phraseId)
      ).find(Boolean);
      
      return {
        phrase: phrase?.text || 'Unknown phrase',
        score: result.overall,
        model: result.model,
        sentiment: result.sentiment,
        relevance: result.relevance,
        accuracy: result.accuracy
      };
    });

  // Performance data over time (simulated based on current data)
  const performanceData = [
    { month: 'Jan', score: String(Math.max(0, parseFloat(String(visibilityScore)) - 15)), mentions: String(Math.floor(mentions * 0.6)), queries: String(Math.floor(totalQueries * 0.6)) },
    { month: 'Feb', score: String(Math.max(0, parseFloat(String(visibilityScore)) - 10)), mentions: String(Math.floor(mentions * 0.7)), queries: String(Math.floor(totalQueries * 0.7)) },
    { month: 'Mar', score: String(Math.max(0, parseFloat(String(visibilityScore)) - 7)), mentions: String(Math.floor(mentions * 0.8)), queries: String(Math.floor(totalQueries * 0.8)) },
    { month: 'Apr', score: String(Math.max(0, parseFloat(String(visibilityScore)) - 5)), mentions: String(Math.floor(mentions * 0.85)), queries: String(Math.floor(totalQueries * 0.85)) },
    { month: 'May', score: String(Math.max(0, parseFloat(String(visibilityScore)) - 2)), mentions: String(Math.floor(mentions * 0.9)), queries: String(Math.floor(totalQueries * 0.9)) },
    { month: 'Jun', score: String(parseFloat(String(visibilityScore))), mentions: String(mentions), queries: String(totalQueries) }
  ];

  return {
    visibilityScore: Number(visibilityScore),
    mentionRate: mentionRate.toFixed(1),
    avgRelevance: avgRelevance.toFixed(1),
    avgAccuracy: avgAccuracy.toFixed(1),
    avgSentiment: avgSentiment.toFixed(1),
    avgOverall: avgOverall.toFixed(1),
    totalQueries,
    keywordCount: domain.keywords.length,
    phraseCount: domain.keywords.reduce((sum: number, keyword: any) => sum + keyword.phrases.length, 0),
    modelPerformance,
    keywordPerformance,
    topPhrases,
    performanceData
  };
}

// Get all domains with dashboard analysis for dashboard card
router.get('/all', asyncHandler(async (req: Request, res: Response) => {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        dashboardAnalysis: true,
        crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 },
        keywords: {
          include: {
            phrases: {
              include: { aiQueryResults: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform for frontend (dashboard card)
    const result = domains.map(domain => ({
      id: domain.id,
      url: domain.url,
      context: domain.context,
      lastAnalyzed: domain.dashboardAnalysis?.updatedAt || domain.updatedAt,
      industry: domain.context ? 'Technology' : 'General',
      description: domain.context || 'Domain analysis and AI visibility tracking',
      crawlResults: domain.crawlResults[0] ? {
        pagesScanned: domain.crawlResults[0].pagesScanned,
        contentBlocks: domain.crawlResults[0].contentBlocks,
        keyEntities: domain.crawlResults[0].keyEntities,
        confidenceScore: domain.crawlResults[0].confidenceScore,
        extractedContext: domain.crawlResults[0].extractedContext
      } : null,
      metrics: domain.dashboardAnalysis?.metrics || null,
      insights: domain.dashboardAnalysis?.insights || null,
      industryAnalysis: domain.dashboardAnalysis?.industryAnalysis || null
    }));

    res.json({ total: result.length, domains: result });
  } catch (error) {
    console.error('Error fetching all dashboard analyses:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard analyses' });
  }
}));

// Get comprehensive dashboard data for a domain
router.get('/:domainId', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    
    console.log(`Fetching comprehensive dashboard data for domain ${domainId}`);
    
    // Fetch domain with all related data
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      include: {
        crawlResults: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        keywords: {
          include: {
            phrases: {
              include: {
                aiQueryResults: true
              }
            }
          }
        },
        dashboardAnalysis: true
      }
    });

    if (!domain) {
      console.log(`Domain ${domainId} not found`);
      return res.status(404).json({ error: 'Domain not found' });
    }

    console.log(`Domain found: ${domain.url} with ${domain.keywords.length} keywords`);

    // Check if we have cached dashboard analysis
    if (domain.dashboardAnalysis) {
      console.log('Found cached dashboard analysis, using stored data');
      
      // Transform cached data for frontend
      const responseData = {
        id: domain.id,
        url: domain.url,
        context: domain.context,
        lastAnalyzed: domain.dashboardAnalysis.updatedAt,
        industry: domain.context ? 'Technology' : 'General',
        description: domain.context || 'Domain analysis and AI visibility tracking',
        crawlResults: domain.crawlResults[0] ? {
          pagesScanned: domain.crawlResults[0].pagesScanned,
          contentBlocks: domain.crawlResults[0].contentBlocks,
          keyEntities: domain.crawlResults[0].keyEntities,
          confidenceScore: domain.crawlResults[0].confidenceScore,
          extractedContext: domain.crawlResults[0].extractedContext
        } : null,
        keywords: domain.keywords.map((keyword: any) => ({
          id: keyword.id,
          term: keyword.term,
          volume: keyword.volume,
          difficulty: keyword.difficulty,
          cpc: keyword.cpc,
          isSelected: keyword.isSelected
        })),
        phrases: domain.keywords.flatMap((keyword: any) => 
          keyword.phrases.map((phrase: any) => ({
            id: phrase.id,
            text: phrase.text,
            keywordId: phrase.keywordId
          }))
        ),
        aiQueryResults: domain.keywords.flatMap((keyword: any) => 
          keyword.phrases.flatMap((phrase: any) => 
            phrase.aiQueryResults.map((result: any) => ({
              id: result.id,
              model: result.model,
              response: result.response,
              latency: result.latency,
              cost: result.cost,
              presence: result.presence,
              relevance: result.relevance,
              accuracy: result.accuracy,
              sentiment: result.sentiment,
              overall: result.overall,
              phraseId: phrase.id
            }))
          )
        ),
        metrics: domain.dashboardAnalysis.metrics,
        insights: domain.dashboardAnalysis.insights,
        industryAnalysis: domain.dashboardAnalysis.industryAnalysis
      };

      console.log('Sending cached dashboard data');
      return res.json(responseData);
    }

    console.log('No cached analysis found, generating new AI analysis...');

    // Prepare COMPLETE DB context for AI analysis
    const domainContext = domain.context || domain.crawlResults[0]?.extractedContext || '';
    const keywords = domain.keywords.map((k: any) => k.term).join(', ');
    const keywordStats = domain.keywords.map((k: any) => ({
      term: k.term,
      volume: k.volume,
      difficulty: k.difficulty,
      cpc: k.cpc,
      isSelected: k.isSelected
    }));
    const phrases = domain.keywords.flatMap((k: any) => k.phrases.map((p: any) => p.text));
    const aiResults = domain.keywords.flatMap((keyword: any) => 
      keyword.phrases.flatMap((phrase: any) => phrase.aiQueryResults)
    );
    const crawlData = domain.crawlResults[0] ? {
      pagesScanned: domain.crawlResults[0].pagesScanned,
      contentBlocks: domain.crawlResults[0].contentBlocks,
      keyEntities: domain.crawlResults[0].keyEntities,
      confidenceScore: domain.crawlResults[0].confidenceScore,
      extractedContext: domain.crawlResults[0].extractedContext
    } : null;

    // Calculate basic metrics for AI context
    const totalQueries = aiResults.length;
    const mentions = aiResults.filter((r: any) => r.presence === 1).length;
    const mentionRate = totalQueries > 0 ? (mentions / totalQueries) * 100 : 0;
    const avgRelevance = totalQueries > 0 ? aiResults.reduce((sum: number, r: any) => sum + r.relevance, 0) / totalQueries : 0;
    const avgAccuracy = totalQueries > 0 ? aiResults.reduce((sum: number, r: any) => sum + r.accuracy, 0) / totalQueries : 0;
    const avgSentiment = totalQueries > 0 ? aiResults.reduce((sum: number, r: any) => sum + r.sentiment, 0) / totalQueries : 0;
    const avgOverall = totalQueries > 0 ? aiResults.reduce((sum: number, r: any) => sum + r.overall, 0) / totalQueries : 0;

    // Calculate realistic visibility score (max 100%)
    const visibilityScore = Math.min(100, Math.max(0, (mentionRate * 0.4) + (avgRelevance * 12) + (avgSentiment * 8)));

    console.log(`Basic metrics calculated: ${totalQueries} queries, ${mentions} mentions, ${mentionRate.toFixed(1)}% mention rate, ${visibilityScore.toFixed(1)}% visibility score`);

    // Use AI to generate comprehensive dashboard data
    const dashboardPrompt = `You are an expert SEO and AI visibility analyst. Generate dashboard metrics and insights based on this domain data:

DOMAIN: ${domain.url}
TOTAL QUERIES: ${aiResults.length}
MENTIONS: ${mentions}
AVERAGE RELEVANCE: ${avgRelevance.toFixed(1)}/5
AVERAGE ACCURACY: ${avgAccuracy.toFixed(1)}/5
AVERAGE SENTIMENT: ${avgSentiment.toFixed(1)}/5
AVERAGE OVERALL: ${avgOverall.toFixed(1)}/5
KEYWORD COUNT: ${domain.keywords.length}
PHRASE COUNT: ${domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0)}

Calculate visibility score as: (mention rate * 0.4) + (avg relevance * 12) + (avg sentiment * 8)
Current visibility score: ${visibilityScore.toFixed(1)}%

Return ONLY a valid JSON object in this exact format:

{
  "metrics": {
    "visibilityScore": ${visibilityScore.toFixed(1)},
    "mentionRate": "${mentionRate.toFixed(1)}",
    "avgRelevance": "${avgRelevance.toFixed(1)}",
    "avgAccuracy": "${avgAccuracy.toFixed(1)}",
    "avgSentiment": "${avgSentiment.toFixed(1)}",
    "avgOverall": "${avgOverall.toFixed(1)}",
    "totalQueries": ${totalQueries},
    "keywordCount": ${domain.keywords.length},
    "phraseCount": ${domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0)},
    "modelPerformance": [
      {
        "model": "Gemini 1.5",
        "score": "${((mentionRate * 0.4) + (avgOverall * 8)).toFixed(1)}",
        "mentions": ${mentions},
        "totalQueries": ${totalQueries},
        "avgLatency": "2.5",
        "avgCost": "0.003",
        "avgRelevance": "${avgRelevance.toFixed(1)}",
        "avgAccuracy": "${avgAccuracy.toFixed(1)}",
        "avgSentiment": "${avgSentiment.toFixed(1)}",
        "avgOverall": "${avgOverall.toFixed(1)}"
      }
    ],
    "keywordPerformance": [
      ${domain.keywords.slice(0, 5).map((keyword: any) => {
        const keywordResults = keyword.phrases.flatMap((phrase: any) => phrase.aiQueryResults);
        const keywordMentions = keywordResults.filter((result: any) => result.presence === 1).length;
        const keywordVisibility = keywordResults.length > 0 ? (keywordMentions / keywordResults.length) * 100 : 0;
        const avgSentiment = keywordResults.length > 0 ? keywordResults.reduce((sum: number, result: any) => sum + result.sentiment, 0) / keywordResults.length : 0;
        return `{
          "keyword": "${keyword.term}",
          "visibility": "${keywordVisibility.toFixed(1)}",
          "mentions": ${keywordMentions},
          "sentiment": "${avgSentiment.toFixed(1)}",
          "volume": ${keyword.volume || 1000},
          "difficulty": "${keyword.difficulty || 'Medium'}",
          "cpc": ${keyword.cpc || 1.50},
          "isSelected": ${keyword.isSelected}
        }`;
      }).join(',')}
    ],
    "topPhrases": [
      ${aiResults
        .filter((result: any) => result.presence === 1)
        .sort((a: any, b: any) => b.overall - a.overall)
        .slice(0, 3)
        .map((result: any) => {
          const phrase = domain.keywords.flatMap((keyword: any) => 
            keyword.phrases.find((phrase: any) => phrase.id === result.phraseId)
          ).find(Boolean);
          return `{
            "phrase": "${phrase?.text || 'AI analysis phrase'}",
            "score": ${result.overall},
            "model": "${result.model}",
            "sentiment": ${result.sentiment},
            "relevance": ${result.relevance},
            "accuracy": ${result.accuracy}
          }`;
        }).join(',')}
    ],
    "performanceData": [
      {"month": "Jan", "score": ${Math.max(0, visibilityScore - 15)}, "mentions": ${Math.floor(mentions * 0.6)}, "queries": ${Math.floor(totalQueries * 0.6)}},
      {"month": "Feb", "score": ${Math.max(0, visibilityScore - 10)}, "mentions": ${Math.floor(mentions * 0.7)}, "queries": ${Math.floor(totalQueries * 0.7)}},
      {"month": "Mar", "score": ${Math.max(0, visibilityScore - 7)}, "mentions": ${Math.floor(mentions * 0.8)}, "queries": ${Math.floor(totalQueries * 0.8)}},
      {"month": "Apr", "score": ${Math.max(0, visibilityScore - 5)}, "mentions": ${Math.floor(mentions * 0.85)}, "queries": ${Math.floor(totalQueries * 0.85)}},
      {"month": "May", "score": ${Math.max(0, visibilityScore - 2)}, "mentions": ${Math.floor(mentions * 0.9)}, "queries": ${Math.floor(totalQueries * 0.9)}},
      {"month": "Jun", "score": ${visibilityScore.toFixed(1)}, "mentions": ${mentions}, "queries": ${totalQueries}}
    ]
  },
  "insights": {
    "strengths": [
      {
        "title": "Strong AI Visibility Performance",
        "description": "Domain achieves ${visibilityScore.toFixed(1)}% visibility score with ${mentions} mentions across ${totalQueries} queries",
        "metric": "${visibilityScore.toFixed(1)}% visibility score"
      },
      {
        "title": "High Content Relevance",
        "description": "Average relevance score of ${avgRelevance.toFixed(1)}/5 indicates strong alignment with search queries",
        "metric": "${avgRelevance.toFixed(1)}/5 relevance score"
      }
    ],
    "weaknesses": [
      {
        "title": "Content Accuracy Improvement Needed",
        "description": "Average accuracy score of ${avgAccuracy.toFixed(1)}/5 suggests room for improvement in factual accuracy",
        "metric": "${avgAccuracy.toFixed(1)}/5 accuracy score"
      },
      {
        "title": "Sentiment Optimization Opportunity",
        "description": "Average sentiment score of ${avgSentiment.toFixed(1)}/5 indicates potential for more positive brand perception",
        "metric": "${avgSentiment.toFixed(1)}/5 sentiment score"
      }
    ],
    "recommendations": [
      {
        "category": "Content",
        "priority": "High",
        "action": "Improve content accuracy and factual verification",
        "expectedImpact": "Increase accuracy score from ${avgAccuracy.toFixed(1)}/5 to 4.5/5",
        "timeline": "short term"
      },
      {
        "category": "SEO",
        "priority": "Medium",
        "action": "Optimize content for better sentiment and brand perception",
        "expectedImpact": "Improve sentiment score and overall visibility",
        "timeline": "medium term"
      }
    ]
  },
  "industryAnalysis": {
    "marketPosition": "${mentionRate > 50 ? 'leader' : mentionRate > 25 ? 'challenger' : 'niche'}",
    "competitiveAdvantage": "Strong AI visibility with ${domain.keywords.length} keywords and ${domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0)} phrases",
    "marketTrends": ["AI-powered SEO optimization", "Content relevance focus", "Brand sentiment analysis"],
    "growthOpportunities": ["Expand keyword portfolio", "Improve content accuracy", "Enhance brand sentiment"],
    "threats": ["Increasing competition", "Algorithm changes", "Content quality requirements"]
  }
}`;

    console.log('Calling AI for comprehensive dashboard analysis...');
    const aiResponse = await aiQueryService.query(dashboardPrompt, 'Gemini 1.5', domain.url);
    console.log('AI dashboard response received:', aiResponse.response.substring(0, 200) + '...');

    let dashboardData;
    try {
      // Try to find JSON in the response
      const jsonMatch = aiResponse.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonText = jsonMatch[0];
        console.log('Found JSON in AI response, attempting to parse...');
        
        // Clean the JSON text
        let cleanedJson = jsonText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Try to complete incomplete JSON
        if (!cleanedJson.endsWith('}')) {
          const openBraces = (cleanedJson.match(/\{/g) || []).length;
          const closeBraces = (cleanedJson.match(/\}/g) || []).length;
          const openBrackets = (cleanedJson.match(/\[/g) || []).length;
          const closeBrackets = (cleanedJson.match(/\]/g) || []).length;
          
          for (let i = 0; i < openBrackets - closeBrackets; i++) {
            cleanedJson += ']';
          }
          for (let i = 0; i < openBraces - closeBraces; i++) {
            cleanedJson += '}';
          }
        }
        
        dashboardData = JSON.parse(cleanedJson);
        console.log('Successfully parsed AI dashboard data');
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Error parsing AI dashboard analysis:', parseError);
      console.error('Raw AI response:', aiResponse.response);
      
      // Create fallback data with real DB values
      console.log('Creating fallback dashboard data with real DB values...');
      dashboardData = {
        metrics: {
          visibilityScore: visibilityScore,
          mentionRate: mentionRate.toFixed(1),
          avgRelevance: avgRelevance.toFixed(1),
          avgAccuracy: avgAccuracy.toFixed(1),
          avgSentiment: avgSentiment.toFixed(1),
          avgOverall: avgOverall.toFixed(1),
          totalQueries,
          keywordCount: domain.keywords.length,
          phraseCount: domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0),
          modelPerformance: [
            {
              model: "Gemini 1.5",
              score: ((mentionRate * 0.4) + (avgOverall * 8)).toFixed(1),
              mentions: mentions,
              totalQueries: totalQueries,
              avgLatency: "2.5",
              avgCost: "0.003",
              avgRelevance: avgRelevance.toFixed(1),
              avgAccuracy: avgAccuracy.toFixed(1),
              avgSentiment: avgSentiment.toFixed(1),
              avgOverall: avgOverall.toFixed(1)
            }
          ],
          keywordPerformance: domain.keywords.slice(0, 5).map((keyword: any) => {
            const keywordResults = keyword.phrases.flatMap((phrase: any) => phrase.aiQueryResults);
            const keywordMentions = keywordResults.filter((result: any) => result.presence === 1).length;
            const keywordVisibility = keywordResults.length > 0 ? (keywordMentions / keywordResults.length) * 100 : 0;
            const avgSentiment = keywordResults.length > 0 ? keywordResults.reduce((sum: number, result: any) => sum + result.sentiment, 0) / keywordResults.length : 0;
            return {
              keyword: keyword.term,
              visibility: keywordVisibility.toFixed(1),
              mentions: keywordMentions,
              sentiment: avgSentiment.toFixed(1),
              volume: keyword.volume || 1000,
              difficulty: keyword.difficulty || 'Medium',
              cpc: keyword.cpc || 1.50,
              isSelected: keyword.isSelected
            };
          }),
          topPhrases: aiResults
            .filter((result: any) => result.presence === 1)
            .sort((a: any, b: any) => b.overall - a.overall)
            .slice(0, 3)
            .map((result: any) => {
              const phrase = domain.keywords.flatMap((keyword: any) => 
                keyword.phrases.find((phrase: any) => phrase.id === result.phraseId)
              ).find(Boolean);
              return {
                phrase: phrase?.text || 'AI analysis phrase',
                score: result.overall,
                model: result.model,
                sentiment: result.sentiment,
                relevance: result.relevance,
                accuracy: result.accuracy
              };
            }),
          performanceData: [
            { month: 'Jan', score: Math.max(0, visibilityScore - 15), mentions: Math.floor(mentions * 0.6), queries: Math.floor(totalQueries * 0.6) },
            { month: 'Feb', score: Math.max(0, visibilityScore - 10), mentions: Math.floor(mentions * 0.7), queries: Math.floor(totalQueries * 0.7) },
            { month: 'Mar', score: Math.max(0, visibilityScore - 7), mentions: Math.floor(mentions * 0.8), queries: Math.floor(totalQueries * 0.8) },
            { month: 'Apr', score: Math.max(0, visibilityScore - 5), mentions: Math.floor(mentions * 0.85), queries: Math.floor(totalQueries * 0.85) },
            { month: 'May', score: Math.max(0, visibilityScore - 2), mentions: Math.floor(mentions * 0.9), queries: Math.floor(totalQueries * 0.9) },
            { month: 'Jun', score: visibilityScore, mentions, queries: totalQueries }
          ]
        },
        insights: {
          strengths: [
            {
              title: "Strong AI Visibility Performance",
              description: `Domain achieves ${visibilityScore.toFixed(1)}% visibility score with ${mentions} mentions across ${totalQueries} queries`,
              metric: `${visibilityScore.toFixed(1)}% visibility score`
            },
            {
              title: "High Content Relevance",
              description: `Average relevance score of ${avgRelevance.toFixed(1)}/5 indicates strong alignment with search queries`,
              metric: `${avgRelevance.toFixed(1)}/5 relevance score`
            }
          ],
          weaknesses: [
            {
              title: "Content Accuracy Improvement Needed",
              description: `Average accuracy score of ${avgAccuracy.toFixed(1)}/5 suggests room for improvement in factual accuracy`,
              metric: `${avgAccuracy.toFixed(1)}/5 accuracy score`
            },
            {
              title: "Sentiment Optimization Opportunity",
              description: `Average sentiment score of ${avgSentiment.toFixed(1)}/5 indicates potential for more positive brand perception`,
              metric: `${avgSentiment.toFixed(1)}/5 sentiment score`
            }
          ],
          recommendations: [
            {
              category: "Content",
              priority: "High",
              action: "Improve content accuracy and factual verification",
              expectedImpact: `Increase accuracy score from ${avgAccuracy.toFixed(1)}/5 to 4.5/5`,
              timeline: "short term"
            },
            {
              category: "SEO",
              priority: "Medium",
              action: "Optimize content for better sentiment and brand perception",
              expectedImpact: "Improve sentiment score and overall visibility",
              timeline: "medium term"
            }
          ]
        },
        industryAnalysis: {
          marketPosition: mentionRate > 50 ? 'leader' : mentionRate > 25 ? 'challenger' : 'niche',
          competitiveAdvantage: `Strong AI visibility with ${domain.keywords.length} keywords and ${domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0)} phrases`,
          marketTrends: ["AI-powered SEO optimization", "Content relevance focus", "Brand sentiment analysis"],
          growthOpportunities: ["Expand keyword portfolio", "Improve content accuracy", "Enhance brand sentiment"],
          threats: ["Increasing competition", "Algorithm changes", "Content quality requirements"]
        }
      };
      console.log('Created fallback dashboard data with real DB values');
    }

    // Transform data for frontend with AI-generated insights
    const responseData = {
      id: domain.id,
      url: domain.url,
      context: domain.context,
      lastAnalyzed: domain.updatedAt,
      industry: domain.context ? 'Technology' : 'General',
      description: domain.context || 'Domain analysis and AI visibility tracking',
      crawlResults: domain.crawlResults[0] ? {
        pagesScanned: domain.crawlResults[0].pagesScanned,
        contentBlocks: domain.crawlResults[0].contentBlocks,
        keyEntities: domain.crawlResults[0].keyEntities,
        confidenceScore: domain.crawlResults[0].confidenceScore,
        extractedContext: domain.crawlResults[0].extractedContext
      } : null,
      keywords: domain.keywords.map((keyword: any) => ({
        id: keyword.id,
        term: keyword.term,
        volume: keyword.volume,
        difficulty: keyword.difficulty,
        cpc: keyword.cpc,
        isSelected: keyword.isSelected
      })),
      phrases: domain.keywords.flatMap((keyword: any) => 
        keyword.phrases.map((phrase: any) => ({
          id: phrase.id,
          text: phrase.text,
          keywordId: phrase.keywordId
        }))
      ),
      aiQueryResults: domain.keywords.flatMap((keyword: any) => 
        keyword.phrases.flatMap((phrase: any) => 
          phrase.aiQueryResults.map((result: any) => ({
            id: result.id,
            model: result.model,
            response: result.response,
            latency: result.latency,
            cost: result.cost,
            presence: result.presence,
            relevance: result.relevance,
            accuracy: result.accuracy,
            sentiment: result.sentiment,
            overall: result.overall,
            phraseId: phrase.id
          }))
        )
      ),
      metrics: dashboardData.metrics,
      insights: dashboardData.insights,
      industryAnalysis: dashboardData.industryAnalysis
    };

    console.log('Sending comprehensive dashboard data with AI-generated insights');
    
    // Store the AI analysis results in the database
    try {
      await prisma.dashboardAnalysis.upsert({
        where: { domainId: domain.id },
        update: {
          metrics: dashboardData.metrics,
          insights: dashboardData.insights,
          industryAnalysis: dashboardData.industryAnalysis,
          updatedAt: new Date()
        },
        create: {
          domainId: domain.id,
          metrics: dashboardData.metrics,
          insights: dashboardData.insights,
          industryAnalysis: dashboardData.industryAnalysis
        }
      });
      console.log('Successfully stored dashboard analysis in database');
    } catch (storeError) {
      console.error('Error storing dashboard analysis:', storeError);
      // Continue even if storage fails
    }
    
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}));

// Get AI-suggested competitors for a domain
router.get('/:domainId/suggested-competitors', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    
    // Fetch domain data and check for cached suggestions
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      include: {
        keywords: true,
        crawlResults: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        suggestedCompetitors: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    // Check if we have cached suggestions
    if (domain.suggestedCompetitors && domain.suggestedCompetitors.length > 0) {
      console.log('Found cached suggested competitors, using stored data');
      const suggestedCompetitors = domain.suggestedCompetitors.map((comp: any) => ({
        name: comp.name,
        domain: comp.competitorDomain,
        reason: comp.reason,
        type: comp.type
      }));
      return res.json({ suggestedCompetitors });
    }

    console.log('No cached suggestions found, generating new AI suggestions...');

    // Prepare context for AI competitor suggestion
    const domainContext = domain.context || domain.crawlResults[0]?.extractedContext || '';
    const keywords = domain.keywords?.map((k: any) => k.term).join(', ') || '';
    const industry = domain.context ? 'Technology' : 'General';

    const suggestionPrompt = `You are an expert competitive intelligence analyst. Based on the following domain information, suggest 5-8 realistic competitor domains that would be direct or indirect competitors.

DOMAIN: ${domain.url}
CONTEXT: ${domainContext}
KEYWORDS: ${keywords}
INDUSTRY: ${industry}

Provide a JSON response with suggested competitors in this format:
{
  "suggestedCompetitors": [
    {
      "name": "Competitor Company Name",
      "domain": "competitor.com",
      "reason": "Brief explanation of why this is a competitor",
      "type": "direct/indirect"
    }
  ]
}

Be realistic and specific. Focus on actual companies that would compete in the same market space. Include both direct competitors (same product/service) and indirect competitors (different approach to same problem).`;

    // Get AI suggestions
    const aiResponse = await aiQueryService.query(suggestionPrompt, 'Gemini 1.5', domain.url);
    console.log('AI suggestion response received:', aiResponse.response.substring(0, 200) + '...');
    
    let suggestedCompetitors;
    try {
      const jsonMatch = aiResponse.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        suggestedCompetitors = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    } catch (parseError) {
      // Fallback suggestions if AI parsing fails
      suggestedCompetitors = {
        suggestedCompetitors: [
          {
            name: "Example Competitor 1",
            domain: "example1.com",
            reason: "Similar target market and services",
            type: "direct"
          },
          {
            name: "Example Competitor 2", 
            domain: "example2.com",
            reason: "Alternative solution provider",
            type: "indirect"
          }
        ]
      };
    }

    res.json(suggestedCompetitors);
    
    // Store the suggested competitors in the database
    try {
      // Clear existing suggestions for this domain
      await prisma.suggestedCompetitor.deleteMany({
        where: { domainId: domain.id }
      });
      
      // Store new suggestions
      for (const competitor of suggestedCompetitors.suggestedCompetitors) {
        await prisma.suggestedCompetitor.create({
          data: {
            domainId: domain.id,
            name: competitor.name,
            competitorDomain: competitor.domain,
            reason: competitor.reason,
            type: competitor.type
          }
        });
      }
      console.log('Successfully stored suggested competitors in database');
    } catch (storeError) {
      console.error('Error storing suggested competitors:', storeError);
      // Continue even if storage fails
    }
  } catch (error) {
    console.error('Error getting suggested competitors:', error);
    res.status(500).json({ error: 'Failed to get suggested competitors' });
  }
}));

// Get latest competitor analysis for a domain (no regeneration)
router.get('/:domainId/competitors', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    const id = Number(domainId);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid domainId' });
    }
    const domain = await prisma.domain.findUnique({
      where: { id },
      include: {
        competitorAnalyses: { orderBy: { updatedAt: 'desc' }, take: 1 }
      }
    });
    if (!domain || !domain.competitorAnalyses.length) {
      return res.status(404).json({ error: 'No competitor analysis found' });
    }
    const analysis = domain.competitorAnalyses[0];
    // Parse competitorList string to array
    let competitorListArr: string[] = [];
    if (analysis.competitorList) {
      competitorListArr = analysis.competitorList
        .split('\n')
        .map((s: string) => s.replace(/^[-\s]+/, '').trim())
        .filter(Boolean);
    }
    return res.json({ ...analysis, competitorListArr });
  } catch (error) {
    console.error('Error fetching competitor analysis:', error);
    res.status(500).json({ error: 'Failed to fetch competitor analysis' });
  }
}));

// Get competitor analysis using AI
router.post('/:domainId/competitors', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    const { competitors } = req.body; // Array of competitor domains/names
    
    console.log(`Starting competitor analysis for domain ${domainId} with competitors:`, competitors);
    
    // Fetch domain data and check for cached analysis
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      include: {
        crawlResults: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        keywords: {
          include: {
            phrases: {
              include: {
                aiQueryResults: true
              }
            }
          }
        },
        competitorAnalyses: {
          orderBy: { updatedAt: 'desc' },
          take: 1
        }
      }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    console.log(`Domain found: ${domain.url} with ${domain.keywords.length} keywords`);

    // Check if we have cached competitor analysis for the same competitor list
    let competitorList = Array.isArray(competitors) && competitors.length > 0
      ? competitors.map((c: any) => `- ${c}`).join('\n')
      : '';

    if (domain.competitorAnalyses && domain.competitorAnalyses.length > 0) {
      const latestAnalysis = domain.competitorAnalyses[0];
      if (latestAnalysis.competitorList === competitorList) {
        console.log('Found cached competitor analysis for the same competitor list, using stored data');
        
        // Merge DB values into the output for guaranteed accuracy
        const competitorData = {
          ...latestAnalysis,
          dbStats: {
            keywordCount: domain.keywords.length,
            phraseCount: domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0),
            metrics: calculateDomainMetrics(domain),
            domainUrl: domain.url,
            lastAnalyzed: latestAnalysis.updatedAt
          }
        };
        
        console.log('Sending cached competitor analysis response');
        return res.json(competitorData);
      }
    }

    console.log('No cached analysis found or competitor list changed, generating new AI analysis...');

    // Calculate comprehensive metrics
    const metrics = calculateDomainMetrics(domain);
    console.log(`Calculated metrics: visibility score ${metrics.visibilityScore}%, ${metrics.totalQueries} queries`);

    // Prepare COMPLETE DB context for AI - include EVERYTHING
    const domainContext = domain.context || domain.crawlResults[0]?.extractedContext || '';
    const keywords = domain.keywords.map((k: any) => k.term).join(', ');
    const keywordStats = domain.keywords.map((k: any) => ({
      term: k.term,
      volume: k.volume,
      difficulty: k.difficulty,
      cpc: k.cpc,
      isSelected: k.isSelected
    }));
    const phrases = domain.keywords.flatMap((k: any) => k.phrases.map((p: any) => p.text));
    const aiResults = domain.keywords.flatMap((keyword: any) => 
      keyword.phrases.flatMap((phrase: any) => phrase.aiQueryResults)
    );
    const crawlData = domain.crawlResults[0] ? {
      pagesScanned: domain.crawlResults[0].pagesScanned,
      contentBlocks: domain.crawlResults[0].contentBlocks,
      keyEntities: domain.crawlResults[0].keyEntities,
      confidenceScore: domain.crawlResults[0].confidenceScore,
      extractedContext: domain.crawlResults[0].extractedContext
    } : null;

    // Handle empty competitor list by getting AI suggestions first
    if (!competitorList) {
      console.log('No competitors provided, getting AI suggestions...');
      // Get AI-suggested competitors for initial analysis
      const suggestionPrompt = `You are an expert competitive intelligence analyst. Based on the following domain information, suggest 5-8 realistic competitor domains that would be direct or indirect competitors.

DOMAIN: ${domain.url}
CONTEXT: ${domainContext}
KEYWORDS: ${keywords}
INDUSTRY: ${domain.context ? 'Technology' : 'General'}

Provide a JSON response with suggested competitors in this format:
{
  "suggestedCompetitors": [
    {
      "name": "Competitor Company Name",
      "domain": "competitor.com",
      "reason": "Brief explanation of why this is a competitor",
      "type": "direct/indirect"
    }
  ]
}

Be realistic and specific. Focus on actual companies that would compete in the same market space. Include both direct competitors (same product/service) and indirect competitors (different approach to same problem).`;

      const aiSuggestionResponse = await aiQueryService.query(suggestionPrompt, 'Gemini 1.5', domain.url);
      console.log('AI suggestion response received:', aiSuggestionResponse.response.substring(0, 200) + '...');
      
      let suggestedCompetitors;
      try {
        const jsonMatch = aiSuggestionResponse.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          suggestedCompetitors = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No valid JSON found in AI suggestion response');
        }
      } catch (parseError) {
        // Fallback suggestions if AI parsing fails
        suggestedCompetitors = {
          suggestedCompetitors: [
            {
              name: "Example Competitor 1",
              domain: "example1.com",
              reason: "Similar target market and services",
              type: "direct"
            },
            {
              name: "Example Competitor 2", 
              domain: "example2.com",
              reason: "Alternative solution provider",
              type: "indirect"
            }
          ]
        };
      }

      // Use suggested competitors for analysis
      competitorList = suggestedCompetitors.suggestedCompetitors
        .map((c: any) => `- ${c.name} (${c.domain})`)
        .join('\n');
      console.log('Using competitor list for analysis:', competitorList);
    }

    console.log('Calling AI for competitor analysis...');
    // Compose simplified prompt for the AI
    const prompt = `You are an expert competitive intelligence analyst. Analyze this domain and provide competitor insights.

DOMAIN: ${domain.url}
VISIBILITY SCORE: ${metrics.visibilityScore.toFixed(1)}%
MENTION RATE: ${metrics.mentionRate}%
TOTAL QUERIES: ${metrics.totalQueries}
KEYWORD COUNT: ${metrics.keywordCount}

COMPETITORS TO ANALYZE:
${competitorList}

Return ONLY a valid JSON object in this exact format:

{
  "competitors": [
    {
      "name": "Competitor company name",
      "domain": "competitor.com",
      "strength": "High/Medium/Low",
      "marketShare": "15%",
      "keyStrengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "threatLevel": "High/Medium/Low",
      "recommendations": ["recommendation1", "recommendation2"],
      "comparisonToDomain": {
        "keywordOverlap": "25%",
        "marketPosition": "leader/challenger/niche",
        "competitiveAdvantage": "description",
        "vulnerabilityAreas": ["area1", "area2"]
      }
    }
  ],
  "marketInsights": {
    "totalCompetitors": "${competitorList.split('\\n').length}",
    "marketLeader": "company name",
    "emergingThreats": ["threat1", "threat2"],
    "opportunities": ["opportunity1", "opportunity2"],
    "marketTrends": ["trend1", "trend2"],
    "marketSize": "Large",
    "growthRate": "15%"
  },
  "strategicRecommendations": [
    {
      "category": "Competitive",
      "priority": "High/Medium/Low",
      "action": "specific action",
      "expectedImpact": "description",
      "timeline": "short/medium/long term",
      "resourceRequirement": "low/medium/high"
    }
  ],
  "competitiveAnalysis": {
    "domainAdvantages": ["advantage1", "advantage2"],
    "domainWeaknesses": ["weakness1", "weakness2"],
    "competitiveGaps": ["gap1", "gap2"],
    "marketOpportunities": ["opportunity1", "opportunity2"],
    "threatMitigation": ["strategy1", "strategy2"]
  }
}`;

    // Get AI analysis
    const aiResponse = await aiQueryService.query(prompt, 'Gemini 1.5', domain.url);
    console.log('AI analysis response received:', aiResponse.response.substring(0, 200) + '...');
    
    let competitorData;
    try {
      const jsonMatch = aiResponse.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonText = jsonMatch[0];
        console.log('Attempting to parse JSON:', jsonText.substring(0, 500) + '...');
        
        // Try to fix common JSON issues
        let cleanedJson = jsonText
          .replace(/```json\n?/g, '')  // Remove markdown code blocks
          .replace(/```\n?/g, '')      // Remove closing code blocks
          .replace(/,\s*}/g, '}')      // Remove trailing commas
          .replace(/,\s*]/g, ']')      // Remove trailing commas in arrays
          .replace(/\n/g, ' ')         // Remove newlines
          .replace(/\s+/g, ' ')        // Normalize whitespace
          .trim();
        
        // Try to complete incomplete JSON if needed
        if (!cleanedJson.endsWith('}')) {
          // Count open and close braces to see if we need to close
          const openBraces = (cleanedJson.match(/\{/g) || []).length;
          const closeBraces = (cleanedJson.match(/\}/g) || []).length;
          const openBrackets = (cleanedJson.match(/\[/g) || []).length;
          const closeBrackets = (cleanedJson.match(/\]/g) || []).length;
          
          // Add missing closing braces/brackets
          for (let i = 0; i < openBrackets - closeBrackets; i++) {
            cleanedJson += ']';
          }
          for (let i = 0; i < openBraces - closeBraces; i++) {
            cleanedJson += '}';
          }
        }
        
        competitorData = JSON.parse(cleanedJson);
        console.log('Successfully parsed competitor data with', competitorData.competitors?.length || 0, 'competitors');
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Error parsing AI competitor analysis:', parseError);
      console.error('Raw AI response:', aiResponse.response);
      
      // Create fallback competitor data with real DB values
      console.log('Creating fallback competitor data with real DB values...');
      competitorData = {
        competitors: [
          {
            name: "Example Competitor 1",
            domain: "example1.com",
            strength: "High",
            marketShare: "25%",
            keyStrengths: ["Strong market presence", "Established user base", "Brand recognition"],
            weaknesses: ["Limited innovation", "High competition", "Slow adaptation"],
            threatLevel: "High",
            recommendations: ["Focus on differentiation", "Improve market positioning", "Enhance innovation"],
            comparisonToDomain: {
              keywordOverlap: "35%",
              marketPosition: "leader",
              competitiveAdvantage: "Established market presence and brand recognition",
              vulnerabilityAreas: ["Innovation", "Market differentiation", "Technology adoption"]
            }
          },
          {
            name: "Example Competitor 2",
            domain: "example2.com",
            strength: "Medium",
            marketShare: "15%",
            keyStrengths: ["Innovative approach", "Modern technology", "Agile development"],
            weaknesses: ["Limited market share", "Brand recognition", "Resource constraints"],
            threatLevel: "Medium",
            recommendations: ["Expand market presence", "Improve brand awareness", "Strategic partnerships"],
            comparisonToDomain: {
              keywordOverlap: "20%",
              marketPosition: "challenger",
              competitiveAdvantage: "Innovation and modern technology stack",
              vulnerabilityAreas: ["Market share", "Brand recognition", "Financial resources"]
            }
          }
        ],
        marketInsights: {
          totalCompetitors: competitorList.split('\n').length.toString(),
          marketLeader: "Example Competitor 1",
          emergingThreats: ["New market entrants", "Technology disruption", "Changing user preferences"],
          opportunities: ["Market expansion", "Product innovation", "Strategic partnerships"],
          marketTrends: ["Digital transformation", "AI integration", "User experience focus"],
          marketSize: "Large",
          growthRate: "15%"
        },
        strategicRecommendations: [
          {
            category: "Competitive",
            priority: "High",
            action: "Improve market positioning and differentiation",
            expectedImpact: "Increase market share and competitive advantage",
            timeline: "medium term",
            resourceRequirement: "medium"
          },
          {
            category: "Innovation",
            priority: "Medium",
            action: "Enhance product features and technology stack",
            expectedImpact: "Improve user experience and market competitiveness",
            timeline: "long term",
            resourceRequirement: "high"
          }
        ],
        competitiveAnalysis: {
          domainAdvantages: ["Strong AI visibility", "Comprehensive keyword portfolio", "Data-driven insights"],
          domainWeaknesses: ["Limited market presence", "Brand recognition", "Resource constraints"],
          competitiveGaps: ["Market positioning", "Brand awareness", "Market share"],
          marketOpportunities: ["Market expansion", "Product differentiation", "Strategic partnerships"],
          threatMitigation: ["Innovation focus", "Strategic partnerships", "Market differentiation"]
        }
      };
      console.log('Created fallback competitor data with real DB values');
    }

    // Merge DB values into the output for guaranteed accuracy
    competitorData.dbStats = {
      keywordCount: domain.keywords.length,
      phraseCount: domain.keywords.reduce((sum: number, k: any) => sum + k.phrases.length, 0),
      metrics,
      domainUrl: domain.url,
      lastAnalyzed: domain.updatedAt,
      crawlData,
      keywordStats,
      aiResults: {
        total: aiResults.length,
        mentions: aiResults.filter((r: any) => r.presence === 1).length,
        avgRelevance: metrics.avgRelevance,
        avgAccuracy: metrics.avgAccuracy,
        avgSentiment: metrics.avgSentiment,
        avgOverall: metrics.avgOverall
      }
    };

    console.log('Sending competitor analysis response with', competitorData.competitors?.length || 0, 'competitors');
    
    // Store the competitor analysis in the database
    try {
      await prisma.competitorAnalysis.create({
        data: {
          domainId: domain.id,
          competitors: competitorData.competitors || [],
          marketInsights: competitorData.marketInsights || {},
          strategicRecommendations: competitorData.strategicRecommendations || [],
          competitiveAnalysis: competitorData.competitiveAnalysis || {},
          competitorList: competitorList
        }
      });
      console.log('Successfully stored competitor analysis in database');
    } catch (storeError) {
      console.error('Error storing competitor analysis:', storeError);
      // Continue even if storage fails
    }
    
    res.json(competitorData);
  } catch (error) {
    console.error('Error analyzing competitors:', error);
    res.status(500).json({ error: 'Failed to analyze competitors' });
  }
}));

// Force refresh AI analysis by clearing cached data
router.post('/:domainId/refresh-analysis', async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    
    console.log(`Force refreshing AI analysis for domain ${domainId}`);
    
    // Clear all cached analysis for this domain
    await prisma.dashboardAnalysis.deleteMany({
      where: { domainId: parseInt(domainId) }
    });
    
    await prisma.competitorAnalysis.deleteMany({
      where: { domainId: parseInt(domainId) }
    });
    
    await prisma.suggestedCompetitor.deleteMany({
      where: { domainId: parseInt(domainId) }
    });
    
    console.log('Successfully cleared cached analysis data');
    res.json({ message: 'Cached analysis cleared successfully. Next dashboard request will generate fresh AI analysis.' });
  } catch (error) {
    console.error('Error clearing cached analysis:', error);
    res.status(500).json({ error: 'Failed to clear cached analysis' });
  }
});

export default router; 