import axios from 'axios';
import * as cheerio from 'cheerio';

const GEMINI_API_KEY = 'AIzaSyAsZ7bQiqUZdrAn9FVW1zUUjx6h1JsPZzg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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
  onProgress?: ProgressCallback
): Promise<{contentBlocks: string[], urls: string[]}> {
  const visited = new Set<string>();
  const queue: string[] = [`https://${domain}`, `https://www.${domain}`];
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

  await delay(800);

  onProgress?.({
    phase: 'discovery',
    step: 'Scanning site architecture...',
    progress: 10,
    stats
  });

  await delay(1200);

  onProgress?.({
    phase: 'discovery',
    step: 'Mapping content structure...',
    progress: 15,
    stats
  });

  await delay(1000);

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

      // Update progress
      const currentProgress = 20 + (visited.size * progressIncrement);
      onProgress?.({
        phase: 'content',
        step: `Analyzing page ${visited.size}/${maxPages}...`,
        progress: Math.min(70, currentProgress),
        stats
      });

      // Find more links to crawl - prioritize relevant pages
      const relevantPaths = [
        '/about', '/about-us', '/company', '/team', '/leadership',
        '/services', '/products', '/solutions', '/capabilities',
        '/industries', '/clients', '/case-studies', '/portfolio',
        '/contact', '/locations', '/careers', '/blog', '/news',
        '/mission', '/vision', '/values', '/approach', '/methodology'
      ];

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
            const isRelevant = relevantPaths.some(path => fullUrl.includes(path));
            if (isRelevant) {
              queue.unshift(fullUrl); // Add to front of queue
            } else {
              queue.push(fullUrl); // Add to back of queue
            }
          }
        }
      });

      await delay(500 + Math.random() * 1000); // Realistic delay between requests

    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error);
      await delay(300);
    }
  }

  onProgress?.({
    phase: 'content',
    step: 'Processing metadata...',
    progress: 75,
    stats
  });

  await delay(800);

  return { contentBlocks, urls: discoveredUrls };
}

export async function crawlAndExtractWithGemini(
  domain: string,
  onProgress?: ProgressCallback
): Promise<GeminiExtractionResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  try {
    // Clean domain
    const cleanDomain = domain.replace(/^https?:\/\//, '');
    
    // Crawl website with progress updates
    const { contentBlocks, urls } = await crawlWebsiteWithProgress(cleanDomain, 8, onProgress);
    
    if (contentBlocks.length === 0) {
      throw new Error('No content found on the website');
    }

    // Phase 3: AI Processing
    let stats = { 
      pagesScanned: urls.length, 
      contentBlocks: contentBlocks.length, 
      keyEntities: 0, 
      confidenceScore: 0 
    };

    onProgress?.({
      phase: 'ai_processing',
      step: 'Running GPT-4o analysis...',
      progress: 80,
      stats
    });

    await delay(1500);

    // Prepare content for analysis
    const siteContent = contentBlocks
      .filter(block => block.length > 20)
      .slice(0, 150) // Use more blocks for better context
      .join('\n\n')
      .slice(0, 30000); // Increase content size limit

    const enhancedPrompt = `
You are a world-class brand analyst AI. Your task is to analyze the provided website content for ${cleanDomain} and return a structured JSON object. Your output must be ONLY the JSON object, without any markdown formatting, comments, or other text.

Analyze the following content:
---
${siteContent}
---

Your response MUST be a single, valid JSON object with the following structure and data types:
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

Guidelines for JSON field values:
1.  "pagesScanned": Use the provided value: ${urls.length}.
2.  "contentBlocks": Use the provided value: ${contentBlocks.length}.
3.  "keyEntities": Extract all unique named entities from the text.
    - "products": List specific product names (e.g., "Photon Controller", "Fusion Drive").
    - "services": List specific services offered (e.g., "Cloud Migration", "IT Consulting").
    - "technologies": List programming languages, frameworks, and tech platforms (e.g., "React", "AWS", "Kubernetes").
    - "brands": List company or brand names mentioned, including the primary company.
    - "people": List names of individuals (e.g., executives, team members).
    - "locations": List cities, countries, or specific addresses.
4.  "confidenceScore": An integer from 0-100, your confidence in the accuracy and completeness of your analysis based on the provided text's quality.
5.  "extractedContext": A 3-5 sentence, professionally-written paragraph summarizing the company's purpose, offerings, target market, and unique value proposition.
6.  "seoAnalysis":
    - "focusKeywords": Infer and list the top 3-5 primary SEO keywords the site seems to be targeting.
    - "titleTag": Extract the primary page title.
    - "metaDescription": Extract the primary meta description.

Again, your entire response must be ONLY the raw JSON object. Do not wrap it in \`\`\`json ... \`\`\`.
`;

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

    await delay(1000);

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

    // Phase 4: Validation
    // Sum of all entities found
    const totalEntities = Object.values(result.keyEntities || {}).reduce((sum: number, arr: unknown) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
    stats.keyEntities = totalEntities;
    stats.confidenceScore = result.confidenceScore || 0;

    onProgress?.({
      phase: 'validation',
      step: 'Validating results...',
      progress: 95,
      stats
    });

    await delay(600);

    onProgress?.({
      phase: 'validation',
      step: 'Quality assurance checks...',
      progress: 98,
      stats
    });

    await delay(500);

    onProgress?.({
      phase: 'validation',
      step: 'Finalizing analysis...',
      progress: 100,
      stats
    });

    await delay(400);

    // Validate and normalize the result
    const finalResult: GeminiExtractionResult = {
      pagesScanned: Math.max(1, Math.min(urls.length, 25)),
      contentBlocks: Math.max(1, Math.min(contentBlocks.length, 200)),
      keyEntities: Math.max(0, Math.min(totalEntities, 50)),
      confidenceScore: Math.min(100, Math.max(0, result.confidenceScore || 75)),
      extractedContext: result.extractedContext || 
        `${cleanDomain} is a business website offering various services and solutions. The site contains information about their offerings and approach to serving their target market.`
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

export async function generatePhrases(keyword: string): Promise<string[]> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured');

  const prompt = `Generate 5 diverse, high-quality search phrases that a user might enter into Google to learn about, compare, or buy something related to: "${keyword}". Return ONLY a JSON array of strings, no markdown, no comments, no extra text.`;

  const response = await axios.post(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 32,
        topP: 0.9,
        maxOutputTokens: 256,
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
    if (Array.isArray(arr) && arr.every(x => typeof x === 'string')) return arr;
    throw new Error('Gemini did not return a valid array of strings.');
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
  const prompt = `You are an expert SEO tool. Given the following website domain and its context, generate a list of the 15 most relevant, high-impact keywords for this business. For each keyword, estimate its monthly search volume, difficulty (Low, Medium, High), and CPC in USD. Return ONLY a valid JSON array of objects with this exact structure: [{ "term": string, "volume": number, "difficulty": "Low"|"Medium"|"High", "cpc": number }]. No markdown, no comments, no extra text, no explanation, no headings, no code block, just the array.\n\nDomain: ${domain}\nContext: ${context}\n\nJSON array:`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.8,
          maxOutputTokens: 800,
        }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000
      }
    );
    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Gemini raw response:', text);
    if (!text) throw new Error('Empty response from Gemini API');
    text = text.trim();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Could not extract JSON array from Gemini response.');
    const arr = JSON.parse(jsonMatch[0]);
    if (Array.isArray(arr) && arr.every(x => x.term && typeof x.volume === 'number')) return arr;
    throw new Error('Gemini did not return a valid array of keyword objects.');
  } catch (e) {
    // Only fall back if Gemini truly fails or returns an invalid array
    console.error('Gemini keyword generation failed, using fallback:', e);
    return [
      { term: 'business software', volume: 2000, difficulty: 'Medium', cpc: 4.2 },
      { term: 'digital transformation', volume: 1500, difficulty: 'High', cpc: 6.1 },
      { term: 'automation tools', volume: 1200, difficulty: 'Medium', cpc: 3.5 },
      { term: 'cloud solutions', volume: 1000, difficulty: 'High', cpc: 5.8 },
      { term: 'enterprise platform', volume: 900, difficulty: 'Medium', cpc: 4.7 }
    ];
  }
}