import { Router, Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Utility function to wrap async route handlers
function asyncHandler(fn: any) {
  return (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// GET /api/onboarding/progress/:domainId - Get onboarding progress
router.get('/progress/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const domainId = Number(req.params.domainId);
  
  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    // First check if domain exists and user owns it
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const progress = await prisma.onboardingProgress.findFirst({
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
router.post('/progress/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const domainId = Number(req.params.domainId);
  const { currentStep, stepData, isCompleted = false } = req.body;

  if (!domainId || isNaN(domainId) || typeof currentStep !== 'number') {
    return res.status(400).json({ error: 'Invalid domainId or currentStep' });
  }

  try {
    // First check if domain exists and user owns it
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
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
    res.json({ success: true, progress });
  } catch (error) {
    console.error('Error saving onboarding progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// GET /api/onboarding/resume/:domainId - Resume onboarding with current data
router.get('/resume/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const domainId = Number(req.params.domainId);
  
  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    // First check if domain exists and user owns it
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const progress = await prisma.onboardingProgress.findFirst({
      where: { domainId },
      include: {
        domain: {
          select: {
            id: true,
            url: true,
            context: true,
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
    const hasDomainContext = !!progress.domain?.context;
    const hasKeywords = progress.domain?.keywords?.length > 0;
    const hasPhrases = phrases.length > 0;
    const hasAIResults = aiResults.length > 0;

    // Validate step data integrity and adjust step if necessary
    let validatedStep = progress.currentStep;
    let stepData: any = progress.stepData || {};
    
    // Ensure domain info is always present
    if (!stepData.domain) {
      stepData.domain = progress.domain?.url;
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

    // Update progress if step was adjusted
    if (validatedStep !== progress.currentStep) {
      await prisma.onboardingProgress.update({
        where: { 
          domainId_domainVersionId: {
            domainId,
            domainVersionId: progress.domainVersionId
          }
        },
        data: {
          currentStep: validatedStep,
          stepData: { ...stepData, currentStep: validatedStep }
        }
      });
    }

    res.json({
      progress: {
        currentStep: validatedStep,
        isCompleted: progress.isCompleted,
        stepData,
        lastActivity: progress.lastActivity
      },
      domain: progress.domain,
      dataStatus: {
        hasDomainContext,
        hasKeywords,
        hasPhrases,
        hasAIResults
      }
    });
  } catch (error) {
    console.error('Error resuming onboarding:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// DELETE /api/onboarding/progress/:domainId - Reset onboarding progress
router.delete('/progress/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const domainId = Number(req.params.domainId);
  
  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    // First check if domain exists and user owns it
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

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
router.get('/active', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const activeSessions = await prisma.onboardingProgress.findMany({
      where: {
        isCompleted: false,
        lastActivity: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        },
        domain: {
          userId: req.user.userId // Only show user's own domains
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
router.post('/save-to-main/:domainId', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const domainId = Number(req.params.domainId);
  const stepData = req.body;

  if (!domainId || isNaN(domainId)) {
    return res.status(400).json({ error: 'Invalid domainId' });
  }

  try {
    console.log(`Saving onboarding data to main tables for domain ${domainId}`);

    // First check if domain exists and user owns it
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    if (domain.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
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
      for (const result of stepData.queryResults) {
        // Find the phrase
        const phrase = await prisma.phrase.findFirst({
          where: {
            text: result.phrase,
            keyword: {
              domainId: domainId
            }
          }
        });

        if (phrase) {
          // Upsert AI query result
          await prisma.aIQueryResult.upsert({
            where: {
              id: result.id || -1 // Use a dummy ID for upsert
            },
            update: {
              model: result.model,
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
              phraseId: phrase.id,
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
        }
      }
    }

    // Generate and save dashboard analysis if we have AI results
    const aiResults = await prisma.aIQueryResult.findMany({
      where: {
        phrase: {
          keyword: {
            domainId: domainId
          }
        }
      }
    });

    if (aiResults.length > 0) {
      // Calculate metrics
      const totalQueries = aiResults.length;
      const mentions = aiResults.filter(r => r.presence === 1).length;
      const mentionRate = (mentions / totalQueries) * 100;
      const avgRelevance = aiResults.reduce((sum, r) => sum + r.relevance, 0) / totalQueries;
      const avgAccuracy = aiResults.reduce((sum, r) => sum + r.accuracy, 0) / totalQueries;
      const avgSentiment = aiResults.reduce((sum, r) => sum + r.sentiment, 0) / totalQueries;
      const avgOverall = aiResults.reduce((sum, r) => sum + r.overall, 0) / totalQueries;

      const metrics = {
        visibilityScore: Math.round(Math.min(100, Math.max(0, (mentionRate * 0.25) + (avgRelevance * 10) + (avgSentiment * 5)))),
        mentionRate: mentionRate.toFixed(1),
        avgRelevance: avgRelevance.toFixed(1),
        avgAccuracy: avgAccuracy.toFixed(1),
        avgSentiment: avgSentiment.toFixed(1),
        avgOverall: avgOverall.toFixed(1),
        totalQueries
      };

      const insights = {
        strengths: [
          {
            title: "AI Visibility Established",
            description: `Domain achieves ${metrics.visibilityScore}% visibility score with ${mentions} mentions across ${totalQueries} queries`,
            metric: `${metrics.visibilityScore}% visibility score`
          }
        ],
        weaknesses: [],
        recommendations: []
      };

      const industryAnalysis = {
        marketPosition: mentionRate > 50 ? 'leader' : mentionRate > 25 ? 'challenger' : 'niche',
        competitiveAdvantage: `Strong AI visibility with ${aiResults.length} analyzed queries`,
        marketTrends: ["AI-powered SEO optimization"],
        growthOpportunities: ["Expand keyword portfolio", "Improve content quality"],
        threats: ["Increasing competition", "Algorithm changes"]
      };

      // Update or create dashboard analysis
      const existingAnalysis = await prisma.dashboardAnalysis.findFirst({
        where: { domainId }
      });

      if (existingAnalysis) {
        await prisma.dashboardAnalysis.update({
          where: { id: existingAnalysis.id },
          data: {
            metrics,
            insights,
            industryAnalysis,
            updatedAt: new Date()
          }
        });
      } else {
        await prisma.dashboardAnalysis.create({
          data: {
            domainId,
            metrics,
            insights,
            industryAnalysis
          }
        });
      }
    }

    console.log(`Successfully saved onboarding data to main tables for domain ${domainId}`);
    res.json({ success: true, message: 'Data saved to main tables successfully' });
  } catch (error) {
    console.error('Error saving to main tables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

export default router; 