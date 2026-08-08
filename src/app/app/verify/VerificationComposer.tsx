"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { ApiClientError } from "@/services/apiClient";
import { uploadService, type AssetType, UploadError } from "@/services/uploads";
import { verificationService, type CreateVerificationInput } from "@/services/verification";
import { INVESTIGATION_SOURCE_OPTIONS as sourceTypes } from "@/data/verification";
import type { InvestigationSourceType as SourceType } from "@/types/verification-ui";
import { verifyStyles as styles } from "./verify.styles";
import { uploadFailureMessage } from "@/services/uploadFailure";

const composerSchema = z
	.object({
		question: z.string().trim().max(1000, "Question must be 1,000 characters or fewer."),
		mode: z.enum(["STANDARD", "GUIDED"]),
		sourceType: z.enum(["TEXT", "URL", "IMAGE", "SCREENSHOT", "AUDIO", "VIDEO"]),
		text: z.string().trim().max(50000),
		title: z.string().trim().max(200, "Title must be 200 characters or fewer."),
		url: z.union([z.literal(""), z.url("Enter a complete http or https URL.")]),
		visibility: z.enum(["PRIVATE", "UNLISTED", "PUBLIC"]),
	})
	.superRefine((values, context) => {
		if (values.sourceType === "TEXT" && values.text.length === 0) {
			context.addIssue({
				code: "custom",
				message: "Enter the claim, headline, or article excerpt.",
				path: ["text"],
			});
		}
		if (values.sourceType === "URL" && values.url.length === 0) {
			context.addIssue({
				code: "custom",
				message: "Enter the source URL.",
				path: ["url"],
			});
		}
	});

type ComposerValues = z.infer<typeof composerSchema>;
const DRAFT_KEY = "verith:investigation-draft:v1";

export default function VerificationComposer({ initialSourceType = "TEXT" }: { initialSourceType?: SourceType }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const idempotencyKey = useRef(crypto.randomUUID());
	const [sourceType, setSourceType] = useState<SourceType>(initialSourceType);
	const [mediaFile, setMediaFile] = useState<File | null>(null);
	const [mediaError, setMediaError] = useState<string | null>(null);
	const [allowanceError, setAllowanceError] = useState<string | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [online, setOnline] = useState(true);
	const [draftReady, setDraftReady] = useState(false);
	const allowance = useQuery({
		queryKey: ["investigation-allowance"],
		queryFn: () => verificationService.allowance(),
		staleTime: 30_000,
	});
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
		setValue,
		control,
	} = useForm<ComposerValues>({
		defaultValues: {
			question: "",
			mode: "STANDARD",
			sourceType: initialSourceType,
			text: "",
			title: "",
			url: "",
			visibility: "PRIVATE",
		},
		resolver: zodResolver(composerSchema),
	});
	const draftValues = useWatch({ control });

	useEffect(() => {
		const handleOnline = () => setOnline(true);
		const handleOffline = () => setOnline(false);
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		const initializationFrame = window.requestAnimationFrame(() => {
			setOnline(navigator.onLine);
			try {
				const stored = window.sessionStorage.getItem(DRAFT_KEY);
				if (stored) {
					const draft = JSON.parse(stored) as Partial<ComposerValues>;
					if (draft.sourceType && sourceTypes.some((item) => item.value === draft.sourceType)) {
						setSourceType(draft.sourceType);
						reset({
							mode: draft.mode === "GUIDED" ? "GUIDED" : "STANDARD",
							question: typeof draft.question === "string" ? draft.question : "",
							sourceType: draft.sourceType,
							text: typeof draft.text === "string" ? draft.text : "",
							title: typeof draft.title === "string" ? draft.title : "",
							url: typeof draft.url === "string" ? draft.url : "",
							visibility: ["PRIVATE", "UNLISTED", "PUBLIC"].includes(draft.visibility ?? "") ? draft.visibility : "PRIVATE",
						});
					}
				}
			} catch {
				window.sessionStorage.removeItem(DRAFT_KEY);
			}
			setDraftReady(true);
		});
		return () => {
			window.cancelAnimationFrame(initializationFrame);
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, [reset]);

	useEffect(() => {
		if (!draftReady) return;
			try {
				window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draftValues));
			} catch {
				// Draft persistence is best-effort and never blocks investigation.
			}
	}, [draftReady, draftValues]);

	const createVerification = useMutation({
		mutationFn: async ({ file, input }: { file?: File; input: CreateVerificationInput }) => {
			if (!file) {
				return verificationService.create(input, idempotencyKey.current);
			}
			const assetTypeBySource: Record<"IMAGE" | "SCREENSHOT" | "AUDIO" | "VIDEO", Extract<AssetType, "VERIFICATION_IMAGE" | "VERIFICATION_SCREENSHOT" | "VERIFICATION_AUDIO" | "VERIFICATION_VIDEO">> = {
				AUDIO: "VERIFICATION_AUDIO",
				IMAGE: "VERIFICATION_IMAGE",
				SCREENSHOT: "VERIFICATION_SCREENSHOT",
				VIDEO: "VERIFICATION_VIDEO",
			};
			const mediaSource = input.sourceType as "IMAGE" | "SCREENSHOT" | "AUDIO" | "VIDEO";
			const asset = await uploadService.uploadVerificationMedia({
				assetType: assetTypeBySource[mediaSource],
				file,
				onProgress: setUploadProgress,
			});
			try {
				return await verificationService.create({ ...input, mediaAssetId: asset.id }, idempotencyKey.current);
			} catch (error) {
				await uploadService.remove(asset.id).catch(() => undefined);
				throw error;
			}
		},
		onSuccess: (record) => {
			window.sessionStorage.removeItem(DRAFT_KEY);
			idempotencyKey.current = crypto.randomUUID();
			setUploadProgress(null);
			void queryClient.invalidateQueries({ queryKey: ["investigation-allowance"] });
			router.push(`/app/verifications/${record.id}`);
		},
		onError: () => setUploadProgress(null),
	});

	const chooseSourceType = (nextType: SourceType) => {
		setSourceType(nextType);
		setValue("sourceType", nextType, { shouldValidate: true });
		setMediaFile(null);
		setMediaError(null);
		setAllowanceError(null);
		setUploadProgress(null);
		createVerification.reset();
	};

	const onSubmit = handleSubmit((values) => {
		const currentAllowance = allowance.data;
		const costKey = values.sourceType === "URL" ? "link" : values.sourceType.toLowerCase() as keyof NonNullable<typeof currentAllowance>["costs"];
		const submissionCost = currentAllowance?.costs[costKey];
		if (currentAllowance && submissionCost !== undefined && currentAllowance.remaining < submissionCost) {
			setAllowanceError(`This ${values.sourceType.toLowerCase()} investigation needs ${submissionCost} ${submissionCost === 1 ? "attempt" : "attempts"}, but you have ${currentAllowance.remaining} remaining today.`);
			return;
		}
		setAllowanceError(null);
		const shared = {
			mode: values.mode,
			question: values.question || undefined,
			requestedLanguage: "en",
			title: values.title || undefined,
			visibility: values.visibility,
		};
		let input: CreateVerificationInput;
		if (values.sourceType === "TEXT") {
			input = { ...shared, sourceType: "TEXT", text: values.text };
		} else if (values.sourceType === "URL") {
			input = { ...shared, sourceType: "URL", url: values.url };
		} else {
			if (!mediaFile) {
				setMediaError("Choose a file before running the investigation.");
				return;
			}
			input = { ...shared, sourceType: values.sourceType };
		}

		setMediaError(null);
		createVerification.mutate({
			file: mediaSelected ? (mediaFile ?? undefined) : undefined,
			input,
		});
	});

	const mediaSelected = !["TEXT", "URL"].includes(sourceType);
	const sourceCostKey = sourceType === "URL" ? "link" : sourceType.toLowerCase() as keyof NonNullable<typeof allowance.data>["costs"];
	const selectedCost = allowance.data?.costs[sourceCostKey] ?? (sourceType === "VIDEO" ? 2 : 1);
	const insufficientAllowance = allowance.data !== undefined && allowance.data.remaining < selectedCost;
	const resetLabel = allowance.data
		? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", timeZoneName: "short", timeZone: allowance.data.timezone }).format(new Date(allowance.data.resetAt))
		: null;
	const mutationError = createVerification.error;
	const mutationMessage =
		mutationError instanceof ApiClientError
			? uploadFailureMessage({ code: mutationError.code, details: mutationError.details, fallback: mutationError.message })
			: mutationError instanceof Error
				? mutationError.message
				: "Verith could not create the investigation.";

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<span>New investigation</span>
					<span>Case: Created after submission</span>
				</div>
				<h1>Build an evidence map around what you have seen.</h1>
				<p>Verith transforms source material into a structured, explainable investigation—connecting every claim to supporting, contradicting, or contextual evidence while keeping uncertainty visible.</p>
			</header>

			<div className={styles.workspace}>
				<form className={styles.composer} onSubmit={onSubmit} noValidate>
					<section className={styles.allowance} aria-live="polite">
						<div>
							<span>{allowance.data?.entitlement.source === "ADMIN_GRANT" ? "Today’s sponsored allowance" : "Today’s free allowance"}</span>
							<strong>
								{allowance.isPending
									? "Checking your available investigations…"
									: allowance.data
										? `${allowance.data.remaining} of ${allowance.data.limit} free investigations remaining today`
										: "Allowance status is temporarily unavailable"}
							</strong>
							{allowance.data && <p>Resets at {resetLabel} in {allowance.data.timezone}. {sourceType === "VIDEO" ? `A short video uses ${selectedCost} attempts.` : "This input uses 1 attempt."}</p>}
							{allowance.isError && <p>Verith will still validate your allowance securely when you submit.</p>}
						</div>
						{allowance.data && (
							<div className={styles.allowanceMeter} aria-label={`${allowance.data.remaining} of ${allowance.data.limit} investigations remaining`}>
								{Array.from({ length: allowance.data.limit }, (_, index) => (
									<span key={index} data-available={index < allowance.data.remaining} />
								))}
							</div>
						)}
					</section>
					{!online && <p className={styles.connectionNotice} role="status">You are offline. This text draft is saved in this browser tab; reconnect before submitting. Media files cannot be restored automatically.</p>}

					<fieldset className={styles.modePicker}>
						<legend>Choose how you want to investigate</legend>
						<label>
							<input type="radio" value="STANDARD" {...register("mode")} />
							<span><strong>Standard investigation</strong><small>Let Verith build the evidence report for you.</small></span>
						</label>
						<label>
							<input type="radio" value="GUIDED" {...register("mode")} />
							<span><strong>Guided investigation</strong><small>Make your own observations first, then compare them with the evidence.</small></span>
						</label>
					</fieldset>
					<div className={styles.tabs} role="tablist" aria-label="Investigation input type">
						{sourceTypes.map((type) => (
							<button
								aria-selected={sourceType === type.value}
								className={sourceType === type.value ? styles.activeTab : undefined}
								key={type.value}
								onClick={() => chooseSourceType(type.value)}
								role="tab"
								type="button"
							>
								{type.label}
							</button>
						))}
					</div>

					<input type="hidden" {...register("sourceType")} />

					<div className={styles.primaryInput}>
						{sourceType === "TEXT" && (
							<>
								<label htmlFor="investigation-text">Claim, headline, or article excerpt</label>
								<textarea id="investigation-text" placeholder="Paste the source material exactly as you received it…" aria-describedby={errors.text ? "investigation-text-error" : undefined} aria-invalid={Boolean(errors.text)} {...register("text")} />
								{errors.text && <p className={styles.fieldError} id="investigation-text-error">{errors.text.message}</p>}
							</>
						)}

						{sourceType === "URL" && (
							<>
								<label htmlFor="investigation-url">Source URL</label>
								<input id="investigation-url" type="url" placeholder="https://example.com/article" aria-describedby={errors.url ? "investigation-url-error" : undefined} aria-invalid={Boolean(errors.url)} {...register("url")} />
								{errors.url && <p className={styles.fieldError} id="investigation-url-error">{errors.url.message}</p>}
							</>
						)}

						{mediaSelected && (
							<div className={styles.mediaState}>
								<span>{sourceType}: Owner-bound signed upload</span>
								<h2 className="text-lg! md:text-2xl! font-semibold">Preserve and investigate the original media.</h2>
								<p className="py-4">
									Verith requests a short-lived upload policy, transfers the file directly to the media provider, verifies the provider response, then binds the confirmed asset
									to this case.
								</p>
								<label className={styles.fileInput} htmlFor="media-file">
									<span>{mediaFile ? "Replace file" : "Choose file"}</span>
									<p className="text-sm">
										{mediaFile
											? `${mediaFile.name} · ${(mediaFile.size / (1024 * 1024)).toFixed(2)} MB`
											: sourceType === "AUDIO"
												? "MP3, WAV, M4A, OGG, WEBM, or FLAC"
											: sourceType === "VIDEO"
												? "MP4 or WEBM · up to 12 MB and 60 seconds"
												: "JPG, JPEG, PNG, WEBP, GIF, or AVIF"}
									</p>
									<input
										id="media-file"
										type="file"
										accept={sourceType === "AUDIO" ? ".mp3,.wav,.m4a,.ogg,.webm,.flac,audio/*" : sourceType === "VIDEO" ? ".mp4,.webm,video/mp4,video/webm" : ".jpg,.jpeg,.png,.webp,.gif,.avif,image/*"}
										onChange={(event) => {
											setMediaFile(event.target.files?.[0] ?? null);
											setMediaError(null);
											createVerification.reset();
										}}
									/>
								</label>
								{mediaError && (
									<p className={styles.fieldError} role="alert">
										{mediaError}
									</p>
								)}
								{uploadProgress !== null && (
									<div className={styles.uploadProgress}>
										<div>
											<span>Actual transfer progress</span>
											<strong>{uploadProgress}%</strong>
										</div>
										<div role="progressbar" aria-label="Media upload progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={uploadProgress}>
											<span style={{ width: `${uploadProgress}%` }} />
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					<div className={styles.options}>
						<div className={styles.field}>
							<label htmlFor="case-title">Case title (optional)</label>
							<input id="case-title" {...register("title")} />
							{errors.title && <p className={styles.fieldError}>{errors.title.message}</p>}
						</div>
						<div className={styles.field}>
							<label htmlFor="investigation-question">Investigation question (optional)</label>
							<textarea id="investigation-question" rows={3} {...register("question")} />
							{errors.question && <p className={styles.fieldError}>{errors.question.message}</p>}
						</div>
						<div className={styles.field}>
							<label htmlFor="visibility">Report visibility</label>
							<select id="visibility" {...register("visibility")}>
								<option value="PRIVATE">Private</option>
								<option value="UNLISTED">Unlisted</option>
								<option value="PUBLIC">Public</option>
							</select>
							<p className={styles.fieldHint}>Public access is still controlled by report publication and can be revoked.</p>
						</div>
					</div>

					{allowanceError && (
						<div className={styles.errorState} role="alert">
							<strong>DAILY ALLOWANCE</strong>
							<p>{allowanceError}</p>
						</div>
					)}

					{mutationError && (
						<div className={styles.errorState} role="alert">
							<strong>{mutationError instanceof ApiClientError ? mutationError.code : mutationError instanceof UploadError ? "UPLOAD_FAILED" : "INVESTIGATION_FAILED"}</strong>
							<p>{mutationMessage}</p>
							{mutationError instanceof ApiClientError && mutationError.requestId && <span>Request {mutationError.requestId}</span>}
						</div>
					)}

					<div className={styles.submitRow}>
						<span>{insufficientAllowance ? `Choose an input costing ${allowance.data?.remaining ?? 0} attempts or wait for the daily reset` : "Invalid input and platform failures do not use an attempt"}</span>
						<button type="submit" disabled={createVerification.isPending || insufficientAllowance}>
							{createVerification.isPending ? (uploadProgress !== null && uploadProgress < 100 ? "Uploading media…" : "Creating investigation…") : "Run investigation"}
						</button>
					</div>
				</form>

				<aside className={styles.guidance}>
					<div>
						<span>Evidence behavior</span>
						<h2>A transparent investigation from start to finish.</h2>
					</div>
					<dl>
						<div>
							<dt>Claims</dt>
							<dd>Each checkable statement becomes its own evidence question.</dd>
						</div>
						<div>
							<dt>Sources</dt>
							<dd>Every source stays mapped to the claim it informs.</dd>
						</div>
						<div>
							<dt>Uncertainty</dt>
							<dd>Evidence gaps and unresolved questions remain explicit.</dd>
						</div>
						<div>
							<dt>Privacy</dt>
							<dd>Your investigation begins private and remains under your control.</dd>
						</div>
					</dl>
					<div className={styles.limit}>
						<span>Input limits</span>
						<p>Text up to 50,000 characters. URLs must use HTTP or HTTPS. Video is limited to a 12 MB, 60-second MP4 or WEBM clip.</p>
						<p>Short clips are analyzed by the configured Gemini provider. Frame sampling can miss brief edits or small text, and the result is not a forensic deepfake or identity assessment.</p>
						<p>The daily allowance keeps provider costs sustainable. Viewing reports, lessons, quizzes, challenges, invalid submissions, and failures before meaningful processing do not count. Payments are not enabled, so Verith does not show a misleading upgrade action.</p>
					</div>
				</aside>
			</div>
		</div>
	);
}
