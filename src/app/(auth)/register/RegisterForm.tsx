"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authStyles as styles } from "@/components/auth/auth.styles";
import { ApiClientError } from "@/services/apiClient";
import { authService } from "@/services/authService";

const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .max(80, "Display name must be 80 characters or fewer.")
    .optional(),
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(12, "Use at least 12 characters.")
    .max(128, "Password must be 128 characters or fewer."),
  username: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9_]{3,30}$/,
      "Use 3–30 letters, numbers, or underscores.",
    ),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [deliveryState, setDeliveryState] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValues>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const result = await authService.register({
        ...values,
        displayName: values.displayName || undefined,
      });
      setDeliveryState(result.emailDelivery.state);
      setRegisteredEmail(values.email);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setServerError(
          error.code === "USER_ALREADY_EXISTS"
            ? "An account already uses that email address or username."
            : error.message,
        );
        return;
      }
      setServerError("Verith could not create the account.");
    }
  });

  if (registeredEmail) {
    const deliveryUnavailable = deliveryState !== "OPERATIONAL";
    return (
      <>
        <header className={styles.formHeader}>
          <span>Verify identity</span>
          <h2>Check your email.</h2>
          <p>Your account was created for {registeredEmail}.</p>
        </header>
        <div className={styles.successState} role="status">
          <strong>
            {deliveryUnavailable
              ? "Verification delivery unavailable"
              : "Verification sent"}
          </strong>
          <p>
            {deliveryUnavailable
              ? "The account exists, but the email provider could not deliver the verification message. Use the resend screen or contact support."
              : "Open the verification link in the email before signing in."}
          </p>
        </div>
        <p className={styles.footerPrompt}>
          <Link href="/verify-email">Verify or resend email</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <header className={styles.formHeader}>
        <span>Create identity</span>
        <h2>Begin with evidence.</h2>
        <p>Create a secure account for saved investigations and reports.</p>
      </header>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="displayName">Display name (optional)</label>
          <input
            id="displayName"
            autoComplete="name"
            aria-invalid={Boolean(errors.displayName)}
            {...register("displayName")}
          />
          {errors.displayName && (
            <p className={styles.fieldError}>{errors.displayName.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.fieldError}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            {...register("username")}
          />
          {errors.username ? (
            <p className={styles.fieldError}>{errors.username.message}</p>
          ) : (
            <p className={styles.fieldHint}>
              3–30 letters, numbers, or underscores.
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="new-password">Password</label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <p className={styles.fieldError}>{errors.password.message}</p>
          ) : (
            <p className={styles.fieldHint}>Use at least 12 characters.</p>
          )}
        </div>
        {serverError && (
          <div className={styles.serverError} role="alert">
            {serverError}
          </div>
        )}
        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Creating account…" : "Create account"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className={styles.footerPrompt}>
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
