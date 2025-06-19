
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Check, Search, TrendingUp, Target, Brain, Filter } from 'lucide-react';

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
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const keywordCategories = [
    {
      id: 'core-business',
      name: 'Core Business',
      keywords: [
        { term: 'enterprise software solutions', volume: 2400, difficulty: 'Medium', cpc: '$4.20' },
        { term: 'business automation platform', volume: 1800, difficulty: 'High', cpc: '$5.80' },
        { term: 'digital transformation services', volume: 3200, difficulty: 'Medium', cpc: '$6.10' },
        { term: 'cloud infrastructure solutions', volume: 1600, difficulty: 'High', cpc: '$7.30' }
      ]
    },
    {
      id: 'products',
      name: 'Product Terms',
      keywords: [
        { term: 'project management software', volume: 5400, difficulty: 'High', cpc: '$3.90' },
        { term: 'team collaboration tools', volume: 4200, difficulty: 'Medium', cpc: '$2.80' },
        { term: 'workflow automation', volume: 2800, difficulty: 'Medium', cpc: '$4.50' },
        { term: 'business intelligence platform', volume: 1900, difficulty: 'High', cpc: '$8.20' }
      ]
    },
    {
      id: 'industry',
      name: 'Industry Focus',
      keywords: [
        { term: 'SaaS platform development', volume: 1500, difficulty: 'High', cpc: '$9.10' },
        { term: 'enterprise technology consulting', volume: 1200, difficulty: 'Medium', cpc: '$12.40' },
        { term: 'API integration services', volume: 980, difficulty: 'Medium', cpc: '$6.70' },
        { term: 'cloud migration solutions', volume: 2100, difficulty: 'High', cpc: '$8.90' }
      ]
    },
    {
      id: 'competitive',
      name: 'Competitive',
      keywords: [
        { term: 'alternative to Salesforce', volume: 890, difficulty: 'Low', cpc: '$2.30' },
        { term: 'best CRM software', volume: 3800, difficulty: 'High', cpc: '$15.60' },
        { term: 'enterprise software comparison', volume: 1400, difficulty: 'Medium', cpc: '$7.80' },
        { term: 'business software reviews', volume: 2200, difficulty: 'Medium', cpc: '$4.90' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCategories = keywordCategories.map(category => ({
    ...category,
    keywords: category.keywords.filter(keyword =>
      keyword.term.toLowerCase().includes(searchFilter.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === 'all' || category.id === selectedCategory
  );

  useEffect(() => {
    if (selectedKeywords.length === 0) {
      // Auto-select top performing keywords
      const autoSelected = [
        'enterprise software solutions',
        'project management software',
        'digital transformation services'
      ];
      setSelectedKeywords(autoSelected);
    }
  }, [selectedKeywords.length, setSelectedKeywords]);

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

  const totalVolume = selectedKeywords.reduce((sum, keyword) => {
    const found = keywordCategories
      .flatMap(cat => cat.keywords)
      .find(k => k.term === keyword);
    return sum + (found?.volume || 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Search className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Strategic Keyword Discovery
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          AI-powered keyword recommendations based on your brand context. Select keywords that best represent your business for comprehensive visibility analysis.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{selectedKeywords.length}</div>
            <div className="text-sm text-slate-600">Selected Keywords</div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{totalVolume.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Total Search Volume</div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{keywordCategories.length}</div>
            <div className="text-sm text-slate-600">Categories Available</div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">96%</div>
            <div className="text-sm text-slate-600">Relevance Score</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Keyword Categories */}
        <div className="lg:col-span-3">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search keywords..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10 border-slate-300"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm bg-white"
            >
              <option value="all">All Categories</option>
              {keywordCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Keywords by Category */}
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="border border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg text-slate-900">{category.name}</CardTitle>
                        <CardDescription className="text-slate-600">
                          {category.keywords.length} keywords available
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {category.keywords.filter(k => selectedKeywords.includes(k.term)).length} selected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.keywords.map((keyword) => (
                      <div 
                        key={keyword.term}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedKeywords.includes(keyword.term) 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        onClick={() => toggleKeyword(keyword.term)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-slate-900">{keyword.term}</span>
                            {selectedKeywords.includes(keyword.term) && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-slate-700">{keyword.volume.toLocaleString()}</div>
                            <div className="text-xs text-slate-500">Volume/month</div>
                          </div>
                          <Badge className={getDifficultyColor(keyword.difficulty)}>
                            {keyword.difficulty}
                          </Badge>
                          <div className="text-center">
                            <div className="font-semibold text-slate-700">{keyword.cpc}</div>
                            <div className="text-xs text-slate-500">CPC</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Keywords Panel */}
        <div className="space-y-6">
          <Card className="border border-slate-200 sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                Selected Keywords ({selectedKeywords.length})
              </CardTitle>
              <CardDescription className="text-slate-600">
                Keywords chosen for AI visibility analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Custom keyword input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Add Custom Keyword</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter keyword..."
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomKeyword()}
                    className="flex-1 border-slate-300"
                  />
                  <Button onClick={addCustomKeyword} size="sm" className="px-3 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Selected keywords list */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="text-sm font-medium text-slate-700 mb-2">Selected Keywords:</div>
                {selectedKeywords.map((keyword, index) => (
                  <div 
                    key={keyword}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-600 font-medium">#{index + 1}</span>
                      <span className="text-slate-700 font-medium text-sm">{keyword}</span>
                    </div>
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
                  <Target className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">Select keywords to begin analysis</p>
                </div>
              )}

              {/* Analysis Preview */}
              {selectedKeywords.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 text-sm mb-3">Analysis Preview:</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phrases to generate:</span>
                      <span className="font-medium text-slate-900">~{selectedKeywords.length * 8}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">AI models queried:</span>
                      <span className="font-medium text-slate-900">15+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estimated time:</span>
                      <span className="font-medium text-slate-900">3-5 minutes</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev} className="px-8">
          Previous Step
        </Button>
        <Button 
          onClick={onNext}
          disabled={selectedKeywords.length === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
        >
          Generate AI Query Phrases ({selectedKeywords.length} keywords)
        </Button>
      </div>
    </div>
  );
};

export default KeywordDiscovery;
