export interface VerificationFailureInput {
  failureCode?: string;
  failureSummary?: string;
  urlMetadata?: {
    retryRecommended?: boolean;
    alternativeSubmission?: "PASTE_TEXT_OR_UPLOAD_SCREENSHOT";
    supportReference?: string;
  };
}

export interface VerificationFailurePresentation {
  title: string;
  explanation: string;
  retryable: boolean;
  offerText: boolean;
  offerScreenshot: boolean;
  supportReference?: string;
}

const URL_PRESENTATIONS: Record<
  string,
  Pick<VerificationFailurePresentation, "title" | "explanation" | "retryable">
> = {
  SOCIAL_CONTENT_RESTRICTED: {
    title: "We couldn’t read this X post directly.",
    explanation:
      "X can restrict automated access to post content. You can still investigate it by uploading a screenshot or pasting the post text.",
    retryable: false,
  },
  URL_ACCESS_BLOCKED: {
    title: "This website blocked automated access.",
    explanation:
      "Verith could not read the page without bypassing the publisher’s access controls. Paste the relevant text or upload a screenshot instead.",
    retryable: false,
  },
  URL_LOGIN_REQUIRED: {
    title: "This page requires access that Verith does not have.",
    explanation:
      "Copy the relevant text or upload a screenshot to investigate the content without sharing your login details.",
    retryable: false,
  },
  URL_PAYWALLED: {
    title: "This article is behind a paywall.",
    explanation:
      "Paste content you are permitted to share or upload a screenshot of the relevant section.",
    retryable: false,
  },
  URL_FETCH_TIMEOUT: {
    title: "The website did not respond in time.",
    explanation: "The interruption may be temporary, so you can retry this link.",
    retryable: true,
  },
  URL_RATE_LIMITED: {
    title: "The website is temporarily limiting access.",
    explanation: "Wait a little before retrying this link.",
    retryable: true,
  },
  URL_TEMPORARY_NETWORK_FAILURE: {
    title: "The website is temporarily unavailable.",
    explanation: "The source may recover, so try this link again later.",
    retryable: true,
  },
  URL_JAVASCRIPT_REQUIRED: {
    title: "This page needs an interactive browser.",
    explanation:
      "Verith does not bypass browser-only page controls. Paste the relevant text or upload a screenshot instead.",
    retryable: false,
  },
  URL_AUTOMATION_BLOCKED: {
    title: "The website presented an access check.",
    explanation:
      "Verith will not bypass the website’s automated-access check. Paste the text or upload a screenshot instead.",
    retryable: false,
  },
};

export function verificationFailurePresentation(
  input: VerificationFailureInput,
): VerificationFailurePresentation {
  const code = input.failureCode ?? "PROCESSING_FAILED";
  const configured = URL_PRESENTATIONS[code];
  const alternative =
    input.urlMetadata?.alternativeSubmission ===
    "PASTE_TEXT_OR_UPLOAD_SCREENSHOT";
  return {
    title: configured?.title ?? "The investigation did not complete.",
    explanation:
      configured?.explanation ??
      input.failureSummary ??
      "No safe failure summary was returned by the service.",
    retryable:
      input.urlMetadata?.retryRecommended ?? configured?.retryable ?? true,
    offerText: alternative,
    offerScreenshot: alternative,
    ...(input.urlMetadata?.supportReference
      ? { supportReference: input.urlMetadata.supportReference }
      : {}),
  };
}
