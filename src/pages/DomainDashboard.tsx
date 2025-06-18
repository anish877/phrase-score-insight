
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Globe, BarChart3, Eye, MessageSquare, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const DomainDashboard = () => {
  const { domain } = useParams<{ domain: string }>();

  // Mock detailed data for the domain
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
    description: 'Leading provider of enterprise software solutions and cloud-based platforms for modern businesses.'
  };

  // Mock performance data over time
  const performanceData = [
    { month: 'Jan', score: 65, mentions: 45, queries: 200 },
    { month: 'Feb', score: 68, mentions: 52, queries: 230 },
    { month: 'Mar', score: 71, mentions: 58, queries: 250 },
    { month: 'Apr', score: 74, mentions: 65, queries: 280 },
    { month: 'May', score: 76, mentions: 71, queries: 320 },
    { month: 'Jun', score: 78.5, mentions: 78, queries: 375 }
  ];

  // Mock AI model performance
  const modelPerformance = [
    { model: 'GPT-4o', score: 82, mentions: 95, totalQueries: 125, avgLatency: 2.1, avgCost: 0.03 },
    { model: 'Claude 3.5', score: 78, mentions: 88, totalQueries: 125, avgLatency: 1.8, avgCost: 0.025 },
    { model: 'Gemini 1.5', score: 75, mentions: 82, totalQueries: 125, avgLatency: 2.3, avgCost: 0.02 }
  ];

  // Mock keyword performance
  const keywordPerformance = [
    { keyword: 'project management software', visibility: 85, mentions: 12, sentiment: 4.2, trend: 'up' },
    { keyword: 'enterprise solutions', visibility: 78, mentions: 8, sentiment: 3.9, trend: 'up' },
    { keyword: 'cloud platform', visibility: 72, mentions: 15, sentiment: 4.0, trend: 'stable' },
    { keyword: 'business automation', visibility: 68, mentions: 6, sentiment: 3.7, trend: 'down' },
    { keyword: 'workflow management', visibility: 65, mentions: 9, sentiment: 3.8, trend: 'up' }
  ];

  // Mock top phrases
  const topPhrases = [
    { phrase: 'What is the best project management software?', score: 92, model: 'GPT-4o', sentiment: 4.5 },
    { phrase: 'Top enterprise solutions for small business', score: 88, model: 'Claude 3.5', sentiment: 4.2 },
    { phrase: 'Cloud platform comparison 2024', score: 85, model: 'Gemini 1.5', sentiment: 4.0 },
    { phrase: 'How to choose business automation tools', score: 82, model: 'GPT-4o', sentiment: 3.9 },
    { phrase: 'Best workflow management systems', score: 78, model: 'Claude 3.5', sentiment: 3.8 }
  ];

  const pieData = [
    { name: 'Mentioned', value: 68.2, color: '#10b981' },
    { name: 'Not Mentioned', value: 31.8, color: '#ef4444' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{domainData.brandName}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{domainData.domain}</span>
                  <Badge className="bg-blue-100 text-blue-800">{domainData.industry}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{domainData.visibilityScore}%</div>
              <div className="text-sm text-gray-600">AI Visibility Score</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Eye className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Mention Rate</p>
                  <p className="text-xl font-bold text-gray-900">{domainData.mentionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-6 w-6 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Avg Relevance</p>
                  <p className="text-xl font-bold text-gray-900">{domainData.avgRelevance}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Avg Sentiment</p>
                  <p className="text-xl font-bold text-gray-900">{domainData.avgSentiment}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Queries</p>
                  <p className="text-xl font-bold text-gray-900">{domainData.totalQueries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(domainData.lastAnalyzed).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="phrases">Top Phrases</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Visibility Trend</CardTitle>
                  <CardDescription>AI visibility score over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Mention Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Mention Distribution</CardTitle>
                  <CardDescription>Brand mentions across AI responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
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
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Mentioned ({domainData.mentionRate}%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Not Mentioned ({(100 - domainData.mentionRate).toFixed(1)}%)</span>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phrases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Phrases</CardTitle>
                <CardDescription>Phrases that generate the best AI visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPhrases.map((phrase, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{phrase.phrase}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Model: {phrase.model}</span>
                          <span>Sentiment: {phrase.sentiment}/5</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                        {phrase.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
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
