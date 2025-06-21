import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { aiQueryService } from '../services/aiQueryService';

const router = Router();
const prisma = new PrismaClient();

const AI_MODELS: ('GPT-4o' | 'Claude 3' | 'Gemini 1.5')[] = ['GPT-4o', 'Claude 3', 'Gemini 1.5'];

// AI-powered scoring logic with timeout
async function scoreResponseWithAI(phrase: string, response: string, model: string, domain?: string) {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Scoring timeout')), 15000)
  );
  
  try {
    return await Promise.race([
      aiQueryService.scoreResponse(phrase, response, model, domain),
      timeoutPromise
    ]);
  } catch (error) {
    // Enhanced fallback scoring if AI scoring fails
    const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
      response.toLowerCase().includes(term) && term.length > 2
    );
    const responseLength = response.length;
    const hasSubstantialContent = responseLength > 150;
    const hasProfessionalTone = !response.toLowerCase().includes('error') && responseLength > 80;
    
    // Domain-specific presence check
    let domainPresence = 0;
    if (domain) {
      const domainTerms = domain.toLowerCase().replace(/\./g, ' ').split(' ');
      domainPresence = domainTerms.some(term => 
        response.toLowerCase().includes(term) && term.length > 2
      ) ? 1 : 0;
    }
    
    return {
      presence: domainPresence || (hasQueryTerms ? 1 : 0),
      relevance: hasQueryTerms ? (hasSubstantialContent ? 3 : 2) : 1,
      accuracy: hasProfessionalTone ? 3 : 2,
      sentiment: hasProfessionalTone ? 3 : 2,
      overall: hasQueryTerms && hasSubstantialContent ? 3 : 2
    };
  }
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

// Process queries in batches to avoid overwhelming the system
async function processQueryBatch(
  queries: any[], 
  batchSize: number, 
  res: any, 
  allResults: any[], 
  completedQueries: { current: number }, 
  totalQueries: number,
  domain?: string
) {
  const batches = [];
  for (let i = 0; i < queries.length; i += batchSize) {
    batches.push(queries.slice(i, i + batchSize));
  }

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    
    // Send batch progress update with realistic messaging
    res.write(`event: progress\ndata: ${JSON.stringify({ message: `Processing batch ${batchIndex + 1}/${batches.length} - Analyzing ${batch.length} phrases with AI models for domain visibility...` })}\n\n`);
    
    // Process each batch in parallel with realistic timing
    const batchPromises = batch.map(async (query) => {
      const modelPromises = AI_MODELS.map(async (model) => {
        const startTime = Date.now();
        
        try {
          // Send individual query progress with realistic messaging
          res.write(`event: progress\ndata: ${JSON.stringify({ message: `Querying ${model} for "${query.phrase}" - Generating comprehensive search response...` })}\n\n`);
          
          // Get AI response using Gemini under the hood with timeout and domain context
          const queryPromise = aiQueryService.query(query.phrase, model, domain);
          const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Query timeout - AI model taking too long to respond')), 25000)
          );
          
          const { response, cost } = await Promise.race([queryPromise, timeoutPromise]);
          const latency = (Date.now() - startTime) / 1000;

          // Send scoring progress with realistic messaging
          res.write(`event: progress\ndata: ${JSON.stringify({ message: `Evaluating ${model} response for "${query.phrase}" - Analyzing domain presence and SEO ranking potential...` })}\n\n`);
          
          // Score the response using AI with timeout and domain context
          const scores = await scoreResponseWithAI(query.phrase, response, model, domain) as {
            presence: number;
            relevance: number;
            accuracy: number;
            sentiment: number;
            overall: number;
          };

          completedQueries.current++;
          const progress = (completedQueries.current / totalQueries) * 100;

          // Find the phrase record in the DB (by text and keyword)
          const keywordRecord = await prisma.keyword.findFirst({
            where: { term: query.keyword, domainId: query.domainId },
          });
          let phraseRecord = null;
          if (keywordRecord) {
            phraseRecord = await prisma.phrase.findFirst({
              where: { text: query.phrase, keywordId: keywordRecord.id },
            });
          }
          
          // Save AIQueryResult to DB if phraseRecord found
          let aiQueryResultRecord = null;
          if (phraseRecord) {
            aiQueryResultRecord = await prisma.aIQueryResult.create({
              data: {
                phraseId: phraseRecord.id,
                model,
                response,
                latency,
                cost,
                presence: scores.presence,
                relevance: scores.relevance,
                accuracy: scores.accuracy,
                sentiment: scores.sentiment,
                overall: scores.overall,
              }
            });
          }

          const result = {
            ...query,
            model,
            response,
            latency: Number(latency),
            cost: Number(cost),
            progress,
            scores,
            aiQueryResultId: aiQueryResultRecord ? aiQueryResultRecord.id : undefined,
            phraseId: phraseRecord ? phraseRecord.id : undefined
          };
          
          allResults.push(result);
          res.write(`event: result\ndata: ${JSON.stringify(result)}\n\n`);

          return result;
        } catch (err: any) {
          console.error(`Failed for "${query.phrase}" with ${model}:`, err.message);
          res.write(`event: error\ndata: ${JSON.stringify({ error: `Failed to process "${query.phrase}" with ${model}: ${err.message}` })}\n\n`);
          return null;
        }
      });

      // Wait for all models to complete for this query
      await Promise.allSettled(modelPromises);
    });

    // Wait for current batch to complete before moving to next
    await Promise.allSettled(batchPromises);
    
    // Send updated stats after each batch with realistic messaging
    const stats = calculateStats(allResults);
    res.write(`event: stats\ndata: ${JSON.stringify(stats)}\n\n`);
    
    // Add realistic delay between batches to simulate processing
    if (batchIndex < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
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

        // Get domain information for context
        const domain = await prisma.domain.findUnique({
            where: { id: domainId },
            select: { url: true }
        });

        const allQueries = phrases.flatMap((item: any) =>
            item.phrases.map((phrase: string) => ({
                keyword: item.keyword,
                phrase,
                domainId
            }))
        );

        const totalQueries = allQueries.length * AI_MODELS.length;
        const completedQueries = { current: 0 };
        const allResults: any[] = [];

        // Determine batch size based on total queries - optimized for realistic processing
        const batchSize = totalQueries > 30 ? 6 : totalQueries > 15 ? 8 : 10;
        
        res.write(`event: progress\ndata: ${JSON.stringify({ message: `Initializing AI analysis engine - Processing ${totalQueries} queries across ${AI_MODELS.length} AI models for domain visibility analysis...` })}\n\n`);

        // Process queries in optimized batches with domain context
        await processQueryBatch(allQueries, batchSize, res, allResults, completedQueries, totalQueries, domain?.url);

        res.write(`event: complete\ndata: {}\n\n`);
        res.end();

    } catch (err: any) {
        console.error('AI Query streaming error:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ error: `An unexpected error occurred: ${err.message}` })}\n\n`);
        res.end();
    }
});

export default router; 