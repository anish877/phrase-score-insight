
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
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Analyze Your Domain's AI Visibility
        </h2>
        <p className="text-lg text-slate-600">
          Enter your domain to discover how AI models respond to queries about your brand
        </p>
      </div>

      <Card className="shadow-sm border border-slate-200">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-xl text-slate-900">Domain Analysis</CardTitle>
          <CardDescription className="text-slate-600">
            Start by entering the domain you want to analyze for AI visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-slate-700 mb-3">
                Domain Name
              </label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <p className="mt-2 text-sm text-slate-500">
                Enter without http:// or https://
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
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
        <div className="flex justify-center space-x-6 opacity-60">
          <div className="bg-slate-100 px-4 py-2 rounded-md text-slate-600 font-medium text-sm">Brand A</div>
          <div className="bg-slate-100 px-4 py-2 rounded-md text-slate-600 font-medium text-sm">Brand B</div>
          <div className="bg-slate-100 px-4 py-2 rounded-md text-slate-600 font-medium text-sm">Brand C</div>
        </div>
      </div>
    </div>
  );
};

export default DomainSubmission;
