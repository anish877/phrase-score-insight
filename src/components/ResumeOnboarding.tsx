import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Clock, RefreshCw, Play, Trash2 } from 'lucide-react';
import { onboardingService, ResumeCheckResult, OnboardingStepData } from '@/services/onboardingService';

interface ResumeOnboardingProps {
  domainId: number;
  versionId?: number | null;
  resumeData?: OnboardingStepData | null;
  resumeStep?: number;
  onResume: (stepData: OnboardingStepData, currentStep: number) => void;
  onReset: () => void;
  onCancel: () => void;
}

const ResumeOnboarding: React.FC<ResumeOnboardingProps> = ({
  domainId,
  versionId,
  resumeData,
  resumeStep,
  onResume,
  onReset,
  onCancel
}) => {
  const [resumeCheck, setResumeCheck] = useState<ResumeCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resumeData && typeof resumeStep === 'number') {
      setResumeCheck({
        canResume: true,
        currentStep: resumeStep,
        stepData: resumeData,
        lastActivity: undefined,
        dataIntegrity: undefined,
      });
      return;
    }
    checkResumeStatus();
    // eslint-disable-next-line
  }, [domainId, versionId, resumeData, resumeStep]);

  const checkResumeStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await onboardingService.checkResume(domainId, versionId);
      setResumeCheck(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check resume status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResume = async () => {
    if (resumeCheck?.stepData && typeof resumeCheck.currentStep === 'number') {
      try {
        setIsLoading(true);
        onResume(resumeCheck.stepData, resumeCheck.currentStep);
        // Show toast for success (if toast system is available)
      } catch (err) {
        console.error('Failed to resume onboarding:', err);
        setError(err instanceof Error ? err.message : 'Failed to resume onboarding');
        // Show toast for error (if toast system is available)
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Invalid resume data:', resumeCheck);
    }
  };

  const handleReset = async () => {
    try {
      console.log('Resetting onboarding progress for domain:', domainId);
      setIsLoading(true);
      await onboardingService.resetProgress(domainId);
      onReset();
    } catch (err) {
      console.error('Failed to reset progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset progress');
    } finally {
      setIsLoading(false);
    }
  };

  const getStepName = (step: number) => {
    const steps = [
      'Domain Submission',
      'Context Extraction', 
      'Keyword Discovery',
      'Phrase Generation',
      'AI Query Results',
      'Response Scoring'
    ];
    return steps[step] || 'Unknown Step';
  };

  const getStepDescription = (step: number) => {
    const descriptions = [
      'Enter your domain for analysis',
      'AI extracts brand context',
      'Identify relevant keywords',
      'Generate targeted phrases',
      'Execute AI model queries',
      'Analyze and score responses'
    ];
    return descriptions[step] || '';
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <h3 className="text-xl font-semibold text-slate-900">Checking Onboarding Status...</h3>
              <p className="text-slate-600">Validating your previous session data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 border-red-200 bg-red-50">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto" />
              <h3 className="text-xl font-semibold text-red-900">Error Checking Status</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={checkResumeStatus}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!resumeCheck) {
    return null;
  }

  // If onboarding was completed, show redirect message
  if (resumeCheck.redirectTo) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 bg-green-50 border-green-200">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-semibold text-green-900">Onboarding Complete!</h3>
              <p className="text-green-700 mb-4">
                Your domain analysis has already been completed. You can view the results in your dashboard.
              </p>
              <Button 
                onClick={() => window.location.href = resumeCheck.redirectTo!}
                className="bg-green-600 hover:bg-green-700"
              >
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If cannot resume, show reason
  if (!resumeCheck.canResume) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-orange-600 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900">Cannot Resume Onboarding</h3>
              <p className="text-slate-600 mb-4">{resumeCheck.reason}</p>
              {resumeCheck.lastActivity && (
                <p className="text-sm text-slate-500">
                  Last activity: {new Date(resumeCheck.lastActivity).toLocaleString()}
                </p>
              )}
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={onReset} className="bg-blue-600 hover:bg-blue-700">
                  Start New Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show resume options
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-slate-900">Resume Onboarding</CardTitle>
          <CardDescription className="text-lg text-slate-600">
            We found an incomplete onboarding session for this domain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Summary */}
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">Session Progress</h4>
              <Badge className="bg-blue-100 text-blue-800">
                Step {resumeCheck.currentStep! + 1} of 6
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Current Step:</span>
                <span className="font-medium text-slate-900">
                  {getStepName(resumeCheck.currentStep!)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Last Activity:</span>
                <span className="text-sm text-slate-500">
                  {new Date(resumeCheck.lastActivity!).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Progress:</span>
                <span className="text-sm font-medium text-slate-900">
                  {Math.round(((resumeCheck.currentStep! + 1) / 6) * 100)}% Complete
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Progress value={((resumeCheck.currentStep! + 1) / 6) * 100} className="h-2" />
            </div>
          </div>

          {/* Data Integrity Check */}
          {resumeCheck.dataIntegrity && (
            <div className="bg-slate-50 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Data Integrity Check</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  {resumeCheck.dataIntegrity.hasDomainContext ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-slate-700">Domain Context</span>
                </div>
                <div className="flex items-center space-x-2">
                  {resumeCheck.dataIntegrity.hasKeywords ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-slate-700">Keywords</span>
                </div>
                <div className="flex items-center space-x-2">
                  {resumeCheck.dataIntegrity.hasPhrases ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-slate-700">Phrases</span>
                </div>
                <div className="flex items-center space-x-2">
                  {resumeCheck.dataIntegrity.hasAIResults ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm text-slate-700">AI Results</span>
                </div>
              </div>
            </div>
          )}

          {/* Step Description */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">
              Next Step: {getStepName(resumeCheck.currentStep!)}
            </h4>
            <p className="text-blue-700 text-sm">
              {getStepDescription(resumeCheck.currentStep!)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onCancel} className="px-8">
              Cancel
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="px-8 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Start Fresh
            </Button>
            <Button 
              onClick={handleResume}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Resume Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeOnboarding; 