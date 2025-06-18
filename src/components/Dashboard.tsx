
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface DashboardProps {
  domain: string;
  brandContext: string;
  keywords: string[];
  phrases: Array<{keyword: string, phrases: string[]}>;
  queryResults: any[];
  onPrev: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  domain,
  brandContext,
  keywords,
  phrases,
  queryResults,
  onPrev
}) => {
  const [competitorDomain, setCompetitorDomain] = useState('');

  // Calculate AI Visibility Score
  const calculateVisibilityScore = () => {
    if (!queryResults.length) return 0;
    
    const totalResponses = queryResults.length;
    const mentionedResponses = queryResults.filter(r => Math.random() > 0.4).length; // Mock presence
    const avgQuality = 3.2 + Math.random() * 1.5; // Mock quality score
    
    return Math.round(((mentionedResponses / totalResponses) * 100 * (avgQuality / 5)) * 10) / 10;
  };

  const visibilityScore = calculateVisibilityScore();

  // Mock data for charts
  const modelPerformanceData = [
    { model: 'GPT-4o', score: 78, responses: 45, mentions: 32 },
    { model: 'Claude 3', score: 85, responses: 45, mentions: 38 },
    { model: 'Gemini 1.5', score: 72, responses: 45, mentions: 29 }
  ];

  const keywordPerformanceData = keywords.slice(0, 8).map(keyword => ({
    keyword: keyword.length > 15 ? keyword.substring(0, 15) + '...' : keyword,
    visibility: Math.floor(Math.random() * 40) + 40,
    mentions: Math.floor(Math.random() * 20) + 5,
    sentiment: Math.random() * 2 + 3
  }));

  const pieData = [
    { name: 'Mentioned', value: 68, color: '#10b981' },
    { name: 'Not Mentioned', value: 32, color: '#ef4444' }
  ];

  const trendData = [
    { month: 'Jan', score: 45 },
    { month: 'Feb', score: 52 },
    { month: 'Mar', score: 58 },
    { month: 'Apr', score: 65 },
    { month: 'May', score: 71 },
    { month: 'Jun', score: visibilityScore }
  ];

  const topPhrases = phrases.flatMap(p => p.phrases).slice(0, 5).map(phrase => ({
    phrase,
    score: Math.floor(Math.random() * 30) + 70,
    mentions: Math.floor(Math.random() * 15) + 5
  }));

  const improvementOpportunities = phrases.flatMap(p => p.phrases).slice(5, 10).map(phrase => ({
    phrase,
    score: Math.floor(Math.random() * 40) + 20,
    mentions: Math.floor(Math.random() * 5) + 1
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          AI Visibility Dashboard
        </h2>
        <p className="text-lg text-slate-600">
          Comprehensive insights into your brand's AI visibility performance
        </p>
      </div>

      {/* Main Visibility Score */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-8">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">{visibilityScore}</div>
            <div className="text-xl opacity-90 mb-2">AI Visibility Score</div>
            <div className="text-sm opacity-75">
              Based on analysis of {queryResults.length} AI responses across {keywords.length} keywords
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
                <div className="text-2xl font-bold text-green-600">68%</div>
                <div className="text-sm text-slate-600">Mention Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3.4/5</div>
                <div className="text-sm text-slate-600">Avg Relevance</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-slate-600">Total Phrases</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">+12%</div>
                <div className="text-sm text-slate-600">vs Last Month</div>
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
                <CardTitle>Mention Distribution</CardTitle>
                <CardDescription>Brand mentions across AI responses</CardDescription>
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
                    <span className="text-sm">Mentioned (68%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">Not Mentioned (32%)</span>
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
                    <span className="text-slate-600">Brand Mentions:</span>
                    <span className="font-medium">{model.mentions}</span>
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
                <CardTitle className="text-green-600">Top Performing Phrases</CardTitle>
                <CardDescription>Phrases with highest AI visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPhrases.map((phrase, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                        <div className="text-xs text-slate-600">{phrase.mentions} mentions</div>
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
                <CardDescription>Phrases needing attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementOpportunities.map((phrase, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                        <div className="text-xs text-slate-600">{phrase.mentions} mentions</div>
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
              <CardDescription>Compare your AI visibility with competitors</CardDescription>
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
                  onClick={() => alert('Competitor analysis would be implemented here')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Analyze Competitor
                </Button>
              </div>

              {/* Mock competitor comparison */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Sample Competitor Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-slate-600 mb-2">Your Domain ({domain})</div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">{visibilityScore}%</div>
                    <Progress value={visibilityScore} className="h-3" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-2">Competitor Example</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">62%</div>
                    <Progress value={62} className="h-3" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  ↑ You're performing {visibilityScore - 62}% better than this competitor
                </div>
              </div>
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
