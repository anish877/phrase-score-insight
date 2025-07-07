import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Check, Search, Target, Brain, Loader2, AlertCircle, TrendingUp, Filter } from 'lucide-react';
import { apiService, Keyword as ApiKeyword } from '@/services/api';
import { useDebounce } from 'use-debounce';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useToast } from '@/components/ui/use-toast';

interface KeywordDiscoveryProps {
  domainId: number;
  versionId?: number;
  selectedKeywords: string[];
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
  onPrev: () => void;
  isSaving?: boolean;
}

const KeywordDiscovery: React.FC<KeywordDiscoveryProps> = ({ domainId, versionId, selectedKeywords, setSelectedKeywords, onNext, onPrev, isSaving: isSavingProp }) => {
  console.log('KeywordDiscovery rendered with domainId:', domainId);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState('Connecting to keyword engine...');
  const [customKeyword, setCustomKeyword] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [keywords, setKeywords] = useState<ApiKeyword[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const loadingSteps = [
    'Analyzing brand context...',
    'Connecting to keyword intelligence APIs...',
    'Fetching organic keyword metrics...',
    'Running competitive analysis...',
    'Categorizing keywords by user intent...',
    'Finalizing recommendations...'
  ];
  const [debouncedKeywords] = useDebounce(selectedKeywords, 500);
  const { toast } = useToast();

  // Use prop if provided, otherwise local state
  const effectiveIsSaving = typeof isSavingProp === 'boolean' ? isSavingProp : isSaving;

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
    const token = localStorage.getItem('authToken');
    const url = versionId 
      ? `https://phrase-score-insight.onrender.com/api/keywords/stream/${domainId}?versionId=${versionId}&token=${encodeURIComponent(token || '')}`
      : `https://phrase-score-insight.onrender.com/api/keywords/stream/${domainId}?token=${encodeURIComponent(token || '')}`;
    fetchEventSource(url, {
      signal: ctrl.signal,
      onopen(_response) {
        setProgressMsg('Connected. Discovering keywords...');
        return Promise.resolve();
      },
      onmessage(ev) {
        if (ev.event === 'keyword') {
          const kw: ApiKeyword = JSON.parse(ev.data);
          setKeywords(prev => {
            if (prev.some(k => k.term === kw.term)) return prev;
            return [...prev, kw];
          });
          // If this keyword is already selected in the database, add it to selectedKeywords
          if (kw.isSelected) {
            setSelectedKeywords(prev => {
              if (prev.includes(kw.term)) return prev;
              return [...prev, kw.term];
            });
          }
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
          // After all keywords are loaded, ensure selectedKeywords state is in sync
          setKeywords(prevKeywords => {
            const selectedFromKeywords = prevKeywords.filter(k => k.isSelected).map(k => k.term);
            console.log('Setting selected keywords from loaded keywords:', selectedFromKeywords);
            setSelectedKeywords(selectedFromKeywords);
            return prevKeywords;
          });
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
  }, [domainId, versionId, setSelectedKeywords]);

  const sortedKeywords = useMemo(() =>
    [...keywords].sort((a, b) => b.volume - a.volume),
    [keywords]
  );

  const addCustomKeyword = () => {
    const newKeyword = customKeyword.trim().toLowerCase();
    if (newKeyword && !selectedKeywords.includes(newKeyword)) {
      setSelectedKeywords([...selectedKeywords, newKeyword]);
      if (!keywords.some(k => k.term.toLowerCase() === newKeyword)) {
        const newKw: ApiKeyword = {
            id: -1,
            term: newKeyword,
            volume: 0,
            difficulty: 'N/A',
            cpc: 0,
            isSelected: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            category: 'custom',
        };
        setKeywords([...keywords, newKw]);
      }
      setCustomKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    console.log('Removing keyword:', keyword, 'from:', selectedKeywords);
    setSelectedKeywords(selectedKeywords.filter(k => k.toLowerCase() !== keyword.toLowerCase()));
  };

  const toggleKeyword = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    console.log('Toggling keyword:', keyword, 'Current selected:', selectedKeywords);
    if (selectedKeywords.map(k => k.toLowerCase()).includes(lowerKeyword)) {
      console.log('Removing keyword:', keyword);
      removeKeyword(keyword);
    } else {
      console.log('Adding keyword:', keyword);
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
         categoryCount={keywords.length}
         avgDifficulty={getAvgDifficultyLabel(avgDifficultyScore)}
         isSaving={effectiveIsSaving}
       />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input placeholder="Search keywords..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-6">
            {sortedKeywords.filter(k => k.term.toLowerCase().includes(searchFilter.toLowerCase())).length > 0 ? sortedKeywords.filter(k => k.term.toLowerCase().includes(searchFilter.toLowerCase())).map((keyword) => (
              <div
                key={keyword.term}
                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedKeywords.includes(keyword.term) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                onClick={() => toggleKeyword(keyword.term)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedKeywords.includes(keyword.term) ? 'bg-blue-500' : 'bg-slate-200'}`}>{selectedKeywords.includes(keyword.term) && <Check className="w-4 h-4 text-white" />}</div>
                  <span className="font-medium text-slate-800">{keyword.term}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-right">
                  <div className="w-20">
                    <div className="font-semibold text-slate-700">{keyword.volume.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">Volume</div>
                  </div>
                  <Badge className={`w-16 justify-center ${keyword.difficulty === 'Low' ? 'bg-green-100 text-green-800' : keyword.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{keyword.difficulty}</Badge>
                </div>
              </div>
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
            setSelectedKeywords={setSelectedKeywords}
          />
        </div>
      </div>

      <Footer onPrev={onPrev} onNext={onNext} isSaving={effectiveIsSaving} selectedCount={selectedKeywords.length} selectedKeywords={selectedKeywords} domainId={domainId} versionId={versionId} />
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

interface SelectedKeywordsPanelProps {
    selectedKeywords: string[];
    customKeyword: string;
    setCustomKeyword: (value: string) => void;
    addCustomKeyword: () => void;
    removeKeyword: (keyword: string) => void;
    setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}
const SelectedKeywordsPanel: React.FC<SelectedKeywordsPanelProps> = ({ selectedKeywords, customKeyword, setCustomKeyword, addCustomKeyword, removeKeyword, setSelectedKeywords }) => {
    const [bulkKeywords, setBulkKeywords] = useState('');
    const [bulkAddCount, setBulkAddCount] = useState(0);

    const handleBulkAdd = () => {
        const raw = bulkKeywords.split(/\n|,/).map(k => k.trim()).filter(Boolean);
        const unique = Array.from(new Set(raw));
        const newOnes = unique.filter(k => !selectedKeywords.map(sk => sk.toLowerCase()).includes(k.toLowerCase()));
        if (newOnes.length > 0) {
            setSelectedKeywords([...selectedKeywords, ...newOnes]);
            setBulkAddCount(newOnes.length);
            setTimeout(() => setBulkAddCount(0), 3000);
        }
        setBulkKeywords('');
    };

    return (
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
                    {/* Bulk add UI */}
                    <div className="space-y-2">
                        <textarea
                            className="w-full border rounded p-2 text-sm"
                            rows={3}
                            placeholder="Paste keywords here (one per line or comma-separated)"
                            value={bulkKeywords}
                            onChange={e => setBulkKeywords(e.target.value)}
                        />
                        <Button onClick={handleBulkAdd} size="sm" className="w-full">Add Bulk Keywords</Button>
                        {bulkAddCount > 0 && <div className="text-green-600 text-xs mt-1">Added {bulkAddCount} new keywords!</div>}
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
};

interface FooterProps {
    onPrev: () => void;
    onNext: () => void;
    isSaving: boolean;
    selectedCount: number;
    selectedKeywords: string[];
    domainId: number;
    versionId?: number;
}
const Footer: React.FC<FooterProps> = ({ onPrev, onNext, isSaving, selectedCount, selectedKeywords, domainId, versionId }) => {
    const [saving, setSaving] = React.useState(false);
    const { toast } = useToast();
    const handleContinue = async () => {
        setSaving(true);
        try {
            const url = versionId 
              ? `https://phrase-score-insight.onrender.com/api/keywords/${domainId}/selection?versionId=${versionId}`
              : `https://phrase-score-insight.onrender.com/api/keywords/${domainId}/selection`;
            
            const response = await fetch(url, {
              method: 'PATCH',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              },
              body: JSON.stringify({ selectedKeywords })
            });
            
            if (!response.ok) throw new Error('Failed to save keywords');
            
            setSaving(false);
            toast({
                title: "Keywords Saved",
                description: "Selected keywords have been successfully saved.",
            });
            onNext();
        } catch (err) {
            setSaving(false);
            toast({
                title: "Error Saving Keywords",
                description: "Failed to save selected keywords. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (
        <div className="flex gap-4 mt-8">
            <Button variant="outline" onClick={onPrev} className="px-8">Previous Step</Button>
            <Button 
                onClick={handleContinue}
                disabled={selectedCount === 0 || isSaving || saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
            >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving selection...</> : `Continue with ${selectedCount} Keywords`}
            </Button>
        </div>
    );
};

const NoResultsCard = () => (
    <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
        <Search className="h-12 w-12 mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-700">No Keywords Found</h3>
        <p className="text-slate-500">Try adjusting your search or category filters.</p>
    </div>
);

export default KeywordDiscovery;
