
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DomainSubmissionProps {
  domain: string;
  setDomain: (domain: string) => void;
  onNext: () => void;
}

const DomainSubmission: React.FC<DomainSubmissionProps> = ({ domain, setDomain, onNext }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Analyze Your Domain's AI Visibility
        </h2>
        <p className="text-lg text-slate-600">
          Enter your domain to discover how AI models respond to queries about your brand
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Domain Analysis</CardTitle>
          <CardDescription>
            Start by entering the domain you want to analyze for AI visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-slate-700 mb-2">
                Domain Name
              </label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="text-lg py-3"
                required
              />
              <p className="mt-2 text-sm text-slate-500">
                Enter without http:// or https://
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg"
              disabled={isSubmitting || !domain.trim()}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Start Analysis'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 mb-4">Trusted by leading brands</p>
        <div className="flex justify-center space-x-8 opacity-50">
          <div className="bg-slate-200 px-4 py-2 rounded text-slate-600 font-medium">Brand A</div>
          <div className="bg-slate-200 px-4 py-2 rounded text-slate-600 font-medium">Brand B</div>
          <div className="bg-slate-200 px-4 py-2 rounded text-slate-600 font-medium">Brand C</div>
        </div>
      </div>
    </div>
  );
};

export default DomainSubmission;
