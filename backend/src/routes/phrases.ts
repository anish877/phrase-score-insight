import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { geminiService } from '../services/geminiService';

const router = Router();
const prisma = new PrismaClient();

// GET /api/phrases/:domainId - stream phrases for selected keywords
router.get('/:domainId', async (req, res) => {
  const domainId = Number(req.params.domainId);
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
    // Fetch selected keywords from DB, sorted by volume
    const keywords = await prisma.keyword.findMany({
      where: { domainId, isSelected: true },
      orderBy: { volume: 'desc' },
      select: { id: true, term: true }
    });

    if (!keywords.length) {
      sendEvent('error', { error: 'No selected keywords found' });
      res.end();
      return;
    }

    // Send initial stats
    let totalPhrases = 0;
    let totalAIQueries = 0;
    let phrasesPerKeyword: Record<string, number> = {};
    
    sendEvent('progress', { message: 'Initializing advanced AI phrase generation engine...' });
    sendEvent('stats', { 
      totalKeywords: keywords.length, 
      totalPhrases: 0, 
      avgPerKeyword: 0, 
      aiQueries: 0 
    });

    for (let i = 0; i < keywords.length; i++) {
      const { id: keywordId, term } = keywords[i];
      try {
        sendEvent('progress', { message: `Generating high-converting phrases for "${term}" (${i+1}/${keywords.length}) - Analyzing search intent patterns...` });
        
        // Generate phrases using AI
        const phrases = await geminiService.generatePhrases(term);
        totalAIQueries += 1; // Count each AI call
        
        phrasesPerKeyword[term] = 0;
        for (const phrase of phrases) {
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
        
        sendEvent('progress', { message: `Generated ${phrases.length} high-impact phrases for "${term}" - Optimized for search intent and conversion...` });
        
      } catch (err: any) {
        console.error(`Failed to generate phrases for "${term}":`, err);
        sendEvent('error', { error: `Failed to process "${term}": ${err.message}` });
      }
    }

    sendEvent('progress', { message: `Advanced AI phrase generation complete! Generated ${totalPhrases} high-converting phrases from ${totalAIQueries} AI intelligence queries.` });
    sendEvent('complete', {});
    res.end();
  } catch (err: any) {
    console.error('Phrase generation error:', err);
    sendEvent('error', { error: err.message });
    res.end();
  }
});

export default router; 