"use client";

import { useQuery } from "@tanstack/react-query";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiClientError } from "@/services/apiClient";
import { authService, type GoogleAuthIntent } from "@/services/authService";
import { authStyles as styles } from "./auth.styles";

interface GoogleCredentialResponse {
	credential?: string;
}

interface GoogleIdentityApi {
	initialize(options: { client_id: string; callback(response: GoogleCredentialResponse): void }): void;
	renderButton(
		parent: HTMLElement,
		options: {
			type: "standard";
			shape: "pill";
			theme: "filled_black";
			text: "signin_with" | "signup_with";
			size: "medium";
			logo_alignment: "left";
			width: number;
			locale: "en";
		},
	): void;
}

declare global {
	interface Window {
		google?: { accounts: { id: GoogleIdentityApi } };
	}
}

const googleErrors: Record<string, string> = {
	ACCOUNT_NOT_ACTIVE: "This account is currently unavailable. Contact support for assistance.",
	GOOGLE_ACCOUNT_ALREADY_EXISTS: "This Google account already has a Verith workspace. Use Google on the login page.",
	GOOGLE_ACCOUNT_NOT_FOUND: "No Google-created Verith account was found. Create one from the registration page first.",
	GOOGLE_CREDENTIAL_INVALID: "Google could not verify that sign-in response. Please try again.",
	GOOGLE_EMAIL_ALREADY_REGISTERED: "That email already belongs to a password account. Sign in with email and password.",
	GOOGLE_IDENTITY_INCOMPLETE: "Google did not provide a verified email identity for this account.",
	USE_PASSWORD_SIGN_IN: "This account was created with email and password. Use the password login form.",
};

export default function GoogleAuthButton({ intent }: { intent: GoogleAuthIntent }) {
	const router = useRouter();
	const buttonRef = useRef<HTMLDivElement>(null);
	const [scriptReady, setScriptReady] = useState(false);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const configuration = useQuery({
		queryFn: authService.googleConfiguration,
		queryKey: ["auth", "google", "configuration"],
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const authenticate = useCallback(
		async (response: GoogleCredentialResponse) => {
			if (!response.credential) {
				setError("Google did not return a usable identity credential.");
				return;
			}
			setError(null);
			setPending(true);
			try {
				await authService.googleAuthenticate(response.credential, intent);
				router.replace("/app");
				router.refresh();
			} catch (reason) {
				setError(reason instanceof ApiClientError ? (googleErrors[reason.code] ?? reason.message) : "Verith could not complete Google authentication.");
			} finally {
				setPending(false);
			}
		},
		[intent, router],
	);

	useEffect(() => {
		const clientId = configuration.data?.clientId;
		const google = window.google?.accounts.id;
		const target = buttonRef.current;
		if (!scriptReady || !clientId || !google || !target) return;

		target.replaceChildren();
		google.initialize({ client_id: clientId, callback: authenticate });
		google.renderButton(target, {
			type: "standard",
			shape: "pill",
			theme: "filled_black",
			text: intent === "REGISTER" ? "signup_with" : "signin_with",
			size: "medium",
			logo_alignment: "left",
			width: Math.min(400, Math.max(120, Math.floor(target.getBoundingClientRect().width || 400))),
			locale: "en",
		});
	}, [authenticate, configuration.data?.clientId, intent, scriptReady]);

	const unavailable = configuration.isError || (configuration.data && !configuration.data.enabled);

	return (
		<section className={styles.providerAuth} aria-busy={pending}>
			{configuration.data?.enabled && <Script onReady={() => setScriptReady(true)} src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />}
			<div className={styles.providerButton} ref={buttonRef} />
			{(configuration.isPending || pending) && (
				<p className={styles.providerStatus} role="status">
					{pending ? "Establishing your secure Google session…" : "Preparing Google authentication…"}
				</p>
			)}
			{unavailable && (
				<p className={styles.providerStatus} role="status">
					Google authentication is not configured for this environment.
				</p>
			)}
			{error && (
				<div className={styles.serverError} role="alert">
					{error}
				</div>
			)}
			<div className={styles.providerDivider}>
				<span>Or continue with email</span>
			</div>
		</section>
	);
}
