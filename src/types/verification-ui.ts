export type InvestigationSourceType = "TEXT" | "URL" | "IMAGE" | "SCREENSHOT" | "AUDIO" | "VIDEO";

export interface InvestigationSourceOption {
  label: string;
  value: InvestigationSourceType;
}
