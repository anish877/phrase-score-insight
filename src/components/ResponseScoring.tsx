
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ResponseScoringProps {
  queryResults: any[];
  onNext: () => void;
  onPrev: () => void;
}

const ResponseScoring: React.FC<ResponseScoringProps> = ({
  queryResults,
  onNext,
  onPrev
}) => {
  const [scores, setScores] = useState<any[]>([]);
  const [isScoring, setIsScoring] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    if (scores.length === 0 && queryResults.length > 0) {
      generateScores();
    }
  }, [queryResults, scores.length]);

  const generateScores = async () => {
    setIsScoring(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const scoredResults = queryResults.map(result => ({
      ...result,
      scores: {
        presence: Math.random() > 0.3 ? 1 : 0, // 70% chance of presence
        relevance: Math.floor(Math.random() * 5) + 1,
        accuracy: Math.floor(Math.random() * 5) + 1,
        sentiment: Math.floor(Math.random() * 5) + 1,
        overall: 0
      }
    }));

    // Calculate overall score
    scoredResults.forEach(result => {
      const { presence, relevance, accuracy, sentiment } = result.scores;
      result.scores.overall = presence === 0 ? 0 : 
        Math.round((relevance + accuracy + sentiment) / 3 * 10) / 10;
    });

    setScores(scoredResults);
    setIsScoring(false);
  };

  const getScoreColor = (score: number, maxScore: number = 5) => {
    const percentage = score / maxScore;
    if (percentage >= 0.8) return 'text-green-600';
    if (percentage >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number, maxScore: number = 5) => {
    const percentage = score / maxScore;
    if (percentage >= 0.8) return 'bg-green-500';
    if (percentage >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateModelStats = () => {
    const modelStats = scores.reduce((acc, result) => {
      if (!acc[result.model]) {
        acc[result.model] = {
          total: 0,
          presence: 0,
          relevance: 0,
          accuracy: 0,
          sentiment: 0,
          overall: 0
        };
      }
      
      acc[result.model].total++;
      acc[result.model].presence += result.scores.presence;
      acc[result.model].relevance += result.scores.relevance;
      acc[result.model].accuracy += result.scores.accuracy;
      acc[result.model].sentiment += result.scores.sentiment;
      acc[result.model].overall += result.scores.overall;
      
      return acc;
    }, {} as any);

    return Object.keys(modelStats).map(model => ({
      model,
      presenceRate: Math.round((modelStats[model].presence / modelStats[model].total) * 100),
      avgRelevance: Math.round((modelStats[model].relevance / modelStats[model].total) * 10) / 10,
      avgAccuracy: Math.round((modelStats[model].accuracy / modelStats[model].total) * 10) / 10,
      avgSentiment: Math.round((modelStats[model].sentiment / modelStats[model].total) * 10) / 10,
      avgOverall: Math.round((modelStats[model].overall / modelStats[model].total) * 10) / 10
    }));
  };

  const getTopPerformingPhrases = () => {
    return scores
      .filter(s => s.scores.presence === 1)
      .sort((a, b) => b.scores.overall - a.scores.overall)
      .slice(0, 10);
  };

  const getWorstPerformingPhrases = () => {
    return scores
      .sort((a, b) => a.scores.overall - b.scores.overall)
      .slice(0, 10);
  };

  if (isScoring) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
              <h3 className="text-xl font-semibold text-slate-800">Scoring Responses...</h3>
              <p className="text-slate-600">Analyzing {queryResults.length} AI responses for presence, relevance, accuracy, and sentiment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const modelStats = calculateModelStats();
  const topPhrases = getTopPerformingPhrases();
  const worstPhrases = getWorstPerformingPhrases();

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
                  {Math.round((scores.filter(s => s.scores.presence === 1).length / scores.length) * 100)}%
                </div>
                <div className="text-sm text-slate-600">Presence Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((scores.reduce((sum, s) => sum + s.scores.relevance, 0) / scores.length) * 10) / 10}
                </div>
                <div className="text-sm text-slate-600">Avg Relevance</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((scores.reduce((sum, s) => sum + s.scores.accuracy, 0) / scores.length) * 10) / 10}
                </div>
                <div className="text-sm text-slate-600">Avg Accuracy</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round((scores.reduce((sum, s) => sum + s.scores.sentiment, 0) / scores.length) * 10) / 10}
                </div>
                <div className="text-sm text-slate-600">Avg Sentiment</div>
              </CardContent>
            </Card>
          </div>

          {/* Model Performance Summary */}
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Model Performance Summary</CardTitle>
              <CardDescription>Comparative performance across all metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelStats.map((stat) => (
                  <div key={stat.model} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800">{stat.model}</Badge>
                      <span className="text-sm font-medium">Overall: {stat.avgOverall}/5</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <div className="text-slate-600">Presence</div>
                        <div className="font-medium">{stat.presenceRate}%</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Relevance</div>
                        <div className="font-medium">{stat.avgRelevance}/5</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Accuracy</div>
                        <div className="font-medium">{stat.avgAccuracy}/5</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Sentiment</div>
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
                      <span className="text-sm">Presence Rate</span>
                      <span className="text-sm font-medium">{stat.presenceRate}%</span>
                    </div>
                    <Progress value={stat.presenceRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Relevance</span>
                      <span className="text-sm font-medium">{stat.avgRelevance}/5</span>
                    </div>
                    <Progress value={(stat.avgRelevance / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm font-medium">{stat.avgAccuracy}/5</span>
                    </div>
                    <Progress value={(stat.avgAccuracy / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sentiment</span>
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
                <CardTitle className="text-green-600">Top Performing Phrases</CardTitle>
                <CardDescription>Phrases with highest overall scores</CardDescription>
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Worst Performing */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600">Improvement Opportunities</CardTitle>
                <CardDescription>Phrases needing attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {worstPhrases.slice(0, 5).map((phrase, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-sm mb-1">{phrase.phrase}</div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <Badge className="bg-blue-100 text-blue-800">{phrase.model}</Badge>
                        <span className="font-medium">
                          {phrase.scores.presence === 0 ? 'Not Present' : `Score: ${phrase.scores.overall}/5`}
                        </span>
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
              <CardTitle>Detailed Score Breakdown</CardTitle>
              <CardDescription>Individual scores for all phrases and models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Phrase</th>
                      <th className="text-left p-2">Model</th>
                      <th className="text-center p-2">Presence</th>
                      <th className="text-center p-2">Relevance</th>
                      <th className="text-center p-2">Accuracy</th>
                      <th className="text-center p-2">Sentiment</th>
                      <th className="text-center p-2">Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.slice(0, 20).map((score, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-2 max-w-xs truncate">{score.phrase}</td>
                        <td className="p-2">
                          <Badge className="bg-blue-100 text-blue-800">{score.model}</Badge>
                        </td>
                        <td className="p-2 text-center">
                          {score.scores.presence === 1 ? 
                            <span className="text-green-600">✓</span> : 
                            <span className="text-red-600">✗</span>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {scores.length > 20 && (
                <div className="text-center mt-4 text-sm text-slate-500">
                  Showing first 20 of {scores.length} scored responses
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          View Dashboard Summary
        </Button>
      </div>
    </div>
  );
};

export default ResponseScoring;
