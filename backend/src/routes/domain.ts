import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { crawlAndExtractWithGpt4o, ProgressCallback } from '../services/geminiService';

const router = Router();
const prisma = new PrismaClient();

// Add asyncHandler utility at the top if not present
function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// GET /domain/check/:url - Check if domain exists and return version info
router.get('/check/:url', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { url } = req.params;
    
    // Try multiple URL formats to find the domain
    const possibleUrls = [
      url, // Original URL as provided
      url.startsWith('http') ? url : `https://${url}`, // With https://
      url.startsWith('http') ? url : `http://${url}`, // With http://
      url.replace(/^https?:\/\//, '') // Without protocol
    ];
    
    let domain: any = null;
    
    // Try to find the domain with any of the possible URL formats
    for (const possibleUrl of possibleUrls) {
      domain = await prisma.domain.findUnique({
        where: { url: possibleUrl },
        include: {
          versions: {
            orderBy: { version: 'desc' },
            include: {
              dashboardAnalyses: true,
              crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 }
            }
          },
          dashboardAnalyses: true,
          crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 }
        }
      });
      
      if (domain) {
        break; // Found the domain, stop searching
      }
    }

    if (!domain) {
      return res.json({ exists: false });
    }

    // Return domain info with versions
    const versions = domain.versions.map((v: any) => ({
      id: v.id,
      version: v.version,
      name: v.name || `Version ${v.version}`,
      createdAt: v.createdAt,
      hasAnalysis: !!v.dashboardAnalyses[0],
      lastCrawl: v.crawlResults[0]?.createdAt
    }));

    // Find the latest version
    const latestVersion = domain.versions[0]; // Versions are ordered by desc

    return res.json({
      exists: true,
      domainId: domain.id,
      url: domain.url,
      currentVersion: domain.version,
      versions,
      latestVersion: latestVersion ? {
        id: latestVersion.id,
        version: latestVersion.version,
        name: latestVersion.name,
        hasAnalysis: !!latestVersion.dashboardAnalyses[0]
      } : null,
      lastAnalyzed: latestVersion?.dashboardAnalyses[0]?.updatedAt || domain.updatedAt
    });
  } catch (error) {
    console.error('Domain check error:', error);
    res.status(500).json({ error: 'Failed to check domain' });
  }
}));

// POST /domain - create/find domain, run extraction, and stream progress
router.post('/', async (req: Request, res: Response) => {
  const { url, subdomains, customPaths, priorityUrls, createNewVersion = false, versionName } = req.body;
  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  // Enforce that url is a domain, not a full URL
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(url)) {
    res.status(400).json({ error: 'Please provide a valid domain (not a full URL) in the first input.' });
    return;
  }

  // If subdomains provided, pass array to extraction logic
  // Otherwise, use main domain only
  const domainsToExtract = Array.isArray(subdomains) && subdomains.length > 0
    ? subdomains.map((sub: string) => `${sub}.${url}`)
    : [url];

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data: object) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // 1. Check if domain exists
    sendEvent({ type: 'progress', message: 'Checking domain status and versioning...', progress: 5 });
    
    let domain = await prisma.domain.findUnique({ 
      where: { url: domainsToExtract[0] },
      include: { versions: { orderBy: { version: 'desc' } } }
    });
    
    let domainVersion = null;
    let isNewVersion = false;

    if (domain) {
      if (createNewVersion) {
        // Create new version
        const nextVersion = domain.version + 1;
        domainVersion = await prisma.domainVersion.create({
          data: {
            domainId: domain.id,
            version: nextVersion,
            name: versionName || `Version ${nextVersion}`
          }
        });
        
        // Update domain's current version
        await prisma.domain.update({
          where: { id: domain.id },
          data: { version: nextVersion }
        });
        
        isNewVersion = true;
        sendEvent({ type: 'version_created', version: nextVersion, versionName: domainVersion.name });
      } else {
        // Use existing domain
        domainVersion = domain?.versions.find(v => v.version === domain?.version) || null;
      }
    } else {
      // Create new domain
      domain = await prisma.domain.create({ 
        data: { 
          url: domainsToExtract[0],
          version: 1
        },
        include: {
          versions: true
        }
      });
      
      // Create initial version
      domainVersion = await prisma.domainVersion.create({
        data: {
          domainId: domain.id,
          version: 1,
          name: 'Initial Analysis'
        }
      });
    }

    if (!domain || !domainVersion) {
      throw new Error('Failed to create domain or version');
    }
    
    sendEvent({ type: 'domain_created', domainId: domain.id, versionId: domainVersion.id, isNewVersion });

    // 2. Define progress callback for the crawler
    const onProgress: ProgressCallback = (progressData) => {
      // Enhance progress messages to be more realistic
      let enhancedMessage = progressData.step;
      
      if (progressData.phase === 'discovery') {
        if (progressData.step.includes('Validating')) {
          enhancedMessage = 'Validating domain accessibility and technical requirements...';
        } else if (progressData.step.includes('Scanning')) {
          enhancedMessage = 'Scanning website architecture and content structure...';
        } else if (progressData.step.includes('Mapping')) {
          enhancedMessage = 'Mapping content hierarchy and navigation patterns...';
        }
      } else if (progressData.phase === 'content') {
        if (progressData.step.includes('Extracting')) {
          enhancedMessage = 'Extracting and analyzing page content with advanced parsing...';
        } else if (progressData.step.includes('Processing')) {
          enhancedMessage = 'Processing metadata and structured data for comprehensive analysis...';
        }
      } else if (progressData.phase === 'ai_processing') {
        if (progressData.step.includes('Running')) {
          enhancedMessage = 'Running advanced AI analysis for brand context extraction...';
        } else if (progressData.step.includes('Extracting')) {
          enhancedMessage = 'Extracting brand context and market positioning insights...';
        } else if (progressData.step.includes('Generating')) {
          enhancedMessage = 'Generating comprehensive business intelligence and SEO insights...';
        }
      } else if (progressData.phase === 'validation') {
        if (progressData.step.includes('Validating')) {
          enhancedMessage = 'Validating analysis results and quality assurance checks...';
        } else if (progressData.step.includes('Quality')) {
          enhancedMessage = 'Quality assurance and data validation in progress...';
        } else if (progressData.step.includes('Finalizing')) {
          enhancedMessage = 'Finalizing comprehensive brand analysis and preparing insights...';
        }
      }
      
      sendEvent({ type: 'progress', ...progressData, step: enhancedMessage });
    };

    // Determine crawl mode
    const hasPriorityUrls = Array.isArray(priorityUrls) && priorityUrls.length > 0;
    const hasCustomPaths = Array.isArray(customPaths) && customPaths.length > 0;
    let extraction;
    let totalTokenUsage = 0;
    if (!hasPriorityUrls && !hasCustomPaths) {
      extraction = await crawlAndExtractWithGpt4o(domainsToExtract, onProgress);
    } else {
      extraction = await crawlAndExtractWithGpt4o(domainsToExtract, onProgress, customPaths, priorityUrls);
    }
    totalTokenUsage += extraction.tokenUsage || 0;
    
    // 4. Fix keyEntities: sum if object, else use as is
    let keyEntitiesValue = extraction.keyEntities;
    if (typeof keyEntitiesValue === 'object' && keyEntitiesValue !== null) {
      keyEntitiesValue = Object.values(keyEntitiesValue).reduce((sum: number, v: unknown) => sum + (typeof v === 'number' ? v : 0), 0);
    }
    
    // 5. Save final crawl result to version
    sendEvent({ type: 'progress', message: 'Saving analysis results...', progress: 98 });
    const crawlResult = await prisma.crawlResult.create({
      data: {
        domainVersionId: domainVersion.id,
        pagesScanned: extraction.pagesScanned,
        contentBlocks: extraction.contentBlocks,
        keyEntities: keyEntitiesValue,
        confidenceScore: extraction.confidenceScore,
        extractedContext: extraction.extractedContext,
        tokenUsage: extraction.tokenUsage || 0,
      },
    });

    // 6. Update domain context
    await prisma.domain.update({
      where: { id: domain.id },
      data: { context: extraction.extractedContext },
    });

    // 7. Send final result and close connection
    sendEvent({ 
      type: 'complete', 
      result: { 
        domain, 
        domainVersion,
        extraction: crawlResult,
        isNewVersion,
        tokenUsage: totalTokenUsage
      } 
    });
    res.end();

  } catch (err: any) {
    console.error('Domain extraction streaming error:', err);
    sendEvent({ type: 'error', error: 'Failed to process domain', details: err.message });
    res.end();
  }
});

// GET /domain/search - search domain by URL
router.get('/search', async (req: Request, res: Response) => {
  const { url } = req.query;
  if (!url) { 
    res.status(400).json({ error: 'URL parameter is required' }); 
    return; 
  }
  
  try {
    const domain = await prisma.domain.findUnique({ 
      where: { url: url as string },
      include: {
        versions: {
          orderBy: { version: 'desc' },
          include: {
            dashboardAnalyses: true,
            crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 }
          }
        }
      }
    });
    
    if (!domain) { 
      res.status(404).json({ error: 'Domain not found' }); 
      return; 
    }
    
    res.json({ domain });
  } catch (err: any) {
    console.error('Domain search error:', err);
    res.status(500).json({ error: 'Failed to search domain', details: err.message });
  }
});

// GET /domain/:id - get domain and extraction data
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) { res.status(400).json({ error: 'Domain id is required' }); return; }
  
  try {
    const domain = await prisma.domain.findUnique({ 
      where: { id }, 
      include: { 
        versions: {
          orderBy: { version: 'desc' },
          include: {
            crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 },
            dashboardAnalyses: true
          }
        },
        crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 } 
      } 
    });
    
    if (!domain) { res.status(404).json({ error: 'Domain not found' }); return; }
    
    // Find the latest version
    const latestVersion = domain.versions[0]; // Versions are ordered by desc
    const crawlResult = latestVersion?.crawlResults[0];
    
    res.json({
      domain,
      latestVersion,
      versions: domain.versions,
      extraction: crawlResult ? {
        pagesScanned: crawlResult.pagesScanned,
        contentBlocks: crawlResult.contentBlocks,
        keyEntities: crawlResult.keyEntities,
        confidenceScore: crawlResult.confidenceScore,
        extractedContext: crawlResult.extractedContext
      } : null
    });
  } catch (err: any) {
    console.error('Domain fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch domain', details: err.message });
  }
});

// GET /domain/:id/versions - get all versions for a domain
router.get('/:id/versions', asyncHandler(async (req: Request, res: Response) => {
  const domainId = Number(req.params.id);
  
  if (!domainId) {
    return res.status(400).json({ error: 'Domain ID is required' });
  }

  try {
    const versions = await prisma.domainVersion.findMany({
      where: { domainId },
      orderBy: { version: 'desc' },
      include: {
        keywords: {
          include: {
            phrases: {
              include: {
                aiQueryResults: true
              }
            }
          }
        }
      }
    });

    // Calculate metrics for each version
    const versionsWithMetrics = versions.map((version: any) => {
      // Flatten AI query results from keywords -> phrases -> aiQueryResults
      const aiResults = version.keywords.flatMap((k: any) => k.phrases.flatMap((p: any) => p.aiQueryResults));
      const totalQueries = aiResults.length;
      
      if (totalQueries === 0) {
        return {
          ...version,
          metrics: {
            visibilityScore: 0,
            mentionRate: 0,
            avgRelevance: 0,
            avgAccuracy: 0,
            avgSentiment: 0,
            avgOverall: 0,
            totalQueries: 0,
            keywordCount: (version.keywords || []).length,
            phraseCount: (version.keywords || []).reduce((sum: number, k: any) => sum + (k.phrases || []).length, 0)
          }
        };
      }

      const mentions = aiResults.filter((r: any) => r.presence === 1).length;
      const mentionRate = (mentions / totalQueries) * 100;
      
      const avgRelevance = aiResults.reduce((sum: number, r: any) => sum + (r.relevance || 0), 0) / totalQueries;
      const avgAccuracy = aiResults.reduce((sum: number, r: any) => sum + (r.accuracy || 0), 0) / totalQueries;
      const avgSentiment = aiResults.reduce((sum: number, r: any) => sum + (r.sentiment || 0), 0) / totalQueries;
      const avgOverall = aiResults.reduce((sum: number, r: any) => sum + (r.overall || 0), 0) / totalQueries;
      
      // Calculate visibility score based on mention rate and average scores
      const visibilityScore = Math.min(100, Math.max(0, 
        (mentionRate * 0.6) + 
        (avgRelevance * 10) + 
        (avgAccuracy * 5) + 
        (avgSentiment * 5) + 
        (avgOverall * 10)
      ));

      return {
        ...version,
        metrics: {
          visibilityScore: Math.round(visibilityScore),
          mentionRate: Math.round(mentionRate * 10) / 10,
          avgRelevance: Math.round(avgRelevance * 10) / 10,
          avgAccuracy: Math.round(avgAccuracy * 10) / 10,
          avgSentiment: Math.round(avgSentiment * 10) / 10,
          avgOverall: Math.round(avgOverall * 10) / 10,
          totalQueries,
          keywordCount: (version.keywords || []).length,
          phraseCount: (version.keywords || []).reduce((sum: number, k: any) => sum + (k.phrases || []).length, 0)
        }
      };
    });

    res.json({ versions: versionsWithMetrics });

  } catch (error: any) {
    console.error('Domain versions fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch domain versions', 
      details: error.message 
    });
  }
}));

// GET /domain/:domainId/versions - Get all versions for a domain
router.get('/:domainId/versions', asyncHandler(async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    const id = Number(domainId);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid domain ID' });
    }

    const versions = await prisma.domainVersion.findMany({
      where: { domainId: id },
      include: {
        dashboardAnalyses: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        keywords: {
          include: {
            phrases: {
              include: { aiQueryResults: true }
            }
          }
        }
      },
      orderBy: { version: 'desc' }
    });

    // For each version, include metrics (from dashboardAnalyses[0] or calculated)
    const result = await Promise.all(versions.map(async (v) => {
      let metrics = null;
      if (v.dashboardAnalyses && v.dashboardAnalyses.length > 0) {
        metrics = v.dashboardAnalyses[0].metrics;
      } else {
        // Calculate metrics on the fly if not present
        const aiQueryResults = v.keywords.flatMap((k: any) => k.phrases.flatMap((p: any) => p.aiQueryResults));
        const totalQueries = aiQueryResults.length;
        const mentions = aiQueryResults.filter((r: any) => r.presence === 1).length;
        const mentionRate = totalQueries > 0 ? (mentions / totalQueries) * 100 : 0;
        const avgRelevance = totalQueries > 0 ? aiQueryResults.reduce((sum: number, r: any) => sum + r.relevance, 0) / totalQueries : 0;
        const avgAccuracy = totalQueries > 0 ? aiQueryResults.reduce((sum: number, r: any) => sum + r.accuracy, 0) / totalQueries : 0;
        const avgSentiment = totalQueries > 0 ? aiQueryResults.reduce((sum: number, r: any) => sum + r.sentiment, 0) / totalQueries : 0;
        const avgOverall = totalQueries > 0 ? aiQueryResults.reduce((sum: number, r: any) => sum + r.overall, 0) / totalQueries : 0;
        const visibilityScore = Math.round(
          Math.min(
            100,
            Math.max(
              0,
              (mentionRate * 0.25) + (avgRelevance * 10) + (avgSentiment * 5)
            )
          )
        );
        metrics = {
          visibilityScore,
          mentionRate,
          avgRelevance,
          avgAccuracy,
          avgSentiment,
          avgOverall,
          totalQueries
        };
      }
      return {
        id: v.id,
        version: v.version,
        name: v.name,
        createdAt: v.createdAt,
        metrics
      };
    }));

    res.json({ versions: result });
  } catch (error) {
    console.error('Error fetching domain versions:', error);
    res.status(500).json({ error: 'Failed to fetch domain versions' });
  }
}));

export default router; 