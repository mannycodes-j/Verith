"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import type { FormEvent } from "react";
import { accountService, type UserProfile } from "@/services/account";
import { settingsStyles as styles } from "./settings.styles";

const notificationOptions = [
  ["verificationComplete", "Completed investigations"],
  ["verificationFailed", "Failed investigations"],
  ["learningRecommendations", "Learning recommendations"],
  ["dailyChallenges", "Daily challenges"],
  ["streakReminders", "Streak reminders"],
  ["gamification", "Achievements and level changes"],
  ["marketing", "Product messages"],
  ["emailEnabled", "Email delivery"],
  ["whatsappEnabled", "WhatsApp delivery"],
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

  const record = profile.data as UserProfile;
  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    profileMutation.mutate({
      bio: String(data.get("bio") ?? ""),
      displayName: String(data.get("displayName") ?? ""),
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      preferredLanguage: String(data.get("preferredLanguage") ?? "en"),
      theme: String(data.get("theme") ?? "system"),
      timezone: String(data.get("timezone") ?? "UTC"),
    });
  };
  const submitNotifications = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    notificationsMutation.mutate(
      Object.fromEntries(
        notificationOptions.map(([key]) => [key, data.has(key)]),
      ),
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Account: Preferences</span>
        <h1>Settings.</h1>
        <p>
          Manage the identity, delivery preferences, privacy, and security
          attached to your Verith account.
        </p>
      </header>

      <nav className={styles.settingsNav} aria-label="Settings sections">
        <span>Profile</span>
        <Link href="/app/settings/privacy">Privacy and data</Link>
        <Link href="/app/settings/security">Password and sessions</Link>
        <Link href="/app/settings/whatsapp">WhatsApp</Link>
      </nav>

      <form className={styles.formSection} onSubmit={submitProfile}>
        <header>
          <span>Profile</span>
          <h2>Account identity.</h2>
        </header>
        <div className={styles.formGrid}>
          <label>
            <span>Display name</span>
            <input defaultValue={record.displayName ?? ""} name="displayName" />
          </label>
          <label>
            <span>Username</span>
            <input disabled value={record.username} />
          </label>
          <label>
            <span>First name</span>
            <input defaultValue={record.firstName ?? ""} name="firstName" />
          </label>
          <label>
            <span>Last name</span>
            <input defaultValue={record.lastName ?? ""} name="lastName" />
          </label>
          <label className={styles.fullField}>
            <span>Bio</span>
            <textarea
              defaultValue={record.bio ?? ""}
              maxLength={500}
              name="bio"
              rows={4}
            />
          </label>
          <label>
            <span>Language</span>
            <input
              defaultValue={record.preferredLanguage ?? "en"}
              name="preferredLanguage"
            />
          </label>
          <label>
            <span>Timezone</span>
            <input defaultValue={record.timezone ?? "UTC"} name="timezone" />
          </label>
          <label>
            <span>Theme</span>
            <select defaultValue={record.theme ?? "system"} name="theme">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        {(profileMutation.isError || profileMutation.isSuccess) && (
          <p
            className={
              profileMutation.isError ? styles.formError : styles.formSuccess
            }
            role="status"
          >
            {profileMutation.isError
              ? profileMutation.error.message
              : "Profile settings saved."}
          </p>
        )}
        <button disabled={profileMutation.isPending} type="submit">
          {profileMutation.isPending ? "Saving profile…" : "Save profile"}
        </button>
      </form>

      <form className={styles.formSection} onSubmit={submitNotifications}>
        <header>
          <span>Notifications</span>
          <h2>Delivery preferences.</h2>
        </header>
        <div className={styles.preferenceList}>
          {notificationOptions.map(([key, label]) => (
            <label key={key}>
              <span>
                <strong>{label}</strong>
                <small>{key.replaceAll(/([A-Z])/g, " $1").toLowerCase()}</small>
              </span>
              <input
                defaultChecked={record.notificationPreferences[key] !== false}
                name={key}
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
                ? styles.formError
                : styles.formSuccess
            }
            role="status"
          >
            {notificationsMutation.isError
              ? notificationsMutation.error.message
              : "Notification preferences saved."}
          </p>
        )}
        <button disabled={notificationsMutation.isPending} type="submit">
          {notificationsMutation.isPending
            ? "Saving preferences…"
            : "Save notification preferences"}
        </button>
      </form>
    </div>
  );
}
