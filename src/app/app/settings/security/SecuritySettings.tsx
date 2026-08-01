"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarClock,
  Clock3,
  LogOut,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { accountService, type AccountSession } from "@/services/account";
import { authService } from "@/services/authService";
import { describeSessionClient } from "@/utils/user-agent";
import { settingsStyles as styles } from "../settings.styles";
import SettingsNav from "../SettingsNav";

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
  const profile = useQuery({
    queryFn: authService.getProfile,
    queryKey: ["profile"],
    retry: false,
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
        <span>Account: Security</span>
        <h1>Password and sessions.</h1>
        <p>
          Change your password, inspect active backend sessions, and revoke
          access from devices you no longer recognize.
        </p>
      </header>
      <SettingsNav active="security" />

      {profile.isPending && (
        <section className={styles.formSection} aria-busy="true">
          <header>
            <span>Authentication method</span>
            <h2>Checking account credentials…</h2>
          </header>
        </section>
      )}
      {profile.data?.authProvider === "GOOGLE" && (
        <section className={styles.formSection}>
          <header>
            <span>Google authentication</span>
            <h2>Your password is managed by Google.</h2>
          </header>
          <p className={styles.formSuccess}>
            This Verith account was created with Google and does not store a
            Verith password. Manage credentials and recovery from your Google
            Account; session controls below remain available here.
          </p>
        </section>
      )}

      <form
        className={styles.formSection}
        hidden={profile.isPending || profile.data?.authProvider === "GOOGLE"}
        onSubmit={submitPassword}
      >
        <header>
          <span>Password</span>
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
          <ul className={styles.sessionGrid}>
            {sessions.data.map((session) => {
              const isCurrent = session.id === current.data?.sessionId;
              const { device, environment } = describeSessionClient(session);

              return (
                <li
                  className={styles.sessionCard}
                  data-current={isCurrent}
                  key={session.id}
                >
                  <header className={styles.sessionHeader}>
                    <span>
                      <MonitorSmartphone aria-hidden="true" size={20} />
                    </span>
                    <div>
                      <strong>{device}</strong>
                      <small>{environment}</small>
                    </div>
                    {isCurrent && (
                      <em>
                        <ShieldCheck aria-hidden="true" size={13} />
                        This device
                      </em>
                    )}
                  </header>
                  <dl className={styles.sessionDetails}>
                    <div>
                      <dt>
                        <Clock3 aria-hidden="true" size={12} />
                        Last active
                      </dt>
                      <dd>{formatDate(session.lastUsedAt)}</dd>
                    </div>
                    <div>
                      <dt>
                        <CalendarClock aria-hidden="true" size={12} />
                        Expires
                      </dt>
                      <dd>{formatDate(session.expiresAt)}</dd>
                    </div>
                    <div>
                      <dt>Session opened</dt>
                      <dd>{formatDate(session.createdAt)}</dd>
                    </div>
                    <div>
                      <dt>Access status</dt>
                      <dd>Active and authenticated</dd>
                    </div>
                  </dl>
                  <footer className={styles.sessionFooter}>
                    <span>
                      {isCurrent
                        ? "Revoking this session will sign you out here."
                        : "Remove access if you do not recognize this device."}
                    </span>
                    <button
                      onClick={() => setSelectedSession(session)}
                      type="button"
                    >
                      <LogOut aria-hidden="true" size={14} />
                      {isCurrent ? "Sign out this device" : "Revoke access"}
                    </button>
                  </footer>
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.securityActions} style={{ marginTop: 12 }}>
          <button className={styles.danger} onClick={() => setLogoutAllDialog(true)} type="button">
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
                : `The session for ${selectedSession?.deviceName || selectedSession?.userAgentSummary || "this device"} will lose access immediately.`}
            </p>
            {(revoke.error || logoutAll.error) && (
              <p className={styles.formError} role="alert">
                {(revoke.error ?? logoutAll.error)?.message}
              </p>
            )}
            <footer className="mt-4">
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
