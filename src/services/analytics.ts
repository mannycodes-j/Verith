import { apiClient } from "./apiClient";

export type ProductAnalyticsEvent =
  | "EVIDENCE_SOURCE_OPENED"
  | "SIMPLE_MODE_USED"
  | "LEARN_MODE_USED"
  | "MIL_COACH_OPENED"
  | "AUDIO_SUMMARY_USED"
  | "ACCESSIBILITY_FEATURE_USED"
  | "BADGE_CELEBRATION_VIEWED"
  | "RANK_CELEBRATION_VIEWED";

export const analyticsService = {
  record: (
    event: ProductAnalyticsEvent,
    context: {
      verificationId?: string;
      reportId?: string;
      missionId?: string;
      sourceType?: string;
      mode?: string;
      feature?: string;
    } = {},
  ) => apiClient.post<void>("/analytics/events", { event, ...context }),
};
