"use client";

import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Bell,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  GraduationCap,
  HeartHandshake,
  History,
  Home,
  Library,
  MessageSquareText,
  PlusCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
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
      { href: "/app", icon: Home, label: "Home" },
      { href: "/app/verify", icon: PlusCircle, label: "Try now" },
      {
        href: "/app/verifications",
        icon: History,
        label: "My investigations",
      },
    ],
  },
  {
    label: "Learn and grow",
    items: [
      { href: "/app/learning", icon: BookOpen, label: "Learning" },
      { href: "/app/challenges", icon: ClipboardCheck, label: "Daily practice" },
      { href: "/app/achievements", icon: Award, label: "Achievements" },
      { href: "/app/leaderboards", icon: Trophy, label: "Community" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/app/notifications", icon: Bell, label: "Notifications" },
      { href: "/app/profile", icon: UserRound, label: "Profile" },
      { href: "/app/settings", icon: Settings, label: "Settings" },
    ],
  },
] as const;

const adminNavigation = [
  {
    label: "Manage Verith",
    items: [
      { href: "/admin", icon: Gauge, label: "Overview" },
      { href: "/admin/users", icon: Users, label: "People" },
      {
        href: "/admin/verifications",
        icon: FileCheck2,
        label: "Verifications",
      },
      { href: "/admin/feedback", icon: MessageSquareText, label: "Feedback" },
      { href: "/admin/publishers", icon: HeartHandshake, label: "Publishers" },
      { href: "/admin/system-health", icon: ShieldCheck, label: "System health" },
      { href: "/admin/badges", icon: Award, label: "Badges" },
    ],
  },
] as const;

const editorialNavigation = [
  {
    label: "Editorial",
    items: [
      { href: "/admin/courses", icon: Library, label: "Courses" },
      { href: "/admin/lessons", icon: GraduationCap, label: "Lessons" },
      { href: "/admin/quizzes", icon: ClipboardCheck, label: "Quizzes" },
      { href: "/admin/challenges", icon: Sparkles, label: "Challenges" },
    ],
  },
] as const;

const moderationNavigation = [
  {
    label: "Moderation",
    items: [{ href: "/admin/feedback", icon: MessageSquareText, label: "Feedback" }],
  },
] as const;

const superAdminNavigation = [
  {
    label: "Advanced",
    items: [
      { href: "/admin/audit-logs", icon: History, label: "Activity log" },
      { href: "/admin/ai/providers", icon: BrainCircuit, label: "AI providers" },
      { href: "/admin/ai/prompts", icon: Sparkles, label: "AI guidance" },
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

const mobileNavigation = [
  { href: "/app", icon: Home, label: "Home" },
  { href: "/app/verify", icon: PlusCircle, label: "Try now" },
  { href: "/app/verifications", icon: History, label: "History" },
  { href: "/app/learning", icon: BookOpen, label: "Learn" },
  { href: "/app/settings", icon: Settings, label: "Settings" },
] as const;

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
          {group.items.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                className={
                  active
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
                aria-current={active ? "page" : undefined}
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
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
      <span>We could not connect</span>
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
      <span>Your session has ended</span>
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
  const reduceMotion = useReducedMotion();
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
        <span>You do not have access</span>
        <h1>This space is only available to Verith administrators.</h1>
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
            <span>V</span>
            <strong>Verith</strong>
          </Link>
          <span>Your verification space</span>
        </div>
        <div className={styles.sidebarWidget}>
          <span>
            <ShieldCheck aria-hidden="true" size={13} />
            Evidence first
          </span>
          <strong>Explainable by design</strong>
          <p>
            Sources, limitations, and uncertainty remain visible throughout
            every investigation.
          </p>
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
            <span>Here is what is happening</span>
            <strong>{title}</strong>
          </div>
          <div className={styles.topbarActions}>
            <button
              aria-label="Open notifications"
              className={styles.notificationTrigger}
              onClick={() => setNotificationDrawer(true)}
              title="Notifications"
              type="button"
            >
              <Bell aria-hidden="true" size={18} strokeWidth={1.8} />
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
        <motion.main
          animate={{
            opacity: 1,
            transitionEnd: { transform: "none" },
            y: 0,
          }}
          className={styles.content}
          id="workspace-content"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          key={pathname}
          tabIndex={-1}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.1, 1] }}
        >
          {children}
        </motion.main>
      </div>
      <nav className={styles.mobileBottomNavigation} aria-label="Quick navigation">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              className={
                active
                  ? `${styles.mobileBottomItem} ${styles.mobileBottomItemActive}`
                  : styles.mobileBottomItem
              }
              aria-current={active ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden="true" size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
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
