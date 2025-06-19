import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Globe, BarChart3, Eye, MessageSquare, Star, Clock, Shield, AlertTriangle, CheckCircle, Activity, Target, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const DomainDashboard = () => {
  const { domain } = useParams<{ domain: string }>();
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [selectedModel, setSelectedModel] = useState('all');

  // Enhanced detailed data for the domain
  const domainData = {
    domain: domain || 'techcorp.com',
    brandName: 'TechCorp Solutions',
    visibilityScore: 78.5,
    lastAnalyzed: '2024-06-15T10:30:00Z',
    keywordCount: 25,
    phraseCount: 125,
    totalQueries: 375,
    mentionRate: 68.2,
    avgRelevance: 3.4,
    avgSentiment: 3.7,
    industry: 'Technology',
    description: 'Leading provider of enterprise software solutions and cloud-based platforms for modern businesses.',
    complianceScore: 94,
    riskLevel: 'low',
    marketPosition: 'Market Leader',
    competitorAnalysis: 'Outperforming 78% of competitors',
    monthlyGrowth: 12.3,
    qualityScore: 4.2,
    consistencyScore: 87,
    reachScore: 92
  };

  // Enhanced performance data over time
  const performanceData = [
    { month: 'Jan', score: 65, mentions: 45, queries: 200, sentiment: 3.2, relevance: 3.1, growth: 0 },
    { month: 'Feb', score: 68, mentions: 52, queries: 230, sentiment: 3.3, relevance: 3.2, growth: 4.6 },
    { month: 'Mar', score: 71, mentions: 58, queries: 250, sentiment: 3.4, relevance: 3.3, growth: 4.4 },
    { month: 'Apr', score: 74, mentions: 65, queries: 280, sentiment: 3.5, relevance: 3.4, growth: 4.2 },
    { month: 'May', score: 76, mentions: 71, queries: 320, sentiment: 3.6, relevance: 3.4, growth: 2.7 },
    { month: 'Jun', score: 78.5, mentions: 78, queries: 375, sentiment: 3.7, relevance: 3.4, growth: 3.3 }
  ];

  // Enhanced AI model performance with detailed metrics
  const modelPerformance = [
    { 
      model: 'GPT-4o', 
      score: 82, 
      mentions: 95, 
      totalQueries: 125, 
      avgLatency: 2.1, 
      avgCost: 0.03,
      accuracy: 94,
      consistency: 89,
      sentiment: 4.1,
      reliability: 96
    },
    { 
      model: 'Claude 3.5', 
      score: 78, 
      mentions: 88, 
      totalQueries: 125, 
      avgLatency: 1.8, 
      avgCost: 0.025,
      accuracy: 91,
      consistency: 93,
      sentiment: 3.9,
      reliability: 94
    },
    { 
      model: 'Gemini 1.5', 
      score: 75, 
      mentions: 82, 
      totalQueries: 125, 
      avgLatency: 2.3, 
      avgCost: 0.02,
      accuracy: 88,
      consistency: 85,
      sentiment: 3.6,
      reliability: 91
    }
  ];

  // Enhanced keyword performance with detailed analytics
  const keywordPerformance = [
    { 
      keyword: 'project management software', 
      visibility: 85, 
      mentions: 12, 
      sentiment: 4.2, 
      trend: 'up',
      competition: 'high',
      opportunity: 92,
      queries: 45,
      conversion: 78
    },
    { 
      keyword: 'enterprise solutions', 
      visibility: 78, 
      mentions: 8, 
      sentiment: 3.9, 
      trend: 'up',
      competition: 'medium',
      opportunity: 85,
      queries: 32,
      conversion: 71
    },
    { 
      keyword: 'cloud platform', 
      visibility: 72, 
      mentions: 15, 
      sentiment: 4.0, 
      trend: 'stable',
      competition: 'high',
      opportunity: 68,
      queries: 52,
      conversion: 64
    },
    { 
      keyword: 'business automation', 
      visibility: 68, 
      mentions: 6, 
      sentiment: 3.7, 
      trend: 'down',
      competition: 'medium',
      opportunity: 73,
      queries: 28,
      conversion: 59
    },
    { 
      keyword: 'workflow management', 
      visibility: 65, 
      mentions: 9, 
      sentiment: 3.8, 
      trend: 'up',
      competition: 'low',
      opportunity: 88,
      queries: 38,
      conversion: 82
    }
  ];

  // Enhanced competitive analysis
  const competitorComparison = [
    { metric: 'Visibility Score', yourBrand: 78.5, competitor1: 72, competitor2: 65, competitor3: 69 },
    { metric: 'Mention Rate', yourBrand: 68.2, competitor1: 61, competitor2: 58, competitor3: 63 },
    { metric: 'Sentiment Score', yourBrand: 3.7, competitor1: 3.4, competitor2: 3.2, competitor3: 3.5 },
    { metric: 'Query Volume', yourBrand: 375, competitor1: 320, competitor2: 280, competitor3: 305 },
    { metric: 'Market Share', yourBrand: 24, competitor1: 19, competitor2: 16, competitor3: 18 }
  ];

  // Risk assessment data
  const riskAssessment = [
    { category: 'Brand Safety', score: 94, status: 'excellent', trend: 'stable' },
    { category: 'Compliance', score: 92, status: 'excellent', trend: 'improving' },
    { category: 'Reputation', score: 88, status: 'good', trend: 'improving' },
    { category: 'Competitive Threat', score: 76, status: 'moderate', trend: 'stable' },
    { category: 'Market Position', score: 91, status: 'excellent', trend: 'improving' }
  ];

  // Detailed insights and recommendations
  const strategicInsights = [
    {
      category: 'Opportunity',
      title: 'Workflow Management Keyword Expansion',
      description: 'Low competition keyword with high conversion potential',
      impact: 'High',
      effort: 'Medium',
      timeline: '2-3 months'
    },
    {
      category: 'Risk',
      title: 'Business Automation Performance Decline',
      description: 'Declining visibility trend requires immediate attention',
      impact: 'Medium',
      effort: 'Low',
      timeline: '1 month'
    },
    {
      category: 'Optimization',
      title: 'Gemini 1.5 Model Performance',
      description: 'Underperforming model needs content optimization',
      impact: 'Medium',
      effort: 'Medium',
      timeline: '1-2 months'
    }
  ];

  const pieData = [
    { name: 'Mentioned', value: 68.2, color: '#10b981' },
    { name: 'Not Mentioned', value: 31.8, color: '#ef4444' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'moderate':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="border-slate-300">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">{domainData.brandName}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{domainData.domain}</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700 border-slate-300">{domainData.industry}</Badge>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{domainData.marketPosition}</Badge>
                </div>
                <p className="text-slate-600 mt-2 max-w-2xl">{domainData.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600 mb-1">{domainData.visibilityScore}%</div>
              <div className="text-sm text-slate-600 mb-2">AI Visibility Score</div>
              <div className="flex items-center text-sm text-emerald-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{domainData.monthlyGrowth}% this month
              </div>
            </div>
          </div>

          {/* Time Range and Model Selectors */}
          <div className="flex space-x-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32 border-slate-300">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-40 border-slate-300">
                <SelectValue placeholder="AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="gpt4o">GPT-4o</SelectItem>
                <SelectItem value="claude35">Claude 3.5</SelectItem>
                <SelectItem value="gemini15">Gemini 1.5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Mention Rate</p>
                  <p className="text-2xl font-bold text-slate-900">{domainData.mentionRate}%</p>
                </div>
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <Progress value={domainData.mentionRate} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Quality Score</p>
                  <p className="text-2xl font-bold text-slate-900">{domainData.qualityScore}/5</p>
                </div>
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <Progress value={(domainData.qualityScore / 5) * 100} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Consistency</p>
                  <p className="text-2xl font-bold text-slate-900">{domainData.consistencyScore}%</p>
                </div>
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <Progress value={domainData.consistencyScore} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Market Reach</p>
                  <p className="text-2xl font-bold text-slate-900">{domainData.reachScore}%</p>
                </div>
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <Progress value={domainData.reachScore} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Total Queries</p>
                  <p className="text-2xl font-bold text-slate-900">{domainData.totalQueries}</p>
                </div>
                <BarChart3 className="h-6 w-6 text-slate-600" />
              </div>
              <div className="text-xs text-emerald-600 mt-1">+23% vs last month</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Compliance</p>
                  <p className="text-2xl font-bold text-slate-900">{domainData.complianceScore}%</p>
                </div>
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs mt-1">
                Excellent
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-slate-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-white">Performance</TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-white">AI Models</TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-white">Keywords</TabsTrigger>
            <TabsTrigger value="competitive" className="data-[state=active]:bg-white">Competitive</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-white">Risk & Compliance</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-white">Strategic Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Trend with enhanced details */}
              <Card className="lg:col-span-2 border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Comprehensive Performance Analysis</CardTitle>
                  <CardDescription className="text-slate-600">
                    Multi-dimensional performance tracking across visibility, sentiment, and growth metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }} 
                      />
                      <Area type="monotone" dataKey="score" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                      <Area type="monotone" dataKey="mentions" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                      <Area type="monotone" dataKey="sentiment" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced Distribution Chart */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Mention Distribution</CardTitle>
                  <CardDescription className="text-slate-600">
                    Brand presence across AI model responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-700">Mentioned</span>
                      </div>
                      <span className="font-semibold text-slate-900">{domainData.mentionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-700">Not Mentioned</span>
                      </div>
                      <span className="font-semibold text-slate-900">{(100 - domainData.mentionRate).toFixed(1)}%</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="text-xs text-slate-600">
                        Market Position: {domainData.competitorAnalysis}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics Over Time</CardTitle>
                <CardDescription>Track visibility score, mentions, and query volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="Visibility Score" />
                    <Line type="monotone" dataKey="mentions" stroke="#10b981" strokeWidth={2} name="Mentions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Detailed breakdown by AI model</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Visibility Score</TableHead>
                      <TableHead>Mentions</TableHead>
                      <TableHead>Total Queries</TableHead>
                      <TableHead>Avg Latency</TableHead>
                      <TableHead>Avg Cost</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Consistency</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Reliability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelPerformance.map((model) => (
                      <TableRow key={model.model}>
                        <TableCell className="font-medium">{model.model}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{model.score}%</span>
                            <Progress value={model.score} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{model.mentions}</TableCell>
                        <TableCell>{model.totalQueries}</TableCell>
                        <TableCell>{model.avgLatency}s</TableCell>
                        <TableCell>${model.avgCost.toFixed(3)}</TableCell>
                        <TableCell>{model.accuracy}%</TableCell>
                        <TableCell>{model.consistency}%</TableCell>
                        <TableCell>{model.sentiment}/5</TableCell>
                        <TableCell>{model.reliability}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Performance</CardTitle>
                <CardDescription>How your keywords perform across AI responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead>Mentions</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Competition</TableHead>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Queries</TableHead>
                      <TableHead>Conversion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordPerformance.map((keyword, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{keyword.visibility}%</span>
                            <Progress value={keyword.visibility} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{keyword.mentions}</TableCell>
                        <TableCell>{keyword.sentiment}/5</TableCell>
                        <TableCell>{getTrendIcon(keyword.trend)}</TableCell>
                        <TableCell>{keyword.competition}</TableCell>
                        <TableCell>{keyword.opportunity}%</TableCell>
                        <TableCell>{keyword.queries}</TableCell>
                        <TableCell>{keyword.conversion}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>Compare your brand's performance against competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Your Brand</TableHead>
                      <TableHead>Competitor 1</TableHead>
                      <TableHead>Competitor 2</TableHead>
                      <TableHead>Competitor 3</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorComparison.map((metric) => (
                      <TableRow key={metric.metric}>
                        <TableCell className="font-medium">{metric.metric}</TableCell>
                        <TableCell>{metric.yourBrand}</TableCell>
                        <TableCell>{metric.competitor1}</TableCell>
                        <TableCell>{metric.competitor2}</TableCell>
                        <TableCell>{metric.competitor3}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk & Compliance</CardTitle>
                <CardDescription>Monitor and manage potential risks and compliance issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riskAssessment.map((risk) => (
                      <TableRow key={risk.category}>
                        <TableCell className="font-medium">{risk.category}</TableCell>
                        <TableCell>{risk.score}</TableCell>
                        <TableCell>{getStatusIcon(risk.status)}</TableCell>
                        <TableCell>{risk.trend}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">High GPT-4o Performance</p>
                        <p className="text-sm text-gray-600">Consistently mentioned in 82% of responses</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">Strong Project Management Presence</p>
                        <p className="text-sm text-gray-600">Leading keyword with 85% visibility</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">Positive Sentiment</p>
                        <p className="text-sm text-gray-600">Average sentiment score of 3.7/5</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">Gemini 1.5 Performance</p>
                        <p className="text-sm text-gray-600">Lower visibility at 75% - opportunity for optimization</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">Business Automation Keywords</p>
                        <p className="text-sm text-gray-600">Declining trend with only 68% visibility</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">Query Volume</p>
                        <p className="text-sm text-gray-600">Consider expanding to more diverse phrases</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DomainDashboard;
