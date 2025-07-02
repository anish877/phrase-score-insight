export interface OnboardingStepData {
  domain?: string;
  domainId?: number;
  versionId?: number | null;
  brandContext?: string;
  selectedKeywords?: string[];
  generatedPhrases?: Array<{keyword: string, phrases: string[]}>;
  queryResults?: any[];
  queryStats?: any;
}

export interface OnboardingProgress {
  currentStep: number;
  isCompleted: boolean;
  stepData: OnboardingStepData | null;
  lastActivity: string;
}

export interface ResumeCheckResult {
  canResume: boolean;
  reason?: string;
  redirectTo?: string;
  currentStep?: number;
  stepData?: OnboardingStepData;
  lastActivity?: string;
  dataIntegrity?: {
    hasDomainContext: boolean;
    hasKeywords: boolean;
    hasPhrases: boolean;
    hasAIResults: boolean;
  };
}

class OnboardingService {
  private baseUrl = 'https://phrase-score-insight.onrender.com/api/onboarding';

  // Save onboarding progress
  async saveProgress(domainId: number, currentStep: number, stepData: OnboardingStepData, isCompleted = false): Promise<OnboardingProgress> {
    try {
      const response = await fetch(`${this.baseUrl}/progress/${domainId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentStep,
          stepData,
          isCompleted
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to save onboarding progress: ${response.statusText} - ${errorData.error || ''}`);
      }

      const result = await response.json();
      return result.progress;
    } catch (error) {
      console.error('Error saving onboarding progress:', error);
      throw error;
    }
  }

  // Get onboarding progress
  async getProgress(domainId: number): Promise<{ progress: OnboardingProgress; domain: any }> {
    try {
      const response = await fetch(`${this.baseUrl}/progress/${domainId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to get onboarding progress: ${response.statusText} - ${errorData.error || ''}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting onboarding progress:', error);
      throw error;
    }
  }

  // Check if onboarding can be resumed
  async checkResume(domainId: number): Promise<ResumeCheckResult> {
    try {
      const response = await fetch(`${this.baseUrl}/resume/${domainId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to check resume status: ${response.statusText} - ${errorData.error || ''}`);
      }

      const result = await response.json();
      console.log('Resume check result:', result);
      return result;
    } catch (error) {
      console.error('Error checking resume status:', error);
      throw error;
    }
  }

  // Reset onboarding progress
  async resetProgress(domainId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/progress/${domainId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to reset onboarding progress: ${response.statusText} - ${errorData.error || ''}`);
      }
    } catch (error) {
      console.error('Error resetting onboarding progress:', error);
      throw error;
    }
  }

  // Get active onboarding sessions
  async getActiveSessions(): Promise<{ activeSessions: Array<{ domain: any; currentStep: number; lastActivity: string }> }> {
    try {
      const response = await fetch(`${this.baseUrl}/active`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to get active sessions: ${response.statusText} - ${errorData.error || ''}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting active sessions:', error);
      throw error;
    }
  }

  // Auto-save progress with debouncing
  autoSaveProgress(domainId: number, step: number, stepData: OnboardingStepData) {
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }

    this.autoSaveTimeout = setTimeout(() => {
      this.saveProgress(domainId, step, stepData);
    }, 2000); // 2 second debounce
  }

  // Cancel auto-save
  cancelAutoSave() {
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
      this.autoSaveTimeout = null;
    }
  }

  // Validate step data integrity
  validateStepData(stepData: OnboardingStepData, currentStep: number): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    if (currentStep >= 1 && !stepData.domain) {
      issues.push('Domain is required for step 1+');
    }

    if (currentStep >= 1 && !stepData.domainId) {
      issues.push('Domain ID is required for step 1+');
    }

    if (currentStep >= 2 && !stepData.brandContext) {
      issues.push('Brand context is required for step 2+');
    }

    if (currentStep >= 3 && (!stepData.selectedKeywords || stepData.selectedKeywords.length === 0)) {
      issues.push('Selected keywords are required for step 3+');
    }

    if (currentStep >= 4 && (!stepData.generatedPhrases || stepData.generatedPhrases.length === 0)) {
      issues.push('Generated phrases are required for step 4+');
    }

    if (currentStep >= 5 && (!stepData.queryResults || stepData.queryResults.length === 0)) {
      issues.push('Query results are required for step 5+');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  // Create recovery data for interrupted sessions
  createRecoveryData(stepData: OnboardingStepData, currentStep: number): OnboardingStepData {
    const recoveryData: OnboardingStepData = {};

    // Always include domain info
    if (stepData.domain) recoveryData.domain = stepData.domain;
    if (stepData.domainId) recoveryData.domainId = stepData.domainId;

    // Include data based on current step
    if (currentStep >= 1 && stepData.brandContext) {
      recoveryData.brandContext = stepData.brandContext;
    }

    if (currentStep >= 2 && stepData.selectedKeywords) {
      recoveryData.selectedKeywords = stepData.selectedKeywords;
    }

    if (currentStep >= 3 && stepData.generatedPhrases) {
      recoveryData.generatedPhrases = stepData.generatedPhrases;
    }

    if (currentStep >= 4 && stepData.queryResults) {
      recoveryData.queryResults = stepData.queryResults;
    }

    if (currentStep >= 4 && stepData.queryStats) {
      recoveryData.queryStats = stepData.queryStats;
    }

    return recoveryData;
  }

  // Enhanced error handling for network issues
  private async retryRequest<T>(requestFn: () => Promise<T>, maxRetries = 3): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        console.warn(`Request attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw lastError!;
  }
}

export const onboardingService = new OnboardingService(); 