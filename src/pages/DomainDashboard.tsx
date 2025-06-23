import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Globe, BarChart3, Eye, MessageSquare, Star, Users, Target, AlertTriangle, Lightbulb, RefreshCw, Activity, Shield, Award, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import type { Keyword } from '@/services/api';
import type { AIQueryResult } from '@/components/AIQueryResults';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DomainData {
  id: number;
  url: string;
  context: string;
  lastAnalyzed: string;
  industry: string;
  description: string;
  crawlResults: Array<{
    pagesScanned: number;
    contentBlocks: number;
    keyEntities: number;
    confidenceScore: number;
    extractedContext: string;
  }>;
  keywords: Keyword[];
  phrases: Array<{ id: number; text: string; keywordId: number }>;
  aiQueryResults: AIQueryResult[];
  metrics: {
    visibilityScore: number;
    mentionRate: string;
    avgRelevance: string;
    avgAccuracy: string;
    avgSentiment: string;
    avgOverall: string;
    totalQueries: number;
    keywordCount: number;
    phraseCount: number;
    modelPerformance: Array<{ model: string; score: number; responses: number; mentions: number; avgScore: number }>;
    keywordPerformance: Array<{ keyword: string; visibility: number; mentions: number; sentiment: number; volume: number; difficulty: string }>;
    topPhrases: Array<{ phrase: string; count: number }>;
    performanceData: Array<{ month: string; score: number }>;
  };
  insights: {
    strengths: Array<{
      title: string;
      description: string;
      metric: string;
    }>;
    weaknesses: Array<{
      title: string;
      description: string;
      metric: string;
    }>;
    recommendations: Array<{
      category: string;
      priority: string;
      action: string;
      expectedImpact: string;
      timeline: string;
    }>;
  };
  industryAnalysis: {
    marketPosition: string;
    competitiveAdvantage: string;
    marketTrends: string[];
    growthOpportunities: string[];
    threats: string[];
  };
}

interface CompetitorData {
  competitors: Array<{
    name: string;
    domain: string;
    strength: string;
    marketShare: string;
    keyStrengths: string[];
    weaknesses: string[];
    threatLevel: string;
    recommendations: string[];
    comparisonToDomain: {
      keywordOverlap: string;
      marketPosition: string;
      competitiveAdvantage: string;
      vulnerabilityAreas: string[];
    };
  }>;
  marketInsights: {
    totalCompetitors: string;
    marketLeader: string;
    emergingThreats: string[];
    opportunities: string[];
    marketTrends: string[];
    marketSize: string;
    growthRate: string;
  };
  strategicRecommendations: Array<{
    category: string;
    priority: string;
    action: string;
    expectedImpact: string;
    timeline: string;
    resourceRequirement: string;
  }>;
  competitiveAnalysis: {
    domainAdvantages: string[];
    domainWeaknesses: string[];
    competitiveGaps: string[];
    marketOpportunities: string[];
    threatMitigation: string[];
  };
  dbStats: Record<string, unknown>;
}

interface SuggestedCompetitor {
  name: string;
  domain: string;
  reason: string;
  type: 'direct' | 'indirect';
}

// Helper to pick the first available numeric key in priority order
function pickKeywordBarKey(arr: Record<string, unknown>[]): string {
  const keys = ['mentions', 'visibility', 'volume', 'cpc', 'sentiment'];
  if (!arr || arr.length === 0) return 'mentions';
  for (const key of keys) {
    const val = arr[0][key];
    if (typeof val === 'number' || (typeof val === 'string' && !isNaN(Number(val)))) return key;
  }
  return 'mentions';
}

// Helper to pick the first available numeric key for top phrases
function pickPhraseBarKey(arr: Record<string, unknown>[]): string {
  const keys = ['score', 'count'];
  if (!arr || arr.length === 0) return 'score';
  for (const key of keys) {
    const val = arr[0][key];
    if (typeof val === 'number' || (typeof val === 'string' && !isNaN(Number(val)))) return key;
  }
  return 'score';
}

const modelColors: Record<string, string> = {
  'GPT-4o': 'bg-blue-100 text-blue-800',
  'Claude 3': 'bg-green-100 text-green-800',
  'Gemini 1.5': 'bg-slate-100 text-slate-800',
};

interface Phrase { id: number; text: string; keywordId: number; }

// Define a type for the AI results as returned by the backend
interface FlatAIQueryResult {
  id: number;
  model: string;
  response: string;
  latency: number;
  cost: number;
  presence: number;
  relevance: number;
  accuracy: number;
  sentiment: number;
  overall: number;
  phraseId: number;
  keyword?: string;
}

const AIResultsTable: React.FC<{ results: FlatAIQueryResult[], phrases: Phrase[] }> = ({ results, phrases }) => {
  // Debug: log the first result to inspect fields
  if (results && results.length > 0) {
    // eslint-disable-next-line no-console
    console.log('AIResultsTable first result:', results[0]);
  }
  const [page, setPage] = useState(1);
  const perPage = 25;
  const totalPages = Math.ceil(results.length / perPage);
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;
  const currentResults = results.slice(startIdx, endIdx);

  // Helper for score cell
  function renderScoreCell(value: number | undefined, type: 'relevance' | 'accuracy' | 'sentiment' | 'overall') {
    if (typeof value !== 'number') return <span>-</span>;
    let color = 'text-red-600', label = 'Low';
    if (type === 'relevance') {
      if (value >= 4) { color = 'text-green-600'; label = 'High'; }
      else if (value >= 3) { color = 'text-yellow-600'; label = 'Medium'; }
    } else if (type === 'accuracy') {
      if (value >= 4) { color = 'text-green-600'; label = 'Trusted'; }
      else if (value >= 3) { color = 'text-yellow-600'; label = 'Good'; }
      else { label = 'Poor'; }
    } else if (type === 'sentiment') {
      if (value >= 4) { color = 'text-green-600'; label = 'Positive'; }
      else if (value >= 3) { color = 'text-yellow-600'; label = 'Neutral'; }
      else { label = 'Negative'; }
    } else if (type === 'overall') {
      if (value >= 4) { color = 'text-green-600'; label = 'Excellent'; }
      else if (value >= 3) { color = 'text-yellow-600'; label = 'Good'; }
      else { label = 'Poor'; }
    }
    return (
      <div className="flex flex-col items-center">
        <span className={`font-bold text-lg ${color}`}>{value}</span>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
    );
  }

  // Helper to get phrase text from phraseId
  function getPhraseText(phraseId: number | undefined) {
    if (!phraseId) return '-';
    const phraseObj = phrases.find(p => p.id === phraseId);
    return phraseObj ? phraseObj.text : '-';
  }

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader>
        <div className="flex flex-col items-center justify-center mb-2">
          <CardTitle className="text-2xl font-bold text-slate-900 mb-1">AI Query Results</CardTitle>
          <CardDescription className="text-slate-600 text-center max-w-2xl">
            Every raw AI model response for this domain, with full scoring breakdown. Use this for deep debugging and transparency.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-700 font-medium">Phrase</TableHead>
                <TableHead className="text-slate-700 font-medium">Keyword</TableHead>
                <TableHead className="text-slate-700 font-medium">Model</TableHead>
                <TableHead className="text-slate-700 font-medium">Response Preview</TableHead>
                <TableHead className="text-slate-700 font-medium">Latency</TableHead>
                <TableHead className="text-slate-700 font-medium">Domain Presence</TableHead>
                <TableHead className="text-slate-700 font-medium">Relevance</TableHead>
                <TableHead className="text-slate-700 font-medium">Accuracy</TableHead>
                <TableHead className="text-slate-700 font-medium">Sentiment</TableHead>
                <TableHead className="text-slate-700 font-medium">Overall</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResults.map((r, i) => {
                return (
                  <TableRow key={i} className="border-slate-100">
                    <TableCell className="font-medium max-w-xs">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <div className="truncate text-slate-900 cursor-pointer" title={getPhraseText(r.phraseId)}>
                              {getPhraseText(r.phraseId)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-lg whitespace-pre-line">
                            {getPhraseText(r.phraseId)}
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      <div className="text-xs text-slate-500">{r.keyword || '-'}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={modelColors[r.model] || 'bg-slate-100 text-slate-800'}>{r.model}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <div className="text-sm text-slate-700 line-clamp-2 cursor-pointer">
                              {r.response ? String(r.response).slice(0, 80) + (r.response.length > 80 ? '...' : '') : '-'}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-lg whitespace-pre-line">
                            {r.response || '-'}
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="font-mono text-slate-700">{typeof r.latency === 'number' ? r.latency.toFixed(2) + 's' : '-'}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {r.presence === 1 ? (
                        <div className="flex flex-col items-center">
                          <span className="text-green-600 text-lg">✓</span>
                          <span className="text-xs text-green-600">Present</span>
                        </div>
                      ) : r.presence === 0 ? (
                        <div className="flex flex-col items-center">
                          <span className="text-red-600 text-lg">✗</span>
                          <span className="text-xs text-red-600">Not Found</span>
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{typeof r.relevance === 'number' ? renderScoreCell(r.relevance, 'relevance') : '-'}</TableCell>
                    <TableCell className="text-center">{typeof r.accuracy === 'number' ? renderScoreCell(r.accuracy, 'accuracy') : '-'}</TableCell>
                    <TableCell className="text-center">{typeof r.sentiment === 'number' ? renderScoreCell(r.sentiment, 'sentiment') : '-'}</TableCell>
                    <TableCell className="text-center">{typeof r.overall === 'number' ? renderScoreCell(r.overall, 'overall') : '-'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-slate-600">
              Showing {startIdx + 1} to {Math.min(endIdx, results.length)} of {results.length} results
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setPage(1)} disabled={page === 1}>First</Button>
              <Button size="sm" variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</Button>
              <span className="text-sm px-2">Page {page} of {totalPages}</span>
              <Button size="sm" variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</Button>
              <Button size="sm" variant="outline" onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DomainDashboard = () => {
  const { domain } = useParams<{ domain: string }>();
  const [domainData, setDomainData] = useState<DomainData | null>(null);
  const [competitorData, setCompetitorData] = useState<CompetitorData | null>(null);
  const [suggestedCompetitors, setSuggestedCompetitors] = useState<SuggestedCompetitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitorLoading, setCompetitorLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState('');

  // Extract domain ID from URL - handle different URL patterns
  const getDomainId = () => {
    if (!domain) return 1;
    
    // Try different patterns to extract domain ID
    const patterns = [
      /domain-(\d+)/,           // domain-123
      /(\d+)$/,                 // just a number at the end
      /-(\d+)$/,                // -123 at the end
      /(\d+)/                   // any number
    ];
    
    for (const pattern of patterns) {
      const match = domain.match(pattern);
      if (match) {
        const id = parseInt(match[1]);
        if (!isNaN(id) && id > 0) {
          return id;
        }
      }
    }
    
    // If no pattern matches, try to parse the entire string as a number
    const parsed = parseInt(domain);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
    
    // Default fallback
    return 1;
  };

  const domainId = getDomainId();

  useEffect(() => {
    console.log('DomainDashboard: domainId =', domainId, 'domain =', domain);
    fetchDomainData();
  }, [domainId]);

  // Fetch competitor analysis from DB on initial load
  useEffect(() => {
    if (domainData) {
      fetchCompetitorDataFromDB();
      fetchSuggestedCompetitors();
    }
    // eslint-disable-next-line
  }, [domainData]);

  const fetchDomainData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching domain data for ID:', domainId);
      const response = await fetch(`http://localhost:3002/api/dashboard/${domainId}`);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to fetch domain data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Domain data received:', data);
      
      // Ensure all metrics are properly formatted
      if (data.metrics) {
        // Ensure visibility score is a number
        data.metrics.visibilityScore = typeof data.metrics.visibilityScore === 'string' 
          ? parseFloat(data.metrics.visibilityScore) 
          : data.metrics.visibilityScore;
        
        // Ensure mention rate is a string with % symbol
        data.metrics.mentionRate = typeof data.metrics.mentionRate === 'number' 
          ? data.metrics.mentionRate.toFixed(1) 
          : data.metrics.mentionRate;
        
        // Ensure all averages are properly formatted
        ['avgRelevance', 'avgAccuracy', 'avgSentiment', 'avgOverall'].forEach(key => {
          if (data.metrics[key]) {
            data.metrics[key] = typeof data.metrics[key] === 'number' 
              ? data.metrics[key].toFixed(1) 
              : data.metrics[key];
          }
        });
        
        // Ensure arrays exist
        data.metrics.modelPerformance = data.metrics.modelPerformance || [];
        data.metrics.keywordPerformance = data.metrics.keywordPerformance || [];
        data.metrics.topPhrases = data.metrics.topPhrases || [];
        data.metrics.performanceData = data.metrics.performanceData || [];
      }
      
      // Ensure insights exist
      if (!data.insights) {
        data.insights = {
          strengths: [],
          weaknesses: [],
          recommendations: []
        };
      }
      
      // Ensure industry analysis exists
      if (!data.industryAnalysis) {
        data.industryAnalysis = {
          marketPosition: 'challenger',
          competitiveAdvantage: 'Based on current performance data',
          marketTrends: [],
          growthOpportunities: [],
          threats: []
        };
      }
      
      setDomainData(data);
    } catch (err) {
      console.error('Error fetching domain data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load domain data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch competitor analysis from DB (GET)
  const fetchCompetitorDataFromDB = async () => {
    try {
      setCompetitorLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3002/api/dashboard/${domainId}/competitors`);
      if (!response.ok) {
        throw new Error('No competitor analysis found');
      }
      const data = await response.json();
      setCompetitorData(data);
      // Set competitors state from the analysis's competitorListArr
      if (Array.isArray(data.competitorListArr)) {
        setCompetitors(data.competitorListArr);
      }
    } catch (err) {
      console.error('Error fetching competitor analysis from DB:', err);
      // Don't set error for missing analysis, just log it
    } finally {
      setCompetitorLoading(false);
    }
  };

  const fetchSuggestedCompetitors = async () => {
    try {
      setSuggestionsLoading(true);
      const response = await fetch(`http://localhost:3002/api/dashboard/${domainId}/suggested-competitors`);
      if (!response.ok) {
        throw new Error('Failed to fetch suggested competitors');
      }
      const data = await response.json();
      setSuggestedCompetitors(data.suggestedCompetitors || []);
    } catch (err) {
      console.error('Error fetching suggested competitors:', err);
      // Don't set error for suggestions, just log it
    } finally {
      setSuggestionsLoading(false);
    }
  };

  // POST to reanalyze competitors only when user triggers
  const fetchCompetitorData = async (customCompetitors?: string[]) => {
    try {
      setCompetitorLoading(true);
      setError(null);
      const compList = typeof customCompetitors !== 'undefined' ? customCompetitors : competitors;
      const response = await fetch(`http://localhost:3002/api/dashboard/${domainId}/competitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitors: compList })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch competitor analysis');
      }
      const data = await response.json();
      setCompetitorData(data);
      // Update competitors state from the analysis's competitorListArr
      if (Array.isArray(data.competitorListArr)) {
        setCompetitors(data.competitorListArr);
      }
    } catch (err) {
      console.error('Error fetching competitor data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load competitor analysis');
    } finally {
      setCompetitorLoading(false);
    }
  };

  // Add competitor
  const handleAddCompetitor = () => {
    if (newCompetitor.trim() && !competitors.includes(newCompetitor.trim())) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  // Add suggested competitor
  const handleAddSuggestedCompetitor = (suggested: SuggestedCompetitor) => {
    const competitorString = `${suggested.name} (${suggested.domain})`;
    if (!competitors.includes(competitorString)) {
      setCompetitors([...competitors, competitorString]);
    }
  };

  // Remove competitor
  const handleRemoveCompetitor = (name: string) => {
    setCompetitors(competitors.filter(c => c !== name));
  };

  // Reanalyze competitors (POST) only when user clicks
  const handleReanalyze = () => {
    fetchCompetitorData(competitors);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-rose-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getVisibilityScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-rose-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/10 to-transparent animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Loading Dashboard</h3>
            <p className="text-slate-600">Analyzing domain performance data...</p>
            <p className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-full inline-block">
              Domain ID: {domainId}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !domainData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-rose-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-rose-600" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-800">Unable to Load Dashboard</h2>
            <p className="text-slate-600">{error || 'Domain data not found'}</p>
            <p className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-full inline-block">
              Domain ID: {domainId}
            </p>
          </div>
          <Button onClick={fetchDomainData} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { metrics } = domainData;

  // Prepare pie chart data with real values
  const mentionRateValue = parseFloat(metrics.mentionRate) || 0;
  const pieData = [
    { name: 'Mentioned', value: mentionRateValue, color: '#059669' },
    { name: 'Not Mentioned', value: Math.max(0, 100 - mentionRateValue), color: '#e5e7eb' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/">
                <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {domainData.url}
                  </h1>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                    {domainData.industry}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">{domainData.url}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm">Last analyzed {new Date(domainData.lastAnalyzed).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className={`text-4xl font-bold ${getVisibilityScoreColor(metrics.visibilityScore)}`}>
                {metrics.visibilityScore}%
              </div>
              <div className="text-sm font-medium text-slate-600">AI Visibility Score</div>
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    metrics.visibilityScore >= 80 ? 'bg-emerald-500' :
                    metrics.visibilityScore >= 60 ? 'bg-blue-500' :
                    metrics.visibilityScore >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${metrics.visibilityScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Mention Rate</p>
                    <p className="text-2xl font-bold text-slate-800">{metrics.mentionRate}%</p>
                  </div>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={`${parseFloat(metrics.mentionRate)}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Relevance</p>
                  <p className="text-2xl font-bold text-slate-800">{metrics.avgRelevance}<span className="text-lg text-slate-500">/5</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Sentiment</p>
                  <p className="text-2xl font-bold text-slate-800">{metrics.avgSentiment}<span className="text-lg text-slate-500">/5</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Queries</p>
                  <p className="text-2xl font-bold text-slate-800">{metrics.totalQueries.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <Activity className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Overall Score</p>
                  <p className="text-2xl font-bold text-slate-800">{metrics.avgOverall}<span className="text-lg text-slate-500">/5</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
            <TabsList className="flex w-full justify-between bg-white/70 backdrop-blur-sm border border-slate-200/60 p-1 rounded-xl gap-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">Performance</TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">AI Models</TabsTrigger>
              <TabsTrigger value="keywords" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">Keywords</TabsTrigger>
              <TabsTrigger value="phrases" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">Top Phrases</TabsTrigger>
              <TabsTrigger value="airesults" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">AI Results</TabsTrigger>
              <TabsTrigger value="competitors" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">Competitors</TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">Insights</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Trend */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-slate-800">Visibility Trend</CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">AI visibility score progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {metrics.performanceData && metrics.performanceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={metrics.performanceData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }} 
                        />
                        <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-slate-500 py-12 space-y-3">
                      <Activity className="h-12 w-12 mx-auto text-slate-300" />
                      <div>
                        <p className="font-medium">Trend data not available</p>
                        <p className="text-sm">Current visibility score: <span className="font-semibold">{metrics.visibilityScore}%</span></p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Mention Distribution */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-emerald-50 rounded-lg">
                      <Eye className="h-4 w-4 text-emerald-600" />
                    </div>
                    <CardTitle className="text-slate-800">Mention Distribution</CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">How often your domain is mentioned in AI responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, '']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-8 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700">Mentioned ({mentionRateValue}%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700">Not Mentioned ({(100 - mentionRateValue).toFixed(1)}%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Industry Analysis */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-purple-50 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <CardTitle className="text-slate-800">Industry Position</CardTitle>
                </div>
                <CardDescription className="text-slate-600">Market analysis and competitive positioning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Market Position</span>
                    </h4>
                    <p className="text-slate-600 capitalize font-medium bg-slate-50 px-3 py-2 rounded-lg">
                      {domainData.industryAnalysis?.marketPosition || 'Challenger'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span>Competitive Advantage</span>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {domainData.industryAnalysis?.competitiveAdvantage || 'Based on current performance metrics'}
                    </p>
                  </div>
                </div>

                {domainData.industryAnalysis?.marketTrends && domainData.industryAnalysis.marketTrends.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                      <span>Market Trends</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {domainData.industryAnalysis.marketTrends.map((trend, index) => (
                        <Badge key={index} className="bg-amber-50 text-amber-700 border-amber-200">
                          {trend}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {domainData.industryAnalysis?.growthOpportunities && domainData.industryAnalysis.growthOpportunities.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-emerald-600" />
                        <span>Growth Opportunities</span>
                      </h4>
                      <ul className="space-y-2">
                        {domainData.industryAnalysis.growthOpportunities.map((opportunity, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {domainData.industryAnalysis?.threats && domainData.industryAnalysis.threats.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        <span>Potential Threats</span>
                      </h4>
                      <ul className="space-y-2">
                        {domainData.industryAnalysis.threats.map((threat, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{threat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Metrics Over Time */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Performance Metrics</CardTitle>
                  <CardDescription className="text-slate-600">Detailed performance breakdown over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {metrics.performanceData && metrics.performanceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={metrics.performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="Visibility Score" />
                        {metrics.performanceData.every(d => 'mentions' in d) && (
                          <Line type="monotone" dataKey="mentions" stroke="#10b981" strokeWidth={2} name="Mentions" />
                        )}
                        {metrics.performanceData.every(d => 'queries' in d) && (
                          <Line type="monotone" dataKey="queries" stroke="#f59e42" strokeWidth={2} name="Queries" />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-slate-500 py-12">
                      <BarChart3 className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>Performance trend data not available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Metrics Breakdown */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Current Metrics</CardTitle>
                  <CardDescription className="text-slate-600">Latest performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {['avgRelevance', 'avgAccuracy', 'avgSentiment', 'avgOverall'].map((key) => (
                    metrics[key] !== undefined && (
                      <div className="space-y-4" key={key}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">{key.replace('avg', '').replace(/([A-Z])/g, ' $1').trim()} Score</span>
                          <span className="text-lg font-bold text-slate-800">{metrics[key]}/5</span>
                        </div>
                        <Progress value={parseFloat(metrics[key]) * 20} className="h-2" />
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">AI Model Performance</CardTitle>
                <CardDescription className="text-slate-600">Performance breakdown by different AI models</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.modelPerformance && metrics.modelPerformance.length > 0 ? (
                  <div className="space-y-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={metrics.modelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="model" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                        <Bar dataKey="mentions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {metrics.modelPerformance.map((model, index) => (
                        <Card key={index} className="bg-slate-50 border-slate-200">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-slate-800">{model.model}</h4>
                              <div className="text-2xl font-bold text-blue-600">{model.mentions}</div>
                              <p className="text-sm text-slate-600">mentions</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <Activity className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p>Model performance data not available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">All Keywords</CardTitle>
                <CardDescription className="text-slate-600">Complete list of tracked keywords</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.keywordPerformance && metrics.keywordPerformance.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(metrics.keywordPerformance[0]).map((field) => (
                            <TableHead key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {metrics.keywordPerformance.map((keyword, index) => (
                          <TableRow key={index}>
                            {Object.keys(keyword).map((field) => (
                              <TableCell key={field}>{keyword[field]}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    <p>No keywords configured</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phrases" className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Top Performing Phrases</CardTitle>
                <CardDescription className="text-slate-600">Phrases that generate the most mentions</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.topPhrases && metrics.topPhrases.length > 0 ? (
                  <div className="space-y-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={metrics.topPhrases.slice(0, 8).map(p => {
                        const phraseObj = p as Record<string, unknown>;
                        return {
                          ...p,
                          ...(typeof phraseObj.score !== 'undefined' ? { score: Number(phraseObj.score) } : {}),
                          ...(typeof phraseObj.count !== 'undefined' ? { count: Number(phraseObj.count) } : {})
                        };
                      })} margin={{ left: 40, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="phrase" stroke="#64748b" fontSize={11} angle={-45} textAnchor="end" height={80} interval={0} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                        <Bar dataKey={pickPhraseBarKey(metrics.topPhrases)} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="space-y-3">
                      {metrics.topPhrases.slice(0, 10).map((phrase, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="font-medium text-slate-700">{phrase.phrase}</span>
                          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                            {Object.entries(phrase).filter(([k]) => k !== 'phrase').map(([k, v]) => `${k}: ${v}`).join(' | ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <MessageSquare className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p>Phrase performance data not available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="airesults" className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">All AI Query Results</CardTitle>
                <CardDescription className="text-slate-600">Raw results from all AI model queries for this domain</CardDescription>
              </CardHeader>
              <CardContent>
                {domainData.aiQueryResults && domainData.aiQueryResults.length > 0 ? (
                  <AIResultsTable results={domainData.aiQueryResults as unknown as FlatAIQueryResult[]} phrases={domainData.phrases || []} />
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <p>No AI query results available for this domain.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-8">
            {/* Competitor Management */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Competitor Analysis</CardTitle>
                <CardDescription className="text-slate-600">Manage and analyze your competitors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Competitor */}
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                    placeholder="Enter competitor name or domain"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCompetitor()}
                  />
                  <Button onClick={handleAddCompetitor} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Add Competitor
                  </Button>
                </div>

                {/* Current Competitors */}
                {competitors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800">Current Competitors</h4>
                    <div className="flex flex-wrap gap-2">
                      {competitors.map((competitor, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-slate-100 px-3 py-2 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">{competitor}</span>
                          <button
                            onClick={() => handleRemoveCompetitor(competitor)}
                            className="text-slate-500 hover:text-rose-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={handleReanalyze}
                      disabled={competitorLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {competitorLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Analyze Competitors
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Suggested Competitors */}
                {suggestedCompetitors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800">Suggested Competitors</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {suggestedCompetitors.map((suggested, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-slate-800">{suggested.name}</h5>
                              <p className="text-sm text-slate-600">{suggested.domain}</p>
                            </div>
                            <Badge className={suggested.type === 'direct' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}>
                              {suggested.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{suggested.reason}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAddSuggestedCompetitor(suggested)}
                            className="w-full"
                          >
                            Add to Analysis
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Competitor Analysis Results */}
            {competitorData && (
              <div className="space-y-8">
                {/* Market Overview */}
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Market Overview</CardTitle>
                    <CardDescription className="text-slate-600">Competitive landscape analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800">Market Size</h4>
                        <p className="text-2xl font-bold text-blue-600">{competitorData.marketInsights?.marketSize || 'N/A'}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800">Growth Rate</h4>
                        <p className="text-2xl font-bold text-emerald-600">{competitorData.marketInsights?.growthRate || 'N/A'}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800">Market Leader</h4>
                        <p className="text-lg font-semibold text-slate-800">{competitorData.marketInsights?.marketLeader || 'N/A'}</p>
                      </div>
                    </div>

                    {competitorData.marketInsights?.marketTrends && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-800">Market Trends</h4>
                        <div className="flex flex-wrap gap-2">
                          {competitorData.marketInsights.marketTrends.map((trend, index) => (
                            <Badge key={index} className="bg-blue-50 text-blue-700 border-blue-200">
                              {trend}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Competitor Comparison */}
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800">Competitor Analysis</CardTitle>
                    <CardDescription className="text-slate-600">Detailed competitor breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {competitorData.competitors?.map((competitor, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-slate-800">{competitor.name}</h4>
                              <p className="text-sm text-slate-600">{competitor.domain}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={getThreatLevelColor(competitor.threatLevel)}>
                                {competitor.threatLevel} Threat
                              </Badge>
                              <div className="text-right">
                                <p className="text-sm text-slate-600">Market Share</p>
                                <p className="font-semibold text-slate-800">{competitor.marketShare}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h5 className="font-medium text-slate-800 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>Key Strengths</span>
                              </h5>
                              <ul className="space-y-1">
                                {competitor.keyStrengths?.map((strength, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                                    <span>•</span>
                                    <span>{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <h5 className="font-medium text-slate-800 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                <span>Weaknesses</span>
                              </h5>
                              <ul className="space-y-1">
                                {competitor.weaknesses?.map((weakness, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                                    <span>•</span>
                                    <span>{weakness}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {competitor.recommendations && competitor.recommendations.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="font-medium text-slate-800 flex items-center space-x-2">
                                <Lightbulb className="h-4 w-4 text-amber-600" />
                                <span>Strategic Recommendations</span>
                              </h5>
                              <ul className="space-y-1">
                                {competitor.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                                    <span>•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Recommendations */}
                {competitorData.strategicRecommendations && (
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-800">Strategic Recommendations</CardTitle>
                      <CardDescription className="text-slate-600">Actionable strategies for your domain</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {competitorData.strategicRecommendations.map((rec, idx) => (
                          <div key={idx} className="border border-slate-100 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-slate-800">{rec.category}</span>
                              <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                            </div>
                            <div className="text-slate-700 mb-1">{rec.action}</div>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                              <span>Impact: {rec.expectedImpact}</span>
                              <span>Timeline: {rec.timeline}</span>
                              <span>Resources: {rec.resourceRequirement}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Insights</CardTitle>
                <CardDescription className="text-slate-600">AI-generated strengths, weaknesses, and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {domainData.insights && (
                  <div className="space-y-6">
                    {/* Strengths */}
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
                      {domainData.insights.strengths && domainData.insights.strengths.length > 0 ? (
                        <ul className="space-y-2">
                          {domainData.insights.strengths.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Metric: {item.metric}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : <div className="text-slate-400">No strengths identified</div>}
                    </div>
                    {/* Weaknesses */}
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Weaknesses</h4>
                      {domainData.insights.weaknesses && domainData.insights.weaknesses.length > 0 ? (
                        <ul className="space-y-2">
                          {domainData.insights.weaknesses.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Metric: {item.metric}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : <div className="text-slate-400">No weaknesses identified</div>}
                    </div>
                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Recommendations</h4>
                      {domainData.insights.recommendations && domainData.insights.recommendations.length > 0 ? (
                        <ul className="space-y-2">
                          {domainData.insights.recommendations.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <p className="font-medium">{item.action}</p>
                                <p className="text-sm text-gray-600">{item.expectedImpact}</p>
                                <p className="text-xs text-gray-500 mt-1">Category: {item.category} | Priority: {item.priority} | Timeline: {item.timeline}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : <div className="text-slate-400">No recommendations available</div>}
                    </div>
                  </div>
                )}
                {(!domainData.insights || (!domainData.insights.strengths?.length && !domainData.insights.weaknesses?.length && !domainData.insights.recommendations?.length)) && (
                  <div className="text-slate-400">No insights available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DomainDashboard;