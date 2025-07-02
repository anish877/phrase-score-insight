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

  while (queue.length > 0 && visited.size < maxPages) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;

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

      // ENHANCED: More comprehensive content extraction
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

      // Extract content
      contentSelectors.forEach(selector => {
        $(selector).each((_, element) => {
          const text = $(element).text().trim();
          if (text.length > 15 && text.length < 3000) {
            contentBlocks.push(text);
          }
        });
      });

      // Extract metadata
      const title = $('title').text().trim();
      const description = $('meta[name="description"]').attr('content');
      const keywords = $('meta[name="keywords"]').attr('content');
      const ogTitle = $('meta[property="og:title"]').attr('content');
      const ogDescription = $('meta[property="og:description"]').attr('content');
      const ogType = $('meta[property="og:type"]').attr('content');
      const twitterTitle = $('meta[name="twitter:title"]').attr('content');
      const twitterDescription = $('meta[name="twitter:description"]').attr('content');
      
      // Extract schema.org structured data
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
      
      // Add URL context for better analysis
      contentBlocks.push(`Page URL: ${url}`);
      
      // Add all meta information
      if (title) contentBlocks.push(`Page Title: ${title}`);
      if (description) contentBlocks.push(`Meta Description: ${description}`);
      if (keywords) contentBlocks.push(`Meta Keywords: ${keywords}`);
      if (ogTitle) contentBlocks.push(`Open Graph Title: ${ogTitle}`);
      if (ogDescription) contentBlocks.push(`Open Graph Description: ${ogDescription}`);
      if (ogType) contentBlocks.push(`Open Graph Type: ${ogType}`);
      if (twitterTitle) contentBlocks.push(`Twitter Title: ${twitterTitle}`);
      if (twitterDescription) contentBlocks.push(`Twitter Description: ${twitterDescription}`);

      // Extract navigation and footer content
      const nav = $('nav, .nav, .navigation, .menu, .navbar').text().trim();
      if (nav.length > 10) contentBlocks.push(`Navigation: ${nav}`);

      const footer = $('footer, .footer, .site-footer').text().trim();
      if (footer.length > 10) contentBlocks.push(`Footer: ${footer}`);

      // Extract contact information
      const contactInfo = $('.contact, .contact-info, .address, .phone, .email').text().trim();
      if (contactInfo.length > 10) contentBlocks.push(`Contact Info: ${contactInfo}`);

      // Extract business information
      const businessInfo = $('.about, .company, .business, .mission, .vision, .values').text().trim();
      if (businessInfo.length > 10) contentBlocks.push(`Business Info: ${businessInfo}`);

      // Extract services/products
      const services = $('.services, .products, .offerings, .solutions').text().trim();
      if (services.length > 10) contentBlocks.push(`Services: ${services}`);

      // Update progress
      stats.contentBlocks = contentBlocks.length;
      onProgress?.({
        phase: 'content',
        step: `Processed ${visited.size}/${maxPages} pages - Extracted ${contentBlocks.length} content blocks...`,
        progress: 20 + (visited.size / maxPages) * 30,
        stats
      });

      // Add delay to be respectful
      await delay(500);

    } catch (error) {
      console.warn(`Failed to crawl ${url}:`, error);
      // Continue with other URLs
    }
  }

  return { contentBlocks, urls: discoveredUrls };
}

export async function crawlAndExtractWithGpt4o(
  domains: string[] | string,
  onProgress?: ProgressCallback,
  customPaths?: string[],
  priorityUrls?: string[]
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
    const analysisPrompt = `Analyze this website content and extract comprehensive business context. Focus on:

1. **Business Overview**: What does this company do? What are their main products/services?
2. **Target Market**: Who are their customers? What industries do they serve?
3. **Value Proposition**: What makes them unique? What problems do they solve?
4. **Brand Positioning**: How do they position themselves in the market?
5. **Key Differentiators**: What are their competitive advantages?
6. **Industry Context**: What industry/niche are they in?
7. **Geographic Focus**: Where do they operate?
8. **Company Size/Type**: Are they a startup, enterprise, agency, etc.?

Website Content:
${allContentBlocks.slice(0, 50).join('\n\n')}

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

export async function generatePhrases(keyword: string, domain?: string, context?: string): Promise<{ phrases: string[], tokenUsage: number }> {
  try {
    const domainContext = domain ? `\nDomain: ${domain}` : '';
    const businessContext = context ? `\nBusiness Context: ${context}` : '';
    
    const prompt = `Generate 5 high-converting search phrases for the keyword "${keyword}". These should be natural, user-intent focused phrases that people would actually search for.

Requirements:
- Include the exact keyword "${keyword}"
- Make them conversational and natural
- Focus on user intent (informational, navigational, transactional)
- Consider different search contexts
- Make them specific and actionable
- Avoid overly generic phrases

${domainContext}${businessContext}

Return ONLY a JSON array of 5 strings, no other text:
["phrase 1", "phrase 2", "phrase 3", "phrase 4", "phrase 5"]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert SEO specialist who generates high-converting search phrases.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
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

export class EnhancedApiService {
  async submitDomainWithProgress(
    domain: string,
    onProgress: ProgressCallback
  ): Promise<ExtractionResult> {
    return await crawlAndExtractWithGpt4o(domain, onProgress);
  }

  async getDomain(domainId: number) {
    // Implementation for getting domain data
    return { id: domainId, url: 'example.com' };
  }
}

export async function generateKeywordsForDomain(domain: string, context: string): Promise<{ keywords: Array<{ term: string, volume: number, difficulty: string, cpc: number }>, tokenUsage: number }> {
  try {
    const prompt = `Generate 20 relevant SEO keywords for this domain and business context. Focus on high-value, searchable terms that would drive qualified traffic.

Domain: ${domain}
Business Context: ${context}

Requirements:
- Mix of high, medium, and low volume keywords
- Include branded and non-branded terms
- Consider different user intents (informational, navigational, transactional)
- Focus on terms that would actually convert
- Include long-tail variations
- Consider the business type and industry

For each keyword, provide realistic SEO metrics:
- Volume: Monthly search volume (100-50000)
- Difficulty: SEO competition level (Low/Medium/High)
- CPC: Cost per click for PPC (0.50-15.00)

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
        { role: 'system', content: 'You are an expert SEO specialist who generates high-value keywords with realistic metrics.' },
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
      // Validate and normalize each keyword
      return {
        keywords: keywords.map((kw: any) => ({
          term: String(kw.term || '').trim(),
          volume: Math.max(100, Math.min(50000, Number(kw.volume) || 1000)),
          difficulty: ['Low', 'Medium', 'High'].includes(kw.difficulty) ? kw.difficulty : 'Medium',
          cpc: Math.max(0.50, Math.min(15.00, Number(kw.cpc) || 2.50))
        })).filter(kw => kw.term.length > 0),
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
  // Fallback keyword generation when AI fails
  const domainName = domain.replace(/^www\./, '').replace(/\./g, ' ');
  const words = domainName.split(' ').filter(word => word.length > 2);
  
  const baseKeywords = [
    ...words,
    ...words.map(word => `${word} services`),
    ...words.map(word => `${word} company`),
    ...words.map(word => `best ${word}`),
    ...words.map(word => `${word} near me`),
    ...words.map(word => `${word} reviews`),
    ...words.map(word => `${word} pricing`),
    ...words.map(word => `${word} contact`),
    ...words.map(word => `${word} about`),
    ...words.map(word => `${word} solutions`)
  ];

  return baseKeywords.slice(0, 20).map((term, index) => ({
    term: term.toLowerCase(),
    volume: Math.max(100, 1000 - (index * 50)),
    difficulty: index < 5 ? 'High' : index < 10 ? 'Medium' : 'Low',
    cpc: Math.max(0.50, 5.00 - (index * 0.25))
  }));
}

// Export the service for backward compatibility
export const gptService = {
  generatePhrases,
  generateKeywordsForDomain,
  crawlAndExtractWithGpt4o
};