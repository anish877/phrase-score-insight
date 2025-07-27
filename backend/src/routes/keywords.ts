import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { gptService } from '../services/geminiService';
import { crawlAndExtractWithGpt4o } from '../services/geminiService';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /keywords/:domainId - get keywords for a domain
router.get('/:domainId', authenticateToken, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const domainId = Number(req.params.domainId);
  const { versionId } = req.query; // Get versionId from query params
  if (!domainId) { res.status(400).json({ error: 'Domain ID is required' }); return; }

  try {
    console.log('Fetching keywords for domainId:', domainId, 'versionId:', versionId);
    
    // Determine where to look for keywords based on versionId
    const whereClause = versionId 
      ? { domainVersionId: Number(versionId) }
      : { domainId, domainVersionId: null };
    
    // Get keywords for the specified version or main domain
    const keywords = await prisma.keyword.findMany({
      where: whereClause,
      orderBy: { volume: 'desc' }
    });

    console.log('Found keywords count:', keywords.length);

    // If we already have keywords, return them
    if (keywords.length > 0) {
      console.log('Returning existing keywords:', keywords.length);
      console.log('Selected keywords:', keywords.filter(k => k.isSelected).map(k => k.term));
       res.json({ keywords });
       return
    }

    // Otherwise, generate keywords using GPT-4o Mini and save
    console.log('No existing keywords, generating with GPT-4o Mini for domain:', domainId, 'versionId:', versionId);
    
    // Get domain for context
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      select: { url: true, context: true, userId: true, location: true }
    });

    if (!domain || domain.userId !== authReq.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get context from domain or extract if missing
    let context = domain.context;
    if (!context) {
      // Use GPT-4o Mini to extract context if not present
      const extraction = await crawlAndExtractWithGpt4o(domain.url, undefined, undefined, undefined, domain.location || undefined);
      context = extraction.extractedContext;
      await prisma.domain.update({ where: { id: domainId }, data: { context } });
    }
    
    const gptKeywords = await gptService.generateKeywordsForDomain(domain.url, context, domain.location || undefined);
    
    // Save keywords to database with version support
    const savedKeywords = await Promise.all(
      gptKeywords.keywords.map(kw =>
        prisma.keyword.create({
          data: {
            term: kw.term,
            volume: kw.volume,
            difficulty: kw.difficulty,
            cpc: kw.cpc,
            domainId: versionId ? null : domainId, // Only set domainId if not a version
            domainVersionId: versionId ? Number(versionId) : null, // Set versionId if provided
            isSelected: false // Explicitly set default value
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
  const { versionId } = req.query; // Get versionId from query params
  let { selectedKeywords } = req.body;

  console.log(`Updating keyword selection for domain ${domainId}, versionId: ${versionId}:`, selectedKeywords);

  if (!domainId || !Array.isArray(selectedKeywords)) {
    res.status(400).json({ error: 'Domain ID and selectedKeywords array are required' });
    return;
  }

  try {
    // Normalize keywords to lowercase for comparison
    const selectedKeywordsLower = selectedKeywords.map((k: string) => k.trim().toLowerCase());

    // Determine where to look for keywords based on versionId
    const whereClause = versionId 
      ? { domainVersionId: Number(versionId) }
      : { domainId, domainVersionId: null };

    // Fetch all keywords for the domain/version
    const existingKeywords = await prisma.keyword.findMany({ where: whereClause });

    // Add missing keywords (preserve original casing)
    for (const kw of selectedKeywords) {
      if (!existingKeywords.some(k => k.term.toLowerCase() === kw.trim().toLowerCase())) {
        await prisma.keyword.create({
          data: {
            term: kw.trim(),
            volume: 0,
            difficulty: 'N/A',
            cpc: 0,
            domainId: versionId ? null : domainId, // Only set domainId if not a version
            domainVersionId: versionId ? Number(versionId) : null, // Set versionId if provided
            isSelected: true,
          }
        });
      }
    }

    // Unselect all
    await prisma.keyword.updateMany({
      where: whereClause,
      data: { isSelected: false }
    });
    console.log(`Unselected all keywords for domain ${domainId}, versionId: ${versionId}`);

    // Select all in the list (case-insensitive)
    // Prisma does not support 'in' with mode: 'insensitive', so update individually
    for (const kw of selectedKeywords) {
      await prisma.keyword.updateMany({
        where: {
          ...whereClause,
          term: { equals: kw.trim(), mode: 'insensitive' }
        },
        data: { isSelected: true }
      });
    }

    // Return updated keywords
    const updatedKeywords = await prisma.keyword.findMany({ where: whereClause });
    console.log(`Returning ${updatedKeywords.length} keywords, ${updatedKeywords.filter(k => k.isSelected).length} selected`);
    res.json({ keywords: updatedKeywords });
  } catch (err: any) {
    console.error('Keyword selection update error:', err);
    res.status(500).json({ error: 'Failed to update keyword selection', details: err.message });
  }
});

// GET /keywords/stream/:domainId - stream keywords for a domain in real-time
router.get('/stream/:domainId', async (req: any, res: Response) => {
  // Handle authentication for SSE endpoint
  const token = req.query.token as string;
  
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    // Verify token manually since we can't use middleware for SSE
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  const domainId = Number(req.params.domainId);
  const { versionId } = req.query; // Get versionId from query params
  if (!domainId) { res.status(400).json({ error: 'Domain ID is required' }); return; }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    console.log('Streaming keywords for domainId:', domainId, 'versionId:', versionId);
    
    // Determine where to look for keywords based on versionId
    const whereClause = versionId 
      ? { domainVersionId: Number(versionId) }
      : { domainId, domainVersionId: null };
    
    // Get keywords for the specified version or main domain
    const keywords = await prisma.keyword.findMany({
      where: whereClause,
      orderBy: { volume: 'desc' }
    });

    // If we already have keywords, stream them
    if (keywords.length > 0) {
      console.log(`Streaming ${keywords.length} existing keywords for domain ${domainId}, versionId: ${versionId}`);
      console.log('Selected keywords:', keywords.filter(k => k.isSelected).map(k => k.term));
      sendEvent('progress', { message: 'Loading existing keywords...' });
      for (const kw of keywords) {
        sendEvent('keyword', kw);
      }
      sendEvent('complete', {});
      res.end();
      return;
    }

    // Otherwise, generate keywords using AI and stream as we process
    sendEvent('progress', { message: 'Analyzing brand context and market positioning for keyword discovery...' });
    
    // Get domain for context
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      select: { url: true, context: true }
    });

    if (!domain) {
      sendEvent('error', { error: 'Domain not found' });
      res.end();
      return;
    }
    
    let context = domain.context;
    if (!context) {
      sendEvent('progress', { message: 'Extracting comprehensive brand context with advanced AI analysis...' });
      const extraction = await crawlAndExtractWithGpt4o(domain.url);
      context = extraction.extractedContext;
      await prisma.domain.update({ where: { id: domainId }, data: { context } });
    }

    sendEvent('progress', { message: 'Generating high-impact keywords using advanced SEO intelligence...' });
    const gptKeywords = await gptService.generateKeywordsForDomain(domain.url, context);
    
    sendEvent('progress', { message: 'Categorizing keywords by search intent and user behavior patterns...' });
    
    // Use all AI-generated keywords, not just top 10
    const allKeywords = gptKeywords.keywords;

    sendEvent('progress', { message: `Processing ${allKeywords.length} AI-generated keywords with real-world SEO metrics...` });

    for (let i = 0; i < allKeywords.length; i++) {
      const kw = allKeywords[i];
      // Save to DB with version support
      const saved = await prisma.keyword.create({
        data: {
          term: kw.term,
          volume: kw.volume,
          difficulty: kw.difficulty,
          cpc: kw.cpc,
          domainId: versionId ? null : domainId, // Only set domainId if not a version
          domainVersionId: versionId ? Number(versionId) : null, // Set versionId if provided
          isSelected: false
        }
      });
      
      sendEvent('keyword', saved);
      
      // Send progress update every 10 keywords
      if ((i + 1) % 10 === 0) {
        sendEvent('progress', { message: `Processed ${i + 1}/${allKeywords.length} keywords...` });
      }
    }

    sendEvent('progress', { message: `Advanced AI keyword generation complete! Generated ${allKeywords.length} high-value keywords with realistic SEO metrics.` });
    sendEvent('complete', {});
    res.end();
  } catch (err: any) {
    console.error('Keyword streaming error:', err);
    sendEvent('error', { error: err.message });
    res.end();
  }
});

export default router; 