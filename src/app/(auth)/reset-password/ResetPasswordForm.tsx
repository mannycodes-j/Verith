"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authStyles as styles } from "@/components/auth/auth.styles";
import { ApiClientError } from "@/services/apiClient";
import { authService } from "@/services/authService";

const resetSchema = z
  .object({
    confirmPassword: z.string(),
    newPassword: z
      .string()
      .min(12, "Use at least 12 characters.")
      .max(128, "Password must be 128 characters or fewer."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetValues = z.infer<typeof resetSchema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const [complete, setComplete] = useState(false);
  const [tokenInvalid, setTokenInvalid] = useState(!token);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ResetValues>({
    defaultValues: { confirmPassword: "", newPassword: "" },
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = handleSubmit(async ({ newPassword }) => {
    setServerError(null);
    if (!token) {
      setTokenInvalid(true);
      return;
    }

    try {
      await authService.resetPassword({ newPassword, token });
      setComplete(true);
    } catch (error) {
      if (
        error instanceof ApiClientError &&
        error.code === "AUTH_TOKEN_INVALID"
      ) {
        setTokenInvalid(true);
        return;
      }
      setServerError(
        error instanceof ApiClientError
          ? error.message
          : "Verith could not reset the password.",
      );
    }
  });

  if (complete) {
    return (
      <>
        <header className={styles.formHeader}>
          <span>Recovery complete</span>
          <h2>Password updated.</h2>
          <p>Your existing sessions have been revoked for account safety.</p>
        </header>
        <div className={styles.successState} role="status">
          <strong>Secure reset complete</strong>
          <p>Use your new password to access the investigation workspace.</p>
        </div>
        <p className={styles.footerPrompt}>
          <Link href="/login">Continue to login</Link>
        </p>
      </>
    );
  }

  if (tokenInvalid) {
    return (
      <>
        <header className={styles.formHeader}>
          <span>Reset link unavailable</span>
          <h2>This link cannot be used.</h2>
          <p>
            The reset token is missing, invalid, expired, or has already been
            consumed.
          </p>
        </header>
        <div className={styles.notice} role="alert">
          Request a new password-reset link. Only the most recent valid link can
          be used.
        </div>
        <p className={styles.footerPrompt}>
          <Link href="/forgot-password">Request another link</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <header className={styles.formHeader}>
        <span>Choose credentials</span>
        <h2>Choose a new password.</h2>
        <p>
          The reset link is single-use. Completing this action revokes existing
          sessions.
        </p>
      </header>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="reset-password">New password</label>
          <input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.newPassword)}
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className={styles.fieldError}>{errors.newPassword.message}</p>
          ) : (
            <p className={styles.fieldHint}>Use at least 12 characters.</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="confirm-password">Confirm new password</label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.fieldError}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {serverError && (
          <div className={styles.serverError} role="alert">
            {serverError}
          </div>
        )}
        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Updating password…" : "Update password"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </>
  );
}
