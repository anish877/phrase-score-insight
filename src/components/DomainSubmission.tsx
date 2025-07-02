import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Shield, TrendingUp, Clock, Plus, Upload, History, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

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

interface DomainVersion {
  id: number;
  version: number;
  name: string;
  createdAt: string;
  hasAnalysis: boolean;
  lastCrawl?: string;
}

interface DomainCheckResult {
  exists: boolean;
  domainId?: number;
  url?: string;
  currentVersion?: number;
  versions?: DomainVersion[];
  hasCurrentAnalysis?: boolean;
  lastAnalyzed?: string;
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
  const [customPaths, setCustomPathsState] = useState<string[]>(customPathsProp || []);
  const [priorityUrls, setPriorityUrlsState] = useState<string[]>(priorityUrlsProp || []);
  const [priorityPaths, setPriorityPathsState] = useState<string[]>(priorityPathsProp || []);
  const [isLoading, setIsLoading] = useState(false);
  const [domainCheckResult, setDomainCheckResult] = useState<DomainCheckResult | null>(null);
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const [versionName, setVersionName] = useState('');
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const { toast } = useToast();

  // Sync with parent state
  useEffect(() => {
    if (setCustomPathsProp) setCustomPathsProp(customPaths);
    if (setPriorityUrlsProp) setPriorityUrlsProp(priorityUrls);
    if (setPriorityPathsProp) setPriorityPathsProp(priorityPaths);
  }, [customPaths, priorityUrls, priorityPaths, setCustomPathsProp, setPriorityUrlsProp, setPriorityPathsProp]);

  const validateDomain = (value: string) => {
    // Only allow domains, not full URLs
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(value);
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    setDomainCheckResult(null);
  };

  const isFullUrl = (domain: string) => domain.startsWith('http://') || domain.startsWith('https://');

  const validatePriorityUrl = (value: string) => {
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(value);
  };

  const addPriorityUrl = (raw: string) => {
    const url = raw.trim();
    if (!url) return;
    
    if (!validatePriorityUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    if (priorityUrls.includes(url)) {
      toast({
        title: "URL already added",
        description: "This URL is already in the priority list",
        variant: "destructive"
      });
      return;
    }
    
    setPriorityUrlsState([...priorityUrls, url]);
  };

  const addBulkUrls = () => {
    const urls = priorityUrls.join('\n');
    const newUrls = urls.split('\n').map(url => url.trim()).filter(url => url);
    
    const validUrls = newUrls.filter(url => validatePriorityUrl(url));
    const invalidUrls = newUrls.filter(url => !validatePriorityUrl(url));
    
    if (invalidUrls.length > 0) {
      toast({
        title: "Invalid URLs found",
        description: `${invalidUrls.length} URLs were invalid and skipped`,
        variant: "destructive"
      });
    }
    
    if (validUrls.length > 0) {
      setPriorityUrlsState([...new Set([...priorityUrls, ...validUrls])]);
      toast({
        title: "URLs added",
        description: `Successfully added ${validUrls.length} URLs to priority list`
      });
    }
  };

  const removePriorityUrl = (url: string) => {
    setPriorityUrlsState(priorityUrls.filter(u => u !== url));
  };

  const validatePriorityPath = (value: string) => {
    return value.startsWith('/') && value.length > 1;
  };

  const addPriorityPath = (raw: string) => {
    const path = raw.trim();
    if (!path) return;
    
    let normalizedPath = path;
    if (!path.startsWith('/')) {
      normalizedPath = `/${path}`;
    }
    
    if (customPaths.includes(normalizedPath)) {
      toast({
        title: "Path already added",
        description: "This path is already in the custom paths list",
        variant: "destructive"
      });
      return;
    }
    
    setCustomPathsState([...customPaths, normalizedPath]);
  };

  const addBulkPaths = () => {
    const paths = customPaths.join('\n');
    const newPaths = paths.split('\n').map(path => path.trim()).filter(path => path);
    
    const validPaths = newPaths.map(path => path.startsWith('/') ? path : `/${path}`);
    const uniquePaths = [...new Set([...customPaths, ...validPaths])];
    
    setCustomPathsState(uniquePaths);
    toast({
      title: "Paths added",
      description: `Successfully added ${validPaths.length} paths to custom paths list`
    });
  };

  const removePriorityPath = (path: string) => {
    setCustomPathsState(customPaths.filter(p => p !== path));
  };

  const checkDomain = async (): Promise<DomainCheckResult | null> => {
    if (!domain.trim()) {
      toast({
        title: "Domain required",
        description: "Please enter a domain",
        variant: "destructive"
      });
      return null;
    }

    if (!validateDomain(domain.trim())) {
      toast({
        title: "Invalid domain",
        description: "Please enter a valid domain (not a full URL)",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://phrase-score-insight.onrender.com/api/domain/check/${encodeURIComponent(domain.trim())}`);
      const result: DomainCheckResult = await response.json();
      
      setDomainCheckResult(result);
      
      if (result.exists) {
        setShowVersionDialog(true);
      } else {
        // Domain doesn't exist, show success message
        toast({
          title: "Domain Ready",
          description: "New domain detected. Ready to start analysis.",
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error checking domain:', error);
      toast({
        title: "Error",
        description: "Failed to check domain status",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewVersion = async () => {
    if (!domainCheckResult?.domainId) return;
    
    setIsCreatingVersion(true);
    try {
      const response = await fetch('https://phrase-score-insight.onrender.com/api/domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: domain,
          createNewVersion: true,
          versionName: versionName || `Version ${(domainCheckResult.currentVersion || 0) + 1}`,
          customPaths,
          priorityUrls,
          priorityPaths
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create new version');
      }

      toast({
        title: "New version created",
        description: `Starting analysis for version: ${versionName || `Version ${(domainCheckResult.currentVersion || 0) + 1}`}`
      });

      setShowVersionDialog(false);
      setVersionName('');
      onNext();
    } catch (error) {
      console.error('Error creating new version:', error);
      toast({
        title: "Error",
        description: "Failed to create new version",
        variant: "destructive"
      });
    } finally {
      setIsCreatingVersion(false);
    }
  };

  const handleGoToDashboard = () => {
    if (domainCheckResult?.domainId) {
      window.location.href = `/dashboard/${domainCheckResult.domainId}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      toast({
        title: "Domain required",
        description: "Please enter a domain",
        variant: "destructive"
      });
      return;
    }

    if (!validateDomain(domain.trim())) {
      toast({
        title: "Invalid domain",
        description: "Please enter a valid domain (not a full URL)",
        variant: "destructive"
      });
      return;
    }

    // Check if domain exists first
    const result = await checkDomain();
    
    if (result) {
      if (result.exists) {
        return;
      } else {
        onNext();
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">Domain Analysis Setup</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Enter your domain to start the AI-powered visibility analysis. We'll extract your brand context, 
          discover relevant keywords, and analyze your content performance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Domain Input */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Domain or URL
            </CardTitle>
            <CardDescription>
              Enter your website domain (e.g., example.com). Do NOT enter a full URL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => handleDomainChange(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button 
                type="button" 
                onClick={checkDomain}
                disabled={isLoading || !domain.trim()}
                className="h-12 px-6"
              >
                {isLoading ? 'Checking...' : 'Check Domain'}
              </Button>
            </div>
            
            {domainCheckResult && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                {domainCheckResult.exists ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Domain already analyzed</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Found {domainCheckResult.versions?.length || 0} version(s) for {domainCheckResult.url}
                    </p>
                    {domainCheckResult.hasCurrentAnalysis && (
                      <p className="text-sm text-slate-600">
                        Last analyzed: {formatDate(domainCheckResult.lastAnalyzed || '')}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">New domain - ready to analyze</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Priority URLs */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Priority URLs (Optional)
            </CardTitle>
            <CardDescription>
              Add specific URLs you want to prioritize in the analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="https://example.com/important-page"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addPriorityUrl((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
              <Button type="button" onClick={() => addPriorityUrl((document.querySelector('input[type="url"]') as HTMLInputElement)?.value || '')}>
                Add URL
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Add URLs</DialogTitle>
                    <DialogDescription>
                      Paste multiple URLs, separated by newlines or commas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                      rows={8}
                      onChange={(e) => {
                        const urls = e.target.value.split(/[\n,]/).map(url => url.trim()).filter(url => url);
                        setPriorityUrlsState([...new Set([...priorityUrls, ...urls])]);
                      }}
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="button" onClick={addBulkUrls}>
                        Add All URLs
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {priorityUrls.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700">Priority URLs ({priorityUrls.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {priorityUrls.map((url, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {url}
                      <button
                        type="button"
                        onClick={() => removePriorityUrl(url)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Paths */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Custom Paths (Optional)
            </CardTitle>
            <CardDescription>
              Add specific paths you want to include in the analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="/about, /services, /contact"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addPriorityPath((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
              <Button type="button" onClick={() => addPriorityPath((document.querySelector('input[placeholder*="/about"]') as HTMLInputElement)?.value || '')}>
                Add Path
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Add Paths</DialogTitle>
                    <DialogDescription>
                      Paste multiple paths, separated by newlines or commas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="/about&#10;/services&#10;/contact&#10;/blog"
                      rows={8}
                      onChange={(e) => {
                        const paths = e.target.value.split(/[\n,]/).map(path => path.trim()).filter(path => path);
                        const validPaths = paths.map(path => path.startsWith('/') ? path : `/${path}`);
                        setCustomPathsState([...new Set([...customPaths, ...validPaths])]);
                      }}
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="button" onClick={addBulkPaths}>
                        Add All Paths
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {customPaths.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700">Custom Paths ({customPaths.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {customPaths.map((path, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {path}
                      <button
                        type="button"
                        onClick={() => removePriorityPath(path)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg" 
            className="px-8 py-3 text-lg"
            disabled={isLoading || !domain.trim() || (domainCheckResult?.exists && !domainCheckResult?.versions?.some(v => v.hasAnalysis))}
          >
            {isLoading ? 'Checking Domain...' : 
             domainCheckResult?.exists ? 'Domain Exists - Use Version Dialog' : 'Start Analysis'}
          </Button>
        </div>
        
        {/* Help text for existing domains */}
        {domainCheckResult?.exists && (
          <div className="text-center text-sm text-slate-600">
            <p>This domain already exists. Use the "Check Domain" button above to see version options.</p>
          </div>
        )}
      </form>

      {/* Version Dialog */}
      <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              Domain Already Analyzed
            </DialogTitle>
            <DialogDescription>
              We found existing analysis for {domainCheckResult?.url}. Choose what you'd like to do:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Existing Versions */}
            {domainCheckResult?.versions && domainCheckResult.versions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-slate-700">Existing Versions</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {domainCheckResult.versions.map((version) => (
                    <div key={version.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={version.hasAnalysis ? "default" : "secondary"}>
                            v{version.version}
                          </Badge>
                          <span className="font-medium">{version.name}</span>
                        </div>
                        <span className="text-sm text-slate-500">
                          {formatDate(version.createdAt)}
                        </span>
                      </div>
                      {version.hasAnalysis && (
                        <Badge variant="outline" className="text-green-600">
                          Complete
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleGoToDashboard}
                className="w-full justify-between"
                size="lg"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="versionName">Version Name (Optional)</Label>
                  <Input
                    id="versionName"
                    placeholder={`Version ${(domainCheckResult?.currentVersion || 0) + 1}`}
                    value={versionName}
                    onChange={(e) => setVersionName(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleCreateNewVersion}
                  disabled={isCreatingVersion}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  {isCreatingVersion ? 'Creating...' : 'Create New Version'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainSubmission;
