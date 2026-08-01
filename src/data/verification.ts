export const VERIFICATION_STAGE_GROUPS = [
  { label: "Receive", stages: ["RECEIVED", "INPUT_VALIDATION", "MEDIA_UPLOAD_CONFIRMATION"] },
  { label: "Prepare", stages: ["CONTENT_EXTRACTION", "LANGUAGE_DETECTION", "TRANSCRIPTION", "OCR", "URL_EXTRACTION"] },
  { label: "Find claims", stages: ["CLAIM_EXTRACTION", "SEARCH_QUERY_GENERATION"] },
  { label: "Find sources", stages: ["EVIDENCE_SEARCH", "EVIDENCE_RETRIEVAL", "EVIDENCE_NORMALIZATION"] },
  { label: "Compare", stages: ["CLAIM_EVALUATION"] },
  { label: "Check context", stages: ["MANIPULATION_ANALYSIS", "BIAS_ANALYSIS", "MISSING_CONTEXT_ANALYSIS"] },
  { label: "Review sources", stages: ["SOURCE_CREDIBILITY_ANALYSIS", "MEDIA_INVESTIGATION", "AI_INDICATOR_ANALYSIS"] },
  { label: "Build report", stages: ["REPORT_SYNTHESIS", "REPORT_VALIDATION", "RECOMMENDATION_GENERATION", "LEARNING_RECOMMENDATION", "COMPLETED"] },
] as const;

export const TERMINAL_VERIFICATION_STATUSES: string[] = ["COMPLETED", "PARTIALLY_COMPLETED", "FAILED", "CANCELLED", "DELETED"];
import type { VerificationStatus } from "@/services/verification";
import type { InvestigationSourceOption } from "@/types/verification-ui";

export const INVESTIGATION_SOURCE_OPTIONS: readonly InvestigationSourceOption[] = [
  { label: "Text", value: "TEXT" },
  { label: "Link", value: "URL" },
  { label: "Image", value: "IMAGE" },
  { label: "Screenshot", value: "SCREENSHOT" },
  { label: "Voice", value: "AUDIO" },
  { label: "Video", value: "VIDEO" },
];

export const VERIFICATION_STATUS_OPTIONS: Array<{ label: string; value: VerificationStatus | "" }> = [
  { label: "All states", value: "" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Partial", value: "PARTIALLY_COMPLETED" },
  { label: "Failed", value: "FAILED" },
  { label: "Cancelled", value: "CANCELLED" },
];
