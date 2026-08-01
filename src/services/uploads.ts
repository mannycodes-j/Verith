import type { components } from "@/generated/api-schema";
import { apiClient } from "./apiClient";

export type AssetType =
  components["schemas"]["CreateUploadSignatureDto"]["assetType"];

export interface SignedUpload {
  assetId: string;
  provider: "CLOUDINARY";
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  publicId: string;
  resourceType: "image" | "video";
  context: string;
  allowedFormats: string[];
  maxBytes: number;
  expiresAt: string;
}

interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  secure_url: string;
  format: string;
  bytes: number;
}

export interface MediaAsset {
  id: string;
  assetType: AssetType;
  provider: "CLOUDINARY";
  resourceType: string;
  format: string;
  mimeType: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
  secureUrl: string;
  status: "CONFIRMED" | "ATTACHED";
  createdAt: string;
  updatedAt: string;
}

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

function extension(file: File) {
  return file.name.split(".").at(-1)?.toLowerCase() ?? "";
}

function uploadToCloudinary(
  signature: SignedUpload,
  file: File,
  onProgress?: (progress: number) => void,
): Promise<CloudinaryUploadResponse> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set("file", file);
    form.set("api_key", signature.apiKey);
    form.set("timestamp", String(signature.timestamp));
    form.set("signature", signature.signature);
    form.set("public_id", signature.publicId);
    form.set("context", signature.context);
    form.set("overwrite", "false");

    const request = new XMLHttpRequest();
    const cloudName = encodeURIComponent(signature.cloudName);
    const resourceType = encodeURIComponent(signature.resourceType);
    request.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    );
    request.responseType = "json";
    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      onProgress?.(Math.round((event.loaded / event.total) * 100));
    });
    request.addEventListener("error", () => {
      reject(
        new UploadError(
          "The media provider could not be reached. Check your connection and retry.",
        ),
      );
    });
    request.addEventListener("load", () => {
      if (request.status < 200 || request.status >= 300) {
        const providerMessage =
          typeof request.response === "object" &&
          request.response !== null &&
          "error" in request.response &&
          typeof request.response.error === "object" &&
          request.response.error !== null &&
          "message" in request.response.error
            ? String(request.response.error.message)
            : "The media provider rejected the upload.";
        reject(new UploadError(providerMessage));
        return;
      }

      const response = request.response as Partial<CloudinaryUploadResponse>;
      if (
        typeof response.public_id !== "string" ||
        typeof response.version !== "number" ||
        typeof response.signature !== "string" ||
        typeof response.secure_url !== "string" ||
        typeof response.format !== "string" ||
        typeof response.bytes !== "number"
      ) {
        reject(
          new UploadError("The media provider returned an invalid response."),
        );
        return;
      }
      onProgress?.(100);
      resolve(response as CloudinaryUploadResponse);
    });
    request.send(form);
  });
}

export const uploadService = {
  remove: (assetId: string) =>
    apiClient.deleteVoid(`/uploads/${assetId}`),

  async uploadAvatar({
    file,
    onProgress,
  }: {
    file: File;
    onProgress?: (progress: number) => void;
  }): Promise<{ asset: MediaAsset; profile: Record<string, unknown> }> {
    const signed = await apiClient.post<SignedUpload>(
      "/users/me/avatar/upload-signature",
    );
    const fileExtension = extension(file);
    if (file.size <= 0) throw new UploadError("The selected file is empty.");
    if (file.size > signed.maxBytes) {
      throw new UploadError(
        `The selected file exceeds the ${Math.ceil(
          signed.maxBytes / (1024 * 1024),
        )} MB limit.`,
      );
    }
    if (!signed.allowedFormats.includes(fileExtension)) {
      throw new UploadError(
        `Use one of these formats: ${signed.allowedFormats.join(", ")}.`,
      );
    }
    const uploaded = await uploadToCloudinary(signed, file, onProgress);
    if (uploaded.public_id !== signed.publicId) {
      throw new UploadError(
        "The uploaded avatar did not match the signed destination.",
      );
    }
    return apiClient.post<{
      asset: MediaAsset;
      profile: Record<string, unknown>;
    }>("/users/me/avatar/confirm", {
      assetId: signed.assetId,
      signature: uploaded.signature,
      version: uploaded.version,
    });
  },

  async uploadVerificationMedia({
    assetType,
    file,
    onProgress,
  }: {
    assetType: Extract<
      AssetType,
      | "VERIFICATION_IMAGE"
      | "VERIFICATION_SCREENSHOT"
      | "VERIFICATION_AUDIO"
    >;
    file: File;
    onProgress?: (progress: number) => void;
  }): Promise<MediaAsset> {
    const signed = await apiClient.post<SignedUpload>("/uploads/signature", {
      assetType,
    });
    const fileExtension = extension(file);

    if (file.size <= 0) {
      throw new UploadError("The selected file is empty.");
    }
    if (file.size > signed.maxBytes) {
      throw new UploadError(
        `The selected file exceeds the ${Math.ceil(
          signed.maxBytes / (1024 * 1024),
        )} MB limit.`,
      );
    }
    if (!signed.allowedFormats.includes(fileExtension)) {
      throw new UploadError(
        `Use one of these formats: ${signed.allowedFormats.join(", ")}.`,
      );
    }

    const uploaded = await uploadToCloudinary(signed, file, onProgress);
    if (uploaded.public_id !== signed.publicId) {
      throw new UploadError(
        "The uploaded media did not match the signed destination.",
      );
    }

    return apiClient.post<MediaAsset>("/uploads/confirm", {
      assetId: signed.assetId,
      signature: uploaded.signature,
      version: uploaded.version,
    });
  },
};
