export const WHATSAPP_ROLLOUT = {
  label: "Coming soon",
  title: "WhatsApp investigations are being prepared safely.",
  description: "The connection is locked while Verith completes provider setup, webhook verification, and privacy checks. No link codes can be created yet.",
  checks: ["Provider configuration", "Signed webhook validation", "Privacy and consent review"],
} as const;
