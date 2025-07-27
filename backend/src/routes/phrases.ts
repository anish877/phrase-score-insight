import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { gptService } from '../services/geminiService';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { Response } from 'express';

const router = Router();
const prisma = new PrismaClient();

// GET /api/phrases/:domainId - stream phrases for selected keywords
router.get('/:domainId', async (req: any, res: Response) => {
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
  if (!domainId) { res.status(400).json({ error: 'Invalid domainId' }); return; }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // Determine where to look for keywords based on versionId
    const whereClause = versionId 
      ? { domainVersionId: Number(versionId), isSelected: true }
      : { domainId, domainVersionId: null, isSelected: true };

    // Fetch selected keywords from DB, sorted by volume
    const keywords = await prisma.keyword.findMany({
      where: whereClause,
      orderBy: { volume: 'desc' },
      select: { id: true, term: true }
    });

    console.log(`Found ${keywords.length} selected keywords for domain ${domainId}, versionId: ${versionId}:`, keywords.map(k => k.term));

    // Fetch domain and context
    const domainObj = await prisma.domain.findUnique({ where: { id: domainId } });
    if (!domainObj || domainObj.userId !== req.user.userId) {
      sendEvent('error', { error: 'Access denied' });
      res.end();
      return;
    }
    const domain = domainObj?.url || '';
    const context = domainObj?.context || '';
    const location = domainObj?.location && domainObj.location.trim() ? domainObj.location.trim() : undefined;
    


    if (!keywords.length) {
      console.log(`No selected keywords found for domain ${domainId}, versionId: ${versionId}`);
      sendEvent('error', { error: 'No selected keywords found' });
      res.end();
      return;
    }

    // Send initial stats
    let totalPhrases = 0;
    let totalAIQueries = 0;
    let phrasesPerKeyword: Record<string, number> = {};
    
    sendEvent('progress', { message: 'Initializing intent-based AI phrase generation engine...' });
    sendEvent('stats', { 
      totalKeywords: keywords.length, 
      totalPhrases: 0, 
      avgPerKeyword: 0, 
      aiQueries: 0 
    });

    for (let i = 0; i < keywords.length; i++) {
      const { id: keywordId, term } = keywords[i];
      try {
        sendEvent('progress', { message: `Generating intent-based phrases for "${term}" (${i+1}/${keywords.length}) - Creating brand discovery queries...` });
        
        // Generate phrases using AI, now with domain and context
        const phrasesResult = await gptService.generatePhrases(term, domain, context, location);
        totalAIQueries += 1; // Count each AI call
        
        phrasesPerKeyword[term] = 0;
        for (const phrase of phrasesResult.phrases) {
          // Save phrase to DB
          const phraseRecord = await prisma.phrase.create({
            data: {
              text: phrase,
              keywordId,
            }
          });
          
          sendEvent('phrase', { 
            keyword: term, 
            phrase: phraseRecord.text, 
            phraseId: phraseRecord.id 
          });
          
          totalPhrases++;
          phrasesPerKeyword[term]++;
          
          // Calculate real-time stats
          const avgPerKeyword = totalPhrases / (i + 1);
          sendEvent('stats', { 
            totalKeywords: keywords.length, 
            totalPhrases, 
            avgPerKeyword: Math.round(avgPerKeyword * 10) / 10, 
            aiQueries: totalAIQueries 
          });
        }
        
        sendEvent('progress', { message: `Generated ${phrasesResult.phrases.length} intent-based phrases for "${term}" - Optimized for brand discovery and user intent...` });
        
      } catch (err: any) {
        console.error(`Failed to generate phrases for "${term}":`, err);
        sendEvent('error', { error: `Failed to process "${term}": ${err.message}` });
      }
    }

    sendEvent('progress', { message: `Intent-based AI phrase generation complete! Generated ${totalPhrases} brand discovery phrases from ${totalAIQueries} AI intelligence queries.` });
    sendEvent('complete', {});
    res.end();
  } catch (err: any) {
    console.error('Phrase generation error:', err);
    sendEvent('error', { error: err.message });
    res.end();
  }
});

export default router; 