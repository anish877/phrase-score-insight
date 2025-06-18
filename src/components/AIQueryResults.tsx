
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AIQueryResultsProps {
  phrases: Array<{keyword: string, phrases: string[]}>;
  setQueryResults: (results: any[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AIQueryResults: React.FC<AIQueryResultsProps> = ({
  phrases,
  setQueryResults,
  onNext,
  onPrev
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState('all');

  const aiModels = [
    { name: 'GPT-4o', color: 'bg-green-100 text-green-800', latencyRange: [1.2, 3.5], costRange: [0.008, 0.024] },
    { name: 'Claude 3', color: 'bg-blue-100 text-blue-800', latencyRange: [0.9, 2.8], costRange: [0.006, 0.018] },
    { name: 'Gemini 1.5', color: 'bg-purple-100 text-purple-800', latencyRange: [1.1, 3.2], costRange: [0.005, 0.015] }
  ];

  useEffect(() => {
    if (results.length === 0 && phrases.length > 0) {
      runAnalysis();
    }
  }, [phrases, results.length]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const allPhrases = phrases.flatMap(item => 
      item.phrases.map(phrase => ({ keyword: item.keyword, phrase }))
    );
    
    const totalQueries = allPhrases.length * aiModels.length;
    let completedQueries = 0;
    const newResults: any[] = [];

    for (const { keyword, phrase } of allPhrases) {
      for (const model of aiModels) {
        setCurrentPhrase(`"${phrase}" with ${model.name}`);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
        
        const mockResponse = generateMockResponse(phrase, model.name);
        newResults.push({
          keyword,
          phrase,
          model: model.name,
          response: mockResponse,
          latency: (model.latencyRange[0] + Math.random() * (model.latencyRange[1] - model.latencyRange[0])).toFixed(1),
          cost: (model.costRange[0] + Math.random() * (model.costRange[1] - model.costRange[0])).toFixed(3),
          timestamp: new Date().toISOString()
        });
        
        completedQueries++;
        setProgress((completedQueries / totalQueries) * 100);
      }
    }

    setResults(newResults);
    setQueryResults(newResults);
    setIsAnalyzing(false);
  };

  const generateMockResponse = (phrase: string, model: string) => {
    const responses = [
      `Based on current market analysis, there are several excellent options for ${phrase.toLowerCase()}. Leading solutions include established platforms with strong user bases and innovative newcomers offering advanced features. Key factors to consider include pricing, scalability, user interface design, and integration capabilities.`,
      
      `When evaluating ${phrase.toLowerCase()}, it's important to consider your specific needs and budget. Top-rated options consistently receive positive reviews for their reliability, customer support, and feature sets. Many businesses find success by starting with free trials to assess compatibility.`,
      
      `The landscape for ${phrase.toLowerCase()} has evolved significantly with new technologies and user expectations. Modern solutions offer cloud-based architectures, advanced analytics, and seamless integrations. Popular choices include both enterprise-grade and SMB-focused platforms.`,
      
      `For ${phrase.toLowerCase()}, industry leaders recommend focusing on solutions that offer strong security, scalability, and user adoption rates. Recent surveys indicate that businesses prioritize ease of use, comprehensive features, and reliable customer support when making decisions.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const filteredResults = selectedModel === 'all' 
    ? results 
    : results.filter(r => r.model === selectedModel);

  const getModelStats = () => {
    return aiModels.map(model => {
      const modelResults = results.filter(r => r.model === model.name);
      const avgLatency = modelResults.reduce((sum, r) => sum + parseFloat(r.latency), 0) / modelResults.length || 0;
      const totalCost = modelResults.reduce((sum, r) => sum + parseFloat(r.cost), 0);
      
      return {
        ...model,
        count: modelResults.length,
        avgLatency: avgLatency.toFixed(1),
        totalCost: totalCost.toFixed(3)
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          AI Query Results
        </h2>
        <p className="text-lg text-slate-600">
          Analyzing responses from multiple AI models for comprehensive visibility insights
        </p>
      </div>

      {isAnalyzing ? (
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Running AI Analysis...</h3>
                <p className="text-slate-600 mb-4">Currently processing: {currentPhrase}</p>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Model Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getModelStats().map((model) => (
              <Card key={model.name} className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={model.color}>{model.name}</Badge>
                    <span className="text-sm text-slate-500">{model.count} queries</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg Latency:</span>
                      <span className="font-medium">{model.avgLatency}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Cost:</span>
                      <span className="font-medium">${model.totalCost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results Table */}
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Query Results ({filteredResults.length})</CardTitle>
                  <CardDescription>
                    AI model responses to your generated phrases
                  </CardDescription>
                </div>
                <Tabs value={selectedModel} onValueChange={setSelectedModel}>
                  <TabsList>
                    <TabsTrigger value="all">All Models</TabsTrigger>
                    <TabsTrigger value="GPT-4o">GPT-4o</TabsTrigger>
                    <TabsTrigger value="Claude 3">Claude 3</TabsTrigger>
                    <TabsTrigger value="Gemini 1.5">Gemini 1.5</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phrase</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Response Preview</TableHead>
                      <TableHead>Latency</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.slice(0, 20).map((result, index) => {
                      const model = aiModels.find(m => m.name === result.model);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate" title={result.phrase}>
                              {result.phrase}
                            </div>
                            <div className="text-xs text-slate-500">{result.keyword}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={model?.color}>{result.model}</Badge>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="text-sm text-slate-700 line-clamp-2">
                              {result.response.substring(0, 120)}...
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <span className="font-mono">{result.latency}s</span>
                          </TableCell>
                          <TableCell className="text-sm">
                            <span className="font-mono">${result.cost}</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {filteredResults.length > 20 && (
                <div className="text-center mt-4 text-sm text-slate-500">
                  Showing first 20 of {filteredResults.length} results
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
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Score Responses ({results.length} results)
        </Button>
      </div>
    </div>
  );
};

export default AIQueryResults;
