
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface KeywordDiscoveryProps {
  selectedKeywords: string[];
  setSelectedKeywords: (keywords: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const KeywordDiscovery: React.FC<KeywordDiscoveryProps> = ({
  selectedKeywords,
  setSelectedKeywords,
  onNext,
  onPrev
}) => {
  const [customKeyword, setCustomKeyword] = useState('');
  const [suggestedKeywords] = useState([
    'project management software',
    'team collaboration tools',
    'business automation platform',
    'productivity solutions',
    'workflow management',
    'digital transformation',
    'enterprise software',
    'SaaS platform'
  ]);

  useEffect(() => {
    if (selectedKeywords.length === 0) {
      setSelectedKeywords(suggestedKeywords.slice(0, 3));
    }
  }, [selectedKeywords.length, setSelectedKeywords, suggestedKeywords]);

  const addCustomKeyword = () => {
    if (customKeyword.trim() && !selectedKeywords.includes(customKeyword.trim())) {
      setSelectedKeywords([...selectedKeywords, customKeyword.trim()]);
      setCustomKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      removeKeyword(keyword);
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Keyword Discovery
        </h2>
        <p className="text-lg text-slate-600">
          Select and customize keywords for comprehensive AI visibility analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suggested Keywords */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Suggested Keywords</CardTitle>
            <CardDescription>
              AI-generated keywords based on your domain analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestedKeywords.map((keyword) => (
                <div 
                  key={keyword}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedKeywords.includes(keyword) 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => toggleKeyword(keyword)}
                >
                  <span className="font-medium text-slate-700">{keyword}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {Math.floor(Math.random() * 1000) + 100}/mo
                    </Badge>
                    {selectedKeywords.includes(keyword) && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Keywords & Custom Input */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Selected Keywords ({selectedKeywords.length})</CardTitle>
            <CardDescription>
              Add custom keywords to expand your analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Custom keyword input */}
            <div className="flex gap-2">
              <Input
                placeholder="Add custom keyword..."
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomKeyword()}
                className="flex-1"
              />
              <Button onClick={addCustomKeyword} size="sm" className="px-3">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected keywords list */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedKeywords.map((keyword) => (
                <div 
                  key={keyword}
                  className="flex items-center justify-between p-2 bg-purple-50 rounded-lg"
                >
                  <span className="text-slate-700 font-medium">{keyword}</span>
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {selectedKeywords.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Select keywords from the suggested list or add custom ones
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={selectedKeywords.length === 0}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Generate Phrases ({selectedKeywords.length} keywords)
        </Button>
      </div>
    </div>
  );
};

export default KeywordDiscovery;
