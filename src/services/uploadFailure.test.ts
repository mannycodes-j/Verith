import assert from "node:assert/strict";
import test from "node:test";
import { uploadFailureMessage } from "./uploadFailure";

test("upload mismatches explain format, size, and duration safely", () => {
  const fallback = "Upload failed";
  assert.match(
    uploadFailureMessage({ code: "UPLOAD_POLICY_MISMATCH", details: { field: "format" }, fallback }),
    /format/i,
  );
  assert.match(
    uploadFailureMessage({ code: "UPLOAD_POLICY_MISMATCH", details: { field: "fileSize" }, fallback }),
    /larger/i,
  );
  assert.match(
    uploadFailureMessage({ code: "UPLOAD_POLICY_MISMATCH", details: { field: "duration" }, fallback }),
    /longer/i,
  );
});

test("expired and unavailable confirmations describe recovery", () => {
  assert.match(
    uploadFailureMessage({ code: "MEDIA_ASSET_NOT_FOUND", fallback: "Upload failed" }),
    /choose the file again/i,
  );
  assert.match(
    uploadFailureMessage({ code: "CLOUDINARY_ASSET_UNAVAILABLE", fallback: "Upload failed" }),
    /retried confirmation without re-uploading/i,
  );
  assert.match(
    uploadFailureMessage({ code: "CLOUDINARY_DURATION_UNAVAILABLE", fallback: "Upload failed" }),
    /retried confirmation without re-uploading/i,
  );
});
