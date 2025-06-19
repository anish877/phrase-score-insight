
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Search, Plus, TrendingUp, TrendingDown, Calendar, Globe, BarChart3, Eye, Star, Clock, Activity, Filter, ArrowUpDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyzedDomain {
  id: string;
  domain: string;
  brandName: string;
  visibilityScore: number;
  lastAnalyzed: string;
  keywordCount: number;
  phraseCount: number;
  status: 'completed' | 'analyzing' | 'failed';
  industry: string;
  mentionRate: number;
  avgSentiment: number;
  totalQueries: number;
  topModel: string;
  improvement: number;
  riskLevel: 'low' | 'medium' | 'high';
  complianceScore: number;
}

const MainDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('lastAnalyzed');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Enhanced mock data for analyzed domains
  const analyzedDomains: AnalyzedDomain[] = [
    {
      id: '1',
      domain: 'techcorp.com',
      brandName: 'TechCorp Solutions',
      visibilityScore: 78.5,
      lastAnalyzed: '2024-06-15',
      keywordCount: 25,
      phraseCount: 125,
      status: 'completed',
      industry: 'Technology',
      mentionRate: 68.2,
      avgSentiment: 4.1,
      totalQueries: 375,
      topModel: 'GPT-4o',
      improvement: 12.3,
      riskLevel: 'low',
      complianceScore: 94
    },
    {
      id: '2',
      domain: 'healthplus.io',
      brandName: 'HealthPlus Medical',
      visibilityScore: 82.3,
      lastAnalyzed: '2024-06-14',
      keywordCount: 18,
      phraseCount: 90,
      status: 'completed',
      industry: 'Healthcare',
      mentionRate: 72.8,
      avgSentiment: 4.3,
      totalQueries: 280,
      topModel: 'Claude 3.5',
      improvement: 8.7,
      riskLevel: 'low',
      complianceScore: 97
    },
    {
      id: '3',
      domain: 'financeapp.com',
      brandName: 'Finance App Pro',
      visibilityScore: 65.2,
      lastAnalyzed: '2024-06-13',
      keywordCount: 32,
      phraseCount: 160,
      status: 'completed',
      industry: 'Finance',
      mentionRate: 58.4,
      avgSentiment: 3.8,
      totalQueries: 420,
      topModel: 'Gemini 1.5',
      improvement: -3.2,
      riskLevel: 'medium',
      complianceScore: 89
    },
    {
      id: '4',
      domain: 'ecomstore.shop',
      brandName: 'EcomStore Premium',
      visibilityScore: 0,
      lastAnalyzed: '2024-06-16',
      keywordCount: 0,
      phraseCount: 0,
      status: 'analyzing',
      industry: 'E-commerce',
      mentionRate: 0,
      avgSentiment: 0,
      totalQueries: 0,
      topModel: '-',
      improvement: 0,
      riskLevel: 'low',
      complianceScore: 0
    },
    {
      id: '5',
      domain: 'consulting.biz',
      brandName: 'Strategic Consulting Group',
      visibilityScore: 71.8,
      lastAnalyzed: '2024-06-12',
      keywordCount: 28,
      phraseCount: 140,
      status: 'completed',
      industry: 'Consulting',
      mentionRate: 64.5,
      avgSentiment: 3.9,
      totalQueries: 315,
      topModel: 'GPT-4o',
      improvement: 15.6,
      riskLevel: 'low',
      complianceScore: 92
    }
  ];

  // Performance overview data
  const performanceOverview = [
    { month: 'Jan', totalScore: 45, queries: 1200, mentions: 650 },
    { month: 'Feb', totalScore: 52, queries: 1450, mentions: 780 },
    { month: 'Mar', totalScore: 58, queries: 1680, mentions: 920 },
    { month: 'Apr', totalScore: 65, queries: 1820, mentions: 1100 },
    { month: 'May', totalScore: 71, queries: 1950, mentions: 1280 },
    { month: 'Jun', totalScore: 74, queries: 2100, mentions: 1390 }
  ];

  const industryDistribution = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 25, color: '#10b981' },
    { name: 'Finance', value: 20, color: '#f59e0b' },
    { name: 'E-commerce', value: 15, color: '#8b5cf6' },
    { name: 'Consulting', value: 5, color: '#ef4444' }
  ];

  const filteredDomains = analyzedDomains
    .filter(domain =>
      (domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
       domain.brandName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterIndustry === 'all' || domain.industry.toLowerCase() === filterIndustry.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof AnalyzedDomain];
      const bValue = b[sortBy as keyof AnalyzedDomain];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      }
      return aValue > bValue ? 1 : -1;
    });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50';
    if (score >= 60) return 'text-amber-700 bg-amber-50';
    return 'text-red-700 bg-red-50';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>;
      case 'analyzing':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Analyzing</Badge>;
      case 'failed':
        return <Badge className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Unknown</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Low Risk</Badge>;
      case 'medium':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Medium Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Unknown</Badge>;
    }
  };

  const totalDomains = analyzedDomains.length;
  const completedDomains = analyzedDomains.filter(d => d.status === 'completed').length;
  const avgVisibilityScore = analyzedDomains
    .filter(d => d.status === 'completed')
    .reduce((acc, d) => acc + d.visibilityScore, 0) / completedDomains || 0;
  const totalQueries = analyzedDomains.reduce((acc, d) => acc + d.totalQueries, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                AI Visibility Intelligence Platform
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Comprehensive analytics and monitoring for your brand's artificial intelligence visibility across multiple platforms and models
              </p>
            </div>
            <Link to="/analyze">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Analyze New Domain
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Domains Monitored</p>
                  <p className="text-3xl font-bold text-slate-900">{totalDomains}</p>
                  <p className="text-xs text-slate-500 mt-1">Across {new Set(analyzedDomains.map(d => d.industry)).size} industries</p>
                </div>
                <Globe className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Analysis Completion Rate</p>
                  <p className="text-3xl font-bold text-slate-900">{Math.round((completedDomains / totalDomains) * 100)}%</p>
                  <p className="text-xs text-slate-500 mt-1">{completedDomains} of {totalDomains} completed</p>
                </div>
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Average Visibility Score</p>
                  <p className="text-3xl font-bold text-slate-900">{avgVisibilityScore.toFixed(1)}%</p>
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2% from last month
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total AI Queries Processed</p>
                  <p className="text-3xl font-bold text-slate-900">{totalQueries.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">Across all monitored domains</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Performance Trends</CardTitle>
              <CardDescription className="text-slate-600">
                Visibility score and query volume trends over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceOverview}>
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
                  <Line 
                    type="monotone" 
                    dataKey="totalScore" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    name="Avg Visibility Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="queries" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    name="Total Queries"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Industry Distribution</CardTitle>
              <CardDescription className="text-slate-600">
                Breakdown of monitored domains by industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {industryDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {industryDistribution.map((industry, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: industry.color }}
                      ></div>
                      <span className="text-slate-700">{industry.name}</span>
                    </div>
                    <span className="font-medium text-slate-900">{industry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filters and Search */}
        <Card className="border-slate-200 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search domains, brands, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300 focus:border-slate-500"
                />
              </div>
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger className="lg:w-48 border-slate-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="e-commerce">E-commerce</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="lg:w-48 border-slate-300">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastAnalyzed">Last Analyzed</SelectItem>
                  <SelectItem value="visibilityScore">Visibility Score</SelectItem>
                  <SelectItem value="brandName">Brand Name</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Domains Table */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Domain Analysis Overview</CardTitle>
            <CardDescription className="text-slate-600">
              Comprehensive metrics and performance indicators for all monitored domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-700 font-semibold">Domain & Brand</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Visibility Score</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Status & Risk</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Performance Metrics</TableHead>
                  <TableHead className="text-slate-700 font-semibold">AI Model Performance</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDomains.map((domain) => (
                  <TableRow key={domain.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell>
                      <Link to={`/dashboard/${domain.domain}`} className="block">
                        <div>
                          <p className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                            {domain.brandName}
                          </p>
                          <div className="flex items-center text-sm text-slate-600 mt-1">
                            <Globe className="h-3 w-3 mr-1" />
                            {domain.domain}
                          </div>
                          <Badge className="mt-2 bg-slate-100 text-slate-700 border-slate-300">
                            {domain.industry}
                          </Badge>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {domain.status === 'completed' ? (
                        <div>
                          <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(domain.visibilityScore)}`}>
                            {domain.visibilityScore}%
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            {domain.improvement > 0 ? (
                              <TrendingUp className="h-3 w-3 text-emerald-600 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                            )}
                            <span className={domain.improvement > 0 ? 'text-emerald-600' : 'text-red-600'}>
                              {domain.improvement > 0 ? '+' : ''}{domain.improvement}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-300 border-t-blue-600"></div>
                          <span className="ml-2 text-slate-600">Processing...</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        {getStatusBadge(domain.status)}
                        {domain.status === 'completed' && getRiskBadge(domain.riskLevel)}
                        {domain.status === 'completed' && (
                          <div className="text-xs text-slate-600">
                            Compliance: {domain.complianceScore}%
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {domain.status === 'completed' ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Mention Rate:</span>
                            <span className="font-medium">{domain.mentionRate}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Avg Sentiment:</span>
                            <span className="font-medium flex items-center">
                              <Star className="h-3 w-3 text-amber-500 mr-1" />
                              {domain.avgSentiment}/5
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Total Queries:</span>
                            <span className="font-medium">{domain.totalQueries}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {domain.status === 'completed' ? (
                        <div>
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                            {domain.topModel}
                          </Badge>
                          <div className="text-xs text-slate-600 mt-1">
                            Best performing model
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(domain.lastAnalyzed).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredDomains.length === 0 && (
          <Card className="border-slate-200 shadow-sm mt-6">
            <CardContent className="text-center py-12">
              <Globe className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No domains found</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                {searchTerm || filterIndustry !== 'all' 
                  ? 'Try adjusting your search terms or filters to find relevant domains' 
                  : 'Start monitoring your brand\'s AI visibility by analyzing your first domain'}
              </p>
              <Link to="/analyze">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Analyze First Domain
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
