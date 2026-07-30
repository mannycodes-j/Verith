"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ApiClientError } from "@/services/apiClient";
import {
  authService,
  type AuthenticatedUser,
} from "@/services/authService";
import { appShellStyles as styles } from "./app-shell.styles";
import NotificationDrawer from "./NotificationDrawer";

const navigation = [
  {
    label: "Workspace",
    items: [
      { href: "/app", index: "01", label: "Overview" },
      { href: "/app/verify", index: "02", label: "New investigation" },
      {
        href: "/app/verifications",
        index: "03",
        label: "Verification history",
      },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { href: "/app/learning", index: "04", label: "Learning" },
      { href: "/app/challenges", index: "05", label: "Daily challenges" },
      { href: "/app/achievements", index: "06", label: "Achievements" },
      { href: "/app/leaderboards", index: "07", label: "Leaderboards" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/app/notifications", index: "08", label: "Notifications" },
      { href: "/app/profile", index: "09", label: "Profile" },
      { href: "/app/settings", index: "10", label: "Settings" },
    ],
  },
] as const;

const adminNavigation = [
  {
    label: "Operations",
    items: [
      { href: "/admin", index: "A1", label: "Admin overview" },
      { href: "/admin/users", index: "A2", label: "Users" },
      {
        href: "/admin/verifications",
        index: "A3",
        label: "Verifications",
      },
      { href: "/admin/feedback", index: "A4", label: "Feedback" },
      { href: "/admin/publishers", index: "A5", label: "Publishers" },
      { href: "/admin/system-health", index: "A6", label: "System health" },
      { href: "/admin/badges", index: "A7", label: "Badges" },
    ],
  },
] as const;

const editorialNavigation = [
  {
    label: "Editorial",
    items: [
      { href: "/admin/courses", index: "E1", label: "Courses" },
      { href: "/admin/lessons", index: "E2", label: "Lessons" },
      { href: "/admin/quizzes", index: "E3", label: "Quizzes" },
      { href: "/admin/challenges", index: "E4", label: "Challenges" },
    ],
  },
] as const;

const moderationNavigation = [
  {
    label: "Moderation",
    items: [{ href: "/admin/feedback", index: "M1", label: "Feedback" }],
  },
] as const;

const superAdminNavigation = [
  {
    label: "Governance",
    items: [
      { href: "/admin/audit-logs", index: "G1", label: "Audit logs" },
      { href: "/admin/ai/providers", index: "G2", label: "AI providers" },
      { href: "/admin/ai/prompts", index: "G3", label: "AI prompts" },
    ],
  },
] as const;

const pageTitles: Record<string, string> = {
  "/admin": "Operations overview",
  "/admin/ai/prompts": "Prompt registry",
  "/admin/ai/providers": "Provider configuration",
  "/admin/audit-logs": "Audit logs",
  "/admin/challenges": "Challenge editorial",
  "/admin/courses": "Course editorial",
  "/admin/feedback": "Feedback moderation",
  "/admin/lessons": "Lesson editorial",
  "/admin/publishers": "Publisher governance",
  "/admin/quizzes": "Quiz editorial",
  "/admin/system-health": "System health",
  "/admin/users": "User operations",
  "/admin/verifications": "Verification operations",
  "/app": "Investigation desk",
  "/app/achievements": "Achievements",
  "/app/challenges": "Daily challenges",
  "/app/learning": "Learning",
  "/app/leaderboards": "Leaderboards",
  "/app/notifications": "Notifications",
  "/app/profile": "Profile",
  "/app/settings": "Settings",
  "/app/verifications": "Verification history",
  "/app/verify": "New investigation",
};

function isActive(pathname: string, href: string) {
  return href === "/app"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

function Navigation({
  admin,
  editorial,
  moderator,
  pathname,
  superAdmin,
}: {
  admin: boolean;
  editorial: boolean;
  moderator: boolean;
  pathname: string;
  superAdmin: boolean;
}) {
  const groups = [
    ...navigation,
    ...(admin ? adminNavigation : []),
    ...(editorial ? editorialNavigation : []),
    ...(moderator && !admin ? moderationNavigation : []),
    ...(superAdmin ? superAdminNavigation : []),
  ];
  return (
    <nav className={styles.navigation} aria-label="Workspace navigation">
      {groups.map((group) => (
        <div className={styles.navGroup} key={group.label}>
          <span className={styles.navLabel}>{group.label}</span>
          {group.items.map((item) => (
            <Link
              className={
                isActive(pathname, item.href)
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : styles.navItem
              }
              href={item.href}
              key={item.href}
            >
              <span>{item.index}</span>
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

function WorkspaceUnavailable({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <main className={styles.gate}>
      <span>Connection state / Unavailable</span>
      <h1>The workspace could not be opened.</h1>
      <p>{message}</p>
      <button type="button" onClick={retry}>
        Retry connection
      </button>
      <Link href="/">Return home</Link>
    </main>
  );
}

function SessionExpired({ login }: { login: () => void }) {
  return (
    <main className={styles.gate}>
      <span>Session state / Expired</span>
      <h1>Your secure session has ended.</h1>
      <p>
        Verith could not rotate the refresh session. Sign in again to continue;
        unsent form content cannot be recovered.
      </p>
      <button type="button" onClick={login}>
        Return to login
      </button>
      <Link href="/">Return home</Link>
    </main>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [notificationDrawer, setNotificationDrawer] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const profileQuery = useQuery<AuthenticatedUser>({
    queryFn: authService.getProfile,
    queryKey: ["profile"],
    retry: false,
  });

  useEffect(() => {
    const theme = profileQuery.data?.theme;
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [profileQuery.data?.theme]);

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      router.replace("/login");
    }
  };

  if (profileQuery.isPending) {
    return (
      <main className={styles.loadingGate} aria-busy="true">
        <div className={styles.loadingMark}>V</div>
        <div>
          <span>Secure workspace</span>
          <p role="status">Restoring your session…</p>
        </div>
      </main>
    );
  }

  if (profileQuery.isError || !profileQuery.data) {
    if (
      profileQuery.error instanceof ApiClientError &&
      profileQuery.error.status === 401
    ) {
      return (
        <SessionExpired
          login={() => router.replace("/login?reason=session-expired")}
        />
      );
    }
    const error =
      profileQuery.error instanceof ApiClientError
        ? profileQuery.error.message
        : "Verith could not restore the workspace session.";
    return (
      <WorkspaceUnavailable
        message={error}
        retry={() => void profileQuery.refetch()}
      />
    );
  }

  const profile = profileQuery.data;
  const displayName =
    (typeof profile.displayName === "string" && profile.displayName) ||
    (typeof profile.username === "string" && profile.username) ||
    "Account";
  const role =
    typeof profile.role === "string"
      ? profile.role.replaceAll("_", " ").toLowerCase()
      : "investigator";
  const isAdmin =
    profile.role === "ADMIN" || profile.role === "SUPER_ADMIN";
  const isEditorial =
    isAdmin || profile.role === "CONTENT_EDITOR";
  const isModerator = isAdmin || profile.role === "MODERATOR";
  const isSuperAdmin = profile.role === "SUPER_ADMIN";
  const editorialPath = [
    "/admin/courses",
    "/admin/lessons",
    "/admin/quizzes",
    "/admin/challenges",
  ].some((prefix) => pathname.startsWith(prefix));
  const moderationPath = pathname.startsWith("/admin/feedback");
  const permittedAdminPath =
    isAdmin ||
    (isEditorial && editorialPath) ||
    (isModerator && moderationPath);
  if (pathname.startsWith("/admin") && !permittedAdminPath) {
    return (
      <main className={styles.gate}>
        <span>Permission state / Forbidden</span>
        <h1>This workspace requires an administrator role.</h1>
        <p>
          Navigation visibility is not authorization. Verith also enforces
          this role on every administrative API request.
        </p>
        <Link href="/app">Return to investigation desk</Link>
      </main>
    );
  }
  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/app/verifications/")
      ? "Investigation"
      : "Workspace");

  return (
    <div className={styles.shell}>
      <a
        className="fixed top-4 left-4 z-1000 -translate-y-[160%] bg-foreground px-4 py-3 text-background transition-transform duration-150 focus:translate-y-0"
        href="#workspace-content"
      >
        Skip to workspace
      </a>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link className={styles.wordmark} href="/app">
            Verith
          </Link>
          <span>Evidence system</span>
        </div>
        <Navigation
          admin={isAdmin}
          editorial={isEditorial}
          moderator={isModerator}
          pathname={pathname}
          superAdmin={isSuperAdmin}
        />
        <div className={styles.account}>
          <div className={styles.avatar} aria-hidden="true">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <strong>{displayName}</strong>
            <span>{role}</span>
          </div>
          <button type="button" onClick={() => setLogoutDialog(true)}>
            Log out
          </button>
        </div>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span>Workspace / {title}</span>
            <strong>{title}</strong>
          </div>
          <div className={styles.topbarActions}>
            <button
              className={styles.notificationTrigger}
              onClick={() => setNotificationDrawer(true)}
              type="button"
            >
              Notifications
            </button>
            <Link href="/app/verify">New investigation</Link>
            <details className={styles.mobileNavigation}>
              <summary>Menu</summary>
              <Navigation
                admin={isAdmin}
                editorial={isEditorial}
                moderator={isModerator}
                pathname={pathname}
                superAdmin={isSuperAdmin}
              />
            </details>
          </div>
        </header>
        <main className={styles.content} id="workspace-content">
          {children}
        </main>
      </div>
      {notificationDrawer && (
        <NotificationDrawer close={() => setNotificationDrawer(false)} />
      )}
      {logoutDialog && (
        <div className={styles.dialogBackdrop}>
          <section
            aria-labelledby="logout-dialog-title"
            aria-modal="true"
            className={styles.logoutDialog}
            role="dialog"
          >
            <span>Account action</span>
            <h2 id="logout-dialog-title">Log out of this session?</h2>
            <p>
              This browser session will be revoked. Other active devices remain
              signed in.
            </p>
            <footer>
              <button onClick={() => setLogoutDialog(false)} type="button">
                Stay signed in
              </button>
              <button onClick={() => void logout()} type="button">
                Log out
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
