import { apiClient } from "./apiClient";

export interface ReportClaim {
  claimId: string;
  text: string;
  importance: string;
  verifiability: string;
  verdict: string;
  confidence: number;
  explanation: string;
  supportingEvidenceIds: string[];
  contradictingEvidenceIds: string[];
  contextEvidenceIds: string[];
  uncertainties: string[];
  limitations: string[];
}

export interface ReportEvidence {
  evidenceId: string;
  claimId: string;
  title: string;
  sourceUrl: string;
  publisher?: string;
  publishedAt?: string;
  relevantExcerpt?: string;
  relationship: string;
  accessStatus: string;
  lineageType: string;
}

export interface ManipulationFinding {
  category: string;
  severity: string;
  phrase: string;
  startOffset: number;
  endOffset: number;
  explanation: string;
  confidence: number;
  limitations: string[];
}

export interface BiasMetric {
  metric: string;
  score: number;
  label: string;
  explanation: string;
  textEvidence: string[];
  confidence: number;
  limitations: string[];
}

export interface MissingContextIssue {
  type: string;
  severity: string;
  omittedContext: string;
  whyItMatters: string;
  correctedContext: string;
  evidenceIds: string[];
  confidence: number;
  limitations: string[];
}

export interface SourceAssessment {
  domain: string;
  credibilityLevel: string;
  explanation: string;
  evidenceIds: string[];
  limitations: string[];
}

export interface MediaAnalysis {
  status: string;
  fullText?: string;
  mediaKind?: "IMAGE" | "VIDEO" | null;
  spokenText?: string | null;
  onScreenText?: string[];
  blocks?: Array<{
    timestamp?: string;
    description?: string;
    evidenceType?: string;
  }>;
  language?: string;
  confidence?: number | null;
  uncertainRegions?: unknown[];
  visibleDates?: string[];
  visibleUrls?: string[];
  visiblePublisherNames?: string[];
  likelyContentType?: string | null;
  potentialCropping?: boolean | null;
  reverseImageStatus?: string;
  limitations?: string[];
}

export interface AudioAnalysis {
  language?: string;
  duration?: number | null;
  fullText?: string;
  segments?: unknown[];
  averageConfidence?: number | null;
  status: string;
  limitations?: string[];
}

export interface AiIndicators {
  indicator?: string;
  confidence?: number;
  observations?: string[];
  limitations?: string[];
  specializedDetectorUsed?: boolean;
}

export interface VerificationReport {
  id?: string;
  verificationId?: string;
  version: number;
  status: string;
  overallVerdict: string;
  riskLevel: string;
  confidence: number;
  confidenceFactors: Record<string, number | boolean>;
  summary: string;
  claims: ReportClaim[];
  evidence: ReportEvidence[];
  manipulationAnalysis: ManipulationFinding[];
  biasAnalysis: BiasMetric[];
  missingContext: MissingContextIssue[];
  sourceCredibility: SourceAssessment[];
  mediaAnalysis?: MediaAnalysis;
  audioAnalysis?: AudioAnalysis;
  aiIndicators?: AiIndicators;
  recommendedActions: string[];
  learningRecommendations: Array<Record<string, unknown>>;
  limitations: string[];
  methodologyVersions: Record<string, string>;
  providerSummary?: Record<string, unknown>;
  schemaVersion: string;
  generatedAt: string;
  publishedAt?: string;
  visibility?: string;
  publicSlug?: string;
}

export interface ReportVersion {
  id: string;
  version: number;
  status: string;
  overallVerdict: string;
  riskLevel: string;
  confidence: number;
  visibility: string;
  schemaVersion: string;
  generatedAt: string;
  publishedAt: string | null;
}

export interface MilCoachCard {
  taxonomy: string;
  competency: string;
  skillFocus: string;
  whatHappened: string;
  whyItMatters: string;
  nextCheck: string;
  practiceQuestion: string;
  relatedLesson: null | {
    id: string;
    title: string;
    slug: string;
    summary: string;
    estimatedDuration: number;
    course: { title: string; slug: string };
  };
  relatedChallenge: null | {
    id: string;
    title: string;
    slug: string;
    scenario: string;
    difficulty: string;
    expiresAt: string;
  };
  generatedFrom: {
    reportId: string;
    reportVersion: number;
    templateVersion: string;
    adaptedByAi: false;
  };
}

export interface CheckCard {
  reportVersion: number;
  claim: string;
  finding: string;
  summary: string;
  keyEvidence: Array<{
    title: string;
    publisher: string | null;
    relationship: string;
    sourceUrl: string;
  }>;
  missingContext: string | null;
  recommendedCheck: string;
  limitation: string;
  reportDate: string;
  publicReportUrl: string | null;
  shareState: "READY" | "PRIVATE";
  shareMetadata: {
    title: string;
    description: string;
    url: string | null;
  };
}

export type ReportVisibility = "PRIVATE" | "UNLISTED" | "PUBLIC";
export type ReportFeedbackType = "HELPFUL" | "NOT_HELPFUL" | "PROBLEM_REPORTED";
export type ReportProblemCategory =
  | "INCORRECT_VERDICT"
  | "MISSING_CONTEXT"
  | "BROKEN_SOURCE"
  | "UNSAFE_CONTENT"
  | "PRIVACY_CONCERN"
  | "OTHER";

export const reportService = {
  inspectEvidence: (reportId: string, evidenceId: string) =>
    apiClient.post<{ recorded: boolean }>(
      `/reports/${reportId}/evidence/${encodeURIComponent(evidenceId)}/inspect`,
      {},
    ),
  checkCard: (reportId: string) =>
    apiClient.get<CheckCard>(`/reports/${reportId}/check-card`),
  downloadCheckCard: (reportId: string) =>
    apiClient.download(`/reports/${reportId}/check-card.svg`),
  coach: (reportId: string) =>
    apiClient.get<MilCoachCard>(`/reports/${reportId}/coach`),
  get: (reportId: string) =>
    apiClient.get<VerificationReport>(`/reports/${reportId}`),
  remove: (reportId: string) => apiClient.deleteVoid(`/reports/${reportId}`),
  export: (reportId: string, format: "pdf" | "json") =>
    apiClient.download(`/reports/${reportId}/export/${format}`),
  feedback: (
    reportId: string,
    input: {
      type: ReportFeedbackType;
      category?: ReportProblemCategory;
      comment?: string;
    },
  ) => apiClient.post(`/reports/${reportId}/feedback`, input),
  latest: (verificationId: string) =>
    apiClient.get<VerificationReport>(
      `/reports/verification/${verificationId}/latest`,
    ),
  versions: (verificationId: string) =>
    apiClient.get<ReportVersion[]>(
      `/reports/verification/${verificationId}/versions`,
    ),
  public: (slug: string) =>
    apiClient.get<VerificationReport>(`/public/reports/${slug}`, {
      retryAuthentication: false,
    }),
  revoke: (reportId: string) =>
    apiClient.post<VerificationReport>(`/reports/${reportId}/revoke`),
  setVisibility: (reportId: string, visibility: ReportVisibility) =>
    apiClient.patch<VerificationReport>(`/reports/${reportId}/visibility`, {
      visibility,
    }),
};
