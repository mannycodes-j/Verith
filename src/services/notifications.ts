import type { components } from "@/generated/api-schema";
import { apiClient } from "./apiClient";

export interface NotificationRecord {
  _id: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  metadata: Record<string, unknown>;
  readAt?: string;
  emailStatus: string;
  emailAttempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPage {
  data: NotificationRecord[];
  pagination: {
    nextCursor: string | null;
    previousCursor: string | null;
    hasNextPage: boolean;
    limit: number;
  };
}

export type NotificationUnreadCount =
  components["schemas"]["NotificationUnreadCountDto"];

export const notificationsService = {
  list: ({ cursor, limit = 20 }: { cursor?: string; limit?: number } = {}) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    return apiClient.get<NotificationPage>(`/notifications?${query}`);
  },
  unreadCount: () =>
    apiClient.get<NotificationUnreadCount>("/notifications/unread-count"),
  markAllRead: () =>
    apiClient.patch<{ updatedCount: number }>("/notifications/read-all"),
  markRead: (id: string) =>
    apiClient.patch<NotificationRecord>(`/notifications/${id}/read`),
  remove: (id: string) => apiClient.deleteVoid(`/notifications/${id}`),
};
