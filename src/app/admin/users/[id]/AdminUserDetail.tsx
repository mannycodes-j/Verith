"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  adminService,
  type AdminUserRole,
  type AdminUserStatus,
  type EntitlementPlan,
} from "@/services/admin";
import { authService } from "@/services/authService";
import { adminStyles as styles } from "../../admin.styles";

type StatusAction = Extract<
  AdminUserStatus,
  "ACTIVE" | "SUSPENDED" | "DISABLED"
>;
type PendingAction =
  | { kind: "status"; value: StatusAction }
  | { kind: "role"; value: AdminUserRole }
  | { kind: "entitlement"; value: EntitlementPlan };

const roles: AdminUserRole[] = [
  "USER",
  "MODERATOR",
  "CONTENT_EDITOR",
  "ADMIN",
  "SUPER_ADMIN",
];

export default function AdminUserDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [action, setAction] = useState<PendingAction>();
  const [reason, setReason] = useState("");
  const profile = useQuery({
    queryFn: authService.getProfile,
    queryKey: ["profile"],
    retry: false,
  });
  const user = useQuery({
    queryFn: () => adminService.user(id),
    queryKey: ["admin", "user", id],
    retry: false,
  });
  const mutation = useMutation({
    mutationFn: () => {
      if (!action) throw new Error("Choose an administrative action.");
      if (action.kind === "status")
        return adminService.changeUserStatus(id, action.value, reason.trim());
      if (action.kind === "role")
        return adminService.changeUserRole(id, action.value, reason.trim());
      return adminService.grantEntitlement(id, action.value, reason.trim());
    },
    onSuccess: (next) => {
      if (action?.kind !== "entitlement") {
        queryClient.setQueryData(["admin", "user", id], (current: unknown) => ({
          ...(typeof current === "object" && current ? current : {}),
          ...(typeof next === "object" && next ? next : {}),
        }));
        void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      }
      setAction(undefined);
      setReason("");
    },
  });

  if (user.isPending) {
    return <div className={styles.tableLoading}>Opening safe user record…</div>;
  }
  if (user.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>User record unavailable</span>
        <h1>This account could not be inspected.</h1>
        <p>{user.error.message}</p>
        <button type="button" onClick={() => void user.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = user.data;
  const superAdmin = profile.data?.role === "SUPER_ADMIN";
  return (
    <div className={styles.page}>
      <header className={styles.detailHero}>
        <div>
          <span>User: {record.id}</span>
          <h1>{record.displayName || record.username}</h1>
          <p>{record.email}</p>
        </div>
        <Link href="/admin/users">Return to users</Link>
      </header>

      <dl className={styles.dossier}>
        <div>
          <dt>Status</dt>
          <dd>{record.status.replaceAll("_", " ")}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{record.role.replaceAll("_", " ")}</dd>
        </div>
        <div>
          <dt>Active sessions</dt>
          <dd>{record.activeSessions ?? "Unavailable"}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{new Date(record.createdAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt>Email verification</dt>
          <dd>
            {record.emailVerifiedAt
              ? new Date(record.emailVerifiedAt).toLocaleString()
              : "Not verified"}
          </dd>
        </div>
        <div>
          <dt>Last activity</dt>
          <dd>
            {record.lastActiveAt
              ? new Date(record.lastActiveAt).toLocaleString()
              : "No activity recorded"}
          </dd>
        </div>
      </dl>

      <section className={styles.actionSection}>
        <header>
          <span>Account status</span>
          <p>
            Suspension and disabling revoke active sessions. Activation restores
            login eligibility but does not recreate revoked sessions.
          </p>
        </header>
        <div>
          {(["ACTIVE", "SUSPENDED", "DISABLED"] as StatusAction[]).map(
            (status) => (
              <button
                disabled={record.status === status}
                key={status}
                onClick={() => {
                  mutation.reset();
                  setAction({ kind: "status", value: status });
                }}
                type="button"
              >
                Set {status.toLowerCase()}
              </button>
            ),
          )}
        </div>
      </section>

      {superAdmin && (
        <section className={styles.actionSection}>
          <header>
            <span>Role assignment: Super admin</span>
            <p>
              Changing a role revokes every active session and takes effect on
              the next authentication.
            </p>
          </header>
          <div>
            {roles.map((role) => (
              <button
                disabled={record.role === role}
                key={role}
                onClick={() => {
                  mutation.reset();
                  setAction({ kind: "role", value: role });
                }}
                type="button"
              >
                {role.replaceAll("_", " ")}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className={styles.actionSection}>
        <header>
          <span>Pilot entitlement</span>
          <p>
            Payments are not configured. Administrators may grant a documented
            free or sponsored pilot allowance; every change is audited.
          </p>
        </header>
        <div>
          {(["FREE", "COMMUNITY", "ADMINISTRATIVE_SPONSORSHIP"] as EntitlementPlan[]).map((plan) => (
            <button key={plan} onClick={() => { mutation.reset(); setAction({ kind: "entitlement", value: plan }); }} type="button">Grant {plan.replaceAll("_", " ").toLowerCase()}</button>
          ))}
        </div>
      </section>

      {action && (
        <div className={styles.dialogBackdrop}>
          <section
            aria-labelledby="account-action-title"
            aria-modal="true"
            className={styles.confirmDialog}
            onKeyDown={(event) => {
              if (event.key === "Escape" && !mutation.isPending) {
                setAction(undefined);
                setReason("");
                mutation.reset();
              }
            }}
            role="dialog"
          >
            <span>
              {action.kind === "status"
                ? "Account status change"
                : action.kind === "role"
                  ? "Privilege change"
                  : "Sponsored entitlement"}
            </span>
            <h2 id="account-action-title">
              Confirm {action.value.replaceAll("_", " ").toLowerCase()} for{" "}
              {record.email}
            </h2>
            <p>
              {action.kind === "entitlement"
                ? "This does not charge the user or activate a checkout. The grant and reason are written to the administrative audit log."
                : action.kind === "role" || action.value !== "ACTIVE"
                ? "This action revokes active sessions and is written to the administrative audit log."
                : "This action restores account access and is written to the administrative audit log."}
            </p>
            <label>
              Audit reason
              <textarea
                autoFocus
                minLength={10}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explain the operational reason (10 characters minimum)"
                value={reason}
              />
            </label>
            {mutation.isError && <p role="alert">{mutation.error.message}</p>}
            <footer>
              <button
                disabled={mutation.isPending}
                onClick={() => {
                  setAction(undefined);
                  setReason("");
                  mutation.reset();
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                disabled={mutation.isPending || reason.trim().length < 10}
                onClick={() => mutation.mutate()}
                type="button"
              >
                {mutation.isPending ? "Applying…" : "Confirm audited change"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
