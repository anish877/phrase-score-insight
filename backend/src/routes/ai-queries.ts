import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { aiQueryService } from '../services/aiQueryService';

const router = Router();
const prisma = new PrismaClient();

const AI_MODELS: ('GPT-4o' | 'Claude 3' | 'Gemini 1.5')[] = ['GPT-4o', 'Claude 3', 'Gemini 1.5'];

// Scoring logic (same as frontend)
function scoreResponse(result: any) {
  // Simulate presence: 70% chance of presence
  const presence = Math.random() > 0.3 ? 1 : 0;
  const relevance = Math.floor(Math.random() * 5) + 1;
  const accuracy = Math.floor(Math.random() * 5) + 1;
  const sentiment = Math.floor(Math.random() * 5) + 1;
  let overall = 0;
  if (presence === 1) {
    overall = Math.round((relevance + accuracy + sentiment) / 3 * 10) / 10;
  }
  return { presence, relevance, accuracy, sentiment, overall };
}

function calculateStats(results: any[]) {
  const modelStats: Record<string, any> = {};
  let total = 0, presence = 0, relevance = 0, accuracy = 0, sentiment = 0, overall = 0;
  for (const r of results) {
    if (!modelStats[r.model]) {
      modelStats[r.model] = { total: 0, presence: 0, relevance: 0, accuracy: 0, sentiment: 0, overall: 0 };
    }
    modelStats[r.model].total++;
    modelStats[r.model].presence += r.scores.presence;
    modelStats[r.model].relevance += r.scores.relevance;
    modelStats[r.model].accuracy += r.scores.accuracy;
    modelStats[r.model].sentiment += r.scores.sentiment;
    modelStats[r.model].overall += r.scores.overall;
    total++;
    presence += r.scores.presence;
    relevance += r.scores.relevance;
    accuracy += r.scores.accuracy;
    sentiment += r.scores.sentiment;
    overall += r.scores.overall;
  }
  const stats = {
    models: Object.keys(modelStats).map(model => ({
      model,
      presenceRate: modelStats[model].total ? Math.round((modelStats[model].presence / modelStats[model].total) * 100) : 0,
      avgRelevance: modelStats[model].total ? Math.round((modelStats[model].relevance / modelStats[model].total) * 10) / 10 : 0,
      avgAccuracy: modelStats[model].total ? Math.round((modelStats[model].accuracy / modelStats[model].total) * 10) / 10 : 0,
      avgSentiment: modelStats[model].total ? Math.round((modelStats[model].sentiment / modelStats[model].total) * 10) / 10 : 0,
      avgOverall: modelStats[model].total ? Math.round((modelStats[model].overall / modelStats[model].total) * 10) / 10 : 0
    })),
    overall: {
      presenceRate: total ? Math.round((presence / total) * 100) : 0,
      avgRelevance: total ? Math.round((relevance / total) * 10) / 10 : 0,
      avgAccuracy: total ? Math.round((accuracy / total) * 10) / 10 : 0,
      avgSentiment: total ? Math.round((sentiment / total) * 10) / 10 : 0,
      avgOverall: total ? Math.round((overall / total) * 10) / 10 : 0
    },
    totalResults: total
  };
  return stats;
}

router.post('/:domainId', async (req, res) => {
    const domainId = Number(req.params.domainId);
    if (!domainId) {
        res.status(400).json({ error: 'Invalid domainId' });
        return;
    }

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    try {
        const { phrases } = req.body;
        if (!phrases || !Array.isArray(phrases)) {
            res.write(`event: error\ndata: ${JSON.stringify({ error: 'Phrases are required in the request body.' })}\n\n`);
            res.end();
            return;
        }

        const allQueries = phrases.flatMap((item: any) =>
            item.phrases.map((phrase: string) => ({
                keyword: item.keyword,
                phrase,
            }))
        );

        const totalQueries = allQueries.length * AI_MODELS.length;
        let completedQueries = 0;
        const allResults: any[] = [];

        for (const query of allQueries) {
            // Run model queries in parallel for each phrase
            const promises = AI_MODELS.map(async (model) => {
                const startTime = Date.now();
                res.write(`event: progress\ndata: ${JSON.stringify({ message: `Querying: \"${query.phrase}\"...` })}\n\n`);

                try {
                    // Model routing:
                    // 'GPT-4o' -> GPT-4o
                    // 'Claude 3' -> GPT-4o (stand-in)
                    // 'Gemini 1.5' -> Gemini 1.5
                    let modelToUse: 'GPT-4o' | 'Gemini 1.5';
                    if (model === 'GPT-4o') modelToUse = 'GPT-4o';
                    else if (model === 'Claude 3') modelToUse = 'GPT-4o';
                    else modelToUse = 'Gemini 1.5';
                    const { response, cost } = await aiQueryService.query(query.phrase, modelToUse);
                    const latency = (Date.now() - startTime) / 1000;

                    completedQueries++;
                    const progress = (completedQueries / totalQueries) * 100;

                    // Score the response
                    const scores = scoreResponse({ ...query, model, response });

                    const result = {
                        ...query,
                        model,
                        response,
                        latency: Number(latency),
                        cost: Number(cost),
                        progress,
                        scores
                    };
                    allResults.push(result);
                    res.write(`event: result\ndata: ${JSON.stringify(result)}\n\n`);

                    // After each result, recalculate and stream stats
                    const stats = calculateStats(allResults);
                    res.write(`event: stats\ndata: ${JSON.stringify(stats)}\n\n`);
                } catch (err: any) {
                    res.write(`event: error\ndata: ${JSON.stringify({ error: `Failed for \"${query.phrase}\" with ${model}: ${err.message}` })}\n\n`);
                }
            });
            await Promise.all(promises);
        }

        res.write(`event: complete\ndata: {}\n\n`);
        res.end();

    } catch (err: any) {
        console.error('AI Query streaming error:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ error: `An unexpected error occurred: ${err.message}` })}\n\n`);
        res.end();
    }
});

export default router; 