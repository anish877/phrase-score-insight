import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const prisma = new PrismaClient();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// POST /competitor/analyze - Analyze competitor using AI
router.post('/analyze', async (req: Request, res: Response) => {
  const { targetDomain, competitorDomain, context, keywords, phrases } = req.body;

  if (!targetDomain || !competitorDomain) {
    return res.status(400).json({ error: 'Target domain and competitor domain are required' });
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
    sendEvent({ event: 'progress', message: 'Starting competitor analysis...', progress: 10 });

    // Get target domain data from database
    const targetDomainData = await prisma.domain.findUnique({
      where: { url: targetDomain },
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

    if (!targetDomainData) {
      sendEvent({ event: 'error', error: 'Target domain not found in database' });
      res.end();
      return;
    }

    sendEvent({ event: 'progress', message: 'Analyzing competitor domain...', progress: 30 });

    // Create comprehensive AI prompt for competitor analysis
    const analysisPrompt = `
You are an expert SEO and AI visibility analyst. Analyze the competitor domain "${competitorDomain}" compared to the target domain "${targetDomain}" in the context of AI-powered search visibility.

TARGET DOMAIN CONTEXT:
- Domain: ${targetDomain}
- Brand Context: ${context || 'Not provided'}
- Keywords: ${keywords?.join(', ') || 'Not provided'}
- Phrases: ${phrases?.join(', ') || 'Not provided'}

TARGET DOMAIN PERFORMANCE DATA:
- Total AI Queries: ${targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).length}
- Domain Presence Rate: ${targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).filter(r => r.presence === 1).length / Math.max(targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).length, 1) * 100}%
- Average Relevance Score: ${targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).reduce((sum, r) => sum + r.relevance, 0) / Math.max(targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).length, 1)}
- Average Accuracy Score: ${targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).reduce((sum, r) => sum + r.accuracy, 0) / Math.max(targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).length, 1)}
- Average Sentiment Score: ${targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).reduce((sum, r) => sum + r.sentiment, 0) / Math.max(targetDomainData.keywords.flatMap(k => k.phrases.flatMap(p => p.aiQueryResults)).length, 1)}

COMPETITOR ANALYSIS TASK:
Analyze ${competitorDomain} as a competitor to ${targetDomain} in terms of AI visibility and search presence. Consider:

1. Domain Authority and Brand Recognition
2. Content Quality and Relevance
3. Search Engine Optimization
4. AI Model Recognition
5. Market Positioning
6. Content Strategy
7. Technical SEO Factors

Provide a comprehensive analysis with:
- Estimated AI visibility score (0-100)
- Mention rate percentage
- Average relevance, accuracy, and sentiment scores
- Key strengths and weaknesses
- Specific recommendations for improvement
- Comparison analysis showing where target domain performs better/worse/similar

Respond in JSON format with the following structure:
{
  "domain": "${competitorDomain}",
  "visibilityScore": <0-100>,
  "mentionRate": <0-100>,
  "avgRelevance": <1-5>,
  "avgAccuracy": <1-5>,
  "avgSentiment": <1-5>,
  "keyStrengths": ["strength1", "strength2", ...],
  "keyWeaknesses": ["weakness1", "weakness2", ...],
  "recommendations": ["rec1", "rec2", ...],
  "comparison": {
    "better": ["area where target is better", ...],
    "worse": ["area where target is worse", ...],
    "similar": ["area where performance is similar", ...]
  }
}

Be realistic and provide detailed, actionable insights based on typical competitive analysis patterns.
`;

    sendEvent({ event: 'progress', message: 'Running AI analysis...', progress: 60 });

    // Run AI analysis
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text();

    sendEvent({ event: 'progress', message: 'Processing analysis results...', progress: 90 });

    // Parse JSON response
    let analysisData;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      sendEvent({ event: 'error', error: 'Failed to parse AI analysis response' });
      res.end();
      return;
    }

    sendEvent({ event: 'analysis', ...analysisData });
    res.end();

  } catch (error) {
    console.error('Competitor analysis error:', error);
    sendEvent({ event: 'error', error: 'Failed to analyze competitor' });
    res.end();
  }
});

export default router; 