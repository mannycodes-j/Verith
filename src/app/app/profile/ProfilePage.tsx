"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AtSign,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Globe2,
  ImagePlus,
  Languages,
  Mail,
  PencilLine,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { accountService } from "@/services/account";
import { uploadService } from "@/services/uploads";
import { profileStyles as styles } from "./profile.styles";

function formatDate(value?: string) {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Not available"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const profile = useQuery({
    queryFn: accountService.profile,
    queryKey: ["profile"],
  });
  const avatar = useMutation({
    mutationFn: () => {
      if (!file) throw new Error("Select an avatar image first.");
      return uploadService.uploadAvatar({ file, onProgress: setProgress });
    },
    onSuccess: ({ profile: next }) => {
      queryClient.setQueryData(["profile"], next);
      setFile(undefined);
      setProgress(0);
      if (fileInput.current) fileInput.current.value = "";
    },
  });

  if (profile.isPending) {
    return <div className={styles.state}>Opening profile…</div>;
  }
  if (profile.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Profile unavailable</span>
        <h1>Your profile could not be loaded.</h1>
        <p>{profile.error.message}</p>
        <button type="button" onClick={() => void profile.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = profile.data;
  const name = record.displayName || record.username;
  const avatarUrl = record.avatar?.trim();
  const role = String(record.role ?? "USER").replaceAll("_", " ");
  const status = String(record.status ?? "UNKNOWN").replaceAll("_", " ");
  const accountDetails = [
    { icon: Mail, label: "Email address", value: record.email },
    { icon: AtSign, label: "Username", value: `@${record.username}` },
    { icon: ShieldCheck, label: "Account role", value: role },
    { icon: CheckCircle2, label: "Account status", value: status },
    {
      icon: Languages,
      label: "Preferred language",
      value: record.preferredLanguage ?? "English",
    },
    {
      icon: Clock3,
      label: "Timezone",
      value: record.timezone ?? "Not configured",
    },
    {
      icon: CalendarDays,
      label: "Member since",
      value: formatDate(record.createdAt),
    },
    {
      icon: Globe2,
      label: "Email verification",
      value: record.emailVerifiedAt ? "Verified" : "Not verified",
    },
  ] as const;
  const avatarStyle = avatarUrl
    ? { backgroundImage: `url(${JSON.stringify(avatarUrl)})` }
    : undefined;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Your Verith identity</span>
        <h1>A profile built around your investigation workspace.</h1>
        <p>
          Keep your account identity recognizable, your preferences accurate,
          and your profile image current across every Verith surface.
        </p>
      </header>

      <section className={styles.hero} aria-labelledby="profile-name">
        <div
          aria-label={avatarUrl ? `${name}'s avatar` : undefined}
          className={styles.avatar}
          role={avatarUrl ? "img" : undefined}
          style={avatarStyle}
        >
          {!avatarUrl && name.slice(0, 1).toUpperCase()}
        </div>
        <div className={styles.heroIdentity}>
          <span>
            <UserRound aria-hidden="true" size={13} />
            Account profile
          </span>
          <h2 id="profile-name">{name}</h2>
          <p className={styles.username}>@{record.username}</p>
          <p className={styles.bio}>
            {record.bio ||
              "Add a short profile statement to make this workspace feel unmistakably yours."}
          </p>
          <div className={styles.heroActions}>
            <Link href="/app/settings">
              <PencilLine aria-hidden="true" size={15} />
              Edit profile
            </Link>
            <Link href="/app/settings/security">
              <ShieldCheck aria-hidden="true" size={15} />
              Security
            </Link>
          </div>
        </div>
        <div className={styles.heroStatus}>
          <span data-tone={record.status === "ACTIVE" ? "positive" : "neutral"}>
            <CheckCircle2 aria-hidden="true" size={14} />
            {status}
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={14} />
            {role}
          </span>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.details} aria-labelledby="account-details">
          <header className={styles.panelHeader}>
            <span>
              <UserRound aria-hidden="true" size={16} />
            </span>
            <div>
              <small>Account record</small>
              <h2 id="account-details">Your profile details</h2>
              <p>Identity and regional preferences returned by your account.</p>
            </div>
          </header>
          <dl className={styles.detailGrid}>
            {accountDetails.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <span>
                  <Icon aria-hidden="true" size={16} />
                </span>
                <div>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.upload} aria-labelledby="profile-photo">
          <header className={styles.panelHeader}>
            <span>
              <Camera aria-hidden="true" size={16} />
            </span>
            <div>
              <small>Profile photo</small>
              <h2 id="profile-photo">Keep your account recognizable</h2>
              <p>
                Select an image and Verith will validate it against the live
                provider rules before securely attaching it to your account.
              </p>
            </div>
          </header>

          <div className={styles.photoPreview}>
            <div aria-hidden="true" style={avatarStyle}>
              {!avatarUrl && name.slice(0, 1).toUpperCase()}
            </div>
            <span>
              <strong>Current account image</strong>
              <small>Shown in your workspace navigation and profile.</small>
            </span>
          </div>

          <label className={styles.filePicker}>
            <input
              accept="image/*"
              onChange={(event) => {
                setFile(event.target.files?.[0]);
                setProgress(0);
                avatar.reset();
              }}
              ref={fileInput}
              type="file"
            />
            <span>
              <ImagePlus aria-hidden="true" size={20} />
            </span>
            <strong>
              {file ? "Choose a different image" : "Choose an image"}
            </strong>
            <small>Image requirements are checked before upload.</small>
          </label>

          {file && (
            <div className={styles.selectedFile}>
              <CheckCircle2 aria-hidden="true" size={16} />
              <span>
                <strong>{file.name}</strong>
                <small>{Math.ceil(file.size / 1024)} KB ready to upload</small>
              </span>
            </div>
          )}
          {avatar.isPending && (
            <div className={styles.progressGroup}>
              <div>
                <span>Uploading securely</span>
                <strong>{progress}%</strong>
              </div>
              <div
                aria-label={`Avatar upload ${progress}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={progress}
                className={styles.progress}
                role="progressbar"
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          {avatar.isError && (
            <p className={styles.uploadError} role="alert">
              {avatar.error.message}
            </p>
          )}
          {avatar.isSuccess && (
            <p className={styles.success} role="status">
              Profile image updated across your workspace.
            </p>
          )}
          <button
            disabled={!file || avatar.isPending}
            onClick={() => avatar.mutate()}
            type="button"
          >
            <Camera aria-hidden="true" size={16} />
            {avatar.isPending ? "Uploading image…" : "Update profile image"}
          </button>
        </section>
      </div>
    </div>
  );
}
