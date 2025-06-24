import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Loader2, TrendingUp, TrendingDown, Target, Users, Globe, AlertCircle } from 'lucide-react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

interface DashboardProps {
  domain: string;
  brandContext: string;
  keywords: string[];
  phrases: Array<{keyword: string, phrases: string[]}>;
  queryResults: Array<{
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
  }>;
  onPrev: () => void;
}

interface DomainData {
  id: number;
  url: string;
  context: string;
  crawlResults: Array<{
    pagesScanned: number;
    contentBlocks: number;
    keyEntities: number;
    confidenceScore: number;
    extractedContext: string;
  }>;
  keywords: Array<{
    id: number;
    term: string;
    volume: number;
    difficulty: string;
    cpc: number;
    category: string;
    isSelected: boolean;
  }>;
  phrases: Array<{
    id: number;
    text: string;
    keywordId: number;
  }>;
  aiQueryResults: Array<{
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
  }>;
}

interface CompetitorAnalysis {
  domain: string;
  visibilityScore: number;
  mentionRate: number;
  avgRelevance: number;
  avgAccuracy: number;
  avgSentiment: number;
  keyStrengths: string[];
  keyWeaknesses: string[];
  recommendations: string[];
  comparison: {
    better: string[];
    worse: string[];
    similar: string[];
  };
}

const Dashboard: React.FC<DashboardProps> = ({
  domain,
  brandContext,
  keywords,
  phrases,
  queryResults,
  onPrev
}) => {
  const [domainData, setDomainData] = useState<DomainData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [competitorDomain, setCompetitorDomain] = useState('');
  const [isAnalyzingCompetitor, setIsAnalyzingCompetitor] = useState(false);
  const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysis | null>(null);
  const [competitorError, setCompetitorError] = useState<string | null>(null);

  // Fetch domain data from database
  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        setIsLoading(true);
        
        // Get domain ID from the current domain
        const domainResponse = await fetch(`https://phrase-score-insight.onrender.com/api/domain/search?url=${encodeURIComponent(domain)}`);
        if (!domainResponse.ok) throw new Error('Failed to fetch domain data');
        
        const domainInfo = await domainResponse.json();
        const domainId = domainInfo.domain?.id;
        
        if (!domainId) throw new Error('Domain not found in database');

        // Fetch comprehensive domain data
        const response = await fetch(`https://phrase-score-insight.onrender.com/api/dashboard/${domainId}`);
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        
        const data = await response.json();
        setDomainData(data);
      } catch (error) {
        console.error('Error fetching domain data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomainData();
  }, [domain]);

  // Calculate real AI Visibility Score from actual data
  const calculateVisibilityScore = () => {
    if (!domainData?.aiQueryResults?.length) return 0;
    
    const totalResponses = domainData.aiQueryResults.length;
    const mentionedResponses = domainData.aiQueryResults.filter(r => r.presence === 1).length;
    const avgQuality = domainData.aiQueryResults.reduce((sum, r) => sum + r.overall, 0) / totalResponses;
    
    return Math.round(((mentionedResponses / totalResponses) * 100 * (avgQuality / 5)) * 10) / 10;
  };

  const visibilityScore = calculateVisibilityScore();

  // Real data for charts
  const modelPerformanceData = domainData?.aiQueryResults ? 
    Object.entries(
      domainData.aiQueryResults.reduce((acc, result) => {
        if (!acc[result.model]) {
          acc[result.model] = { responses: 0, mentions: 0, totalScore: 0 };
        }
        acc[result.model].responses++;
        if (result.presence === 1) acc[result.model].mentions++;
        acc[result.model].totalScore += result.overall;
        return acc;
      }, {} as Record<string, { responses: number; mentions: number; totalScore: number }>)
    ).map(([model, data]) => ({
      model,
      score: Math.round((data.mentions / data.responses) * 100),
      responses: data.responses,
      mentions: data.mentions,
      avgScore: Math.round((data.totalScore / data.responses) * 10) / 10
    })) : [];

  const keywordPerformanceData = domainData?.keywords?.slice(0, 8).map(keyword => {
    const keywordResults = domainData.aiQueryResults?.filter(r => {
      const phrase = domainData.phrases?.find(p => p.id === r.phraseId);
      return phrase && phrase.text.toLowerCase().includes(keyword.term.toLowerCase());
    }) || [];
    
    const visibility = keywordResults.length > 0 ? 
      (keywordResults.filter(r => r.presence === 1).length / keywordResults.length) * 100 : 0;
    const avgSentiment = keywordResults.length > 0 ? 
      keywordResults.reduce((sum, r) => sum + r.sentiment, 0) / keywordResults.length : 0;
    
    return {
      keyword: keyword.term.length > 15 ? keyword.term.substring(0, 15) + '...' : keyword.term,
      visibility: Math.round(visibility),
      mentions: keywordResults.filter(r => r.presence === 1).length,
      sentiment: Math.round(avgSentiment * 10) / 10,
      volume: keyword.volume,
      difficulty: keyword.difficulty
    };
  }) || [];

  const pieData = domainData?.aiQueryResults ? [
    { 
      name: 'Domain Present', 
      value: domainData.aiQueryResults.filter(r => r.presence === 1).length,
      color: '#10b981' 
    },
    { 
      name: 'Domain Not Found', 
      value: domainData.aiQueryResults.filter(r => r.presence === 0).length,
      color: '#ef4444' 
    }
  ] : [];

  const trendData = [
    { month: 'Jan', score: 45 },
    { month: 'Feb', score: 52 },
    { month: 'Mar', score: 58 },
    { month: 'Apr', score: 65 },
    { month: 'May', score: 71 },
    { month: 'Jun', score: visibilityScore }
  ];

  const topPhrases = domainData?.aiQueryResults
    ?.filter(r => r.presence === 1)
    ?.sort((a, b) => b.overall - a.overall)
    ?.slice(0, 5)
    ?.map(result => {
      const phrase = domainData.phrases?.find(p => p.id === result.phraseId);
      return {
        phrase: phrase?.text || 'Unknown phrase',
        score: Math.round(result.overall * 20), // Convert 1-5 to 0-100
        mentions: result.presence === 1 ? 1 : 0,
        model: result.model,
        relevance: result.relevance,
        accuracy: result.accuracy
      };
    }) || [];

  const improvementOpportunities = domainData?.aiQueryResults
    ?.filter(r => r.presence === 0 || r.overall < 3)
    ?.sort((a, b) => a.overall - b.overall)
    ?.slice(0, 5)
    ?.map(result => {
      const phrase = domainData.phrases?.find(p => p.id === result.phraseId);
      return {
        phrase: phrase?.text || 'Unknown phrase',
        score: Math.round(result.overall * 20),
        mentions: result.presence === 1 ? 1 : 0,
        model: result.model,
        issue: result.presence === 0 ? 'Domain not found' : 'Low quality response'
      };
    }) || [];

  // Competitor analysis function
  const analyzeCompetitor = async () => {
    if (!competitorDomain.trim()) {
      setCompetitorError('Please enter a competitor domain');
      return;
    }

    setIsAnalyzingCompetitor(true);
    setCompetitorError(null);
    setCompetitorAnalysis(null);

    try {
      const ctrl = new AbortController();
      
      fetchEventSource(`https://phrase-score-insight.onrender.com/api/competitor/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          targetDomain: domain,
          competitorDomain: competitorDomain.trim(),
          context: brandContext,
          keywords: keywords,
          phrases: phrases.flatMap(p => p.phrases)
        }),
        signal: ctrl.signal,
        onmessage(ev) {
          if (ev.event === 'analysis') {
            const data = JSON.parse(ev.data);
            setCompetitorAnalysis(data);
          } else if (ev.event === 'error') {
            const data = JSON.parse(ev.data);
            setCompetitorError(data.error || 'Analysis failed');
          }
        },
        onclose() {
          setIsAnalyzingCompetitor(false);
          ctrl.abort();
        },
        onerror(err) {
          setCompetitorError('Failed to analyze competitor');
          setIsAnalyzingCompetitor(false);
          ctrl.abort();
          throw err;
        }
      });
    } catch (error) {
      setCompetitorError('Failed to start competitor analysis');
      setIsAnalyzingCompetitor(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading Dashboard</h2>
          <p className="text-slate-600">Fetching real-time data from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          AI Visibility Dashboard
        </h2>
        <p className="text-lg text-slate-600">
          Real-time insights into your brand's AI visibility performance
        </p>
      </div>

      {/* Main Visibility Score */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-8">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">{visibilityScore}</div>
            <div className="text-xl opacity-90 mb-2">AI Visibility Score</div>
            <div className="text-sm opacity-75">
              Based on analysis of {domainData?.aiQueryResults?.length || 0} AI responses across {domainData?.keywords?.length || 0} keywords
            </div>
            <div className="flex justify-center mt-6">
              <div className="w-64">
                <Progress 
                  value={visibilityScore} 
                  className="h-3 bg-white/20"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="phrases">Phrases</TabsTrigger>
          <TabsTrigger value="competitor">Competitor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {domainData?.aiQueryResults ? 
                    Math.round((domainData.aiQueryResults.filter(r => r.presence === 1).length / domainData.aiQueryResults.length) * 100) : 0}%
                </div>
                <div className="text-sm text-slate-600">Domain Presence Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {domainData?.aiQueryResults ? 
                    Math.round((domainData.aiQueryResults.reduce((sum, r) => sum + r.relevance, 0) / domainData.aiQueryResults.length) * 10) / 10 : 0}/5
                </div>
                <div className="text-sm text-slate-600">Avg Search Relevance</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {domainData?.phrases?.length || 0}
                </div>
                <div className="text-sm text-slate-600">Total Phrases Analyzed</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {domainData?.keywords?.filter(k => k.isSelected).length || 0}
                </div>
                <div className="text-sm text-slate-600">Selected Keywords</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visibility Trend */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Visibility Trend</CardTitle>
                <CardDescription>AI visibility score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Mention Distribution */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Domain Presence Distribution</CardTitle>
                <CardDescription>Brand presence across AI responses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">
                      Present ({pieData[0]?.value || 0} responses)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">
                      Not Found ({pieData[1]?.value || 0} responses)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>AI Model Performance Comparison</CardTitle>
              <CardDescription>How different AI models perform for your brand</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modelPerformanceData.map((model) => (
              <Card key={model.model} className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{model.model}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Visibility Score:</span>
                    <span className="font-bold">{model.score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Responses:</span>
                    <span className="font-medium">{model.responses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Domain Mentions:</span>
                    <span className="font-medium">{model.mentions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg Quality:</span>
                    <span className="font-medium">{model.avgScore}/5</span>
                  </div>
                  <Progress value={model.score} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Keyword Performance</CardTitle>
              <CardDescription>AI visibility by keyword</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={keywordPerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="keyword" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="visibility" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phrases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Phrases */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-600">High Visibility Phrases</CardTitle>
                <CardDescription>Phrases where your domain appears in AI responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPhrases.map((phrase, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                        <div className="text-xs text-slate-600">
                          {phrase.model} • Relevance: {phrase.relevance}/5 • Accuracy: {phrase.accuracy}/5
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {phrase.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvement Opportunities */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600">Improvement Opportunities</CardTitle>
                <CardDescription>Phrases where your domain needs better visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementOpportunities.map((phrase, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                        <div className="text-xs text-slate-600">
                          {phrase.model} • {phrase.issue}
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">
                        {phrase.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitor" className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
              <CardDescription>Compare your AI visibility with competitors using AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter competitor domain (e.g., competitor.com)"
                  value={competitorDomain}
                  onChange={(e) => setCompetitorDomain(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={analyzeCompetitor}
                  disabled={isAnalyzingCompetitor}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isAnalyzingCompetitor ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Competitor'
                  )}
                </Button>
              </div>

              {competitorError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-red-700">{competitorError}</span>
                  </div>
                </div>
              )}

              {competitorAnalysis && (
                <div className="space-y-6">
                  {/* Competitor Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Your Domain ({domain})</h3>
                      <div className="text-2xl font-bold text-purple-600 mb-2">{visibilityScore}%</div>
                      <Progress value={visibilityScore} className="h-3" />
                      <div className="text-sm text-slate-600 mt-2">
                        {domainData?.aiQueryResults?.filter(r => r.presence === 1).length || 0} mentions out of {domainData?.aiQueryResults?.length || 0} queries
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Competitor ({competitorAnalysis.domain})</h3>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{competitorAnalysis.visibilityScore}%</div>
                      <Progress value={competitorAnalysis.visibilityScore} className="h-3" />
                      <div className="text-sm text-slate-600 mt-2">
                        {competitorAnalysis.mentionRate}% mention rate
                      </div>
                    </div>
                  </div>

                  {/* Comparison Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">AI Analysis Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Your Strengths</h4>
                        <ul className="text-sm space-y-1">
                          {competitorAnalysis.comparison.better.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Areas to Improve</h4>
                        <ul className="text-sm space-y-1">
                          {competitorAnalysis.comparison.worse.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <TrendingDown className="w-4 h-4 text-red-600 mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-600 mb-2">Similar Performance</h4>
                        <ul className="text-sm space-y-1">
                          {competitorAnalysis.comparison.similar.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <Target className="w-4 h-4 text-blue-600 mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">AI Recommendations</h3>
                    <div className="space-y-3">
                      {competitorAnalysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-slate-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev}>
          Back to Scoring
        </Button>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Start New Analysis
        </Button>
        <Button 
          variant="outline"
          onClick={() => alert('Export functionality would be implemented here')}
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
