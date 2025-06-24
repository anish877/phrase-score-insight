import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DomainSubmission from '../components/DomainSubmission';
import DomainExtraction from '../components/DomainExtraction';
import KeywordDiscovery from '../components/KeywordDiscovery';
import PhraseGeneration from '../components/PhraseGeneration';
import AIQueryResults, { AIQueryResult, AIQueryStats } from '../components/AIQueryResults';
import ResponseScoring from '../components/ResponseScoring';
import ResumeOnboarding from '../components/ResumeOnboarding';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { onboardingService, OnboardingStepData } from '@/services/onboardingService';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [domain, setDomain] = useState('');
  const [subdomains, setSubdomains] = useState<string[]>([]);
  const [domainId, setDomainId] = useState<number>(0); 
  const [brandContext, setBrandContext] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [generatedPhrases, setGeneratedPhrases] = useState<Array<{keyword: string, phrases: string[]}>>([]);
  const [queryResults, setQueryResults] = useState<AIQueryResult[]>([]);
  const [queryStats, setQueryStats] = useState<AIQueryStats | null>(null);
  
  // Onboarding state
  const [isCheckingResume, setIsCheckingResume] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [resumeData, setResumeData] = useState<OnboardingStepData | null>(null);
  const [customPaths, setCustomPaths] = useState<string[]>([]);

  console.log('Current step:', currentStep, 'Domain ID:', domainId, 'Domain:', domain);

  const steps = [
    {
      id: 'domain',
      title: 'Domain Submission',
      description: 'Enter your domain for analysis',
      estimatedTime: '1 min'
    },
    {
      id: 'extraction',
      title: 'Context Extraction',
      description: 'AI extracts brand context',
      estimatedTime: '2-3 min'
    },
    {
      id: 'keywords',
      title: 'Keyword Discovery',
      description: 'Identify relevant keywords',
      estimatedTime: '2 min'
    },
    {
      id: 'phrases',
      title: 'Phrase Generation',
      description: 'Generate targeted phrases',
      estimatedTime: '1-2 min'
    },
    {
      id: 'queries',
      title: 'AI Query Results',
      description: 'Execute AI model queries',
      estimatedTime: '3-4 min'
    },
    {
      id: 'scoring',
      title: 'Response Scoring',
      description: 'Analyze and score responses',
      estimatedTime: '2 min'
    }
  ];

  // Initialize onboarding - check for resume opportunities
  useEffect(() => {
    const initializeOnboarding = async () => {
      // Check if we have a domainId from URL params (for resuming)
      const urlDomainId = searchParams.get('domainId');
      if (urlDomainId) {
        const domainIdNum = parseInt(urlDomainId);
        if (domainIdNum > 0) {
          setIsCheckingResume(true);
          try {
            console.log('Checking resume for domainId:', domainIdNum);
            const resumeCheck = await onboardingService.checkResume(domainIdNum);
            console.log('Resume check result:', resumeCheck);
            
            if (resumeCheck.canResume) {
              setShowResumeDialog(true);
              setDomainId(domainIdNum);
              setResumeData(resumeCheck.stepData || null);
            } else if (resumeCheck.redirectTo) {
              // Redirect to dashboard if completed
              console.log('Redirecting to dashboard:', resumeCheck.redirectTo);
              window.location.href = resumeCheck.redirectTo;
              return;
            } else {
              console.log('Cannot resume:', resumeCheck.reason);
              // If cannot resume, start fresh but keep the domainId if available
              if (resumeCheck.stepData?.domain) {
                setDomain(resumeCheck.stepData.domain);
              }
              if (resumeCheck.stepData?.domainId) {
                setDomainId(resumeCheck.stepData.domainId);
              }
            }
          } catch (error) {
            console.error('Failed to check resume status:', error);
            // On error, continue with fresh start
          } finally {
            setIsCheckingResume(false);
          }
        }
      }
      setIsInitialized(true);
    };

    initializeOnboarding();
  }, [searchParams]);

  // Auto-save progress when state changes
  useEffect(() => {
    if (domainId > 0 && isInitialized && !isCheckingResume && currentStep > 0) {
      const stepData: OnboardingStepData = {
        domain,
        domainId,
        brandContext,
        selectedKeywords,
        generatedPhrases,
        queryResults,
        queryStats
      };

      console.log('Auto-saving progress for step:', currentStep, 'data:', stepData);
      
      // Save to onboarding progress for resume capability
      onboardingService.autoSaveProgress(domainId, currentStep, stepData);
      
      // Also save to main domain tables for dashboard access
      saveToMainTables(domainId, stepData);
    }

    // Cleanup auto-save on unmount
    return () => {
      onboardingService.cancelAutoSave();
    };
  }, [domainId, currentStep, domain, brandContext, selectedKeywords, generatedPhrases, queryResults, queryStats, isInitialized, isCheckingResume]);

  // Function to save data to main domain tables
  const saveToMainTables = async (domainId: number, stepData: OnboardingStepData) => {
    try {
      console.log('Saving onboarding data to main domain tables...');
      const response = await fetch(`https://phrase-score-insight.onrender.com/api/onboarding/save-to-main/${domainId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stepData)
      });
      
      if (!response.ok) {
        console.error('Failed to save to main tables:', await response.text());
      } else {
        console.log('Successfully saved to main domain tables');
      }
    } catch (error) {
      console.error('Error saving to main tables:', error);
    }
  };

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      
      // Save progress immediately when moving to next step
      if (domainId > 0) {
        const stepData: OnboardingStepData = {
          domain,
          domainId,
          brandContext,
          selectedKeywords,
          generatedPhrases,
          queryResults,
          queryStats
        };
        
        try {
          console.log('Saving progress for step:', newStep);
          await onboardingService.saveProgress(domainId, newStep, stepData);
          await saveToMainTables(domainId, stepData);
        } catch (error) {
          console.error('Failed to save progress:', error);
        }
      }
    }
  };

  const prevStep = async () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      
      // Save progress when going back
      if (domainId > 0) {
        const stepData: OnboardingStepData = {
          domain,
          domainId,
          brandContext,
          selectedKeywords,
          generatedPhrases,
          queryResults,
          queryStats
        };
        
        try {
          await onboardingService.saveProgress(domainId, newStep, stepData);
          await saveToMainTables(domainId, stepData);
        } catch (error) {
          console.error('Failed to save progress:', error);
        }
      }
    }
  };

  const completeAnalysis = async () => {
    if (domainId > 0) {
      // Mark onboarding as completed
      const stepData: OnboardingStepData = {
        domain,
        domainId,
        brandContext,
        selectedKeywords,
        generatedPhrases,
        queryResults,
        queryStats
      };
      
      try {
        // Save progress and mark as completed
        await onboardingService.saveProgress(domainId, currentStep, stepData, true);
        
        // Save to main tables (this ensures dashboard has access to data)
        await saveToMainTables(domainId, stepData);
      } catch (error) {
        console.error('Failed to mark onboarding as complete:', error);
      }
    }
    
    navigate(`/dashboard/${domainId}`);
  };

  const handleResume = async (stepData: OnboardingStepData, resumeStep: number) => {
    console.log('Resuming with data:', stepData, 'step:', resumeStep);
    
    // Restore state from saved data with proper validation
    if (stepData.domain) {
      setDomain(stepData.domain);
      console.log('Restored domain:', stepData.domain);
    }
    
    if (stepData.domainId) {
      setDomainId(stepData.domainId);
      console.log('Restored domainId:', stepData.domainId);
    }
    
    if (stepData.brandContext) {
      setBrandContext(stepData.brandContext);
      console.log('Restored brandContext');
    }
    
    if (stepData.selectedKeywords && Array.isArray(stepData.selectedKeywords)) {
      setSelectedKeywords(stepData.selectedKeywords);
      console.log('Restored selectedKeywords:', stepData.selectedKeywords.length);
    }
    
    if (stepData.generatedPhrases && Array.isArray(stepData.generatedPhrases)) {
      setGeneratedPhrases(stepData.generatedPhrases);
      console.log('Restored generatedPhrases:', stepData.generatedPhrases.length);
    }
    
    if (stepData.queryResults && Array.isArray(stepData.queryResults)) {
      setQueryResults(stepData.queryResults);
      console.log('Restored queryResults:', stepData.queryResults.length);
    }
    
    if (stepData.queryStats) {
      setQueryStats(stepData.queryStats);
      console.log('Restored queryStats');
    }
    
    setCurrentStep(resumeStep);
    setShowResumeDialog(false);
    setResumeData(null);
    
    console.log('Resume completed. Current state:', {
      currentStep: resumeStep,
      domain,
      domainId: stepData.domainId,
      hasBrandContext: !!stepData.brandContext,
      keywordsCount: stepData.selectedKeywords?.length || 0,
      phrasesCount: stepData.generatedPhrases?.length || 0,
      resultsCount: stepData.queryResults?.length || 0
    });
  };

  const handleReset = () => {
    console.log('Resetting onboarding state');
    // Reset all state
    setCurrentStep(0);
    setDomain('');
    setSubdomains([]);
    setDomainId(0);
    setBrandContext('');
    setSelectedKeywords([]);
    setGeneratedPhrases([]);
    setQueryResults([]);
    setQueryStats(null);
    setShowResumeDialog(false);
    setResumeData(null);
  };

  const handleCancelResume = () => {
    setShowResumeDialog(false);
    navigate('/');
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Show loading state while checking resume status
  if (isCheckingResume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto bg-blue-100 flex items-center justify-center"></div>
          <p className="mt-4 text-gray-600">Checking for previous sessions...</p>
        </div>
      </div>
    );
  }

  // Show resume dialog if available
  if (showResumeDialog && domainId > 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <ResumeOnboarding
          domainId={domainId}
          onResume={handleResume}
          onReset={handleReset}
          onCancel={handleCancelResume}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Top */}
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  AI Visibility Analysis
                </h1>
                <p className="text-sm text-slate-600">
                  Comprehensive brand analysis across AI models
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-slate-600 border-slate-300">
                Step {currentStep + 1} of {steps.length}
              </Badge>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">
                  {Math.round(progressPercentage)}% Complete
                </div>
              </div>
              <Button
                variant="outline"
                className="ml-4 px-4 py-2 border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700"
                onClick={() => navigate('/')}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Enhanced Progress Section */}
          <div className="pb-6">

            {/* Step Indicators */}
            <div className="relative">
              <div className="flex justify-between items-start">
                {steps.map((step, index) => {
                  const status = getStepStatus(index);
                  return (
                    <div 
                      key={step.id}
                      className="flex flex-col items-center relative group"
                      style={{ width: `${100 / steps.length}%` }}
                    >
                      {/* Step Circle */}
                      <div className={`
                        relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${status === 'completed' 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : status === 'active'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-white border-slate-300 text-slate-400'
                        }
                      `}>
                        {status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : status === 'active' ? (
                          <Clock className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                        
                        {/* Active Step Pulse */}
                        {status === 'active' && (
                          <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="mt-3 text-center max-w-24">
                        <div className={`
                          text-xs font-semibold mb-1 transition-colors duration-300
                          ${status === 'completed' 
                            ? 'text-green-700' 
                            : status === 'active'
                            ? 'text-blue-700'
                            : 'text-slate-500'
                          }
                        `}>
                          {step.title}
                        </div>
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className={`
                          absolute top-5 left-[60%] w-full h-0.5 transition-colors duration-500
                          ${index < currentStep ? 'bg-green-400' : 'bg-slate-200'}
                        `} style={{ width: 'calc(100% - 40px)' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentStep === 0 && (
        <DomainSubmission 
          domain={domain} 
          setDomain={setDomain}
          subdomains={subdomains}
          setSubdomains={setSubdomains}
          customPaths={customPaths}
          setCustomPaths={setCustomPaths}
          onNext={nextStep} 
        />
      )}
      {currentStep === 1 && (
        <DomainExtraction 
          domain={domain}
          subdomains={subdomains}
          setDomainId={setDomainId}
          domainId={domainId}
          setBrandContext={setBrandContext}
          customPaths={customPaths}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
        {currentStep === 2 && domainId > 0 && (
          <KeywordDiscovery 
            domainId={domainId}
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 3 && (
          <PhraseGeneration 
            domainId={domainId}
            generatedPhrases={generatedPhrases}
            setGeneratedPhrases={setGeneratedPhrases}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 4 && (
          <AIQueryResults 
            domainId={domainId}
            phrases={generatedPhrases}
            setQueryResults={setQueryResults}
            setQueryStats={setQueryStats}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 5 && (
          <ResponseScoring 
            queryResults={queryResults}
            queryStats={queryStats}
            onNext={completeAnalysis}
            onPrev={prevStep}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
