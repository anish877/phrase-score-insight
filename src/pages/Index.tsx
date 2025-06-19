
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DomainSubmission from '../components/DomainSubmission';
import DomainExtraction from '../components/DomainExtraction';
import KeywordDiscovery from '../components/KeywordDiscovery';
import PhraseGeneration from '../components/PhraseGeneration';
import AIQueryResults from '../components/AIQueryResults';
import ResponseScoring from '../components/ResponseScoring';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [domain, setDomain] = useState('');
  const [brandContext, setBrandContext] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [generatedPhrases, setGeneratedPhrases] = useState<Array<{keyword: string, phrases: string[]}>>([]);
  const [queryResults, setQueryResults] = useState<any[]>([]);

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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeAnalysis = () => {
    navigate(`/dashboard/${domain}`);
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

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
                <div className="text-xs text-slate-500">
                  Est. {steps[currentStep].estimatedTime} remaining
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Progress Section */}
          <div className="pb-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <Progress 
                value={progressPercentage} 
                className="h-2 bg-slate-200"
              />
            </div>

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
                        <div className="text-xs text-slate-500 leading-tight">
                          {step.description}
                        </div>
                        
                        {/* Time Estimate for Active Step */}
                        {status === 'active' && (
                          <Badge 
                            variant="secondary" 
                            className="mt-2 text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {step.estimatedTime}
                          </Badge>
                        )}
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
            onNext={nextStep}
          />
        )}
        {currentStep === 1 && (
          <DomainExtraction 
            domain={domain}
            setBrandContext={setBrandContext}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 2 && (
          <KeywordDiscovery 
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 3 && (
          <PhraseGeneration 
            keywords={selectedKeywords}
            generatedPhrases={generatedPhrases}
            setGeneratedPhrases={setGeneratedPhrases}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 4 && (
          <AIQueryResults 
            phrases={generatedPhrases}
            setQueryResults={setQueryResults}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 5 && (
          <ResponseScoring 
            queryResults={queryResults}
            onNext={completeAnalysis}
            onPrev={prevStep}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
