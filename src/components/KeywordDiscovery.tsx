import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Check, Search, Target, Brain, Loader2, AlertCircle, TrendingUp, Filter } from 'lucide-react';
import { apiService, Keyword as ApiKeyword } from '@/services/api';
import { useDebounce } from 'use-debounce';
import { fetchEventSource } from '@microsoft/fetch-event-source';

// We extend the API's Keyword type to include a client-side category property
interface Keyword extends ApiKeyword {
    category: string;
}

interface KeywordDiscoveryProps {
  domainId: number;
  selectedKeywords: string[];
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
  onPrev: () => void;
}

// Category configuration for UI
const categoryConfig: { [key: string]: { name: string; icon: React.ReactNode; description: string } } = {
  'core-business': { name: 'Core Business', icon: <Target className="h-5 w-5 text-blue-600" />, description: 'High-intent keywords directly related to your main offerings.' },
  'products': { name: 'Products', icon: <Brain className="h-5 w-5 text-purple-600" />, description: 'Keywords mentioning specific products or software types.' },
  'services': { name: 'Services', icon: <TrendingUp className="h-5 w-5 text-green-600" />, description: 'Keywords related to the services you provide.' },
  'competitive': { name: 'Competitive', icon: <Filter className="h-5 w-5 text-orange-600" />, description: 'Keywords comparing your brand or offerings against others.' },
  'informational': { name: 'Informational', icon: <Search className="h-5 w-5 text-yellow-600" />, description: 'Broader terms indicating users are researching or learning.' },
  'transactional': { name: 'Transactional', icon: <Check className="h-5 w-5 text-red-600" />, description: 'Keywords showing strong intent to buy or take action.' },
  'industry': { name: 'Industry', icon: <Plus className="h-5 w-5 text-gray-600" />, description: 'General keywords related to your industry or niche.' },
  'custom': { name: 'Custom', icon: <Plus className="h-5 w-5 text-gray-600" />, description: 'Keywords added manually.' },
};


const KeywordDiscovery: React.FC<KeywordDiscoveryProps> = ({ domainId, selectedKeywords, setSelectedKeywords, onNext, onPrev }) => {
  console.log('KeywordDiscovery rendered with domainId:', domainId);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState('Connecting to keyword engine...');
  const [customKeyword, setCustomKeyword] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const loadingSteps = [
    'Analyzing brand context...',
    'Connecting to keyword intelligence APIs...',
    'Fetching organic keyword metrics...',
    'Running competitive analysis...',
    'Categorizing keywords by user intent...',
    'Finalizing recommendations...'
  ];
  const [debouncedKeywords] = useDebounce(selectedKeywords, 1000);

  useEffect(() => {
    if (!domainId || domainId <= 0) {
      setError('A valid domain analysis is required to discover keywords.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setProgressMsg('Connecting to keyword engine...');
    setKeywords([]);
    const ctrl = new AbortController();
    fetchEventSource(`https://phrase-score-insight.onrender.com/api/keywords/stream/${domainId}`, {
      signal: ctrl.signal,
      onopen(_response) {
        setProgressMsg('Connected. Discovering keywords...');
        return Promise.resolve();
      },
      onmessage(ev) {
        if (ev.event === 'keyword') {
          const kw: Keyword = JSON.parse(ev.data);
          setKeywords(prev => {
            if (prev.some(k => k.term === kw.term)) return prev;
            return [...prev, kw];
          });
        } else if (ev.event === 'progress') {
          const data = JSON.parse(ev.data);
          setProgressMsg(data.message);
        } else if (ev.event === 'error') {
          try {
            const data = JSON.parse(ev.data);
            setError(data.error || 'An error occurred.');
          } catch {
            setError('An error occurred.');
          }
          setIsLoading(false);
        } else if (ev.event === 'complete') {
          setIsLoading(false);
          setProgressMsg('Keyword discovery complete!');
        }
      },
      onclose() {
        setIsLoading(false);
      },
      onerror(err) {
        setError('An error occurred during keyword discovery.');
        setIsLoading(false);
        ctrl.abort();
        throw err;
      }
    });
    return () => {
      ctrl.abort();
    };
  }, [domainId, setSelectedKeywords]);

  useEffect(() => {
    const saveSelection = async () => {
      if (debouncedKeywords.length === 0 || isLoading) return;
      setIsSaving(true);
      try {
        await apiService.updateKeywordSelection(domainId, debouncedKeywords as string[]);
      } catch (err) {
        console.error('Failed to save keyword selection:', err);
      } finally {
        setTimeout(() => setIsSaving(false), 500);
      }
    };
    saveSelection();
  }, [debouncedKeywords, domainId, isLoading]);

  const keywordCategories = useMemo(() => {
    const categories: { [key: string]: Keyword[] } = {};
    keywords.forEach(kw => {
        const cat = kw.category || 'industry';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(kw);
    });
    return Object.keys(categoryConfig).map(catId => ({
        id: catId,
        ...categoryConfig[catId],
        keywords: categories[catId] || []
    })).filter(cat => cat.keywords.length > 0);
  }, [keywords]);

  const filteredCategories = useMemo(() => keywordCategories
    .map(category => ({
      ...category,
      keywords: category.keywords.filter(keyword =>
        keyword.term.toLowerCase().includes(searchFilter.toLowerCase())
      )
    }))
    .filter(category => (selectedCategory === 'all' || category.id === selectedCategory) && category.keywords.length > 0), 
    [keywordCategories, searchFilter, selectedCategory]);

  const addCustomKeyword = () => {
    const newKeyword = customKeyword.trim().toLowerCase();
    if (newKeyword && !selectedKeywords.includes(newKeyword)) {
      setSelectedKeywords([...selectedKeywords, newKeyword]);
      if (!keywords.some(k => k.term.toLowerCase() === newKeyword)) {
        const newKw: Keyword = {
            id: -1, 
            term: newKeyword,
            volume: 0,
            difficulty: 'N/A',
            cpc: 0,
            category: 'custom',
            isSelected: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setKeywords([...keywords, newKw]);
      }
      setCustomKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k.toLowerCase() !== keyword.toLowerCase()));
  };

  const toggleKeyword = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    if (selectedKeywords.map(k => k.toLowerCase()).includes(lowerKeyword)) {
      removeKeyword(keyword);
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const totalVolume = useMemo(() => keywords
    .filter(kw => selectedKeywords.includes(kw.term))
    .reduce((sum, kw) => sum + kw.volume, 0), [keywords, selectedKeywords]);
  
  const avgDifficultyScore = useMemo(() => {
    const selected = keywords.filter(kw => selectedKeywords.includes(kw.term) && kw.difficulty !== 'N/A');
    if (selected.length === 0) return 0;
    const total = selected.reduce((sum, kw) => {
        return sum + (kw.difficulty === 'Low' ? 20 : kw.difficulty === 'Medium' ? 50 : 80);
    }, 0);
    return total / selected.length;
  }, [keywords, selectedKeywords]);

  const getAvgDifficultyLabel = (score: number) => {
      if (score < 35) return 'Low';
      if (score < 65) return 'Medium';
      return 'High';
  }

  if (isLoading) return <LoadingState step={progressMsg} count={keywords.length} />;
  if (error) return <ErrorState error={error} onPrev={onPrev} />;

  return (
    <div className="max-w-7xl mx-auto">
       <Header />
       <StatsCards 
         selectedCount={selectedKeywords.length} 
         totalVolume={totalVolume}
         categoryCount={keywordCategories.length}
         avgDifficulty={getAvgDifficultyLabel(avgDifficultyScore)}
         isSaving={isSaving}
       />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <FilterControls 
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={keywordCategories.map(c => ({id: c.id, name: c.name, icon: c.icon}))}
          />

          <div className="space-y-6">
            {filteredCategories.length > 0 ? filteredCategories.map((category) => (
              <KeywordCategoryCard 
                key={category.id}
                category={category}
                selectedKeywords={selectedKeywords}
                toggleKeyword={toggleKeyword}
              />
            )) : <NoResultsCard />}
          </div>
        </div>

        <div className="space-y-6">
          <SelectedKeywordsPanel
            selectedKeywords={selectedKeywords}
            customKeyword={customKeyword}
            setCustomKeyword={setCustomKeyword}
            addCustomKeyword={addCustomKeyword}
            removeKeyword={removeKeyword}
          />
        </div>
      </div>

      <Footer onPrev={onPrev} onNext={onNext} isSaving={isSaving} selectedCount={selectedKeywords.length} />
    </div>
  );
};

// Sub-components for cleaner structure
const LoadingState = ({ step, count }: { step: string, count: number }) => (
    <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-md">
            <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center text-blue-600"><Search/></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">AI Keyword Discovery</h2>
            <p className="text-slate-600 mb-4 font-medium">{step}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: `${Math.min(100, Math.max(10, count * 2))}%`}}></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">{count} AI-generated keywords found</div>
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                AI Analysis
            </div>
        </div>
    </div>
);

const ErrorState = ({ error, onPrev }: { error: string, onPrev: () => void }) => (
    <div className="max-w-6xl mx-auto text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Error Loading Keywords</h2>
            <p className="text-red-700 mb-6">{error}</p>
            <Button onClick={onPrev} variant="outline">Go Back</Button>
        </div>
    </div>
);

const Header = () => (
    <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Search className="h-6 w-6 text-white" />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Keyword Discovery
        </h2>
        <p className="text-lg text-slate-600">
            AI Analysis
        </p>
    </div>
);

interface StatsCardsProps {
    selectedCount: number;
    totalVolume: number;
    categoryCount: number;
    avgDifficulty: string;
    isSaving: boolean;
}
const StatsCards: React.FC<StatsCardsProps> = ({ selectedCount, totalVolume, categoryCount, avgDifficulty, isSaving }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{selectedCount}</div>
                <div className="text-sm text-slate-600">Selected Keywords</div>
                {isSaving && <Loader2 className="w-4 h-4 animate-spin text-blue-500 mx-auto mt-1" />}
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{totalVolume.toLocaleString()}</div>
                <div className="text-sm text-slate-600">AI-Estimated Volume</div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{categoryCount}</div>
                <div className="text-sm text-slate-600">AI-Categorized</div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold mb-1 ${avgDifficulty === 'Low' ? 'text-green-600' : avgDifficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{avgDifficulty}</div>
                <div className="text-sm text-slate-600">AI-Assessed Difficulty</div>
            </CardContent>
        </Card>
    </div>
);

interface FilterControlsProps {
    searchFilter: string;
    setSearchFilter: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    categories: {id: string; name: string; icon: React.ReactNode}[];
}
const FilterControls: React.FC<FilterControlsProps> = ({ searchFilter, setSearchFilter, selectedCategory, setSelectedCategory, categories }) => (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Search keywords..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className="pl-10" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} onClick={() => setSelectedCategory('all')}>All</Button>
            {categories.map((c) => (
                <Button key={c.id} variant={selectedCategory === c.id ? 'default' : 'outline'} onClick={() => setSelectedCategory(c.id)} className="flex-shrink-0">
                    {c.icon} <span className="ml-2">{c.name}</span>
                </Button>
            ))}
        </div>
    </div>
);

interface KeywordCategoryCardProps {
    category: {
        id: string;
        name: string;
        icon: React.ReactNode;
        description: string;
        keywords: Keyword[];
    };
    selectedKeywords: string[];
    toggleKeyword: (keyword: string) => void;
}
const KeywordCategoryCard: React.FC<KeywordCategoryCardProps> = ({ category, selectedKeywords, toggleKeyword }) => {
    const getDifficultyColor = (difficulty: string) => {
        if (difficulty === 'Low') return 'bg-green-100 text-green-800';
        if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800';
        if (difficulty === 'High') return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };
    
    return (
        <Card key={category.id}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        {category.icon}
                        <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </div>
                    </div>
                    <Badge variant="secondary">{category.keywords.filter((k) => selectedKeywords.includes(k.term)).length} / {category.keywords.length}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                {category.keywords.map((keyword: Keyword) => (
                    <div
                        key={keyword.term}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedKeywords.includes(keyword.term) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                        onClick={() => toggleKeyword(keyword.term)}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedKeywords.includes(keyword.term) ? 'bg-blue-500' : 'bg-slate-200'}`}>
                                {selectedKeywords.includes(keyword.term) && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className="font-medium text-slate-800">{keyword.term}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-right">
                            <div className="w-20">
                                <div className="font-semibold text-slate-700">{keyword.volume.toLocaleString()}</div>
                                <div className="text-xs text-slate-500">Volume</div>
                            </div>
                            <Badge className={`w-16 justify-center ${getDifficultyColor(keyword.difficulty)}`}>{keyword.difficulty}</Badge>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const NoResultsCard = () => (
    <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
        <Search className="h-12 w-12 mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-700">No Keywords Found</h3>
        <p className="text-slate-500">Try adjusting your search or category filters.</p>
    </div>
);

interface SelectedKeywordsPanelProps {
    selectedKeywords: string[];
    customKeyword: string;
    setCustomKeyword: (value: string) => void;
    addCustomKeyword: () => void;
    removeKeyword: (keyword: string) => void;
}
const SelectedKeywordsPanel: React.FC<SelectedKeywordsPanelProps> = ({ selectedKeywords, customKeyword, setCustomKeyword, addCustomKeyword, removeKeyword }) => (
    <Card className="sticky top-6">
        <CardHeader>
            <CardTitle className="flex items-center text-sm">
                <Brain className="h-5 w-5 mr-2 text-blue-600 text-sm" />
                Selected Keywords ({selectedKeywords.length})
            </CardTitle>
            <CardDescription>Keywords to guide AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex gap-2">
                    <Input placeholder="Add a custom keyword..." value={customKeyword} onChange={(e) => setCustomKeyword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCustomKeyword()} />
                    <Button onClick={addCustomKeyword} size="icon"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                    {selectedKeywords.length > 0 ? selectedKeywords.map((keyword) => (
                        <div key={keyword} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                            <span className="text-slate-700 text-sm font-medium truncate pr-2">{keyword}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeKeyword(keyword)}>
                                <X className="h-4 w-4 text-slate-400" />
                            </Button>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-slate-500">
                            <Target className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                            <p className="text-sm">Select or add keywords to begin</p>
                        </div>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
);

interface FooterProps {
    onPrev: () => void;
    onNext: () => void;
    isSaving: boolean;
    selectedCount: number;
}
const Footer: React.FC<FooterProps> = ({ onPrev, onNext, isSaving, selectedCount }) => (
    <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={onPrev} className="px-8">Previous Step</Button>
        <Button onClick={onNext} disabled={selectedCount === 0 || isSaving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold">
            {isSaving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</> : `Continue with ${selectedCount} Keywords`}
        </Button>
    </div>
);

export default KeywordDiscovery;
