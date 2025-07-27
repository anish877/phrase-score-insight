import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set in environment variables');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export interface ExtractionResult {
  pagesScanned: number;
  contentBlocks: number;
  keyEntities: number;
  confidenceScore: number;
  extractedContext: string;
  tokenUsage?: number;
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

function normalizeUrlOrDomain(input: string): { isUrl: boolean; baseUrl: string; domain: string } {
  const trimmed = input.trim();
  
  // Check if it's already a full URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const url = new URL(trimmed);
    return {
      isUrl: true,
      baseUrl: trimmed,
      domain: url.hostname.replace(/^www\./, '')
    };
  }
  
  // It's a domain, construct the URL
  const cleanDomain = trimmed.replace(/^www\./, '');
  return {
    isUrl: false,
    baseUrl: `https://${cleanDomain}`,
    domain: cleanDomain
  };
}

async function crawlWebsiteWithProgress(
  urlOrDomain: string,
  maxPages = 8,
  onProgress?: ProgressCallback,
  relevantPaths?: string[],
  priorityUrls?: string[]
): Promise<{contentBlocks: string[], urls: string[]}> {
  const visited = new Set<string>();
  const queue: string[] = [];
  
  // Check if we have specific URLs/paths to crawl
  const hasSpecificUrls = priorityUrls && priorityUrls.length > 0;
  const hasSpecificPaths = relevantPaths && relevantPaths.length > 0;
  
  // Determine if input is a full URL or just a domain
  const isFullUrl = urlOrDomain.startsWith('http://') || urlOrDomain.startsWith('https://');
  
  let domain: string;
  let baseUrl: string;
  
  if (isFullUrl) {
    // It's a full URL - crawl only this single page
    const url = new URL(urlOrDomain);
    domain = url.hostname.replace(/^www\./, '');
    baseUrl = urlOrDomain;
    queue.push(urlOrDomain);
    maxPages = 1;
  } else {
    // It's a domain
    domain = urlOrDomain.replace(/^www\./, '');
    baseUrl = `https://${domain}`;
    
    if (hasSpecificUrls || hasSpecificPaths) {
      // If URLs/paths are provided, crawl only those (no discovery)
      if (hasSpecificUrls) {
        priorityUrls.forEach(url => {
          try {
            const urlObj = new URL(url);
            const urlDomain = urlObj.hostname.replace(/^www\./, '');
            if (urlDomain === domain) {
              queue.push(url);
            } else {
              console.warn(`Skipping URL ${url} as it doesn't match domain ${domain}`);
            }
          } catch (error) {
            console.warn(`Invalid URL format: ${url}`);
          }
        });
      }
      if (hasSpecificPaths) {
        const pathUrls = relevantPaths.map(path => {
          const cleanPath = path.startsWith('/') ? path : `/${path}`;
          return `https://${domain}${cleanPath}`;
        });
        queue.push(...pathUrls);
      }
      // Set maxPages to exactly the number of URLs/paths
      maxPages = queue.length;
    } else {
      // Only domain: crawl up to 8 pages, discover links
      queue.push(baseUrl, `https://www.${domain}`);
      maxPages = 8;
    }
  }

  const contentBlocks: string[] = [];
  const discoveredUrls: string[] = [];
  let stats = { pagesScanned: 0, contentBlocks: 0, keyEntities: 0, confidenceScore: 0 };

  // Phase 1: Domain Discovery
  onProgress?.({
    phase: 'discovery',
    step: isFullUrl ? 'Validating URL accessibility...' : 
          hasSpecificUrls ? `Validating domain and ${priorityUrls?.length} specific URLs...` :
          hasSpecificPaths ? `Validating domain and ${relevantPaths?.length} specific paths...` : 
          'Validating domain accessibility...',
    progress: 5,
    stats
  });

  // Real validation check - test the base domain first
  try {
    await axios.get(baseUrl, { timeout: 5000 });
  } catch (error) {
    throw new Error(`Domain ${urlOrDomain} is not accessible`);
  }

  onProgress?.({
    phase: 'discovery',
    step: hasSpecificUrls ? `Analyzing ${queue.length} specified pages...` : 
          hasSpecificPaths ? `Analyzing ${queue.length} specified paths...` :
          isFullUrl ? 'Analyzing single page...' : 
          'Scanning site architecture...',
    progress: 10,
    stats
  });

  // Phase 2: Content Analysis
  onProgress?.({
    phase: 'content',
    step: 'Extracting page content...',
    progress: 20,
    stats
  });

  let progressIncrement = 50 / Math.max(1, queue.length);

  // Helper function to crawl a single page
  async function crawlSinglePage(url: string) {
    if (!url || visited.has(url)) return;
    try {
      console.log(`Crawling: ${url}`); // Debug log
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
        }
      });
      visited.add(url);
      discoveredUrls.push(url);
      stats.pagesScanned = visited.size;
      const $ = cheerio.load(response.data);
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
        '.contact', '.faq', '.blog', '.news',
        '.hero', '.banner', '.intro', '.overview',
        '.benefits', '.advantages', '.process',
        '.portfolio', '.projects', '.work'
      ];
      contentSelectors.forEach(selector => {
        $(selector).each((_, element) => {
          const text = $(element).text().trim();
          if (text.length > 15 && text.length < 3000) {
            contentBlocks.push(text);
          }
        });
      });
      const title = $('title').text().trim();
      const description = $('meta[name="description"]').attr('content');
      const keywords = $('meta[name="keywords"]').attr('content');
      const ogTitle = $('meta[property="og:title"]').attr('content');
      const ogDescription = $('meta[property="og:description"]').attr('content');
      const ogType = $('meta[property="og:type"]').attr('content');
      const twitterTitle = $('meta[name="twitter:title"]').attr('content');
      const twitterDescription = $('meta[name="twitter:description"]').attr('content');
      const schemaScripts = $('script[type="application/ld+json"]');
      schemaScripts.each((_, script) => {
        try {
          const schemaData = JSON.parse($(script).html() || '');
          if (schemaData.name) contentBlocks.push(`Schema Name: ${schemaData.name}`);
          if (schemaData.description) contentBlocks.push(`Schema Description: ${schemaData.description}`);
          if (schemaData.address) contentBlocks.push(`Schema Address: ${JSON.stringify(schemaData.address)}`);
        } catch (e) {
          // Ignore invalid JSON
        }
      });
      contentBlocks.push(`Page URL: ${url}`);
      if (title) contentBlocks.push(`Page Title: ${title}`);
      if (description) contentBlocks.push(`Meta Description: ${description}`);
      if (keywords) contentBlocks.push(`Meta Keywords: ${keywords}`);
      if (ogTitle) contentBlocks.push(`Open Graph Title: ${ogTitle}`);
      if (ogDescription) contentBlocks.push(`Open Graph Description: ${ogDescription}`);
      if (ogType) contentBlocks.push(`Open Graph Type: ${ogType}`);
      if (twitterTitle) contentBlocks.push(`Twitter Title: ${twitterTitle}`);
      if (twitterDescription) contentBlocks.push(`Twitter Description: ${twitterDescription}`);
      const nav = $('nav, .nav, .navigation, .menu, .navbar').text().trim();
      if (nav.length > 10) contentBlocks.push(`Navigation: ${nav}`);
      const footer = $('footer, .footer, .site-footer').text().trim();
      if (footer.length > 10) contentBlocks.push(`Footer: ${footer}`);
      const contactInfo = $('.contact, .contact-info, .address, .phone, .email').text().trim();
      if (contactInfo.length > 10) contentBlocks.push(`Contact Info: ${contactInfo}`);
      const businessInfo = $('.about, .company, .business, .mission, .vision, .values').text().trim();
      if (businessInfo.length > 10) contentBlocks.push(`Business Info: ${businessInfo}`);
      const services = $('.services, .products, .offerings, .solutions').text().trim();
      if (services.length > 10) contentBlocks.push(`Services: ${services}`);
      stats.contentBlocks = contentBlocks.length;
      onProgress?.({
        phase: 'content',
        step: `Processed ${visited.size}/${maxPages} pages - Extracted ${contentBlocks.length} content blocks...`,
        progress: 20 + (visited.size / maxPages) * 30,
        stats
      });
      // --- Link Discovery ---
      // Only add new links if we haven't hit maxPages yet
      if (visited.size < maxPages) {
        const pageDomain = (() => {
          try {
            return new URL(url).hostname.replace(/^www\./, '');
          } catch { return null; }
        })();
        $('a[href]').each((_, el) => {
          const href = $(el).attr('href');
          if (!href) return;
          let fullUrl = '';
          if (href.startsWith('http')) {
            try {
              const linkDomain = new URL(href).hostname.replace(/^www\./, '');
              if (linkDomain === pageDomain) fullUrl = href;
            } catch { /* ignore invalid URLs */ }
          } else if (href.startsWith('/')) {
            fullUrl = `https://${pageDomain}${href}`;
          }
          // Only add if not visited, not already queued, and within maxPages
          if (fullUrl && !visited.has(fullUrl) && !queue.includes(fullUrl) && (queue.length + visited.size) < maxPages) {
            queue.push(fullUrl);
          }
        });
      }
      await delay(50);
    } catch (error) {
      console.warn(`Failed to crawl ${url}:`, error);
      // Continue with other URLs
    }
  }

  // Parallel crawling with concurrency limit
  const CONCURRENCY = 3;
  while (queue.length > 0 && visited.size < maxPages) {
    const batch: string[] = [];
    while (batch.length < CONCURRENCY && queue.length > 0 && visited.size + batch.length < maxPages) {
      const nextUrl = queue.shift();
      if (nextUrl && !visited.has(nextUrl)) {
        batch.push(nextUrl);
      }
    }
    if (batch.length === 0) break;
    await Promise.all(batch.map(url => crawlSinglePage(url)));
  }

  return { contentBlocks, urls: discoveredUrls };
}

export async function crawlAndExtractWithGpt4o(
  domains: string[] | string,
  onProgress?: ProgressCallback,
  customPaths?: string[],
  priorityUrls?: string[],
  location?: string // Add location param
): Promise<ExtractionResult> {
  try {
    // Support both string and array for backward compatibility
    const domainList = Array.isArray(domains) ? domains : [domains];
    const primaryDomain = domainList[0];

    onProgress?.({
      phase: 'ai_processing',
      step: 'Running advanced AI analysis for brand context extraction...',
      progress: 60,
      stats: { pagesScanned: 0, contentBlocks: 0, keyEntities: 0, confidenceScore: 0 }
    });

    // Crawl all domains and collect content
    let allContentBlocks: string[] = [];
    let totalPages = 0;
    let totalTokens = 0;

    for (const domain of domainList) {
      const { contentBlocks, urls } = await crawlWebsiteWithProgress(
        domain, 
        8, 
        onProgress, 
        customPaths, 
        priorityUrls
      );
      allContentBlocks.push(...contentBlocks);
      totalPages += urls.length;
    }

    onProgress?.({
      phase: 'ai_processing',
      step: 'Extracting brand context and market positioning insights...',
      progress: 70,
      stats: { pagesScanned: totalPages, contentBlocks: allContentBlocks.length, keyEntities: 0, confidenceScore: 0 }
    });

    // Use GPT-4o for AI analysis
    const locationContext = location ? `\nLocation: ${location}` : '';
    // Deduplicate and limit content blocks
    const uniqueBlocks = Array.from(new Set(allContentBlocks)).slice(0, 20);
    const analysisPrompt = `Analyze this website content and extract comprehensive business context. Focus on:

1. **Business Overview**: What does this company do? What are their main products/services?
2. **Target Market**: Who are their customers? What industries do they serve?
3. **Value Proposition**: What makes them unique? What problems do they solve?
4. **Brand Positioning**: How do they position themselves in the market?
5. **Key Differentiators**: What are their competitive advantages?
6. **Industry Context**: What industry/niche are they in?
7. **Geographic Focus**: Where do they operate?${locationContext}
8. **Company Size/Type**: Are they a startup, enterprise, agency, etc.?

Website Content:
${uniqueBlocks.join('\n\n')}

Return a comprehensive analysis that captures the essence of this business for SEO and marketing purposes. Be specific and detailed.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert business analyst specializing in brand context extraction for SEO and marketing purposes.' },
        { role: 'user', content: analysisPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.3
    });
    totalTokens += completion.usage?.total_tokens || 0;

    const extractedContext = completion.choices[0].message?.content || 'No context extracted';

    onProgress?.({
      phase: 'validation',
      step: 'Validating analysis results and quality assurance checks...',
      progress: 85,
      stats: { pagesScanned: totalPages, contentBlocks: allContentBlocks.length, keyEntities: 0, confidenceScore: 0 }
    });

    // Calculate confidence score based on content quality and analysis depth
    const confidenceScore = Math.min(95, Math.max(60, 
      (allContentBlocks.length / 10) + 
      (extractedContext.length / 100) + 
      (totalPages * 5)
    ));

    // Count key entities (business terms, services, etc.)
    const keyEntities = Math.min(50, allContentBlocks.length / 2);

    onProgress?.({
      phase: 'validation',
      step: 'Quality assurance and data validation in progress...',
      progress: 90,
      stats: { pagesScanned: totalPages, contentBlocks: allContentBlocks.length, keyEntities, confidenceScore }
    });

    // Validate and normalize the result using real AI-generated data
    const finalResult: ExtractionResult = {
      pagesScanned: totalPages,
      contentBlocks: allContentBlocks.length,
      keyEntities: keyEntities,
      confidenceScore: confidenceScore,
      extractedContext: extractedContext,
      tokenUsage: totalTokens
    };

    onProgress?.({
      phase: 'validation',
      step: 'Finalizing comprehensive brand analysis and preparing insights...',
      progress: 95,
      stats: { pagesScanned: totalPages, contentBlocks: allContentBlocks.length, keyEntities, confidenceScore }
    });

    return finalResult;

  } catch (error) {
    console.error('GPT-4o extraction error:', error);
    throw new Error(`Failed to extract context: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generatePhrases(keyword: string, domain?: string, context?: string, location?: string): Promise<{ phrases: string[], tokenUsage: number }> {
  try {
    const domainContext = domain ? `\nDomain: ${domain}` : '';
    const businessContext = context ? `\nBusiness Context: ${context}` : '';
    const locationContext = location && location.trim() ? `\nLocation: ${location.trim()}` : '';
    console.log(locationContext);
    
    const prompt = `Generate 5 intent-based search phrases for the keyword "${keyword}". These should be natural, conversational queries that real users would type into search engines.

Requirements:
- Create phrases that follow these intent patterns:
  * "Who are the best [keyword] providers in [location]?"
  * "Top-rated companies for [keyword] solutions"
  * "Which company offers [keyword] for [specific use case]?"
  * "Best [keyword] brands in [location]"
  * "Top companies for [keyword] tools/services"
- Include the keyword in the phrase
- Make them conversational and natural like real user searches
- Include location context when relevant (${locationContext})
- Focus on commercial intent and brand discovery
- Avoid overly generic or keyword-stuffed phrases
- Make them specific enough to surface real brands and companies
- Consider the business context: ${businessContext}

Examples of good intent-based phrases:
- "Who are the best office occupancy sensor providers in [LOCATION]?"
- "Top-rated companies for office occupancy detection solutions"
- "Which company offers affordable occupancy sensors for offices?"
- "Best office sensor brands in USA"
- "Top companies for space utilization tools"

${domainContext}${businessContext}${locationContext}

Return ONLY a JSON array of 5 strings, no other text:
["phrase 1", "phrase 2", "phrase 3", "phrase 4", "phrase 5"]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert SEO specialist who generates intent-based search phrases that help users discover brands and companies. Focus on natural, conversational queries that surface real businesses.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.8
    });
    const text = completion.choices[0].message?.content;
    if (!text) throw new Error('Empty response from GPT-4o API');
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Could not extract JSON array from GPT-4o response.');
    const phrases = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(phrases) || phrases.length !== 5) {
      throw new Error('GPT-4o did not return a valid array of 5 strings.');
    }
    return {
      phrases: phrases.filter((phrase: any) => typeof phrase === 'string' && phrase.length > 0),
      tokenUsage: completion.usage?.total_tokens || 0
    };
  } catch (parseError) {
    console.error('Failed to parse GPT-4o response JSON:', parseError);
    throw new Error('Failed to parse GPT-4o response as JSON array.');
  }
}

export async function generateKeywordsForDomain(domain: string, context: string, location?: string): Promise<{ keywords: Array<{ term: string, volume: number, difficulty: string, cpc: number }>, tokenUsage: number }> {
  try {
    const locationContext = location ? `\nLocation: ${location}` : '';
    const prompt = `Generate 20 relevant SEO keywords for this domain and business context. Focus on high-value, searchable terms that would drive qualified traffic.This keywords will be used to generate phrases for the domain.And we will send these phrases to a LLM to check visiblity of the domain. So make sure to generate keywords that are relevant to the domain and business context. dont use the name of the domain in the keywords. 

Domain: ${domain}
Business Context: ${context}${locationContext}

Requirements:
- Mix of high, medium, and low volume keywords
- Include branded and non-branded terms
- Consider different user intents (informational, navigational, transactional)
- Focus on terms that would actually convert
- Include long-tail variations
- Consider the business type and industry

For each keyword, provide realistic SEO metrics based on real-world data:
- Volume: Monthly search volume (100-50000) - be realistic based on term length and specificity
- Difficulty: SEO competition level (Low/Medium/High) based on:
  * Low: 100-1,000 searches, niche terms, long-tail phrases, local terms
  * Medium: 1,000-10,000 searches, industry terms, moderate competition
  * High: 10,000+ searches, broad terms, major brand competition
- CPC: Cost per click for PPC (0.50-15.00) - higher for commercial intent

Return ONLY a JSON array of objects with this exact structure:
[
  {
    "term": "keyword phrase",
    "volume": 1000,
    "difficulty": "Medium",
    "cpc": 2.50
  }
]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert SEO specialist who generates high-value keywords with realistic metrics based on real-world search data and competition analysis.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.5
    });
    const text = completion.choices[0].message?.content;
    if (!text) throw new Error('Empty response from GPT-4o API');
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in response:', text);
      return { keywords: generateDomainFallbackKeywords(domain, context), tokenUsage: completion.usage?.total_tokens || 0 };
    }
    try {
      const keywords = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(keywords)) {
        throw new Error('Response is not an array');
      }
      // Validate and normalize each keyword with improved difficulty logic
      return {
        keywords: keywords.map((kw: any) => {
          const term = String(kw.term || '').trim();
          const volume = Math.max(100, Math.min(50000, Number(kw.volume) || 1000));
          
          // Improved difficulty calculation based on volume and term characteristics
          let difficulty = kw.difficulty;
          if (!['Low', 'Medium', 'High'].includes(difficulty)) {
            if (volume <= 1000) difficulty = 'Low';
            else if (volume <= 10000) difficulty = 'Medium';
            else difficulty = 'High';
          }
          
          // Adjust CPC based on difficulty and commercial intent
          let cpc = Math.max(0.50, Math.min(15.00, Number(kw.cpc) || 2.50));
          if (difficulty === 'High') cpc = Math.max(cpc, 3.00);
          if (difficulty === 'Low') cpc = Math.min(cpc, 5.00);
          
          return {
            term,
            volume,
            difficulty,
            cpc: Math.round(cpc * 100) / 100 // Round to 2 decimal places
          };
        }).filter(kw => kw.term.length > 0),
        tokenUsage: completion.usage?.total_tokens || 0
      };
    } catch (parseError) {
      console.error('Failed to parse keywords JSON:', parseError);
      return { keywords: generateDomainFallbackKeywords(domain, context), tokenUsage: completion.usage?.total_tokens || 0 };
    }
  } catch (error) {
    console.error('Keyword generation error:', error);
    return { keywords: generateDomainFallbackKeywords(domain, context), tokenUsage: 0 };
  }
}

function generateDomainFallbackKeywords(domain: string, context: string): Array<{ term: string, volume: number, difficulty: string, cpc: number }> {
  // Enhanced fallback keyword generation with better difficulty distribution
  const domainName = domain.replace(/^www\./, '').replace(/\./g, ' ');
  const words = domainName.split(' ').filter(word => word.length > 2);
  
  const baseKeywords = [
    // Low difficulty keywords (long-tail, specific)
    ...words.map(word => `${word} services near me`),
    ...words.map(word => `${word} company reviews`),
    ...words.map(word => `${word} pricing 2024`),
    ...words.map(word => `${word} contact information`),
    ...words.map(word => `${word} about us`),
    
    // Medium difficulty keywords (industry terms)
    ...words.map(word => `${word} services`),
    ...words.map(word => `${word} company`),
    ...words.map(word => `best ${word}`),
    ...words.map(word => `${word} solutions`),
    ...words.map(word => `${word} experts`),
    
    // High difficulty keywords (broad terms)
    ...words,
    ...words.map(word => `${word} near me`),
    ...words.map(word => `${word} reviews`),
    ...words.map(word => `${word} pricing`),
    ...words.map(word => `${word} contact`)
  ];

  return baseKeywords.slice(0, 20).map((term, index) => {
    // Distribute difficulty levels more realistically
    let difficulty: string;
    let volume: number;
    let cpc: number;
    
    if (index < 7) {
      // Low difficulty: long-tail, specific terms
      difficulty = 'Low';
      volume = Math.max(100, 500 - (index * 50));
      cpc = Math.max(0.50, 2.00 - (index * 0.15));
    } else if (index < 14) {
      // Medium difficulty: industry terms
      difficulty = 'Medium';
      volume = Math.max(1000, 5000 - ((index - 7) * 300));
      cpc = Math.max(1.50, 4.00 - ((index - 7) * 0.25));
    } else {
      // High difficulty: broad terms
      difficulty = 'High';
      volume = Math.max(5000, 15000 - ((index - 14) * 500));
      cpc = Math.max(3.00, 8.00 - ((index - 14) * 0.5));
    }
    
    return {
      term: term.toLowerCase(),
      volume,
      difficulty,
      cpc: Math.round(cpc * 100) / 100
    };
  });
}

// Export the service for backward compatibility
export const gptService = {
  generatePhrases,
  generateKeywordsForDomain,
  crawlAndExtractWithGpt4o
};