import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

// Utility function to wrap async route handlers
function asyncHandler(fn: any) {
  return (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// GET /api/onboarding/progress/:domainId - Get onboarding progress
router.get('/progress/:domainId', asyncHandler(async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  
  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    const progress = await prisma.onboardingProgress.findUnique({
      where: { domainId },
      include: {
        domain: {
          select: {
            id: true,
            url: true,
            context: true,
            crawlResults: {
              orderBy: { createdAt: 'desc' },
              take: 1
            },
            keywords: {
              where: { isSelected: true },
              select: { term: true }
            }
          }
        }
      }
    });

    if (!progress) {
      return res.status(404).json({ error: 'No onboarding progress found for this domain' });
    }

    res.json({
      progress: {
        currentStep: progress.currentStep,
        isCompleted: progress.isCompleted,
        stepData: progress.stepData,
        lastActivity: progress.lastActivity
      },
      domain: progress.domain
    });
  } catch (error) {
    console.error('Error fetching onboarding progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// POST /api/onboarding/progress/:domainId - Update onboarding progress
router.post('/progress/:domainId', asyncHandler(async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  const { currentStep, stepData, isCompleted = false } = req.body;

  if (!domainId || isNaN(domainId) || typeof currentStep !== 'number') {
    return res.status(400).json({ error: 'Invalid domainId or currentStep' });
  }

  try {
    // Verify domain exists
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    // Validate step data
    const validatedStepData = stepData || {};
    
    // Ensure required fields are present based on current step
    if (currentStep >= 0 && !validatedStepData.domain) {
      validatedStepData.domain = domain.url;
    }
    
    if (currentStep >= 0 && !validatedStepData.domainId) {
      validatedStepData.domainId = domainId;
    }

    // Upsert onboarding progress
    const progress = await prisma.onboardingProgress.upsert({
      where: { 
        domainId_domainVersionId: {
          domainId: validatedStepData.domainId || domainId,
          domainVersionId: validatedStepData.versionId || null
        }
      },
      update: {
        currentStep,
        stepData: validatedStepData,
        isCompleted,
        lastActivity: new Date()
      },
      create: {
        domainId: validatedStepData.domainId || domainId,
        domainVersionId: validatedStepData.versionId || null,
        currentStep,
        stepData: validatedStepData,
        isCompleted,
        lastActivity: new Date()
      }
    });

    console.log(`Saved onboarding progress for domain ${domainId}, step ${currentStep}`);

    res.json({ 
      success: true, 
      progress: {
        currentStep: progress.currentStep,
        isCompleted: progress.isCompleted,
        stepData: progress.stepData,
        lastActivity: progress.lastActivity
      }
    });
  } catch (error) {
    console.error('Error saving onboarding progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// GET /api/onboarding/resume/:domainId - Check if onboarding can be resumed
router.get('/resume/:domainId', asyncHandler(async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  const versionId = req.query.versionId ? Number(req.query.versionId) : null;
  
  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    // Use findFirst to get the latest progress for this domain/version
    const progress = await prisma.onboardingProgress.findFirst({
      where: {
        domainId,
        domainVersionId: versionId
      },
      include: {
        domain: {
          select: {
            id: true,
            url: true,
            context: true,
            crawlResults: {
              orderBy: { createdAt: 'desc' },
              take: 1
            },
            keywords: {
              where: { isSelected: true },
              select: { term: true }
            }
          }
        }
      }
    });

    if (!progress) {
      return res.json({ 
        canResume: false, 
        reason: 'No onboarding progress found',
        stepData: { domainId, domain: null }
      });
    }

    // Check if onboarding was completed
    if (progress.isCompleted) {
      return res.json({ 
        canResume: false, 
        reason: 'Onboarding already completed',
        redirectTo: `/dashboard/${domainId}`,
        stepData: progress.stepData
      });
    }

    // Check if enough time has passed to consider it stale (24 hours)
    const hoursSinceLastActivity = (Date.now() - progress.lastActivity.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastActivity > 24) {
      return res.json({ 
        canResume: false, 
        reason: 'Onboarding session expired (24+ hours old)',
        lastActivity: progress.lastActivity,
        stepData: progress.stepData
      });
    }

    // Check for phrases and AI results separately
    const phrases = await prisma.phrase.findMany({
      where: {
        keyword: {
          domainId: domainId
        }
      },
      include: {
        keyword: {
          select: { term: true }
        }
      }
    });

    const aiResults = await prisma.aIQueryResult.findMany({
      where: {
        phrase: {
          keyword: {
            domainId: domainId
          }
        }
      },
      take: 1
    });

    // Determine what data is available for resumption
    const hasDomainContext = !!progress.domain.context;
    const hasKeywords = progress.domain.keywords.length > 0;
    const hasPhrases = phrases.length > 0;
    const hasAIResults = aiResults.length > 0;

    // Validate step data integrity and adjust step if necessary
    let validatedStep = progress.currentStep;
    let stepData: any = progress.stepData || {};
    
    // Ensure domain info is always present
    if (!stepData.domain) {
      stepData.domain = progress.domain.url;
    }
    if (!stepData.domainId) {
      stepData.domainId = domainId;
    }

    // Adjust step based on available data
    if (progress.currentStep >= 1 && !hasDomainContext) {
      validatedStep = 0; // Reset to domain submission if context is missing
      console.log(`Domain ${domainId}: Missing context, resetting to step 0`);
    }
    if (progress.currentStep >= 2 && !hasKeywords) {
      validatedStep = 1; // Reset to keyword discovery if keywords are missing
      console.log(`Domain ${domainId}: Missing keywords, resetting to step 1`);
    }
    if (progress.currentStep >= 3 && !hasPhrases) {
      validatedStep = 2; // Reset to phrase generation if phrases are missing
      console.log(`Domain ${domainId}: Missing phrases, resetting to step 2`);
    }
    if (progress.currentStep >= 4 && !hasAIResults) {
      validatedStep = 3; // Reset to AI queries if results are missing
      console.log(`Domain ${domainId}: Missing AI results, resetting to step 3`);
    }

    // Update step if validation found issues
    if (progress && validatedStep !== progress.currentStep) {
      await prisma.onboardingProgress.update({
        where: {
          domainId_domainVersionId: {
            domainId,
            domainVersionId: progress.domainVersionId
          }
        },
        data: {
          currentStep: validatedStep,
          stepData: stepData
        }
      });
      console.log(`Domain ${domainId}: Updated step from ${progress.currentStep} to ${validatedStep}`);
    }

    console.log(`Domain ${domainId}: Resume check - canResume: true, step: ${validatedStep}`);

    res.json({
      canResume: true,
      currentStep: validatedStep,
      stepData: stepData,
      lastActivity: progress.lastActivity,
      dataIntegrity: {
        hasDomainContext,
        hasKeywords,
        hasPhrases,
        hasAIResults
      }
    });
  } catch (error) {
    console.error('Error checking resume status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// DELETE /api/onboarding/progress/:domainId - Reset onboarding progress
router.delete('/progress/:domainId', asyncHandler(async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  
  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    // Delete all progress for this domain (all versions)
    await prisma.onboardingProgress.deleteMany({
      where: { domainId }
    });

    console.log(`Reset onboarding progress for domain ${domainId}`);

    res.json({ success: true, message: 'Onboarding progress reset successfully' });
  } catch (error) {
    console.error('Error resetting onboarding progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// GET /api/onboarding/active - Get all active onboarding sessions
router.get('/active', asyncHandler(async (req: Request, res: Response) => {
  try {
    const activeSessions = await prisma.onboardingProgress.findMany({
      where: {
        isCompleted: false,
        lastActivity: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      include: {
        domain: {
          select: {
            id: true,
            url: true,
            context: true
          }
        }
      },
      orderBy: {
        lastActivity: 'desc'
      }
    });

    // Add domainVersionId to each session (already present, but ensure it's included in the response)
    const sessionsWithVersion = activeSessions.map(session => ({
      ...session,
      domainVersionId: session.domainVersionId
    }));

    console.log(`Found ${sessionsWithVersion.length} active onboarding sessions`);

    res.json({ activeSessions: sessionsWithVersion });
  } catch (error) {
    console.error('Error fetching active sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// POST /api/onboarding/save-to-main/:domainId - Save onboarding data directly to main domain tables
router.post('/save-to-main/:domainId', asyncHandler(async (req: Request, res: Response) => {
  const domainId = Number(req.params.domainId);
  const stepData = req.body;

  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    console.log(`Saving onboarding data to main tables for domain ${domainId}`);

    // Verify domain exists
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    // Update domain context if provided
    if (stepData.brandContext) {
      await prisma.domain.update({
        where: { id: domainId },
        data: { context: stepData.brandContext }
      });
    }

    // Update selected keywords
    if (stepData.selectedKeywords && Array.isArray(stepData.selectedKeywords)) {
      // Mark all keywords as not selected first
      await prisma.keyword.updateMany({
        where: { domainId },
        data: { isSelected: false }
      });

      // Mark selected keywords
      await prisma.keyword.updateMany({
        where: {
          domainId,
          term: { in: stepData.selectedKeywords }
        },
        data: { isSelected: true }
      });
    }

    // Batch insert phrases
    if (stepData.generatedPhrases && Array.isArray(stepData.generatedPhrases)) {
      // Gather all phrases to insert
      let allPhrases = [];
      for (const phraseGroup of stepData.generatedPhrases) {
        const keyword = await prisma.keyword.findFirst({
          where: { domainId, term: phraseGroup.keyword }
        });
        if (keyword && phraseGroup.phrases && Array.isArray(phraseGroup.phrases)) {
          for (const phraseText of phraseGroup.phrases) {
            allPhrases.push({ text: phraseText, keywordId: keyword.id });
          }
        }
      }
      if (allPhrases.length > 0) {
        await prisma.phrase.createMany({
          data: allPhrases,
          skipDuplicates: true
        });
      }
    }

    // Batch upsert AI query results
    if (stepData.queryResults && Array.isArray(stepData.queryResults)) {
      // Build a map of keyword/phrase to their IDs to minimize DB calls
      const keywordMap: Record<string, number> = {};
      const phraseMap: Record<string, number> = {};
      // Get all keywords for this domain
      const keywords = await prisma.keyword.findMany({ where: { domainId } });
      for (const k of keywords) keywordMap[k.term] = k.id;
      // Get all phrases for these keywords
      const phrases = await prisma.phrase.findMany({ where: { keywordId: { in: Object.values(keywordMap) } } });
      for (const p of phrases) phraseMap[`${p.keywordId}|${p.text}`] = p.id;

      // Prepare upsert promises
      const upsertPromises = stepData.queryResults.map((result: any) => {
        const keywordId = keywordMap[result.keyword];
        if (!keywordId) return null;
        const phraseId = phraseMap[`${keywordId}|${result.phrase}`];
        if (!phraseId) return null;
        return prisma.aIQueryResult.upsert({
          where: {
            // Compound unique constraint not defined, so use phraseId+model as unique
            phraseId_model: {
              phraseId,
              model: result.model
            }
          },
          update: {
            response: result.response,
            latency: result.latency,
            cost: result.cost,
            presence: result.scores.presence,
            relevance: result.scores.relevance,
            accuracy: result.scores.accuracy,
            sentiment: result.scores.sentiment,
            overall: result.scores.overall
          },
          create: {
            phraseId,
            model: result.model,
            response: result.response,
            latency: result.latency,
            cost: result.cost,
            presence: result.scores.presence,
            relevance: result.scores.relevance,
            accuracy: result.scores.accuracy,
            sentiment: result.scores.sentiment,
            overall: result.scores.overall
          }
        });
      }).filter(Boolean);
      if (upsertPromises.length > 0) {
        // Run all upserts in parallel
        await Promise.all(upsertPromises);
      }
    }

    // Generate and update dashboard analysis if we have query results
    if (stepData.queryResults && stepData.queryResults.length > 0) {
      const totalResults = stepData.queryResults.length;
      const presenceCount = stepData.queryResults.filter((r: any) => r.scores.presence === 1).length;
      const mentionRate = (presenceCount / totalResults) * 100;
      const avgRelevance = stepData.queryResults.reduce((sum: number, r: any) => sum + r.scores.relevance, 0) / totalResults;
      const avgAccuracy = stepData.queryResults.reduce((sum: number, r: any) => sum + r.scores.accuracy, 0) / totalResults;
      const avgSentiment = stepData.queryResults.reduce((sum: number, r: any) => sum + r.scores.sentiment, 0) / totalResults;
      const avgOverall = stepData.queryResults.reduce((sum: number, r: any) => sum + r.scores.overall, 0) / totalResults;

      const visibilityScore = Math.round(
        (mentionRate * 0.4) + 
        (avgRelevance * 20) + 
        (avgAccuracy * 20) + 
        (avgSentiment * 20)
      );

      const modelPerformance = ['GPT-4o Mini', 'Claude 3', 'Gemini 1.5'].map(model => {
        const modelResults = stepData.queryResults.filter((r: any) => r.model === model);
        const modelPresence = modelResults.filter((r: any) => r.scores.presence === 1).length;
        const modelAvgRelevance = modelResults.reduce((sum: number, r: any) => sum + r.scores.relevance, 0) / modelResults.length;
        
        return {
          model,
          score: Math.round((modelPresence / modelResults.length) * 100),
          responses: modelResults.length,
          mentions: modelPresence,
          avgScore: Math.round(modelAvgRelevance * 20) / 20
        };
      });

      const phraseCounts = stepData.queryResults.reduce((acc: Record<string, number>, result: any) => {
        acc[result.phrase] = (acc[result.phrase] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPhrases = Object.entries(phraseCounts)
        .map(([phrase, count]) => ({ phrase, count }))
        .sort((a, b) => (b.count as number) - (a.count as number))
        .slice(0, 10);

      const keywordPerformance = stepData.selectedKeywords?.map((keyword: string) => {
        const keywordResults = stepData.queryResults.filter((r: any) => r.keyword === keyword);
        const visibility = keywordResults.length > 0 ? 
          (keywordResults.filter((r: any) => r.scores.presence === 1).length / keywordResults.length) * 100 : 0;
        const mentions = keywordResults.filter((r: any) => r.scores.presence === 1).length;
        const sentiment = keywordResults.length > 0 ? 
          keywordResults.reduce((sum: number, r: any) => sum + r.scores.sentiment, 0) / keywordResults.length : 0;
        
        return {
          keyword,
          visibility: Math.round(visibility),
          mentions,
          sentiment: Math.round(sentiment * 10) / 10,
          volume: 1000,
          difficulty: 'Medium'
        };
      }) || [];

      const performanceData = [
        { month: 'Jan', score: Math.max(0, visibilityScore - 15) },
        { month: 'Feb', score: Math.max(0, visibilityScore - 10) },
        { month: 'Mar', score: Math.max(0, visibilityScore - 7) },
        { month: 'Apr', score: Math.max(0, visibilityScore - 5) },
        { month: 'May', score: Math.max(0, visibilityScore - 2) },
        { month: 'Jun', score: visibilityScore }
      ];

      const metrics = {
        visibilityScore,
        mentionRate: mentionRate.toFixed(1),
        avgRelevance: avgRelevance.toFixed(1),
        avgAccuracy: avgAccuracy.toFixed(1),
        avgSentiment: avgSentiment.toFixed(1),
        avgOverall: avgOverall.toFixed(1),
        totalQueries: totalResults,
        keywordCount: stepData.selectedKeywords?.length || 0,
        phraseCount: stepData.generatedPhrases?.reduce((sum: number, group: any) => sum + group.phrases.length, 0) || 0,
        modelPerformance,
        keywordPerformance,
        topPhrases: topPhrases.map(p => ({ phrase: p.phrase, count: p.count as number })),
        performanceData
      } as any;

      const insights = {
        strengths: [
          {
            title: "AI Visibility Analysis",
            description: `Analysis with ${mentionRate.toFixed(1)}% mention rate`,
            metric: `${mentionRate.toFixed(1)}% mention rate`
          }
        ],
        weaknesses: mentionRate < 50 ? [
          {
            title: "Low AI Visibility",
            description: "Your domain is rarely mentioned in AI responses",
            metric: `${mentionRate.toFixed(1)}% mention rate`
          }
        ] : [],
        recommendations: [
          {
            category: "Content",
            priority: "High",
            action: "Continue monitoring AI visibility",
            expectedImpact: "Maintain current performance",
            timeline: "ongoing"
          }
        ]
      };

      const industryAnalysis = {
        marketPosition: mentionRate > 50 ? 'leader' : mentionRate > 25 ? 'challenger' : 'niche',
        competitiveAdvantage: `AI visibility analysis with ${stepData.selectedKeywords?.length || 0} keywords`,
        marketTrends: ["AI-powered SEO optimization", "Content relevance focus"],
        growthOpportunities: ["Expand keyword portfolio", "Improve content accuracy"],
        threats: ["Increasing competition", "Algorithm changes"]
      };

      // Update or create dashboard analysis
      await prisma.dashboardAnalysis.upsert({
        where: { domainId },
        update: {
          metrics,
          insights,
          industryAnalysis,
          updatedAt: new Date()
        },
        create: {
          domainId,
          metrics,
          insights,
          industryAnalysis
        }
      });
    }

    console.log(`Successfully saved onboarding data to main tables for domain ${domainId}`);
    res.json({ success: true, message: 'Data saved to main tables successfully' });
  } catch (error) {
    console.error('Error saving to main tables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

export default router; 