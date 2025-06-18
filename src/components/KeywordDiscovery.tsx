
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Check } from 'lucide-react';

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
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Keyword Discovery
        </h2>
        <p className="text-lg text-slate-600">
          Select and customize keywords for comprehensive AI visibility analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suggested Keywords */}
        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Suggested Keywords</CardTitle>
            <CardDescription className="text-slate-600">
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
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  onClick={() => toggleKeyword(keyword)}
                >
                  <span className="font-medium text-slate-700">{keyword}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                      {Math.floor(Math.random() * 1000) + 100}/mo
                    </Badge>
                    {selectedKeywords.includes(keyword) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Keywords & Custom Input */}
        <Card className="shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Selected Keywords ({selectedKeywords.length})</CardTitle>
            <CardDescription className="text-slate-600">
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
                className="flex-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button onClick={addCustomKeyword} size="sm" className="px-3 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected keywords list */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedKeywords.map((keyword) => (
                <div 
                  key={keyword}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
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
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Generate Phrases ({selectedKeywords.length} keywords)
        </Button>
      </div>
    </div>
  );
};

export default KeywordDiscovery;
