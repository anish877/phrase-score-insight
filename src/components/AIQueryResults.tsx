import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchEventSource } from '@microsoft/fetch-event-source';

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
  phrases: Array<{keyword: string, phrases: string[]}>;
  setQueryResults: (results: AIQueryResult[]) => void;
  setQueryStats?: (stats: AIQueryStats) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AIQueryResults: React.FC<AIQueryResultsProps> = ({
  domainId,
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

  const aiModels = [
    { name: 'GPT-4o', color: 'bg-blue-100 text-blue-800' },
    { name: 'Claude 3', color: 'bg-green-100 text-green-800' },
    { name: 'Gemini 1.5', color: 'bg-slate-100 text-slate-800' }
  ];

  useEffect(() => {
    if (phrases.length === 0) {
      setIsAnalyzing(false);
      setCurrentPhrase("No phrases found to analyze.");
      return;
    }
    setIsAnalyzing(true);
    setProgress(0);
    setCurrentPhrase('Initializing analysis...');
    resultsRef.current = [];
    setResults([]);
    setStats(null);
    setModelStatus({ 'GPT-4o': 'Waiting', 'Claude 3': 'Waiting', 'Gemini 1.5': 'Waiting' });

    const ctrl = new AbortController();
    const totalExpected = phrases.reduce((sum, item) => sum + item.phrases.length, 0) * aiModels.length;
    const modelProgress: {[model: string]: number} = { 'GPT-4o': 0, 'Claude 3': 0, 'Gemini 1.5': 0 };
    const modelDone: {[model: string]: number} = { 'GPT-4o': 0, 'Claude 3': 0, 'Gemini 1.5': 0 };

    fetchEventSource(`http://localhost:3001/api/ai-queries/${domainId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phrases }),
      signal: ctrl.signal,
      onmessage(ev) {
        if (ev.event === 'complete') {
          setIsAnalyzing(false);
          setCurrentPhrase('Analysis complete!');
          setQueryResults(resultsRef.current);
          if (setQueryStats && stats) setQueryStats(stats);
          setModelStatus({ 'GPT-4o': 'Done', 'Claude 3': 'Done', 'Gemini 1.5': 'Done' });
          ctrl.abort();
          return;
        }
        if (ev.event === 'result') {
          const data: AIQueryResult = JSON.parse(ev.data);
          resultsRef.current.push(data);
          setResults(prev => [...prev, data]);
          setProgress(Math.round((resultsRef.current.length / totalExpected) * 100));
          modelProgress[data.model] = (modelProgress[data.model] || 0) + 1;
          setModelStatus(prev => ({ ...prev, [data.model]: 'Querying...' }));
        } else if (ev.event === 'stats') {
          const data: AIQueryStats = JSON.parse(ev.data);
          setStats(data);
          if (setQueryStats) setQueryStats(data);
        } else if (ev.event === 'progress') {
          const data = JSON.parse(ev.data);
          let msg = data.message;
          // If the message matches 'Querying [model] for "phrase"...', show 'Querying: "phrase"...'
          const match = msg.match(/Querying [^ ]+ for "(.+?)"/);
          if (match) {
            msg = `Querying: "${match[1]}"...`;
          }
          setCurrentPhrase(msg);
        } else if (ev.event === 'error') {
          try {
            const data = JSON.parse(ev.data);
            setCurrentPhrase(data.error || 'An error occurred.');
          } catch {
            setCurrentPhrase('An error occurred.');
          }
          setIsAnalyzing(false);
        }
      },
      onclose() {
        setIsAnalyzing(false);
        ctrl.abort();
      },
      onerror(err) {
        setIsAnalyzing(false);
        setCurrentPhrase('An error occurred during analysis.');
        ctrl.abort();
        throw err;
      }
    });

    return () => {
      ctrl.abort();
    };
  }, [phrases, domainId, setQueryResults, setQueryStats]);

  const filteredResults = selectedModel === 'all' 
    ? results 
    : results.filter(r => r.model === selectedModel);

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
              {results.filter(r => r.model === model.name).length} / {phrases.reduce((sum, item) => sum + item.phrases.length, 0)}
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
                <h3 className="text-xl font-semibold text-slate-900">Running AI Analysis...</h3>
                <p className="text-slate-600 mb-4">{currentPhrase || 'Connecting to analysis engine...'}</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-4 max-w-md mx-auto">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500 mt-2">{results.length} / {phrases.reduce((sum, item) => sum + item.phrases.length, 0) * aiModels.length} results</div>
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
                    {isAnalyzing ? currentPhrase : 'All queries complete.'}
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
                      <TableHead className="text-slate-700 font-medium">Presence</TableHead>
                      <TableHead className="text-slate-700 font-medium">Relevance</TableHead>
                      <TableHead className="text-slate-700 font-medium">Accuracy</TableHead>
                      <TableHead className="text-slate-700 font-medium">Sentiment</TableHead>
                      <TableHead className="text-slate-700 font-medium">Overall</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.slice(0, 50).map((result, index) => {
                      const model = aiModels.find(m => m.name === result.model);
                      return (
                        <TableRow key={index} className="border-slate-100">
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate text-slate-900" title={result.phrase}>
                              {result.phrase}
                            </div>
                            <div className="text-xs text-slate-500">{result.keyword}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={model?.color}>{result.model}</Badge>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="text-sm text-slate-700 line-clamp-2">
                              {result.response}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <span className="font-mono text-slate-700">{Number(result.latency || 0).toFixed(2)}s</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {result.scores.presence === 1 ? <span className="text-green-600">✓</span> : <span className="text-red-600">✗</span>}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {result.scores.relevance}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {result.scores.accuracy}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {result.scores.sentiment}
                          </TableCell>
                          <TableCell className="text-center font-bold">
                            {result.scores.overall}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {filteredResults.length > 50 && (
                <div className="text-center mt-4 text-sm text-slate-500">
                  Showing first 50 of {filteredResults.length} results
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
