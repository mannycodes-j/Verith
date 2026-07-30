"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { accountService, type AccountSession } from "@/services/account";
import { settingsStyles as styles } from "../settings.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function SecuritySettings() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState<AccountSession>();
  const [logoutAllDialog, setLogoutAllDialog] = useState(false);
  const sessions = useQuery({
    queryFn: accountService.sessions,
    queryKey: ["account-sessions"],
  });
  const current = useQuery({
    queryFn: accountService.currentSession,
    queryKey: ["current-session"],
  });
  const password = useMutation({
    mutationFn: accountService.changePassword,
    onSuccess: () => router.replace("/login?reason=password-changed"),
  });
  const revoke = useMutation({
    mutationFn: accountService.revokeSession,
    onSuccess: async (_, sessionId) => {
      setSelectedSession(undefined);
      if (sessionId === current.data?.sessionId) {
        router.replace("/login?reason=session-expired");
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["account-sessions"] });
    },
  });
  const logoutAll = useMutation({
    mutationFn: accountService.signOutEverywhere,
    onSuccess: () => router.replace("/login"),
  });

  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get("currentPassword") ?? "");
    const newPassword = String(data.get("newPassword") ?? "");
    const confirmation = String(data.get("confirmation") ?? "");
    if (newPassword !== confirmation) {
      password.reset();
      form.setCustomValidity("The new password confirmation does not match.");
      form.reportValidity();
      form.setCustomValidity("");
      return;
    }
    password.mutate({ currentPassword, newPassword });
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Account / Security</span>
        <h1>Password and sessions.</h1>
        <p>
          Change your password, inspect active backend sessions, and revoke
          access from devices you no longer recognize.
        </p>
      </header>
      <nav className={styles.settingsNav} aria-label="Settings sections">
        <Link href="/app/settings">Profile</Link>
        <Link href="/app/settings/privacy">Privacy and data</Link>
        <span>Password and sessions</span>
        <Link href="/app/settings/whatsapp">WhatsApp</Link>
      </nav>

      <form className={styles.formSection} onSubmit={submitPassword}>
        <header>
          <span>01 / Password</span>
          <h2>Change credentials.</h2>
        </header>
        <div className={styles.formGrid}>
          <label className={styles.fullField}>
            <span>Current password</span>
            <input
              autoComplete="current-password"
              minLength={8}
              name="currentPassword"
              required
              type="password"
            />
          </label>
          <label>
            <span>New password</span>
            <input
              autoComplete="new-password"
              minLength={8}
              name="newPassword"
              required
              type="password"
            />
          </label>
          <label>
            <span>Confirm new password</span>
            <input
              autoComplete="new-password"
              minLength={8}
              name="confirmation"
              required
              type="password"
            />
          </label>
        </div>
        <p className={styles.formSuccess}>
          A successful password change revokes every active session, including
          this one.
        </p>
        {password.isError && (
          <p className={styles.formError} role="alert">
            {password.error.message}
          </p>
        )}
        <button disabled={password.isPending} type="submit">
          {password.isPending ? "Changing password…" : "Change password"}
        </button>
      </form>

      <section className={styles.securityPanel}>
        <header>
          <h2>Active sessions.</h2>
          <p>
            Device labels are derived from the client information retained by
            the authentication service. IP addresses are not exposed.
          </p>
        </header>
        {sessions.isPending && <p>Loading active sessions…</p>}
        {sessions.isError && (
          <p className={styles.formError} role="alert">
            {sessions.error.message}
          </p>
        )}
        {sessions.data?.length === 0 && <p>No active sessions were returned.</p>}
        {sessions.data && sessions.data.length > 0 && (
          <div className={styles.securityList}>
            {sessions.data.map((session) => (
              <div key={session.id}>
                <dl>
                  <div>
                    <dt>Device</dt>
                    <dd>
                      {session.deviceName ||
                        session.userAgentSummary ||
                        "Unknown device"}
                    </dd>
                  </div>
                  <div>
                    <dt>Browser</dt>
                    <dd>
                      {[session.browser, session.platform]
                        .filter(Boolean)
                        .join(" / ") || "Unavailable"}
                    </dd>
                  </div>
                  <div>
                    <dt>Last used</dt>
                    <dd>{formatDate(session.lastUsedAt)}</dd>
                  </div>
                  <div>
                    <dt>Expires</dt>
                    <dd>{formatDate(session.expiresAt)}</dd>
                  </div>
                </dl>
                <button
                  onClick={() => setSelectedSession(session)}
                  type="button"
                >
                  {session.id === current.data?.sessionId
                    ? "Revoke this session"
                    : "Revoke"}
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.securityActions}>
          <button
            className={styles.danger}
            onClick={() => setLogoutAllDialog(true)}
            type="button"
          >
            Sign out everywhere
          </button>
        </div>
      </section>

      {(selectedSession || logoutAllDialog) && (
        <div
          aria-labelledby="session-dialog-title"
          aria-modal="true"
          className={styles.dialogBackdrop}
          role="dialog"
        >
          <section className={styles.dialog}>
            <header>
              <span>Security confirmation</span>
              <button
                aria-label="Close dialog"
                disabled={revoke.isPending || logoutAll.isPending}
                onClick={() => {
                  setSelectedSession(undefined);
                  setLogoutAllDialog(false);
                }}
                type="button"
              >
                ×
              </button>
            </header>
            <h2 id="session-dialog-title">
              {logoutAllDialog
                ? "Sign out every session?"
                : "Revoke this session?"}
            </h2>
            <p>
              {logoutAllDialog
                ? "Every active browser and device session will be revoked. You will need to sign in again."
                : `The session for ${
                    selectedSession?.deviceName ||
                    selectedSession?.userAgentSummary ||
                    "this device"
                  } will lose access immediately.`}
            </p>
            {(revoke.error || logoutAll.error) && (
              <p className={styles.formError} role="alert">
                {(revoke.error ?? logoutAll.error)?.message}
              </p>
            )}
            <footer>
              <button
                disabled={revoke.isPending || logoutAll.isPending}
                onClick={() => {
                  setSelectedSession(undefined);
                  setLogoutAllDialog(false);
                }}
                type="button"
              >
                Keep sessions
              </button>
              <button
                className={styles.danger}
                disabled={revoke.isPending || logoutAll.isPending}
                onClick={() => {
                  if (logoutAllDialog) logoutAll.mutate();
                  else if (selectedSession) revoke.mutate(selectedSession.id);
                }}
                type="button"
              >
                {revoke.isPending || logoutAll.isPending
                  ? "Revoking…"
                  : logoutAllDialog
                    ? "Sign out everywhere"
                    : "Revoke session"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
