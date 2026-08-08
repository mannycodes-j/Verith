import type { components } from "@/generated/api-schema";
import { apiClient } from "./apiClient";

export type CreateVerificationInput =
  components["schemas"]["CreateVerificationDto"];

export type VerificationStatus =
  | "DRAFT"
  | "QUEUED"
  | "PROCESSING"
  | "PARTIALLY_COMPLETED"
  | "COMPLETED"
  | "FAILED"
  | "CANCEL_REQUESTED"
  | "CANCELLED"
  | "DELETED";

export interface VerificationRecord {
  id: string;
  mode: "STANDARD" | "GUIDED";
  sourceType: CreateVerificationInput["sourceType"];
  status: VerificationStatus;
  currentStage: string;
  progress: number;
  visibility: CreateVerificationInput["visibility"];
  title?: string;
  question?: string;
  requestedLanguage?: string;
  detectedLanguage?: string;
  urlMetadata?: {
    extractionState?: string;
    canonicalUrl?: string;
    sourceKind?: string;
    failureCode?: string;
    retryRecommended?: boolean;
    alternativeSubmission?: "PASTE_TEXT_OR_UPLOAD_SCREENSHOT";
    supportReference?: string;
    socialPostId?: string;
    [key: string]: unknown;
  };
  claimsCount: number;
  evidenceCount: number;
  retryCount: number;
  failureCode?: string;
  failureSummary?: string;
  createdAt: string;
  updatedAt: string;
  streamUrl: string;
}

export interface GuidedQuestion {
  id: string;
  version: number;
  type: "SINGLE_SELECT" | "MULTIPLE_SELECT" | "SHORT_TEXT" | "PROVISIONAL_VERDICT";
  prompt: string;
  options: Array<{ id: string; label: string }>;
  competency: string;
  objectivelyScorable: boolean;
}

export interface GuidedInvestigation {
  id: string;
  verificationId: string;
  questionSetVersion: number;
  status: "READY" | "SUBMITTED" | "FEEDBACK_READY";
  questions: GuidedQuestion[];
  responses: Array<{
    questionId: string;
    selectedOptionIds: string[];
    text?: string;
    competency: string;
    score?: number;
    submittedAt: string;
  }>;
  feedback: Array<{
    questionId: string;
    heading: string;
    message: string;
    competency: string;
  }>;
  submittedAt?: string;
  feedbackGeneratedAt?: string;
}

export interface InvestigationAllowance {
  dateKey: string;
  timezone: string;
  limit: number;
  used: number;
  reserved: number;
  released: number;
  remaining: number;
  resetAt: string;
  costs: {
    text: number;
    link: number;
    image: number;
    screenshot: number;
    audio: number;
    video: number;
  };
  paymentsAvailable: boolean;
  entitlement: {
    plan: "FREE" | "PLUS" | "COMMUNITY" | "ADMINISTRATIVE_SPONSORSHIP";
    source: "DEFAULT" | "ADMIN_GRANT";
    expiresAt: string | null;
  };
}

export interface VerificationPage {
  items: VerificationRecord[];
  pagination: {
    nextCursor: string | null;
    previousCursor: string | null;
    hasNextPage: boolean;
    limit: number;
  };
}

export interface VerificationEvent {
  id: string;
  verificationId: string;
  sequence: number;
  stage: string;
  status: string;
  progress: number;
  messageCode?: string;
  safeMessage?: string;
  metrics?: Record<string, number>;
  occurredAt: string;
}

export const verificationService = {
  allowance(): Promise<InvestigationAllowance> {
    return apiClient.get<InvestigationAllowance>("/verifications/allowance");
  },

  cancel(id: string): Promise<VerificationRecord> {
    return apiClient.post<VerificationRecord>(`/verifications/${id}/cancel`);
  },

  create(
    input: CreateVerificationInput,
    idempotencyKey: string,
  ): Promise<VerificationRecord> {
    return apiClient.post<VerificationRecord>("/verifications", input, {
      headers: { "Idempotency-Key": idempotencyKey },
    });
  },

  get(id: string): Promise<VerificationRecord> {
    return apiClient.get<VerificationRecord>(`/verifications/${id}`);
  },

  guidance(id: string): Promise<GuidedInvestigation> {
    return apiClient.get<GuidedInvestigation>(`/verifications/${id}/guidance`);
  },

  submitGuidance(
    id: string,
    responses: Array<{ questionId: string; selectedOptionIds?: string[]; text?: string }>,
  ): Promise<GuidedInvestigation> {
    return apiClient.post<GuidedInvestigation>(
      `/verifications/${id}/guidance/responses`,
      { responses },
    );
  },

  list({
    cursor,
    limit = 20,
    status,
  }: {
    cursor?: string;
    limit?: number;
    status?: VerificationStatus;
  } = {}): Promise<VerificationPage> {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    if (status) query.set("status", status);
    return apiClient.get<VerificationPage>(`/verifications?${query}`);
  },

  listEvents(id: string, after = 0): Promise<VerificationEvent[]> {
    return apiClient.get<VerificationEvent[]>(
      `/verifications/${id}/events?after=${after}`,
    );
  },

  remove(id: string): Promise<void> {
    return apiClient.deleteVoid(`/verifications/${id}`);
  },

  async streamEvents({
    after = 0,
    id,
    onEvent,
    onOpen,
    signal,
  }: {
    after?: number;
    id: string;
    onEvent: (event: VerificationEvent) => void;
    onOpen?: () => void;
    signal: AbortSignal;
  }): Promise<void> {
    const response = await apiClient.stream(
      `/verifications/${id}/stream?after=${after}`,
      signal,
    );
    onOpen?.();
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replaceAll("\r\n", "\n");

      let boundary = buffer.indexOf("\n\n");
      while (boundary >= 0) {
        const block = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        boundary = buffer.indexOf("\n\n");

        let eventType = "message";
        const dataLines: string[] = [];
        for (const line of block.split("\n")) {
          if (line.startsWith("event:")) {
            eventType = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            dataLines.push(line.slice(5).trimStart());
          }
        }
        if (eventType !== "verification.event" || dataLines.length === 0) {
          continue;
        }

        const parsed: unknown = JSON.parse(dataLines.join("\n"));
        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "sequence" in parsed &&
          typeof parsed.sequence === "number" &&
          "stage" in parsed &&
          typeof parsed.stage === "string"
        ) {
          onEvent(parsed as VerificationEvent);
        }
      }
    }
  },

  retry(id: string): Promise<VerificationRecord> {
    return apiClient.post<VerificationRecord>(`/verifications/${id}/retry`);
  },

  reprocess(id: string): Promise<VerificationRecord> {
    return apiClient.post<VerificationRecord>(
      `/verifications/${id}/reprocess`,
    );
  },
};
