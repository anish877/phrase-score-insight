import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { AIQueryResult, AIQueryStats } from './AIQueryResults';
import { useToast } from '@/components/ui/use-toast';

interface ResponseScoringProps {
  queryResults: AIQueryResult[];
  queryStats: AIQueryStats | null;
  onNext: () => void;
  onPrev: () => void;
  isSaving?: boolean;
}

const ResponseScoring: React.FC<ResponseScoringProps> = ({
  queryResults,
  queryStats,
  onNext,
  onPrev,
  isSaving = false
}) => {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedModel, setSelectedModel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(25);
  const { toast } = useToast();

  // Use stats from props, fallback to local calculation if needed
  const stats = queryStats;
  const scores = queryResults;

  // Model stats for tabs
  const modelStats = stats?.models || [];
  const overallStats = stats?.overall || {
    presenceRate: 0,
    avgRelevance: 0,
    avgAccuracy: 0,
    avgSentiment: 0,
    avgOverall: 0
  };

  // Filter scores by selected model
  const filteredScores = selectedModel === 'all' 
    ? scores 
    : scores.filter(s => s.model === selectedModel);

  // Pagination calculations
  const totalPages = Math.ceil(filteredScores.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentScores = filteredScores.slice(startIndex, endIndex);

  // Top and worst performing phrases
  const topPhrases = scores
    .filter(s => s.scores.presence === 1)
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, 10);
  const worstPhrases = scores
    .sort((a, b) => a.scores.overall - b.scores.overall)
    .slice(0, 10);

  const getScoreColor = (score: number, maxScore: number = 5) => {
    const percentage = score / maxScore;
    if (percentage >= 0.8) return 'text-green-600';
    if (percentage >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Reset to first page when changing model filter
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Response Scoring Analysis
        </h2>
        <p className="text-lg text-slate-600">
          Comprehensive scoring of AI model responses across multiple dimensions
        </p>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">Model Comparison</TabsTrigger>
          <TabsTrigger value="phrases">Phrase Performance</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Scores</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {overallStats.presenceRate}%
                </div>
                <div className="text-sm text-slate-600">Domain Presence Rate</div>
                <div className="text-xs text-slate-500 mt-1">Queries where domain appears</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {overallStats.avgRelevance}
                </div>
                <div className="text-sm text-slate-600">Avg Search Relevance</div>
                <div className="text-xs text-slate-500 mt-1">How well content matches queries</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {overallStats.avgAccuracy}
                </div>
                <div className="text-sm text-slate-600">Avg Content Accuracy</div>
                <div className="text-xs text-slate-500 mt-1">Factual correctness & trust</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {overallStats.avgSentiment}
                </div>
                <div className="text-sm text-slate-600">Avg Brand Sentiment</div>
                <div className="text-xs text-slate-500 mt-1">Tone impact on brand</div>
              </CardContent>
            </Card>
          </div>

          {/* Model Performance Summary */}
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Domain Visibility Analysis Summary</CardTitle>
              <CardDescription>How well your domain would rank across different AI models for the analyzed queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelStats.map((stat) => (
                  <div key={stat.model} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800">{stat.model}</Badge>
                      <span className="text-sm font-medium">Overall Score: {stat.avgOverall}/5</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <div className="text-slate-600">Domain Presence</div>
                        <div className="font-medium">{stat.presenceRate}%</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Search Relevance</div>
                        <div className="font-medium">{stat.avgRelevance}/5</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Content Accuracy</div>
                        <div className="font-medium">{stat.avgAccuracy}/5</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Brand Sentiment</div>
                        <div className="font-medium">{stat.avgSentiment}/5</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {modelStats.map((stat) => (
              <Card key={stat.model} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">{stat.model}</Badge>
                    <span className="text-lg font-bold">{stat.avgOverall}/5</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Domain Presence Rate</span>
                      <span className="text-sm font-medium">{stat.presenceRate}%</span>
                    </div>
                    <Progress value={stat.presenceRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Search Relevance</span>
                      <span className="text-sm font-medium">{stat.avgRelevance}/5</span>
                    </div>
                    <Progress value={(stat.avgRelevance / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Content Accuracy</span>
                      <span className="text-sm font-medium">{stat.avgAccuracy}/5</span>
                    </div>
                    <Progress value={(stat.avgAccuracy / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Brand Sentiment</span>
                      <span className="text-sm font-medium">{stat.avgSentiment}/5</span>
                    </div>
                    <Progress value={(stat.avgSentiment / 5) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="phrases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-600">High Visibility Phrases</CardTitle>
                <CardDescription>Phrases where your domain would rank well in search results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPhrases.slice(0, 5).map((phrase, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <Badge className="bg-blue-100 text-blue-800">{phrase.model}</Badge>
                        <span className="font-medium">Score: {phrase.scores.overall}/5</span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        {phrase.scores.presence === 1 ? '✓ Domain Present' : '✗ Domain Not Found'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Worst Performing */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600">Visibility Improvement Opportunities</CardTitle>
                <CardDescription>Phrases where your domain needs better content or optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {worstPhrases.slice(0, 5).map((phrase, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <Badge className="bg-blue-100 text-blue-800">{phrase.model}</Badge>
                        <span className="font-medium">
                          {phrase.scores.presence === 0 ? 'Domain Not Found' : `Score: ${phrase.scores.overall}/5`}
                        </span>
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        {phrase.scores.presence === 1 ? '✓ Domain Present' : '✗ Domain Not Found'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Detailed Domain Visibility Analysis</CardTitle>
                  <CardDescription>Individual scores for all phrases and models - showing domain presence and ranking potential</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Filter by model:</span>
                    <Select value={selectedModel} onValueChange={handleModelChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Models</SelectItem>
                        <SelectItem value="GPT-4o">GPT-4o</SelectItem>
                        <SelectItem value="Claude 3">Claude 3</SelectItem>
                        <SelectItem value="Gemini 1.5">Gemini 1.5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Results per page:</span>
                    <Select value={resultsPerPage.toString()} onValueChange={(value) => {
                      setResultsPerPage(Number(value));
                      setCurrentPage(1);
                    }}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Phrase</th>
                      <th className="text-left p-2">Keyword</th>
                      <th className="text-left p-2">Model</th>
                      <th className="text-center p-2">Domain Presence</th>
                      <th className="text-center p-2">Search Relevance</th>
                      <th className="text-center p-2">Content Accuracy</th>
                      <th className="text-center p-2">Brand Sentiment</th>
                      <th className="text-center p-2">Overall Score</th>
                      <th className="text-center p-2">Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentScores.map((score, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-2 max-w-xs">
                          <div className="truncate" title={score.phrase}>{score.phrase}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-xs text-slate-500">{score.keyword}</div>
                        </td>
                        <td className="p-2">
                          <Badge className="bg-blue-100 text-blue-800">{score.model}</Badge>
                        </td>
                        <td className="p-2 text-center">
                          {score.scores.presence === 1 ? 
                            <span className="text-green-600 font-bold">✓ Present</span> : 
                            <span className="text-red-600 font-bold">✗ Not Found</span>
                          }
                        </td>
                        <td className={`p-2 text-center font-medium ${getScoreColor(score.scores.relevance)}`}>
                          {score.scores.relevance}
                        </td>
                        <td className={`p-2 text-center font-medium ${getScoreColor(score.scores.accuracy)}`}>
                          {score.scores.accuracy}
                        </td>
                        <td className={`p-2 text-center font-medium ${getScoreColor(score.scores.sentiment)}`}>
                          {score.scores.sentiment}
                        </td>
                        <td className={`p-2 text-center font-bold ${getScoreColor(score.scores.overall)}`}>
                          {score.scores.overall}
                        </td>
                        <td className="p-2 text-center text-xs text-slate-500">
                          {Number(score.latency || 0).toFixed(2)}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {filteredScores.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredScores.length)} of {filteredScores.length} results
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className="w-8 h-8"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {filteredScores.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No results found for the selected model.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev} disabled={isSaving}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
              Saving & Redirecting...
            </>
          ) : (
            'View Dashboard Summary'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResponseScoring;
