import { apiClient, sessionToken } from "./apiClient";
import type { AuthenticatedUser } from "./authService";

export interface UserProfile extends AuthenticatedUser {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  role?: string;
  status?: string;
  notificationPreferences: Record<string, boolean>;
  privacyPreferences: {
    publicProfile?: boolean;
    leaderboard?: boolean;
  };
  preferredLanguage?: string;
  timezone?: string;
  deletionRequestedAt?: string;
}

export interface AccountSession {
  id: string;
  deviceName?: string;
  platform?: string;
  browser?: string;
  userAgentSummary?: string;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

export interface PrivacyExportRequest {
  id: string;
  status: string;
  downloadToken: string;
  message: string;
}

export interface PrivacyExportStatus {
  id: string;
  type: string;
  status: string;
  bytes: number | null;
  contentHash: string | null;
  expiresAt: string | null;
  failureCode: string | null;
  createdAt: string;
  completedAt: string | null;
}

export const accountService = {
  cancelDeletion: () => apiClient.deleteVoid("/users/me/deletion-request"),
  async changePassword(input: {
    currentPassword: string;
    newPassword: string;
  }) {
    await apiClient.postVoid("/auth/change-password", input);
    sessionToken.clear();
  },
  currentSession: () =>
    apiClient.get<{ userId: string; sessionId: string; role: string }>(
      "/auth/me",
    ),
  downloadExport: (id: string, token: string) =>
    apiClient.download(`/privacy/exports/${id}/download`, {
      "x-data-export-token": token,
    }),
  exportStatus: (id: string) =>
    apiClient.get<PrivacyExportStatus>(`/privacy/exports/${id}`),
  profile: () => apiClient.get<UserProfile>("/users/me"),
  requestDeletion: () =>
    apiClient.postVoid("/users/me/deletion-request"),
  requestExport: () =>
    apiClient.post<PrivacyExportRequest>("/privacy/exports"),
  revokeSession: (id: string) =>
    apiClient.deleteVoid(`/auth/sessions/${id}`),
  sessions: () => apiClient.get<AccountSession[]>("/auth/sessions"),
  async signOutEverywhere() {
    try {
      await apiClient.postVoid("/auth/logout-all");
    } finally {
      sessionToken.clear();
    }
  },
  updateNotifications: (preferences: Record<string, boolean>) =>
    apiClient.patch<UserProfile>("/users/me/notifications", { preferences }),
  updatePrivacy: (input: { publicProfile: boolean; leaderboard: boolean }) =>
    apiClient.patch<UserProfile>("/users/me/privacy", input),
  updateProfile: (input: {
    displayName?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    preferredLanguage?: string;
    timezone?: string;
  }) => apiClient.patch<UserProfile>("/users/me", input),
};
