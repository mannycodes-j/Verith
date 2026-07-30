"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { notificationsService } from "@/services/notifications";
import { appShellStyles as styles } from "./app-shell.styles";

export default function NotificationDrawer({
  close,
}: {
  close: () => void;
}) {
  const queryClient = useQueryClient();
  const notifications = useQuery({
    queryFn: () => notificationsService.list({ limit: 8 }),
    queryKey: ["notifications", "preview"],
    retry: false,
  });
  const markRead = useMutation({
    mutationFn: notificationsService.markRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <div className={styles.drawerBackdrop} role="presentation">
      <aside
        aria-labelledby="notification-drawer-title"
        aria-modal="true"
        className={styles.notificationDrawer}
        role="dialog"
      >
        <header>
          <div>
            <span>Activity preview</span>
            <h2 id="notification-drawer-title">Notifications</h2>
          </div>
          <button aria-label="Close notifications" onClick={close} type="button">
            ×
          </button>
        </header>
        {notifications.isPending && (
          <p aria-busy="true">Loading persisted notifications…</p>
        )}
        {notifications.isError && (
          <div role="alert">
            <p>{notifications.error.message}</p>
            <button type="button" onClick={() => void notifications.refetch()}>
              Retry
            </button>
          </div>
        )}
        {notifications.data?.data.length === 0 && (
          <p>No persisted notifications are available.</p>
        )}
        {notifications.data && notifications.data.data.length > 0 && (
          <ol>
            {notifications.data.data.map((record) => (
              <li data-read={Boolean(record.readAt)} key={record._id}>
                <span>{record.type.replaceAll("_", " ")}</span>
                <strong>{record.title}</strong>
                <p>{record.message}</p>
                {record.actionUrl?.startsWith("/") && (
                  <Link
                    href={record.actionUrl}
                    onClick={() => {
                      if (!record.readAt) markRead.mutate(record._id);
                      close();
                    }}
                  >
                    Open
                  </Link>
                )}
              </li>
            ))}
          </ol>
        )}
        <footer>
          <Link href="/app/notifications" onClick={close}>
            Open full activity ledger
          </Link>
        </footer>
      </aside>
    </div>
  );
}
