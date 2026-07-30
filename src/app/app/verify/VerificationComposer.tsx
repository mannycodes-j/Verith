"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ApiClientError } from "@/services/apiClient";
import {
  uploadService,
  type AssetType,
  UploadError,
} from "@/services/uploads";
import {
  verificationService,
  type CreateVerificationInput,
} from "@/services/verification";
import { verifyStyles as styles } from "./verify.styles";

const sourceTypes = [
  { label: "Text", value: "TEXT" },
  { label: "Link", value: "URL" },
  { label: "Image", value: "IMAGE" },
  { label: "Screenshot", value: "SCREENSHOT" },
  { label: "Voice", value: "AUDIO" },
] as const;

type SourceType = (typeof sourceTypes)[number]["value"];

const composerSchema = z
  .object({
    question: z
      .string()
      .trim()
      .max(1000, "Question must be 1,000 characters or fewer."),
    sourceType: z.enum(["TEXT", "URL", "IMAGE", "SCREENSHOT", "AUDIO"]),
    text: z.string().trim().max(50000),
    title: z
      .string()
      .trim()
      .max(200, "Title must be 200 characters or fewer."),
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

export default function VerificationComposer() {
  const router = useRouter();
  const idempotencyKey = useRef(crypto.randomUUID());
  const [sourceType, setSourceType] = useState<SourceType>("TEXT");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<ComposerValues>({
    defaultValues: {
      question: "",
      sourceType: "TEXT",
      text: "",
      title: "",
      url: "",
      visibility: "PRIVATE",
    },
    resolver: zodResolver(composerSchema),
  });

  const createVerification = useMutation({
    mutationFn: async ({
      file,
      input,
    }: {
      file?: File;
      input: CreateVerificationInput;
    }) => {
      if (!file) {
        return verificationService.create(input, idempotencyKey.current);
      }
      const assetTypeBySource: Record<
        "IMAGE" | "SCREENSHOT" | "AUDIO",
        Extract<
          AssetType,
          | "VERIFICATION_IMAGE"
          | "VERIFICATION_SCREENSHOT"
          | "VERIFICATION_AUDIO"
        >
      > = {
        AUDIO: "VERIFICATION_AUDIO",
        IMAGE: "VERIFICATION_IMAGE",
        SCREENSHOT: "VERIFICATION_SCREENSHOT",
      };
      const mediaSource = input.sourceType as "IMAGE" | "SCREENSHOT" | "AUDIO";
      const asset = await uploadService.uploadVerificationMedia({
        assetType: assetTypeBySource[mediaSource],
        file,
        onProgress: setUploadProgress,
      });
      try {
        return await verificationService.create(
          { ...input, mediaAssetId: asset.id },
          idempotencyKey.current,
        );
      } catch (error) {
        await uploadService.remove(asset.id).catch(() => undefined);
        throw error;
      }
    },
    onSuccess: (record) => {
      idempotencyKey.current = crypto.randomUUID();
      setUploadProgress(null);
      router.push(`/app/verifications/${record.id}`);
    },
    onError: () => setUploadProgress(null),
  });

  const chooseSourceType = (nextType: SourceType) => {
    setSourceType(nextType);
    setValue("sourceType", nextType, { shouldValidate: true });
    setMediaFile(null);
    setMediaError(null);
    setUploadProgress(null);
    createVerification.reset();
  };

  const onSubmit = handleSubmit((values) => {
    const shared = {
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
  const mutationError = createVerification.error;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <span>New investigation</span>
          <span>Case: Created after submission</span>
        </div>
        <h1>Inspect the source material.</h1>
        <p>
          Verith separates checkable claims, retrieved evidence, inference, and
          uncertainty. Submit only material you are permitted to process.
        </p>
      </header>

      <div className={styles.workspace}>
        <form className={styles.composer} onSubmit={onSubmit} noValidate>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Investigation input type"
          >
            {sourceTypes.map((type) => (
              <button
                aria-selected={sourceType === type.value}
                className={
                  sourceType === type.value ? styles.activeTab : undefined
                }
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
                <label htmlFor="investigation-text">
                  Claim, headline, or article excerpt
                </label>
                <textarea
                  id="investigation-text"
                  placeholder="Paste the source material exactly as you received it…"
                  aria-invalid={Boolean(errors.text)}
                  {...register("text")}
                />
                {errors.text && (
                  <p className={styles.fieldError}>{errors.text.message}</p>
                )}
              </>
            )}

            {sourceType === "URL" && (
              <>
                <label htmlFor="investigation-url">Source URL</label>
                <input
                  id="investigation-url"
                  type="url"
                  placeholder="https://example.com/article"
                  aria-invalid={Boolean(errors.url)}
                  {...register("url")}
                />
                {errors.url && (
                  <p className={styles.fieldError}>{errors.url.message}</p>
                )}
              </>
            )}

            {mediaSelected && (
              <div className={styles.mediaState}>
                <span>{sourceType}: Owner-bound signed upload</span>
                <h2>Select the original media file.</h2>
                <p>
                  Verith requests a short-lived upload policy, transfers the
                  file directly to the media provider, verifies the provider
                  response, then binds the confirmed asset to this case.
                </p>
                <label className={styles.fileInput} htmlFor="media-file">
                  <span>{mediaFile ? "Replace file" : "Choose file"}</span>
                  <strong>
                    {mediaFile
                      ? `${mediaFile.name} · ${(
                          mediaFile.size /
                          (1024 * 1024)
                        ).toFixed(2)} MB`
                      : sourceType === "AUDIO"
                        ? "MP3, WAV, M4A, OGG, WEBM, AAC, or FLAC"
                        : "JPG, JPEG, PNG, WEBP, GIF, or AVIF"}
                  </strong>
                  <input
                    id="media-file"
                    type="file"
                    accept={
                      sourceType === "AUDIO"
                        ? ".mp3,.wav,.m4a,.ogg,.webm,.aac,.flac,audio/*"
                        : ".jpg,.jpeg,.png,.webp,.gif,.avif,image/*"
                    }
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
                    <div
                      role="progressbar"
                      aria-label="Media upload progress"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={uploadProgress}
                    >
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
              {errors.title && (
                <p className={styles.fieldError}>{errors.title.message}</p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="investigation-question">
                Investigation question (optional)
              </label>
              <textarea
                id="investigation-question"
                rows={3}
                {...register("question")}
              />
              {errors.question && (
                <p className={styles.fieldError}>{errors.question.message}</p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="visibility">Report visibility</label>
              <select id="visibility" {...register("visibility")}>
                <option value="PRIVATE">Private</option>
                <option value="UNLISTED">Unlisted</option>
                <option value="PUBLIC">Public</option>
              </select>
              <p className={styles.fieldHint}>
                Public access is still controlled by report publication and can
                be revoked.
              </p>
            </div>
          </div>

          {mutationError && (
            <div className={styles.errorState} role="alert">
              <strong>
                {mutationError instanceof ApiClientError
                  ? mutationError.code
                  : mutationError instanceof UploadError
                    ? "UPLOAD_FAILED"
                    : "INVESTIGATION_FAILED"}
              </strong>
              <p>
                {mutationError instanceof Error
                  ? mutationError.message
                  : "Verith could not create the investigation."}
              </p>
              {mutationError instanceof ApiClientError &&
                mutationError.requestId && (
                  <span>Request {mutationError.requestId}</span>
                )}
            </div>
          )}

          <div className={styles.submitRow}>
            <span>
              A case identifier is generated after successful creation
            </span>
            <button
              type="submit"
              disabled={createVerification.isPending}
            >
              {createVerification.isPending
                ? uploadProgress !== null && uploadProgress < 100
                  ? "Uploading media…"
                  : "Creating investigation…"
                : "Run investigation"}
            </button>
          </div>
        </form>

        <aside className={styles.guidance}>
          <div>
            <span>Evidence behavior</span>
            <h2>What to expect.</h2>
          </div>
          <dl>
            <div>
              <dt>Claims</dt>
              <dd>Checkable statements are extracted individually.</dd>
            </div>
            <div>
              <dt>Sources</dt>
              <dd>Evidence stays linked to the claim it relates to.</dd>
            </div>
            <div>
              <dt>Uncertainty</dt>
              <dd>Incomplete analysis remains visibly incomplete.</dd>
            </div>
            <div>
              <dt>Privacy</dt>
              <dd>New investigations default to private.</dd>
            </div>
          </dl>
          <div className={styles.limit}>
            <span>Input limits</span>
            <p>Text up to 50,000 characters. URLs must use HTTP or HTTPS.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
