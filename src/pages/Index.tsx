
import React, { useState } from 'react';
import DomainSubmission from '../components/DomainSubmission';
import DomainExtraction from '../components/DomainExtraction';
import KeywordDiscovery from '../components/KeywordDiscovery';
import PhraseGeneration from '../components/PhraseGeneration';
import AIQueryResults from '../components/AIQueryResults';
import ResponseScoring from '../components/ResponseScoring';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [domain, setDomain] = useState('');
  const [brandContext, setBrandContext] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [generatedPhrases, setGeneratedPhrases] = useState<Array<{keyword: string, phrases: string[]}>>([]);
  const [queryResults, setQueryResults] = useState<any[]>([]);

  const steps = [
    'Domain Submission',
    'Context Extraction', 
    'Keyword Discovery',
    'Phrase Generation',
    'AI Query Results',
    'Response Scoring',
    'Dashboard'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Visibility & SEO Monitoring Platform
            </h1>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              {steps.map((step, index) => (
                <span key={index} className={`${index <= currentStep ? 'text-purple-600 font-medium' : ''}`}>
                  {step}
                </span>
              ))}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
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
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 6 && (
          <Dashboard 
            domain={domain}
            brandContext={brandContext}
            keywords={selectedKeywords}
            phrases={generatedPhrases}
            queryResults={queryResults}
            onPrev={prevStep}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
