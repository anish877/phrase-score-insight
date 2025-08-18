/**
 * UNIFIED ENHANCED PHRASES GENERATION
 * 
 * This file contains a single unified function that follows the exact flowchart:
 * 1. Semantic Content Analysis
 * 2. Community Data Mining (USING REAL REDDIT API)
 * 3. Competitor Research
 * 4. Search Pattern Analysis
 * 5. Creating optimized intent phrases
 * 6. Intent Classification (integrated with phrase generation)
 * 7. Relevance Score (integrated with phrase generation)
 * 
 * No duplication - only one function that handles the complete flow.
 * 
 * REDDIT API INTEGRATION:
 * - Real Reddit data mining using Reddit API
 * - Rate limiting and error handling
 * - Actual community insights from real discussions
 */

import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import OpenAI from 'openai';
import { authenticateToken } from '../middleware/auth';

/**
 * FIXED REDDIT DATA MINING
 * 
 * Issues fixed:
 * 1. Reddit API requires .json endpoint and proper parameters
 * 2. Better error handling and debugging
 * 3. Improved relevance scoring
 * 4. Better fallback mechanisms
 */

// ===============================================
// FIXED REDDIT API CONFIGURATION & HELPERS
// ===============================================

const REDDIT_API_CONFIG = {
  baseUrl: 'https://www.reddit.com',
  userAgent: 'SEOAnalysisBot/1.0 (by /u/YourUsername)',
  rateLimit: 1000, // Reduced to 1 second (Reddit allows 60 requests per minute)
  maxRetries: 3,
  timeout: 10000, // Reduced timeout
  resultsPerQuery: 25
};

// FIXED: Reddit API helper functions with better error handling
const searchRedditAPI = async (
  query: string, 
  subreddit?: string,
  options: { sort?: 'relevance' | 'hot' | 'top' | 'new'; time?: 'all' | 'year' | 'month' | 'week' | 'day'; limit?: number; retries?: number } = {}
) => {
  const { sort = 'top', time = 'all', limit = REDDIT_API_CONFIG.resultsPerQuery, retries = REDDIT_API_CONFIG.maxRetries } = options;
  
  try {
    console.log(`🔍 Reddit API: Searching for "${query}"${subreddit ? ` in r/${subreddit}` : ''}`);
    
    // FIXED: Use proper Reddit search endpoint structure
    let searchUrl: string;
    
    if (subreddit) {
      // Search within specific subreddit
      searchUrl = `${REDDIT_API_CONFIG.baseUrl}/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&sort=${sort}&t=${time}&limit=${limit}&restrict_sr=on&type=link`;
    } else {
      // FIXED: Search across all of Reddit with better parameters
      searchUrl = `${REDDIT_API_CONFIG.baseUrl}/search.json?q=${encodeURIComponent(query)}&sort=${sort}&t=${time}&limit=${limit}&type=link`;
    }
    
    console.log(`📍 Reddit URL: ${searchUrl}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REDDIT_API_CONFIG.timeout);
      
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': REDDIT_API_CONFIG.userAgent,
          'Accept': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
      console.log(`⏳ Reddit rate limited, waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Retry once after rate limit
      if (retries > 0) {
        return await searchRedditAPI(query, subreddit, { ...options, retries: retries - 1 });
      }
      }
      
      if (!response.ok) {
        throw new Error(`Reddit API HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
    console.log(`📊 Reddit raw response structure:`, {
      hasData: !!data,
      hasDataProp: !!data?.data,
      hasChildren: !!data?.data?.children,
      childrenLength: data?.data?.children?.length || 0
    });
    
    if (!data?.data?.children || !Array.isArray(data.data.children)) {
      console.warn(`❌ Reddit: Invalid data structure for "${query}"`);
      return {
        posts: [],
        isEmpty: true,
        query,
        subreddit,
        error: 'Invalid data structure'
      };
    }
    
    if (data.data.children.length === 0) {
      console.warn(`❌ Reddit: No results found for "${query}"`);
        return {
          posts: [],
          isEmpty: true,
          query,
          subreddit
        };
      }
      
    console.log(`✅ Reddit: Found ${data.data.children.length} results for "${query}"`);
      return {
        posts: data.data.children.map((child: any) => child.data),
        isEmpty: false,
        query,
        subreddit
      };
      
    } catch (error) {
    console.error(`❌ Reddit API error for "${query}":`, error);
        return {
          posts: [],
          error: error instanceof Error ? error.message : 'Unknown error',
          failed: true,
          query,
          subreddit
        };
  }
};



// ===============================================
// IMPROVED DATA EXTRACTION WITH BETTER FILTERING
// ===============================================

// FIXED: Better Reddit data extraction with improved relevance
const extractRedditDataEnhanced = (redditData: any, businessContext: string) => {
  if (!redditData?.posts || !Array.isArray(redditData.posts) || redditData.posts.length === 0) {
    console.warn('❌ No Reddit results to extract');
    return [];
  }
  
  console.log(`📊 Processing ${redditData.posts.length} Reddit results...`);
  
  const validPosts = redditData.posts
    .filter((post: any) => {
      // FIXED: More lenient content validation
      const hasTitle = post.title && typeof post.title === 'string' && post.title.length > 3;
      const hasContent = (post.selftext && post.selftext.length > 5) || post.url;
      const notDeleted = post.title !== '[deleted]' && post.title !== '[removed]';
      const notRemoved = post.selftext !== '[removed]' && post.selftext !== '[deleted]';
      
      const isValid = hasTitle && hasContent && notDeleted && notRemoved;
      
      if (!isValid) {
        console.log(`❌ Filtered out Reddit post: "${post.title?.substring(0, 50)}..." (hasTitle: ${hasTitle}, hasContent: ${hasContent})`);
      }
      
      return isValid;
    })
    .map((post: any) => {
      const title = post.title?.trim() || '';
      const content = post.selftext?.trim() || post.url || '';
      const subreddit = post.subreddit || 'unknown';
      const fullText = `${title} ${content}`.toLowerCase();
      
      return {
        title,
        content,
        subreddit,
        url: post.permalink ? `https://reddit.com${post.permalink}` : post.url || '',
        score: post.score || 0,
        comments: post.num_comments || 0,
        author: post.author || 'reddit_user',
        created: new Date((post.created_utc || 0) * 1000).toISOString(),
        relevanceScore: calculateEnhancedRelevanceScore(fullText, businessContext),
        platform: 'reddit',
        upvoteRatio: post.upvote_ratio || 0,
        fullText
      };
    })
    .filter((item: any) => item.relevanceScore > 1) // Lower threshold
    .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    .slice(0, 25);

  console.log(`✅ Reddit: Extracted ${validPosts.length} valid posts`);
  if (validPosts.length > 0) {
    console.log(`📊 Top Reddit post: "${validPosts[0].title}" (score: ${validPosts[0].relevanceScore})`);
  }
  
  return validPosts;
};





// ===============================================
// IMPROVED QUERY GENERATION
// ===============================================

// FIXED: Better strategic queries generation using concise semantic data
const generateStrategicQueries = (semanticData: any, businessContext: string, domain: string): string[] => {
  // Use semantic data if available, otherwise fall back to business context
  const searchTerms = semanticData?.searchTerms || [];
  const keyProblems = semanticData?.keyProblems || [];
  const primaryServices = semanticData?.primaryServices || [];
  const location = semanticData?.location || '';
  
  // Create concise, targeted queries
  const queries = [];
  
  // Use semantic search terms if available
  if (searchTerms.length > 0) {
    searchTerms.slice(0, 5).forEach((term: string) => {
      queries.push(`${term} problems`);
      queries.push(`best ${term}`);
      queries.push(`how to ${term}`);
    });
  }
  
  // Use key problems for problem-focused queries
  if (keyProblems.length > 0) {
    keyProblems.slice(0, 3).forEach((problem: string) => {
      queries.push(`${problem} solutions`);
      queries.push(`fix ${problem}`);
    });
  }
  
  // Use primary services for service-focused queries
  if (primaryServices.length > 0) {
    primaryServices.slice(0, 3).forEach((service: string) => {
      queries.push(`${service} help`);
      queries.push(`${service} tips`);
    });
  }
  
  // Add location-specific queries if available
  if (location && location !== 'Global') {
    queries.push(`${businessContext} ${location}`);
    queries.push(`${location} ${businessContext} services`);
  }
  
  // Fallback queries if semantic data is insufficient
  if (queries.length < 5) {
    const cleanContext = businessContext.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
    queries.push(`${cleanContext} problems`);
    queries.push(`best ${cleanContext}`);
    queries.push(`how to ${cleanContext}`);
    queries.push(`${cleanContext} help`);
    queries.push(`${cleanContext} tips`);
  }
  
  // Ensure queries are concise (max 50 characters)
  return queries
    .filter(query => query.length <= 50)
    .slice(0, 15); // Limit to 15 queries
};

// ===============================================
// ENHANCED RELEVANCE SCORING
// ===============================================

// FIXED: Enhanced relevance scoring
const calculateEnhancedRelevanceScore = (text: string, businessContext: string): number => {
  const lowerText = text.toLowerCase();
  const lowerContext = businessContext.toLowerCase();
  
  let score = 0;
  
  // FIXED: More comprehensive scoring
  
  // 1. Exact context match (high value)
  if (lowerText.includes(lowerContext)) score += 10;
  
  // 2. Individual context words
  const contextWords = lowerContext.split(/\s+/).filter(word => word.length > 2);
  contextWords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 3;
    }
  });
  
  // 3. Question format bonus (common in communities)
  if (lowerText.match(/\b(how|what|why|when|where|which|should|can|will|is|are)\b.*\?/)) {
    score += 4;
  }
  
  // 4. Problem/solution indicators
  const problemSolutionWords = ['problem', 'issue', 'challenge', 'solution', 'help', 'advice', 'tips', 'guide', 'how to'];
  problemSolutionWords.forEach(word => {
    if (lowerText.includes(word)) score += 2;
  });
  
  // 5. Engagement indicators
  const engagementWords = ['best', 'top', 'recommend', 'suggest', 'experience', 'review', 'comparison', 'vs'];
  engagementWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  
  // 6. Content quality bonus
  if (text.length > 50) score += 1;
  if (text.length > 100) score += 1;
  if (text.length > 200) score += 2;
  
  // 7. Specific domain-related terms (customize based on your domain)
  const domainTerms = ['business', 'service', 'company', 'professional', 'expert', 'quality', 'price', 'cost'];
  domainTerms.forEach(term => {
    if (lowerText.includes(term)) score += 1;
  });
  
  return Math.max(score, 0);
};

// ===============================================
// ENHANCED COMMUNITY MINING FUNCTION
// ===============================================

const performEnhancedCommunityMining = async (businessContext: string, domain: any, semanticData?: any) => {
  console.log(`🚀 Starting enhanced community mining for: ${businessContext}`);
  
  const strategicQueries = generateStrategicQueries(semanticData, businessContext, domain.url);
  console.log(`📋 Generated ${strategicQueries.length} strategic queries`);
  
  const allRedditData = [];
  let successfulQueries = 0;
  let failedQueries = 0;

  // FIXED: Reddit mining with better error handling
  console.log('🔍 Enhanced Reddit mining...');
  
  // Try different subreddits for better results
  const targetSubreddits = ['AskReddit', 'business', 'entrepreneur', 'smallbusiness', 'advice'];
  
  for (const query of strategicQueries.slice(0, 8)) { // Limit queries to avoid rate limits
    try {
      console.log(`📊 Reddit query: "${query}"`);
      
      // Try general search first
      let redditData = await searchRedditAPI(query, undefined, {
        sort: 'top',
        time: 'all',
        limit: 15
      });
      
      // If no results, try specific subreddits
      if (redditData.isEmpty || redditData.posts.length === 0) {
        for (const subreddit of targetSubreddits.slice(0, 2)) { // Try max 2 subreddits
          console.log(`📊 Trying r/${subreddit} for "${query}"`);
          redditData = await searchRedditAPI(query, subreddit, {
            sort: 'top',
            time: 'all',
            limit: 10
          });
          
          if (!redditData.isEmpty && redditData.posts.length > 0) {
            break; // Found results, stop trying subreddits
          }
          
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      if (!redditData.failed && !redditData.isEmpty && redditData.posts.length > 0) {
        const redditResults = extractRedditDataEnhanced(redditData, businessContext);
        allRedditData.push(...redditResults);
        successfulQueries++;
        console.log(`✅ Reddit: ${redditResults.length} quality results for "${query}"`);
      } else {
        failedQueries++;
        console.warn(`❌ Reddit: No quality results for "${query}"`);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      failedQueries++;
      console.error(`❌ Reddit mining error for "${query}":`, error);
    }
  }

  // FIXED: Better data deduplication and quality filtering
  const uniqueRedditData = allRedditData
    .filter((item: any, index: number, arr: any[]) => 
      index === arr.findIndex((t: any) => t.url === item.url || (t.title === item.title && Math.abs(t.title.length - item.title.length) < 5))
    )
    .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    .slice(0, 20);

  const dataQuality = {
    totalQueries: strategicQueries.length,
    successfulQueries,
    failedQueries,
    redditResults: uniqueRedditData.length,
    totalResults: uniqueRedditData.length,
    averageRelevance: {
      reddit: uniqueRedditData.length > 0 ? uniqueRedditData.reduce((sum: number, item: any) => sum + item.relevanceScore, 0) / uniqueRedditData.length : 0
    },
    qualityRating: uniqueRedditData.length > 10 ? 'High' : 
                   uniqueRedditData.length > 3 ? 'Medium' : 'Low'
  };

  console.log(`📈 Community Mining Results:`, dataQuality);
  console.log(`🎯 Final data: ${uniqueRedditData.length} Reddit posts`);

  return {
    redditData: uniqueRedditData,
    dataQuality,
    allData: [...uniqueRedditData]
  };
};

// ===============================================
// 1. FIXED INTENT-BASED PHRASE GENERATION PROMPT
// ===============================================

const createRealDataPhrasePrompt = (
  keyword: any,
  domain: any,
  realQuestions: any[],
  realPhrases: any[],
  userLanguagePatterns: any,
  semanticContext: string
) => `
# INTENT-FOCUSED PHRASE GENERATOR v6.0
## Real User Intent Mapping

**CRITICAL MISSION:** Generate COMPLETE search phrases that users would actually type, organized by specific search intent.

**TARGET ANALYSIS:**
• Primary Keyword: "${keyword.term}"
• Domain: ${domain.url}
• Context: ${domain.context || 'General business'}

**REAL USER DATA:**
${realQuestions.slice(0, 8).map((q: any) => `• "${q.question}"`).join('\n')}

**USER LANGUAGE PATTERNS:**
${userLanguagePatterns.solutionSeekers?.slice(0, 5).join(', ') || 'help, find, looking for'}

## INTENT-SPECIFIC GENERATION RULES

### 1. INFORMATIONAL INTENT (40% weight)
**User Psychology:** "I need to learn/understand something"
**Required Elements:**
- Question words: How, What, Why, When, Where
- Learning indicators: guide, tutorial, tips, learn, understand
- Problem-solving: help with, fix, solve, improve

**Template Patterns:**
- "How to [action] ${keyword.term} [for better results]"
- "What is the best way to [implement/use] ${keyword.term}"
- "Complete guide to ${keyword.term} [for specific audience]"
- "Why ${keyword.term} is important for [business outcome]"

### 2. NAVIGATIONAL INTENT (20% weight)
**User Psychology:** "I know what I want, help me find it"
**Required Elements:**
- Quality indicators: best, top, professional, certified
- Location modifiers: near me, local, in [city]
- Specific targeting: for [audience], [industry] specific

**Template Patterns:**
- "Best ${keyword.term} services [in location]"
- "Top rated ${keyword.term} professionals near me"
- "Certified ${keyword.term} experts [for industry]"
- "Professional ${keyword.term} company [location]"

### 3. TRANSACTIONAL INTENT (25% weight)
**User Psychology:** "I'm ready to take action/buy"
**Required Elements:**
- Action words: hire, buy, get, book, order, contact
- Urgency: now, today, immediate, emergency
- Service-focused: consultation, quote, appointment

**Template Patterns:**
- "Hire ${keyword.term} expert [for specific need]"
- "Get ${keyword.term} consultation [today/now]"
- "Book ${keyword.term} services [in location]"
- "Contact ${keyword.term} professional [for project]"

### 4. COMMERCIAL INVESTIGATION (15% weight)
**User Psychology:** "I'm comparing options before deciding"
**Required Elements:**
- Comparison words: vs, compare, which, alternatives
- Evaluation: reviews, cost, price, worth it
- Decision support: best choice, right option

**Template Patterns:**
- "Compare ${keyword.term} options and pricing"
- "${keyword.term} cost vs alternatives [in location]"
- "Which ${keyword.term} service is worth it"
- "Best ${keyword.term} reviews and comparisons"

## OUTPUT FORMAT

Generate EXACTLY 5 complete phrases following this JSON structure:

{
  "phrases": [
    {
      "phrase": "How to implement effective ${keyword.term} strategies for small business growth",
      "intent": "Informational",
      "intentConfidence": 90,
      "relevanceScore": 85,
      "conversionPotential": 70,
      "voiceSearchOptimized": true,
      "wordCount": 10,
      "intentJustification": "Uses 'how to' pattern, educational focus, problem-solving orientation",
      "targetAudience": "small business owners seeking implementation guidance",
      "searchVolumePrediction": "Medium"
    },
    {
      "phrase": "Best ${keyword.term} services near me for professional results",
      "intent": "Navigational", 
      "intentConfidence": 85,
      "relevanceScore": 90,
      "conversionPotential": 80,
      "voiceSearchOptimized": true,
      "wordCount": 8,
      "intentJustification": "Uses 'best' + 'near me' pattern, quality + location focused",
      "targetAudience": "users ready to find local providers",
      "searchVolumePrediction": "High"
    },
    {
      "phrase": "Hire ${keyword.term} expert for immediate project consultation",
      "intent": "Transactional",
      "intentConfidence": 95,
      "relevanceScore": 88,
      "conversionPotential": 95,
      "voiceSearchOptimized": true,
      "wordCount": 8,
      "intentJustification": "Uses 'hire' action word + 'immediate', clear purchase intent",
      "targetAudience": "users ready to engage services immediately",
      "searchVolumePrediction": "Medium"
    },
    {
      "phrase": "Compare ${keyword.term} pricing and service packages available",
      "intent": "Commercial Investigation",
      "intentConfidence": 88,
      "relevanceScore": 82,
      "conversionPotential": 75,
      "voiceSearchOptimized": true,
      "wordCount": 8,
      "intentJustification": "Uses 'compare' + 'pricing', evaluation-focused",
      "targetAudience": "users in decision-making phase",
      "searchVolumePrediction": "Medium"
    },
    {
      "phrase": "What makes ${keyword.term} effective for sustainable business results",
      "intent": "Informational",
      "intentConfidence": 85,
      "relevanceScore": 83,
      "conversionPotential": 65,
      "voiceSearchOptimized": true,
      "wordCount": 9,
      "intentJustification": "Uses 'what makes' question pattern, benefit-focused",
      "targetAudience": "users seeking to understand value proposition",
      "searchVolumePrediction": "Medium"
    }
  ]
}

## CRITICAL REQUIREMENTS

✅ MUST HAVE:
- Each phrase 8-15 words (voice search optimized)
- Natural conversational language
- Clear intent signals in every phrase
- ${keyword.term} prominently featured
- Actionable and specific
- Real user language patterns

❌ AVOID:
- Keyword stuffing
- Unnatural corporate language
- Generic templates
- Missing intent signals
- Too short (<6 words) or too long (>16 words)
- Duplicate intent patterns

**VALIDATION:** Each phrase must sound like something a real person would type into Google when they have that specific intent.

Return ONLY the JSON object.
`;

// ===============================================
// 2. ENHANCED INTENT VALIDATION SYSTEM
// ===============================================

const validateIntentAccuracy = (phrase: string, declaredIntent: string) => {
  const intentPatterns = {
    'Informational': {
      required: ['how', 'what', 'why', 'when', 'where', 'guide', 'tutorial', 'tips', 'learn', 'understand', 'explain'],
      forbidden: ['hire', 'buy', 'book', 'order', 'contact', 'get quote'],
      minConfidence: 70
    },
    'Navigational': {
      required: ['best', 'top', 'find', 'locate', 'near me', 'professional', 'certified', 'company', 'service'],
      forbidden: ['how to', 'what is', 'why', 'compare', 'vs'],
      minConfidence: 75
    },
    'Transactional': {
      required: ['hire', 'buy', 'get', 'book', 'order', 'contact', 'call', 'quote', 'consultation', 'appointment'],
      forbidden: ['how to', 'what is', 'guide', 'tutorial'],
      minConfidence: 80
    },
    'Commercial Investigation': {
      required: ['compare', 'vs', 'versus', 'best', 'review', 'cost', 'price', 'which', 'alternatives'],
      forbidden: ['how to', 'hire now', 'book today'],
      minConfidence: 70
    }
  };

  const lowerPhrase = phrase.toLowerCase();
  const pattern = intentPatterns[declaredIntent as keyof typeof intentPatterns];
  
  if (!pattern) return { isValid: false, confidence: 0, issues: ['Invalid intent category'] };

  // Check for required patterns
  const hasRequired = pattern.required.some(req => lowerPhrase.includes(req));
  
  // Check for forbidden patterns
  const hasForbidden = pattern.forbidden.some(forb => lowerPhrase.includes(forb));
  
  // Calculate confidence
  let confidence = hasRequired ? 70 : 20;
  if (hasForbidden) confidence -= 30;
  
  // Additional scoring
  const requiredMatches = pattern.required.filter(req => lowerPhrase.includes(req)).length;
  confidence += requiredMatches * 10;
  
  const issues = [];
  if (!hasRequired) issues.push(`Missing required ${declaredIntent} signals`);
  if (hasForbidden) issues.push(`Contains forbidden patterns for ${declaredIntent}`);
  if (confidence < pattern.minConfidence) issues.push(`Low intent confidence: ${confidence}%`);

  return {
    isValid: confidence >= pattern.minConfidence && !hasForbidden && hasRequired,
    confidence: Math.min(100, Math.max(0, confidence)),
    issues,
    requiredMatches,
    forbiddenMatches: pattern.forbidden.filter(forb => lowerPhrase.includes(forb)).length
  };
};

// ===============================================
// 4. AUTO-CORRECT INTENT FUNCTION
// ===============================================

const autoCorrectIntent = (phrase: string) => {
  const lowerPhrase = phrase.toLowerCase();
  
  // Strong transactional signals
  if (/\b(hire|buy|get|book|order|contact|call|purchase|quote|consultation|appointment)\b/.test(lowerPhrase)) {
    return 'Transactional';
  }
  
  // Strong comparison signals
  if (/\b(compare|vs|versus|which|alternatives|cost|price|review|worth)\b/.test(lowerPhrase)) {
    return 'Commercial Investigation';
  }
  
  // Strong navigational signals
  if (/\b(best|top|find|locate|near me|professional|certified|company|service)\b/.test(lowerPhrase) && 
      !/\b(how|what|why|guide|tutorial)\b/.test(lowerPhrase)) {
    return 'Navigational';
  }
  
  // Default to informational
  return 'Informational';
};

// ===============================================
// ENHANCED PHRASE GENERATION LOGIC
// ===============================================

// Helper functions for improved phrase quality
const calculateIntentConfidence = (phrase: string, intent: string) => {
  const intentSignals: Record<string, string[]> = {
    'Informational': ['how', 'what', 'why', 'guide', 'learn', 'understand', 'explain', 'tell me'],
    'Navigational': ['best', 'top', 'find', 'locate', 'near me', 'professional', 'certified', 'trusted'],
    'Transactional': ['buy', 'hire', 'book', 'get', 'order', 'contact', 'call', 'start', 'try'],
    'Commercial Investigation': ['compare', 'vs', 'review', 'cost', 'price', 'worth', 'which', 'alternatives']
  };
  
  const signals = intentSignals[intent] || [];
  const matches = signals.filter((signal: string) => phrase.toLowerCase().includes(signal)).length;
  return Math.min(95, 60 + (matches * 8)); // Base 60% + 8% per signal
};

const validatePhraseQuality = (phrase: string) => {
  const issues = [];
  
  // Word count check (voice search optimized)
  const wordCount = phrase.trim().split(/\s+/).length;
  if (wordCount < 8 || wordCount > 15) {
    issues.push(`Word count ${wordCount} not optimal for voice search (8-15 words)`);
  }
  
  // Intent signal strength
  const hasStrongIntent = /\b(how to|best|top|guide|help|find|buy|hire|compare|review)\b/i.test(phrase);
  if (!hasStrongIntent) {
    issues.push('Weak intent signals detected');
  }
  
  // Natural language flow check
  if (phrase.includes(' and ') && phrase.includes(' or ')) {
    issues.push('Complex phrase structure may not be natural');
  }
  
  return { isValid: issues.length === 0, issues };
};

const extractEntities = (phrase: string, context: string) => {
  const entities = [];
  
  // Extract location entities
  const locationMatch = phrase.match(/\b(in|near|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/);
  if (locationMatch) {
    entities.push(locationMatch[2]);
  }
  
  // Extract professional entities
  const professionalMatch = phrase.match(/\b(expert|specialist|consultant|professional|advisor)\b/);
  if (professionalMatch) {
    entities.push(professionalMatch[1]);
  }
  
  // Extract action entities
  const actionMatch = phrase.match(/\b(guide|service|solution|strategy|method)\b/);
  if (actionMatch) {
    entities.push(actionMatch[1]);
  }
  
  return entities;
};

// ===============================================
// ENHANCED PHRASE GENERATION WITH REAL USER DATA
// ===============================================

// 1. EXTRACT REAL QUESTIONS AND PHRASES FROM COMMUNITY DATA
const extractRealUserQuestions = (communityData: any) => {
  const realQuestions: any[] = [];
  const realPhrases: any[] = [];
  
  if (!communityData || !communityData.sources || !communityData.sources.dataPoints) {
    return { realQuestions: [], realPhrases: [], userLanguagePatterns: [] };
  }
  
  const dataPoints = communityData.sources.dataPoints;
  
  dataPoints.forEach((item: any) => {
    // Extract questions from titles and content
    const combinedText = `${item.title} ${item.content}`.toLowerCase();
    
    // Extract direct questions (with question marks)
    const directQuestions = combinedText.match(/[^.!?]*\?[^.!?]*/g) || [];
    directQuestions.forEach((q: string) => {
      const cleanQuestion = q.trim().replace(/^\W+|\W+$/g, '');
      if (cleanQuestion.length > 10 && cleanQuestion.length < 150) {
        realQuestions.push({
          question: cleanQuestion,
          platform: item.platform,
          relevanceScore: item.relevanceScore || 0,
          engagement: item.score || item.answers || 0
        });
      }
    });
    
    // Extract problem statements and "how to" patterns
    const problemPatterns = [
      /how (?:do i|can i|to|can you|do you) ([^.!?]{10,100})/gi,
      /what (?:is the best|are the best|should i) ([^.!?]{10,100})/gi,
      /where (?:can i|do i|should i) ([^.!?]{10,100})/gi,
      /why (?:is|are|do|does) ([^.!?]{10,100})/gi,
      /when (?:should i|is the best time to) ([^.!?]{10,100})/gi,
      /which (?:is better|should i choose|one) ([^.!?]{10,100})/gi,
      /i (?:need help with|want to|am looking for) ([^.!?]{10,100})/gi,
      /looking for (?:advice|help|tips) (?:on|with|about) ([^.!?]{10,100})/gi,
      /anyone (?:know|tried|recommend) ([^.!?]{10,100})/gi,
      /best way to ([^.!?]{10,100})/gi
    ];
    
    problemPatterns.forEach(pattern => {
      const matches = [...combinedText.matchAll(pattern)];
      matches.forEach(match => {
        if (match[1] && match[1].trim().length > 5) {
          realPhrases.push({
            phrase: match[0].trim(),
            extractedContext: match[1].trim(),
            platform: item.platform,
            relevanceScore: item.relevanceScore || 0,
            engagement: item.score || item.answers || 0
          });
        }
      });
    });
  });
  
  // Extract user language patterns
  const userLanguagePatterns = extractLanguagePatterns(dataPoints);
  
  return { 
    realQuestions: realQuestions.slice(0, 20), // Top 20 questions
    realPhrases: realPhrases.slice(0, 30), // Top 30 phrases
    userLanguagePatterns 
  };
};

// 2. EXTRACT AUTHENTIC USER LANGUAGE PATTERNS
const extractLanguagePatterns = (dataPoints: any[]) => {
  const patterns = {
    problemDescriptors: new Set<string>(),
    solutionSeekers: new Set<string>(),
    qualityIndicators: new Set<string>(),
    urgencyMarkers: new Set<string>(),
    comparisonLanguage: new Set<string>(),
    emotionalTriggers: new Set<string>()
  };
  
  dataPoints.forEach((item: any) => {
    const text = `${item.title} ${item.content}`.toLowerCase();
    
    // Problem descriptors
    const problemWords = text.match(/\b(struggling with|having trouble|issues with|problems with|difficult to|hard to|can't figure out|frustrated with|stuck with)\b/g) || [];
    problemWords.forEach((word: string) => patterns.problemDescriptors.add(word));
    
    // Solution seekers
    const solutionWords = text.match(/\b(looking for|need help|seeking advice|want to find|trying to|help me|show me how|teach me|guide me)\b/g) || [];
    solutionWords.forEach((word: string) => patterns.solutionSeekers.add(word));
    
    // Quality indicators
    const qualityWords = text.match(/\b(best|top|excellent|amazing|outstanding|reliable|trusted|proven|effective|successful)\b/g) || [];
    qualityWords.forEach((word: string) => patterns.qualityIndicators.add(word));
    
    // Urgency markers
    const urgencyWords = text.match(/\b(urgent|asap|emergency|immediate|quickly|fast|soon|now|today)\b/g) || [];
    urgencyWords.forEach((word: string) => patterns.urgencyMarkers.add(word));
    
    // Comparison language
    const comparisonWords = text.match(/\b(vs|versus|compared to|better than|worse than|alternative to|instead of|rather than)\b/g) || [];
    comparisonWords.forEach((word: string) => patterns.comparisonLanguage.add(word));
    
    // Emotional triggers
    const emotionalWords = text.match(/\b(worried|concerned|confused|overwhelmed|excited|hopeful|disappointed|satisfied)\b/g) || [];
    emotionalWords.forEach((word: string) => patterns.emotionalTriggers.add(word));
  });
  
  return {
    problemDescriptors: Array.from(patterns.problemDescriptors).slice(0, 10),
    solutionSeekers: Array.from(patterns.solutionSeekers).slice(0, 10),
    qualityIndicators: Array.from(patterns.qualityIndicators).slice(0, 10),
    urgencyMarkers: Array.from(patterns.urgencyMarkers).slice(0, 5),
    comparisonLanguage: Array.from(patterns.comparisonLanguage).slice(0, 8),
    emotionalTriggers: Array.from(patterns.emotionalTriggers).slice(0, 8)
  };
};

// 3. ENHANCED PHRASE GENERATION PROMPT WITH REAL DATA (LEGACY VERSION)
const createLegacyRealDataPhrasePrompt = (
  keyword: any,
  domain: any,
  realQuestions: any[],
  realPhrases: any[],
  userLanguagePatterns: any,
  semanticContext: string
) => `
# AUTHENTIC USER LANGUAGE PHRASE GENERATOR v5.0
## Real Community Data Integration

**TARGET ANALYSIS:**
• Keyword: "${keyword.term}"
• Domain: ${domain.url}
• Context: ${domain.context}

**REAL USER QUESTIONS FROM REDDIT:**
${realQuestions.slice(0, 10).map((q: any) => 
  `• "${q.question}" [${q.platform.toUpperCase()}] (Engagement: ${q.engagement})`
).join('\n')}

**REAL USER PHRASES AND PROBLEMS:**
${realPhrases.slice(0, 15).map((p: any) => 
  `• "${p.phrase}" [${p.platform.toUpperCase()}]`
).join('\n')}

**AUTHENTIC USER LANGUAGE PATTERNS:**
Problem Language: ${userLanguagePatterns.problemDescriptors?.join(', ') || 'None'}
Solution Seeking: ${userLanguagePatterns.solutionSeekers?.join(', ') || 'None'}
Quality Words: ${userLanguagePatterns.qualityIndicators?.join(', ') || 'None'}
Urgency Terms: ${userLanguagePatterns.urgencyMarkers?.join(', ') || 'None'}
Comparison Language: ${userLanguagePatterns.comparisonLanguage?.join(', ') || 'None'}

## PHRASE GENERATION REQUIREMENTS

**CRITICAL RULE:** Generate COMPLETE PHRASES that sound like REAL USER QUESTIONS and problems, not marketing copy.

**Method:**
1. Take the real user questions and adapt them to our keyword
2. Use the actual language patterns from the community data
3. Maintain the authentic, conversational tone
4. Keep the natural question structure and flow

**Example Transformation:**
Real Question: "How do I find a reliable marketing agency that won't waste my money?"
Adapted for "SEO services": "How do I find reliable SEO services that actually deliver results?"

**Quality Criteria:**
✓ Sounds like something a real person would type into Google
✓ Uses authentic community language patterns
✓ Addresses real problems found in the data
✓ Natural conversational flow
✓ 8-15 words for voice search optimization
✓ Clear intent signals

**CRITICAL OUTPUT FORMAT:**
You MUST return a JSON array with exactly 5 complete phrase objects. Each object MUST have a "phrase" field containing a complete sentence.

Return this exact JSON structure:

{
  "phrases": [
    {
      "phrase": "How to implement ${keyword.term} effectively in the workplace",
      "intent": "Informational",
      "intentConfidence": 85,
      "relevanceScore": 92,
      "conversionPotential": 78,
      "voiceSearchOptimized": true,
      "basedOnRealQuestion": "How to implement diversity strategies",
      "userLanguageUsed": ["how to", "implement", "effectively"],
      "platform": "reddit",
      "naturalness": 95
    },
    {
      "phrase": "What are the best ${keyword.term} practices for small businesses",
      "intent": "Navigational",
      "intentConfidence": 80,
      "relevanceScore": 88,
      "conversionPotential": 75,
      "voiceSearchOptimized": true,
      "basedOnRealQuestion": "Best practices for diversity",
      "userLanguageUsed": ["best", "practices", "small businesses"],
      "platform": "reddit",
      "naturalness": 90
    },
    {
      "phrase": "Why is ${keyword.term} important for company culture",
      "intent": "Informational",
      "intentConfidence": 75,
      "relevanceScore": 85,
      "conversionPotential": 70,
      "voiceSearchOptimized": true,
      "basedOnRealQuestion": "Why diversity matters",
      "userLanguageUsed": ["why", "important", "company culture"],
      "platform": "both",
      "naturalness": 88
    },
    {
      "phrase": "Compare ${keyword.term} training programs and choose the right one",
      "intent": "Commercial Investigation",
      "intentConfidence": 70,
      "relevanceScore": 82,
      "conversionPotential": 85,
      "voiceSearchOptimized": true,
      "basedOnRealQuestion": "Compare training programs",
      "userLanguageUsed": ["compare", "training programs", "choose"],
      "platform": "reddit",
      "naturalness": 92
    },
    {
      "phrase": "Professional ${keyword.term} consulting services for immediate results",
      "intent": "Transactional",
      "intentConfidence": 75,
      "relevanceScore": 80,
      "conversionPotential": 90,
      "voiceSearchOptimized": true,
      "basedOnRealQuestion": "Professional consulting services",
      "userLanguageUsed": ["professional", "consulting", "immediate results"],
      "platform": "reddit",
      "naturalness": 85
    }
  ]
}

**IMPORTANT:** Each "phrase" field must be a complete, natural sentence that someone would actually search for. Do NOT return individual words or incomplete phrases.
`;

// 4. QUALITY VALIDATION FOR NATURAL PHRASES
const validatePhraseNaturalness = (phrase: string) => {
  const naturalityChecks = {
    hasQuestionWords: /^(how|what|where|when|why|which|who|is|are|can|should|will|do|does)/i.test(phrase),
    conversationalFlow: !/\b(optimization|maximization|utilization)\b/i.test(phrase), // Avoid overly technical terms
    naturalLength: phrase.split(' ').length >= 8 && phrase.split(' ').length <= 15,
    noKeywordStuffing: !/(seo|optimization|services|solutions|expert|professional){2,}/i.test(phrase),
    humanLikeLanguage: /\b(help|find|choose|get|need|want|looking for|trying to)\b/i.test(phrase)
  };
  
  const score = Object.values(naturalityChecks).filter(Boolean).length * 20;
  
  return {
    score,
    isNatural: score >= 60,
    suggestions: {
      addQuestionWord: !naturalityChecks.hasQuestionWords,
      simplifyLanguage: !naturalityChecks.conversationalFlow,
      adjustLength: !naturalityChecks.naturalLength,
      reduceKeywords: !naturalityChecks.noKeywordStuffing,
      addHumanLanguage: !naturalityChecks.humanLikeLanguage
    }
  };
};

// ===============================================
// 3. IMPROVED PHRASE GENERATION WITH INTENT VALIDATION
// ===============================================

const generateEnhancedIntentPhrases = async (
  keyword: any,
  domain: any,
  semanticContext: string,
  communityInsightData: any,
  competitorAnalysisData: any,
  keywordSearchPatterns: any,
  sendEvent: any
) => {
  try {
    console.log(`🎯 Generating intent-based phrases for: ${keyword.term}`);
    
    // Extract real user data
    const { realQuestions, realPhrases, userLanguagePatterns } = extractRealUserQuestions(communityInsightData);
    
    // Emit extracted Reddit posts for this keyword during phrase generation
    try {
      const posts = communityInsightData?.sources?.dataPoints;
      if (Array.isArray(posts) && posts.length > 0) {
        sendEvent('debug', {
          type: 'reddit',
          stage: 'phrase_generation',
          keyword: keyword.term,
          posts
        });
      }
    } catch {}
    
    // Use intent-focused prompt
    const prompt = createRealDataPhrasePrompt(
      keyword,
      domain,
      realQuestions,
      realPhrases,
      userLanguagePatterns,
      semanticContext
    );

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO specialist focused on creating intent-based search phrases that real users would type. Always return valid JSON with complete, natural phrases organized by search intent.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2, // Lower temperature for more consistent intent focus
      max_tokens: 2500,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0]?.message?.content;
    
    // NEW: emit debug raw AI response for phrase generation
    try {
      if (response && typeof sendEvent === 'function') {
        sendEvent('debug', {
          type: 'ai',
          stage: 'phrase_generation',
          keyword: keyword.term,
          responseRaw: response
        });
      }
    } catch {}
    
    if (response && response.trim()) {
      let phraseData = parseAIResponse(response, null);
      
      // Extract phrases array
      if (phraseData?.phrases && Array.isArray(phraseData.phrases)) {
        phraseData = phraseData.phrases;
      }

      if (Array.isArray(phraseData) && phraseData.length > 0) {
        const validatedPhrases: any[] = [];
        
        phraseData.forEach((phraseObj: any, index: number) => {
          console.log(`🔍 Validating phrase ${index + 1}: "${phraseObj.phrase}"`);
          
          // Validate phrase structure
          if (!phraseObj.phrase || typeof phraseObj.phrase !== 'string') {
            console.warn(`❌ Invalid phrase structure at index ${index}`);
            return;
          }

          // Validate intent accuracy
          const intentValidation = validateIntentAccuracy(phraseObj.phrase, phraseObj.intent);
          
          if (!intentValidation.isValid) {
            console.warn(`❌ Intent validation failed for "${phraseObj.phrase}": ${intentValidation.issues.join(', ')}`);
            
            // Auto-correct intent based on phrase content
            const correctedIntent = autoCorrectIntent(phraseObj.phrase);
            console.log(`🔄 Auto-correcting intent from "${phraseObj.intent}" to "${correctedIntent}"`);
            phraseObj.intent = correctedIntent;
            phraseObj.intentConfidence = Math.max(60, intentValidation.confidence);
          }

          // Ensure phrase quality
          const words = phraseObj.phrase.trim().split(/\s+/);
          if (words.length < 6 || words.length > 16) {
            console.warn(`⚠️ Phrase length issue: ${words.length} words`);
          }

          // Create validated phrase object
          const validatedPhrase = {
            domainId: domain.id,
            keywordId: keyword.id,
            phrase: phraseObj.phrase,
            intent: phraseObj.intent,
            intentConfidence: Math.min(100, Math.max(50, phraseObj.intentConfidence || 80)),
            relevanceScore: Math.min(100, Math.max(60, phraseObj.relevanceScore || 85)),
            sources: realQuestions.length > 0 ? ['Real User Data', 'Intent Analysis'] : ['AI Generated', 'Intent Focused'],
            trend: 'Rising',
            isSelected: false,
            tokenUsage: Math.floor((completion.usage?.total_tokens || 0) / phraseData.length)
          };

          validatedPhrases.push(validatedPhrase);
          
          // Send real-time update with intent validation details
          sendEvent('phrase-generated', {
            id: `new-${keyword.id}-${index}`,
            phrase: validatedPhrase.phrase,
            intent: validatedPhrase.intent,
            intentConfidence: validatedPhrase.intentConfidence,
            relevanceScore: validatedPhrase.relevanceScore,
            sources: validatedPhrase.sources,
            trend: validatedPhrase.trend,
            editable: true,
            selected: false,
            parentKeyword: keyword.term,
            keywordId: keyword.id,
            wordCount: words.length,
            intentValidation: {
              isValid: intentValidation.isValid,
              confidence: intentValidation.confidence,
              autoCorrected: phraseObj.intent !== (phraseObj.originalIntent || phraseObj.intent)
            }
          });
          
          console.log(`✅ Validated phrase: "${validatedPhrase.phrase}" (${validatedPhrase.intent}, ${validatedPhrase.intentConfidence}% confidence)`);
        });

        console.log(`🎯 Generated ${validatedPhrases.length} validated intent-based phrases for "${keyword.term}"`);
        return { phrasesToInsert: validatedPhrases, tokenUsage: completion.usage?.total_tokens || 0 };
      }
    }
    
    throw new Error('No valid phrases generated');

  } catch (error) {
    console.error(`❌ Intent-based phrase generation failed for ${keyword.term}:`, error);
    
    // Enhanced fallback with proper intent distribution
    const intentBasedFallback = [
      {
        phrase: `How to implement ${keyword.term} effectively for better business outcomes`,
        intent: 'Informational',
        intentConfidence: 80,
        relevanceScore: 85
      },
      {
        phrase: `Best ${keyword.term} services near me for professional results`,
        intent: 'Navigational',
        intentConfidence: 85,
        relevanceScore: 88
      },
      {
        phrase: `Hire ${keyword.term} expert for immediate consultation and support`,
        intent: 'Transactional',
        intentConfidence: 90,
        relevanceScore: 82
      },
      {
        phrase: `Compare ${keyword.term} costs and service options available`,
        intent: 'Commercial Investigation',
        intentConfidence: 85,
        relevanceScore: 80
      },
      {
        phrase: `What makes ${keyword.term} essential for business success`,
        intent: 'Informational',
        intentConfidence: 75,
        relevanceScore: 83
      }
    ];

    const phrasesToInsert = intentBasedFallback.map(fallback => ({
      domainId: domain.id,
      keywordId: keyword.id,
      phrase: fallback.phrase,
      intent: fallback.intent,
      intentConfidence: fallback.intentConfidence,
      relevanceScore: fallback.relevanceScore,
      sources: ['Intent-Based Fallback'],
      trend: 'Rising',
      isSelected: false,
      tokenUsage: 0
    }));

    return { phrasesToInsert, tokenUsage: 0 };
  }
};

// ===============================================
// 5. UPDATED ENHANCED PHRASE GENERATION FUNCTION WITH REAL USER DATA (LEGACY)
// ===============================================

const generateEnhancedPhrases = async (
  keyword: any,
  domain: any,
  semanticContext: string,
  communityInsightData: any,
  competitorAnalysisData: any,
  keywordSearchPatterns: any,
  sendEvent: any
) => {
  try {
    // Extract real user data from community insights
    const { realQuestions, realPhrases, userLanguagePatterns } = extractRealUserQuestions(communityInsightData);
    
    console.log(`Extracted ${realQuestions.length} real questions and ${realPhrases.length} real phrases for ${keyword.term}`);
    
    // Use real data if available, otherwise fallback to original method
    let prompt;
    if (realQuestions.length > 0 || realPhrases.length > 0) {
      prompt = createLegacyRealDataPhrasePrompt(
        keyword,
        domain,
        realQuestions,
        realPhrases,
        userLanguagePatterns,
        semanticContext
      );
      console.log(`Using real community data for ${keyword.term}`);
    } else {
      // Fallback to legacy prompt if no real data
      prompt = createLegacyRealDataPhrasePrompt(
        keyword,
        domain,
        [],
        [],
        {},
        semanticContext
      );
      console.log(`No real community data found for ${keyword.term}, using fallback method`);
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at converting real user questions into SEO-optimized search phrases. Always maintain the authentic, conversational tone of real users. Return valid JSON arrays only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent, authentic results
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0]?.message?.content;
    if (response && response.trim()) {
      let phraseData = parseAIResponse(response, null);
      
      console.log('Raw AI response structure:', {
        hasData: !!phraseData,
        isArray: Array.isArray(phraseData),
        hasPhrases: phraseData && typeof phraseData === 'object' && 'phrases' in phraseData,
        phrasesLength: phraseData?.phrases?.length || 0
      });
      
      // Handle different response formats
      if (phraseData && typeof phraseData === 'object') {
        if (phraseData.phrases && Array.isArray(phraseData.phrases)) {
          phraseData = phraseData.phrases;
          console.log(`Extracted ${phraseData.length} phrases from phrases array`);
        } else if (Array.isArray(phraseData)) {
          console.log(`Response is already an array with ${phraseData.length} items`);
        } else {
          // Try to find any array in the response
          const arrays = Object.values(phraseData).filter(Array.isArray);
          if (arrays.length > 0) {
            phraseData = arrays[0];
            console.log(`Found array in response with ${phraseData.length} items`);
          } else {
            console.warn('No array found in response, using fallback');
            phraseData = null;
          }
        }
      }

      if (Array.isArray(phraseData) && phraseData.length > 0) {
        const phrasesToInsert: any[] = [];
        
        phraseData.forEach((phraseObj: any, phraseIndex: number) => {
          console.log(`Processing phrase object ${phraseIndex}:`, phraseObj);
          
          // Handle different possible response formats
          let phraseText = '';
          if (typeof phraseObj === 'string') {
            phraseText = phraseObj;
          } else if (phraseObj?.phrase && typeof phraseObj.phrase === 'string') {
            phraseText = phraseObj.phrase;
          } else if (phraseObj?.text && typeof phraseObj.text === 'string') {
            phraseText = phraseObj.text;
          } else {
            console.warn(`Invalid phrase object at index ${phraseIndex}:`, phraseObj);
            return;
          }

          // Enhanced phrase validation for naturalness
          const words = phraseText.trim().split(/\s+/);
          let optimizedPhrase = phraseText;
          
          // Skip if it's just a single word or very short
          if (words.length < 3) {
            console.warn(`Phrase too short at index ${phraseIndex}: "${phraseText}"`);
            return;
          }
          
          // Ensure natural question flow
          if (!optimizedPhrase.match(/^(how|what|where|when|why|which|who|is|are|can|should|will|do|does)/i)) {
            if (words.length < 12) {
              optimizedPhrase = `How to ${optimizedPhrase.toLowerCase()}`;
            }
          }
          
          // Validate word count
          if (words.length < 8) {
            optimizedPhrase = `Complete guide to ${optimizedPhrase} for better results`;
          } else if (words.length > 15) {
            optimizedPhrase = words.slice(0, 15).join(' ');
          }

          // Validate naturalness
          const naturalnessCheck = validatePhraseNaturalness(optimizedPhrase);
          
          const phrase = {
            domainId: domain.id,
            keywordId: keyword.id,
            phrase: optimizedPhrase,
            intent: phraseObj.intent || 'Informational',
            intentConfidence: Math.min(100, Math.max(50, phraseObj.intentConfidence || 85)),
            relevanceScore: Math.min(100, Math.max(50, phraseObj.relevanceScore || 85)),
            sources: realQuestions.length > 0 ? ['Real User Questions', 'Community Data'] : ['AI Generated'],
            trend: 'Rising',
            isSelected: false,
            tokenUsage: Math.floor((completion.usage?.total_tokens || 0) / phraseData.length)
          };

          phrasesToInsert.push(phrase);
          
          // Send real-time phrase update with enhanced metadata
          sendEvent('phrase-generated', {
            id: `new-${keyword.id}-${phraseIndex}`,
            phrase: phrase.phrase,
            intent: phrase.intent,
            intentConfidence: phrase.intentConfidence,
            relevanceScore: phrase.relevanceScore,
            sources: phrase.sources,
            trend: phrase.trend,
            editable: true,
            selected: false,
            parentKeyword: keyword.term,
            keywordId: keyword.id,
            wordCount: phrase.phrase.trim().split(/\s+/).length,
            basedOnRealData: realQuestions.length > 0 || realPhrases.length > 0,
            naturalness: phraseObj.naturalness || naturalnessCheck.score
          });
        });

        return { phrasesToInsert, tokenUsage: completion.usage?.total_tokens || 0 };
      } else {
        throw new Error('Invalid phrase data structure received from AI');
      }
    } else {
      throw new Error('Empty response from OpenAI API');
    }

  } catch (error) {
    console.error(`Enhanced phrase generation with real data failed for ${keyword.term}:`, error);
    
    // Enhanced fallback with real user patterns if available
    const { userLanguagePatterns } = extractRealUserQuestions(communityInsightData);
    
    // Ensure userLanguagePatterns is an object with the expected properties
    const patterns = Array.isArray(userLanguagePatterns) ? {
      problemDescriptors: [],
      solutionSeekers: [],
      qualityIndicators: [],
      urgencyMarkers: [],
      comparisonLanguage: [],
      emotionalTriggers: []
    } : userLanguagePatterns;
    
    const fallbackPhrases = [
      {
        phrase: `How to ${patterns.solutionSeekers?.[0] || 'find'} ${keyword.term} that actually works`,
        intent: 'Informational',
        intentConfidence: 80,
        relevanceScore: 85
      },
      {
        phrase: `What are the ${patterns.qualityIndicators?.[0] || 'best'} ${keyword.term} options available`,
        intent: 'Navigational', 
        intentConfidence: 85,
        relevanceScore: 88
      },
      {
        phrase: `${patterns.problemDescriptors?.[0] || 'Having trouble with'} ${keyword.term} and need help`,
        intent: 'Informational',
        intentConfidence: 75,
        relevanceScore: 82
      },
      {
        phrase: `Compare ${keyword.term} solutions to choose the right one`,
        intent: 'Commercial Investigation',
        intentConfidence: 70,
        relevanceScore: 80
      },
      {
        phrase: `Professional ${keyword.term} services for immediate results`,
        intent: 'Transactional',
        intentConfidence: 75,
        relevanceScore: 83
      }
    ];

    const phrasesToInsert: any[] = [];
    fallbackPhrases.forEach((fallbackPhrase, phraseIndex) => {
      const phraseData = {
        domainId: domain.id,
        keywordId: keyword.id,
        phrase: fallbackPhrase.phrase,
        intent: fallbackPhrase.intent,
        intentConfidence: fallbackPhrase.intentConfidence,
        relevanceScore: fallbackPhrase.relevanceScore,
        sources: ['AI Generated - Enhanced Fallback with User Patterns'],
        trend: 'Rising',
        isSelected: false,
        tokenUsage: 0
      };

      phrasesToInsert.push(phraseData);
    });

    return { phrasesToInsert, tokenUsage: 0 };
  }
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
  
  // Related terms for women empowerment and mentorship
  const relatedTerms = [
    'women', 'woman', 'girl', 'female', 'ladies', 'sister',
    'empower', 'empowerment', 'mentor', 'mentorship', 'leadership',
    'career', 'professional', 'business', 'success', 'growth',
    'advice', 'tips', 'help', 'support', 'community', 'network',
    'confidence', 'skills', 'development', 'opportunity', 'challenge'
  ];
  
  relatedTerms.forEach(term => {
    if (lowerText.includes(term)) {
      score += 1;
    }
  });
  
  // Quality indicators
  if (lowerText.includes('problem') || lowerText.includes('issue')) score += 3;
  if (lowerText.includes('solution') || lowerText.includes('help')) score += 3;
  if (lowerText.includes('how to') || lowerText.includes('best')) score += 2;
  if (lowerText.includes('experience') || lowerText.includes('story')) score += 2;
  if (lowerText.includes('advice') || lowerText.includes('tips')) score += 2;
  
  // Length bonus for substantial content
  if (text.length > 50) score += 1;
  if (text.length > 100) score += 1;
  if (text.length > 200) score += 1;
  
  // Bonus for question format (common in community discussions)
  if (lowerText.includes('?') || lowerText.includes('what') || lowerText.includes('how') || lowerText.includes('why')) {
    score += 1;
  }
  
  // Ensure minimum score for any community content
  return Math.max(score, 1); // Minimum score of 1 for any community content
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

    // Balanced approach: Group keywords by priority for optimal processing
    const keywordPriority = {
      high: keywordsToProcess.filter(kw => (kw.volume || 0) > 1000),
      medium: keywordsToProcess.filter(kw => (kw.volume || 0) > 100 && (kw.volume || 0) <= 1000),
      low: keywordsToProcess.filter(kw => (kw.volume || 0) <= 100)
    };

    console.log(`Keyword priority distribution: High=${keywordPriority.high.length}, Medium=${keywordPriority.medium.length}, Low=${keywordPriority.low.length}`);
    
    // Process high-priority keywords with enhanced analysis (2-3 keywords max)
    const highValueKeywords = keywordPriority.high.slice(0, 3);
    // Process medium-priority keywords with balanced approach (5-7 keywords max)
    const mediumValueKeywords = keywordPriority.medium.slice(0, 7);
    // Process low-priority keywords with fast track (remaining)
    const lowValueKeywords = keywordPriority.low;
    
    const totalKeywords = highValueKeywords.length + mediumValueKeywords.length + lowValueKeywords.length;

    // Initialize generation steps according to flowchart
    const generatingSteps = [
      { name: 'Semantic Content Analysis', status: 'pending', progress: 0, description: 'Analyzing brand voice, theme, and target audience' },
              { name: 'Community Data Mining', status: 'pending', progress: 0, description: 'Extracting real insights from Reddit using Reddit API' },
      { name: 'Competitor Research', status: 'pending', progress: 0, description: 'Researching competitors mentioned in community discussions' },
      { name: 'Search Pattern Analysis', status: 'pending', progress: 0, description: 'Analyzing user search behaviors' },
      { name: 'Creating optimized intent phrases', status: 'pending', progress: 0, description: 'Generating optimized search phrases' },
      { name: 'Intent Classification', status: 'pending', progress: 0, description: 'Classifying generated phrases by intent' },
      { name: 'Relevance Score', status: 'pending', progress: 0, description: 'Computing semantic relevance scores' }
    ];

    sendEvent('steps', generatingSteps);

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
    let parsedSemanticData = null;
    
    if (existingSemanticAnalysis) {
      console.log('Semantic analysis already exists, skipping...');
      semanticContext = existingSemanticAnalysis.contentSummary;
      // Try to parse existing semantic data
      try {
        parsedSemanticData = JSON.parse(existingSemanticAnalysis.contentSummary);
      } catch (e) {
        console.log('Could not parse existing semantic data, will use fallback');
      }
      sendEvent('progress', { 
        phase: 'semantic_analysis',
        message: 'Semantic Content Analysis - Using existing data',
        progress: 100
      });
      sendEvent('step-update', { index: 0, status: 'completed', progress: 100 });
    } else {
      try {
      const semanticPrompt = `
You are an expert brand strategist specializing in concise community intelligence extraction. Your task is to generate ONLY essential, search-friendly content for community data mining.

DOMAIN ANALYSIS TARGET:
URL: ${domain.url}
Business Context: ${domain.context || 'Context not provided'}
Geographic Focus: ${domain.location || 'Global market'}

      CRITICAL REQUIREMENT: Generate ONLY concise, search-friendly content that can be used for Reddit queries. Keep each section under 50 words.

OUTPUT FORMAT:
Return a concise JSON object with search-friendly content:

{
  "coreBusiness": "Brief description of what the business does (max 30 words)",
  "primaryServices": ["service1", "service2", "service3"],
  "targetAudience": "Primary customer type (max 20 words)",
  "location": "${domain.location || 'Global'}",
  "industry": "Main industry category (max 15 words)",
  "keyProblems": ["problem1", "problem2", "problem3"],
  "searchTerms": ["term1", "term2", "term3", "term4", "term5"],
  "communityTopics": ["topic1", "topic2", "topic3"]
}

RULES:
- Keep all text under 50 words per field
- Focus on search-friendly terms
- Avoid long descriptions
- Use simple, direct language
- Prioritize terms people actually search for
- Include location-specific terms if relevant
- Focus on problems and solutions people discuss online

EXAMPLE OUTPUT:
{
  "coreBusiness": "Digital marketing agency specializing in SEO and reputation management",
  "primaryServices": ["SEO", "reputation management", "digital marketing"],
  "targetAudience": "Small businesses needing digital presence",
  "location": "New York",
  "industry": "Digital marketing",
  "keyProblems": ["poor online visibility", "negative reviews", "low website traffic"],
  "searchTerms": ["SEO services", "reputation management", "digital marketing agency"],
  "communityTopics": ["SEO tips", "online reputation", "digital marketing"]
}
`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: semanticPrompt }],
        temperature: 0.3,
        max_tokens: 1500
      });

      const response = completion.choices[0]?.message?.content;
      
      if (response) {
        // NEW: emit debug raw AI response for semantic analysis
        try {
          sendEvent('debug', {
            type: 'ai',
            stage: 'semantic_analysis',
            responseRaw: response
          });
        } catch {}
        const semanticData = parseAIResponse(response, { error: 'Failed to parse semantic data' });
        semanticContext = semanticData ? JSON.stringify(semanticData) : response;
        totalTokenUsage += completion.usage?.total_tokens || 0;
        
        // Store semantic data for community mining
        parsedSemanticData = typeof semanticData === 'object' ? semanticData : null;
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
        message: 'Community Data Mining - Extracting insights from Reddit for domain',
        progress: 25
      });

    // Check if community insight already exists
    const existingCommunityInsight = await prisma.communityInsight.findFirst({
      where: { domainId: domain.id }
    });

    if (existingCommunityInsight) {
      console.log('Community insight already exists, using existing data...');
      communityInsightData = existingCommunityInsight;
      // Emit debug reddit posts from existing insight if available
      try {
        const sourcesObj = (existingCommunityInsight as any)?.sources as any;
        const posts = Array.isArray(sourcesObj?.dataPoints) ? sourcesObj.dataPoints : [];
        if (posts.length > 0) {
          sendEvent('debug', {
            type: 'reddit',
            stage: 'community_mining',
            posts
          });
        }
      } catch {}
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
        `best ${businessContext} recommendations reddit`
      ];

      const allRedditData = [];

      try {
        console.log(`🚀 Starting enhanced community mining for domain: ${domain.url}`);
        
        const businessContext = domain.context || domain.url.replace(/https?:\/\//, '').replace(/www\./, '').split('.')[0];
        
        // Use the enhanced community mining function with semantic data
        const miningResults = await performEnhancedCommunityMining(businessContext, domain, parsedSemanticData);
        
        const { redditData: allRedditData, dataQuality } = miningResults;
        const successfulQueries = dataQuality.successfulQueries;
        const failedQueries = dataQuality.failedQueries;

        // Use the data from enhanced mining results (already processed)
        const uniqueRedditData = allRedditData;

        // NEW: emit debug Reddit posts
        try {
          sendEvent('debug', {
            type: 'reddit',
            posts: uniqueRedditData
          });
        } catch {}

        console.log(`📈 Data Quality Assessment:`, dataQuality);
        console.log(`🎯 Final community data: ${uniqueRedditData.length} Reddit posts`);

        // Store enhanced community data with quality metrics
        communityInsightData = {
          domainId: domain.id,
          sources: {
            reddit: uniqueRedditData.length,
            total: uniqueRedditData.length,
            quality: dataQuality.qualityRating,
            searchQueries: dataQuality.totalQueries,
            successRate: (dataQuality.successfulQueries / dataQuality.totalQueries * 100).toFixed(1) + '%',
            dataPoints: [...uniqueRedditData].slice(0, 50),
            qualityMetrics: dataQuality
          },
          summary: JSON.stringify({
            primaryQuestions: uniqueRedditData
              .slice(0, 10)
              .map((item: any) => item.title),
            criticalPainPoints: uniqueRedditData
              .filter((item: any) => item.content.toLowerCase().includes('problem') || item.content.toLowerCase().includes('issue'))
              .slice(0, 5)
              .map((item: any) => item.content.substring(0, 100) + '...'),
            recommendedSolutions: uniqueRedditData
              .filter((item: any) => item.title.toLowerCase().includes('how') || item.title.toLowerCase().includes('best'))
              .slice(0, 5)
              .map((item: any) => item.title),
            marketOpportunities: [
              `High-quality community engagement opportunities`,
              `Content gaps identified in competitor discussions`,
              `User pain points requiring solutions`,
              `Emerging trends in ${businessContext} discussions`
            ],
            languagePatterns: [...new Set([
              ...uniqueRedditData.flatMap((item: any) => 
                item.title.toLowerCase().match(/\b(?:how to|best|top|guide|tips|help|solution|problem|issue|fix|improve|optimize)\b/g) || []
              )
            ])].slice(0, 15)
          }),
          tokenUsage: 0 // Will be updated during AI analysis
        };

        // If we have quality community data, proceed with AI analysis
        if (dataQuality.qualityRating !== 'Low' && uniqueRedditData.length > 5) {
          try {
            const enhancedCommunityAnalysisPrompt = `
# ELITE COMMUNITY INTELLIGENCE EXTRACTION v2.0
## Advanced User Intent & Market Intelligence Analysis

You are a world-class digital anthropologist and business intelligence expert with deep expertise in community behavior analysis, user psychology, and market intelligence extraction from social platforms.

## DATA INTELLIGENCE BRIEF
**Target Business:** ${domain.url}
**Industry Context:** ${domain.context || businessContext}
**Geographic Market:** ${domain.location || 'Global'}
**Data Quality:** ${dataQuality.qualityRating} (${dataQuality.successfulQueries}/${dataQuality.totalQueries} successful queries)

## COMMUNITY DATA ANALYZED
**Reddit Insights:** ${uniqueRedditData.length} high-relevance discussions
**Average Relevance Score:** Reddit ${dataQuality.averageRelevance.reddit.toFixed(1)}/20

**Top Community Content Sample:**
${uniqueRedditData
  .slice(0, 8)
  .map((item: any, idx: number) => `${idx + 1}. [REDDIT] ${item.title}\n   Content: "${item.content.substring(0, 150)}..."\n   Relevance: ${item.relevanceScore}/20`)
  .join('\n\n')}

## ADVANCED EXTRACTION FRAMEWORK

### 1. USER PSYCHOLOGY INTELLIGENCE
Extract deep behavioral insights about how users think, feel, and search in this domain:
- **Pain Point Psychology:** What frustrates users most about current solutions
- **Decision Making Patterns:** How users evaluate and choose between options
- **Language Evolution:** How terminology and jargon is evolving in community discussions
- **Trust Signals:** What makes users trust and recommend solutions
- **Expertise Hierarchy:** How users recognize and defer to authority in this space

### 2. SEARCH INTENT BEHAVIORAL MAPPING
Map real community language to search behaviors:
- **Problem Articulation Patterns:** How users describe their challenges
- **Solution Seeking Language:** Specific words/phrases users employ when looking for help
- **Comparison Framework:** How users frame competitive evaluations
- **Implementation Concerns:** What users worry about when adopting solutions
- **Success Measurement:** How users define and measure successful outcomes

### 3. COMPETITIVE INTELLIGENCE EXTRACTION
Extract actionable competitive insights from authentic user discussions:
- **Brand Mention Context:** When and why users mention specific companies
- **Switching Triggers:** What causes users to change from one solution to another
- **Feature Gap Identification:** What users consistently request but don't find
- **Service Quality Perceptions:** How users perceive different providers
- **Price Sensitivity Patterns:** How cost factors into user decision making

### 4. MARKET OPPORTUNITY IDENTIFICATION
Identify untapped opportunities from community frustrations:
- **Underserved Use Cases:** Specific scenarios lacking adequate solutions
- **Communication Gaps:** Where current providers fail to connect with users
- **Innovation Opportunities:** Emerging needs not yet addressed by market
- **Service Enhancement Areas:** Consistent improvement requests across discussions
- **Content Gap Analysis:** Information users seek but struggle to find

## OUTPUT SPECIFICATION

Generate comprehensive business intelligence in this exact JSON structure:

{
  "userIntelligence": {
    "primaryPersonas": [
      {
        "personaName": "Descriptive persona name",
        "painPoints": ["specific frustration 1", "specific frustration 2"],
        "searchLanguage": ["actual phrases they use", "terminology patterns"],
        "decisionFactors": ["what influences their choices"],
        "trustIndicators": ["what builds confidence"],
        "successMetrics": ["how they measure results"]
      }
    ],
    "psychologyInsights": {
      "emotionalTriggers": ["fear of failure", "desire for efficiency", "need for control"],
      "motivationalDrivers": ["save time", "reduce costs", "improve results"],
      "barriersToPurchase": ["price concerns", "complexity fears", "trust issues"],
      "conversionCatalysts": ["social proof", "expert endorsement", "risk mitigation"]
    }
  },
  "searchBehaviorIntelligence": {
    "naturalLanguagePatterns": [
      {
        "pattern": "how users naturally ask questions",
        "frequency": "High|Medium|Low",
        "intent": "Informational|Navigational|Transactional|Commercial",
        "examples": ["actual user phrase 1", "actual user phrase 2"]
      }
    ],
    "problemFramingLanguage": {
      "commonPhrases": ["how users describe problems"],
      "emotionalContext": ["frustrated language patterns"],
      "urgencyIndicators": ["words showing time sensitivity"],
      "specificityLevel": ["general vs specific problem descriptions"]
    },
    "solutionSeekingBehavior": {
      "queryStructure": ["how users ask for solutions"],
      "qualitySignals": ["words indicating desired solution quality"],
      "comparisonLanguage": ["how users compare options"],
      "implementationConcerns": ["worries about adopting solutions"]
    }
  },
  "competitiveIntelligence": {
    "brandPerceptions": {
      "positiveAssociations": ["what users love about top competitors"],
      "negativeAssociations": ["what users dislike about competitors"],
      "neutralMentions": ["factual competitor references"],
      "migrationTriggers": ["why users switch between solutions"]
    },
    "marketGaps": {
      "serviceGaps": ["services users want but can't find"],
      "communicationGaps": ["information users need but lack"],
      "experienceGaps": ["user experience improvements desired"],
      "pricingGaps": ["pricing models users prefer"]
    },
    "competitorWeaknesses": [
      {
        "competitor": "competitor name if mentioned",
        "weaknesses": ["specific user complaints"],
        "opportunityArea": "how our domain could capitalize"
      }
    ]
  },
  "marketOpportunities": {
    "contentOpportunities": [
      {
        "topic": "specific content topic needed",
        "userNeed": "what users are looking for",
        "competitiveGap": "why current content doesn't satisfy",
        "businessValue": "revenue/engagement potential"
      }
    ],
    "serviceInnovations": [
      {
        "innovation": "new service concept",
        "userDemand": "evidence of user interest",
        "marketReadiness": "how ready market is for this",
        "implementationFeasibility": "ease of implementation"
      }
    ],
    "positioningOpportunities": [
      {
        "position": "unique market position available",
        "rationale": "why this position is open",
        "targetAudience": "who would respond to this positioning",
        "competitiveAdvantage": "sustainable advantage potential"
      }
    ]
  },
  "actionableInsights": {
    "immediateActions": [
      {
        "action": "specific action to take",
        "impact": "expected business impact",
        "effort": "implementation difficulty",
        "timeline": "suggested timeframe"
      }
    ],
    "contentStrategy": {
      "highPriorityTopics": ["topic 1", "topic 2"],
      "contentFormats": ["format preferences from community"],
      "tonalGuidance": ["how users prefer to be communicated with"],
      "frequencyRecommendations": ["how often to publish content"]
    },
    "seoStrategy": {
      "primaryTargets": ["main SEO opportunity areas"],
      "longtailOpportunities": ["specific longtail keyword opportunities"],
      "localSeoInsights": ["local search opportunities if relevant"],
      "voiceSearchOptimization": ["conversational query opportunities"]
    }
  },
  "dataValidation": {
    "confidenceLevel": "High|Medium|Low",
    "dataLimitations": ["any limitations in the data"],
    "recommendedValidation": ["ways to validate these insights"],
    "nextSteps": ["recommended follow-up research"]
  }
}

## CRITICAL ANALYSIS REQUIREMENTS

### Quality Standards:
- Every insight must be traceable to actual community data
- Avoid generic industry assumptions - focus on specific community evidence
- Prioritize actionable intelligence over broad observations
- Identify unique opportunities not obvious from surface-level analysis
- Connect user language patterns to search behavior implications

### Business Intelligence Focus:
- How can these insights directly improve SEO performance?
- What content gaps can be filled based on community needs?
- Which competitive weaknesses can be exploited?
- What user language should inform keyword strategy?
- How can community insights improve conversion rates?

### Strategic Implementation Context:
Generate insights that will directly inform:
1. **SEO Content Strategy:** What content to create and how to optimize it
2. **Keyword Targeting:** Which phrases and language patterns to prioritize
3. **Competitive Positioning:** How to differentiate from competitors
4. **User Experience:** How to better serve user needs and intentions
5. **Conversion Optimization:** How to turn insights into qualified traffic

**CRITICAL:** Base every insight on actual community data provided. Do not make assumptions or add generic industry knowledge. Focus on what real users are saying in real discussions.

Return ONLY the JSON object with no additional explanatory text.
`;

            const completion = await openai.chat.completions.create({
              model: 'gpt-4o',
              messages: [
                {
                  role: 'system',
                  content: 'You are an expert digital anthropologist specializing in community intelligence extraction for SEO strategy. Always return valid JSON objects only.'
                },
                {
                  role: 'user',
                  content: enhancedCommunityAnalysisPrompt
                }
              ],
              temperature: 0.3,
              max_tokens: 3000,
              response_format: { type: "json_object" }
            });

            const response = completion.choices[0]?.message?.content;
            
            if (response && response.trim()) {
              // NEW: emit debug raw AI response for community analysis
              try {
                sendEvent('debug', {
                  type: 'ai',
                  stage: 'community_analysis',
                  responseRaw: response
                });
              } catch {}
              const communityAnalysisData = parseAIResponse(response, {
                userIntelligence: { primaryPersonas: [], psychologyInsights: {} },
                searchBehaviorIntelligence: { naturalLanguagePatterns: [], problemFramingLanguage: {}, solutionSeekingBehavior: {} },
                competitiveIntelligence: { brandPerceptions: {}, marketGaps: {}, competitorWeaknesses: [] },
                marketOpportunities: { contentOpportunities: [], serviceInnovations: [], positioningOpportunities: [] },
                actionableInsights: { immediateActions: [], contentStrategy: {}, seoStrategy: {} },
                dataValidation: { confidenceLevel: 'Medium', dataLimitations: [], recommendedValidation: [], nextSteps: [] }
              });

              // Enhanced community insight data structure
              communityInsightData = {
                domainId: domain.id,
                sources: {
                  reddit: uniqueRedditData.length,
                  total: uniqueRedditData.length,
                  quality: dataQuality.qualityRating,
                  searchQueries: dataQuality.totalQueries,
                  successRate: (dataQuality.successfulQueries / dataQuality.totalQueries * 100).toFixed(1) + '%',
                  dataPoints: [...uniqueRedditData].slice(0, 50),
                  qualityMetrics: dataQuality,
                  enhancedAnalysis: communityAnalysisData
                },
                summary: JSON.stringify({
                  userIntelligence: communityAnalysisData.userIntelligence,
                  searchBehavior: communityAnalysisData.searchBehaviorIntelligence,
                  competitiveInsights: communityAnalysisData.competitiveIntelligence,
                  marketOpportunities: communityAnalysisData.marketOpportunities,
                  actionableStrategy: communityAnalysisData.actionableInsights,
                  confidenceLevel: communityAnalysisData.dataValidation?.confidenceLevel || 'Medium'
                }),
                tokenUsage: completion.usage?.total_tokens || 0
              };

              totalTokenUsage += completion.usage?.total_tokens || 0;
              console.log(`✅ Enhanced community analysis completed with ${dataQuality.qualityRating} quality rating`);

            } else {
              throw new Error('Empty response from community analysis');
            }
          } catch (error) {
            console.error(`Enhanced community analysis failed:`, error);
            // Use existing community insight data structure
          }
        } else {
          console.warn(`Low quality community data (${dataQuality.qualityRating}), using enhanced fallback`);
          
          // Enhanced fallback with strategic assumptions
          communityInsightData = {
            domainId: domain.id,
            sources: { 
              reddit: allRedditData?.length || 0, 
              total: allRedditData?.length || 0,
              quality: 'Low',
              fallback: true,
              reason: 'Insufficient community data retrieved',
              enhancedFallback: true
            },
            summary: JSON.stringify({
              userIntelligence: {
                primaryPersonas: [{
                  personaName: `${businessContext} Seekers`,
                  painPoints: [`Finding reliable ${businessContext} information`, `Choosing the right ${businessContext} approach`],
                  searchLanguage: [`how to ${businessContext}`, `best ${businessContext}`, `${businessContext} guide`],
                  decisionFactors: ['quality', 'price', 'reliability', 'expertise'],
                  trustIndicators: ['professional credentials', 'positive reviews', 'proven results'],
                  successMetrics: ['improved outcomes', 'time savings', 'cost effectiveness']
                }]
              },
              searchBehavior: {
                naturalLanguagePatterns: [
                  { pattern: `how to improve ${businessContext}`, frequency: 'High', intent: 'Informational' },
                  { pattern: `best ${businessContext} services`, frequency: 'High', intent: 'Navigational' },
                  { pattern: `${businessContext} cost and pricing`, frequency: 'Medium', intent: 'Commercial' }
                ]
              },
              marketOpportunities: {
                contentOpportunities: [
                  { topic: `${businessContext} beginner guide`, userNeed: 'education', competitiveGap: 'complex existing content' },
                  { topic: `${businessContext} comparison guide`, userNeed: 'decision support', competitiveGap: 'biased comparisons' }
                ]
              }
            }),
            tokenUsage: 0
          };
        }

      } catch (error) {
        console.error(`Enhanced community mining failed for domain ${domain.url}:`, error);
        // Use the existing fallback logic but enhanced
        communityInsightData = {
          domainId: domain.id,
          sources: { 
            reddit: 0, 
            total: 0,
            error: error instanceof Error ? error.message : 'Community mining failed',
            fallback: true,
            enhanced: false
          },
          summary: JSON.stringify({
            userIntelligence: { error: 'Failed to extract user intelligence' },
            searchBehavior: { error: 'Failed to analyze search behavior' },
            marketOpportunities: { error: 'Failed to identify opportunities' }
          }),
          tokenUsage: 0
        };
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
        // NEW: emit debug raw AI response for competitor research
        try {
          sendEvent('debug', {
            type: 'ai',
            stage: 'competitor_research',
            responseRaw: response
          });
        } catch {}
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

    // Process keywords by priority for search pattern analysis
    const allKeywordsToProcess = [...highValueKeywords, ...mediumValueKeywords, ...lowValueKeywords];
    for (let i = 0; i < allKeywordsToProcess.length; i++) {
      const keyword = allKeywordsToProcess[i];
      
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
          message: `Using existing search patterns for "${keyword.term}" (${i + 1}/${allKeywordsToProcess.length})`,
          progress: 38 + (i / allKeywordsToProcess.length) * 15
        });
        continue; // Skip to next keyword
      }
      
      sendEvent('progress', { 
        phase: 'search_patterns',
        message: `Analyzing search patterns for "${keyword.term}" (${i + 1}/${allKeywordsToProcess.length})`,
        progress: 38 + (i / allKeywordsToProcess.length) * 15
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
          // NEW: emit debug raw AI response for search patterns per keyword
          try {
            sendEvent('debug', {
              type: 'ai',
              stage: 'search_patterns',
              keyword: keyword.term,
              responseRaw: response
            });
          } catch {}
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

    for (let i = 0; i < allKeywordsToProcess.length; i++) {
      const keyword = allKeywordsToProcess[i];
      
      // Check if phrases already exist for this keyword
      const existingPhrases = allExistingPhrases.filter(phrase => phrase.keywordId === keyword.id);

      if (existingPhrases.length >= 5) {
        console.log(`Phrases already exist for keyword "${keyword.term}", skipping generation...`);
        
        sendEvent('progress', { 
          phase: 'phrase_generation',
          message: `Using existing phrases for "${keyword.term}" (${i + 1}/${allKeywordsToProcess.length})`,
          progress: 46 + (i / allKeywordsToProcess.length) * 15
        });
        continue; // Skip to next keyword
      }
      
      sendEvent('progress', { 
        phase: 'phrase_generation',
        message: `Generating phrases for "${keyword.term}" (${i + 1}/${allKeywordsToProcess.length})`,
        progress: 46 + (i / allKeywordsToProcess.length) * 15
      });

      try {
        // Get all context data for this keyword
        const keywordCommunityData = communityInsightData;
        const keywordCompetitorData = competitorAnalysisData;
        const keywordSearchPatterns = searchPatterns.find(pattern => pattern.keywordId === keyword.id);

        // Use the enhanced intent-based phrase generation function
        const { phrasesToInsert: newPhrases, tokenUsage: phraseTokenUsage } = await generateEnhancedIntentPhrases(
          keyword,
          domain,
          semanticContext,
          keywordCommunityData,
          keywordCompetitorData,
          keywordSearchPatterns,
          sendEvent
        );

        // Add generated phrases to the main arrays
        phrasesToInsert.push(...newPhrases);
        
        newPhrases.forEach((phrase: any, phraseIndex: number) => {
          allPhrases.push({
            ...phrase,
            id: `temp-${i}-${phraseIndex}`,
            parentKeyword: keyword.term,
            editable: true,
            selected: false
          });
        });

        totalTokenUsage += phraseTokenUsage;
        
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
    console.log(`Total keywords processed: ${allKeywordsToProcess.length}`);
    console.log(`Priority breakdown: High=${highValueKeywords.length}, Medium=${mediumValueKeywords.length}, Low=${lowValueKeywords.length}`);
    
    sendEvent('progress', { 
      message: 'Enhanced phrase generation completed successfully',
      progress: 100
    });

    // Get final count of all phrases (existing + newly generated)
    const finalPhraseCount = await prisma.generatedIntentPhrase.count({
      where: { 
        domainId: domain.id,
        keywordId: { in: allKeywordsToProcess.map(kw => kw.id) }
      }
    });

    // Add a small delay to ensure all phrase events are processed
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Final phrase count from database: ${finalPhraseCount}`);
    console.log(`Total phrases sent to frontend: ${allPhrases.length}`);
    console.log(`Expected total phrases: ${allKeywordsToProcess.length * 5}`);

    sendEvent('complete', {
      totalPhrases: finalPhraseCount,
      totalKeywords: allKeywordsToProcess.length,
      totalTokenUsage: totalTokenUsage,
      priorityBreakdown: {
        high: highValueKeywords.length,
        medium: mediumValueKeywords.length,
        low: lowValueKeywords.length
      },
      message: `Successfully processed ${finalPhraseCount} phrases for ${allKeywordsToProcess.length} keywords using balanced priority approach`
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