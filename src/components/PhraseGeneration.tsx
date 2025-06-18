
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X } from 'lucide-react';

interface PhraseGenerationProps {
  keywords: string[];
  generatedPhrases: Array<{keyword: string, phrases: string[]}>;
  setGeneratedPhrases: (phrases: Array<{keyword: string, phrases: string[]}>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PhraseGeneration: React.FC<PhraseGenerationProps> = ({
  keywords,
  generatedPhrases,
  setGeneratedPhrases,
  onNext,
  onPrev
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<{keyword: string, index: number} | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (generatedPhrases.length === 0 && keywords.length > 0) {
      generatePhrases();
    }
  }, [keywords, generatedPhrases.length]);

  const generatePhrases = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPhrases = keywords.map(keyword => ({
      keyword,
      phrases: [
        `What is ${keyword}?`,
        `Best ${keyword} for small business`,
        `${keyword} reviews and comparison`,
        `How to choose ${keyword}`,
        `Top alternatives to ${keyword}`
      ]
    }));
    
    setGeneratedPhrases(mockPhrases);
    setIsGenerating(false);
  };

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

  const getPhraseType = (phrase: string) => {
    if (phrase.toLowerCase().includes('what is') || phrase.toLowerCase().includes('how to')) {
      return { type: 'Informational', color: 'bg-slate-100 text-slate-700' };
    } else if (phrase.toLowerCase().includes('best') || phrase.toLowerCase().includes('top')) {
      return { type: 'Commercial', color: 'bg-blue-100 text-blue-700' };
    } else if (phrase.toLowerCase().includes('reviews') || phrase.toLowerCase().includes('comparison')) {
      return { type: 'Comparative', color: 'bg-green-100 text-green-700' };
    }
    return { type: 'Generic', color: 'bg-gray-100 text-gray-700' };
  };

  const totalPhrases = generatedPhrases.reduce((sum, item) => sum + item.phrases.length, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Phrase Generation
        </h2>
        <p className="text-lg text-slate-600">
          AI-generated search phrases for comprehensive visibility analysis
        </p>
      </div>

      {isGenerating ? (
        <Card className="shadow-sm border border-slate-200">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
              <h3 className="text-xl font-semibold text-slate-900">Generating Phrases...</h3>
              <p className="text-slate-600">Creating targeted search phrases for {keywords.length} keywords</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{keywords.length}</div>
                <div className="text-sm text-slate-600">Keywords</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPhrases}</div>
                <div className="text-sm text-slate-600">Total Phrases</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">  
                <div className="text-2xl font-bold text-blue-600">{Math.round(totalPhrases / keywords.length)}</div>
                <div className="text-sm text-slate-600">Avg per Keyword</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPhrases * 3}</div>
                <div className="text-sm text-slate-600">AI Queries</div>
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
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">{item.phrases.length} phrases</Badge>
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Search phrases generated for this keyword
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.phrases.map((phrase, index) => {
                      const phraseType = getPhraseType(phrase);
                      const isEditing = editingPhrase?.keyword === item.keyword && editingPhrase?.index === index;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center space-x-3 flex-1">
                            <Badge className={phraseType.color}>
                              {phraseType.type}
                            </Badge>
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
