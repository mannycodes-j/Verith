export function uploadFailureMessage(input: {
  code?: string;
  details?: unknown;
  fallback: string;
}): string {
  if (input.code === "MEDIA_ASSET_NOT_FOUND") {
    return "The upload confirmation window expired. Choose the file again to create a fresh secure upload.";
  }
  if (input.code === "UPLOAD_SIGNATURE_INVALID") {
    return "The media provider could not securely confirm this upload. Choose the file again.";
  }
  if (
    input.code === "CLOUDINARY_ASSET_UNAVAILABLE" ||
    input.code === "CLOUDINARY_DURATION_UNAVAILABLE"
  ) {
    return "The media provider is temporarily unavailable. Verith retried confirmation without re-uploading the file; try again shortly.";
  }
  if (input.code !== "UPLOAD_POLICY_MISMATCH") return input.fallback;
  const field =
    input.details &&
    typeof input.details === "object" &&
    "field" in input.details &&
    typeof input.details.field === "string"
      ? input.details.field
      : undefined;
  const messages: Record<string, string> = {
    format: "The uploaded file format is not supported for this investigation type.",
    fileSize: "The uploaded file is larger than the permitted size.",
    duration: "The uploaded video is longer than the permitted duration.",
    resourceType: "The uploaded file does not match the selected media type.",
    owner: "This upload belongs to a different account and cannot be used.",
    publicId: "The uploaded file did not match its secure destination. Choose the file again.",
    uploadPolicyId: "The upload no longer matches its secure policy. Choose the file again.",
    version: "The provider returned a different upload version. Choose the file again.",
    deliveryType: "The provider stored this file using an unsupported delivery mode.",
  };
  return field
    ? (messages[field] ?? input.fallback)
    : "The media provider response did not match the secure upload policy. Choose the file again.";
}
