
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, Plus, TrendingUp, Calendar, Globe, BarChart3 } from 'lucide-react';

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
}

const MainDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for analyzed domains
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
      industry: 'Technology'
    },
    {
      id: '2',
      domain: 'healthplus.io',
      brandName: 'HealthPlus',
      visibilityScore: 82.3,
      lastAnalyzed: '2024-06-14',
      keywordCount: 18,
      phraseCount: 90,
      status: 'completed',
      industry: 'Healthcare'
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
      industry: 'Finance'
    },
    {
      id: '4',
      domain: 'ecomstore.shop',
      brandName: 'EcomStore',
      visibilityScore: 0,
      lastAnalyzed: '2024-06-16',
      keywordCount: 0,
      phraseCount: 0,
      status: 'analyzing',
      industry: 'E-commerce'
    }
  ];

  const filteredDomains = analyzedDomains.filter(domain =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'analyzing':
        return <Badge className="bg-blue-100 text-blue-800">Analyzing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const totalDomains = analyzedDomains.length;
  const completedDomains = analyzedDomains.filter(d => d.status === 'completed').length;
  const avgVisibilityScore = analyzedDomains
    .filter(d => d.status === 'completed')
    .reduce((acc, d) => acc + d.visibilityScore, 0) / completedDomains || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Visibility Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor and analyze your brand's AI visibility across domains
              </p>
            </div>
            <Link to="/analyze">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Analyze New Domain
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Domains</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDomains}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedDomains}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Visibility</p>
                  <p className="text-2xl font-bold text-gray-900">{avgVisibilityScore.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDomains}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search domains or brand names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDomains.map((domain) => (
            <Card key={domain.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={`/dashboard/${domain.domain}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{domain.brandName}</CardTitle>
                    {getStatusBadge(domain.status)}
                  </div>
                  <CardDescription className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {domain.domain}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Visibility Score */}
                    {domain.status === 'completed' ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">AI Visibility Score</span>
                        <span className={`text-2xl font-bold px-3 py-1 rounded-full ${getScoreColor(domain.visibilityScore)}`}>
                          {domain.visibilityScore}%
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
                        <span className="ml-2 text-gray-600">Analyzing...</span>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{domain.keywordCount}</p>
                        <p className="text-xs text-gray-600">Keywords</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{domain.phraseCount}</p>
                        <p className="text-xs text-gray-600">Phrases</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{domain.industry}</p>
                        <p className="text-xs text-gray-600">Industry</p>
                      </div>
                    </div>

                    {/* Last Analyzed */}
                    <div className="text-xs text-gray-500 text-center border-t pt-3">
                      Last analyzed: {new Date(domain.lastAnalyzed).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDomains.length === 0 && (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No domains found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by analyzing your first domain'}
            </p>
            <Link to="/analyze">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Analyze Domain
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
