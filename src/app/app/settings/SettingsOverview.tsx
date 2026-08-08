"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  Languages,
  LockKeyhole,
  MapPin,
  PencilLine,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";
import { accountService } from "@/services/account";
import SettingsNav from "./SettingsNav";
import { settingsStyles as styles } from "./settings.styles";

const notificationOptions = [
  {
    description: "Know when an evidence report is ready to inspect.",
    key: "verificationComplete",
    label: "Completed investigations",
    locked: false,
  },
  {
    description: "Receive a clear alert when an investigation cannot finish.",
    key: "verificationFailed",
    label: "Failed investigations",
    locked: false,
  },
  {
    description: "Surface relevant published lessons for your learning path.",
    key: "learningRecommendations",
    label: "Learning recommendations",
    locked: false,
  },
  {
    description: "Be reminded when a new daily practice is available.",
    key: "dailyChallenges",
    label: "Daily challenges",
    locked: false,
  },
  {
    description: "Protect an active learning streak before it expires.",
    key: "streakReminders",
    label: "Streak reminders",
    locked: false,
  },
  {
    description: "Follow earned badges, level changes, and milestones.",
    key: "gamification",
    label: "Achievements and levels",
    locked: false,
  },
  {
    description: "Receive occasional operational and product messages.",
    key: "marketing",
    label: "Product messages",
    locked: false,
  },
  {
    description: "Allow enabled notification categories to reach your email.",
    key: "emailEnabled",
    label: "Email delivery",
    locked: false,
  },
  {
    description:
      "WhatsApp delivery is coming soon and cannot be enabled yet.",
    key: "whatsappEnabled",
    label: "WhatsApp delivery",
    locked: true,
  },
] as const;

export default function SettingsOverview() {
  const queryClient = useQueryClient();
  const profile = useQuery({
    queryFn: accountService.profile,
    queryKey: ["profile"],
  });
  const profileMutation = useMutation({
    mutationFn: accountService.updateProfile,
    onSuccess: (next) => queryClient.setQueryData(["profile"], next),
  });
  const notificationsMutation = useMutation({
    mutationFn: accountService.updateNotifications,
    onSuccess: (next) => queryClient.setQueryData(["profile"], next),
  });

  if (profile.isPending) {
    return (
      <div className={styles.loading} aria-busy="true">
        <span>Loading settings</span>
        <h1>Opening your account preferences…</h1>
      </div>
    );
  }
  if (profile.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Settings unavailable</span>
        <h1>Your account settings could not be opened.</h1>
        <p>{profile.error.message}</p>
        <button type="button" onClick={() => void profile.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = profile.data;
  const displayName = record.displayName || record.username;
  const avatarUrl = record.avatar?.trim();
  const avatarStyle = avatarUrl
    ? { backgroundImage: `url(${JSON.stringify(avatarUrl)})` }
    : undefined;
  const role = String(record.role ?? "USER").replaceAll("_", " ");
  const status = String(record.status ?? "UNKNOWN").replaceAll("_", " ");

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    profileMutation.mutate({
      bio: String(data.get("bio") ?? ""),
      displayName: String(data.get("displayName") ?? ""),
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      preferredLanguage: String(data.get("preferredLanguage") ?? "en"),
      timezone: String(data.get("timezone") ?? "UTC"),
    });
  };
  const submitNotifications = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    notificationsMutation.mutate(
      Object.fromEntries(
        notificationOptions.map(({ key, locked }) => [
          key,
          locked ? false : data.has(key),
        ]),
      ),
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Your Verith experience</span>
        <h1>Shape the workspace around how you investigate and learn.</h1>
        <p>
          Keep your identity recognizable, your regional preferences accurate,
          and every delivery channel aligned with the updates you value.
        </p>
      </header>

      <SettingsNav active="profile" />

      <section
        className={styles.profileSummary}
        aria-labelledby="settings-profile-name"
      >
        <div className={styles.profileSummaryAvatar} style={avatarStyle}>
          {!avatarUrl && displayName.slice(0, 1).toUpperCase()}
        </div>
        <div className={styles.profileSummaryBody}>
          <span>
            <UserRound aria-hidden="true" size={13} />
            Account identity
          </span>
          <h2 id="settings-profile-name">{displayName}</h2>
          <p>
            @{record.username} <small aria-hidden="true">•</small>{" "}
            {record.email}
          </p>
          <div>
            <span
              data-tone={record.status === "ACTIVE" ? "positive" : "neutral"}
            >
              <CheckCircle2 aria-hidden="true" size={13} />
              {status}
            </span>
            <span>
              <ShieldCheck aria-hidden="true" size={13} />
              {role}
            </span>
          </div>
        </div>
        <Link className={styles.profileSummaryAction} href="/app/profile">
          View full profile
          <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </section>

      <div className={styles.profileContentGrid}>
        <form className={styles.profileSettingsCard} onSubmit={submitProfile}>
          <header className={styles.settingsCardHeader}>
            <span>
              <PencilLine aria-hidden="true" size={18} />
            </span>
            <div>
              <small>Profile details</small>
              <h2>Present a clear account identity</h2>
              <p>
                These details identify you throughout the private workspace and
                any profile surfaces you choose to make public.
              </p>
            </div>
          </header>

          <div className={styles.profileFormSections}>
            <fieldset className={styles.profileFieldset}>
              <legend>Personal identity</legend>
              <p>Choose the name and context people should recognize.</p>
              <div className={styles.profileFormGrid}>
                <label>
                  <span>Display name</span>
                  <input
                    autoComplete="name"
                    defaultValue={record.displayName ?? ""}
                    name="displayName"
                  />
                </label>
                <label>
                  <span>Username</span>
                  <input disabled value={record.username} />
                  <small>Username changes are not currently supported.</small>
                </label>
                <label>
                  <span>First name</span>
                  <input
                    autoComplete="given-name"
                    defaultValue={record.firstName ?? ""}
                    name="firstName"
                  />
                </label>
                <label>
                  <span>Last name</span>
                  <input
                    autoComplete="family-name"
                    defaultValue={record.lastName ?? ""}
                    name="lastName"
                  />
                </label>
                <label className={styles.profileFullField}>
                  <span>Profile statement</span>
                  <textarea
                    defaultValue={record.bio ?? ""}
                    maxLength={500}
                    name="bio"
                    placeholder="Share a concise note about how you use Verith."
                    rows={4}
                  />
                  <small>Up to 500 characters.</small>
                </label>
              </div>
            </fieldset>

            <fieldset className={styles.profileFieldset}>
              <legend>Regional experience</legend>
              <p>Keep language and time-based activity relevant to you.</p>
              <div className={styles.profileFormGrid}>
                <label>
                  <span>
                    <Languages aria-hidden="true" size={13} />
                    Preferred language
                  </span>
                  <input
                    defaultValue={record.preferredLanguage ?? "en"}
                    name="preferredLanguage"
                  />
                </label>
                <label>
                  <span>
                    <MapPin aria-hidden="true" size={13} />
                    Timezone
                  </span>
                  <input
                    defaultValue={record.timezone ?? "UTC"}
                    name="timezone"
                  />
                </label>
              </div>
            </fieldset>
          </div>

          {(profileMutation.isError || profileMutation.isSuccess) && (
            <p
              className={
                profileMutation.isError
                  ? styles.profileFormError
                  : styles.profileFormSuccess
              }
              role="status"
            >
              {profileMutation.isError
                ? profileMutation.error.message
                : "Your profile details are now up to date."}
            </p>
          )}
          <footer className={styles.profileFormFooter}>
            <span>Changes are saved to your real Verith account.</span>
            <button disabled={profileMutation.isPending} type="submit">
              {profileMutation.isPending ? "Saving profile…" : "Save profile"}
            </button>
          </footer>
        </form>

        <form
          className={styles.notificationSettingsCard}
          onSubmit={submitNotifications}
        >
          <header className={styles.settingsCardHeader}>
            <span>
              <BellRing aria-hidden="true" size={18} />
            </span>
            <div>
              <small>Notification delivery</small>
              <h2>Choose what deserves your attention</h2>
              <p>
                Control event categories first, then choose which connected
                channels may deliver them.
              </p>
            </div>
          </header>
          <div className={`mt-6 ${styles.preferenceList}`}>
            {notificationOptions.map(({ description, key, label, locked }) => (
              <label data-locked={locked || undefined} key={key}>
                <span>
                  <strong>
                    {label}
                    {locked && (
                      <em>
                        <LockKeyhole aria-hidden="true" size={11} />
                        Coming soon
                      </em>
                    )}
                  </strong>
                  <small>{description}</small>
                </span>
                <input
                  aria-label={`${label}${locked ? ", coming soon" : ""}`}
                  defaultChecked={
                    !locked && record.notificationPreferences[key] !== false
                  }
                  disabled={locked}
                  name={key}
                  role="switch"
                  type="checkbox"
                />
              </label>
            ))}
          </div>
          {(notificationsMutation.isError ||
            notificationsMutation.isSuccess) && (
            <p
              className={
                notificationsMutation.isError
                  ? styles.profileFormError
                  : styles.profileFormSuccess
              }
              role="status"
            >
              {notificationsMutation.isError
                ? notificationsMutation.error.message
                : "Your notification preferences are now up to date."}
            </p>
          )}
          <footer className={styles.profileFormFooter}>
            <span>
              Security alerts may remain essential for account safety.
            </span>
            <button disabled={notificationsMutation.isPending} type="submit">
              {notificationsMutation.isPending
                ? "Saving preferences…"
                : "Save notifications"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
