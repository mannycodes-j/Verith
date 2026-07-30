"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  accountService,
  type PrivacyExportRequest,
} from "@/services/account";
import { settingsStyles as styles } from "../settings.styles";

function formatDate(value?: string | null) {
  if (!value) return "Unavailable";
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function PrivacySettings() {
  const queryClient = useQueryClient();
  const [exportRequest, setExportRequest] = useState<PrivacyExportRequest>();
  const [deletionDialog, setDeletionDialog] = useState(false);
  const profile = useQuery({
    queryFn: accountService.profile,
    queryKey: ["profile"],
  });
  const privacy = useMutation({
    mutationFn: accountService.updatePrivacy,
    onSuccess: (next) => queryClient.setQueryData(["profile"], next),
  });
  const requestExport = useMutation({
    mutationFn: accountService.requestExport,
    onSuccess: setExportRequest,
  });
  const exportStatus = useQuery({
    enabled: Boolean(exportRequest),
    queryFn: () => accountService.exportStatus(exportRequest!.id),
    queryKey: ["privacy-export", exportRequest?.id],
    refetchInterval: (query) =>
      ["QUEUED", "PROCESSING"].includes(query.state.data?.status ?? "")
        ? 3000
        : false,
  });
  const download = useMutation({
    mutationFn: async () => {
      if (!exportRequest) throw new Error("The one-time export token is absent.");
      return accountService.downloadExport(
        exportRequest.id,
        exportRequest.downloadToken,
      );
    },
    onSuccess: ({ blob, filename }) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename ?? "verith-account-data.json";
      anchor.click();
      URL.revokeObjectURL(url);
    },
  });
  const requestDeletion = useMutation({
    mutationFn: accountService.requestDeletion,
    onSuccess: async () => {
      setDeletionDialog(false);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  const cancelDeletion = useMutation({
    mutationFn: accountService.cancelDeletion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  if (profile.isPending) {
    return (
      <div className={styles.loading} aria-busy="true">
        <span>Loading privacy settings</span>
        <h1>Opening your data controls…</h1>
      </div>
    );
  }
  if (profile.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Privacy settings unavailable</span>
        <h1>Your data controls could not be opened.</h1>
        <p>{profile.error.message}</p>
        <button type="button" onClick={() => void profile.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = profile.data;
  const submitPrivacy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    privacy.mutate({
      leaderboard: data.has("leaderboard"),
      publicProfile: data.has("publicProfile"),
    });
  };
  const exportError =
    requestExport.error ?? exportStatus.error ?? download.error;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Account: Privacy</span>
        <h1>Privacy and data.</h1>
        <p>
          Control public visibility, prepare an encrypted account export, or
          begin the backend’s deletion-grace process.
        </p>
      </header>
      <nav className={styles.settingsNav} aria-label="Settings sections">
        <Link href="/app/settings">Profile</Link>
        <span>Privacy and data</span>
        <Link href="/app/settings/security">Password and sessions</Link>
        <Link href="/app/settings/whatsapp">WhatsApp</Link>
      </nav>

      <form className={styles.formSection} onSubmit={submitPrivacy}>
        <header>
          <span>Visibility</span>
          <h2>Public participation.</h2>
        </header>
        <div className={styles.preferenceList}>
          <label>
            <span>
              <strong>Public profile</strong>
              <small>Allow the public profile endpoint to return your profile</small>
            </span>
            <input
              defaultChecked={record.privacyPreferences.publicProfile === true}
              name="publicProfile"
              type="checkbox"
            />
          </label>
          <label>
            <span>
              <strong>Leaderboard participation</strong>
              <small>Allow eligible ranking participation</small>
            </span>
            <input
              defaultChecked={record.privacyPreferences.leaderboard !== false}
              name="leaderboard"
              type="checkbox"
            />
          </label>
        </div>
        {(privacy.isError || privacy.isSuccess) && (
          <p
            className={privacy.isError ? styles.formError : styles.formSuccess}
            role="status"
          >
            {privacy.isError
              ? privacy.error.message
              : "Privacy preferences saved."}
          </p>
        )}
        <button disabled={privacy.isPending} type="submit">
          {privacy.isPending ? "Saving privacy…" : "Save privacy"}
        </button>
      </form>

      <section className={styles.privacyPanel}>
        <header>
          <h2>Account export.</h2>
          <p>
            The backend prepares an encrypted JSON export asynchronously. Its
            one-time download token remains only in this open page and cannot
            be retrieved again.
          </p>
        </header>
        <div className={styles.privacyActions}>
          <button
            disabled={requestExport.isPending || Boolean(exportRequest)}
            onClick={() => requestExport.mutate()}
            type="button"
          >
            {requestExport.isPending
              ? "Requesting export…"
              : exportRequest
                ? "Export requested"
                : "Request account export"}
          </button>
          {exportStatus.data?.status === "COMPLETED" && (
            <button
              disabled={download.isPending}
              onClick={() => download.mutate()}
              type="button"
            >
              {download.isPending ? "Downloading…" : "Download export"}
            </button>
          )}
        </div>
        {exportStatus.data && (
          <dl className={styles.privacyStatus}>
            <div>
              <dt>Status</dt>
              <dd>{exportStatus.data.status}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>
                {exportStatus.data.bytes === null
                  ? "Pending"
                  : `${exportStatus.data.bytes} bytes`}
              </dd>
            </div>
            <div>
              <dt>Expires</dt>
              <dd>{formatDate(exportStatus.data.expiresAt)}</dd>
            </div>
            {exportStatus.data.failureCode && (
              <div>
                <dt>Failure</dt>
                <dd>{exportStatus.data.failureCode}</dd>
              </div>
            )}
          </dl>
        )}
        {exportError && (
          <p className={styles.formError} role="alert">
            {exportError.message}
          </p>
        )}
      </section>

      <section className={styles.privacyPanel}>
        <header>
          <h2>Account deletion.</h2>
          <p>
            Deletion is not immediate. The backend first marks the account
            pending, applies its configured grace period, then erases account
            data and connected media through the retention worker.
          </p>
        </header>
        <div className={styles.privacyActions}>
          {record.deletionRequestedAt ? (
            <>
              <span>
                Requested {formatDate(record.deletionRequestedAt)}
              </span>
              <button
                disabled={cancelDeletion.isPending}
                onClick={() => cancelDeletion.mutate()}
                type="button"
              >
                {cancelDeletion.isPending
                  ? "Cancelling request…"
                  : "Cancel deletion request"}
              </button>
            </>
          ) : (
            <button
              className={styles.danger}
              onClick={() => setDeletionDialog(true)}
              type="button"
            >
              Request account deletion
            </button>
          )}
        </div>
        {(requestDeletion.error || cancelDeletion.error) && (
          <p className={styles.formError} role="alert">
            {(requestDeletion.error ?? cancelDeletion.error)?.message}
          </p>
        )}
      </section>

      {deletionDialog && (
        <div
          aria-labelledby="account-deletion-title"
          aria-modal="true"
          className={styles.dialogBackdrop}
          role="dialog"
        >
          <section className={styles.dialog}>
            <header>
              <span>Account: {record.email}</span>
              <button
                aria-label="Close dialog"
                disabled={requestDeletion.isPending}
                onClick={() => setDeletionDialog(false)}
                type="button"
              >
                ×
              </button>
            </header>
            <h2 id="account-deletion-title">Request account deletion?</h2>
            <p>
              Your account will enter deletion-pending status. After the
              configured grace period, Verith may permanently erase your
              profile, investigations, reports, uploads, and account history.
            </p>
            {requestDeletion.isError && (
              <p className={styles.formError} role="alert">
                {requestDeletion.error.message}
              </p>
            )}
            <footer>
              <button
                disabled={requestDeletion.isPending}
                onClick={() => setDeletionDialog(false)}
                type="button"
              >
                Keep account
              </button>
              <button
                className={styles.danger}
                disabled={requestDeletion.isPending}
                onClick={() => requestDeletion.mutate()}
                type="button"
              >
                {requestDeletion.isPending
                  ? "Submitting request…"
                  : "Request deletion"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
