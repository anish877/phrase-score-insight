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

  // Fetch selected keywords from DB, sorted by volume, limit N
  const keywords = await prisma.keyword.findMany({
    where: { domainId, isSelected: true },
    orderBy: { volume: 'desc' },
    take: 10,
    select: { id: true, term: true }
  });

  if (!keywords.length) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: 'No selected keywords found' })}\n\n`);
    res.end();
    return;
  }

  // Send initial stats
  let totalPhrases = 0;
  let phrasesPerKeyword: Record<string, number> = {};
  res.write(`event: stats\ndata: ${JSON.stringify({ totalKeywords: keywords.length, totalPhrases: 0, avgPerKeyword: 0, aiQueries: 0 })}\n\n`);

  for (let i = 0; i < keywords.length; i++) {
    const { id: keywordId, term } = keywords[i];
    try {
      res.write(`event: progress\ndata: ${JSON.stringify({ message: `Generating phrases for \"${term}\" (${i+1}/${keywords.length})` })}\n\n`);
      const phrases = await geminiService.generatePhrases(term);
      phrasesPerKeyword[term] = 0;
      for (const phrase of phrases) {
        // Save phrase to DB
        const phraseRecord = await prisma.phrase.create({
          data: {
            text: phrase,
            keywordId,
          }
        });
        res.write(`event: phrase\ndata: ${JSON.stringify({ keyword: term, phrase: phraseRecord.text, phraseId: phraseRecord.id })}\n\n`);
        totalPhrases++;
        phrasesPerKeyword[term]++;
        const avgPerKeyword = totalPhrases / (i + 1);
        res.write(`event: stats\ndata: ${JSON.stringify({ totalKeywords: keywords.length, totalPhrases, avgPerKeyword, aiQueries: totalPhrases * 3 })}\n\n`);
      }
    } catch (err: any) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: `Failed for \"${term}\": ${err.message}` })}\n\n`);
    }
  }

  res.write(`event: complete\ndata: {}\n\n`);
  res.end();
});

export default router; 