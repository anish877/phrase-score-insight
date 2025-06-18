
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DomainSubmission from '../components/DomainSubmission';
import DomainExtraction from '../components/DomainExtraction';
import KeywordDiscovery from '../components/KeywordDiscovery';
import PhraseGeneration from '../components/PhraseGeneration';
import AIQueryResults from '../components/AIQueryResults';
import ResponseScoring from '../components/ResponseScoring';

const Index = () => {
  const navigate = useNavigate();
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
    'Response Scoring'
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
    // Navigate to the domain dashboard after analysis is complete
    navigate(`/dashboard/${domain}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Visibility Analysis
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              {steps.map((step, index) => (
                <span key={index} className={`font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step}
                </span>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
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
            onNext={completeAnalysis}
            onPrev={prevStep}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
