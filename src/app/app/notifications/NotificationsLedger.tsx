"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { notificationsService } from "@/services/notifications";
import type { NotificationPage } from "@/services/notifications";
import { notificationStyles as styles } from "./notifications.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function NotificationsLedger() {
  const queryClient = useQueryClient();
  const notifications = useInfiniteQuery<NotificationPage>({
    getNextPageParam: (page) => page.pagination.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      notificationsService.list({
        cursor: typeof pageParam === "string" ? pageParam : undefined,
        limit: 20,
      }),
    queryKey: ["notifications"],
  });
  const unreadStatus = useQuery({
    queryFn: notificationsService.unreadCount,
    queryKey: ["notifications", "unread-count"],
    refetchOnWindowFocus: true,
    retry: false,
  });
  const read = useMutation({
    mutationFn: notificationsService.markRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const readAll = useMutation({
    mutationFn: notificationsService.markAllRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const remove = useMutation({
    mutationFn: notificationsService.remove,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const records = notifications.data?.pages.flatMap((page) => page.data) ?? [];
  const unread =
    unreadStatus.data?.unreadCount ??
    records.filter((record) => !record.readAt).length;
  const mutationError = read.error ?? readAll.error ?? remove.error;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Your Verith activity</span>
        <h1>Stay connected to every investigation that matters.</h1>
        <div>
          <p>
            Follow investigation milestones, evidence updates, learning
            progress, and security events from one focused activity stream.
          </p>
          <button
            disabled={readAll.isPending || unread === 0}
            onClick={() => readAll.mutate()}
            type="button"
          >
            {readAll.isPending ? "Updating…" : `Mark all read (${unread})`}
          </button>
        </div>
      </header>

      {mutationError && (
        <p className={styles.mutationError} role="alert">
          {mutationError.message}
        </p>
      )}
      {notifications.isPending && (
        <div className={styles.loading} aria-busy="true">
          <span>Loading notifications</span>
          {[0, 1, 2].map((item) => (
            <div key={item} />
          ))}
        </div>
      )}
      {notifications.isError && (
        <section className={styles.error} role="alert">
          <span>Notification service unavailable</span>
          <h2>Your activity ledger could not be loaded.</h2>
          <p>{notifications.error.message}</p>
          <button type="button" onClick={() => void notifications.refetch()}>
            Retry
          </button>
        </section>
      )}
      {!notifications.isPending &&
        !notifications.isError &&
        records.length === 0 && (
          <section className={styles.empty}>
            <span>No notifications</span>
            <h2>Your activity ledger is empty.</h2>
            <p>
              Verith does not generate demonstration notifications. Real
              investigation and account events will appear here.
            </p>
          </section>
        )}
      {records.length > 0 && (
        <ol className={styles.ledger}>
          {records.map((record) => (
            <li data-read={Boolean(record.readAt)} key={record._id}>
              <div className={styles.marker} aria-hidden="true" />
              <div>
                <span>{record.type.replaceAll("_", " ")}</span>
                <h2>{record.title}</h2>
                <p>{record.message}</p>
                <small>
                  {formatDate(record.createdAt)} · Email{" "}
                  {record.emailStatus.replaceAll("_", " ").toLowerCase()}
                </small>
              </div>
              <div className={styles.recordActions}>
                {record.actionUrl?.startsWith("/") && (
                  <Link href={record.actionUrl}>Open</Link>
                )}
                {!record.readAt && (
                  <button
                    disabled={read.isPending}
                    onClick={() => read.mutate(record._id)}
                    type="button"
                  >
                    Mark read
                  </button>
                )}
                <button
                  disabled={remove.isPending}
                  onClick={() => remove.mutate(record._id)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
      {notifications.hasNextPage && (
        <button
          className={styles.loadMore}
          disabled={notifications.isFetchingNextPage}
          onClick={() => void notifications.fetchNextPage()}
          type="button"
        >
          {notifications.isFetchingNextPage
            ? "Loading more…"
            : "Load older notifications"}
        </button>
      )}
    </div>
  );
}
