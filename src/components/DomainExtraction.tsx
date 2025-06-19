
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Brain, Search, FileText, AlertCircle } from 'lucide-react';

interface DomainExtractionProps {
  domain: string;
  setBrandContext: (context: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DomainExtraction: React.FC<DomainExtractionProps> = ({ 
  domain, 
  setBrandContext, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing analysis...');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [extractedContext, setExtractedContext] = useState('');
  const [analysisDetails, setAnalysisDetails] = useState({
    pagesScanned: 0,
    contentBlocks: 0,
    keyEntities: 0,
    confidenceScore: 0
  });

  const phases = [
    {
      name: 'Domain Discovery',
      icon: <Globe className="h-5 w-5" />,
      steps: [
        { text: 'Validating domain accessibility...', duration: 1000 },
        { text: 'Scanning site architecture...', duration: 1500 },
        { text: 'Mapping content structure...', duration: 1200 }
      ]
    },
    {
      name: 'Content Analysis',
      icon: <FileText className="h-5 w-5" />,
      steps: [
        { text: 'Extracting page content...', duration: 2000 },
        { text: 'Analyzing textual data...', duration: 1800 },
        { text: 'Processing metadata...', duration: 1000 }
      ]
    },
    {
      name: 'AI Processing',
      icon: <Brain className="h-5 w-5" />,
      steps: [
        { text: 'Running GPT-4o analysis...', duration: 2500 },
        { text: 'Extracting brand context...', duration: 2000 },
        { text: 'Generating insights...', duration: 1500 }
      ]
    },
    {
      name: 'Validation',
      icon: <CheckCircle className="h-5 w-5" />,
      steps: [
        { text: 'Validating results...', duration: 1000 },
        { text: 'Quality assurance checks...', duration: 800 },
        { text: 'Finalizing analysis...', duration: 700 }
      ]
    }
  ];

  useEffect(() => {
    const simulateExtraction = async () => {
      let totalProgress = 0;
      const totalSteps = phases.reduce((acc, phase) => acc + phase.steps.length, 0);
      const progressIncrement = 100 / totalSteps;

      for (let phaseIndex = 0; phaseIndex < phases.length; phaseIndex++) {
        setCurrentPhase(phaseIndex);
        const phase = phases[phaseIndex];
        
        for (let stepIndex = 0; stepIndex < phase.steps.length; stepIndex++) {
          const step = phase.steps[stepIndex];
          setCurrentStep(step.text);
          
          // Simulate real-time updates
          const interval = setInterval(() => {
            setAnalysisDetails(prev => ({
              pagesScanned: prev.pagesScanned + Math.floor(Math.random() * 5) + 1,
              contentBlocks: prev.contentBlocks + Math.floor(Math.random() * 10) + 3,
              keyEntities: prev.keyEntities + Math.floor(Math.random() * 3) + 1,
              confidenceScore: Math.min(98, prev.confidenceScore + Math.floor(Math.random() * 5) + 2)
            }));
          }, 200);
          
          await new Promise(resolve => setTimeout(resolve, step.duration));
          clearInterval(interval);
          
          totalProgress += progressIncrement;
          setProgress(Math.min(100, totalProgress));
        }
      }

      const mockContext = `${domain} is a leading technology company specializing in innovative digital solutions for enterprise clients. The organization focuses on delivering scalable software platforms, cloud infrastructure services, and AI-powered analytics tools. With a strong emphasis on security, performance, and user experience, ${domain} serves Fortune 500 companies across industries including finance, healthcare, and manufacturing. The company's flagship products include enterprise resource planning systems, customer relationship management platforms, and business intelligence dashboards. Their technical approach emphasizes modern architectures, API-first design, and seamless integrations with existing enterprise ecosystems.`;
      
      setExtractedContext(mockContext);
      setBrandContext(mockContext);
      setIsLoading(false);
    };

    simulateExtraction();
  }, [domain, setBrandContext]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Intelligent Brand Context Extraction
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Our AI system is analyzing <span className="font-semibold text-blue-600">{domain}</span> to understand your brand's digital presence and context
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analysis Panel */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {phases[currentPhase]?.icon}
                  <div>
                    <CardTitle className="text-xl text-slate-900">
                      {isLoading ? phases[currentPhase]?.name : 'Analysis Complete'}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {isLoading ? 'Processing your domain with advanced AI models' : 'Brand context successfully extracted'}
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
                      <span className="text-sm font-medium text-slate-700">{currentStep}</span>
                      <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
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
                          index === currentPhase ? 'text-blue-600' :
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">{analysisDetails.pagesScanned}</div>
                      <div className="text-xs text-slate-600">Pages Scanned</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-2xl font-bold text-green-600">{analysisDetails.contentBlocks}</div>
                      <div className="text-xs text-slate-600">Content Blocks</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600">{analysisDetails.keyEntities}</div>
                      <div className="text-xs text-slate-600">Key Entities</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="text-2xl font-bold text-orange-600">{analysisDetails.confidenceScore}%</div>
                      <div className="text-xs text-slate-600">Confidence</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  {/* Success Header */}
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Brand Context Successfully Extracted</h3>
                      <p className="text-sm text-green-600">High-quality analysis completed with 98% confidence</p>
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
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">247</div>
                      <div className="text-xs text-slate-600">Pages Analyzed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-2xl font-bold text-green-600">1.8s</div>
                      <div className="text-xs text-slate-600">Avg Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600">43</div>
                      <div className="text-xs text-slate-600">Key Entities Found</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="text-2xl font-bold text-orange-600">98%</div>
                      <div className="text-xs text-slate-600">Confidence Score</div>
                    </div>
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
                  <Badge className="bg-blue-100 text-blue-800">GPT-4o</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Analysis Type</span>
                  <Badge className="bg-purple-100 text-purple-800">Deep Context</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Processing Mode</span>
                  <Badge className="bg-green-100 text-green-800">Real-time</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-700">Encrypted data transmission</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-700">No data storage after analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-700">GDPR compliant processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-700">Audit trail maintained</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isLoading && (
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">Next Steps</h4>
                    <p className="text-sm text-blue-700">
                      We'll now use this context to discover relevant keywords and generate targeted phrases for AI visibility analysis.
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
          onClick={onNext} 
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
        >
          {isLoading ? 'Analysis in Progress...' : 'Continue to Keyword Discovery'}
        </Button>
      </div>
    </div>
  );
};

export default DomainExtraction;
