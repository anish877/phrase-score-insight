import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { generateKeywordsForDomain } from '../services/geminiService';
import { crawlAndExtractWithGemini } from '../services/geminiService';

const router = Router();
const prisma = new PrismaClient();

// Helper to categorize keywords based on their characteristics
function determineCategory(keyword: string, volume: number): string {
  const lowerKeyword = keyword.toLowerCase();
  if (/\b(vs|versus|alternative to|compare)\b/.test(lowerKeyword)) return 'competitive';
  if (/\b(best|top|review|rating)\b/.test(lowerKeyword)) return 'competitive';
  if (/\b(how to|what is|why|guide|tutorial)\b/.test(lowerKeyword)) return 'informational';
  if (/\b(software|platform|tool|app|system)\b/.test(lowerKeyword)) return 'products';
  if (/\b(service|solution|agency|consulting|company)\b/.test(lowerKeyword)) return 'services';
  if (/\b(price|pricing|cost|buy|purchase)\b/.test(lowerKeyword)) return 'transactional';
  if (volume > 2500) return 'core-business';
  if (lowerKeyword.includes('enterprise') || lowerKeyword.includes('business')) return 'core-business';
  return 'industry';
}

// GET /keywords/:domainId - get keywords for a domain
router.get('/:domainId', async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  if (!domainId) { res.status(400).json({ error: 'Domain ID is required' }); return; }

  try {
    console.log('Fetching keywords for domainId:', domainId);
    
    // Get domain first
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      include: { keywords: true }
    });

    if (!domain) { 
      console.log('Domain not found:', domainId);
      res.status(404).json({ error: 'Domain not found' }); 
      return; 
    }

    console.log('Domain found, keywords count:', domain.keywords.length);

    // If we already have keywords, return them
    if (domain.keywords.length > 0) {
      console.log('Returning existing keywords');
       res.json({ keywords: domain.keywords });
       return
    }

    // Otherwise, generate keywords using Gemini and save
    console.log('No existing keywords, generating with Gemini for domain:', domain.url);
    // Get context from domain or extract if missing
    let context = domain.context;
    if (!context) {
      // Use Gemini to extract context if not present
      const extraction = await crawlAndExtractWithGemini(domain.url);
      context = extraction.extractedContext;
      await prisma.domain.update({ where: { id: domain.id }, data: { context } });
    }
    const geminiKeywords = await generateKeywordsForDomain(domain.url, context);
    const categorizedKeywords = geminiKeywords.map(kw => ({
      ...kw,
      category: determineCategory(kw.term, kw.volume)
    }));
    const topKeywords = categorizedKeywords.slice(0, 10);

    // Save keywords to database
    const savedKeywords = await Promise.all(
      topKeywords.map(kw =>
        prisma.keyword.create({
          data: {
            ...kw,
            domainId
          }
        })
      )
    );

    res.json({ keywords: savedKeywords });
  } catch (err: any) {
    console.error('Keyword fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch keywords', details: err.message });
  }
});

// PATCH /keywords/:domainId/selection - update selected keywords
router.patch('/:domainId/selection', async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  const { selectedKeywords } = req.body;

  if (!domainId || !Array.isArray(selectedKeywords)) {
    res.status(400).json({ error: 'Domain ID and selectedKeywords array are required' });
    return;
  }

  try {
    // First, unselect all keywords for this domain
    await prisma.keyword.updateMany({
      where: { domainId },
      data: { isSelected: false }
    });

    // Then, select the specified keywords
    await prisma.keyword.updateMany({
      where: {
        domainId,
        term: { in: selectedKeywords }
      },
      data: { isSelected: true }
    });

    // Return updated keywords
    const updatedKeywords = await prisma.keyword.findMany({
      where: { domainId }
    });

    res.json({ keywords: updatedKeywords });
  } catch (err: any) {
    console.error('Keyword selection update error:', err);
    res.status(500).json({ error: 'Failed to update keyword selection', details: err.message });
  }
});

// GET /keywords/stream/:domainId - stream keywords for a domain in real-time
router.get('/stream/:domainId', async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  if (!domainId) { res.status(400).json({ error: 'Domain ID is required' }); return; }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    // Get domain first
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      include: { keywords: true }
    });

    if (!domain) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: 'Domain not found' })}\n\n`);
      res.end();
      return;
    }

    // If we already have keywords, stream them
    if (domain.keywords.length > 0) {
      for (const kw of domain.keywords) {
        res.write(`event: keyword\ndata: ${JSON.stringify(kw)}\n\n`);
      }
      res.write(`event: complete\ndata: {}\n\n`);
      res.end();
      return;
    }

    // Otherwise, generate keywords using Gemini and stream as we process
    let context = domain.context;
    if (!context) {
      const extraction = await crawlAndExtractWithGemini(domain.url);
      context = extraction.extractedContext;
      await prisma.domain.update({ where: { id: domain.id }, data: { context } });
    }
    const geminiKeywords = await generateKeywordsForDomain(domain.url, context);
    const categorizedKeywords = geminiKeywords.map(kw => ({
      ...kw,
      category: determineCategory(kw.term, kw.volume)
    }));
    const topKeywords = categorizedKeywords.slice(0, 10);

    for (const kw of topKeywords) {
      // Save to DB
      const saved = await prisma.keyword.create({
        data: { ...kw, domainId }
      });
      // Stream to client
      res.write(`event: keyword\ndata: ${JSON.stringify(saved)}\n\n`);
    }

    res.write(`event: complete\ndata: {}\n\n`);
    res.end();
  } catch (err: any) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

export default router; 