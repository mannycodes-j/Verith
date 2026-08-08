export const COMPETENCY_DESCRIPTIONS: Record<string, { label: string; description: string }> = {
  CLAIM_IDENTIFICATION: { label: "Claim identification", description: "Separate checkable statements from opinion and persuasion." },
  SOURCE_IDENTIFICATION: { label: "Source identification", description: "Find who originally published or recorded the material." },
  SOURCE_INDEPENDENCE: { label: "Source independence", description: "Tell independent confirmation from repeated reporting." },
  DATE_AND_RECENCY: { label: "Date and recency", description: "Check whether old information is being presented as current." },
  EVIDENCE_EVALUATION: { label: "Evidence evaluation", description: "Match conclusions and confidence to the available evidence." },
  CONTEXT_RECOGNITION: { label: "Context recognition", description: "Notice missing dates, places, baselines, captions, and conditions." },
  MANIPULATION_RECOGNITION: { label: "Manipulation recognition", description: "Recognize language designed to rush or emotionally pressure you." },
  VISUAL_VERIFICATION: { label: "Visual verification", description: "Inspect screenshots and images without assuming their context." },
  AUDIO_VIDEO_CAUTION: { label: "Audio and video caution", description: "Separate what a clip contains from claims about its origin." },
  RESPONSIBLE_SHARING: { label: "Responsible sharing", description: "Pause, check, and consider possible harm before forwarding." },
  AI_CONTENT_CAUTION: { label: "AI content caution", description: "Treat AI-generation indicators as probabilistic clues, not proof." },
};

export const COMPETENCY_LEVEL_PROGRESS = {
  BEGINNING: 25,
  DEVELOPING: 50,
  PROFICIENT: 75,
  ADVANCED: 100,
} as const;

