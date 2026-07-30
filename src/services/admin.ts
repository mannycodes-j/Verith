import { apiClient } from "./apiClient";

export interface AdminAnalyticsOverview {
  period: { days: number; since: string };
  users: { total: number; active: number };
  verifications: {
    volume: number;
    completed: number;
    failed: number;
    completionRate: number;
    failureRate: number;
    byStatus: Array<{
      status: string;
      count: number;
      averageDurationMs: number | null;
    }>;
  };
  providers: Array<{
    provider: string;
    executions: number;
    successRate: number;
    averageLatencyMs: number | null;
    inputTokens: number;
    outputTokens: number;
    cost: { state: "UNAVAILABLE"; reason: string };
  }>;
  whatsapp: { messages: number };
}

export type AdminUserRole =
  | "USER"
  | "MODERATOR"
  | "CONTENT_EDITOR"
  | "ADMIN"
  | "SUPER_ADMIN";

export type AdminUserStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "DISABLED"
  | "DELETION_PENDING"
  | "DELETED";

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  role: AdminUserRole;
  status: AdminUserStatus;
  emailVerifiedAt: string | null;
  lastActiveAt: string | null;
  createdAt: string;
  activeSessions?: number;
}

export interface AdminVerification {
  id: string;
  userId: string;
  sourceType: string;
  status: string;
  currentStage: string;
  progress: number;
  claimsCount: number;
  evidenceCount: number;
  failureCode: string | null;
  retryCount: number;
  createdAt: string;
  processingCompletedAt: string | null;
}

export interface CursorPage<T> {
  items: T[];
  pagination: {
    nextCursor: string | null;
    previousCursor: null;
    hasNextPage: boolean;
    limit: number;
  };
}

export interface AdminRecord {
  _id: string;
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  domain?: string;
  status?: string;
  reviewStatus?: string;
  credibilityLevel?: string;
  version?: number;
  key?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface ProviderConfiguration {
  enabledProviders: string[];
  defaultOrder: string[];
  configured: boolean;
  updatedAt: string | null;
}

export interface AdminAuditRecord {
  id: string;
  actorId: string;
  actorRole: AdminUserRole;
  action: string;
  resourceType: string;
  resourceId: string;
  requestId: string;
  safeBefore: Record<string, unknown> | null;
  safeAfter: Record<string, unknown> | null;
  reason: string;
  createdAt: string;
}

export interface ProviderHealth {
  provider: string;
  state: string;
  checkedAt: string;
  latencyMs: number;
  safeCode?: string;
}

export interface DependencyHealth {
  status: "ok" | "error" | "shutting_down";
  info?: Record<string, { status: string; [key: string]: unknown }>;
  error?: Record<string, { status: string; [key: string]: unknown }>;
  details?: Record<string, { status: string; [key: string]: unknown }>;
}

export const adminService = {
  overview: () =>
    apiClient.get<AdminAnalyticsOverview>("/admin/analytics/overview"),
  users: ({
    cursor,
    limit = 20,
    role,
    search,
    status,
  }: {
    cursor?: string;
    limit?: number;
    role?: AdminUserRole;
    search?: string;
    status?: AdminUserStatus;
  } = {}) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    if (role) query.set("role", role);
    if (search) query.set("search", search);
    if (status) query.set("status", status);
    return apiClient.get<CursorPage<AdminUser>>(`/admin/users?${query}`);
  },
  user: (id: string) => apiClient.get<AdminUser>(`/admin/users/${id}`),
  changeUserStatus: (
    id: string,
    status: "ACTIVE" | "SUSPENDED" | "DISABLED",
    reason: string,
  ) =>
    apiClient.patch<AdminUser>(`/admin/users/${id}/status`, {
      reason,
      status,
    }),
  changeUserRole: (id: string, role: AdminUserRole, reason: string) =>
    apiClient.patch<AdminUser>(`/admin/users/${id}/role`, { reason, role }),
  verifications: ({
    cursor,
    limit = 20,
    status,
    userId,
  }: {
    cursor?: string;
    limit?: number;
    status?: string;
    userId?: string;
  } = {}) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    if (status) query.set("status", status);
    if (userId) query.set("userId", userId);
    return apiClient.get<CursorPage<AdminVerification>>(
      `/admin/verifications?${query}`,
    );
  },
  verification: (id: string) =>
    apiClient.get<AdminVerification>(`/admin/verifications/${id}`),
  retryVerification: (id: string, reason: string) =>
    apiClient.post<AdminVerification>(`/admin/verifications/${id}/retry`, {
      reason,
    }),
  auditLogs: ({
    action,
    cursor,
    limit = 20,
    resourceType,
  }: {
    action?: string;
    cursor?: string;
    limit?: number;
    resourceType?: string;
  } = {}) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (action) query.set("action", action);
    if (cursor) query.set("cursor", cursor);
    if (resourceType) query.set("resourceType", resourceType);
    return apiClient.get<CursorPage<AdminAuditRecord>>(
      `/admin/audit-logs?${query}`,
    );
  },
  dependencyHealth: () => apiClient.get<DependencyHealth>("/health/ready"),
  aiHealth: () =>
    apiClient.get<ProviderHealth[]>("/integrations/ai/health"),
  searchHealth: () =>
    apiClient.get<ProviderHealth[]>("/integrations/search/health"),
  publishers: (cursor?: string) =>
    apiClient.get<CursorPage<AdminRecord>>(
      `/admin/publishers?limit=20${cursor ? `&cursor=${cursor}` : ""}`,
    ),
  publisher: (id: string) =>
    apiClient.get<AdminRecord>(`/admin/publishers/${id}`),
  overridePublisher: (
    id: string,
    body: {
      reason: string;
      reviewStatus: string;
      credibilityLevel: string;
    },
  ) => apiClient.patch<AdminRecord>(`/admin/publishers/${id}/override`, body),
  feedback: (cursor?: string) =>
    apiClient.get<CursorPage<AdminRecord>>(
      `/admin/feedback?limit=20${cursor ? `&cursor=${cursor}` : ""}`,
    ),
  feedbackRecord: (id: string) =>
    apiClient.get<AdminRecord>(`/admin/feedback/${id}`),
  resolveFeedback: (
    id: string,
    body: { status: string; resolution: string; reason: string },
  ) => apiClient.patch<AdminRecord>(`/admin/feedback/${id}`, body),
  contentRecords: (
    resource: "courses" | "lessons" | "quizzes" | "challenges",
    cursor?: string,
  ) => {
    const base =
      resource === "courses" || resource === "lessons"
        ? `/admin/learning/${resource}`
        : `/admin/${resource}`;
    return apiClient.get<CursorPage<AdminRecord>>(
      `${base}?limit=20${cursor ? `&cursor=${cursor}` : ""}`,
    );
  },
  contentRecord: (
    resource: "courses" | "lessons" | "quizzes" | "challenges",
    id: string,
  ) => {
    const base =
      resource === "courses" || resource === "lessons"
        ? `/admin/learning/${resource}`
        : `/admin/${resource}`;
    return apiClient.get<AdminRecord>(`${base}/${id}`);
  },
  updateContentStatus: (
    resource: "courses" | "lessons" | "quizzes" | "challenges",
    id: string,
    status: string,
  ) => {
    const base =
      resource === "courses" || resource === "lessons"
        ? `/admin/learning/${resource}`
        : `/admin/${resource}`;
    return apiClient.patch<AdminRecord>(`${base}/${id}/status`, { status });
  },
  archiveContent: (
    resource: "courses" | "lessons" | "quizzes" | "challenges",
    id: string,
    reason: string,
  ) => {
    const base =
      resource === "courses" || resource === "lessons"
        ? `/admin/learning/${resource}`
        : `/admin/${resource}`;
    return apiClient.delete<AdminRecord>(`${base}/${id}`, { reason });
  },
  prompts: (cursor?: string) =>
    apiClient.get<CursorPage<AdminRecord>>(
      `/admin/ai/prompts?limit=20${cursor ? `&cursor=${cursor}` : ""}`,
    ),
  prompt: (id: string) =>
    apiClient.get<AdminRecord>(`/admin/ai/prompts/${id}`),
  promptAction: (id: string, action: "publish" | "rollback", reason: string) =>
    apiClient.patch<AdminRecord>(`/admin/ai/prompts/${id}/${action}`, {
      reason,
    }),
  providerConfiguration: () =>
    apiClient.get<ProviderConfiguration>("/admin/ai/providers"),
  updateProviderConfiguration: (
    enabledProviders: string[],
    defaultOrder: string[],
    reason: string,
  ) =>
    apiClient.patch<ProviderConfiguration>("/admin/ai/providers", {
      defaultOrder,
      enabledProviders,
      reason,
    }),
  badges: () => apiClient.get<AdminRecord[]>("/admin/gamification/badges"),
  badge: (id: string) =>
    apiClient.get<AdminRecord>(`/admin/gamification/badges/${id}`),
  archiveBadge: (id: string, reason: string) =>
    apiClient.delete<AdminRecord>(`/admin/gamification/badges/${id}`, {
      reason,
    }),
};
