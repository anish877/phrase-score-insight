const API_BASE_URL = 'http://localhost:3002/api';

export interface DomainResponse {
  domain: {
    id: number;
    url: string;
    context: string | null;
    createdAt: string;
    updatedAt: string;
  };
  extraction: {
    pagesScanned: number;
    contentBlocks: number;
    keyEntities: number;
    confidenceScore: number;
    extractedContext: string;
  } | null;
}

export interface Keyword {
  id: number;
  term: string;
  volume: number;
  difficulty: string;
  cpc: number;
  category: string;
  isSelected: boolean;
  createdAt: string;
  updatedAt: string;
}

export const apiService = {
  async submitDomain(url: string): Promise<DomainResponse> {
    const response = await fetch(`${API_BASE_URL}/domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || error.error || 'Failed to submit domain');
    }

    return response.json();
  },

  async getDomain(id: number): Promise<DomainResponse> {
    const response = await fetch(`${API_BASE_URL}/domain/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || error.error || 'Failed to fetch domain');
    }

    return response.json();
  },

  async submitDomainForStreaming(url: string): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}/domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || error.error || 'Failed to submit domain');
    }

    return response;
  },

  async getKeywords(domainId: number): Promise<{ keywords: Keyword[], selected: string[] }> {
    const response = await fetch(`${API_BASE_URL}/keywords/${domainId}`);
    console.log('getKeywords response:', response);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || error.error || 'Failed to fetch keywords');
    }

    const data = await response.json();
    console.log('getKeywords data:', data);
    return data;
  },

  async updateKeywordSelection(domainId: number, selectedKeywords: string[]): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/keywords/${domainId}/selection`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedKeywords }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || error.error || 'Failed to update keyword selection');
    }
  },

  async getGeneratedPhrases(domainId: number): Promise<{ generatedPhrases: Array<{keyword: string, phrases: string[]}> }> {
    const response = await fetch(`${API_BASE_URL}/phrases/${domainId}`);
    if (!response.ok) throw new Error('Failed to fetch generated phrases');
    return response.json();
  },
};