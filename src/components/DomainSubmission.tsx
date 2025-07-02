import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Shield, TrendingUp, Clock, Plus, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DomainSubmissionProps {
  domain: string;
  setDomain: (domain: string) => void;
  onNext: () => void;
  customPaths?: string[];
  setCustomPaths?: (paths: string[]) => void;
  subdomains?: string[];
  setSubdomains?: (subdomains: string[]) => void;
  priorityUrls?: string[];
  setPriorityUrls?: (urls: string[]) => void;
  priorityPaths?: string[];
  setPriorityPaths?: (paths: string[]) => void;
}

const DomainSubmission: React.FC<DomainSubmissionProps> = ({ 
  domain, 
  setDomain, 
  onNext,
  customPaths: customPathsProp,
  setCustomPaths: setCustomPathsProp,
  subdomains,
  setSubdomains,
  priorityUrls: priorityUrlsProp,
  setPriorityUrls: setPriorityUrlsProp,
  priorityPaths: priorityPathsProp,
  setPriorityPaths: setPriorityPathsProp
}) => {
  const [domainError, setDomainError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priorityUrls, setPriorityUrls] = useState<string[]>(priorityUrlsProp || []);
  const [priorityUrlInput, setPriorityUrlInput] = useState('');
  const [priorityUrlError, setPriorityUrlError] = useState('');
  const [priorityPaths, setPriorityPaths] = useState<string[]>(priorityPathsProp || []);
  const [priorityPathInput, setPriorityPathInput] = useState('');
  const [priorityPathError, setPriorityPathError] = useState('');
  const [showBulkUrlInput, setShowBulkUrlInput] = useState(false);
  const [showBulkPathInput, setShowBulkPathInput] = useState(false);
  const [bulkUrlInput, setBulkUrlInput] = useState('');
  const [bulkPathInput, setBulkPathInput] = useState('');
  const { toast } = useToast();

  const validateDomainOrUrl = (value: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return domainRegex.test(value) || urlRegex.test(value);
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    setDomainError('');
    if (value && !validateDomainOrUrl(value)) {
      setDomainError('Please enter a valid domain (e.g., example.com) or full URL (e.g., https://example.com/page)');
    }
  };

  const isFullUrl = (domain: string) => domain.startsWith('http://') || domain.startsWith('https://');

  const validatePriorityUrl = (value: string) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return urlRegex.test(value);
  };

  const addPriorityUrl = (raw: string) => {
    let value = raw.trim();
    
    if (!validatePriorityUrl(value)) {
      setPriorityUrlError('Please enter a valid URL (e.g., https://example.com/page)');
      return;
    }
    
    if (priorityUrls.includes(value)) {
      setPriorityUrlError('URL already added');
      return;
    }
    
    const newPriorityUrls = [...priorityUrls, value];
    setPriorityUrls(newPriorityUrls);
    if (setPriorityUrlsProp) setPriorityUrlsProp(newPriorityUrls);
    setPriorityUrlInput('');
    setPriorityUrlError('');
  };

  const addBulkUrls = () => {
    if (!bulkUrlInput.trim()) return;
    
    const urls = bulkUrlInput
      .split(/[\n,]/)
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    let addedCount = 0;
    let errorCount = 0;
    
    urls.forEach(url => {
      if (validatePriorityUrl(url) && !priorityUrls.includes(url)) {
        const newPriorityUrls = [...priorityUrls, url];
        setPriorityUrls(newPriorityUrls);
        if (setPriorityUrlsProp) setPriorityUrlsProp(newPriorityUrls);
        addedCount++;
      } else {
        errorCount++;
      }
    });
    
    setBulkUrlInput('');
    setShowBulkUrlInput(false);
    
    if (addedCount > 0) {
      toast({ 
        title: 'URLs Added', 
        description: `Successfully added ${addedCount} URLs${errorCount > 0 ? `, ${errorCount} invalid URLs skipped` : ''}` 
      });
    } else if (errorCount > 0) {
      toast({ 
        title: 'No URLs Added', 
        description: 'All URLs were invalid or already added', 
        variant: 'destructive' 
      });
    }
  };

  const removePriorityUrl = (url: string) => {
    const newPriorityUrls = priorityUrls.filter(u => u !== url);
    setPriorityUrls(newPriorityUrls);
    if (setPriorityUrlsProp) setPriorityUrlsProp(newPriorityUrls);
  };

  const validatePriorityPath = (value: string) => {
    const pathRegex = /^\/[\w-./?%&=]*$/;
    return pathRegex.test(value);
  };

  const addPriorityPath = (raw: string) => {
    let value = raw.trim();
    
    if (!value.startsWith('/')) {
      value = `/${value}`;
    }
    
    if (!validatePriorityPath(value)) {
      setPriorityPathError('Please enter a valid path (e.g., /about, /services)');
      return;
    }
    
    if (priorityPaths.includes(value)) {
      setPriorityPathError('Path already added');
      return;
    }
    
    const newPriorityPaths = [...priorityPaths, value];
    setPriorityPaths(newPriorityPaths);
    if (setPriorityPathsProp) setPriorityPathsProp(newPriorityPaths);
    setPriorityPathInput('');
    setPriorityPathError('');
  };

  const addBulkPaths = () => {
    if (!bulkPathInput.trim()) return;
    
    const paths = bulkPathInput
      .split(/[\n,]/)
      .map(path => path.trim())
      .filter(path => path.length > 0);
    
    let addedCount = 0;
    let errorCount = 0;
    
    paths.forEach(path => {
      let value = path;
      if (!value.startsWith('/')) {
        value = `/${value}`;
      }
      
      if (validatePriorityPath(value) && !priorityPaths.includes(value)) {
        const newPriorityPaths = [...priorityPaths, value];
        setPriorityPaths(newPriorityPaths);
        if (setPriorityPathsProp) setPriorityPathsProp(newPriorityPaths);
        addedCount++;
      } else {
        errorCount++;
      }
    });
    
    setBulkPathInput('');
    setShowBulkPathInput(false);
    
    if (addedCount > 0) {
      toast({ 
        title: 'Paths Added', 
        description: `Successfully added ${addedCount} paths${errorCount > 0 ? `, ${errorCount} invalid paths skipped` : ''}` 
      });
    } else if (errorCount > 0) {
      toast({ 
        title: 'No Paths Added', 
        description: 'All paths were invalid or already added', 
        variant: 'destructive' 
      });
    }
  };

  const removePriorityPath = (path: string) => {
    const newPriorityPaths = priorityPaths.filter(p => p !== path);
    setPriorityPaths(newPriorityPaths);
    if (setPriorityPathsProp) setPriorityPathsProp(newPriorityPaths);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !!domainError) return;
    setIsLoading(true);
    try {
      const priorityPathsAsUrls = priorityPaths.map(path => `https://${domain}${path}`);
      const allPriorityUrls = [...priorityUrls, ...priorityPathsAsUrls];
      
      const response = await fetch('https://phrase-score-insight.onrender.com/api/domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: domain,
          subdomains: subdomains?.length > 0 ? subdomains : undefined,
          priorityUrls: allPriorityUrls.length > 0 ? allPriorityUrls : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit domain');
      }

      await onNext();
      toast({ title: 'Domain submitted', description: 'Domain analysis started successfully.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to submit domain. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
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
                      placeholder="yourdomain.com or https://yourdomain.com/page"
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
                    Enter a domain (e.g., example.com) or a full URL (e.g., https://example.com/page)
                  </p>
                </div>
                {domain && !domainError && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-700">
                        Priority URLs (Optional)
                      </label>
                      <p className="text-xs text-slate-500 mb-3">
                        Add specific full URLs to prioritize during crawling (e.g., https://example.com/page)
                      </p>
                      
                      {!showBulkUrlInput ? (
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter full URL (https://example.com/page)"
                            value={priorityUrlInput}
                            onChange={(e) => {
                              setPriorityUrlInput(e.target.value);
                              setPriorityUrlError('');
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (priorityUrlInput.trim()) {
                                  addPriorityUrl(priorityUrlInput);
                                }
                              }
                            }}
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            onClick={() => priorityUrlInput.trim() && addPriorityUrl(priorityUrlInput)}
                            disabled={!priorityUrlInput.trim()}
                            className="px-4"
                          >
                            Add URL
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowBulkUrlInput(true)}
                            className="px-4"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Bulk Add
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Enter multiple URLs, one per line or separated by commas&#10;https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                            value={bulkUrlInput}
                            onChange={(e) => setBulkUrlInput(e.target.value)}
                            className="min-h-[120px] resize-none"
                          />
                          <div className="flex gap-2">
                            <Button 
                              type="button" 
                              onClick={addBulkUrls}
                              disabled={!bulkUrlInput.trim()}
                              className="flex-1"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add All URLs
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => {
                                setShowBulkUrlInput(false);
                                setBulkUrlInput('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {priorityUrlError && (
                        <p className="text-sm text-red-600">{priorityUrlError}</p>
                      )}
                      {priorityUrls.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-600">Priority URLs ({priorityUrls.length}):</p>
                          <div className="flex flex-wrap gap-2">
                            {priorityUrls.map((url, index) => (
                              <Badge 
                                key={index} 
                                className="bg-blue-100 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-200"
                                onClick={() => removePriorityUrl(url)}
                              >
                                {url.length > 40 ? url.substring(0, 40) + '...' : url}
                                <span className="ml-1 text-xs">×</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-700">
                        Priority Paths (Optional)
                      </label>
                      <p className="text-xs text-slate-500 mb-3">
                        Add specific paths to prioritize during crawling (e.g., /about, /services)
                      </p>
                      
                      {!showBulkPathInput ? (
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter path (/about or about)"
                            value={priorityPathInput}
                            onChange={(e) => {
                              setPriorityPathInput(e.target.value);
                              setPriorityPathError('');
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (priorityPathInput.trim()) {
                                  addPriorityPath(priorityPathInput);
                                }
                              }
                            }}
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            onClick={() => priorityPathInput.trim() && addPriorityPath(priorityPathInput)}
                            disabled={!priorityPathInput.trim()}
                            className="px-4"
                          >
                            Add Path
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowBulkPathInput(true)}
                            className="px-4"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Bulk Add
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Enter multiple paths, one per line or separated by commas&#10;/about&#10;/services&#10;/contact"
                            value={bulkPathInput}
                            onChange={(e) => setBulkPathInput(e.target.value)}
                            className="min-h-[120px] resize-none"
                          />
                          <div className="flex gap-2">
                            <Button 
                              type="button" 
                              onClick={addBulkPaths}
                              disabled={!bulkPathInput.trim()}
                              className="flex-1"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add All Paths
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => {
                                setShowBulkPathInput(false);
                                setBulkPathInput('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {priorityPathError && (
                        <p className="text-sm text-red-600">{priorityPathError}</p>
                      )}
                      {priorityPaths.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-600">Priority Paths ({priorityPaths.length}):</p>
                          <div className="flex flex-wrap gap-2">
                            {priorityPaths.map((path, index) => (
                              <Badge 
                                key={index} 
                                className="bg-green-100 text-green-800 border-green-200 cursor-pointer hover:bg-green-200"
                                onClick={() => removePriorityPath(path)}
                              >
                                {path}
                                <span className="ml-1 text-xs">×</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}


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
                  disabled={!domain.trim() || !!domainError || isLoading}
                >
                  {isLoading ? 'Processing...' : 'Begin AI Visibility Analysis'}
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
