"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { notificationsService } from "@/services/notifications";
import { appShellStyles as styles } from "./app-shell.styles";

export default function NotificationTrigger({
  open,
}: {
  open: () => void;
}) {
  const unread = useQuery({
    queryFn: notificationsService.unreadCount,
    queryKey: ["notifications", "unread-count"],
    // The drawer and ledger always fetch current records on demand. A badge
    // does not need a network request every 30 seconds from every active tab.
    refetchInterval: 5 * 60_000,
    refetchOnWindowFocus: true,
    retry: false,
  });
  const count = unread.data?.unreadCount ?? 0;
  const accessibleLabel =
    count > 0
      ? `Open notifications, ${count} unread`
      : "Open notifications";

  return (
    <button
      aria-label={accessibleLabel}
      className={styles.notificationTrigger}
      onClick={open}
      title={accessibleLabel}
      type="button"
    >
      <Bell aria-hidden="true" size={18} strokeWidth={1.8} />
      {count > 0 && (
        <span className={styles.notificationBadge} aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
