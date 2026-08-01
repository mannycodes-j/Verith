"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  adminService,
  type AdminUserRole,
  type AdminUserStatus,
} from "@/services/admin";
import { adminStyles as styles } from "../admin.styles";

const roles: AdminUserRole[] = [
  "USER",
  "MODERATOR",
  "CONTENT_EDITOR",
  "ADMIN",
  "SUPER_ADMIN",
];
const statuses: AdminUserStatus[] = [
  "PENDING_VERIFICATION",
  "ACTIVE",
  "SUSPENDED",
  "DISABLED",
  "DELETION_PENDING",
  "DELETED",
];

export default function AdminUsers() {
  const [draftSearch, setDraftSearch] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<AdminUserRole | "">("");
  const [status, setStatus] = useState<AdminUserStatus | "">("");
  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors.at(-1);
  const users = useQuery({
    queryFn: () =>
      adminService.users({
        cursor,
        role: role || undefined,
        search: search || undefined,
        status: status || undefined,
      }),
    queryKey: ["admin", "users", cursor, role, search, status],
    retry: false,
  });

  const resetPagination = () => setCursors([]);

  return (
    <div className={styles.page}>
      <header className={styles.listHero}>
        <div className="admin-heading">
          <span>People and access</span>
          <h1>Account inspection and access control.</h1>
        </div>
        <p>
          Credential material is excluded by the backend. Status and role
          changes are audited and require a documented reason.
        </p>
      </header>

      <form
        className={styles.filters}
        onSubmit={(event) => {
          event.preventDefault();
          const normalized = draftSearch.trim();
          if (normalized && normalized.length < 2) return;
          setSearch(normalized);
          resetPagination();
        }}
      >
        <label>
          Search email or username
          <input
            minLength={2}
            onChange={(event) => setDraftSearch(event.target.value)}
            placeholder="At least 2 characters"
            value={draftSearch}
          />
        </label>
        <label>
          Account status
          <select
            onChange={(event) => {
              setStatus(event.target.value as AdminUserStatus | "");
              resetPagination();
            }}
            value={status}
          >
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label>
          Role
          <select
            onChange={(event) => {
              setRole(event.target.value as AdminUserRole | "");
              resetPagination();
            }}
            value={role}
          >
            <option value="">All roles</option>
            {roles.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Apply search</button>
      </form>

      {users.isPending ? (
        <div className={styles.tableLoading} aria-busy="true">
          Loading safe account records…
        </div>
      ) : users.isError ? (
        <section className={styles.inlineError} role="alert">
          <div>
            <span>User directory unavailable</span>
            <p>{users.error.message}</p>
          </div>
          <button type="button" onClick={() => void users.refetch()}>
            Retry
          </button>
        </section>
      ) : users.data.items.length === 0 ? (
        <section className={styles.listEmpty}>
          <span>No matching accounts</span>
          <h2>The current server-side filters returned no users.</h2>
        </section>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Account</th>
                <th>Role</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Last active</th>
                <th aria-label="Open account" />
              </tr>
            </thead>
            <tbody>
              {users.data.items.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.displayName || user.username}</strong>
                    <small>{user.email}</small>
                    <small>ID: {user.id}</small>
                  </td>
                  <td>{user.role.replaceAll("_", " ")}</td>
                  <td>
                    <span data-status={user.status}>{user.status}</span>
                  </td>
                  <td>{user.emailVerifiedAt ? "Verified" : "Unverified"}</td>
                  <td>
                    {user.lastActiveAt
                      ? new Date(user.lastActiveAt).toLocaleString()
                      : "No activity recorded"}
                  </td>
                  <td>
                    <Link href={`/admin/users/${user.id}`}>Inspect</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {users.data && (cursors.length > 0 || users.data.pagination.hasNextPage) && (
        <nav className={styles.pagination} aria-label="User result pages">
          <button
            disabled={cursors.length === 0}
            onClick={() => setCursors((current) => current.slice(0, -1))}
            type="button"
          >
            Previous
          </button>
          <span>Cursor page {cursors.length + 1}</span>
          <button
            disabled={!users.data.pagination.nextCursor}
            onClick={() =>
              setCursors((current) => [
                ...current,
                users.data!.pagination.nextCursor!,
              ])
            }
            type="button"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
