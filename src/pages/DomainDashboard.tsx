import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Globe, BarChart3, Eye, MessageSquare, Star, Users, Target, AlertTriangle, Lightbulb, RefreshCw, Activity, Shield, Award, Zap, Link as LinkIcon, FileText, LayoutDashboard, Search, Target as TargetIcon, BarChart3 as BarChart3Icon, Cpu, FileText as FileTextIcon, Users as UsersIcon, MessageSquare as MessageSquareIcon, History, Settings, ChevronRight, Home, Layers, TrendingUp as TrendingUpIcon, Activity as ActivityIcon, Globe as GlobeIcon, Zap as ZapIcon, Shield as ShieldIcon, Award as AwardIcon, Calculator, Lock, CreditCard, Crown, ChevronUp, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import type { Keyword } from '@/services/api';
import type { AIQueryResult } from '@/components/AIQueryResults';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart as ReLineChart, Line as ReLine, XAxis as ReXAxis, YAxis as ReYAxis, Tooltip as ReTooltip, Legend as ReLegend, ResponsiveContainer as ReResponsiveContainer, CartesianGrid as ReCartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import { unmaskDomainId, fallbackUnmaskDomainId } from '@/lib/domainUtils';

interface DomainData {
  id: number;
  url: string;
  context: string;
  lastAnalyzed: string;
  industry: string;
  description: string;
  crawlResults: Array<{
    pagesScanned: number;
    analyzedUrls: string[];
    extractedContext: string;
    tokenUsage?: number;
  }>;
  keywords: Array<{
    id: number;
    term: string;
    volume: number;
    difficulty: string;
    cpc: number;
    intent?: string;
    isSelected: boolean;
    generatedIntentPhrases: Array<{
      id: number;
      phrase: string;
      relevanceScore?: number;
      intent?: string;
      intentConfidence?: number;
      sources?: Record<string, unknown>;
      trend?: string;
      isSelected: boolean;
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
        keyword?: string;
        phraseText?: string;
        competitors?: {
          names: string[];
          mentions: Array<{
            name: string;
            domain: string;
            position: number;
            context: string;
            sentiment: 'positive' | 'neutral' | 'negative';
            mentionType: 'url' | 'text' | 'brand';
          }>;
          totalMentions: number;
        };
      }>;
    }>;
  }>;
  phrases: Array<{ id: number; text: string; keywordId: number }>;
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
    keyword?: string;
    phraseText?: string;
    competitors?: {
      names: string[];
      mentions: Array<{
        name: string;
        domain: string;
        position: number;
        context: string;
        sentiment: 'positive' | 'neutral' | 'negative';
        mentionType: 'url' | 'text' | 'brand';
      }>;
      totalMentions: number;
    };
  }>;
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
    modelPerformance: Array<{ model: string; score: number; responses: number; mentions: number; avgScore: number; avgLatency?: string; avgCost?: string; avgRelevance?: string; avgAccuracy?: string; avgSentiment?: string; avgOverall?: string }>;
    keywordPerformance: Array<{ keyword: string; visibility: number; mentions: number; sentiment: number; volume: number; difficulty: string; cpc?: number }>;
    topPhrases: Array<{ phrase: string; count: number }>;
    performanceData: Array<{ month: string; score: number; mentions?: number; queries?: number; organicTraffic?: number; backlinks?: number; domainAuthority?: number }>;
    // Enhanced SEO metrics
    seoMetrics?: {
      organicTraffic: number;
      backlinks: number;
      domainAuthority: number;
      pageSpeed: number;
      mobileScore: number;
      coreWebVitals: { lcp: number; fid: number; cls: number };
      technicalSeo: { ssl: boolean; mobile: boolean; sitemap: boolean; robots: boolean };
      contentQuality: { readability: number; depth: number; freshness: number };
    };
    keywordAnalytics?: {
      highVolume: number;
      mediumVolume: number;
      lowVolume: number;
      highDifficulty: number;
      mediumDifficulty: number;
      lowDifficulty: number;
      longTail: number;
      branded: number;
      nonBranded: number;
    };
    competitiveAnalysis?: {
      marketShare: number;
      competitorCount: number;
      avgCompetitorScore: number;
      marketPosition: string;
      competitiveGap: number;
    };
    contentPerformance?: {
      totalPages: number;
      indexedPages: number;
      avgPageScore: number;
      topPerformingPages: Array<{ url: string; score: number; traffic: number }>;
      contentGaps: string[];
    };
    technicalMetrics?: {
      crawlability: number;
      indexability: number;
      mobileFriendliness: number;
      pageSpeedScore: number;
      securityScore: number;
    };
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
  extraction?: {
    tokenUsage: number;
  };
  competitorData?: CompetitorData | null;
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
  competitorListArr?: string[];
  totalResponses?: number;
  oldCompetitors?: Array<{
    name?: string;
    competitor?: string;
    threatLevel?: string;
    marketShare?: string;
    keyStrengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  }>; // Old analysis results
  oldMarketInsights?: {
    totalCompetitors?: string;
    marketLeader?: string;
    emergingThreats?: string[];
    opportunities?: string[];
    marketTrends?: string[];
    marketSize?: string;
    growthRate?: string;
  };
  oldStrategicRecommendations?: Array<{
    category?: string;
    priority?: string;
    action?: string;
    expectedImpact?: string;
    timeline?: string;
    resourceRequirement?: string;
  }>;
  oldCompetitiveAnalysis?: {
    domainAdvantages?: string[];
    domainWeaknesses?: string[];
    competitiveGaps?: string[];
    marketOpportunities?: string[];
    threatMitigation?: string[];
  };
  cached?: boolean; // Whether the data was cached
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
  phraseText?: string;
  competitors?: {
    names: string[];
    mentions: Array<{
      name: string;
      domain: string;
      position: number;
      context: string;
      sentiment: 'positive' | 'neutral' | 'negative';
      mentionType: 'url' | 'text' | 'brand';
    }>;
    totalMentions: number;
  };
}

// Helper function to get model color
const getModelColor = (model: string) => {
  const colors: Record<string, string> = {
    'GPT-4o': 'bg-blue-100 text-blue-800',
    'Claude 3': 'bg-green-100 text-green-800',
    'Gemini 1.5': 'bg-purple-100 text-purple-800'
  };
  return colors[model] || 'bg-slate-100 text-slate-800';
};

// Helper function to format markdown-like text
const formatResponseText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br>');
};


// Competitor Ranking Table Component
const CompetitorRankingTable: React.FC<{ 
  competitors: Array<{
    competitor: string;
    totalResponses: number;
    foundInResponses: number;
    presenceRate: number;
    avgScore: number;
    avgRank: number;
    avgRelevance: number;
    avgAccuracy: number;
    avgSentiment: number;
    totalMentions: number;
    detailedScores: Array<{
      phraseId: number;
      phraseText: string;
      model: string;
      response: string;
      presence: number;
      rank: number;
      relevance: number;
      accuracy: number;
      sentiment: number;
      overall: number;
      mentions: number;
      context: string;
      highlightContext: string;
      detectionMethod: string;
      competitors: {
        names: string[];
        mentions: Array<{
          name: string;
          domain: string;
          position: number;
          context: string;
          sentiment: 'positive' | 'neutral' | 'negative';
          mentionType: 'url' | 'text' | 'brand';
        }>;
        totalMentions: number;
      };
    }>;
  }>;
  domainData: {
    metrics?: {
      avgOverall?: number | string;
      visibilityScore?: number | string;
      mentionRate?: number | string;
      totalQueries?: number | string;
    };
  };
  oldCompetitors?: Array<{
    name?: string;
    competitor?: string;
    threatLevel?: string;
    marketShare?: string;
    keyStrengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  }>;
  oldMarketInsights?: {
    totalCompetitors?: string;
    marketLeader?: string;
    emergingThreats?: string[];
    opportunities?: string[];
    marketTrends?: string[];
    marketSize?: string;
    growthRate?: string;
  };
  oldStrategicRecommendations?: Array<{
    category?: string;
    priority?: string;
    action?: string;
    expectedImpact?: string;
    timeline?: string;
    resourceRequirement?: string;
  }>;
  oldCompetitiveAnalysis?: {
    domainAdvantages?: string[];
    domainWeaknesses?: string[];
    competitiveGaps?: string[];
    marketOpportunities?: string[];
    threatMitigation?: string[];
  };
  cached?: boolean;
}> = ({ competitors, domainData, oldCompetitors, oldMarketInsights, oldStrategicRecommendations, oldCompetitiveAnalysis, cached }) => {
  const [expandedRows, setExpandedRows] = useState<{[key: string]: boolean}>({});
  const [expandedResponseRows, setExpandedResponseRows] = useState<Set<string>>(new Set());

  // Helper function to safely convert metrics to numbers
  const getMetricValue = (value: number | string | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
  };

  const toggleRowExpansion = (competitor: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [competitor]: !prev[competitor]
    }));
  };

  const toggleResponseRowExpansion = (rowId: string) => {
    setExpandedResponseRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 2) return 'text-green-600';
    if (rank <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getThreatLevelColor = (level: string | undefined) => {
    if (!level) return 'bg-slate-50 text-slate-700 border-slate-200';
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

  const getPresenceRateColor = (rate: number) => {
    if (rate >= 50) return 'text-green-600';
    if (rate >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border border-slate-200">
      <CardHeader>
        <div className="flex flex-col items-center justify-center mb-2">
          <CardTitle className="text-2xl font-bold text-slate-900 mb-1">Competitor Ranking Analysis</CardTitle>
          <CardDescription className="text-slate-600 text-center max-w-2xl">
            AI-powered analysis of competitor performance across all phrase responses
          </CardDescription>
        </div>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">{competitors.length}</div>
            <div className="text-sm text-slate-600">Competitors</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {competitors.filter(c => c.presenceRate > 0).length}
            </div>
            <div className="text-sm text-slate-600">Found in Responses</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {competitors.length > 0 ? 
                (competitors.reduce((sum, c) => sum + c.avgScore, 0) / competitors.length).toFixed(1) : '0'
              }
            </div>
            <div className="text-sm text-slate-600">Avg Score</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {competitors.reduce((sum, c) => sum + c.totalMentions, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Mentions</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Domain vs Competitors Summary Comparison */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Domain vs Competitors Summary</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Our Domain */}
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Our Domain</span>
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Avg Score:</span>
                  <span className="font-bold text-blue-900">
                    {Math.round(getMetricValue(domainData.metrics?.avgOverall) * 10) / 10}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Visibility:</span>
                  <span className="font-bold text-blue-900">
                    {getMetricValue(domainData.metrics?.visibilityScore).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Mention Rate:</span>
                  <span className="font-bold text-blue-900">
                    {getMetricValue(domainData.metrics?.mentionRate).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Best Competitor */}
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h5 className="font-semibold text-orange-900 mb-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Best Competitor</span>
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-orange-700">Avg Score:</span>
                  <span className="font-bold text-orange-900">
                    {competitors.length > 0 ? competitors[0].avgScore.toFixed(1) : 'N/A'}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-orange-700">Presence Rate:</span>
                  <span className="font-bold text-orange-900">
                    {competitors.length > 0 ? competitors[0].presenceRate.toFixed(1) : 'N/A'}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-orange-700">Avg Rank:</span>
                  <span className="font-bold text-orange-900">
                    {competitors.length > 0 && competitors[0].avgRank > 0 ? `#${competitors[0].avgRank.toFixed(1)}` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Competitive Position */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Competitive Position</span>
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Our Rank:</span>
                  <span className="font-bold text-green-900">
                    {(() => {
                      const ourScore = getMetricValue(domainData.metrics?.avgOverall);
                      const betterCompetitors = competitors.filter(c => c.avgScore > ourScore).length;
                      return `#${betterCompetitors + 1}`;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Score Gap:</span>
                  <span className="font-bold text-green-900">
                    {(() => {
                      const ourScore = getMetricValue(domainData.metrics?.avgOverall);
                      const bestCompetitor = competitors.length > 0 ? competitors[0].avgScore : 0;
                      const gap = bestCompetitor - ourScore;
                      return gap > 0 ? `-${gap.toFixed(1)}` : `+${Math.abs(gap).toFixed(1)}`;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Market Position:</span>
                  <span className="font-bold text-green-900">
                    {(() => {
                      const ourScore = getMetricValue(domainData.metrics?.avgOverall);
                      const avgCompetitorScore = competitors.length > 0 ? 
                        competitors.reduce((sum, c) => sum + c.avgScore, 0) / competitors.length : 0;
                      return ourScore > avgCompetitorScore ? 'Above Avg' : 'Below Avg';
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-700 font-medium w-12">Rank</TableHead>
                <TableHead className="text-slate-700 font-medium">Competitor</TableHead>
                <TableHead className="text-slate-700 font-medium">Presence Rate</TableHead>
                <TableHead className="text-slate-700 font-medium">Avg Score</TableHead>
                <TableHead className="text-slate-700 font-medium">Avg Rank</TableHead>
                <TableHead className="text-slate-700 font-medium">Mentions</TableHead>
                <TableHead className="text-slate-700 font-medium">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((competitor, index) => {
                const isExpanded = expandedRows[competitor.competitor];
                
                return (
                  <Fragment key={competitor.competitor}>
                    <TableRow className="border-slate-100">
                      {/* Rank */}
                      <TableCell className="w-12">
                        <div className="flex items-center justify-center">
                          <Badge className={`${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            index === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            #{index + 1}
                          </Badge>
                        </div>
                      </TableCell>

                      {/* Competitor Name */}
                      <TableCell className="font-medium text-slate-900">
                        {competitor.competitor}
                      </TableCell>

                      {/* Presence Rate */}
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getPresenceRateColor(competitor.presenceRate)}`}>
                            {competitor.presenceRate.toFixed(1)}%
                          </span>
                          <Progress value={competitor.presenceRate} className="w-16 h-2" />
                        </div>
                        <div className="text-xs text-slate-500">
                          {competitor.foundInResponses}/{competitor.totalResponses} responses
                        </div>
                      </TableCell>

                      {/* Average Score */}
                      <TableCell>
                        <div className="text-center">
                          <span className={`font-bold text-lg ${getScoreColor(competitor.avgScore)}`}>
                            {Math.round(competitor.avgScore * 10) / 10}/5
                          </span>
                        </div>
                      </TableCell>

                      {/* Average Rank */}
                      <TableCell>
                        <div className="text-center">
                          <span className={`font-bold text-lg ${getRankColor(competitor.avgRank)}`}>
                            {competitor.avgRank > 0 ? `#${Math.round(competitor.avgRank)}` : 'N/A'}
                          </span>
                        </div>
                      </TableCell>

                      {/* Total Mentions */}
                      <TableCell>
                        <div className="text-center">
                          <span className="font-bold text-lg text-slate-900">
                            {competitor.totalMentions}
                          </span>
                        </div>
                      </TableCell>

                      {/* Expand/Collapse Button */}
                      <TableCell className="w-12">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(competitor.competitor)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row with Detailed Scores */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-slate-50 p-6">
                          <div className="space-y-6">
                            {/* Detailed Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{Math.round(competitor.avgRelevance * 10) / 10}/5</div>
                                <div className="text-sm text-slate-600">Avg Relevance</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{Math.round(competitor.avgAccuracy * 10) / 10}/5</div>
                                <div className="text-sm text-slate-600">Avg Accuracy</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{Math.round(competitor.avgSentiment * 10) / 10}/5</div>
                                <div className="text-sm text-slate-600">Avg Sentiment</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{competitor.foundInResponses}</div>
                                <div className="text-sm text-slate-600">Responses Found</div>
                              </div>
                            </div>

                            {/* Detailed Scores Table with Responses */}
                            {competitor.detailedScores.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
                                  <BarChart3 className="h-4 w-4" />
                                  <span>Detailed Response Analysis</span>
                                </h4>
                                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-48">Phrase</TableHead>
                                        <TableHead className="w-20">Model</TableHead>
                                        <TableHead className="w-16">Score</TableHead>
                                        <TableHead className="w-16">Rank</TableHead>
                                        <TableHead className="w-20">Relevance</TableHead>
                                        <TableHead className="w-20">Accuracy</TableHead>
                                        <TableHead className="w-20">Sentiment</TableHead>
                                        <TableHead className="w-20">Mentions</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {competitor.detailedScores.map((score, idx) => {
                                        const rowId = `${competitor.competitor}-${score.phraseId}-${idx}`;
                                        const isResponseExpanded = expandedResponseRows.has(rowId);
                                        
                                        return (
                                          <React.Fragment key={idx}>
                                            <TableRow 
                                              className="cursor-pointer hover:bg-slate-50 transition-colors"
                                              onClick={() => toggleResponseRowExpansion(rowId)}
                                            >
                                              <TableCell className="max-w-48">
                                                <div className="flex items-center space-x-2">
                                                  <div className="truncate font-medium text-slate-900" title={score.phraseText}>
                                                    {score.phraseText}
                                                  </div>
                                                  {isResponseExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                                                </div>
                                              </TableCell>
                                              <TableCell>
                                                <Badge className={getModelColor(score.model)}>
                                                  {score.model}
                                                </Badge>
                                              </TableCell>
                                              <TableCell>
                                                <span className={`font-bold ${getScoreColor(score.overall)}`}>
                                                  {Math.round(score.overall * 10) / 10}/5
                                                </span>
                                              </TableCell>
                                              <TableCell>
                                                <span className={`font-bold ${getRankColor(score.rank)}`}>
                                                  {score.rank > 0 ? `#${Math.round(score.rank)}` : 'N/A'}
                                                </span>
                                              </TableCell>
                                              <TableCell>
                                                <span className={`font-bold ${getScoreColor(score.relevance)}`}>
                                                  {Math.round(score.relevance * 10) / 10}/5
                                                </span>
                                              </TableCell>
                                              <TableCell>
                                                <span className={`font-bold ${getScoreColor(score.accuracy)}`}>
                                                  {Math.round(score.accuracy * 10) / 10}/5
                                                </span>
                                              </TableCell>
                                              <TableCell>
                                                <span className={`font-bold ${getScoreColor(score.sentiment)}`}>
                                                  {Math.round(score.sentiment * 10) / 10}/5
                                                </span>
                                              </TableCell>
                                              <TableCell>
                                                <span className="font-bold text-slate-900">
                                                  {score.mentions}
                                                </span>
                                              </TableCell>
                                            </TableRow>
                                            
                                            {/* Expanded Response Row */}
                                            {isResponseExpanded && (
                                              <TableRow>
                                                <TableCell colSpan={8} className="bg-slate-50 p-6">
                                                  <div className="space-y-4">
                                                    {/* Header */}
                                                    <div className="border-b border-slate-200 pb-3">
                                                      <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-slate-900">AI Response Analysis</h4>
                                                        <Button
                                                          variant="ghost"
                                                          size="sm"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleResponseRowExpansion(rowId);
                                                          }}
                                                          className="h-6 w-6 p-0"
                                                        >
                                                          <X className="h-4 w-4" />
                                                        </Button>
                                                      </div>
                                                      <div className="text-sm text-slate-600 mt-2">
                                                        <span className="font-medium">Phrase:</span> {score.phraseText} | 
                                                        <span className="font-medium"> Model:</span> {score.model} | 
                                                        <span className="font-medium"> Competitor:</span> {competitor.competitor}
                                                      </div>
                                                    </div>
                                                    
                                                    {/* Scores */}
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                                      <div className="bg-blue-50 p-3 rounded-lg">
                                                        <div className="font-medium text-blue-900">Overall Score</div>
                                                        <div className="text-xl font-bold text-blue-700">{Math.round(score.overall * 10) / 10}/5</div>
                                                      </div>
                                                      <div className="bg-green-50 p-3 rounded-lg">
                                                        <div className="font-medium text-green-900">Rank</div>
                                                        <div className="text-xl font-bold text-green-700">
                                                          {score.rank > 0 ? `#${Math.round(score.rank)}` : 'N/A'}
                                                        </div>
                                                      </div>
                                                      <div className="bg-purple-50 p-3 rounded-lg">
                                                        <div className="font-medium text-purple-900">Relevance</div>
                                                        <div className="text-xl font-bold text-purple-700">{Math.round(score.relevance * 10) / 10}/5</div>
                                                      </div>
                                                      <div className="bg-orange-50 p-3 rounded-lg">
                                                        <div className="font-medium text-orange-900">Accuracy</div>
                                                        <div className="text-xl font-bold text-orange-700">{Math.round(score.accuracy * 10) / 10}/5</div>
                                                      </div>
                                                      <div className="bg-pink-50 p-3 rounded-lg">
                                                        <div className="font-medium text-pink-900">Sentiment</div>
                                                        <div className="text-xl font-bold text-pink-700">{Math.round(score.sentiment * 10) / 10}/5</div>
                                                      </div>
                                                      <div className="bg-gray-50 p-3 rounded-lg">
                                                        <div className="font-medium text-gray-900">Mentions</div>
                                                        <div className="text-xl font-bold text-gray-700">{score.mentions}</div>
                                                      </div>
                                                    </div>
                                                    
                                                    {/* Context */}
                                                    {score.context && (
                                                      <div className="bg-slate-100 p-3 rounded-lg">
                                                        <div className="font-medium text-slate-900 mb-2">Context</div>
                                                        <div className="text-slate-700">{score.context}</div>
                                                      </div>
                                                    )}
                                                    
                                                    {/* Full Response */}
                                                    <div className="border-t border-slate-200 pt-4">
                                                      <div className="font-medium text-slate-900 mb-3">Full AI Response</div>
                                                      <div 
                                                        className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none bg-white p-4 rounded-lg border"
                                                        dangerouslySetInnerHTML={{ 
                                                          __html: `<p class="mb-3">${formatResponseText(score.response)}</p>` 
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </TableCell>
                                              </TableRow>
                                            )}
                                          </React.Fragment>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            )}

                            {/* Domain vs Competitor Comparison */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
                                <BarChart3 className="h-4 w-4" />
                                <span>Domain vs {competitor.competitor} Comparison</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Our Domain Performance */}
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                  <h5 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span>Our Domain Performance</span>
                                  </h5>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-700">Avg Score:</span>
                                      <span className="font-bold text-blue-900">
                                        {Math.round(getMetricValue(domainData.metrics?.avgOverall) * 10) / 10}/5
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-700">Visibility Score:</span>
                                      <span className="font-bold text-blue-900">
                                        {getMetricValue(domainData.metrics?.visibilityScore).toFixed(0)}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-700">Mention Rate:</span>
                                      <span className="font-bold text-blue-900">
                                        {getMetricValue(domainData.metrics?.mentionRate).toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-blue-700">Total Queries:</span>
                                      <span className="font-bold text-blue-900">
                                        {getMetricValue(domainData.metrics?.totalQueries).toFixed(0)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Competitor Performance */}
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                  <h5 className="font-semibold text-orange-900 mb-3 flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span>{competitor.competitor} Performance</span>
                                  </h5>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-orange-700">Avg Score:</span>
                                      <span className="font-bold text-orange-900">
                                        {Math.round(competitor.avgScore * 10) / 10}/5
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-orange-700">Presence Rate:</span>
                                      <span className="font-bold text-orange-900">
                                        {Math.round(competitor.presenceRate * 10) / 10}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-orange-700">Avg Rank:</span>
                                      <span className="font-bold text-orange-900">
                                        {competitor.avgRank > 0 ? `#${Math.round(competitor.avgRank)}` : 'N/A'}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-orange-700">Total Mentions:</span>
                                      <span className="font-bold text-orange-900">
                                        {competitor.totalMentions}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Performance Comparison Chart */}
                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <h6 className="font-medium text-slate-900 mb-3">Performance Comparison</h6>
                                <div className="space-y-3">
                                  {/* Score Comparison */}
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Average Score</span>
                                      <span className="font-medium">
                                        {getMetricValue(domainData.metrics?.avgOverall).toFixed(1)} vs {competitor.avgScore.toFixed(1)}
                                      </span>
                                    </div>
                                    <div className="flex space-x-2">
                                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                                        <div 
                                          className="bg-blue-500 h-2 rounded-full" 
                                          style={{ width: `${Math.min(100, ((getMetricValue(domainData.metrics?.avgOverall)) / 5) * 100)}%` }}
                                        ></div>
                                      </div>
                                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                                        <div 
                                          className="bg-orange-500 h-2 rounded-full" 
                                          style={{ width: `${Math.min(100, (competitor.avgScore / 5) * 100)}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Presence/Mention Rate Comparison */}
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Presence/Mention Rate</span>
                                      <span className="font-medium">
                                        {getMetricValue(domainData.metrics?.mentionRate).toFixed(1)}% vs {competitor.presenceRate.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="flex space-x-2">
                                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                                        <div 
                                          className="bg-blue-500 h-2 rounded-full" 
                                          style={{ width: `${Math.min(100, getMetricValue(domainData.metrics?.mentionRate))}%` }}
                                        ></div>
                                      </div>
                                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                                        <div 
                                          className="bg-orange-500 h-2 rounded-full" 
                                          style={{ width: `${Math.min(100, competitor.presenceRate)}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      {oldMarketInsights && (
        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Market Overview</span>
              <Badge variant="secondary" className="ml-2">AI Analysis</Badge>
            </CardTitle>
            <CardDescription>
              Comprehensive market insights and competitive landscape analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">Market Size</h4>
                <p className="text-2xl font-bold text-blue-600">{oldMarketInsights.marketSize || '—'}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">Growth Rate</h4>
                <p className="text-2xl font-bold text-green-600">{oldMarketInsights.growthRate || '—'}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">Market Leader</h4>
                <p className="text-lg font-medium text-slate-700">{oldMarketInsights.marketLeader || '—'}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">Total Competitors</h4>
                <p className="text-2xl font-bold text-orange-600">{oldMarketInsights.totalCompetitors || '—'}</p>
              </div>
            </div>
            
            {oldMarketInsights.opportunities && oldMarketInsights.opportunities.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-slate-900 mb-3">Market Opportunities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {oldMarketInsights.opportunities.map((opportunity, idx) => (
                    <div key={idx} className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {oldMarketInsights.marketTrends && oldMarketInsights.marketTrends.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-slate-900 mb-3">Market Trends</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {oldMarketInsights.marketTrends.map((trend, idx) => (
                    <div key={idx} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">{trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Strategic Recommendations */}
      {oldStrategicRecommendations && oldStrategicRecommendations.length > 0 && (
        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>Strategic Recommendations</span>
              <Badge variant="secondary" className="ml-2">AI Generated</Badge>
            </CardTitle>
            <CardDescription>
              Actionable strategies for your domain based on competitive analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {oldStrategicRecommendations.map((rec, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${
                        rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority || 'Medium'}
                      </Badge>
                      <Badge variant="outline">{rec.category || 'General'}</Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {rec.timeline || 'TBD'}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-slate-900 mb-2">{rec.action || 'Strategic Action'}</h4>
                  <p className="text-sm text-slate-700 mb-3">{rec.expectedImpact || 'Expected impact not specified'}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Resource: {rec.resourceRequirement || 'Medium'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Old Analysis Results */}
      {oldCompetitors && oldCompetitors.length > 0 && (
        <Card className="shadow-sm border border-slate-200 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>AI-Based Analysis Results</span>
              <Badge variant="secondary" className="ml-2">Legacy Method</Badge>
              {cached && <Badge variant="outline" className="ml-2">Cached</Badge>}
            </CardTitle>
            <CardDescription>
              Results from the traditional AI-based competitor analysis method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {oldCompetitors.map((competitor, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">{competitor.name || competitor.competitor}</h4>
                    <div className="flex space-x-4 text-sm">
                      {competitor.threatLevel && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getThreatLevelColor(competitor.threatLevel || 'Unknown')}`}>
                          {competitor.threatLevel}
                        </span>
                      )}
                      {competitor.marketShare && (
                        <span className="text-slate-600">Market Share: {competitor.marketShare}</span>
                      )}
                    </div>
                  </div>
                  
                  {competitor.keyStrengths && competitor.keyStrengths.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-green-700 mb-2">Key Strengths</h5>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {competitor.keyStrengths.map((strength: string, i: number) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-red-700 mb-2">Weaknesses</h5>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {competitor.weaknesses.map((weakness: string, i: number) => (
                          <li key={i}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {competitor.recommendations && competitor.recommendations.length > 0 && (
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Recommendations</h5>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {competitor.recommendations.map((rec: string, i: number) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    );
  };

const ModernAIResultsTable: React.FC<{ results: FlatAIQueryResult[]; onBulkReanalyze?: (phraseIds: number[]) => void; bulkReanalyzing?: boolean }> = ({ results, onBulkReanalyze, bulkReanalyzing = false }) => {
  const [page, setPage] = useState(1);
  const perPage = 20;
  const totalPages = Math.ceil(results.length / perPage);
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;
  const currentResults = results.slice(startIdx, endIdx);
  const [expandedRows, setExpandedRows] = useState<{[key: string]: boolean}>({});
  const [selectedPhrases, setSelectedPhrases] = useState<Set<number>>(new Set());

  // Helper to get phrase text
  function getPhraseText(result: FlatAIQueryResult) {
    if (result.phraseText) return result.phraseText;
    if (!result.phraseId) return '-';
    return `Phrase ID: ${result.phraseId}`;
  }

  // Helper to get domain presence status
  function getDomainPresenceStatus(presence: number) {
    if (presence === 1) return { status: 'Featured', color: 'bg-green-100 text-green-800 border-green-200', icon: '✓' };
    if (presence > 0) return { status: 'Mentioned', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '•' };
    return { status: 'Not Found', color: 'bg-red-100 text-red-800 border-red-200', icon: '✗' };
  }

  // Helper for score display
  function renderScore(value: number | undefined, type: 'relevance' | 'accuracy' | 'sentiment' | 'overall') {
    if (typeof value !== 'number') return <span className="text-slate-400">—</span>;
    let color = 'text-red-600', bgColor = 'bg-red-50', label = 'Low';
    if (type === 'relevance') {
      if (value >= 4) { color = 'text-green-600'; bgColor = 'bg-green-50'; label = 'High'; }
      else if (value >= 3) { color = 'text-yellow-600'; bgColor = 'bg-yellow-50'; label = 'Medium'; }
    } else if (type === 'accuracy') {
      if (value >= 4) { color = 'text-green-600'; bgColor = 'bg-green-50'; label = 'Trusted'; }
      else if (value >= 3) { color = 'text-yellow-600'; bgColor = 'bg-yellow-50'; label = 'Good'; }
      else { label = 'Poor'; }
    } else if (type === 'sentiment') {
      if (value >= 4) { color = 'text-green-600'; bgColor = 'bg-green-50'; label = 'Positive'; }
      else if (value >= 3) { color = 'text-yellow-600'; bgColor = 'bg-yellow-50'; label = 'Neutral'; }
      else { label = 'Negative'; }
    } else if (type === 'overall') {
      if (value >= 4) { color = 'text-green-600'; bgColor = 'bg-green-50'; label = 'Excellent'; }
      else if (value >= 3) { color = 'text-yellow-600'; bgColor = 'bg-yellow-50'; label = 'Good'; }
      else { label = 'Poor'; }
    }
    return (
      <div className={`${bgColor} rounded-lg p-2 text-center min-w-[60px]`}>
        <div className={`font-bold text-sm ${color}`}>{value}</div>
        <div className="text-xs text-slate-600">{label}</div>
      </div>
    );
  }

  // Toggle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  // Toggle phrase selection
  const togglePhraseSelection = (phraseId: number) => {
    setSelectedPhrases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phraseId)) {
        newSet.delete(phraseId);
      } else {
        newSet.add(phraseId);
      }
      return newSet;
    });
  };

  // Select all phrases on current page
  const selectAllPhrases = () => {
    const uniquePhraseIds = [...new Set(currentResults.map(r => r.phraseId))];
    setSelectedPhrases(new Set(uniquePhraseIds));
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedPhrases(new Set());
  };

  // Handle bulk re-analyze
  const handleBulkReanalyze = () => {
    if (!onBulkReanalyze || selectedPhrases.size === 0) return;
    const phraseIds = Array.from(selectedPhrases);
    onBulkReanalyze(phraseIds);
  };

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {onBulkReanalyze && (
        <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Bulk Actions</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllPhrases}
                  className="text-xs"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllSelections}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {selectedPhrases.size} phrases selected for re-analysis
              </div>
              <Button
                onClick={handleBulkReanalyze}
                disabled={selectedPhrases.size === 0 || bulkReanalyzing}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {bulkReanalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Re-analyzing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Re-analyze Selected
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modern Table */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50/50">
                <TableHead className="w-12 text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={currentResults.length > 0 && [...new Set(currentResults.map(r => r.phraseId))].every(id => selectedPhrases.has(id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        selectAllPhrases();
                      } else {
                        clearAllSelections();
                      }
                    }}
                    className="rounded border-slate-300"
                  />
                </TableHead>
                <TableHead className="w-12 text-slate-700 font-medium">Expand</TableHead>
                <TableHead className="text-slate-700 font-medium">AI Model</TableHead>
                <TableHead className="text-slate-700 font-medium min-w-[200px]">Query Phrase</TableHead>
                <TableHead className="text-slate-700 font-medium">Domain Presence</TableHead>
                <TableHead className="text-slate-700 font-medium">Overall Score</TableHead>
                <TableHead className="text-slate-700 font-medium">Relevance</TableHead>
                <TableHead className="text-slate-700 font-medium">Accuracy</TableHead>
                <TableHead className="text-slate-700 font-medium">Sentiment</TableHead>
                <TableHead className="text-slate-700 font-medium">Performance</TableHead>
                <TableHead className="text-slate-700 font-medium">Competitors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResults.map((result, index) => {
                const rowId = `${result.id}-${result.model}-${result.phraseId}`;
                const isExpanded = expandedRows[rowId];
                const presenceStatus = getDomainPresenceStatus(result.presence);
                const modelColor = getModelColor(result.model);
                
                return (
                  <Fragment key={rowId}>
                    <TableRow className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      {/* Checkbox */}
                      <TableCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedPhrases.has(result.phraseId)}
                          onChange={() => togglePhraseSelection(result.phraseId)}
                          className="rounded border-slate-300"
                        />
                      </TableCell>

                      {/* Expand Button */}
                      <TableCell className="w-12">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(rowId)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </TableCell>

                      {/* AI Model */}
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold ${modelColor}`}>
                            {result.model.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900 text-sm">{result.model}</span>
                        </div>
                      </TableCell>

                      {/* Query Phrase */}
                      <TableCell className="min-w-[200px]">
                        <div className="space-y-1">
                          <div className="font-medium text-slate-900 text-sm leading-relaxed">
                            {getPhraseText(result)}
                          </div>
                          {result.keyword && (
                            <div className="text-xs text-slate-500">Keyword: {result.keyword}</div>
                          )}
                        </div>
                      </TableCell>

                      {/* Domain Presence */}
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${presenceStatus.color}`}>
                          <span className="mr-1">{presenceStatus.icon}</span>
                          {presenceStatus.status}
                        </div>
                      </TableCell>

                      {/* Overall Score */}
                      <TableCell>
                        {renderScore(result.overall, 'overall')}
                      </TableCell>

                      {/* Relevance */}
                      <TableCell>
                        {renderScore(result.relevance, 'relevance')}
                      </TableCell>

                      {/* Accuracy */}
                      <TableCell>
                        {renderScore(result.accuracy, 'accuracy')}
                      </TableCell>

                      {/* Sentiment */}
                      <TableCell>
                        {renderScore(result.sentiment, 'sentiment')}
                      </TableCell>

                      {/* Performance */}
                      <TableCell>
                        <div className="space-y-1 text-xs">
                          <div className="text-slate-600">
                            <span className="font-medium">Lat:</span> {result.latency.toFixed(2)}s
                          </div>
                          <div className="text-slate-600">
                            <span className="font-medium">Cost:</span> ${result.cost.toFixed(4)}
                          </div>
                        </div>
                      </TableCell>

                      {/* Competitors */}
                      <TableCell>
                        {result.competitors && result.competitors.totalMentions > 0 ? (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-slate-900">
                              {result.competitors.totalMentions} mentions
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {result.competitors.names.slice(0, 2).map((name, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">
                                  {name}
                                </span>
                              ))}
                              {result.competitors.names.length > 2 && (
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">
                                  +{result.competitors.names.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">None</span>
                        )}
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row */}
                    {isExpanded && (
                      <TableRow className="border-slate-100 bg-slate-50/30">
                        <TableCell colSpan={11} className="p-0">
                          <div className="p-6 space-y-6">
                            {/* AI Response */}
                            <div>
                              <h4 className="text-sm font-semibold text-slate-900 mb-3">AI Response</h4>
                              <div className="bg-white rounded-lg p-4 text-sm text-slate-800 leading-relaxed border border-slate-200 max-h-96 overflow-y-auto">
                                <div className="prose prose-sm max-w-none">
                                  {(() => {
                                    const lines = result.response.split('\n');
                                    const elements = [];
                                    let inCodeBlock = false;
                                    let codeBlockContent = [];
                                    let codeBlockLanguage = '';
                                    
                                    for (let i = 0; i < lines.length; i++) {
                                      const line = lines[i];
                                      
                                      // Handle code blocks
                                      if (line.startsWith('```')) {
                                        if (!inCodeBlock) {
                                          // Start of code block
                                          inCodeBlock = true;
                                          codeBlockLanguage = line.substring(3).trim();
                                          codeBlockContent = [];
                                        } else {
                                          // End of code block
                                          inCodeBlock = false;
                                          elements.push(
                                            <div key={`code-${i}`} className="bg-slate-900 text-slate-100 rounded-lg p-4 my-3 font-mono text-xs overflow-x-auto">
                                              {codeBlockLanguage && (
                                                <div className="text-slate-400 text-xs mb-2 border-b border-slate-700 pb-1">
                                                  {codeBlockLanguage}
                                                </div>
                                              )}
                                              <pre className="whitespace-pre-wrap">
                                                {codeBlockContent.join('\n')}
                                              </pre>
                                            </div>
                                          );
                                          codeBlockContent = [];
                                          codeBlockLanguage = '';
                                        }
                                        continue;
                                      }
                                      
                                      if (inCodeBlock) {
                                        codeBlockContent.push(line);
                                        continue;
                                      }
                                      
                                      // Handle headers
                                      if (line.startsWith('# ')) {
                                        elements.push(
                                          <h1 key={i} className="text-lg font-bold text-slate-900 mt-4 mb-2 first:mt-0 border-b border-slate-200 pb-1">
                                            {renderInlineMarkdown(line.substring(2))}
                                          </h1>
                                        );
                                        continue;
                                      }
                                      if (line.startsWith('## ')) {
                                        elements.push(
                                          <h2 key={i} className="text-base font-semibold text-slate-900 mt-3 mb-2 first:mt-0">
                                            {renderInlineMarkdown(line.substring(3))}
                                          </h2>
                                        );
                                        continue;
                                      }
                                      if (line.startsWith('### ')) {
                                        elements.push(
                                          <h3 key={i} className="text-sm font-semibold text-slate-900 mt-2 mb-1 first:mt-0">
                                            {renderInlineMarkdown(line.substring(4))}
                                          </h3>
                                        );
                                        continue;
                                      }
                                      if (line.startsWith('#### ')) {
                                        elements.push(
                                          <h4 key={i} className="text-sm font-semibold text-slate-900 mt-2 mb-1 first:mt-0">
                                            {renderInlineMarkdown(line.substring(5))}
                                          </h4>
                                        );
                                        continue;
                                      }
                                      
                                      // Handle horizontal rules
                                      if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
                                        elements.push(<hr key={i} className="my-4 border-slate-300" />);
                                        continue;
                                      }
                                      
                                      // Handle blockquotes
                                      if (line.startsWith('> ')) {
                                        elements.push(
                                          <blockquote key={i} className="border-l-4 border-blue-500 pl-4 py-2 my-2 bg-blue-50 text-slate-700 italic rounded-r-lg">
                                            {renderInlineMarkdown(line.substring(2))}
                                          </blockquote>
                                        );
                                        continue;
                                      }
                                      
                                      // Handle lists
                                      if (line.match(/^[\s]*[-*+]\s/)) {
                                        const indent = line.match(/^[\s]*/)[0].length;
                                        const content = line.replace(/^[\s]*[-*+]\s/, '');
                                        elements.push(
                                          <div key={i} className={`flex items-start mb-1 ${indent > 0 ? 'ml-4' : ''}`}>
                                            <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span className="flex-1">{renderInlineMarkdown(content)}</span>
                                          </div>
                                        );
                                        continue;
                                      }
                                      
                                      if (line.match(/^[\s]*\d+\.\s/)) {
                                        const match = line.match(/^([\s]*)(\d+)\.\s(.+)/);
                                        const indent = match[1].length;
                                        const number = match[2];
                                        const content = match[3];
                                        elements.push(
                                          <div key={i} className={`flex items-start mb-1 ${indent > 0 ? 'ml-4' : ''}`}>
                                            <span className="text-blue-600 mr-2 mt-1 font-medium flex-shrink-0">{number}.</span>
                                            <span className="flex-1">{renderInlineMarkdown(content)}</span>
                                          </div>
                                        );
                                        continue;
                                      }
                                      
                                      // Handle tables
                                      if (line.includes('|') && !line.startsWith('|')) {
                                        // This is a table row, we'll handle it specially
                                        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
                                        if (cells.length > 1) {
                                          elements.push(
                                            <div key={i} className="flex mb-1 text-xs">
                                              {cells.map((cell, cellIdx) => (
                                                <div key={cellIdx} className="flex-1 px-2 py-1 border border-slate-200 bg-slate-50">
                                                  {renderInlineMarkdown(cell)}
                                                </div>
                                              ))}
                                            </div>
                                          );
                                          continue;
                                        }
                                      }
                                      
                                      // Handle empty lines
                                      if (line.trim() === '') {
                                        elements.push(<div key={i} className="h-2"></div>);
                                        continue;
                                      }
                                      
                                      // Regular paragraph
                                      elements.push(
                                        <p key={i} className="mb-2 leading-relaxed">
                                          {renderInlineMarkdown(line)}
                                        </p>
                                      );
                                    }
                                    
                                    // Helper function to render inline markdown
                                    function renderInlineMarkdown(text) {
                                      if (!text) return text;
                                      
                                      // Handle inline code first (highest priority)
                                      if (text.includes('`')) {
                                        const parts = text.split('`');
                                        return parts.map((part, idx) => 
                                          idx % 2 === 1 ? (
                                            <code key={idx} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono border">
                                              {part}
                                            </code>
                                          ) : (
                                            <span key={idx}>{renderInlineMarkdown(part)}</span>
                                          )
                                        );
                                      }
                                      
                                      // Handle bold text
                                      if (text.includes('**')) {
                                        const parts = text.split('**');
                                        return parts.map((part, idx) => 
                                          idx % 2 === 1 ? (
                                            <strong key={idx} className="font-semibold text-slate-900">{part}</strong>
                                          ) : (
                                            <span key={idx}>{renderInlineMarkdown(part)}</span>
                                          )
                                        );
                                      }
                                      
                                      // Handle italic text (but not if it's part of bold)
                                      if (text.includes('*') && !text.includes('**')) {
                                        const parts = text.split('*');
                                        return parts.map((part, idx) => 
                                          idx % 2 === 1 ? (
                                            <em key={idx} className="italic text-slate-700">{part}</em>
                                          ) : (
                                            <span key={idx}>{renderInlineMarkdown(part)}</span>
                                          )
                                        );
                                      }
                                      
                                      // Handle strikethrough
                                      if (text.includes('~~')) {
                                        const parts = text.split('~~');
                                        return parts.map((part, idx) => 
                                          idx % 2 === 1 ? (
                                            <del key={idx} className="line-through text-slate-500">{part}</del>
                                          ) : (
                                            <span key={idx}>{renderInlineMarkdown(part)}</span>
                                          )
                                        );
                                      }
                                      
                                      // Handle links
                                      if (text.includes('[') && text.includes('](')) {
                                        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                                        let lastIndex = 0;
                                        const elements = [];
                                        let match;
                                        
                                        while ((match = linkRegex.exec(text)) !== null) {
                                          // Add text before the link
                                          if (match.index > lastIndex) {
                                            elements.push(
                                              <span key={`text-${lastIndex}`}>
                                                {renderInlineMarkdown(text.substring(lastIndex, match.index))}
                                              </span>
                                            );
                                          }
                                          
                                          // Add the link
                                          elements.push(
                                            <a 
                                              key={`link-${match.index}`}
                                              href={match[2]} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600"
                                            >
                                              {match[1]}
                                            </a>
                                          );
                                          
                                          lastIndex = match.index + match[0].length;
                                        }
                                        
                                        // Add remaining text
                                        if (lastIndex < text.length) {
                                          elements.push(
                                            <span key={`text-${lastIndex}`}>
                                              {renderInlineMarkdown(text.substring(lastIndex))}
                                            </span>
                                          );
                                        }
                                        
                                        return elements.length > 0 ? elements : text;
                                      }
                                      
                                      return text;
                                    }
                                    
                                    return elements;
                                  })()}
                                </div>
                              </div>
                            </div>

                            {/* Detailed Competitor Analysis */}
                            {result.competitors && result.competitors.mentions.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Competitor Mentions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {result.competitors.mentions.map((mention, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="font-medium text-slate-900 text-sm">{mention.name}</div>
                                        <div className="flex items-center space-x-2">
                                          <span className={`px-2 py-1 rounded-full text-xs ${
                                            mention.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                                            mention.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                          }`}>
                                            {mention.sentiment}
                                          </span>
                                          <span className="text-xs text-slate-500">Pos: {mention.position}</span>
                                        </div>
                                      </div>
                                      <div className="text-sm text-slate-600 leading-relaxed">{mention.context}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

const AIResultsTable: React.FC<{ results: FlatAIQueryResult[]; onBulkReanalyze?: (phraseIds: number[]) => void; bulkReanalyzing?: boolean }> = ({ results, onBulkReanalyze, bulkReanalyzing = false }) => {
  // Debug: log the first result to inspect fields
  if (results && results.length > 0) {
    console.log('AIResultsTable first result:', results[0]);
  }
  const [page, setPage] = useState(1);
  const perPage = 25;
  const totalPages = Math.ceil(results.length / perPage);
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;
  const currentResults = results.slice(startIdx, endIdx);
  const [expandedRows, setExpandedRows] = useState<{[key: string]: boolean}>({});
  const [selectedPhrases, setSelectedPhrases] = useState<Set<number>>(new Set());

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

  // Helper to get phrase text from phraseId or use phraseText if available
  function getPhraseText(result: FlatAIQueryResult) {
    if (result.phraseText) return result.phraseText;
    if (!result.phraseId) return '-';
    return `Phrase ID: ${result.phraseId}`;
  }

  // Helper to get domain presence status
  function getDomainPresenceStatus(presence: number) {
    if (presence === 1) return { status: 'Featured', color: 'bg-green-100 text-green-800', icon: '✓' };
    if (presence > 0) return { status: 'Mentioned', color: 'bg-yellow-100 text-yellow-800', icon: '•' };
    return { status: 'Not Found', color: 'bg-red-100 text-red-800', icon: '✗' };
  }


  // Toggle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  // Toggle phrase selection
  const togglePhraseSelection = (phraseId: number) => {
    setSelectedPhrases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phraseId)) {
        newSet.delete(phraseId);
      } else {
        newSet.add(phraseId);
      }
      return newSet;
    });
  };

  // Select all phrases on current page
  const selectAllPhrases = () => {
    const uniquePhraseIds = [...new Set(currentResults.map(r => r.phraseId))];
    setSelectedPhrases(new Set(uniquePhraseIds));
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedPhrases(new Set());
  };

  // Handle bulk re-analyze
  const handleBulkReanalyze = () => {
    if (!onBulkReanalyze || selectedPhrases.size === 0) return;
    
    const phraseIds = Array.from(selectedPhrases);
    onBulkReanalyze(phraseIds);
  };

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader>
        <div className="flex flex-col items-center justify-center mb-2">
          <CardTitle className="text-2xl font-bold text-slate-900 mb-1">AI Query Results</CardTitle>
          <CardDescription className="text-slate-600 text-center max-w-2xl">
            Comprehensive AI model responses with detailed scoring, competitor analysis, and source tracking
          </CardDescription>
        </div>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">{results.length}</div>
            <div className="text-sm text-slate-600">Total Queries</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {results.filter(r => r.presence > 0).length}
            </div>
            <div className="text-sm text-slate-600">Domain Found</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {results.filter(r => r.presence === 1).length}
            </div>
            <div className="text-sm text-slate-600">Featured</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {results.reduce((sum, r) => sum + (r.competitors?.totalMentions || 0), 0)}
            </div>
            <div className="text-sm text-slate-600">Competitors</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {results.length > 0 ? 
                (results.reduce((sum, r) => sum + (r.overall || 0), 0) / results.length).toFixed(1) : '0'
              }
            </div>
            <div className="text-sm text-slate-600">Avg Score</div>
          </div>
        </div>

        {/* Bulk Re-analyze Controls */}
        {onBulkReanalyze && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-700">Bulk Re-analyze Selected Phrases</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllPhrases}
                    className="text-xs"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllSelections}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-slate-600 mb-2">Selected Phrases:</h5>
                  <div className="text-sm text-slate-600">
                    <div>{selectedPhrases.size} phrases selected for re-analysis</div>
                    <div className="text-slate-500 mt-1">
                      Each phrase will be re-analyzed with its respective AI model
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-medium text-slate-600 mb-2">Re-analysis Summary:</h5>
                  <div className="text-sm text-slate-600">
                    <div className="font-medium text-slate-800">
                      {selectedPhrases.size} phrases will be re-analyzed
                    </div>
                    <div className="text-slate-500 mt-1">
                      Using their original AI models (GPT-4o, Claude 3, or Gemini 1.5)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleBulkReanalyze}
                  disabled={selectedPhrases.size === 0 || bulkReanalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {bulkReanalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      Re-analyzing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Re-analyze Selected Phrases
                    </>
                  )}
                </Button>
                
                {selectedPhrases.size > 0 && (
                  <div className="text-sm text-slate-600">
                    {selectedPhrases.size} phrases will be re-analyzed with their respective models
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-700 font-medium w-12">
                  <input
                    type="checkbox"
                    checked={currentResults.length > 0 && [...new Set(currentResults.map(r => r.phraseId))].every(id => selectedPhrases.has(id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        selectAllPhrases();
                      } else {
                        clearAllSelections();
                      }
                    }}
                    className="rounded"
                  />
                </TableHead>
                <TableHead className="text-slate-700 font-medium">Details</TableHead>
                <TableHead className="text-slate-700 font-medium">Phrase & Keyword</TableHead>
                <TableHead className="text-slate-700 font-medium">Model & Scores</TableHead>
                <TableHead className="text-slate-700 font-medium">Domain Presence</TableHead>
                <TableHead className="text-slate-700 font-medium">Competitors</TableHead>
                <TableHead className="text-slate-700 font-medium">Performance Metrics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResults.map((r, i) => {
                const rowId = `${r.id}-${r.model}-${r.phraseId}`;
                const isExpanded = expandedRows[rowId];
                const presenceStatus = getDomainPresenceStatus(r.presence);
                const modelColor = getModelColor(r.model);
                
                return (
                  <Fragment key={rowId}>
                    <TableRow className="border-slate-100">
                      {/* Checkbox */}
                      <TableCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedPhrases.has(r.phraseId)}
                          onChange={() => togglePhraseSelection(r.phraseId)}
                          className="rounded"
                        />
                      </TableCell>

                      {/* Expand/Collapse Button */}
                      <TableCell className="w-12">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRowExpansion(rowId)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </TableCell>

                      {/* Phrase & Keyword */}
                      <TableCell className="max-w-xs">
                        <div className="space-y-2">
                          <div className="font-medium text-slate-900">
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <div className="truncate cursor-pointer" title={getPhraseText(r)}>
                                    {getPhraseText(r)}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-lg whitespace-pre-line">
                                  {getPhraseText(r)}
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </div>
                          {r.keyword && (
                            <Badge variant="outline" className="text-xs">
                              Keyword: {r.keyword}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      {/* Model & Basic Info */}
                      <TableCell>
                        <div className="space-y-2">
                          <Badge className={modelColor}>{r.model}</Badge>
                          <div className="text-xs text-slate-500">
                            Latency: {typeof r.latency === 'number' ? r.latency.toFixed(2) + 's' : '-'}
                          </div>
                          {typeof r.cost === 'number' && (
                            <div className="text-xs text-slate-500">
                              Cost: ${r.cost.toFixed(4)}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Domain Presence */}
                      <TableCell>
                        <div className="flex flex-col items-center space-y-1">
                          <span className={`text-lg ${presenceStatus.icon === '✓' ? 'text-green-600' : presenceStatus.icon === '•' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {presenceStatus.icon}
                          </span>
                          <Badge className={presenceStatus.color}>
                            {presenceStatus.status}
                          </Badge>
                        </div>
                      </TableCell>

                      {/* Competitors */}
                      <TableCell>
                        <div className="space-y-1">
                          {r.competitors && r.competitors.names && r.competitors.names.length > 0 ? (
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-slate-700">
                                {r.competitors.totalMentions} competitor{r.competitors.totalMentions !== 1 ? 's' : ''}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {r.competitors.names.slice(0, 3).map((name, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                                    {name}
                                  </Badge>
                                ))}
                                {r.competitors.names.length > 3 && (
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    +{r.competitors.names.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500">No competitors found</div>
                          )}
                        </div>
                      </TableCell>

                      {/* Performance Metrics */}
                      <TableCell>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-medium text-slate-900">{r.overall}/5</div>
                            <div className="text-slate-500">Overall</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-slate-900">{r.relevance}/5</div>
                            <div className="text-slate-500">Relevance</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-slate-900">{r.accuracy}/5</div>
                            <div className="text-slate-500">Accuracy</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-slate-900">{r.sentiment}/5</div>
                            <div className="text-slate-500">Sentiment</div>
                          </div>
                        </div>
                                              </TableCell>
                    </TableRow>

                    {/* Expanded Row with Detailed Information */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-slate-50 p-6">
                          <div className="space-y-6">
                            {/* Response Section */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>AI Response</span>
                              </h4>
                              <div className="bg-white p-4 rounded-lg border border-slate-200 max-h-64 overflow-y-auto">
                                <div className="prose prose-sm max-w-none">
                                  <ReactMarkdown>{r.response || 'No response available'}</ReactMarkdown>
                                </div>
                              </div>
                            </div>

                            {/* Detailed Scores */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{r.overall}/5</div>
                                <div className="text-sm text-slate-600">Overall Score</div>
                                <div className="text-xs text-slate-500">Excellent: 4-5, Good: 3-4, Poor: 0-3</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{r.relevance}/5</div>
                                <div className="text-sm text-slate-600">Relevance</div>
                                <div className="text-xs text-slate-500">High: 4-5, Medium: 3-4, Low: 0-3</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{r.accuracy}/5</div>
                                <div className="text-sm text-slate-600">Accuracy</div>
                                <div className="text-xs text-slate-500">Trusted: 4-5, Good: 3-4, Poor: 0-3</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                                <div className="text-2xl font-bold text-slate-900">{r.sentiment}/5</div>
                                <div className="text-sm text-slate-600">Sentiment</div>
                                <div className="text-xs text-slate-500">Positive: 4-5, Neutral: 3-4, Negative: 0-3</div>
                              </div>
                            </div>

                            {/* Technical Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <h5 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                                  <Cpu className="h-4 w-4" />
                                  <span>Technical Metrics</span>
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Latency:</span>
                                    <span className="font-mono text-slate-900">
                                      {typeof r.latency === 'number' ? r.latency.toFixed(2) + 's' : '-'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Cost:</span>
                                    <span className="font-mono text-slate-900">
                                      {typeof r.cost === 'number' ? '$' + r.cost.toFixed(4) : '-'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Model:</span>
                                    <Badge className={modelColor}>{r.model}</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <h5 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                                  <Target className="h-4 w-4" />
                                  <span>Domain Analysis</span>
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Presence:</span>
                                    <Badge className={presenceStatus.color}>
                                      {presenceStatus.status}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">Phrase ID:</span>
                                    <span className="font-mono text-slate-900">{r.phraseId}</span>
                                  </div>
                                  {r.keyword && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Keyword:</span>
                                      <span className="text-slate-900 font-medium">{r.keyword}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Additional Context (if available) */}
                            {r.phraseText && (
                              <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <h5 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                                  <FileText className="h-4 w-4" />
                                  <span>Phrase Context</span>
                                </h5>
                                <p className="text-sm text-slate-700">{r.phraseText}</p>
                              </div>
                            )}

                            {/* Competitor Analysis Section */}
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                              <h5 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>Competitor Analysis</span>
                              </h5>
                              <div className="space-y-3">
                                {/* Domain Presence Analysis */}
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-sm font-medium text-slate-700">Domain Presence:</span>
                                  <Badge className={presenceStatus.color}>
                                    {presenceStatus.status}
                                  </Badge>
                                </div>
                                
                                {/* Competitor Mentions */}
                                {r.competitors && r.competitors.names && r.competitors.names.length > 0 ? (
                                  <div className="space-y-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <div className="text-sm font-medium text-blue-800 mb-2">
                                        Found {r.competitors.totalMentions} competitor{r.competitors.totalMentions !== 1 ? 's' : ''}
                                      </div>
                                      <div className="text-xs text-blue-700">
                                        The following competitors were mentioned in this AI response
                                      </div>
                                    </div>
                                    
                                    {/* Competitor List */}
                                    <div className="space-y-2">
                                      {r.competitors.mentions.map((mention, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded border">
                                          <div className="flex-1">
                                            <div className="font-medium text-sm text-slate-900">{mention.name}</div>
                                            {mention.domain && mention.domain !== mention.name && (
                                              <div className="text-xs text-slate-500">{mention.domain}</div>
                                            )}
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Badge 
                                              variant="outline" 
                                              className={`text-xs ${
                                                mention.sentiment === 'positive' ? 'border-green-200 text-green-700' :
                                                mention.sentiment === 'negative' ? 'border-red-200 text-red-700' :
                                                'border-slate-200 text-slate-700'
                                              }`}
                                            >
                                              {mention.sentiment}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                              {mention.mentionType}
                                            </Badge>
                                            {mention.position > 0 && (
                                              <span className="text-xs text-slate-500">#{mention.position}</span>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-3 bg-slate-50 rounded-lg">
                                    <div className="text-sm font-medium text-slate-700 mb-1">No Competitors Detected</div>
                                    <div className="text-xs text-slate-500">
                                      No competitor domains or brands were found in this AI response
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Source Tracking Section */}
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                              <h5 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                                <LinkIcon className="h-4 w-4" />
                                <span>Source & Context Analysis</span>
                              </h5>
                              <div className="space-y-3">
                                {/* Response Length */}
                                <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                  <span className="text-sm text-slate-600">Response Length:</span>
                                  <span className="text-sm font-medium text-slate-900">
                                    {r.response ? r.response.length : 0} characters
                                  </span>
                                </div>
                                
                                {/* Detection Confidence */}
                                <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                  <span className="text-sm text-slate-600">Detection Confidence:</span>
                                  <span className="text-sm font-medium text-slate-900">
                                    {r.presence > 0 ? 'High' : 'Low'}
                                  </span>
                                </div>
                                
                                {/* Response Quality Indicators */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="text-center p-2 bg-green-50 rounded">
                                    <div className="text-lg font-bold text-green-700">{r.relevance || 0}/5</div>
                                    <div className="text-xs text-green-600">Relevance</div>
                                  </div>
                                  <div className="text-center p-2 bg-blue-50 rounded">
                                    <div className="text-lg font-bold text-blue-700">{r.accuracy || 0}/5</div>
                                    <div className="text-xs text-blue-600">Accuracy</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
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

// Payment Popup Component
const PaymentPopup: React.FC<{ isOpen: boolean; onClose: () => void; featureName: string; onUnlockAll?: () => void }> = ({ isOpen, onClose, featureName, onUnlockAll }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md z-[9999] p-6 bg-white border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Upgrade to Pro</h2>
          <p className="text-slate-600">Unlock {featureName} and access premium analytics</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-slate-700">Advanced Analytics</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-slate-700">Competitor Analysis</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-slate-700">AI Insights</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6 p-4 bg-slate-50 rounded-lg">
          <div className="text-3xl font-bold text-slate-900">$29</div>
          <div className="text-slate-600">per month</div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-black text-white hover:bg-slate-800"
            onClick={() => {
              if (onUnlockAll) {
                onUnlockAll();
              }
              onClose();
            }}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Test: Unlock All Features
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
  const [showingFallbackData, setShowingFallbackData] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [lockedFeature, setLockedFeature] = useState('');
  const [allUnlocked, setAllUnlocked] = useState(false);
  const [bulkReanalyzing, setBulkReanalyzing] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Debug state
  console.log('Current state:', { paymentPopupOpen, lockedFeature, allUnlocked });

  // Extract domain ID from URL - handle masked domain identifiers
  const getDomainId = () => {
    if (!domain) return 1;
    
    // First try to unmask the domain ID
    const unmaskedId = unmaskDomainId(domain);
    if (unmaskedId !== null) {
      return unmaskedId;
    }
    
    // Fallback to simple encoding
    const fallbackId = fallbackUnmaskDomainId(domain);
    if (fallbackId !== null) {
      return fallbackId;
    }
    
    // Legacy support: Try different patterns to extract domain ID
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

  // Define fetchDomainData function before useEffect hooks
  const fetchDomainData = async (domainId: number) => {
    try {
      setLoading(true);
      setError(null);
      setDomainData(null); // Clear previous data to prevent showing stale data
      
      console.log('Fetching domain data for domain');
      
      // Fetch domain data directly without version
      const url = `${import.meta.env.VITE_API_URL}/api/dashboard/${domainId}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Domain fetch failed:', errorText);
        throw new Error(`Domain fetch failed: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Domain data received:', data);
      console.log('Data keys:', Object.keys(data));
      console.log('Metrics keys:', Object.keys(data.metrics || {}));
      setShowingFallbackData(false);
      
      // Debug keyword analytics specifically
      if (data.metrics?.keywordAnalytics) {
        console.log('Keyword analytics data:', data.metrics.keywordAnalytics);
        console.log('High volume keywords:', data.metrics.keywordAnalytics.highVolume);
        console.log('Medium volume keywords:', data.metrics.keywordAnalytics.mediumVolume);
        console.log('Low volume keywords:', data.metrics.keywordAnalytics.lowVolume);
      }

      // Calculate keyword analytics if not provided
      if (!data.metrics.keywordAnalytics && data.keywords) {
        const highVolume = data.keywords.filter(k => k.volume >= 10000).length;
        const mediumVolume = data.keywords.filter(k => k.volume >= 1000 && k.volume < 10000).length;
        const lowVolume = data.keywords.filter(k => k.volume < 1000).length;
        const highDifficulty = data.keywords.filter(k => parseInt(k.difficulty) >= 70).length;
        const mediumDifficulty = data.keywords.filter(k => parseInt(k.difficulty) >= 30 && parseInt(k.difficulty) < 70).length;
        const lowDifficulty = data.keywords.filter(k => parseInt(k.difficulty) < 30).length;

        data.metrics.keywordAnalytics = {
          highVolume,
          mediumVolume,
          lowVolume,
          highDifficulty,
          mediumDifficulty,
          lowDifficulty,
          longTail: lowVolume,
          branded: 0, // Would need to be calculated based on domain name
          nonBranded: data.keywords.length
        };
      }
      
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
      
      // Add a small delay to prevent rapid loading states
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setDomainData(data);
      console.log('Domain data set successfully');
      // Debug: log token usage after setting domain data
      console.log('Token usage from API:', data.extraction?.tokenUsage);
      
      // Set competitor data if available
      if (data.competitorData) {
        setCompetitorData(data.competitorData);
        console.log('Competitor data set from dashboard response');
      }
      
      // Transform the data to match the expected structure
      // The backend already provides flattened AI query results
      // but we need to ensure the phrases array is properly populated
      if (data.keywords && !data.phrases) {
        data.phrases = data.keywords.flatMap((keyword: Record<string, unknown>) => 
          (keyword.generatedIntentPhrases as Array<Record<string, unknown>>)?.map((phrase: Record<string, unknown>) => ({
            id: phrase.id as number,
            text: phrase.phrase as string,
            keywordId: keyword.id as number
          })) || []
        );
      }
    } catch (err) {
      console.error('Error fetching domain data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load domain data');
      setDomainData(null);
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };

  // Define competitor-related functions before useEffect hooks

  const fetchSuggestedCompetitors = useCallback(async () => {
    try {
      setSuggestionsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/${domainId}/suggested-competitors`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
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
  }, [domainId]);

  // All useEffect hooks must be called before any conditional returns
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (domainId) {
      fetchDomainData(domainId);
    }
  }, [domainId]);

  // Fetch suggested competitors on initial load
  useEffect(() => {
    if (domainData) {
      fetchSuggestedCompetitors();
    }
  }, [domainData, domainId, fetchSuggestedCompetitors]);

  // Optional: Add manual refresh capability without auto-refresh on visibility change
  // This prevents unnecessary reloads when switching between windows/tabs
  // Users can manually refresh if they need updated data

  // Show loading while checking authentication - moved after all hooks
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }


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


  // Analyze competitors using existing AI responses
  const analyzeCompetitorsFromResponses = async () => {
    try {
      setCompetitorLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/${domainId}/competitors/analyze-responses`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ competitors })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to analyze competitors from responses');
      }
      
      const data = await response.json();
      setCompetitorData(data);
      
      // Update competitors state from the analysis's competitorListArr
      if (Array.isArray(data.competitorListArr)) {
        setCompetitors(data.competitorListArr);
      }
      
      // Refresh the main dashboard data to get updated competitor data
      await fetchDomainData(domainId);
    } catch (err) {
      console.error('Error analyzing competitors from responses:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze competitors from responses');
    } finally {
      setCompetitorLoading(false);
    }
  };

  // Bulk re-analyze phrases function
  const bulkReanalyzePhrases = async (phraseIds: number[]) => {
    try {
      setBulkReanalyzing(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai-queries/reanalyze-phrases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          phraseIds: phraseIds,
          domain: domainData?.url,
          context: domainData?.context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to bulk reanalyze phrases');
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`Bulk re-analysis completed: ${result.summary.successful} successful, ${result.summary.failed} failed`);
        
        // Refresh the domain data to get updated results
        await fetchDomainData(domainId);
        
        // Show success message
        if (result.summary.failed === 0) {
          console.log('All phrases reanalyzed successfully');
        } else {
          console.warn(`${result.summary.failed} phrases failed to reanalyze`);
        }
      }
    } catch (error) {
      console.error('Error bulk reanalyzing phrases:', error);
    } finally {
      setBulkReanalyzing(false);
    }
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

  const getThreatLevelColor = (level: string | undefined) => {
    if (!level) return 'bg-slate-50 text-slate-700 border-slate-200';
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Navigation items for sidebar
  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Key metrics and insights',
      locked: false
    },
    {
      id: 'airesults',
      label: 'AI Results',
      icon: GlobeIcon,
      description: 'Raw AI query results',
      locked: false
    },
    {
      id: 'competitors',
      label: 'Competitors',
      icon: UsersIcon,
      description: 'Competitive analysis',
      locked: false
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: TrendingUpIcon,
      description: 'Performance analytics',
      locked: !allUnlocked
    },
    {
      id: 'keywords',
      label: 'Keywords',
      icon: TargetIcon,
      description: 'Keyword analysis',
      locked: !allUnlocked
    },
    {
      id: 'content',
      label: 'Content',
      icon: FileTextIcon,
      description: 'Content performance',
      locked: !allUnlocked
    },
    {
      id: 'models',
      label: 'AI Models',
      icon: ActivityIcon,
      description: 'AI model performance',
      locked: !allUnlocked
    },
    {
      id: 'phrases',
      label: 'Top Phrases',
      icon: MessageSquareIcon,
      description: 'Best performing phrases',
      locked: !allUnlocked
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: Lightbulb,
      description: 'AI-generated insights',
      locked: !allUnlocked
    },
    {
      id: 'history',
      label: 'Version History',
      icon: History,
      description: 'Version comparison',
      locked: !allUnlocked
    }
  ];

  // Handle navigation item click
  const handleNavigationClick = (item: typeof navigationItems[0]) => {
    console.log('Navigation clicked:', item.label, 'Locked:', item.locked);
    if (item.locked) {
      console.log('Opening payment popup for:', item.label);
      setLockedFeature(item.label);
      setPaymentPopupOpen(true);
    } else {
      console.log('Setting active section to:', item.id);
      setActiveSection(item.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-900 mx-auto"></div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-slate-900">Loading Dashboard</h3>
            <p className="text-slate-600">
              Analyzing domain performance data...
            </p>
            <p className="text-sm text-slate-500 font-mono bg-slate-50 px-4 py-2 rounded-2xl inline-block">
              Loading domain data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !domainData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md">
          <div className="w-20 h-20 mx-auto bg-red-50 rounded-3xl flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-slate-900">Unable to Load Dashboard</h2>
            <p className="text-slate-600">{error || 'Domain data not found'}</p>
            <p className="text-sm text-slate-500 font-mono bg-slate-50 px-4 py-2 rounded-2xl inline-block">
              Please try refreshing the page
            </p>
          </div>
                          <Button onClick={() => fetchDomainData(domainId)} className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-medium transition-colors">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { metrics } = domainData;

  // Debug: log token usage in render
  console.log('Token usage in render:', domainData.extraction?.tokenUsage);

  // Safety check to ensure metrics exists
  if (!metrics) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md">
          <div className="w-20 h-20 mx-auto bg-amber-50 rounded-3xl flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-amber-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-slate-900">Metrics Not Available</h2>
            <p className="text-slate-600">Domain data loaded but metrics are missing</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare pie chart data with real values
  const mentionRateValue = parseFloat(metrics.mentionRate) || 0;
  const pieData = [
    { name: 'Mentioned', value: mentionRateValue, color: '#059669' },
    { name: 'Not Mentioned', value: Math.max(0, 100 - mentionRateValue), color: '#e5e7eb' }
  ];

  return (
    <TooltipProvider>
      <div className="h-screen bg-white flex overflow-hidden">
        {/* Payment Popup */}
        <PaymentPopup 
          isOpen={paymentPopupOpen} 
          onClose={() => setPaymentPopupOpen(false)} 
          featureName={lockedFeature}
          onUnlockAll={() => setAllUnlocked(true)}
        />
      {/* Compact Sidebar */}
      <div className={cn(
        "bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col h-full transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className={cn("border-b border-slate-100", sidebarCollapsed ? "p-3" : "p-4")}>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium text-slate-900 text-sm">Analytics</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-6 w-6 p-0"
            >
              <ChevronRight className={cn(
                "h-3 w-3",
                sidebarCollapsed ? "rotate-180" : ""
              )} />
            </Button>
          </div>
        </div>

        {/* Domain Info */}
        <div className={cn("border-b border-slate-100/60", sidebarCollapsed ? "p-3" : "p-4")}>
          {!sidebarCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-slate-50/50">
                <Globe className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-medium text-slate-800 truncate">{domainData.url}</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-slate-900 mb-1">{metrics.visibilityScore}%</div>
                <div className="text-xs text-slate-500">Visibility Score</div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-lg font-light text-slate-900">{metrics.visibilityScore}%</div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className={cn("flex-1 space-y-1", sidebarCollapsed ? "p-2" : "p-3")}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <UITooltip key={item.id} delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleNavigationClick(item)}
                    className={cn(
                      "w-full flex items-center rounded-xl text-left transition-all duration-200",
                      sidebarCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2 space-x-3",
                      isActive 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                        : item.locked
                        ? "text-slate-400 hover:bg-slate-50"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn("flex-shrink-0", sidebarCollapsed ? "h-4 w-4" : "h-4 w-4")} />
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs truncate">{item.label}</div>
                      </div>
                    )}
                    {item.locked && !sidebarCollapsed && (
                      <Crown className="h-3 w-3 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                </TooltipTrigger>
                                  {item.locked && (
                    <TooltipContent 
                      side="right" 
                      className="bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 p-4 text-white"
                      sideOffset={8}
                      align="center"
                      style={{ zIndex: 999999 }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 bg-white/20 rounded-lg">
                            <Crown className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-white font-semibold text-sm">Pro Feature</span>
                        </div>
                        <p className="text-white/80 text-xs">Unlock {item.label} and access premium analytics</p>
                        <Button 
                          size="sm" 
                          className="w-full bg-white text-black hover:bg-white/90 shadow-lg shadow-black/20 transition-all duration-300"
                          onClick={() => {
                            setLockedFeature(item.label);
                            setPaymentPopupOpen(true);
                          }}
                        >
                          <Crown className="h-3 w-3 mr-2" />
                          Upgrade Now
                        </Button>
                      </div>po
                    </TooltipContent>
                  )}
              </UITooltip>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-xl border-b border-slate-100 z-30 flex-shrink-0">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-light text-slate-900 tracking-tight">
                  {navigationItems.find(item => item.id === activeSection)?.label}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fetchDomainData(domainId)}
                  disabled={loading}
                  className="hidden md:inline-flex"
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                </Button>
                {showingFallbackData && (
                  <div className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full">
                    Using cached data
                  </div>
                )}
                {!showingFallbackData && domainData?.metrics?.visibilityScore === 0 && (
                  <div className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full">
                    No analysis data
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Content Sections */}
            <div className="space-y-12">
              {activeSection === 'overview' && (
                <div className="space-y-12">
                  {/* Welcome Header */}
                  <div className="text-center space-y-4">
                    <h1 className="text-4xl font-light text-slate-900">Welcome to Your Domain Analytics</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                      Get insights into how your domain performs in AI responses and discover your competitive landscape
                    </p>
              </div>

                  {/* Key Metrics Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Eye className="h-6 w-6 text-white" />
              </div>
                        <div className="text-3xl font-light text-slate-900 mb-1">{metrics.visibilityScore}%</div>
                        <div className="text-sm text-slate-600">Visibility Score</div>
                        <div className="text-xs text-slate-500 mt-2">How often you appear in AI responses</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="h-6 w-6 text-white" />
              </div>
                        <div className="text-3xl font-light text-slate-900 mb-1">{metrics.mentionRate}%</div>
                        <div className="text-sm text-slate-600">Mention Rate</div>
                        <div className="text-xs text-slate-500 mt-2">Positive mentions in responses</div>
                      </CardContent>
                    </Card>

                    <Card className={`bg-gradient-to-br from-amber-50 to-amber-100 border-0 shadow-lg rounded-2xl relative ${!allUnlocked ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6 text-center">
                        {!allUnlocked && (
                          <div className="absolute top-2 right-2">
                            <Crown className="h-5 w-5 text-amber-600" />
              </div>
                        )}
                        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Target className="h-6 w-6 text-white" />
            </div>
                        <div className="text-3xl font-light text-slate-900 mb-1">{allUnlocked ? (metrics.keywordCount || 0) : '—'}</div>
                        <div className="text-sm text-slate-600">Keywords Tracked</div>
                        <div className="text-xs text-slate-500 mt-2">
                          {allUnlocked ? 'Active keyword monitoring' : 'Unlock to track keywords'}
                        </div>
                        {!allUnlocked && (
                          <div className="mt-3">
                            <Button 
                              size="sm" 
                              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 rounded-lg text-xs"
                              onClick={() => {
                                setLockedFeature('Keyword Tracking');
                                setPaymentPopupOpen(true);
                              }}
                            >
                              <Crown className="h-3 w-3 mr-1" />
                              Unlock
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg rounded-2xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-3xl font-light text-slate-900 mb-1">{competitorData?.competitors?.length || 0}</div>
                        <div className="text-sm text-slate-600">Competitors</div>
                        <div className="text-xs text-slate-500 mt-2">Identified competitors</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Action Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* AI Query Results Card */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-slate-900/20 transition-all duration-300 cursor-pointer group"
                          onClick={() => setActiveSection('airesults')}>
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <GlobeIcon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-semibold text-slate-900 mb-2">AI Query Results</h3>
                              <p className="text-slate-600">Analyze how AI models respond to your keywords</p>
                            </div>
                          </div>
                          <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Total Queries</span>
                            <span className="font-semibold text-slate-900">{metrics.totalQueries || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">AI Models Tested</span>
                            <span className="font-semibold text-slate-900">{metrics.modelPerformance?.length || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Avg Response Quality</span>
                            <span className="font-semibold text-slate-900">{metrics.avgOverall || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">What you'll discover:</span>
                          </div>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• How often your domain is mentioned</li>
                            <li>• Response quality and sentiment analysis</li>
                            <li>• Performance across different AI models</li>
                            <li>• Detailed query-by-query breakdowns</li>
                          </ul>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {domainData.aiQueryResults?.length || 0} Results Available
                          </Badge>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
                            View Results
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Competitor Analysis Card */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-slate-900/20 transition-all duration-300 cursor-pointer group"
                          onClick={() => setActiveSection('competitors')}>
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <UsersIcon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Competitor Analysis</h3>
                              <p className="text-slate-600">Understand your competitive landscape</p>
                            </div>
                          </div>
                          <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Competitors Identified</span>
                            <span className="font-semibold text-slate-900">{competitorData?.competitors?.length || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Market Position</span>
                            <span className="font-semibold text-slate-900 capitalize">{domainData.industryAnalysis?.marketPosition || 'Challenger'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Threat Level</span>
                            <span className="font-semibold text-slate-900">
                              {competitorData?.competitors?.length > 0 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                        </div>

                        <div className="bg-emerald-50 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-900">What you'll discover:</span>
                          </div>
                          <ul className="text-sm text-emerald-800 space-y-1">
                            <li>• Direct and indirect competitors</li>
                            <li>• Market share and positioning</li>
                            <li>• Competitive strengths and weaknesses</li>
                            <li>• Strategic recommendations</li>
                          </ul>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                            {competitorData?.competitors?.length > 0 ? 'Analysis Complete' : 'Ready to Analyze'}
                          </Badge>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl">
                            {competitorData?.competitors?.length > 0 ? 'View Analysis' : 'Start Analysis'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-slate-900 mb-2">Quick Actions</h2>
                        <p className="text-slate-500">Get started with these essential tasks</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                            <RefreshCw className="h-8 w-8 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Refresh Data</h4>
                            <p className="text-sm text-slate-600 mb-4">Update your latest performance metrics</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => fetchDomainData(domainId)}
                              disabled={loading}
                              className="w-full"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh Now
                            </Button>
                          </div>
                        </div>

                        <div className="text-center space-y-4">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto relative ${!allUnlocked ? 'bg-slate-100 opacity-60' : 'bg-slate-100'}`}>
                            <Target className="h-8 w-8 text-slate-600" />
                            {!allUnlocked && (
                              <div className="absolute -top-1 -right-1">
                                <Crown className="h-4 w-4 text-amber-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Add Keywords</h4>
                            <p className="text-sm text-slate-600 mb-4">
                              {allUnlocked ? 'Track new keywords for better insights' : 'Unlock to track keywords'}
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (allUnlocked) {
                                  setActiveSection('keywords');
                                } else {
                                  setLockedFeature('Keyword Management');
                                  setPaymentPopupOpen(true);
                                }
                              }}
                              className={`w-full ${!allUnlocked ? 'opacity-60' : ''}`}
                              disabled={!allUnlocked}
                            >
                              {!allUnlocked ? (
                                <>
                                  <Crown className="h-4 w-4 mr-2" />
                                  Unlock Keywords
                                </>
                              ) : (
                                <>
                                  <Target className="h-4 w-4 mr-2" />
                                  Manage Keywords
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                            <Users className="h-8 w-8 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Add Competitors</h4>
                            <p className="text-sm text-slate-600 mb-4">Monitor your competitive landscape</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setActiveSection('competitors')}
                              className="w-full"
                            >
                              <Users className="h-4 w-4 mr-2" />
                              Manage Competitors
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Summary */}
                  {metrics.performanceData && metrics.performanceData.length > 0 && (
                    <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden">
                      <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-light text-slate-900 mb-2">Performance Trend</h2>
                          <p className="text-slate-500">Your AI visibility over the last 6 months</p>
                      </div>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={metrics.performanceData}>
                            <defs>
                              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#000000" stopOpacity={0.05}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" stroke="transparent" />
                            <XAxis 
                              dataKey="month" 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: '#64748b', fontSize: 14 }}
                            />
                            <YAxis 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: '#64748b', fontSize: 14 }}
                              domain={[0, 100]}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none',
                                borderRadius: '16px',
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                                backdropFilter: 'blur(16px)'
                              }} 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="score" 
                              stroke="#000000" 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorScore)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  )}
            </div>
            
            )
            }

           
          </div>

        {activeSection === 'performance' && (
          <div className="space-y-12">
            {/* Performance Overview Cards */}
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-light text-slate-900 mb-2">
                  {metrics.performanceData && metrics.performanceData.length > 1 ? 
                    Math.round(((metrics.performanceData[metrics.performanceData.length - 1].score - metrics.performanceData[0].score) / metrics.performanceData[0].score) * 100) : 0}%
                </div>
                <div className="text-slate-500">Growth Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-slate-900 mb-2">
                  {metrics.modelPerformance && metrics.modelPerformance.length > 0 ? 
                    (metrics.modelPerformance.reduce((sum, m) => sum + parseFloat(m.avgLatency || '0'), 0) / metrics.modelPerformance.length).toFixed(1) : '—'}s
                </div>
                <div className="text-slate-500">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-slate-900 mb-2">
                  {metrics.totalQueries > 0 ? Math.round((metrics.totalQueries - (metrics.totalQueries * 0.1)) / metrics.totalQueries * 100) : '—'}%
                </div>
                <div className="text-slate-500">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-slate-900 mb-2">
                  {metrics.competitiveAnalysis?.marketShare ? `${metrics.competitiveAnalysis.marketShare.toFixed(1)}%` : '—'}
                </div>
                <div className="text-slate-500">Market Share</div>
              </div>
            </div>

            <div className="space-y-12">
                          {/* Performance Metrics Over Time */}
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-slate-900 mb-2">AI Model Performance Trends</h2>
                  <p className="text-slate-500">6-month progression of AI visibility, mentions, and query volume</p>
                </div>
                {metrics.performanceData && metrics.performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={metrics.performanceData}>
                      <CartesianGrid strokeDasharray="0" stroke="transparent" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 14 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 14 }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'score' ? `${value}%` : value?.toLocaleString(),
                          name === 'score' ? 'AI Visibility Score' : name === 'mentions' ? 'Domain Mentions' : 'Total Queries'
                        ]}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none',
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                          backdropFilter: 'blur(16px)'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        name="AI Visibility Score"
                      />
                      {metrics.performanceData.every(d => 'mentions' in d) && (
                        <Line 
                          type="monotone" 
                          dataKey="mentions" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                          name="Domain Mentions"
                        />
                      )}
                      {metrics.performanceData.every(d => 'queries' in d) && (
                        <Line 
                          type="monotone" 
                          dataKey="queries" 
                          stroke="#f59e42" 
                          strokeWidth={2} 
                          dot={{ fill: '#f59e42', strokeWidth: 2, r: 3 }}
                          name="Total Queries"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <BarChart3 className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="font-medium">Performance trend data not available</p>
                    <p className="text-sm text-slate-400">Current metrics: {metrics.visibilityScore}% visibility, {Math.round(metrics.totalQueries * parseFloat(metrics.mentionRate) / 100)} mentions</p>
                  </div>
                )}
              </CardContent>
            </Card>

              {/* Current Metrics Breakdown */}
              <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-slate-900 mb-2">Current Metrics</h2>
                    <p className="text-slate-500">Latest performance indicators</p>
                  </div>
                  <div className="space-y-8">
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Domain Authority Trend */}
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-slate-900 mb-2">Domain Authority Progression</h2>
                  <p className="text-slate-500">6-month domain authority score progression (0-100 scale)</p>
                </div>
                {metrics.performanceData && metrics.performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={metrics.performanceData}>
                      <defs>
                        <linearGradient id="colorAuthority" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="transparent" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 14 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 14 }}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        formatter={(value, name) => [`${value}/100`, 'Domain Authority']}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none',
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                          backdropFilter: 'blur(16px)'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="domainAuthority" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorAuthority)"
                        name="Domain Authority"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <Shield className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="font-medium">Domain authority trend data not available</p>
                    <p className="text-sm text-slate-400">
                      {metrics.seoMetrics?.domainAuthority ? 
                        `Current domain authority: ${metrics.seoMetrics.domainAuthority}/100` : 
                        'No domain authority data available'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'models' && (
          <div className="space-y-12">
            <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-slate-900 mb-2">AI Model Performance Analysis</h2>
                  <p className="text-slate-500">Domain mention performance across different AI language models</p>
                </div>
                {metrics.modelPerformance && metrics.modelPerformance.length > 0 ? (
                  <div className="space-y-8">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={metrics.modelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="0" stroke="transparent" />
                        <XAxis 
                          dataKey="model" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 14 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 14 }}
                        />
                        <Tooltip 
                          formatter={(value, name) => [`${value} mentions`, 'Domain Mentions']}
                          labelFormatter={(label) => `Model: ${label}`}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '16px',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                            backdropFilter: 'blur(16px)'
                          }} 
                        />
                        <Bar dataKey="mentions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {metrics.modelPerformance.map((model, index) => (
                        <div key={index} className="text-center p-6 bg-slate-50 rounded-2xl">
                          <div className="space-y-2">
                            <h4 className="font-medium text-slate-800">{model.model}</h4>
                            <div className="text-3xl font-light text-blue-600">{model.mentions}</div>
                            <p className="text-sm text-slate-600">mentions</p>
                          </div>
                        </div>
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
          </div>
        )}

        {activeSection === 'content' && (
          <div>
            {/* Content Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Pages</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.contentPerformance?.totalPages ? metrics.contentPerformance.totalPages : '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Eye className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Indexed Pages</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.contentPerformance?.indexedPages ? metrics.contentPerformance.indexedPages : '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Page Score</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.contentPerformance?.avgPageScore ? `${metrics.contentPerformance.avgPageScore}/100` : '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Content Gaps</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.contentPerformance?.contentGaps ? metrics.contentPerformance.contentGaps.length : '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Pages */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Top Performing Pages</CardTitle>
                <CardDescription className="text-slate-600">Pages with highest traffic and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.contentPerformance?.topPerformingPages && metrics.contentPerformance.topPerformingPages.length > 0 ? (
                  <div className="space-y-4">
                    {metrics.contentPerformance.topPerformingPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{page.url}</p>
                          <p className="text-sm text-slate-600">{page.traffic?.toLocaleString() || '0'} monthly visitors</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-800">{page.score}/100</p>
                          <p className="text-sm text-slate-600">Page Score</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <FileText className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p>No page performance data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Gaps */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Content Opportunities</CardTitle>
                <CardDescription className="text-slate-600">Identified content gaps and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.contentPerformance?.contentGaps && metrics.contentPerformance.contentGaps.length > 0 ? (
                  <div className="space-y-3">
                    {metrics.contentPerformance.contentGaps.map((gap, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">{gap}</p>
                          <p className="text-sm text-blue-600">High potential for organic traffic growth</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <Target className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p>No content gaps identified</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'keywords' && (
          <div>
            {/* Keyword Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Hard Keywords</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.keywordAnalytics?.highVolume ? metrics.keywordAnalytics.highVolume : '—'}
                      </p>
                      <p className="text-xs text-slate-500">10K+ monthly searches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <Target className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Medium Keywords</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.keywordAnalytics?.mediumVolume ? metrics.keywordAnalytics.mediumVolume : '—'}
                      </p>
                      <p className="text-xs text-slate-500">1K-10K monthly searches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Easy Keywords</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.keywordAnalytics?.lowVolume ? metrics.keywordAnalytics.lowVolume : '—'}
                      </p>
                      <p className="text-xs text-slate-500">&lt;1K monthly searches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Star className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Branded</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {metrics.keywordAnalytics?.branded ? metrics.keywordAnalytics.branded : '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Keyword Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Volume Distribution */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Keyword Difficulty by Volume</CardTitle>
                  <CardDescription className="text-slate-600">Distribution of {metrics.keywordCount} keywords by search volume (Ahrefs-style)</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const pieData = [
                      { name: 'Hard (10K+)', value: metrics.keywordAnalytics?.highVolume || 0, color: '#ef4444' },
                      { name: 'Medium (1K-10K)', value: metrics.keywordAnalytics?.mediumVolume || 0, color: '#f59e0b' },
                      { name: 'Easy (<1K)', value: metrics.keywordAnalytics?.lowVolume || 0, color: '#10b981' }
                    ];
                    console.log('Pie chart data:', pieData);
                    console.log('Keyword analytics object:', metrics.keywordAnalytics);
                    
                    return (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            labelLine={false}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} keywords`, name]}
                            labelFormatter={() => `Keyword Portfolio`}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Difficulty Distribution */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Keyword Competition Difficulty</CardTitle>
                  <CardDescription className="text-slate-600">Distribution by SEO competition level and ranking difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { difficulty: 'High (70-100)', count: metrics.keywordAnalytics?.highDifficulty || 0, color: '#ef4444' },
                      { difficulty: 'Medium (30-70)', count: metrics.keywordAnalytics?.mediumDifficulty || 0, color: '#f59e0b' },
                      { difficulty: 'Low (0-30)', count: metrics.keywordAnalytics?.lowDifficulty || 0, color: '#10b981' }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="difficulty" 
                        stroke="#64748b" 
                        fontSize={11}
                        label={{ value: 'Competition Level', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={12}
                        label={{ value: 'Number of Keywords', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [`${value} keywords`, 'Keyword Count']}
                        labelFormatter={(label) => `Difficulty: ${label}`}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} 
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Keyword Performance Table */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Keyword Performance Analysis</CardTitle>
                <CardDescription className="text-slate-600">Detailed keyword performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                {metrics.keywordPerformance && metrics.keywordPerformance.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Keyword</TableHead>
                          <TableHead>Visibility</TableHead>
                          <TableHead>Mentions</TableHead>
                          <TableHead>Sentiment</TableHead>
                          <TableHead>Volume</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead>CPC</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {metrics.keywordPerformance.map((keyword, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{keyword.keyword}</TableCell>
                                                         <TableCell>
                               <div className="flex items-center space-x-2">
                                 <span className="text-sm font-medium">{keyword.visibility}%</span>
                                 <Progress value={keyword.visibility} className="w-16 h-2" />
                               </div>
                             </TableCell>
                             <TableCell>{keyword.mentions}</TableCell>
                             <TableCell>
                               <Badge className={
                                 keyword.sentiment >= 4 ? 'bg-green-50 text-green-700 border-green-200' :
                                 keyword.sentiment >= 3 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                 'bg-red-50 text-red-700 border-red-200'
                               }>
                                 {keyword.sentiment}/5
                               </Badge>
                             </TableCell>
                             <TableCell>{keyword.volume?.toLocaleString()}</TableCell>
                             <TableCell>
                               <Badge className={
                                 keyword.difficulty === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                                 keyword.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                 'bg-green-50 text-green-700 border-green-200'
                               }>
                                 {keyword.difficulty}
                               </Badge>
                             </TableCell>
                             <TableCell>${keyword.cpc || '0.00'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    <Target className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p>No keywords configured</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'phrases' && (
          <div>
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Top Performing AI Query Phrases</CardTitle>
                <CardDescription className="text-slate-600">Phrases that generate the highest AI model mention rates and scores</CardDescription>
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
                        <XAxis 
                          dataKey="phrase" 
                          stroke="#64748b" 
                          fontSize={11} 
                          angle={-45} 
                          textAnchor="end" 
                          height={80} 
                          interval={0}
                          label={{ value: 'AI Query Phrases', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                        />
                        <YAxis 
                          stroke="#64748b" 
                          fontSize={12}
                          label={{ value: 'Performance Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                        />
                        <Tooltip 
                          formatter={(value, name) => [`${value}`, 'Performance Score']}
                          labelFormatter={(label) => `Phrase: ${label}`}
                          contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} 
                        />
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
          </div>
        )}

        {activeSection === 'airesults' && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-light text-slate-900">AI Query Results</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive analysis of how AI models respond to your keywords and phrases
              </p>
            </div>

            {/* Quick Stats */}
            {domainData.aiQueryResults && domainData.aiQueryResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-light text-slate-900 mb-1">{domainData.aiQueryResults.length}</div>
                    <div className="text-sm text-slate-600">Total Queries</div>
                    <div className="text-xs text-slate-500 mt-2">AI model responses</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-light text-slate-900 mb-1">
                      {domainData.aiQueryResults.filter(r => r.presence > 0).length}
                    </div>
                    <div className="text-sm text-slate-600">Domain Found</div>
                    <div className="text-xs text-slate-500 mt-2">Mentions in responses</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-light text-slate-900 mb-1">
                      {domainData.aiQueryResults.length > 0 ? 
                        (domainData.aiQueryResults.reduce((sum, r) => sum + (r.overall || 0), 0) / domainData.aiQueryResults.length).toFixed(1) : '0'
                      }
                    </div>
                    <div className="text-sm text-slate-600">Avg Score</div>
                    <div className="text-xs text-slate-500 mt-2">Overall quality rating</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-light text-slate-900 mb-1">
                      {domainData.aiQueryResults.reduce((sum, r) => sum + (r.competitors?.totalMentions || 0), 0)}
                    </div>
                    <div className="text-sm text-slate-600">Competitors</div>
                    <div className="text-xs text-slate-500 mt-2">Total mentions found</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Results Display */}
                {domainData.aiQueryResults && domainData.aiQueryResults.length > 0 ? (
              <ModernAIResultsTable 
                      results={domainData.aiQueryResults as unknown as FlatAIQueryResult[]} 
                      onBulkReanalyze={bulkReanalyzePhrases}
                      bulkReanalyzing={bulkReanalyzing}
                    />
                ) : (
              <Card className="bg-white/60 backdrop-blur-xl border-0 shadow-2xl shadow-slate-900/10 rounded-3xl">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Cpu className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No AI Query Results</h3>
                  <p className="text-slate-600 mb-6">Start by adding keywords and running AI queries to see results here.</p>
                  <Button 
                    onClick={() => setActiveSection('keywords')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Add Keywords
                  </Button>
              </CardContent>
            </Card>
            )}
          </div>
        )}

        {activeSection === 'competitors' && (
          <div>
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
                      <div className="flex space-x-3">
                        <Button 
                          onClick={analyzeCompetitorsFromResponses}
                          disabled={competitorLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {competitorLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analyze Competitors
                            </>
                          )}
                        </Button>
                      </div>
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

            {/* Competitor Ranking Table - Only show for response-based analysis */}
            {competitorData && competitorData.competitors && Array.isArray(competitorData.competitors) && competitorData.competitors.length > 0 && 
             competitorData.competitors[0] && 'competitor' in competitorData.competitors[0] && (
              <div className="space-y-8">
                 <CompetitorRankingTable 
                   competitors={competitorData.competitors as unknown as Array<{
                     competitor: string;
                     totalResponses: number;
                     foundInResponses: number;
                     presenceRate: number;
                     avgScore: number;
                     avgRank: number;
                     avgRelevance: number;
                     avgAccuracy: number;
                     avgSentiment: number;
                     totalMentions: number;
                     detailedScores: Array<{
                       phraseId: number;
                       phraseText: string;
                       model: string;
                       response: string;
                       presence: number;
                       rank: number;
                       relevance: number;
                       accuracy: number;
                       sentiment: number;
                       overall: number;
                       mentions: number;
                       context: string;
                       highlightContext: string;
                       detectionMethod: string;
                       competitors: {
                         names: string[];
                         mentions: Array<{
                           name: string;
                           domain: string;
                           position: number;
                           context: string;
                           sentiment: 'positive' | 'neutral' | 'negative';
                           mentionType: 'url' | 'text' | 'brand';
                         }>;
                         totalMentions: number;
                       };
                     }>;
                   }>} 
                   domainData={domainData}
                   oldCompetitors={competitorData.oldCompetitors}
                   oldMarketInsights={competitorData.oldMarketInsights}
                   oldStrategicRecommendations={competitorData.oldStrategicRecommendations}
                   oldCompetitiveAnalysis={competitorData.oldCompetitiveAnalysis}
                   cached={competitorData.cached}
                 />
              </div>
            )}

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
                          <p className="text-2xl font-bold text-blue-600">
                            {competitorData.oldMarketInsights?.marketSize ? competitorData.oldMarketInsights.marketSize : '—'}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-800">Growth Rate</h4>
                          <p className="text-2xl font-bold text-emerald-600">
                            {competitorData.oldMarketInsights?.growthRate ? competitorData.oldMarketInsights.growthRate : '—'}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-800">Market Leader</h4>
                          <p className="text-lg font-semibold text-slate-800">
                            {competitorData.oldMarketInsights?.marketLeader ? competitorData.oldMarketInsights.marketLeader : '—'}
                          </p>
                        </div>
                      </div>

                      {competitorData.oldMarketInsights?.marketTrends && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800">Market Trends</h4>
                          <div className="flex flex-wrap gap-2">
                            {competitorData.oldMarketInsights.marketTrends.map((trend, index) => (
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
                        {competitorData.oldCompetitors?.map((competitor, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-slate-800">{competitor.name || competitor.competitor}</h4>
                              <p className="text-sm text-slate-600">{competitor.competitor}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={getThreatLevelColor(competitor.threatLevel)}>
                                {competitor.threatLevel || 'Unknown'} Threat
                              </Badge>
                              <div className="text-right">
                                <p className="text-sm text-slate-600">Market Share</p>
                                <p className="font-semibold text-slate-800">{competitor.marketShare || 'N/A'}</p>
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
                                {(competitor.keyStrengths || []).map((strength, idx) => (
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
                                {(competitor.weaknesses || []).map((weakness, idx) => (
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
                                {(competitor.recommendations || []).map((rec, idx) => (
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
                 {competitorData.oldStrategicRecommendations && (
                  <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-800">Strategic Recommendations</CardTitle>
                      <CardDescription className="text-slate-600">Actionable strategies for your domain</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                         {competitorData.oldStrategicRecommendations.map((rec, idx) => (
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
          </div>
        )}

        {activeSection === 'insights' && (
          <div>
            {/* Insights Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Shield className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Strengths</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {domainData.insights?.strengths?.length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-rose-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Weaknesses</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {domainData.insights?.weaknesses?.length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Recommendations</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {domainData.insights?.recommendations?.length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strengths */}
            {domainData.insights?.strengths && domainData.insights.strengths.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    <span>Domain Strengths</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Areas where your domain excels in AI visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {domainData.insights.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-emerald-800">{strength.title}</h4>
                          <p className="text-sm text-emerald-700 mt-1">{strength.description}</p>
                          {strength.metric && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mt-2">
                              {strength.metric}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Weaknesses */}
            {domainData.insights?.weaknesses && domainData.insights.weaknesses.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-rose-600" />
                    <span>Areas for Improvement</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Opportunities to enhance AI visibility performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {domainData.insights.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-rose-50 rounded-lg">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-rose-800">{weakness.title}</h4>
                          <p className="text-sm text-rose-700 mt-1">{weakness.description}</p>
                          {weakness.metric && (
                            <Badge className="bg-rose-100 text-rose-700 border-rose-200 mt-2">
                              {weakness.metric}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {domainData.insights?.recommendations && domainData.insights.recommendations.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <span>Strategic Recommendations</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Actionable insights to improve AI visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {domainData.insights.recommendations.map((rec, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-slate-800">{rec.category}</span>
                          <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                        </div>
                        <p className="text-slate-700 mb-3">{rec.action}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>Impact: {rec.expectedImpact}</span>
                          <span>Timeline: {rec.timeline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fallback when no insights */}
            {(!domainData.insights?.strengths?.length && !domainData.insights?.weaknesses?.length && !domainData.insights?.recommendations?.length) && (
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="text-center py-12">
                  <Lightbulb className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No Insights Available</h3>
                  <p className="text-slate-600">AI-generated insights will appear here once analysis is complete.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'history' && (
          <div>
            {/* Version History Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Version card removed */}

              {/* Best score card removed */}

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Activity className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Visibility Score</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {domainData?.metrics?.visibilityScore || 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Queries</p>
                      <p className="text-lg font-bold text-slate-800">
                        {domainData?.metrics?.totalQueries || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Model Performance Chart */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm mb-8">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>AI Model Performance</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Performance comparison across different AI models</CardDescription>
              </CardHeader>
              <CardContent>
                {domainData?.metrics?.modelPerformance && domainData.metrics.modelPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={domainData.metrics.modelPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="model" 
                        stroke="#64748b" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={12}
                        domain={[0, 100]}
                        label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="score" fill="#3b82f6" name="Performance Score" />
                      <Bar dataKey="mentions" fill="#10b981" name="Mentions" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <Activity className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="font-medium">No model performance data</p>
                    <p className="text-sm text-slate-400">Data will appear here once AI analysis is complete</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Keyword Performance Table */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Keyword Performance</CardTitle>
                <CardDescription className="text-slate-600">Performance metrics for each keyword</CardDescription>
              </CardHeader>
              <CardContent>
                {domainData?.metrics?.keywordPerformance && domainData.metrics.keywordPerformance.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Keyword</TableHead>
                          <TableHead>Visibility</TableHead>
                          <TableHead>Mentions</TableHead>
                          <TableHead>Sentiment</TableHead>
                          <TableHead>Volume</TableHead>
                          <TableHead>Difficulty</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {domainData.metrics.keywordPerformance.map((keyword, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{keyword.keyword}</TableCell>
                            <TableCell>
                              <span className={`font-bold ${getVisibilityScoreColor(keyword.visibility || 0)}`}>
                                {keyword.visibility || 0}%
                              </span>
                            </TableCell>
                            <TableCell>{keyword.mentions || 0}</TableCell>
                            <TableCell>{keyword.sentiment || 0}/5</TableCell>
                            <TableCell>{keyword.volume?.toLocaleString() || 0}</TableCell>
                            <TableCell>
                              <Badge className={`${getDifficultyColor(keyword.difficulty || 'Low')}`}>
                                {keyword.difficulty || 'Low'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    <Target className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p>No keyword performance data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};

export default DomainDashboard;