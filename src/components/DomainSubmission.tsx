import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Shield, TrendingUp, Clock } from 'lucide-react';

interface DomainSubmissionProps {
  domain: string;
  setDomain: (domain: string) => void;
  onNext: () => void;
  customPaths?: string[];
  setCustomPaths?: (paths: string[]) => void;
  subdomains?: string[];
  setSubdomains?: (subdomains: string[]) => void;
}

const DomainSubmission: React.FC<DomainSubmissionProps> = ({ 
  domain, 
  setDomain, 
  onNext,
  customPaths: customPathsProp,
  setCustomPaths: setCustomPathsProp,
  subdomains,
  setSubdomains
}) => {
  const [domainError, setDomainError] = useState('');
  const [customPaths, setCustomPaths] = useState<string[]>(customPathsProp || []);
  const [customPathInput, setCustomPathInput] = useState('');
  const [customPathsError, setCustomPathsError] = useState('');

  useEffect(() => {
    if (customPathsProp && setCustomPathsProp) {
      setCustomPaths(customPathsProp);
    }
  }, [customPathsProp]);

  const validateDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    setDomainError('');
    if (value && !validateDomain(value)) {
      setDomainError('Please enter a valid domain (e.g., example.com)');
    }
  };

  const addCustomPath = (raw: string) => {
    let value = raw.trim();
    if (!value.startsWith('/')) {
      setCustomPathsError('Path must start with "/"');
      return;
    }
    if (customPaths.includes(value)) {
      setCustomPathsError('Path already added');
      return;
    }
    setCustomPaths([...customPaths, value]);
    if (setCustomPathsProp) setCustomPathsProp([...customPaths, value]);
    setCustomPathInput('');
    setCustomPathsError('');
  };

  const removeCustomPath = (path: string) => {
    const updated = customPaths.filter(p => p !== path);
    setCustomPaths(updated);
    if (setCustomPathsProp) setCustomPathsProp(updated);
  };

  const handleCustomPathInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPathInput(e.target.value);
    setCustomPathsError('');
  };

  const handleCustomPathKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (customPathInput.trim()) {
        addCustomPath(customPathInput);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !!domainError) return;
    onNext();
  };

  const features = [
    {
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      title: "AI Visibility Analysis",
      description: "Comprehensive analysis across 15+ AI models including GPT, Claude, and Gemini"
    },
    {
      icon: <Shield className="h-5 w-5 text-green-600" />,
      title: "Brand Protection",
      description: "Monitor how AI systems represent your brand and identify potential risks"
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      title: "Real-time Monitoring",
      description: "Continuous tracking with automated alerts for significant changes"
    }
  ];

  const testimonials = [
    {
      company: "TechCorp",
      logo: "TC",
      quote: "Increased our AI visibility score by 40% in just 3 months",
      industry: "Technology"
    },
    {
      company: "HealthPlus",
      logo: "HP",
      quote: "Essential for understanding our digital brand presence",
      industry: "Healthcare"
    },
    {
      company: "FinanceHub",
      logo: "FH",
      quote: "Game-changing insights for our marketing strategy",
      industry: "Finance"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Globe className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          AI Visibility Intelligence Platform
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Understand, monitor, and optimize how AI systems represent your brand. 
          Get comprehensive insights across the AI ecosystem with enterprise-grade analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl text-slate-900 mb-2">Start Your Analysis</CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Enter your domain to begin comprehensive AI visibility analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label htmlFor="domain" className="block text-sm font-semibold text-slate-700 mb-3">
                    Domain Name
                  </label>
                  <div className="relative">
                    <Input
                      id="domain"
                      type="text"
                      placeholder="yourdomain.com"
                      value={domain}
                      onChange={(e) => handleDomainChange(e.target.value)}
                      className={`h-14 text-lg px-4 border-2 transition-all duration-200 ${
                        domainError 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                      required
                    />
                    {domain && !domainError && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {domainError && (
                    <p className="text-sm text-red-600 mt-2">{domainError}</p>
                  )}
                  <p className="text-sm text-slate-500">
                    Enter without http:// or https:// (e.g., example.com)
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="custom-paths" className="block text-sm font-semibold text-slate-700 mb-1">
                    Custom Relevant Paths (optional)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="custom-paths"
                      type="text"
                      placeholder="Type a path (e.g. /about) and press Enter"
                      value={customPathInput}
                      onChange={handleCustomPathInput}
                      onKeyDown={handleCustomPathKeyDown}
                      className="h-12 text-base px-4 border-2 transition-all duration-200 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button type="button" onClick={() => customPathInput.trim() && addCustomPath(customPathInput)} disabled={!customPathInput.trim()} className="h-12">Add</Button>
                  </div>
                  <p className="text-xs text-slate-400">Add any number of relevant paths to prioritize during crawling. Each must start with '/'.</p>
                  {customPathsError && <p className="text-sm text-red-600 mt-1">{customPathsError}</p>}
                  {customPaths.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {customPaths.map((p, idx) => (
                        <Badge key={idx} className="bg-purple-100 text-purple-800 border-purple-200 cursor-pointer" onClick={() => removeCustomPath(p)} title="Remove">
                          {p} <span className="ml-1 text-xs">×</span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Analysis Preview */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">What we'll analyze:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-700">Brand mentions across AI models</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Keyword performance analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700">Competitive positioning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-700">Content recommendations</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-200"
                  disabled={!domain.trim() || !!domainError}
                >
                  Begin AI Visibility Analysis
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Platform Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trust Indicators */}
        </div>
      </div>
    </div>
  );
};

export default DomainSubmission;
