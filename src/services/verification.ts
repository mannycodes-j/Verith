import { apiClient, ApiClientError } from './apiClient';

export interface VerificationReport {
  id: string;
  credibilityScore: number;
  claims: string[];
  biasDetected: string[];
  emotionalManipulation: string[];
  missingContext: string[];
  aiGeneratedIndicators: string[];
  sources: { title: string; url: string; credibility: 'high' | 'medium' | 'low' }[];
  summary: string;
}

export interface VerificationRequest {
  type: 'text' | 'url' | 'image' | 'audio';
  content: string | File;
}

export const verificationService = {
  submitForVerification: async (req: VerificationRequest): Promise<VerificationReport | null> => {
    try {
      if (req.content instanceof File) {
        const formData = new FormData();
        formData.append('file', req.content);
        formData.append('type', req.type);
        return await apiClient.post<VerificationReport>('/verify/media', formData);
      }
      return await apiClient.post<VerificationReport>('/verify/text', { type: req.type, content: req.content });
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) {
        // Return null to allow the UI to handle the empty/unavailable state gracefully
        return null;
      }
      throw error;
    }
  },

  getRecentVerifications: async (): Promise<VerificationReport[] | null> => {
    try {
      return await apiClient.get<VerificationReport[]>('/verify/recent');
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) {
        return null; // Handle unavailable gracefully
      }
      throw error;
    }
  }
};
