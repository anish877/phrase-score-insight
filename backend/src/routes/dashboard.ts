import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

// Get comprehensive dashboard data for a domain
router.get('/:domainId', async (req: Request, res: Response) => {
  try {
    const { domainId } = req.params;
    
    // Fetch domain with all related data
    const domain = await prisma.domain.findUnique({
      where: { id: parseInt(domainId) },
      include: {
        crawlResults: true,
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

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    // Transform data for frontend
    const dashboardData = {
      id: domain.id,
      url: domain.url,
      context: domain.context,
      crawlResults: domain.crawlResults.map((crawl: any) => ({
        pagesScanned: crawl.pagesScanned,
        contentBlocks: crawl.contentBlocks,
        keyEntities: crawl.keyEntities,
        confidenceScore: crawl.confidenceScore,
        extractedContext: crawl.extractedContext
      })),
      keywords: domain.keywords.map((keyword: any) => ({
        id: keyword.id,
        term: keyword.term,
        volume: keyword.volume,
        difficulty: keyword.difficulty,
        cpc: keyword.cpc,
        category: keyword.category,
        isSelected: keyword.isSelected
      })),
      phrases: domain.keywords.flatMap((keyword: any) => 
        keyword.phrases.map((phrase: any) => ({
          id: phrase.id,
          text: phrase.text,
          keywordId: phrase.keywordId
        }))
      ),
      aiQueryResults: domain.keywords.flatMap((keyword: any) => 
        keyword.phrases.flatMap((phrase: any) => 
          phrase.aiQueryResults.map((result: any) => ({
            id: result.id,
            model: result.model,
            response: result.response,
            latency: result.latency,
            cost: result.cost,
            presence: result.presence,
            relevance: result.relevance,
            accuracy: result.accuracy,
            sentiment: result.sentiment,
            overall: result.overall,
            phraseId: phrase.id
          }))
        )
      )
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router; 