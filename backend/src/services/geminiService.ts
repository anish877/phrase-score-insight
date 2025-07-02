import axios from 'axios';
import * as cheerio from 'cheerio';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set in environment variables');

export interface GeminiExtractionResult {
  pagesScanned: number;
  contentBlocks: number;
  keyEntities: number;
  confidenceScore: number;
  extractedContext: string;
}

export interface CrawlProgress {
  phase: 'discovery' | 'content' | 'ai_processing' | 'validation';
  step: string;
  progress: number;
  stats: {
    pagesScanned: number;
    contentBlocks: number;
    keyEntities: number;
    confidenceScore: number;
  };
}

export type ProgressCallback = (progress: CrawlProgress) => void;

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function crawlWebsiteWithProgress(
  domain: string, 
  maxPages = 8,
  onProgress?: ProgressCallback,
  relevantPaths?: string[],
  priorityUrls?: string[]
): Promise<{contentBlocks: string[], urls: string[]}> {
  const visited = new Set<string>();
  const queue: string[] = [];
  
  // Add priority URLs first if provided
  if (priorityUrls && priorityUrls.length > 0) {
    queue.push(...priorityUrls);
    onProgress?.({
      phase: 'discovery',
      step: `Prioritizing ${priorityUrls.length} specified URLs...`,
      progress: 5,
      stats: { pagesScanned: 0, contentBlocks: 0, keyEntities: 0, confidenceScore: 0 }
    });
  }
  
  // Add default domain URLs
  queue.push(`https://${domain}`, `https://www.${domain}`);
  
  const contentBlocks: string[] = [];
  const discoveredUrls: string[] = [];
  let stats = { pagesScanned: 0, contentBlocks: 0, keyEntities: 0, confidenceScore: 0 };

  // Phase 1: Domain Discovery
  onProgress?.({
    phase: 'discovery',
    step: 'Validating domain accessibility...',
    progress: 5,
    stats
  });

  // Real validation check
  try {
    await axios.get(`https://${domain}`, { timeout: 5000 });
  } catch (error) {
    throw new Error(`Domain ${domain} is not accessible`);
  }

  onProgress?.({
    phase: 'discovery',
    step: priorityUrls && priorityUrls.length > 0 ? 'Starting with priority URLs...' : 'Scanning site architecture...',
    progress: 10,
    stats
  });

  onProgress?.({
    phase: 'discovery',
    step: 'Mapping content structure...',
    progress: 15,
    stats
  });

  // Phase 2: Content Analysis
  onProgress?.({
    phase: 'content',
    step: 'Extracting page content...',
    progress: 20,
    stats
  });

  let progressIncrement = 50 / maxPages; // 50% of progress for crawling

  while (queue.length > 0 && visited.size < maxPages) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;

    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
        }
      });
      
      visited.add(url);
      discoveredUrls.push(url);
      stats.pagesScanned = visited.size;
      
      // Check if this is a priority URL
      const isPriorityUrl = priorityUrls && priorityUrls.includes(url);
      
      const $ = cheerio.load(response.data);

      // Extract various content types
      const contentSelectors = [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'article', 'section', '.content', '.main',
        '[role="main"]', '.description', '.about',
        '.services', '.products', '.features',
        '.company', '.team', '.mission', '.vision',
        '.values', '.approach', '.methodology',
        '.expertise', '.capabilities', '.solutions',
        '.industries', '.clients', '.case-studies',
        '.testimonials', '.leadership', '.careers',
        '.contact', '.faq', '.blog', '.news'
      ];

      contentSelectors.forEach(selector => {
        $(selector).each((_, element) => {
          const text = $(element).text().trim();
          if (text.length > 20 && text.length < 2000) {
            contentBlocks.push(text);
          }
        });
      });

      // Extract meta information and structured data
      const title = $('title').text().trim();
      const description = $('meta[name="description"]').attr('content');
      const keywords = $('meta[name="keywords"]').attr('content');
      const ogTitle = $('meta[property="og:title"]').attr('content');
      const ogDescription = $('meta[property="og:description"]').attr('content');
      
      // Extract schema.org structured data
      const schemaData = $('script[type="application/ld+json"]').each((_, element) => {
        try {
          const schema = JSON.parse($(element).html() || '{}');
          if (schema['@type'] === 'Organization' || schema['@type'] === 'LocalBusiness') {
            if (schema.name) contentBlocks.push(`Organization Name: ${schema.name}`);
            if (schema.description) contentBlocks.push(`Organization Description: ${schema.description}`);
            if (schema.url) contentBlocks.push(`Organization URL: ${schema.url}`);
            if (schema.address) contentBlocks.push(`Organization Address: ${JSON.stringify(schema.address)}`);
          }
        } catch (e) {
          // Ignore invalid JSON
        }
      });

      // Extract navigation and footer content for company info
      $('nav, footer, .header, .footer').each((_, element) => {
        const text = $(element).text().trim();
        if (text.length > 50 && text.length < 1000) {
          contentBlocks.push(text);
        }
      });
      
      if (title) contentBlocks.push(`Page Title: ${title}`);
      if (description) contentBlocks.push(`Meta Description: ${description}`);
      if (keywords) contentBlocks.push(`Meta Keywords: ${keywords}`);
      if (ogTitle) contentBlocks.push(`Open Graph Title: ${ogTitle}`);
      if (ogDescription) contentBlocks.push(`Open Graph Description: ${ogDescription}`);

      stats.contentBlocks = contentBlocks.length;

      // Update progress based on real crawling progress
      const currentProgress = 20 + (visited.size * progressIncrement);
      onProgress?.({
        phase: 'content',
        step: `${isPriorityUrl ? 'Priority ' : ''}Analyzing page ${visited.size}/${maxPages}...`,
        progress: Math.min(70, currentProgress),
        stats
      });

      // Find more links to crawl - prioritize relevant pages
      const defaultRelevantPaths = [
        '/about', '/about-us', '/company', '/team', '/leadership',
        '/services', '/products', '/solutions', '/capabilities',
        '/industries', '/clients', '/case-studies', '/portfolio',
        '/contact', '/locations', '/careers', '/blog', '/news',
        '/mission', '/vision', '/values', '/approach', '/methodology'
      ];
      const pathsToUse = relevantPaths && relevantPaths.length > 0 ? relevantPaths : defaultRelevantPaths;

      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
          let fullUrl = '';
          if (href.startsWith('/')) {
            fullUrl = `https://${domain}${href}`;
          } else if (href.startsWith('http') && href.includes(domain)) {
            fullUrl = href;
          }
          
          if (fullUrl && !visited.has(fullUrl) && queue.length < 20) {
            // Prioritize relevant pages
            const isRelevant = pathsToUse.some(path => fullUrl.includes(path));
            if (isRelevant) {
              queue.unshift(fullUrl); // Add to front of queue
            } else {
              queue.push(fullUrl); // Add to back of queue
            }
          }
        }
      });

      // Small delay to be respectful to the server
      await delay(300);

    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error);
      await delay(200);
    }
  }

  onProgress?.({
    phase: 'content',
    step: 'Processing metadata...',
    progress: 75,
    stats
  });

  return { contentBlocks, urls: discoveredUrls };
}

export async function crawlAndExtractWithGemini(
  domains: string[] | string,
  onProgress?: ProgressCallback,
  customPaths?: string[],
  priorityUrls?: string[]
): Promise<GeminiExtractionResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  try {
    // Support both string and array for backward compatibility
    const domainList: string[] = Array.isArray(domains) ? domains : [domains];
    let allContentBlocks: string[] = [];
    let allUrls: string[] = [];
    let totalPages = 0;
    let totalBlocks = 0;

    for (let i = 0; i < domainList.length; i++) {
      const domain = domainList[i];
      onProgress?.({
        phase: 'discovery',
        step: `Crawling domain ${domain}${priorityUrls && priorityUrls.length > 0 ? ` (with ${priorityUrls.length} priority URLs)` : ''} (${i + 1}/${domainList.length})...`,
        progress: Math.round((i / domainList.length) * 15),
        stats: { pagesScanned: totalPages, contentBlocks: totalBlocks, keyEntities: 0, confidenceScore: 0 }
      });
      
      // If priorityUrls are provided, crawl them first, then the rest of the domain
      const maxPages = priorityUrls && priorityUrls.length > 0 ? 8 : 8; // Allow full domain crawl
      const { contentBlocks, urls } = await crawlWebsiteWithProgress(domain, maxPages, onProgress, customPaths, priorityUrls);
      allContentBlocks = allContentBlocks.concat(contentBlocks);
      allUrls = allUrls.concat(urls);
      totalPages += urls.length;
      totalBlocks += contentBlocks.length;
    }

    if (allContentBlocks.length === 0) {
      throw new Error('No content found on the specified subdomains');
    }

    // Phase 3: AI Processing
    let stats = { 
      pagesScanned: totalPages, 
      contentBlocks: allContentBlocks.length, 
      keyEntities: 0, 
      confidenceScore: 0 
    };

    onProgress?.({
      phase: 'ai_processing',
      step: 'Running AI analysis...',
      progress: 80,
      stats
    });

    // Prepare content for analysis
    const siteContent = allContentBlocks
      .filter(block => block.length > 20)
      .slice(0, 150)
      .join('\n\n')
      .slice(0, 30000);

    const customPathsNote = customPaths && customPaths.length > 0
      ? `The following custom relevant paths were prioritized during crawling: ${customPaths.join(", ")}
`
      : '';
    const enhancedPrompt = `
${customPathsNote}You are a senior brand analyst and SEO expert with 15+ years of experience analyzing websites for Fortune 500 companies. Your task is to provide a comprehensive, professional analysis of the following subdomains: ${domainList.join(", ")} based on the provided website content.

Analyze the following content thoroughly:
---
${siteContent}
---

Your response MUST be a single, valid JSON object with this EXACT structure and data types:
{
  "pagesScanned": number,
  "contentBlocks": number,
  "keyEntities": {
    "products": string[],
    "services": string[],
    "technologies": string[],
    "brands": string[],
    "people": string[],
    "locations": string[]
  },
  "confidenceScore": number,
  "extractedContext": string,
  "seoAnalysis": {
    "focusKeywords": string[],
    "titleTag": string,
    "metaDescription": string
  }
}

ANALYSIS REQUIREMENTS:

1. "pagesScanned": Use the provided value: ${totalPages}.
2. "contentBlocks": Use the provided value: ${allContentBlocks.length}.
3. "keyEntities": Extract ALL unique, specific entities mentioned:
   - "products": Specific product names, software, tools, platforms
   - "services": Specific services offered, consulting areas, solutions
   - "technologies": Programming languages, frameworks, platforms, tech stack
   - "brands": Company names, partner brands, competitors mentioned
   - "people": Names of executives, team members, key personnel
   - "locations": Cities, countries, office locations, service areas
4. "confidenceScore": Integer 0-100 based on:
   - Content quality and comprehensiveness (30%)
   - Information clarity and specificity (25%)
   - Brand positioning clarity (25%)
   - Technical information completeness (20%)
   Use realistic scores: 75-95 for good content, 60-74 for moderate, below 60 for poor
5. "extractedContext": Write a 4-6 sentence professional summary that includes:
   - Company's primary business focus and industry
   - Key products/services and target market
   - Unique value proposition and competitive advantages
   - Company size/scale indicators (if mentioned)
   - Geographic scope and market positioning
   Use professional business language and be specific
6. "seoAnalysis":
   - "focusKeywords": 3-5 primary SEO keywords the site appears to target (be realistic)
   - "titleTag": Extract the main page title or create a professional one
   - "metaDescription": Extract the main meta description or create a compelling one

QUALITY STANDARDS:
- Be specific and accurate - avoid generic descriptions
- Use industry-standard terminology
- Provide realistic, actionable insights
- Focus on business value and market positioning
- Include technical details when relevant
- Maintain professional tone throughout

Your entire response must be ONLY the raw JSON object. Do not wrap it in \`\`\`json ... \`\`\`.`;

    onProgress?.({
      phase: 'ai_processing',
      step: 'Extracting brand context...',
      progress: 85,
      stats
    });

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: enhancedPrompt }] }],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.8,
          maxOutputTokens: 1500,
        }
      },
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );

    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    onProgress?.({
      phase: 'ai_processing',
      step: 'Generating insights...',
      progress: 90,
      stats
    });

    // Clean and parse response
    text = text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract valid JSON from API response. No JSON object found.');
    }
    text = jsonMatch[0];

    let result;
    try {
      result = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response JSON:', text);
      throw new Error('Could not parse valid JSON from API response.');
    }

    // Phase 4: Validation - Calculate real stats from AI analysis
    // Sum of all entities found from AI analysis
    const totalEntities = Object.values(result.keyEntities || {}).reduce((sum: number, arr: unknown) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
    stats.keyEntities = totalEntities;
    stats.confidenceScore = result.confidenceScore || 0;

    onProgress?.({
      phase: 'validation',
      step: 'Validating results...',
      progress: 95,
      stats
    });

    onProgress?.({
      phase: 'validation',
      step: 'Quality assurance checks...',
      progress: 98,
      stats
    });

    onProgress?.({
      phase: 'validation',
      step: 'Finalizing analysis...',
      progress: 100,
      stats
    });

    // Validate and normalize the result using real AI-generated data
    const finalResult: GeminiExtractionResult = {
      pagesScanned: totalPages,
      contentBlocks: allContentBlocks.length,
      keyEntities: totalEntities,
      confidenceScore: result.confidenceScore || 75,
      extractedContext: result.extractedContext || 
        `${domainList.join(', ')} is a business website offering various services and solutions. The site contains information about their offerings and approach to serving their target market.`
    };

    return finalResult;

  } catch (error: unknown) {
    console.error('Gemini extraction error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw new Error('Analysis timed out. The website may be slow to respond.');
      }
      if (error.message.includes('API key') || error.message.includes('401')) {
        throw new Error('API authentication failed. Please check configuration.');
      }
      if (error.message.includes('403')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      throw new Error(`Analysis failed: ${error.message}`);
    }
    
    throw new Error('Unknown error occurred during analysis');
  }
}

export async function generatePhrases(keyword: string, domain?: string, context?: string): Promise<string[]> {
  let prompt;
  if (domain && context) {
    prompt = `You are an expert SEO analyst with 15+ years of experience using Ahrefs, SEMrush, and Google Keyword Planner.\n\nYour task is to generate 5 highly realistic, high-value search phrases that real users would type into Google to TEST THE SEO VISIBILITY and PRESENCE of the domain: "${domain}" for the keyword: "${keyword}".\n\n- Each phrase should be a real-world search query that would specifically reveal if THIS domain is ranking for that intent, not just any domain.\n- These phrases are for an SEO tool to check if the domain is present and visible for important, competitive, and intent-diverse queries.\n- Tailor the phrases to the domain's business, offerings, and context: "${context}".\n- Include a mix of commercial, informational, transactional, and comparison queries.\n- Phrases should be natural, specific, and reflect actual user search behavior.\n- Do NOT simply repeat or slightly reword the keyword.\n- Do NOT include generic, irrelevant, or zero-volume phrases.\n- Output ONLY a JSON array of 5 strings, no markdown, no comments, no extra text.\n\nExample for keyword "project management software":\n[\n  "best project management software for small business",\n  "project management tools for remote teams",\n  "asana vs trello vs monday.com",\n  "how to choose project management software",\n  "project management software pricing comparison"\n]\n\nNow generate 5 realistic, valuable search phrases for: "${keyword}" to test the SEO presence and visibility of ${domain}.`;
  } else {
    prompt = `You are an expert SEO analyst. Generate 5 highly realistic search phrases that would be used to TEST THE SEO PRESENCE and VISIBILITY of a website for the keyword: "${keyword}".\n- Each phrase should be a real-world search query that would specifically reveal if THIS site is ranking for that intent, not just any site.\n- These phrases are for an SEO tool to check if the domain is present and visible for important, competitive, and intent-diverse queries.\n- Include a mix of commercial, informational, transactional, and comparison queries.\n- Output ONLY a JSON array of 5 strings, no markdown, no comments, no extra text.`;
  }

  const response = await axios.post(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.9,
        maxOutputTokens: 400,
      }
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000
    }
  );

  let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini API');
  text = text.trim();
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Could not extract JSON array from Gemini response.');
  try {
    const arr = JSON.parse(jsonMatch[0]);
    if (Array.isArray(arr) && arr.length === 5 && arr.every(x => typeof x === 'string')) return arr;
    throw new Error('Gemini did not return a valid array of 5 strings.');
  } catch (e) {
    throw new Error('Failed to parse Gemini response as JSON array.');
  }
}

// Enhanced API service with real-time progress
export class EnhancedApiService {
  async submitDomainWithProgress(
    domain: string,
    onProgress: ProgressCallback
  ): Promise<GeminiExtractionResult> {
    return await crawlAndExtractWithGemini(domain, onProgress);
  }

  async getDomain(domainId: number) {
    // This would typically fetch from your database
    // For now, return null to indicate no existing data
    return { extraction: null };
  }
}

export const enhancedApiService = new EnhancedApiService();

export const geminiService = {
  generatePhrases,
  // ...other exports
};

// Generate relevant keywords for a domain using Gemini
export async function generateKeywordsForDomain(domain: string, context: string): Promise<Array<{ term: string, volume: number, difficulty: string, cpc: number }>> {
  const prompt = `
You are an Ahrefs keyword research expert. Generate keywords exactly like Ahrefs would show for a domain analysis.

DOMAIN: ${domain}
BUSINESS CONTEXT: ${context}

Generate 40-50 keywords that represent how people actually search for this domain, including:

1. DOMAIN VARIATIONS (20-30%):
   - Exact domain: "${domain}"
   - Common variations: "www.${domain}", "old.${domain}", "${domain}.com" etc.

2. DOMAIN + SUBDIRECTORIES (25-35%):
   - Main sections: "${domain}/login", "${domain}/about", "${domain}/contact"
   - Service pages: "${domain}/services", "${domain}/products"
   - Category pages based on business context

3. BRANDED SEARCHES (25-35%):
   - "${domain} login"
   - "${domain} reviews"
   - "${domain} pricing"
   - "${domain} [relevant category]" (based on business context)

4. NAVIGATIONAL QUERIES (10-20%):
   - Related to the business type from context
   - How users would search to find this specific domain

VOLUME DISTRIBUTION:
- 1-3 keywords: >10,000 volume
- 5-8 keywords: 1,000-10,000 volume  
- 15-20 keywords: 100-1,000 volume
- 15-25 keywords: <100 volume

DIFFICULTY PATTERNS:
- Domain name itself: "Hard"
- Brand variations: "Hard" 
- Specific pages/subdirectories: "Medium" to "Hard"
- Long-tail branded: "Easy" to "Medium"
- Some entries can be "N/A"

CPC RANGE: $0.00-$15.00 (most branded searches have low CPC)

CRITICAL: 
- Keywords should look like real Ahrefs data for domain analysis
- Focus on how people search FOR this specific domain
- Include realistic subdirectory paths based on business context
- Match the exact format from your Ahrefs example

Return ONLY a JSON array sorted by volume (highest first):

[
  {"term": "${domain}", "volume": 15000, "difficulty": "Hard", "cpc": 0.50},
  {"term": "${domain}/login", "volume": 800, "difficulty": "Hard", "cpc": 0.20}
]
`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3, // Lower for more consistent branded terms
          topK: 32,
          topP: 0.8,
          maxOutputTokens: 3000,
        }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 40000
      }
    );

    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini API');
    
    // Clean the response
    text = text.trim();
    
    // Extract JSON array more robustly
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.warn('Could not extract JSON array, trying to clean response...');
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const cleanMatch = text.match(/\[[\s\S]*\]/);
      if (!cleanMatch) throw new Error('Could not extract JSON array from response.');
      text = cleanMatch[0];
    } else {
      text = jsonMatch[0];
    }
    
    const keywords = JSON.parse(text);
    
    // Validate structure
    if (!Array.isArray(keywords)) {
      throw new Error('Response is not an array');
    }
    
    // Validate each keyword object
    const validKeywords = keywords.filter(keyword => {
      return keyword && 
             typeof keyword.term === 'string' && 
             typeof keyword.volume === 'number' && 
             typeof keyword.difficulty === 'string' && 
             typeof keyword.cpc === 'number';
    });
    
    if (validKeywords.length === 0) {
      throw new Error('No valid keywords found in response');
    }
    
    // Sort by volume descending
    return validKeywords.sort((a, b) => b.volume - a.volume);
    
  } catch (error) {
    console.error('Keyword generation failed:', error);
    
    // Enhanced domain-specific fallback
    const fallbackKeywords = generateDomainFallbackKeywords(domain, context);
    return fallbackKeywords.sort((a, b) => b.volume - a.volume);
  }
}

// Helper function for domain-specific fallbacks
function generateDomainFallbackKeywords(domain: string, context: string): Array<{ term: string, volume: number, difficulty: string, cpc: number }> {
  const baseDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
  
  return [
    // High volume domain searches
    { term: baseDomain, volume: 12000, difficulty: 'Hard', cpc: 0.80 },
    { term: `www.${baseDomain}`, volume: 3200, difficulty: 'Hard', cpc: 0.60 },
    
    // Login and account related
    { term: `${baseDomain} login`, volume: 2800, difficulty: 'Hard', cpc: 0.40 },
    { term: `${baseDomain}/login`, volume: 1500, difficulty: 'Hard', cpc: 0.30 },
    
    // Common pages
    { term: `${baseDomain}/contact`, volume: 800, difficulty: 'Medium', cpc: 1.20 },
    { term: `${baseDomain}/about`, volume: 600, difficulty: 'Medium', cpc: 0.90 },
    { term: `${baseDomain}/pricing`, volume: 950, difficulty: 'Medium', cpc: 2.50 },
    
    // Branded searches
    { term: `${baseDomain} reviews`, volume: 1200, difficulty: 'Medium', cpc: 1.80 },
    { term: `${baseDomain} app`, volume: 750, difficulty: 'Medium', cpc: 1.10 },
    { term: `${baseDomain} support`, volume: 450, difficulty: 'Medium', cpc: 0.70 },
    
    // Lower volume variations
    { term: `old.${baseDomain}`, volume: 150, difficulty: 'Hard', cpc: 0.20 },
    { term: `${baseDomain}]`, volume: 120, difficulty: 'Hard', cpc: 0.10 },
    { term: `${baseDomain}/dashboard`, volume: 280, difficulty: 'Medium', cpc: 0.90 },
    { term: `${baseDomain} api`, volume: 320, difficulty: 'Medium', cpc: 1.40 },
    
    // Very low volume
    { term: `${baseDomain}/help`, volume: 90, difficulty: 'Easy', cpc: 0.50 },
    { term: `${baseDomain} mobile`, volume: 80, difficulty: 'Easy', cpc: 0.60 },
    { term: `${baseDomain}/terms`, volume: 60, difficulty: 'Easy', cpc: 0.30 },
    { term: `${baseDomain} down`, volume: 70, difficulty: 'Easy', cpc: 0.20 },
    { term: `${baseDomain}/privacy`, volume: 50, difficulty: 'Easy', cpc: 0.25 },
    { term: `${baseDomain} alternative`, volume: 180, difficulty: 'Medium', cpc: 2.10 }
  ];
}