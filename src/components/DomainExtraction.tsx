import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Brain, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface DomainExtractionProps {
  domain: string;
  setDomainId: (id: number) => void;
  domainId: number;
  setBrandContext: (context: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DomainExtraction: React.FC<DomainExtractionProps> = ({ 
  domain, 
  setDomainId,
  setBrandContext, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing analysis...');
  const [typingStep, setTypingStep] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [analysisDetails, setAnalysisDetails] = useState({
    pagesScanned: 0,
    contentBlocks: 0,
    keyEntities: 0,
    confidenceScore: 0
  });
  const [extractedContext, setExtractedContext] = useState('');
  const [responseTime, setResponseTime] = useState(0);
  const startTimeRef = useRef(Date.now());

  const phases = [
    { id: 'discovery', name: 'Domain Discovery', icon: <Globe className="h-5 w-5" /> },
    { id: 'content', name: 'Content Analysis', icon: <FileText className="h-5 w-5" /> },
    { id: 'ai_processing', name: 'AI Processing', icon: <Brain className="h-5 w-5" /> },
    { id: 'validation', name: 'Validation', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  // Typing animation effect
  useEffect(() => {
    if (currentStep !== typingStep) {
      setTypingIndex(0);
      setTypingStep('');
    }
  }, [currentStep]);

  useEffect(() => {
    if (typingIndex < currentStep.length) {
      const timeout = setTimeout(() => {
        setTypingStep(currentStep.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 20 + Math.random() * 10);
      return () => clearTimeout(timeout);
    } else {
        setTypingStep(currentStep)
    }
  }, [typingIndex, currentStep]);

  useEffect(() => {
    if (!domain) {
      setError('Domain not provided.');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const processStream = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/domain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: domain }),
          signal: controller.signal,
        });

        if (!response.body) {
          throw new Error('Response body is empty.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || ''; // Keep the last, possibly incomplete line

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonString = line.substring(6);
              const data = JSON.parse(jsonString);

              // Process the event data
              switch (data.type) {
                case 'domain_created': {
                  setDomainId(data.domainId);
                  console.log('Set domainId:', data.domainId);
                  break;
                }
                case 'progress': {
                  if (data.step) setCurrentStep(data.step);
                  if (data.progress) setProgress(data.progress);
                  if (data.phase) {
                    const phaseIndex = phases.findIndex(p => p.id === data.phase);
                    if (phaseIndex !== -1) setCurrentPhase(phaseIndex);
                  }
                  if (data.stats) {
                      setAnalysisDetails(prev => ({ ...prev, ...data.stats }));
                  }
                  break;
                }
                case 'complete': {
                  const finalResult = data.result.extraction;
                  setAnalysisDetails({
                      pagesScanned: finalResult.pagesScanned,
                      contentBlocks: finalResult.contentBlocks,
                      keyEntities: finalResult.keyEntities,
                      confidenceScore: finalResult.confidenceScore,
                  });
                  setExtractedContext(finalResult.extractedContext);
                  setBrandContext(finalResult.extractedContext);
                  setCurrentStep('Analysis complete!');
                  setProgress(100);
                  setIsLoading(false);
                  setResponseTime(Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1)));
                  return; // Exit the loop
                }
                case 'error': {
                  setError(data.details || data.error || 'An unknown error occurred during analysis.');
                  setIsLoading(false);
                  return; // Exit the loop
                }
              }
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Stream processing error:', err);
          setError('Failed to connect to the analysis service.');
          setIsLoading(false);
        }
      }
    };

    processStream();

    return () => {
      controller.abort();
    };
  }, [domain, setDomainId, setBrandContext]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <Button onClick={onPrev} variant="outline">
                Go Back
            </Button>
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
             {isLoading ? <Loader2 className="h-6 w-6 text-white animate-spin" /> : <CheckCircle className="h-6 w-6 text-white" />}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          {isLoading ? 'Intelligent Brand Context Extraction' : 'Analysis Complete'}
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          {isLoading ? <>Our AI system is analyzing <span className="font-semibold text-blue-600">{domain}</span> to understand your brand's digital presence and context.</> : 'Your comprehensive brand analysis is ready.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analysis Panel */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 min-h-[500px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isLoading ? (phases[currentPhase]?.icon) : <CheckCircle className="h-5 w-5 text-green-600" />}
                  <div>
                    <CardTitle className="text-xl text-slate-900">
                      {isLoading ? phases[currentPhase]?.name : 'Analysis Complete'}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {isLoading ? 'Processing your domain with real-time AI analysis' : `Brand context successfully extracted in ${responseTime}s`}
                    </CardDescription>
                  </div>
                </div>
                {!isLoading && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <>
                  {/* Progress Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">
                        {typingStep}
                        {typingIndex < currentStep.length && (
                          <span className="animate-pulse text-blue-600">|</span>
                        )}
                      </span>
                      <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Phase Indicators */}
                  <div className="grid grid-cols-4 gap-4">
                    {phases.map((phase, index) => (
                      <div 
                        key={index}
                        className={`text-center p-3 rounded-lg border-2 transition-all ${
                          index < currentPhase ? 'border-green-200 bg-green-50' :
                          index === currentPhase ? 'border-blue-200 bg-blue-50' :
                          'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className={`flex justify-center mb-2 ${
                          index < currentPhase ? 'text-green-600' :
                          index === currentPhase ? 'text-blue-600 animate-pulse' :
                          'text-slate-400'
                        }`}>
                          {phase.icon}
                        </div>
                        <div className={`text-xs font-medium ${
                          index < currentPhase ? 'text-green-800' :
                          index === currentPhase ? 'text-blue-800' :
                          'text-slate-600'
                        }`}>
                          {phase.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Real-time Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                     <StatCard title="Pages Scanned" value={analysisDetails.pagesScanned} color="blue" isLoading={isLoading} />
                     <StatCard title="Content Blocks" value={analysisDetails.contentBlocks} color="green" isLoading={isLoading} />
                     <StatCard title="Key Entities" value={analysisDetails.keyEntities} color="purple" isLoading={isLoading} />
                     <StatCard title="Confidence" value={`${analysisDetails.confidenceScore}%`} color="orange" isLoading={isLoading} />
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {/* Success Header */}
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Brand Context Successfully Extracted</h3>
                      <p className="text-sm text-green-600">High-quality analysis completed with {analysisDetails.confidenceScore}% confidence</p>
                    </div>
                  </div>
                  
                  {/* Context Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Brand Context Summary</h3>
                    <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-500">
                      <p className="text-slate-700 leading-relaxed">{extractedContext}</p>
                    </div>
                  </div>

                  {/* Final Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <StatCard title="Pages Analyzed" value={analysisDetails.pagesScanned} color="blue" />
                     <StatCard title="Avg Response Time" value={`${responseTime}s`} color="green" />
                     <StatCard title="Key Entities Found" value={analysisDetails.keyEntities} color="purple" />
                     <StatCard title="Confidence Score" value={`${analysisDetails.confidenceScore}%`} color="orange" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Technical Details Sidebar */}
        <div className="space-y-6">
          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Analysis Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Target Domain</span>
                  <Badge variant="secondary" className="font-mono text-xs">{domain}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">AI Model</span>
                  <Badge className="bg-blue-100 text-blue-800">Gemini 1.5 Flash</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isLoading && (
            <Card className="border border-blue-200 bg-blue-50 animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">Next Steps</h4>
                    <p className="text-sm text-blue-700">
                      We'll now use this context to discover relevant keywords for AI visibility analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev} disabled={isLoading} className="px-8">
          Previous Step
        </Button>
        <Button 
          onClick={() => {
            console.log('Continue button clicked');
            onNext();
          }}
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
        >
          {isLoading ? 'Analysis in Progress...' : 'Continue to Keyword Discovery'}
        </Button>
      </div>
    </div>
  );
};

// A helper component for displaying stats
const StatCard = ({ title, value, color, isLoading = false }: { title: string, value: string | number, color: string, isLoading?: boolean }) => {
    const colors = {
        blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600' },
        green: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600' },
        orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600' },
    };
    const c = colors[color as keyof typeof colors] || colors.blue;

    return (
        <div className={`text-center p-4 ${c.bg} rounded-lg border ${c.border} transition-all duration-300 hover:shadow-md`}>
            <div className={`text-2xl font-bold ${c.text} transition-all duration-500`}>
                {value}
                {isLoading && Number(value) > 0 && (
                  <span className={`text-xs ${c.text} opacity-70 ml-1 animate-pulse`}>+</span>
                )}
            </div>
            <div className="text-xs text-slate-600">{title}</div>
        </div>
    );
};


export default DomainExtraction;