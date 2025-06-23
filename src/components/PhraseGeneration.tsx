import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X } from 'lucide-react';
import { apiService } from '@/services/api';

interface PhraseGenerationProps {
  domainId: number;
  generatedPhrases: Array<{keyword: string, phrases: string[]}>;
  setGeneratedPhrases: (phrases: Array<{keyword: string, phrases: string[]}>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PhraseGeneration: React.FC<PhraseGenerationProps> = ({
  domainId,
  generatedPhrases,
  setGeneratedPhrases,
  onNext,
  onPrev
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [editingPhrase, setEditingPhrase] = useState<{keyword: string, index: number} | null>(null);
  const [editValue, setEditValue] = useState('');
  const [stats, setStats] = useState({ totalKeywords: 0, totalPhrases: 0, avgPerKeyword: 0, aiQueries: 0 });

  useEffect(() => {
    if (domainId) {
      setIsGenerating(true);
      setProgressMsg('Starting phrase generation...');
      setGeneratedPhrases([]);
      setStats({ totalKeywords: 0, totalPhrases: 0, avgPerKeyword: 0, aiQueries: 0 });
      const phrasesMap: Record<string, string[]> = {};
      const eventSource = new EventSource(`http://localhost:3002/api/phrases/${domainId}`);

      eventSource.addEventListener('progress', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        setProgressMsg(data.message);
      });

      eventSource.addEventListener('phrase', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        if (!phrasesMap[data.keyword]) phrasesMap[data.keyword] = [];
        phrasesMap[data.keyword].push(data.phrase);
        // Convert map to array for setGeneratedPhrases
        setGeneratedPhrases(Object.entries(phrasesMap).map(([keyword, phrases]) => ({ keyword, phrases })));
      });

      eventSource.addEventListener('stats', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        setStats(data);
      });

      eventSource.addEventListener('error', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          setProgressMsg(data.error || 'An error occurred.');
        } catch {
          setProgressMsg('An error occurred.');
        }
      });

      eventSource.addEventListener('complete', () => {
        setIsGenerating(false);
        setProgressMsg('All phrases generated!');
        eventSource.close();
      });

      return () => {
        eventSource.close();
      };
    }
  }, [domainId, setGeneratedPhrases]);

  const startEditing = (keyword: string, index: number, currentValue: string) => {
    setEditingPhrase({ keyword, index });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingPhrase && editValue.trim()) {
      const updated = generatedPhrases.map(item => {
        if (item.keyword === editingPhrase.keyword) {
          const newPhrases = [...item.phrases];
          newPhrases[editingPhrase.index] = editValue.trim();
          return { ...item, phrases: newPhrases };
        }
        return item;
      });
      setGeneratedPhrases(updated);
    }
    setEditingPhrase(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingPhrase(null);
    setEditValue('');
  };

  const removePhrase = (keyword: string, index: number) => {
    const updated = generatedPhrases.map(item => {
      if (item.keyword === keyword) {
        return {
          ...item,
          phrases: item.phrases.filter((_, i) => i !== index)
        };
      }
      return item;
    });
    setGeneratedPhrases(updated);
  };

  const totalPhrases = generatedPhrases.reduce((sum, item) => sum + item.phrases.length, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Phrase Generation
        </h2>
        <p className="text-lg text-slate-600">
          AI-Generated Phrases
        </p>
      </div>

      {isGenerating ? (
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
              <h3 className="text-xl font-semibold text-slate-900">AI Generating Phrases...</h3>
              <p className="text-slate-600">{progressMsg}</p>
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                AI Processing
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalKeywords}</div>
                <div className="text-sm text-slate-600">AI-Processed Keywords</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalPhrases}</div>
                <div className="text-sm text-slate-600">AI-Generated Phrases</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">  
                <div className="text-2xl font-bold text-blue-600">{stats.totalKeywords > 0 ? Math.round(stats.avgPerKeyword) : 0}</div>
                <div className="text-sm text-slate-600">AI Avg per Keyword</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.aiQueries}</div>
                <div className="text-sm text-slate-600">AI API Calls</div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Phrases */}
          <div className="space-y-6">
            {generatedPhrases.map((item) => (
              <Card key={item.keyword} className="shadow-sm border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-slate-900">
                    <span>{item.keyword}</span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">{item.phrases.length} AI phrases</Badge>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    AI-generated search phrases for this keyword
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.phrases.map((phrase, index) => {
                      const isEditing = editingPhrase?.keyword === item.keyword && editingPhrase?.index === index;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center space-x-3 flex-1">
                            {isEditing ? (
                              <div className="flex-1 flex items-center space-x-2">
                                <Input
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="flex-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                />
                                <Button size="sm" onClick={saveEdit} className="bg-blue-600 hover:bg-blue-700">
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEdit}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-slate-700 flex-1">{phrase}</span>
                            )}
                          </div>
                          {!isEditing && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => startEditing(item.keyword, index, phrase)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => removePhrase(item.keyword, index)}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev} disabled={isGenerating}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={isGenerating || totalPhrases === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Run AI Analysis ({totalPhrases} phrases)
        </Button>
      </div>
    </div>
  );
};

export default PhraseGeneration;
