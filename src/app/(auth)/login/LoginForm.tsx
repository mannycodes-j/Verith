"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authStyles as styles } from "@/components/auth/auth.styles";
import { ApiClientError } from "@/services/apiClient";
import { authService } from "@/services/authService";

const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email address or username."),
  password: z.string().min(1, "Enter your password."),
});

type LoginValues = z.infer<typeof loginSchema>;

const errorMessages: Record<string, string> = {
  ACCOUNT_NOT_ACTIVE:
    "This account is unavailable. Contact support if you believe this is an error.",
  EMAIL_VERIFICATION_REQUIRED:
    "Verify your email address before logging in.",
  INVALID_CREDENTIALS: "The email, username, or password is incorrect.",
};

export default function LoginForm({
  sessionExpired = false,
}: {
  sessionExpired?: boolean;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginValues>({
    defaultValues: { identifier: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setVerificationRequired(false);

    try {
      await authService.login(values);
      router.replace("/app");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setVerificationRequired(error.code === "EMAIL_VERIFICATION_REQUIRED");
        setServerError(errorMessages[error.code] ?? error.message);
        return;
      }
      setServerError("Verith could not complete the login request.");
    }
  });

  return (
    <>
      <header className={styles.formHeader}>
        <span>Workspace access</span>
        <h2>Return to your evidence workspace.</h2>
        <p>
          Continue active investigations, revisit source-backed reports, and
          keep building your media-literacy practice.
        </p>
      </header>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        {sessionExpired && (
          <div className={styles.notice} role="status">
            Your session ended or could not be restored. Log in again to
            continue.
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="identifier">Email or username</label>
          <input
            id="identifier"
            autoComplete="username"
            aria-invalid={Boolean(errors.identifier)}
            aria-describedby={
              errors.identifier ? "identifier-error" : undefined
            }
            {...register("identifier")}
          />
          {errors.identifier && (
            <p className={styles.fieldError} id="identifier-error">
              {errors.identifier.message}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordControl}>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <button
              aria-controls="password"
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
            <p className={styles.fieldError} id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className={styles.formMeta}>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
        {serverError && (
          <div className={styles.serverError} role="alert">
            {serverError}
            {verificationRequired && (
              <>
                {" "}
                <Link href="/verify-email">Verify or resend email</Link>
              </>
            )}
          </div>
        )}
        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Authenticating…" : "Enter workspace"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className={styles.footerPrompt}>
        New to Verith? <Link href="/register">Create an account</Link>
      </p>
    </>
  );
}
