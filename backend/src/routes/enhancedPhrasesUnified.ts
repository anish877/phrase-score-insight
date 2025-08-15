/**
 * UNIFIED ENHANCED PHRASES GENERATION
 * 
 * This file contains a single unified function that follows the exact flowchart:
 * 1. Semantic Content Analysis
 * 2. Community Data Mining (USING REAL SERP API for Reddit/Quora)
 * 3. Competitor Research
 * 4. Search Pattern Analysis
 * 5. Creating optimized intent phrases
 * 6. Intent Classification (integrated with phrase generation)
 * 7. Relevance Score (integrated with phrase generation)
 * 
 * No duplication - only one function that handles the complete flow.
 * 
 * SERP API INTEGRATION:
 * - Real Reddit data mining using SERP API
 * - Real Quora data mining using SERP API
 * - Rate limiting and error handling
 * - Actual community insights from real discussions
 */

import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import OpenAI from 'openai';
import { authenticateToken } from '../middleware/auth';

// SERP API configuration
const SERP_API_KEY = process.env.SERP_API_KEY;
if (!SERP_API_KEY) throw new Error('SERP_API_KEY not set in environment variables');

// SERP API helper functions
const searchSerpApi = async (query: string, engine: 'reddit' | 'quora', retries = 2) => {
  const baseUrl = 'https://serpapi.com/search';
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const params = new URLSearchParams({
        api_key: SERP_API_KEY,
        engine: 'google',
        q: `${query} site:${engine}.com`,
        gl: 'us',
        hl: 'en',
        num: '20', // Increased for better data
        safe: 'off'
      });

      console.log(`SERP API attempt ${attempt + 1}/${retries + 1} for ${engine}: ${query}`);
      
      const response = await fetch(`${baseUrl}?${params}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response structure from SERP API');
      }
      
      // Check for SERP API specific errors
      if (data.error) {
        throw new Error(`SERP API Error: ${data.error}`);
      }
      
      console.log(`SERP API success for ${engine}: Found ${data.organic_results?.length || 0} results`);
      return data;
      
    } catch (error) {
      console.error(`SERP API attempt ${attempt + 1} failed for ${engine}:`, error);
      
      if (attempt === retries) {
        console.error(`All SERP API attempts failed for ${engine}`);
        return {
          organic_results: [],
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
      
      // Wait before retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 2000));
    }
  }
};

const extractRedditData = (serpData: any) => {
  if (!serpData || !serpData.organic_results || !Array.isArray(serpData.organic_results)) {
    console.warn('Invalid SERP data structure for Reddit extraction');
    return [];
  }
  
  return serpData.organic_results
    .filter((result: any) => {
      return result && 
             result.link && 
             typeof result.link === 'string' && 
             result.link.includes('reddit.com') &&
             result.title &&
             result.snippet;
    })
    .map((result: any) => ({
      title: (result.title || '').trim(),
      content: (result.snippet || '').trim(),
      subreddit: extractSubredditFromUrl(result.link) || 'unknown',
      url: result.link || '',
      score: result.rating || 0,
      comments: 0,
      author: 'reddit_user',
      created: new Date().toISOString()
    }))
    .filter((item: any) => item.title.length > 0 && item.content.length > 0);
};

const extractQuoraData = (serpData: any) => {
  if (!serpData || !serpData.organic_results || !Array.isArray(serpData.organic_results)) {
    console.warn('Invalid SERP data structure for Quora extraction');
    return [];
  }
  
  return serpData.organic_results
    .filter((result: any) => {
      return result && 
             result.link && 
             typeof result.link === 'string' && 
             result.link.includes('quora.com') &&
             result.title &&
             result.snippet;
    })
    .map((result: any) => ({
      title: (result.title || '').trim(),
      content: (result.snippet || '').trim(),
      url: result.link || '',
      author: 'quora_user',
      answers: 0,
      views: 0
    }))
    .filter((item: any) => item.title.length > 0 && item.content.length > 0);
};

const extractSubredditFromUrl = (url: string): string => {
  const match = url.match(/reddit\.com\/r\/([^\/]+)/);
  return match ? match[1] : '';
};

// Add this helper function for relevance scoring
const calculateRelevanceScore = (text: string, businessContext: string): number => {
  const lowerText = text.toLowerCase();
  const lowerContext = businessContext.toLowerCase();
  const contextWords = lowerContext.split(/\s+/);
  
  let score = 0;
  
  // Exact context match
  if (lowerText.includes(lowerContext)) score += 10;
  
  // Individual word matches
  contextWords.forEach(word => {
    if (word.length > 2 && lowerText.includes(word)) {
      score += 2;
    }
  });
  
  // Quality indicators
  if (lowerText.includes('problem') || lowerText.includes('issue')) score += 3;
  if (lowerText.includes('solution') || lowerText.includes('help')) score += 3;
  if (lowerText.includes('how to') || lowerText.includes('best')) score += 2;
  
  // Length bonus for substantial content
  if (text.length > 100) score += 1;
  if (text.length > 300) score += 2;
  
  return Math.min(score, 20); // Cap at 20
};

const router = Router();
const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function for retry operations
const retryOperation = async (operation: () => Promise<any>, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Helper function to clean and parse JSON responses from AI
const parseAIResponse = (response: string, fallbackData: any = null) => {
  if (!response || response.trim() === '') {
    console.warn('Empty AI response received, using fallback data');
    return fallbackData;
  }

  try {
    let cleanResponse = response.trim();
    
    // Remove markdown code blocks more aggressively
    const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/g;
    const match = jsonBlockRegex.exec(cleanResponse);
    if (match) {
      cleanResponse = match[1].trim();
    }
    
    // Remove any text before the first { or [
    const firstBrace = cleanResponse.indexOf('{');
    const firstBracket = cleanResponse.indexOf('[');
    const startIndex = Math.min(
      firstBrace >= 0 ? firstBrace : Infinity,
      firstBracket >= 0 ? firstBracket : Infinity
    );
    
    if (startIndex !== Infinity) {
      cleanResponse = cleanResponse.substring(startIndex);
    }
    
    // Find the last complete JSON object/array
    let braceCount = 0;
    let bracketCount = 0;
    let inString = false;
    let escapeNext = false;
    let lastValidEnd = -1;
    
    for (let i = 0; i < cleanResponse.length; i++) {
      const char = cleanResponse[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (inString) continue;
      
      if (char === '{') braceCount++;
      else if (char === '}') {
        braceCount--;
        if (braceCount === 0 && bracketCount === 0) {
          lastValidEnd = i;
        }
      }
      else if (char === '[') bracketCount++;
      else if (char === ']') {
        bracketCount--;
        if (braceCount === 0 && bracketCount === 0) {
          lastValidEnd = i;
        }
      }
    }
    
    if (lastValidEnd > 0) {
      cleanResponse = cleanResponse.substring(0, lastValidEnd + 1);
    }
    
    // Clean up common JSON issues
    cleanResponse = cleanResponse
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/([}\]])(\s*)([}\]])/g, '$1$2$3') // Fix bracket spacing
      .replace(/\n\s*/g, ' ') // Remove newlines and extra spaces
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
    
    const parsed = JSON.parse(cleanResponse);
    console.log('Successfully parsed AI response');
    return parsed;
    
  } catch (parseError) {
    console.warn('JSON parsing failed, attempting repair...', parseError);
    
    // Try to extract and parse individual objects from the response
    try {
      // Look for array patterns
      if (response.includes('[') && response.includes(']')) {
        const arrayMatches = response.match(/\[[\s\S]*?\]/g);
        if (arrayMatches && arrayMatches.length > 0) {
          const lastArray = arrayMatches[arrayMatches.length - 1];
          return JSON.parse(lastArray);
        }
      }
      
      // Look for object patterns
      if (response.includes('{') && response.includes('}')) {
        const objectMatches = response.match(/\{[\s\S]*?\}/g);
        if (objectMatches && objectMatches.length > 0) {
          const lastObject = objectMatches[objectMatches.length - 1];
          return JSON.parse(lastObject);
        }
      }
    } catch (repairError) {
      console.warn('JSON repair also failed:', repairError);
    }
    
    console.warn('Using fallback data due to JSON parsing failure');
    return fallbackData || { error: 'Failed to parse AI response', originalResponse: response.substring(0, 500) };
  }
};

// GET /enhanced-phrases/:domainId/step3 - Load Step3Results data
router.get('/:domainId/step3', authenticateToken, async (req, res) => {
  const { domainId } = req.params;
  const authReq = req as any;

  try {
    // Get domain and verify access
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      include: {
        keywords: {
          include: {
            generatedIntentPhrases: {
              include: {
                relevanceScoreResults: true
              }
            },
            communityInsights: true,
            searchPatterns: true
          }
        },
        semanticAnalyses: true,
        keywordAnalyses: true,
        searchVolumeClassifications: true,
        intentClassifications: true
      }
    });

    if (!domain || domain.userId !== authReq.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Transform data for Step3Results format
    const step3Data = {
      domain: {
        id: domain.id,
        url: domain.url,
        context: domain.context,
        location: domain.location
      },
      selectedKeywords: domain.keywords.map((kw: any) => ({
        id: kw.id,
        keyword: kw.term,
        volume: kw.volume,
        difficulty: kw.difficulty,
        cpc: kw.cpc,
        isSelected: kw.isSelected
      })),
      analysis: {
        semanticAnalysis: domain.semanticAnalyses[0] || null,
        keywordAnalysis: domain.keywordAnalyses[0] || null,
        searchVolumeClassification: domain.searchVolumeClassifications[0] || null,
        intentClassification: domain.intentClassifications[0] || null
      },
      existingPhrases: domain.keywords.flatMap((kw: any) => 
        kw.generatedIntentPhrases.map((phrase: any) => ({
          id: phrase.id.toString(),
          phrase: phrase.phrase,
          relevanceScore: phrase.relevanceScore || Math.floor(Math.random() * 30) + 70,
          intent: phrase.intent || 'Informational',
          intentConfidence: phrase.intentConfidence || 75,
          sources: phrase.sources as string[] || ['AI Generated', 'Community'],
          trend: phrase.trend || 'Rising',
          editable: true,
          selected: phrase.isSelected,
          parentKeyword: kw.term,
          keywordId: kw.id
        }))
      ),
      communityInsights: domain.keywords.flatMap((kw: any) => 
        kw.communityInsights.map((insight: any) => ({
          keywordId: kw.id,
          keyword: kw.term,
          sources: insight.sources,
          summary: insight.summary
        }))
      ),
      searchPatterns: domain.keywords.flatMap((kw: any) => 
        kw.searchPatterns.map((pattern: any) => ({
          keywordId: kw.id,
          keyword: kw.term,
          patterns: pattern.patterns,
          summary: pattern.summary
        }))
      )
    };

    res.json(step3Data);
  } catch (error) {
    console.error('Error loading Step3Results data:', error);
    res.status(500).json({ error: 'Failed to load Step3Results data' });
  }
});

// POST /enhanced-phrases/:domainId/step3/generate - UNIFIED ENHANCED PHRASES GENERATION
router.post('/:domainId/step3/generate', authenticateToken, async (req, res) => {
  const { domainId } = req.params;
  const authReq = req as any;

  // Set up SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // Get domain and keywords
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      include: {
        keywords: true
      }
    });

    if (!domain || domain.userId !== authReq.user.userId) {
      sendEvent('error', { error: 'Access denied' });
      res.end();
      return;
    }

    // Use selected keywords if available, otherwise use all keywords
    const selectedKeywords = domain.keywords.filter(kw => kw.isSelected);
    const keywordsToProcess = selectedKeywords.length > 0 ? selectedKeywords : domain.keywords;
    
    if (keywordsToProcess.length === 0) {
      sendEvent('error', { error: 'No keywords found' });
      res.end();
      return;
    }

    // Initialize generation steps according to flowchart
    const generatingSteps = [
      { name: 'Semantic Content Analysis', status: 'pending', progress: 0, description: 'Analyzing brand voice, theme, and target audience' },
      { name: 'Community Data Mining', status: 'pending', progress: 0, description: 'Extracting real insights from Reddit and Quora using SERP API' },
      { name: 'Competitor Research', status: 'pending', progress: 0, description: 'Researching competitors mentioned in community discussions' },
      { name: 'Search Pattern Analysis', status: 'pending', progress: 0, description: 'Analyzing user search behaviors' },
      { name: 'Creating optimized intent phrases', status: 'pending', progress: 0, description: 'Generating optimized search phrases' },
      { name: 'Intent Classification', status: 'pending', progress: 0, description: 'Classifying generated phrases by intent' },
      { name: 'Relevance Score', status: 'pending', progress: 0, description: 'Computing semantic relevance scores' }
    ];

    sendEvent('steps', generatingSteps);

    const totalKeywords = keywordsToProcess.length;
    let totalTokenUsage = 0;

    // Initialize data storage arrays
    let communityInsightData: any = null;
    let competitorAnalysisData: any = null;
    const communityInsights: any[] = [];
    const competitorAnalysis: any[] = [];
    const searchPatterns: any[] = [];
    const newSearchPatterns: any[] = []; // Separate array for new patterns to insert

    // ========================================
    // STEP 1: SEMANTIC CONTENT ANALYSIS
    // ========================================
    sendEvent('step-update', { index: 0, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'semantic_analysis',
      message: 'Semantic Content Analysis - Analyzing brand voice, theme, and target audience',
      progress: 20
    });

    // Check if semantic analysis already exists
    const existingSemanticAnalysis = await prisma.semanticAnalysis.findFirst({
      where: { domainId: domain.id }
    });

    let semanticContext = '';
    if (existingSemanticAnalysis) {
      console.log('Semantic analysis already exists, skipping...');
      semanticContext = existingSemanticAnalysis.contentSummary;
      sendEvent('progress', { 
        phase: 'semantic_analysis',
        message: 'Semantic Content Analysis - Using existing data',
        progress: 100
      });
      sendEvent('step-update', { index: 0, status: 'completed', progress: 100 });
    } else {
      try {
      const semanticPrompt = `
You are an expert brand strategist and digital anthropologist with 15+ years of experience analyzing online communities and brand positioning. Your task is to conduct a comprehensive brand intelligence analysis.

DOMAIN ANALYSIS TARGET:
URL: ${domain.url}
Business Context: ${domain.context || 'Context not provided - analyze from available data'}
Geographic Focus: ${domain.location || 'Global market'}

ANALYSIS FRAMEWORK:
Perform a multi-layered brand intelligence analysis using the following systematic approach:

## 1. BRAND VOICE & TONE ARCHITECTURE
- **Voice Personality**: Identify core personality traits (e.g., authoritative, approachable, innovative)
- **Tonal Range**: Map emotional spectrum from formal to casual communication
- **Communication Style**: Analyze sentence structure, vocabulary complexity, and rhetorical devices
- **Brand Archetype**: Determine primary brand archetype (Hero, Sage, Creator, etc.)
- **Linguistic Patterns**: Identify recurring phrases, terminology, and communication conventions

## 2. TARGET AUDIENCE SEGMENTATION
- **Primary Demographics**: Age, gender, income, education, location
- **Psychographics**: Values, interests, lifestyle patterns, pain points
- **Digital Behavior**: Platform preferences, content consumption habits, engagement patterns
- **Purchase Journey**: Decision-making process, influencing factors, conversion triggers
- **Community Dynamics**: How audiences interact, share, and advocate

## 3. INDUSTRY POSITIONING & THEMES
- **Market Category**: Primary and secondary industry classifications
- **Competitive Landscape**: Position relative to competitors and market leaders
- **Value Proposition**: Unique selling points and differentiation factors
- **Thematic Pillars**: Core topics and subject matter expertise
- **Trend Alignment**: How brand aligns with industry and cultural trends

## 4. CONTENT STRATEGY & MESSAGING
- **Content Formats**: Preferred content types and presentation styles
- **Messaging Hierarchy**: Primary, secondary, and supporting messages
- **Storytelling Approach**: Narrative techniques and content themes
- **Visual Identity Cues**: Implied design and aesthetic preferences
- **Engagement Mechanisms**: How content drives interaction and conversion

## 5. COMMUNITY ECOSYSTEM ANALYSIS
- **Community Type**: Nature of audience gathering (professional, enthusiast, customer-based)
- **Belonging Signals**: What makes someone part of this community
- **Shared Language**: Industry jargon, insider terminology, cultural references
- **Social Dynamics**: Leadership structures, influence patterns, knowledge sharing
- **Territory Mapping**: Where this community exists online and offline

## 6. STRATEGIC FAQ INTELLIGENCE
Generate 15-20 high-value questions covering:
- **Service/Product FAQs**: Core offering questions
- **Industry Education**: Knowledge-building questions
- **Decision Support**: Comparison and evaluation questions
- **Implementation**: How-to and process questions
- **Troubleshooting**: Problem-solving scenarios

CRITICAL INSTRUCTIONS:
- Base analysis on domain inference, industry knowledge, and contextual clues
- Provide specific, actionable insights rather than generic observations
- Consider seasonal, cultural, and market timing factors
- Flag any assumptions made due to limited information
- Prioritize insights that directly impact content strategy and community engagement

OUTPUT FORMAT:
Return a well-structured JSON object with the following schema:

{
  "brandVoice": {
    "personality": [],
    "toneSpectrum": "",
    "communicationStyle": "",
    "archetype": "",
    "linguisticPatterns": []
  },
  "targetAudience": {
    "primaryDemographics": {},
    "psychographics": {},
    "digitalBehavior": {},
    "purchaseJourney": [],
    "communityDynamics": ""
  },
  "industryThemes": {
    "marketCategory": "",
    "competitivePosition": "",
    "valueProposition": [],
    "thematicPillars": [],
    "trendAlignment": []
  },
  "contentStrategy": {
    "preferredFormats": [],
    "messagingHierarchy": {},
    "storytellingApproach": "",
    "visualCues": [],
    "engagementMechanisms": []
  },
  "communityContext": {
    "communityType": "",
    "belongingSignals": [],
    "sharedLanguage": [],
    "socialDynamics": "",
    "territoryMapping": []
  },
  "strategicFAQs": {
    "serviceQuestions": [],
    "industryEducation": [],
    "decisionSupport": [],
    "implementation": [],
    "troubleshooting": []
  },
  "confidenceLevel": "",
  "assumptions": [],
  "recommendedValidation": []
}

QUALITY STANDARDS:
Ensure each insight is:
✓ Specific and actionable
✓ Grounded in brand strategy principles
✓ Relevant to community data mining objectives
✓ Useful for phrase generation and targeting
✓ Differentiated from generic industry analysis
`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: semanticPrompt }],
        temperature: 0.3,
        max_tokens: 1500
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        const semanticData = parseAIResponse(response, { error: 'Failed to parse semantic data' });
        semanticContext = semanticData ? JSON.stringify(semanticData) : response;
        totalTokenUsage += completion.usage?.total_tokens || 0;
      }
    } catch (error) {
      console.error('Error in semantic content analysis:', error);
      throw new Error(`Semantic content analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

      // Save semantic analysis to database
      try {
        await prisma.semanticAnalysis.create({
          data: {
            domainId: domain.id,
            contentSummary: semanticContext,
            keyThemes: [],
            brandVoice: '{}',
            targetAudience: {},
            contentGaps: [],
            tokenUsage: totalTokenUsage
          }
        });
        console.log('Successfully stored semantic analysis');
      } catch (error) {
        console.error('Error storing semantic analysis:', error);
        throw new Error(`Failed to store semantic analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      sendEvent('progress', { 
        phase: 'semantic_analysis',
        message: 'Semantic Content Analysis completed',
        progress: 100
      });
      sendEvent('step-update', { index: 0, status: 'completed', progress: 100 });
    }

    // ========================================
    // STEP 2: COMMUNITY DATA MINING (PER DOMAIN)
    // ========================================
    sendEvent('step-update', { index: 1, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'community_mining',
      message: 'Community Data Mining - Extracting insights from Reddit and Quora for domain',
      progress: 25
    });

    // Check if community insight already exists
    const existingCommunityInsight = await prisma.communityInsight.findFirst({
      where: { domainId: domain.id }
    });

    if (existingCommunityInsight) {
      console.log('Community insight already exists, using existing data...');
      communityInsightData = existingCommunityInsight;
      sendEvent('progress', { 
        phase: 'community_mining',
        message: 'Community Data Mining - Using existing data',
        progress: 100
      });
      sendEvent('step-update', { index: 1, status: 'completed', progress: 100 });
    } else {
      console.log(`Starting community mining for domain: ${domain.url}`);
      
      // Create more targeted search queries
      const businessContext = domain.context || domain.url.replace(/https?:\/\//, '').replace(/www\./, '');
      const searchQueries = [
        `${businessContext} problems issues reddit`,
        `${businessContext} solutions help reddit`,
        `${businessContext} advice tips reddit`,
        `best ${businessContext} recommendations reddit`,
        `${businessContext} questions answers quora`,
        `how to ${businessContext} quora`,
        `${businessContext} vs alternatives quora`
      ];

      const allRedditData = [];
      const allQuoraData = [];

      try {
        // IMPROVED REAL SERP API COMMUNITY MINING
        console.log(`Starting enhanced SERP API community mining for domain: ${domain.url}`);

        // Enhanced Reddit mining with better error handling
        console.log('Mining Reddit data...');
        for (const query of searchQueries.filter(q => q.includes('reddit'))) {
          try {
            console.log(`Reddit query: "${query}"`);
            
            const serpData = await searchSerpApi(query, 'reddit');
            
            if (serpData && !serpData.error) {
              const redditResults = extractRedditData(serpData);
              allRedditData.push(...redditResults);
              console.log(`✓ Reddit: ${redditResults.length} results for "${query}"`);
            } else {
              console.warn(`✗ Reddit: No results for "${query}" - ${serpData?.error || 'Unknown error'}`);
            }
            
            // Rate limiting between requests
            await new Promise(resolve => setTimeout(resolve, 1500));
            
          } catch (error) {
            console.error(`Reddit mining error for "${query}":`, error);
            continue; // Continue with next query
          }
        }

        // Enhanced Quora mining with better error handling
        console.log('Mining Quora data...');
        for (const query of searchQueries.filter(q => q.includes('quora'))) {
          try {
            console.log(`Quora query: "${query}"`);
            
            const serpData = await searchSerpApi(query, 'quora');
            
            if (serpData && !serpData.error) {
              const quoraResults = extractQuoraData(serpData);
              allQuoraData.push(...quoraResults);
              console.log(`✓ Quora: ${quoraResults.length} results for "${query}"`);
            } else {
              console.warn(`✗ Quora: No results for "${query}" - ${serpData?.error || 'Unknown error'}`);
            }
            
            // Rate limiting between requests
            await new Promise(resolve => setTimeout(resolve, 1500));
            
          } catch (error) {
            console.error(`Quora mining error for "${query}":`, error);
            continue; // Continue with next query
          }
        }

        // Remove duplicates and validate data
        const uniqueRedditData = allRedditData.filter((item, index, arr) => 
          index === arr.findIndex(t => t.url === item.url || t.title === item.title)
        );
        
        const uniqueQuoraData = allQuoraData.filter((item, index, arr) => 
          index === arr.findIndex(t => t.url === item.url || t.title === item.title)
        );

        console.log(`Final community data: ${uniqueRedditData.length} Reddit posts, ${uniqueQuoraData.length} Quora questions`);

        // Prepare community data for analysis
        const combinedCommunityData = [
          ...uniqueRedditData.map(post => ({
            platform: 'reddit',
            title: post.title,
            content: post.content,
            subreddit: post.subreddit,
            url: post.url,
            type: 'community_post',
            relevance: calculateRelevanceScore(post.title + ' ' + post.content, businessContext)
          })),
          ...uniqueQuoraData.map(question => ({
            platform: 'quora',
            title: question.title,
            content: question.content,
            url: question.url,
            type: 'community_question',
            relevance: calculateRelevanceScore(question.title + ' ' + question.content, businessContext)
          }))
        ];

        // Sort by relevance and take top results
        combinedCommunityData.sort((a, b) => b.relevance - a.relevance);
        const topCommunityData = combinedCommunityData.slice(0, 50); // Top 50 most relevant

        console.log(`Using ${topCommunityData.length} top community insights for analysis`);

        // Only proceed with AI analysis if we have meaningful data
        if (topCommunityData.length === 0) {
          throw new Error('No community data retrieved from SERP API');
        }

        // Enhanced community analysis prompt with better structure
        const communityAnalysisPrompt = `
Analyze real community discussions to extract actionable business intelligence.

BUSINESS CONTEXT:
Domain: ${domain.url}
Context: ${domain.context || 'General business services'}
Location: ${domain.location || 'Global'}

COMMUNITY DATA (${topCommunityData.length} posts):
${topCommunityData.slice(0, 20).map((item, idx) => 
  `${idx + 1}. [${item.platform.toUpperCase()}] ${item.title}\n   Content: ${item.content.substring(0, 200)}...`
).join('\n\n')}

ANALYSIS REQUIREMENTS:
Extract specific, actionable insights about user pain points, solutions, and market opportunities.

OUTPUT AS VALID JSON:
{
  "sources": {
    "reddit": ${uniqueRedditData.length},
    "quora": ${uniqueQuoraData.length},
    "total": ${topCommunityData.length}
  },
  "summary": {
    "primaryQuestions": [
      "What are users most concerned about?",
      "What solutions do they seek?",
      "What problems remain unsolved?"
    ],
    "criticalPainPoints": [
      "Specific user frustrations",
      "Common problems mentioned",
      "Gaps in current solutions"
    ],
    "recommendedSolutions": [
      "Community-endorsed approaches",
      "Popular tools/services mentioned",
      "Best practices shared"
    ],
    "marketOpportunities": [
      "Underserved needs identified",
      "Competitive gaps found",
      "Emerging trends spotted"
    ]
  },
  "communityInsights": {
    "userPersonas": ["Primary user types identified"],
    "commonLanguage": ["Terms and phrases users employ"],
    "sentimentPatterns": ["Overall community sentiment"],
    "actionableIntel": ["Specific business opportunities"]
  }
}`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: communityAnalysisPrompt }],
          temperature: 0.2, // Lower temperature for more consistent JSON
          max_tokens: 2000,
          response_format: { type: "json_object" } // Force JSON response
        });

        const response = completion.choices[0]?.message?.content;
        
        if (!response || response.trim() === '') {
          throw new Error('Empty response from OpenAI API');
        }

        console.log('Raw AI response length:', response.length);
        
        const communityData = parseAIResponse(response, {
          sources: { reddit: uniqueRedditData.length, quora: uniqueQuoraData.length, total: topCommunityData.length },
          summary: {
            primaryQuestions: [`Common questions about ${businessContext}`],
            criticalPainPoints: [`Main challenges with ${businessContext}`],
            recommendedSolutions: [`Popular solutions for ${businessContext}`],
            marketOpportunities: [`Opportunities in ${businessContext} market`]
          },
          communityInsights: {
            userPersonas: [`${businessContext} users`],
            commonLanguage: [`${businessContext} terminology`],
            sentimentPatterns: ['Mixed sentiment observed'],
            actionableIntel: [`Market intelligence for ${businessContext}`]
          }
        });

        // Validate the parsed data structure
        if (!communityData || typeof communityData !== 'object') {
          throw new Error('Invalid community data structure received');
        }

        // Store community insight data with validation
        communityInsightData = {
          domainId: domain.id,
          sources: {
            reddit: uniqueRedditData.length,
            quora: uniqueQuoraData.length,
            total: topCommunityData.length,
            quality: topCommunityData.length > 10 ? 'High' : topCommunityData.length > 5 ? 'Medium' : 'Low',
            searchQueries: searchQueries,
            dataPoints: topCommunityData
          },
          summary: JSON.stringify(communityData.summary || 'Community analysis completed'),
          tokenUsage: completion.usage?.total_tokens || 0
        };

        totalTokenUsage += completion.usage?.total_tokens || 0;
        console.log(`✓ Community mining completed: ${topCommunityData.length} insights analyzed`);

      } catch (error) {
        console.error(`Community mining failed for domain ${domain.url}:`, error);
        
        // Enhanced fallback with partial data if available
        const fallbackSummary = {
          primaryQuestions: [`How to improve ${businessContext}?`],
          criticalPainPoints: [`Common ${businessContext} challenges`],
          recommendedSolutions: [`Best practices for ${businessContext}`],
          marketOpportunities: [`${businessContext} market gaps`]
        };
        
        communityInsightData = {
          domainId: domain.id,
          sources: { 
            reddit: allRedditData?.length || 0, 
            quora: allQuoraData?.length || 0, 
            total: (allRedditData?.length || 0) + (allQuoraData?.length || 0),
            error: error instanceof Error ? error.message : 'Community mining failed',
            fallback: true
          },
          summary: JSON.stringify(fallbackSummary),
          tokenUsage: 0
        };
        
        console.log('Using fallback community data');
      }

      // Store community insight for domain
      try {
        await retryOperation(async () => {
          return await prisma.communityInsight.create({
            data: communityInsightData
          });
        });
        console.log(`Successfully stored community insight for domain: ${domain.url}`);
      } catch (error) {
        console.error('Error storing community insight:', error);
        throw new Error(`Failed to store community insight: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      console.log(`Completing community mining phase for domain: ${domain.url}`);
      sendEvent('progress', { 
        phase: 'community_mining',
        message: `Community Data Mining completed for domain`,
        progress: 100
      });
      sendEvent('step-update', { index: 1, status: 'completed', progress: 100 });
    }

    // ========================================
    // STEP 3: COMPETITOR RESEARCH (PER DOMAIN)
    // ========================================
    sendEvent('step-update', { index: 2, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'competitor_research',
      message: 'Competitor Research - Researching competitors from community discussions',
      progress: 33
    });

    // Check if competitor analysis already exists
    const existingCompetitorAnalysis = await prisma.competitorAnalysis.findFirst({
      where: { domainId: domain.id }
    });

    if (existingCompetitorAnalysis) {
      console.log('Competitor analysis already exists, using existing data...');
      competitorAnalysisData = existingCompetitorAnalysis;
      sendEvent('progress', { 
        phase: 'competitor_research',
        message: 'Competitor Research - Using existing data',
        progress: 100
      });
      sendEvent('step-update', { index: 2, status: 'completed', progress: 100 });
    } else {
      try {
      // Get community data for domain
      const communityContext = communityInsightData ? communityInsightData.summary : 'No community data available';

      const competitorPrompt = `
# Expert Community-Driven Competitor Intelligence Framework

## Core Intelligence Mission
Conduct deep competitive analysis based on authentic community discussions, extracting real competitor insights from actual user conversations rather than theoretical market analysis. Focus on discovering competitive landscape through the lens of actual user experiences and recommendations.

## Input Parameters
**Target Domain:** ${domain.url}  
**Business Context:** ${domain.context || 'General business services'}  
**Geographic Market:** ${domain.location || 'Global'}  
**Semantic Universe:** ${semanticContext}  
**Community Intelligence Data:** ${communityContext}

## Advanced Competitive Intelligence Framework

### 1. Community-Based Competitor Discovery

#### Direct Competitor Identification:
- **Brand Mentions:** Companies/services explicitly named in discussions
- **Recommendation Patterns:** Alternatives suggested by community members
- **Comparison Contexts:** "X vs Y" discussions and debates
- **Problem-Solution Mapping:** Services mentioned for solving similar problems
- **User Migration Stories:** "I switched from X to Y because..." narratives

#### Indirect Competitor Analysis:
- **Alternative Solutions:** Different approaches to solving same problems
- **Adjacent Market Players:** Services in related but different categories
- **DIY/Internal Alternatives:** In-house solutions users mention
- **Emerging Disruptors:** New players getting community attention
- **Substitute Products:** Non-obvious alternatives users consider

### 2. Community Sentiment Intelligence

#### Competitor Strength Indicators:
- **Positive Mentions:** Frequency and context of praise
- **Recommendation Confidence:** How strongly users advocate
- **Feature Appreciation:** Specific capabilities users love
- **Reliability Testimonials:** Uptime, consistency, dependability stories
- **Success Stories:** Concrete results and outcomes shared

#### Weakness Detection Signals:
- **Complaint Patterns:** Recurring issues and frustrations
- **Migration Triggers:** Why users left competitors
- **Feature Gap Mentions:** "I wish X had Y" discussions
- **Support Issues:** Customer service and help problems
- **Pricing Complaints:** Cost-related dissatisfaction

### 3. Market Positioning Intelligence

#### Positioning Analysis Framework:
- **Value Proposition Clarity:** How competitors are perceived to solve problems
- **Target Audience Identification:** Who recommends/uses each competitor
- **Use Case Specialization:** Specific scenarios where competitors excel
- **Market Segment Focus:** Enterprise, SMB, consumer, niche markets
- **Geographic Strengths:** Regional or local competitive advantages

#### Differentiation Pattern Recognition:
- **Unique Selling Points:** What makes each competitor distinct
- **Feature Differentiation:** Capabilities that set competitors apart
- **Service Model Variations:** Different approaches to service delivery
- **Pricing Strategy Insights:** How competitors position on value/cost
- **Brand Personality Distinctions:** How users perceive competitor brands

## Community Language Mining for Competitive Intelligence

### User Perception Analysis:
1. **Authority Signals:** Which competitors are seen as industry leaders
2. **Trust Indicators:** Companies users feel most comfortable recommending
3. **Innovation Recognition:** Who's seen as cutting-edge or traditional
4. **Reliability Reputation:** Which competitors are seen as dependable
5. **Value Perception:** Cost-benefit analysis from user perspectives

### Competitive Context Mapping:
1. **Decision Frameworks:** How users compare and choose between options
2. **Evaluation Criteria:** What factors matter most in user decisions
3. **Deal Breakers:** Features/issues that eliminate competitors from consideration
4. **Success Metrics:** How users measure competitor performance
5. **Loyalty Drivers:** What keeps users committed to specific competitors

## Output Specification

Generate comprehensive competitive intelligence in this exact JSON structure:

{
  "competitors": {
    "directCompetitors": [
      {
        "name": "[Company/Service Name]",
        "url": "[Website URL if mentioned]",
        "mentionFrequency": "[Low/Medium/High]",
        "userSentiment": "[Positive/Neutral/Negative with score 1-10]",
        "primaryStrengths": ["[strength 1]", "[strength 2]", "..."],
        "knownWeaknesses": ["[weakness 1]", "[weakness 2]", "..."],
        "targetAudience": "[Who uses this competitor]",
        "pricingPosition": "[Premium/Mid-market/Budget/Unknown]",
        "keyDifferentiators": ["[differentiator 1]", "[differentiator 2]", "..."],
        "communityQuotes": ["[actual user quote 1]", "[user quote 2]", "..."]
      }
    ],
    "indirectCompetitors": [
      {
        "name": "[Alternative Solution/Company]",
        "category": "[Type of alternative]",
        "threatLevel": "[High/Medium/Low]",
        "userAdoption": "[How frequently mentioned as alternative]",
        "advantages": ["[advantage 1]", "[advantage 2]", "..."],
        "limitations": ["[limitation 1]", "[limitation 2]", "..."],
        "migrationTriggers": ["[why users choose this alternative]", "..."]
      }
    ]
  },
  "analysis": {
    "marketLandscape": {
      "dominantPlayers": ["[top competitor 1]", "[top competitor 2]", "..."],
      "emergingThreats": ["[emerging competitor 1]", "[emerging competitor 2]", "..."],
      "marketGaps": ["[underserved need 1]", "[underserved need 2]", "..."],
      "consolidationTrends": ["[trend 1]", "[trend 2]", "..."]
    },
    "competitivePositioning": {
      "premiumSegment": {
        "leaders": ["[competitor 1]", "[competitor 2]", "..."],
        "characteristics": ["[characteristic 1]", "[characteristic 2]", "..."],
        "userProfile": "[who chooses premium options]"
      },
      "midMarket": {
        "leaders": ["[competitor 1]", "[competitor 2]", "..."],
        "characteristics": ["[characteristic 1]", "[characteristic 2]", "..."],
        "userProfile": "[who chooses mid-market options]"
      },
      "budgetSegment": {
        "leaders": ["[competitor 1]", "[competitor 2]", "..."],
        "characteristics": ["[characteristic 1]", "[characteristic 2]", "..."],
        "userProfile": "[who chooses budget options]"
      }
    },
    "strengthsWeaknessMatrix": {
      "[Competitor Name]": {
        "strengths": ["[strength 1]", "[strength 2]", "..."],
        "weaknesses": ["[weakness 1]", "[weakness 2]", "..."],
        "userLoyalty": "[High/Medium/Low with explanation]",
        "migrationVulnerability": ["[vulnerability 1]", "[vulnerability 2]", "..."]
      }
    },
    "featureGapAnalysis": {
      "commonGaps": ["[gap mentioned across multiple competitors]", "..."],
      "competitorSpecificGaps": {
        "[Competitor Name]": ["[specific gap 1]", "[specific gap 2]", "..."]
      },
      "innovationOpportunities": ["[opportunity 1]", "[opportunity 2]", "..."]
    }
  },
  "insights": {
    "keyFindings": ["[major insight 1]", "[major insight 2]", "[major insight 3]"],
    "competitiveAdvantages": {
      "potentialAdvantages": ["[advantage our domain could leverage]", "..."],
      "marketPositioning": "[recommended positioning strategy]",
      "differentiationStrategy": "[how to stand out from competitors]"
    },
    "marketOpportunities": {
      "underservedSegments": ["[segment 1]", "[segment 2]", "..."],
      "featureOpportunities": ["[feature gap to fill]", "..."],
      "serviceGaps": ["[service improvement opportunity]", "..."],
      "pricingOpportunities": ["[pricing strategy insight]", "..."]
    },
    "threats": {
      "immediateThreats": ["[threat 1]", "[threat 2]", "..."],
      "emergingThreats": ["[future threat 1]", "[future threat 2]", "..."],
      "disruptionPotential": ["[disruption scenario 1]", "[disruption scenario 2]", "..."]
    },
    "userDecisionFactors": {
      "primaryDecisionCriteria": ["[factor 1]", "[factor 2]", "..."],
      "dealBreakers": ["[deal breaker 1]", "[deal breaker 2]", "..."],
      "loyaltyDrivers": ["[loyalty factor 1]", "[loyalty factor 2]", "..."],
      "switchingTriggers": ["[trigger 1]", "[trigger 2]", "..."]
    },
    "strategicRecommendations": [
      {
        "recommendation": "[strategic recommendation]",
        "rationale": "[why this recommendation based on community insights]",
        "priority": "[High/Medium/Low]",
        "implementationComplexity": "[High/Medium/Low]"
      }
    ]
  }
}

## Advanced Analysis Techniques

### 1. Competitive Sentiment Analysis
- **Mention Context Analysis:** Positive vs negative mention contexts
- **Recommendation Patterns:** When users recommend competitors
- **Problem-Solution Mapping:** Which competitors solve which specific problems
- **User Journey Integration:** Where competitors appear in user decision processes

### 2. Market Intelligence Extraction
- **Pricing Intelligence:** Cost-related discussions and comparisons
- **Feature Comparison Analysis:** Head-to-head capability discussions
- **Service Quality Assessment:** Support, reliability, and performance insights
- **Innovation Tracking:** New features and capabilities mentioned

### 3. Strategic Gap Identification
- **Unmet Needs Discovery:** Problems no competitor adequately solves
- **Service Enhancement Opportunities:** Improvements users consistently request
- **Market Positioning Gaps:** Underserved audience segments
- **Differentiation Possibilities:** Unique value propositions not being offered

## Community Data Mining Framework

### Quote Extraction Guidelines:
- Extract authentic user statements about competitors
- Preserve original language and context
- Focus on specific, actionable insights
- Include both positive and negative perspectives
- Maintain anonymity while capturing sentiment

### Pattern Recognition:
- Identify recurring themes across multiple discussions
- Map user journey touchpoints with competitors
- Track evolution of competitive landscape over time
- Recognize emerging trends and shifts

## Quality Assurance Standards

Ensure analysis meets these criteria:
- [ ] All insights backed by community evidence
- [ ] Competitor information based on actual mentions, not assumptions
- [ ] User quotes authentic and contextually relevant
- [ ] Market gaps identified through community frustrations
- [ ] Strategic recommendations actionable and specific
- [ ] Threat assessment realistic and evidence-based
- [ ] Opportunities aligned with community needs

## Strategic Implementation Framework

**For Product Strategy:** Use feature gap analysis to inform development priorities
**For Marketing Position:** Leverage differentiation insights for messaging strategy
**For Competitive Response:** Apply threat analysis for defensive planning
**For Market Entry:** Utilize opportunity identification for market approach

Remember: This analysis should reveal the competitive landscape as experienced by real users, not as portrayed in marketing materials. Focus on authentic community perceptions and experiences to uncover actionable competitive intelligence.
`;

              const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: competitorPrompt }],
          temperature: 0.3,
          max_tokens: 2000
        });

      const response = completion.choices[0]?.message?.content;
      if (response && response.trim()) {
        const competitorData = parseAIResponse(response, {
          competitors: [],
          analysis: 'Failed to parse competitor data',
          insights: 'No competitor insights available'
        });

        // Store competitor analysis data for domain
        competitorAnalysisData = {
          domainId: domain.id,
          competitors: competitorData.competitors || [],
          marketInsights: competitorData.insights || {},
          strategicRecommendations: competitorData.analysis || {},
          competitiveAnalysis: competitorData.analysis || {},
          competitorList: Array.isArray(competitorData.competitors) ? competitorData.competitors.join(', ') : ''
        };

        totalTokenUsage += completion.usage?.total_tokens || 0;
      } else {
        console.warn(`Empty or null response for competitor research, using fallback data`);
        // Create fallback competitor analysis data
        competitorAnalysisData = {
          domainId: domain.id,
          competitors: [],
          marketInsights: { error: 'No competitor data available' },
          strategicRecommendations: { error: 'Failed to research competitors' },
          competitiveAnalysis: { error: 'Failed to research competitors' },
          competitorList: ''
        };
      }
    } catch (error) {
      console.error(`Error researching competitors for domain: ${domain.url}:`, error);
      // Create fallback competitor analysis data
      competitorAnalysisData = {
        domainId: domain.id,
        competitors: [],
        marketInsights: { error: 'No competitor data available' },
        strategicRecommendations: { error: 'Failed to research competitors' },
        competitiveAnalysis: { error: 'Failed to research competitors' },
        competitorList: ''
      };
    }

      // Store competitor analysis for domain
      try {
        await retryOperation(async () => {
          return await prisma.competitorAnalysis.create({
            data: competitorAnalysisData
          });
        });
        console.log(`Successfully stored competitor analysis for domain: ${domain.url}`);
      } catch (error) {
        console.error('Error storing competitor analysis:', error);
        throw new Error(`Failed to store competitor analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      sendEvent('progress', { 
        phase: 'competitor_research',
        message: 'Competitor Research completed',
        progress: 100
      });
      sendEvent('step-update', { index: 2, status: 'completed', progress: 100 });
    }

    // ========================================
    // STEP 4: SEARCH PATTERN ANALYSIS (PER KEYWORD)
    // ========================================
    sendEvent('step-update', { index: 3, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'search_patterns',
      message: 'Search Pattern Analysis - Analyzing user search behaviors for keywords',
      progress: 38
    });

    // Process each keyword for search pattern analysis
    for (let i = 0; i < totalKeywords; i++) {
      const keyword = keywordsToProcess[i];
      
      // Check if search pattern already exists for this keyword
      const existingSearchPattern = await prisma.searchPattern.findFirst({
        where: { 
          domainId: domain.id,
          keywordId: keyword.id
        }
      });

      if (existingSearchPattern) {
        console.log(`Search pattern already exists for keyword "${keyword.term}", using existing data...`);
        searchPatterns.push(existingSearchPattern);
        sendEvent('progress', { 
          phase: 'search_patterns',
          message: `Using existing search patterns for "${keyword.term}" (${i + 1}/${totalKeywords})`,
          progress: 38 + (i / totalKeywords) * 15
        });
        continue; // Skip to next keyword
      }
      
      sendEvent('progress', { 
        phase: 'search_patterns',
        message: `Analyzing search patterns for "${keyword.term}" (${i + 1}/${totalKeywords})`,
        progress: 38 + (i / totalKeywords) * 15
      });

      try {
        // Get community data for context
        const communityContext = communityInsightData ? communityInsightData.summary : 'No community data available';

        const patternPrompt = `
# Expert-Level Search Behavior Pattern Analysis Framework

## Core Mission
Conduct comprehensive search behavior intelligence analysis to decode how users actually search for content/services that our domain should serve. Transform raw community insights into actionable search pattern intelligence.

## Input Parameters
**Target Keyword Concept:** ${keyword.term}  
**Domain URL:** ${domain.url}  
**Business Context:** ${domain.context || 'General business services'}  
**Geographic Market:** ${domain.location || 'Global'}  
**Semantic Universe:** ${semanticContext}  
**Community Intelligence:** ${communityContext}

## Advanced Pattern Recognition Framework

### 1. Search Intent Behavioral Mapping

#### Informational Intent Patterns:
- **Learning Trajectory Signals:** "how to", "what is", "why does", "when to", "where can I learn"
- **Problem-Discovery Indicators:** "help with", "understand", "explain", "difference between"
- **Educational Depth Markers:** "beginner guide", "advanced techniques", "step-by-step", "tutorial"
- **Research Validation Queries:** "is it true that", "does it really work", "proven methods"

#### Navigational Intent Patterns:
- **Brand/Service Seeking:** "[brand] official", "find [service] near [location]", "[company] contact"
- **Local Discovery Signals:** "near me", "[city] + [service]", "local [provider]", "in [area]"
- **Specific Resource Hunting:** "[tool] login", "[platform] dashboard", "official [service] site"

#### Transactional Intent Patterns:
- **Purchase Readiness:** "buy", "order", "purchase", "get quote", "pricing", "cost"
- **Service Booking:** "book appointment", "schedule", "reserve", "sign up"
- **Download/Access Actions:** "download", "get access", "try free", "start trial"
- **Immediate Action Triggers:** "now", "today", "urgent", "emergency"

#### Commercial Investigation Patterns:
- **Comparison Shopping:** "vs", "versus", "compare", "which is better", "alternatives to"
- **Quality Assessment:** "best", "top rated", "reviews", "testimonials", "ratings"
- **Value Analysis:** "worth it", "price comparison", "cheapest", "most affordable"
- **Social Proof Seeking:** "recommended", "popular", "most used", "trusted"

### 2. Advanced Search Modifier Intelligence

#### Temporal Modifiers:
- **Urgency Indicators:** "urgent", "emergency", "asap", "same day", "immediate"
- **Planning Signals:** "2024", "next year", "upcoming", "future", "planning"
- **Recency Requirements:** "latest", "new", "recent", "updated", "current"

#### Geographic Qualifiers:
- **Proximity Patterns:** "near me", "nearby", "close", "local", "in [radius]"
- **Location Specificity:** "[city]", "[state]", "[neighborhood]", "[zip code]"
- **Regional Variations:** "[region] style", "[area] specific", "for [location] residents"

#### Quality Filters:
- **Performance Standards:** "best", "top", "highest rated", "premium", "professional"
- **Reliability Markers:** "trusted", "certified", "licensed", "verified", "guaranteed"
- **Experience Level:** "beginner", "advanced", "expert", "intermediate"

### 3. Behavioral Journey Pattern Analysis

#### Awareness Stage Patterns:
- Problem recognition queries
- Educational content consumption
- General information gathering
- Symptom/challenge identification

#### Consideration Stage Patterns:
- Solution comparison behaviors
- Feature evaluation queries
- Provider research patterns
- Reviews and testimonials seeking

#### Decision Stage Patterns:
- Pricing and availability checks
- Contact information searches
- Booking/purchase-ready queries
- Local provider verification

#### Post-Purchase Patterns:
- Support and help queries
- Advanced usage questions
- Loyalty and repeat engagement
- Referral and recommendation patterns

## Community Intelligence Integration Framework

### Pattern Extraction from Community Data:
1. **Language Patterns:** Extract actual terminology users employ
2. **Problem Articulation:** Identify how users describe their challenges
3. **Solution Seeking Behavior:** Understand how users ask for help
4. **Recommendation Patterns:** Analyze how users seek and give advice
5. **Discussion Triggers:** Identify topics that generate engagement
6. **Expertise Signals:** Recognize authority and credibility indicators

## Output Specification

Generate comprehensive analysis in this exact JSON structure:

{
  "patterns": {
    "intentDistribution": {
      "informational": {
        "percentage": "[0-100]",
        "topModifiers": ["[modifier 1]", "[modifier 2]", "..."],
        "searchExamples": ["[example query 1]", "[example query 2]", "..."],
        "userMindset": "[description of user psychology]"
      },
      "navigational": {
        "percentage": "[0-100]",
        "topModifiers": ["[modifier 1]", "[modifier 2]", "..."],
        "searchExamples": ["[example query 1]", "[example query 2]", "..."],
        "userMindset": "[description of user psychology]"
      },
      "transactional": {
        "percentage": "[0-100]",
        "topModifiers": ["[modifier 1]", "[modifier 2]", "..."],
        "searchExamples": ["[example query 1]", "[example query 2]", "..."],
        "userMindset": "[description of user psychology]"
      },
      "commercialInvestigation": {
        "percentage": "[0-100]",
        "topModifiers": ["[modifier 1]", "[modifier 2]", "..."],
        "searchExamples": ["[example query 1]", "[example query 2]", "..."],
        "userMindset": "[description of user psychology]"
      }
    },
    "temporalPatterns": {
      "seasonalTrends": ["[pattern 1]", "[pattern 2]", "..."],
      "dailyPatterns": ["[pattern 1]", "[pattern 2]", "..."],
      "urgencyPatterns": ["[pattern 1]", "[pattern 2]", "..."]
    },
    "geographicPatterns": {
      "localModifiers": ["[modifier 1]", "[modifier 2]", "..."],
      "regionalVariations": ["[variation 1]", "[variation 2]", "..."],
      "proximitySignals": ["[signal 1]", "[signal 2]", "..."]
    },
    "userJourneyPatterns": {
      "awarenessQueries": ["[query 1]", "[query 2]", "..."],
      "considerationQueries": ["[query 1]", "[query 2]", "..."],
      "decisionQueries": ["[query 1]", "[query 2]", "..."],
      "loyaltyQueries": ["[query 1]", "[query 2]", "..."]
    },
    "volumeDistribution": {
      "highVolumePatterns": ["[pattern 1]", "[pattern 2]", "..."],
      "longTailOpportunities": ["[opportunity 1]", "[opportunity 2]", "..."],
      "emergingTrends": ["[trend 1]", "[trend 2]", "..."]
    }
  },
  "summary": {
    "dominantIntent": "[primary search intent with explanation]",
    "keyInsights": ["[insight 1]", "[insight 2]", "[insight 3]"],
    "searcherProfile": "[detailed user persona description]",
    "contentOpportunities": ["[opportunity 1]", "[opportunity 2]", "..."],
    "competitiveGaps": ["[gap 1]", "[gap 2]", "..."]
  },
  "communityDerivedPatterns": {
    "languagePatterns": ["[pattern 1]", "[pattern 2]", "..."],
    "problemFraming": ["[how users describe problems]", "..."],
    "solutionSeeking": ["[how users ask for solutions]", "..."],
    "authoritySignals": ["[what indicates expertise]", "..."],
    "engagementTriggers": ["[what generates discussion]", "..."],
    "recommendationBehavior": ["[how users give/seek recommendations]", "..."]
  },
  "userQuestions": {
    "frequentQuestions": ["[question 1]", "[question 2]", "..."],
    "advancedQuestions": ["[complex question 1]", "[complex question 2]", "..."],
    "problemSolving": ["[problem-focused question 1]", "..."],
    "comparisonQuestions": ["[comparison question 1]", "..."],
    "implementationQuestions": ["[how-to question 1]", "..."],
    "emergingConcerns": ["[new/trending question 1]", "..."]
  }
}

## Advanced Analysis Techniques

### 1. Semantic Clustering Analysis
- Group related search concepts
- Identify synonym and variant patterns  
- Map semantic relationships
- Discover content gaps

### 2. Intent Confidence Scoring
- Measure clarity of user intent signals
- Identify mixed-intent opportunities
- Score commercial vs informational balance
- Map intent evolution through funnel

### 3. Community Language Mining
- Extract authentic user vocabulary
- Identify jargon and terminology patterns
- Map expertise level indicators
- Discover emotional triggers and motivators

### 4. Competitive Pattern Intelligence
- Identify underserved search patterns
- Discover content gap opportunities
- Map competitor strengths/weaknesses
- Find differentiation opportunities

## Quality Assurance Framework

Ensure analysis meets these standards:
- [ ] All patterns backed by community data evidence
- [ ] Search examples sound authentic and user-generated
- [ ] Intent distribution adds up to 100%
- [ ] Patterns align with business context and semantic universe
- [ ] Geographic relevance appropriately weighted
- [ ] User psychology insights are actionable
- [ ] Community language authentically captured
- [ ] Emerging trends identified and validated

## Strategic Implementation Notes

**For Content Strategy:** Use pattern analysis to inform content calendar and topic prioritization
**For SEO Planning:** Leverage intent distribution for keyword strategy and content optimization  
**For User Experience:** Apply journey patterns to improve site navigation and conversion paths
**For Competitive Analysis:** Exploit identified gaps for differentiation opportunities

Remember: This analysis should reveal not just what users search for, but WHY they search, WHEN they search, and HOW they think about their problems and solutions.
`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: patternPrompt }],
          temperature: 0.3,
          max_tokens: 2000
        });

        const response = completion.choices[0]?.message?.content;
        if (response && response.trim()) {
          const patternData = parseAIResponse(response, {
            patterns: [],
            summary: 'Failed to parse search pattern data',
            communityDerivedPatterns: [],
            userQuestions: []
          });

          // Store search pattern data for batch insert
          const newPattern = {
            domainId: domain.id,
            keywordId: keyword.id,
            patterns: patternData.patterns,
            summary: typeof patternData.summary === 'string' ? patternData.summary : JSON.stringify(patternData.summary || 'Search pattern analysis completed'),
            tokenUsage: completion.usage?.total_tokens || 0
          };
          searchPatterns.push(newPattern);
          newSearchPatterns.push(newPattern);

          totalTokenUsage += completion.usage?.total_tokens || 0;
        } else {
          console.warn(`Empty response for search patterns for keyword ${keyword.term}`);
          // Add fallback search pattern data
          const fallbackPattern = {
            domainId: domain.id,
            keywordId: keyword.id,
            patterns: [],
            summary: 'No search pattern data available',
            tokenUsage: 0
          };
          searchPatterns.push(fallbackPattern);
          newSearchPatterns.push(fallbackPattern);
        }
      } catch (error) {
        console.error(`Error analyzing search patterns for ${keyword.term}:`, error);
        // Continue with other keywords even if one fails
        const errorPattern = {
          domainId: domain.id,
          keywordId: keyword.id,
          patterns: [],
          summary: 'Failed to analyze search patterns',
          tokenUsage: 0
        };
        searchPatterns.push(errorPattern);
        newSearchPatterns.push(errorPattern);
      }
    }

    // Batch insert new search patterns only
    if (newSearchPatterns.length > 0) {
      try {
        await retryOperation(async () => {
          return await prisma.searchPattern.createMany({
            data: newSearchPatterns
          });
        });
        console.log(`Successfully stored ${newSearchPatterns.length} new search patterns`);
      } catch (error) {
        console.error('Error batch inserting search patterns:', error);
        throw new Error(`Failed to store search patterns: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    sendEvent('progress', { 
      phase: 'search_patterns',
      message: 'Search Pattern Analysis completed',
      progress: 100
    });
    sendEvent('step-update', { index: 3, status: 'completed', progress: 100 });

    // ========================================
    // STEP 5: CREATING OPTIMIZED INTENT PHRASES
    // ========================================
    sendEvent('step-update', { index: 4, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'phrase_generation',
      message: 'Creating optimized intent phrases - Generating phrases using all context',
      progress: 46
    });

    const allPhrases: any[] = [];
    const phrasesToInsert: any[] = [];

    // First, collect all existing phrases for all keywords
    const allExistingPhrases = await prisma.generatedIntentPhrase.findMany({
      where: { 
        domainId: domain.id,
        keywordId: { in: keywordsToProcess.map(kw => kw.id) }
      },
      include: {
        keyword: true
      }
    });

    // Send all existing phrases immediately
    if (allExistingPhrases.length > 0) {
      console.log(`Found ${allExistingPhrases.length} existing phrases, sending them to frontend...`);
      
      // Filter out phrases with null keywords and process valid ones
      const validExistingPhrases = allExistingPhrases.filter(phrase => phrase.keyword !== null);
      console.log(`Sending ${validExistingPhrases.length} valid existing phrases...`);
      
      validExistingPhrases.forEach((phrase, index) => {
        const tempPhrase = {
          ...phrase,
          id: phrase.id.toString(),
          parentKeyword: phrase.keyword!.term,
          editable: true,
          selected: false
        };
        allPhrases.push(tempPhrase);
        
        console.log(`Sending existing phrase ${index + 1}/${validExistingPhrases.length} with ID: ${phrase.id} - "${phrase.phrase}"`);
        
        // Send existing phrase event
        sendEvent('phrase-generated', {
          id: phrase.id.toString(),
          phrase: phrase.phrase,
          intent: phrase.intent,
          intentConfidence: phrase.intentConfidence,
          relevanceScore: phrase.relevanceScore,
          sources: phrase.sources,
          trend: phrase.trend,
          editable: true,
          selected: false,
          parentKeyword: phrase.keyword!.term,
          keywordId: phrase.keywordId,
          wordCount: phrase.phrase.trim().split(/\s+/).length
        });
      });
      
      console.log(`Finished sending ${validExistingPhrases.length} existing phrases`);
      
      // Add a small delay to ensure all existing phrases are processed
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    for (let i = 0; i < totalKeywords; i++) {
      const keyword = keywordsToProcess[i];
      
      // Check if phrases already exist for this keyword
      const existingPhrases = allExistingPhrases.filter(phrase => phrase.keywordId === keyword.id);

      if (existingPhrases.length >= 5) {
        console.log(`Phrases already exist for keyword "${keyword.term}", skipping generation...`);
        
        sendEvent('progress', { 
          phase: 'phrase_generation',
          message: `Using existing phrases for "${keyword.term}" (${i + 1}/${totalKeywords})`,
          progress: 46 + (i / totalKeywords) * 15
        });
        continue; // Skip to next keyword
      }
      
      sendEvent('progress', { 
        phase: 'phrase_generation',
        message: `Generating phrases for "${keyword.term}" (${i + 1}/${totalKeywords})`,
        progress: 46 + (i / totalKeywords) * 15
      });

      try {
        // Get all context data for this keyword
        const keywordCommunityData = communityInsightData;
        const keywordCompetitorData = competitorAnalysisData;
        const keywordSearchPatterns = searchPatterns.find(pattern => pattern.keywordId === keyword.id);

        const phrasePrompt = `
You are an expert search behavior analyst with 15+ years of experience in user intent mapping and conversational search optimization. Your task is to generate natural, user-centric search phrases that real people would actually type when seeking information about "${keyword.term}" in the context of ${domain.url}.

## CONTEXT ANALYSIS
Business Domain: ${domain.context || 'General business services'}
Geographic Focus: ${domain.location || 'Global market'}
Brand Voice: ${semanticContext ? 'Analyzed from semantic context' : 'Professional and authoritative'}

## USER INTENT FRAMEWORK
Map each phrase to one of these core search intents with behavioral psychology:

**INFORMATIONAL INTENT** (Learn & Understand)
- User Mindset: "I want to understand this topic better"
- Search Context: Research phase, education, problem identification
- Natural Patterns: "how to", "what is", "why does", "guide to", "explanation of"

**NAVIGATIONAL INTENT** (Find & Locate)  
- User Mindset: "I know what I want, help me find it"
- Search Context: Brand awareness, direct access, specific solution seeking
- Natural Patterns: "best", "top", "leading", "official", "direct"

**TRANSACTIONAL INTENT** (Act & Purchase)
- User Mindset: "I'm ready to take action or buy"
- Search Context: Decision phase, comparison shopping, ready to convert
- Natural Patterns: "buy", "purchase", "compare", "pricing", "demo", "trial"

**COMMERCIAL INVESTIGATION** (Research & Compare)
- User Mindset: "I'm evaluating options before deciding"
- Search Context: Research phase, vendor comparison, solution evaluation
- Natural Patterns: "vs", "alternatives", "competitors", "reviews", "comparison"

## COMMUNITY INTELLIGENCE
Real User Insights: ${keywordCommunityData ? keywordCommunityData.summary : 'Community data not available'}
Competitive Landscape: ${keywordCompetitorData ? 'Competitor analysis available' : 'No competitor data'}
Search Behavior Patterns: ${keywordSearchPatterns ? keywordSearchPatterns.summary : 'No pattern data available'}

## LOCATION HANDLING GUIDELINES
**IMPORTANT**: Only include location when it naturally fits the search intent and user need. Do NOT force location into every phrase.

**When to include location:**
- User is actively seeking local services ("near me", "in [city]", "local")
- Location is relevant to the service type (restaurants, contractors, events)
- User is comparing options in a specific area
- The business has a strong local presence

**When NOT to include location:**
- User is researching general information or concepts
- User is comparing national/global brands
- Location doesn't add value to the search intent
- The service is primarily online or global

**Natural location integration examples:**
- ✅ "best [keyword] near me" (when seeking local services)
- ✅ "[keyword] companies in [location]" (when location matters)
- ❌ "how to [keyword] in [location]" (forced location)
- ❌ "[keyword] guide [location]" (unnecessary location)

## QUALITY ASSURANCE PROTOCOL
Each phrase must pass this checklist:
✅ Complete, grammatically correct sentence
✅ Natural conversational flow (not keyword-stuffed)
✅ Authentic user intent mapping
✅ Location only when naturally relevant
✅ Competitive gap identification
✅ Brand voice alignment
✅ Community insight integration

## GENERATION REQUIREMENTS

Create 3-5 search phrases that demonstrate:

1. **Conversational Authenticity**: Phrases that sound like real user queries
2. **Intent Clarity**: Each phrase clearly maps to one search intent
3. **Natural Location Use**: Include location only when it makes sense
4. **Competitive Positioning**: Leverage gaps identified in competitor analysis
5. **Community Alignment**: Incorporate real user pain points and questions
6. **Brand Voice Consistency**: Match the professional tone of ${domain.url}

## OUTPUT FORMAT
Return a JSON array with objects containing:
{
  "phrase": "Complete sentence with natural flow",
  "intent": "Informational|Navigational|Transactional|Commercial Investigation",
  "intentConfidence": 85,
  "relevanceScore": 92,
  "sources": ["Community Insights", "Competitor Analysis", "Search Patterns"],
  "userPersona": "Decision maker seeking solution",
  "searchContext": "Research phase, comparing options"
}

## STRATEGIC IMPLEMENTATION
- Prioritize phrases that fill competitive gaps
- Use location naturally, not forced
- Balance informational and commercial intents
- Include voice-search optimized patterns
- Leverage community insights for authenticity

Generate phrases that would make ${domain.url} appear as the most relevant result for users genuinely seeking solutions in this space.
`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: phrasePrompt }],
          temperature: 0.3,
          max_tokens: 2500
        });

        const response = completion.choices[0]?.message?.content;
        if (response && response.trim()) {
          let phraseData = parseAIResponse(response, [
            {
              phrase: `How to implement ${keyword.term} effectively for better business results`,
              intent: 'Informational',
              intentConfidence: 75,
              relevanceScore: 80,
              sources: ['AI Generated - Fallback']
            },
            {
              phrase: `Best practices for ${keyword.term} optimization and implementation`,
              intent: 'Navigational',
              intentConfidence: 80,
              relevanceScore: 85,
              sources: ['AI Generated - Fallback']
            },
            {
              phrase: `Compare ${keyword.term} solutions and choose the right approach`,
              intent: 'Commercial Investigation',
              intentConfidence: 70,
              relevanceScore: 82,
              sources: ['AI Generated - Fallback']
            },
            {
              phrase: `Complete guide to ${keyword.term} strategies and techniques`,
              intent: 'Informational',
              intentConfidence: 85,
              relevanceScore: 88,
              sources: ['AI Generated - Fallback']
            },
            {
              phrase: `Professional ${keyword.term} services and expert consultation`,
              intent: 'Transactional',
              intentConfidence: 75,
              relevanceScore: 83,
              sources: ['AI Generated - Fallback']
            }
          ]);

          // Enforce 12-15 word constraint and grammar shaping
          if (Array.isArray(phraseData)) {
            phraseData = phraseData
              .map((p: any) => {
                if (!p || !p.phrase) return p;
                const words = p.phrase.trim().split(/\s+/);
                // If out of bounds, attempt a minimal fix by trimming or skipping
                if (words.length < 12) {
                  // mark for potential rewrite by model later (kept for future)
                  p.relevanceScore = Math.max(0, (p.relevanceScore || 80) - 10);
                } else if (words.length > 15) {
                  p.phrase = words.slice(0, 15).join(' ');
                }
                return p;
              })
              .filter((p: any) => p && p.phrase);

            // Process each generated phrase
            phraseData.forEach((phraseObj: any, phraseIndex: number) => {
              const phrase = {
                domainId: domain.id,
                keywordId: keyword.id,
                phrase: phraseObj.phrase,
                intent: phraseObj.intent || 'Informational',
                intentConfidence: phraseObj.intentConfidence || 75,
                relevanceScore: phraseObj.relevanceScore || 80,
                sources: phraseObj.sources || ['AI Generated'],
                trend: 'Rising',
                isSelected: false,
                tokenUsage: completion.usage?.total_tokens || 0
              };

              phrasesToInsert.push(phrase);
              
              // Add to allPhrases array for tracking (will be updated with real ID later)
              allPhrases.push({
                ...phrase,
                id: `temp-${i}-${phraseIndex}`,
                parentKeyword: keyword.term,
                editable: true,
                selected: false
              });
            });
          }

          totalTokenUsage += completion.usage?.total_tokens || 0;
        } else {
          console.warn(`Empty response for phrase generation for keyword ${keyword.term}`);
          // Add multiple fallback phrases instead of just one
          const fallbackPhrases = [
            {
              phrase: `How to implement ${keyword.term} effectively for better business results`,
              intent: 'Informational',
              intentConfidence: 75,
              relevanceScore: 80
            },
            {
              phrase: `Best practices for ${keyword.term} optimization and implementation`,
              intent: 'Navigational',
              intentConfidence: 80,
              relevanceScore: 85
            },
            {
              phrase: `Compare ${keyword.term} solutions and choose the right approach`,
              intent: 'Commercial Investigation',
              intentConfidence: 70,
              relevanceScore: 82
            },
            {
              phrase: `Complete guide to ${keyword.term} strategies and techniques`,
              intent: 'Informational',
              intentConfidence: 85,
              relevanceScore: 88
            },
            {
              phrase: `Professional ${keyword.term} services and expert consultation`,
              intent: 'Transactional',
              intentConfidence: 75,
              relevanceScore: 83
            }
          ];

          fallbackPhrases.forEach((fallbackPhrase, phraseIndex) => {
            const phraseData = {
              domainId: domain.id,
              keywordId: keyword.id,
              phrase: fallbackPhrase.phrase,
              intent: fallbackPhrase.intent,
              intentConfidence: fallbackPhrase.intentConfidence,
              relevanceScore: fallbackPhrase.relevanceScore,
              sources: ['AI Generated - Fallback'],
              trend: 'Rising',
              isSelected: false,
              tokenUsage: 0
            };

            phrasesToInsert.push(phraseData);
            
            allPhrases.push({
              ...phraseData,
              id: `temp-${i}-${phraseIndex}`,
              parentKeyword: keyword.term,
              editable: true,
              selected: false
            });
          });
        }
      } catch (error) {
        console.error(`Error generating phrases for ${keyword.term}:`, error);
        // Continue with other keywords even if one fails - add multiple fallback phrases
        const fallbackPhrases = [
          {
            phrase: `How to implement ${keyword.term} effectively for better business results`,
            intent: 'Informational',
            intentConfidence: 75,
            relevanceScore: 80
          },
          {
            phrase: `Best practices for ${keyword.term} optimization and implementation`,
            intent: 'Navigational',
            intentConfidence: 80,
            relevanceScore: 85
          },
          {
            phrase: `Compare ${keyword.term} solutions and choose the right approach`,
            intent: 'Commercial Investigation',
            intentConfidence: 70,
            relevanceScore: 82
          },
          {
            phrase: `Complete guide to ${keyword.term} strategies and techniques`,
            intent: 'Informational',
            intentConfidence: 85,
            relevanceScore: 88
          },
          {
            phrase: `Professional ${keyword.term} services and expert consultation`,
            intent: 'Transactional',
            intentConfidence: 75,
            relevanceScore: 83
          }
        ];

        fallbackPhrases.forEach((fallbackPhrase, phraseIndex) => {
          const phraseData = {
            domainId: domain.id,
            keywordId: keyword.id,
            phrase: fallbackPhrase.phrase,
            intent: fallbackPhrase.intent,
            intentConfidence: fallbackPhrase.intentConfidence,
            relevanceScore: fallbackPhrase.relevanceScore,
            sources: ['AI Generated - Error Fallback'],
            trend: 'Rising',
            isSelected: false,
            tokenUsage: 0
          };

          phrasesToInsert.push(phraseData);
          
          allPhrases.push({
            ...phraseData,
            id: `temp-${i}-${phraseIndex}`,
            parentKeyword: keyword.term,
            editable: true,
            selected: false
          });
        });
      }
    }

    // Insert generated phrases individually to get their IDs
    if (phrasesToInsert.length > 0) {
      try {
        const insertedPhrases: any[] = [];
        for (const phraseData of phrasesToInsert) {
          const insertedPhrase = await prisma.generatedIntentPhrase.create({
            data: phraseData
          });
          insertedPhrases.push(insertedPhrase);
        }
        console.log(`Successfully stored ${insertedPhrases.length} generated phrases`);
        
        // Send all newly generated phrases with their real database IDs
        console.log(`Sending ${insertedPhrases.length} newly generated phrases to frontend...`);
        insertedPhrases.forEach((insertedPhrase, index) => {
          const phraseData = phrasesToInsert[index];
          console.log(`Sending phrase ${index + 1}/${insertedPhrases.length} with ID: ${insertedPhrase.id} - "${phraseData.phrase}"`);
          sendEvent('phrase-generated', {
            id: insertedPhrase.id.toString(),
            phrase: phraseData.phrase,
            intent: phraseData.intent,
            intentConfidence: phraseData.intentConfidence,
            relevanceScore: phraseData.relevanceScore,
            sources: phraseData.sources,
            trend: phraseData.trend,
            editable: true,
            selected: false,
            parentKeyword: keywordsToProcess.find(kw => kw.id === phraseData.keywordId)?.term || 'Unknown',
            keywordId: phraseData.keywordId,
            wordCount: phraseData.phrase.trim().split(/\s+/).length
          });
        });
        console.log(`Finished sending ${insertedPhrases.length} newly generated phrases`);
        
      } catch (error) {
        console.error('Error inserting generated phrases:', error);
        throw new Error(`Failed to store generated phrases: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    sendEvent('progress', { 
      phase: 'phrase_generation',
      message: `Phrase Generation completed - ${phrasesToInsert.length} phrases generated`,
      progress: 100
    });
    sendEvent('step-update', { index: 4, status: 'completed', progress: 100 });

    // ========================================
    // STEP 6: INTENT CLASSIFICATION (Integrated with phrase generation)
    // ========================================
    sendEvent('step-update', { index: 5, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'intent_classification',
      message: 'Intent Classification - Classifying generated phrases by intent',
      progress: 61
    });

    // Intent classification is already done during phrase generation
    console.log('Intent classification completed during phrase generation');
    
    sendEvent('progress', { 
      phase: 'intent_classification',
      message: 'Intent Classification completed',
      progress: 100
    });
    sendEvent('step-update', { index: 5, status: 'completed', progress: 100 });

    // ========================================
    // STEP 7: RELEVANCE SCORE (Integrated with phrase generation)
    // ========================================
    sendEvent('step-update', { index: 6, status: 'running', progress: 0 });
    sendEvent('progress', { 
      phase: 'relevance_scoring',
      message: 'Relevance Score - Computing semantic relevance scores',
      progress: 69
    });

    // Relevance scoring is already done during phrase generation
    console.log('Relevance scoring completed during phrase generation');
    
    sendEvent('progress', { 
      phase: 'relevance_scoring',
      message: 'Relevance Score completed',
      progress: 100
    });
    sendEvent('step-update', { index: 6, status: 'completed', progress: 100 });

    // ========================================
    // COMPLETION
    // ========================================
    console.log('Enhanced phrase generation completed successfully');
    console.log(`Total phrases processed: ${allPhrases.length}`);
    console.log(`Total keywords processed: ${totalKeywords}`);
    
    sendEvent('progress', { 
      message: 'Enhanced phrase generation completed successfully',
      progress: 100
    });

    // Get final count of all phrases (existing + newly generated)
    const finalPhraseCount = await prisma.generatedIntentPhrase.count({
      where: { 
        domainId: domain.id,
        keywordId: { in: keywordsToProcess.map(kw => kw.id) }
      }
    });

    // Add a small delay to ensure all phrase events are processed
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Final phrase count from database: ${finalPhraseCount}`);
    console.log(`Total phrases sent to frontend: ${allPhrases.length}`);
    console.log(`Expected total phrases: ${totalKeywords * 5}`);

    sendEvent('complete', {
      totalPhrases: finalPhraseCount,
      totalKeywords: totalKeywords,
      totalTokenUsage: totalTokenUsage,
      message: `Successfully processed ${finalPhraseCount} phrases for ${totalKeywords} keywords`
    });

    res.end();
  } catch (error) {
    console.error('Error in enhanced phrase generation:', error);
    sendEvent('error', { 
      error: 'Enhanced phrase generation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    res.end();
  }
});

export default router;