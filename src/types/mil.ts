export type CompetencyLevel = "BEGINNING" | "DEVELOPING" | "PROFICIENT" | "ADVANCED";

export interface CompetencyProfileEntry {
  competency: string;
  level: CompetencyLevel;
  evidenceCount: number;
  scoredEvidenceCount: number;
  averageScore?: number;
  notEnoughEvidence: boolean;
  lastEvaluatedAt: string;
  scoreHistory: Array<{
    score: number;
    sourceType: string;
    sourceActivityId: string;
    occurredAt: string;
  }>;
}

export interface MilGrowthProfile {
  id: string;
  scoringRuleVersion: string;
  lastEvaluatedAt?: string;
  evidenceBasedCompetencies: number;
  competencies: CompetencyProfileEntry[];
  recommendedNextActivity: {
    competency: string;
    title: string;
    description: string;
    href: string;
  };
}

