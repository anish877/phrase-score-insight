import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

export interface AIQueryResult {
  model: string;
  phrase: string;
  keyword: string;
  response: string;
  latency: number;
  cost: number;
  progress: number;
  scores: {
    presence: number;
    relevance: number;
    accuracy: number;
    sentiment: number;
    overall: number;
  };
}

export interface AIQueryStats {
  models: Array<{
    model: string;
    presenceRate: number;
    avgRelevance: number;
    avgAccuracy: number;
    avgSentiment: number;
    avgOverall: number;
  }>;
  overall: {
    presenceRate: number;
    avgRelevance: number;
    avgAccuracy: number;
    avgSentiment: number;
    avgOverall: number;
  };
  totalResults: number;
}

interface AIQueryResultsProps {
  domainId: number;
  versionId?: number;
  phrases: Array<{keyword: string, phrases: string[]}>;
  setQueryResults: (results: AIQueryResult[]) => void;
  setQueryStats?: (stats: AIQueryStats) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AIQueryResults: React.FC<AIQueryResultsProps> = ({
  domainId,
  versionId,
  phrases,
  setQueryResults,
  setQueryStats,
  onNext,
  onPrev
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [results, setResults] = useState<AIQueryResult[]>([]);
  const [stats, setStats] = useState<AIQueryStats | null>(null);
  const [selectedModel, setSelectedModel] = useState('all');
  const resultsRef = useRef<AIQueryResult[]>([]);
  const [modelStatus, setModelStatus] = useState<{[model: string]: string}>({});
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(25);

  // Add useState for loading
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToast();

  const aiModels = [
    { name: 'GPT-4o', color: 'bg-blue-100 text-blue-800' },
    { name: 'Claude 3', color: 'bg-green-100 text-green-800' },
    { name: 'Gemini 1.5', color: 'bg-slate-100 text-slate-800' }
  ];

  // Calculate exact expected results
  const totalPhrases = phrases.reduce((sum, item) => sum + item.phrases.length, 0);
  const totalExpected = totalPhrases * aiModels.length;

  // Show a warning if the query count is very high
  useEffect(() => {
    if (totalExpected > 500) {
      setCurrentPhrase(`Warning: Large query (${totalExpected} queries). This may take a long time. Please do not close the tab.`);
    }
  }, [totalExpected]);

  useEffect(() => {
    if (phrases.length === 0) {
      setIsAnalyzing(false);
      setCurrentPhrase("No phrases found to analyze.");
      return;
    }

    // Reset all state
    setIsAnalyzing(true);
    setProgress(0);
    setCurrentPhrase('Initializing analysis... (This may take a few minutes for large jobs)');
    setError(null);
    resultsRef.current = [];
    setResults([]);
    setStats(null);
    setModelStatus({ 'GPT-4o': 'Waiting', 'Claude 3': 'Waiting', 'Gemini 1.5': 'Waiting' });
    setCurrentPage(1);

    const ctrl = new AbortController();

    // Add connection timeout
    const connectionTimeout = setTimeout(() => {
      if (resultsRef.current.length === 0) {
        setError('Connection timeout. The analysis engine took too long to start. For large jobs, please wait a few minutes before retrying.');
        setIsAnalyzing(false);
        ctrl.abort();
      }
    }, 300000); // 5 minute connection timeout

    // Add overall timeout for large datasets
    const overallTimeout = setTimeout(() => {
      if (isAnalyzing) {
        setError(`Analysis timeout. Processed ${resultsRef.current.length}/${totalExpected} queries.`);
        setIsAnalyzing(false);
        ctrl.abort();
      }
    }, Math.max(1200000, totalExpected * 3000)); // 20 minutes minimum, or 3 seconds per query

    const url = versionId 
      ? `https://phrase-score-insight.onrender.com/api/ai-queries/${domainId}?versionId=${versionId}`
      : `https://phrase-score-insight.onrender.com/api/ai-queries/${domainId}`;
    fetchEventSource(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ phrases }),
      signal: ctrl.signal,
      onmessage(ev) {
        clearTimeout(connectionTimeout); // Clear timeout on first message
        
        if (ev.event === 'complete') {
          clearTimeout(overallTimeout);
          setIsAnalyzing(false);
          setCurrentPhrase(`Analysis complete! Processed ${resultsRef.current.length} queries.`);
          setQueryResults(resultsRef.current);
          if (setQueryStats && stats) setQueryStats(stats);
          setModelStatus({ 'GPT-4o': 'Done', 'Claude 3': 'Done', 'Gemini 1.5': 'Done' });
          ctrl.abort();
          toast({
            title: "Analysis Complete",
            description: "The analysis completed successfully.",
          });
          return;
        }
        if (ev.event === 'result') {
          const data: AIQueryResult = JSON.parse(ev.data);
          
          // Prevent duplicate results
          const isDuplicate = resultsRef.current.some(r => 
            r.model === data.model && r.phrase === data.phrase && r.keyword === data.keyword
          );
          
          if (!isDuplicate) {
          resultsRef.current.push(data);
          setResults(prev => [...prev, data]);
            
            // Calculate accurate progress
            const currentProgress = Math.min(100, Math.round((resultsRef.current.length / totalExpected) * 100));
            setProgress(currentProgress);
            
            // Update model status
          setModelStatus(prev => ({ ...prev, [data.model]: 'Querying...' }));
            
            // Check if we've exceeded expected results
            if (resultsRef.current.length > totalExpected) {
              console.warn(`Exceeded expected results: ${resultsRef.current.length}/${totalExpected}`);
            }
          }
        } else if (ev.event === 'stats') {
          const data: AIQueryStats = JSON.parse(ev.data);
          setStats(data);
          if (setQueryStats) setQueryStats(data);
        } else if (ev.event === 'progress') {
          const data = JSON.parse(ev.data);
          let msg = data.message;
          
          // Enhanced message parsing
          const match = msg.match(/Querying [^ ]+ for "(.+?)"/);
          if (match) {
            msg = `Querying: "${match[1]}"...`;
          }
          
          const scoringMatch = msg.match(/Scoring [^ ]+ response for "(.+?)"/);
          if (scoringMatch) {
            msg = `Scoring: "${scoringMatch[1]}"...`;
          }
          
          if (msg.includes('Processing') && msg.includes('batches')) {
            msg = `Processing ${totalExpected} queries in batches...`;
          }
          
          setCurrentPhrase(msg);
        } else if (ev.event === 'error') {
          clearTimeout(overallTimeout);
          try {
            const data = JSON.parse(ev.data);
            setError(data.error || 'An error occurred during analysis.');
          } catch {
            setError('An error occurred during analysis.');
          }
          setIsAnalyzing(false);
          ctrl.abort();
          toast({
            title: "Analysis Error",
            description: error,
            variant: "destructive",
          });
        }
      },
      onclose() {
        clearTimeout(connectionTimeout);
        clearTimeout(overallTimeout);
        setIsAnalyzing(false);
        ctrl.abort();
      },
      onerror(err) {
        clearTimeout(connectionTimeout);
        clearTimeout(overallTimeout);
        setIsAnalyzing(false);
        // Enhanced error handling for backend errors
        if (err && err.message) {
          if (err.message.includes('429')) {
            setError('Too many concurrent requests. Please wait for the current analysis to complete.');
          } else if (err.message.includes('413')) {
            setError('Query payload too large. Please reduce the number of phrases and try again.');
          } else {
            setError('Connection error: ' + err.message);
          }
        } else {
          setError('Connection error. Please try again.');
        }
        ctrl.abort();
        toast({
          title: "Connection Error",
          description: error,
          variant: "destructive",
        });
      }
    });

    return () => {
      clearTimeout(connectionTimeout);
      clearTimeout(overallTimeout);
      ctrl.abort();
    };
  }, [phrases, domainId, setQueryResults, setQueryStats, totalExpected]);

  const filteredResults = selectedModel === 'all' 
    ? results 
    : results.filter(r => r.model === selectedModel);

  // Pagination calculations
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  // Use stats from backend if available, otherwise fallback to local calculation
  const modelStats = stats?.models || aiModels.map(model => ({
    model: model.name,
    presenceRate: 0,
    avgRelevance: 0,
    avgAccuracy: 0,
    avgSentiment: 0,
    avgOverall: 0
  }));
  const overallStats = stats?.overall || {
    presenceRate: 0,
    avgRelevance: 0,
    avgAccuracy: 0,
    avgSentiment: 0,
    avgOverall: 0
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Show error state if there's an error
  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            AI Query Results
          </h2>
        </div>
        <Card className="shadow-sm border border-red-200">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="text-red-600 text-6xl">⚠️</div>
              <div>
                <h3 className="text-xl font-semibold text-red-900">Analysis Error</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <div className="text-sm text-slate-600 mb-6">
                  Processed: {results.length} / {totalExpected} queries
                </div>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={onPrev}>
                    Go Back
                  </Button>
                  <Button 
                    onClick={onPrev}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Retry Analysis
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          AI Query Results
        </h2>
        <p className="text-lg text-slate-600">
          Analyzing responses from multiple AI models for comprehensive visibility insights
        </p>
      </div>

      {/* Model Status Row */}
      <div className="flex justify-center gap-6 mb-4">
        {aiModels.map(model => (
          <div key={model.name} className="flex flex-col items-center">
            <Badge className={model.color}>{model.name}</Badge>
            <span className="text-xs mt-1">
              {modelStatus[model.name] === 'Done' ? (
                <span className="text-green-600">Done</span>
              ) : modelStatus[model.name] === 'Querying...' ? (
                <span className="text-blue-600 animate-pulse">Querying...</span>
              ) : (
                <span className="text-slate-400">Waiting</span>
              )}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {results.filter(r => r.model === model.name).length} / {totalPhrases}
            </span>
          </div>
        ))}
      </div>

      {isAnalyzing ? (
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Running Analysis...</h3>
                <p className="text-slate-600 mb-4">{currentPhrase || 'Connecting to analysis engine...'}</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-4 max-w-md mx-auto">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {results.length} / {totalExpected} results ({progress}%)
                </div>
                {results.length > totalExpected && (
                  <div className="text-xs text-orange-600 mt-1">
                    ⚠️ Exceeded expected count
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Model Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modelStats.map((model) => (
              <Card key={model.model} className="shadow-sm border border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={aiModels.find(m => m.name === model.model)?.color}>{model.model}</Badge>
                    <span className="text-sm text-slate-500">{results.filter(r => r.model === model.model).length} queries</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Presence Rate:</span>
                      <span className="font-medium text-slate-900">{model.presenceRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Relevance:</span>
                      <span className="font-medium text-slate-900">{model.avgRelevance}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Accuracy:</span>
                      <span className="font-medium text-slate-900">{model.avgAccuracy}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Sentiment:</span>
                      <span className="font-medium text-slate-900">{model.avgSentiment}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Overall:</span>
                      <span className="font-medium text-slate-900">{model.avgOverall}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress and Results Table */}
          <Card className="shadow-sm border border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Query Results ({filteredResults.length})</CardTitle>
                  <CardDescription className="text-slate-600">
                    {isAnalyzing ? currentPhrase : `Analysis complete. Processed ${results.length}/${totalExpected} queries.`}
                  </CardDescription>
                </div>
                <Tabs value={selectedModel} onValueChange={setSelectedModel}>
                  <TabsList className="bg-slate-100">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white">All Models</TabsTrigger>
                    <TabsTrigger value="GPT-4o" className="data-[state=active]:bg-white">GPT-4o</TabsTrigger>
                    <TabsTrigger value="Claude 3" className="data-[state=active]:bg-white">Claude 3</TabsTrigger>
                    <TabsTrigger value="Gemini 1.5" className="data-[state=active]:bg-white">Gemini 1.5</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              {isAnalyzing && <div className="w-full bg-slate-200 rounded-full h-1.5 mt-4">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>}
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-700 font-medium">Phrase</TableHead>
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
                    {currentResults.map((result, index) => {
                      const model = aiModels.find(m => m.name === result.model);
                      return (
                        <TableRow key={index} className="border-slate-100">
                          <TableCell className="font-medium max-w-xs">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="truncate text-slate-900 cursor-help" title={result.phrase}>
                                    {result.phrase}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs break-words">
                                  <div className="font-semibold">Phrase</div>
                                  <div>{result.phrase}</div>
                                  <div className="mt-1 text-xs text-slate-500">Keyword: {result.keyword}</div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <Badge className={model?.color}>{result.model}</Badge>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="text-sm text-slate-700 line-clamp-2 cursor-help">
                                    {result.response}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-md break-words">
                                  <div className="font-semibold mb-1">Full Response</div>
                                  <div>{result.response}</div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="text-sm">
                            <span className="font-mono text-slate-700">{Number(result.latency || 0).toFixed(2)}s</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {result.scores.presence === 1 ? (
                              <div className="flex flex-col items-center">
                                <span className="text-green-600 text-lg">✓</span>
                                <span className="text-xs text-green-600">Present</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <span className="text-red-600 text-lg">✗</span>
                                <span className="text-xs text-red-600">Not Found</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className={`font-bold text-lg ${result.scores.relevance >= 4 ? 'text-green-600' : result.scores.relevance >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {result.scores.relevance}
                              </span>
                              <span className="text-xs text-slate-500">
                                {result.scores.relevance >= 4 ? 'High' : result.scores.relevance >= 3 ? 'Medium' : 'Low'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className={`font-bold text-lg ${result.scores.accuracy >= 4 ? 'text-green-600' : result.scores.accuracy >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {result.scores.accuracy}
                              </span>
                              <span className="text-xs text-slate-500">
                                {result.scores.accuracy >= 4 ? 'Trusted' : result.scores.accuracy >= 3 ? 'Good' : 'Poor'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className={`font-bold text-lg ${result.scores.sentiment >= 4 ? 'text-green-600' : result.scores.sentiment >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {result.scores.sentiment}
                              </span>
                              <span className="text-xs text-slate-500">
                                {result.scores.sentiment >= 4 ? 'Positive' : result.scores.sentiment >= 3 ? 'Neutral' : 'Negative'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className={`font-bold text-xl ${result.scores.overall >= 4 ? 'text-green-600' : result.scores.overall >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {result.scores.overall}
                              </span>
                              <span className="text-xs text-slate-500">
                                {result.scores.overall >= 4 ? 'Excellent' : result.scores.overall >= 3 ? 'Good' : 'Poor'}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {filteredResults.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Results per page:</span>
                    <Select value={resultsPerPage.toString()} onValueChange={(value) => {
                      setResultsPerPage(Number(value));
                      setCurrentPage(1); // Reset to first page when changing page size
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

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredResults.length)} of {filteredResults.length} results
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
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev} disabled={isAnalyzing}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={isAnalyzing || results.length === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Score Responses ({results.length} results)
        </Button>
      </div>
    </div>
  );
};

export default AIQueryResults;
