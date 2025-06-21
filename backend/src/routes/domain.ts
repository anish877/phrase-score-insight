import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { crawlAndExtractWithGemini, ProgressCallback } from '../services/geminiService';

const router = Router();
const prisma = new PrismaClient();

// POST /domain - create/find domain, run extraction, and stream progress
router.post('/', async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: 'Domain url is required' });
    return;
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data: object) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // 1. Save or find domain
    sendEvent({ type: 'progress', message: 'Initializing domain analysis and validation...', progress: 5 });
    let domain = await prisma.domain.findUnique({ where: { url } });
    if (!domain) {
      domain = await prisma.domain.create({ data: { url } });
    }
    sendEvent({ type: 'domain_created', domainId: domain.id });

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

    // 3. Run Gemini extraction with progress streaming
    const extraction = await crawlAndExtractWithGemini(domain.url, onProgress);

    // 4. Fix keyEntities: sum if object, else use as is
    let keyEntitiesValue = extraction.keyEntities;
    if (typeof keyEntitiesValue === 'object' && keyEntitiesValue !== null) {
      keyEntitiesValue = Object.values(keyEntitiesValue).reduce((sum: number, v: unknown) => sum + (typeof v === 'number' ? v : 0), 0);
    }
    
    // 5. Save final crawl result
    sendEvent({ type: 'progress', message: 'Saving analysis results...', progress: 98 });
    const crawlResult = await prisma.crawlResult.create({
      data: {
        domainId: domain.id,
        pagesScanned: extraction.pagesScanned,
        contentBlocks: extraction.contentBlocks,
        keyEntities: keyEntitiesValue,
        confidenceScore: extraction.confidenceScore,
        extractedContext: extraction.extractedContext,
      },
    });

    // 6. Update domain context
    await prisma.domain.update({
      where: { id: domain.id },
      data: { context: extraction.extractedContext },
    });

    // 7. Send final result and close connection
    sendEvent({ type: 'complete', result: { domain, extraction: crawlResult } });
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
      where: { url: url as string }
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
      include: { crawlResults: { orderBy: { createdAt: 'desc' }, take: 1 } } 
    });
    
    if (!domain) { res.status(404).json({ error: 'Domain not found' }); return; }
    
    const crawlResult = domain.crawlResults[0];
    res.json({
      domain,
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

export default router; 