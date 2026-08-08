import assert from "node:assert/strict";
import test from "node:test";
import { verificationFailurePresentation } from "./verificationFailure";

test("X restrictions offer text and screenshot without a pointless retry", () => {
  const result = verificationFailurePresentation({
    failureCode: "SOCIAL_CONTENT_RESTRICTED",
    urlMetadata: {
      retryRecommended: false,
      alternativeSubmission: "PASTE_TEXT_OR_UPLOAD_SCREENSHOT",
      supportReference: "request-safe-reference",
    },
  });
  assert.equal(result.retryable, false);
  assert.equal(result.offerText, true);
  assert.equal(result.offerScreenshot, true);
  assert.equal(result.supportReference, "request-safe-reference");
  assert.match(result.title, /X post/i);
});

test("temporary URL failures retain retry", () => {
  for (const failureCode of [
    "URL_FETCH_TIMEOUT",
    "URL_RATE_LIMITED",
    "URL_TEMPORARY_NETWORK_FAILURE",
  ]) {
    assert.equal(
      verificationFailurePresentation({ failureCode }).retryable,
      true,
    );
  }
});

test("login and automation barriers use honest alternatives", () => {
  for (const failureCode of [
    "URL_LOGIN_REQUIRED",
    "URL_ACCESS_BLOCKED",
    "URL_AUTOMATION_BLOCKED",
  ]) {
    const result = verificationFailurePresentation({
      failureCode,
      urlMetadata: {
        alternativeSubmission: "PASTE_TEXT_OR_UPLOAD_SCREENSHOT",
      },
    });
    assert.equal(result.retryable, false);
    assert.equal(result.offerScreenshot, true);
  }
});
