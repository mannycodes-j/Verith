"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authStyles as styles } from "@/components/auth/auth.styles";
import { ApiClientError } from "@/services/apiClient";
import { authService } from "@/services/authService";

const resendSchema = z.object({
  email: z.email("Enter a valid email address."),
});

type ResendValues = z.infer<typeof resendSchema>;
type VerificationState = "idle" | "verifying" | "verified" | "invalid";

export default function VerifyEmailForm({ token }: { token: string }) {
  const attempted = useRef(false);
  const [state, setState] = useState<VerificationState>(
    token ? "verifying" : "idle",
  );
  const [resendComplete, setResendComplete] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ResendValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(resendSchema),
  });

  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;

    void authService
      .verifyEmail(token)
      .then(() => setState("verified"))
      .catch(() => setState("invalid"));
  }, [token]);

  const onResend = handleSubmit(async ({ email }) => {
    setServerError(null);
    try {
      await authService.resendVerification(email);
      setResendComplete(true);
    } catch (error) {
      setServerError(
        error instanceof ApiClientError
          ? error.message
          : "Verith could not submit the verification request.",
      );
    }
  });

  if (state === "verifying") {
    return (
      <>
        <header className={styles.formHeader}>
          <span>Verifying identity</span>
          <h2>Checking your link.</h2>
          <p role="status">
            Verith is validating this single-use verification token.
          </p>
        </header>
      </>
    );
  }

  if (state === "verified") {
    return (
      <>
        <header className={styles.formHeader}>
          <span>Identity verified</span>
          <h2>Email confirmed.</h2>
          <p>Your account can now access the Verith workspace.</p>
        </header>
        <div className={styles.successState} role="status">
          <strong>Verification complete</strong>
          <p>The single-use token has been consumed securely.</p>
        </div>
        <p className={styles.footerPrompt}>
          <Link href="/login">Continue to login</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <header className={styles.formHeader}>
        <span>{state === "invalid" ? "Link unavailable" : "Verify identity"}</span>
        <h2>
          {state === "invalid"
            ? "This link cannot be used."
            : "Resend verification."}
        </h2>
        <p>
          {state === "invalid"
            ? "The verification token is invalid, expired, or already consumed."
            : "Enter your account email to request another verification message."}
        </p>
      </header>
      {resendComplete ? (
        <div className={styles.successState} role="status">
          <strong>Request accepted</strong>
          <p>
            If the account is awaiting verification, Verith will send a new
            link.
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onResend} noValidate>
          <div className={styles.field}>
            <label htmlFor="verification-email">Email address</label>
            <input
              id="verification-email"
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
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Submitting…" : "Resend verification"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
      )}
      <p className={styles.footerPrompt}>
        <Link href="/login">Return to login</Link>
      </p>
    </>
  );
}
