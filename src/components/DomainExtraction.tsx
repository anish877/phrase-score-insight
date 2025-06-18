
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [currentStep, setCurrentStep] = useState('Initializing...');
  const [extractedContext, setExtractedContext] = useState('');

  useEffect(() => {
    const simulateExtraction = async () => {
      const steps = [
        { text: 'Crawling domain content...', duration: 2000 },
        { text: 'Analyzing with GPT-4o...', duration: 2500 },
        { text: 'Extracting brand context...', duration: 1500 },
        { text: 'Finalizing analysis...', duration: 1000 }
      ];

      let totalProgress = 0;
      const progressIncrement = 100 / steps.length;

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i].text);
        await new Promise(resolve => setTimeout(resolve, steps[i].duration));
        totalProgress += progressIncrement;
        setProgress(totalProgress);
      }

      // Mock brand context
      const mockContext = `${domain} is a comprehensive digital platform that specializes in innovative solutions for modern businesses. The company focuses on delivering high-quality services through cutting-edge technology and user-centric design. With a strong emphasis on scalability and performance, ${domain} serves clients across various industries, helping them achieve their digital transformation goals through advanced tools and strategic consulting services.`;
      
      setExtractedContext(mockContext);
      setBrandContext(mockContext);
      setIsLoading(false);
    };

    simulateExtraction();
  }, [domain, setBrandContext]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Domain Context Extraction
        </h2>
        <p className="text-lg text-slate-600">
          Analyzing {domain} to understand your brand context
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            AI Analysis in Progress
          </CardTitle>
          <CardDescription>
            Using GPT-4o to extract comprehensive brand context from your domain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{currentStep}</span>
                  <span className="text-slate-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center text-green-600 mb-4">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Analysis Complete</span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Brand Context Summary</h3>
                <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-slate-700 leading-relaxed">{extractedContext}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">247</div>
                  <div className="text-sm text-slate-600">Pages Analyzed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1.8s</div>
                  <div className="text-sm text-slate-600">Processing Time</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-slate-600">Confidence Score</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onPrev} disabled={isLoading}>
              Back
            </Button>
            <Button 
              onClick={onNext} 
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Continue to Keyword Discovery
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainExtraction;
