"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { authStyles as styles } from "@/components/auth/auth.styles";
import { startVerificationResendCooldown } from "@/lib/verificationCooldown";
import { ApiClientError } from "@/services/apiClient";
import { authService } from "@/services/authService";

const passwordRequirementChecks = [
  {
    label: "At least 12 characters",
    test: (value: string) => value.length >= 12,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  { label: "One number", test: (value: string) => /[0-9]/.test(value) },
  {
    label: "One special character",
    test: (value: string) => /[^a-zA-Z0-9]/.test(value),
  },
] as const;

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters.")
  .max(128, "Password must be 128 characters or fewer.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character.",
  );

const registerSchema = z
  .object({
    confirmPassword: z.string().min(1, "Confirm your password."),
    displayName: z
      .string()
      .trim()
      .max(80, "Display name must be 80 characters or fewer.")
      .optional(),
    email: z.email("Enter a valid email address."),
    password: passwordSchema,
    username: z
      .string()
      .trim()
      .regex(
        /^[a-zA-Z0-9_]{3,30}$/,
        "Use 3–30 letters, numbers, or underscores.",
      ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [deliveryState, setDeliveryState] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValues>({
    defaultValues: {
      confirmPassword: "",
      displayName: "",
      email: "",
      password: "",
      username: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = useWatch({ control, name: "password" }) || "";
  const passwordRequirements = passwordRequirementChecks.map(
    (requirement) => ({
      label: requirement.label,
      met: requirement.test(passwordValue),
    }),
  );

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const result = await authService.register({
        email: values.email,
        password: values.password,
        username: values.username,
        displayName: values.displayName || undefined,
      });
      if (result.emailDelivery.state === "OPERATIONAL") {
        startVerificationResendCooldown();
      }
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
        <span>Create your Verith workspace</span>
        <h2>Build a personal record of evidence-informed decisions.</h2>
        <p>
          Save investigations, revisit transparent reports, and turn every
          verification into media-literacy progress.
        </p>
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
          <div className={styles.passwordControl}>
            <input
              id="new-password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "register-password-error register-password-requirements"
                  : "register-password-requirements"
              }
              {...register("password")}
            />
            <button
              aria-controls="new-password"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              aria-pressed={passwordVisible}
              className={styles.passwordToggle}
              onClick={() => setPasswordVisible((visible) => !visible)}
              onMouseDown={(event) => event.preventDefault()}
              type="button"
            >
              {passwordVisible ? (
                <EyeOff aria-hidden="true" size={18} />
              ) : (
                <Eye aria-hidden="true" size={18} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className={styles.fieldError} id="register-password-error">
              {errors.password.message}
            </p>
          )}
          <div
            className={styles.passwordRequirements}
            id="register-password-requirements"
          >
            <p id="register-password-requirements-title">
              Password must contain:
            </p>
            <ul aria-labelledby="register-password-requirements-title">
              {passwordRequirements.map((requirement) => (
                <li data-met={requirement.met} key={requirement.label}>
                  {requirement.met ? (
                    <CheckCircle2
                      aria-hidden="true"
                      className="text-violet-300"
                      size={17}
                    />
                  ) : (
                    <Circle
                      aria-hidden="true"
                      className="text-white/25"
                      size={17}
                    />
                  )}
                  <span>{requirement.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="confirm-password">Confirm password</label>
          <div className={styles.passwordControl}>
            <input
              id="confirm-password"
              type={confirmPasswordVisible ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "register-confirm-password-error"
                  : undefined
              }
              {...register("confirmPassword")}
            />
            <button
              aria-controls="confirm-password"
              aria-label={
                confirmPasswordVisible
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={confirmPasswordVisible}
              className={styles.passwordToggle}
              onClick={() =>
                setConfirmPasswordVisible((visible) => !visible)
              }
              onMouseDown={(event) => event.preventDefault()}
              type="button"
            >
              {confirmPasswordVisible ? (
                <EyeOff aria-hidden="true" size={18} />
              ) : (
                <Eye aria-hidden="true" size={18} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p
              className={styles.fieldError}
              id="register-confirm-password-error"
            >
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
