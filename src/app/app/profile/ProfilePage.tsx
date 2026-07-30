"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { accountService, type UserProfile } from "@/services/account";
import { uploadService } from "@/services/uploads";
import { profileStyles as styles } from "./profile.styles";

export default function ProfilePage() {
  const queryClient = useQueryClient();
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
      queryClient.setQueryData(["profile"], next as UserProfile);
      setFile(undefined);
      setProgress(0);
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

  return (
    <div className={styles.page}>
      <header>
        <span>Account / Profile</span>
        <div
          aria-label={record.avatar ? `${name}'s avatar` : undefined}
          className={styles.avatar}
          role={record.avatar ? "img" : undefined}
          style={
            record.avatar
              ? { backgroundImage: `url("${record.avatar.replaceAll('"', "%22")}")` }
              : undefined
          }
        >
          {!record.avatar && name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1>{name}</h1>
          <p>@{record.username}</p>
        </div>
      </header>
      <section className={styles.identity}>
        <dl>
          <div>
            <dt>Email</dt>
            <dd>{record.email}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{String(record.role ?? "USER").replaceAll("_", " ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{String(record.status ?? "UNKNOWN").replaceAll("_", " ")}</dd>
          </div>
          <div>
            <dt>Language</dt>
            <dd>{record.preferredLanguage ?? "en"}</dd>
          </div>
        </dl>
        <p>{record.bio || "No profile biography has been added."}</p>
        <Link href="/app/settings">Edit profile details</Link>
      </section>
      <section className={styles.upload}>
        <div>
          <span>Avatar upload</span>
          <h2>Update account image.</h2>
          <p>
            The backend supplies the accepted formats and maximum size when the
            signed upload begins. The confirmed asset is attached to this
            account.
          </p>
        </div>
        <div>
          <label>
            <span>Select image</span>
            <input
              accept="image/*"
              onChange={(event) => {
                setFile(event.target.files?.[0]);
                setProgress(0);
                avatar.reset();
              }}
              type="file"
            />
          </label>
          {file && (
            <p>
              {file.name} · {Math.ceil(file.size / 1024)} KB
            </p>
          )}
          {avatar.isPending && (
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
          )}
          {avatar.isError && (
            <p className={styles.uploadError} role="alert">
              {avatar.error.message}
            </p>
          )}
          {avatar.isSuccess && (
            <p className={styles.success} role="status">
              Avatar updated.
            </p>
          )}
          <button
            disabled={!file || avatar.isPending}
            onClick={() => avatar.mutate()}
            type="button"
          >
            {avatar.isPending ? "Uploading avatar…" : "Upload avatar"}
          </button>
        </div>
      </section>
    </div>
  );
}
