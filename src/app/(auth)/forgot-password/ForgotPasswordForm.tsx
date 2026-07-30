"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authStyles as styles } from "@/components/auth/auth.styles";
import { ApiClientError } from "@/services/apiClient";
import { authService } from "@/services/authService";

const recoverySchema = z.object({
  email: z.email("Enter a valid email address."),
});

type RecoveryValues = z.infer<typeof recoverySchema>;

export default function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RecoveryValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    setServerError(null);
    try {
      await authService.forgotPassword(email);
      setSubmittedEmail(email);
    } catch (error) {
      setServerError(
        error instanceof ApiClientError
          ? error.message
          : "Verith could not submit the recovery request.",
      );
    }
  });

  if (submittedEmail) {
    return (
      <>
        <header className={styles.formHeader}>
          <span>Recovery requested</span>
          <h2>Check your inbox.</h2>
          <p>
            If an account exists for {submittedEmail}, Verith will send a
            password-reset link.
          </p>
        </header>
        <div className={styles.successState} role="status">
          <strong>Request accepted</strong>
          <p>
            For privacy, Verith does not reveal whether an email address is
            registered.
          </p>
        </div>
        <p className={styles.footerPrompt}>
          <Link href="/login">Return to login</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <header className={styles.formHeader}>
        <span>Account recovery</span>
        <h2>Reset your password.</h2>
        <p>
          Enter your account email. If it is registered, a single-use reset
          link will be sent.
        </p>
      </header>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="recovery-email">Email address</label>
          <input
            id="recovery-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.fieldError}>{errors.email.message}</p>
          )}
        </div>
        {serverError && (
          <div className={styles.serverError} role="alert">
            {serverError}
          </div>
        )}
        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Submitting…" : "Request reset link"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className={styles.footerPrompt}>
        Remembered your password? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
