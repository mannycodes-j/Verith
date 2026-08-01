import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = { title: "Privacy | Verith" };

export default function PrivacyPage() {
  return (
    <PublicEditorial
      eyebrow="Policy: Privacy"
      introduction="This page describes privacy behavior visible in the implemented Verith system. Deployment-specific legal notices, operator identity, and configured retention durations must be supplied before production launch."
      sections={[
        {
          label: "Account data",
          title: "Data used to operate your account.",
          content: (
            <p>
              Verith stores account identity, preferences, authenticated
              sessions, investigations, reports, learning progress,
              notifications, and reward records needed for requested features.
            </p>
          ),
        },
        {
          label: "Submitted media",
          title: "Owner-bound uploads and deletion.",
          content: (
            <p>
              Supported media is uploaded through signed Cloudinary requests,
              confirmed by the backend, and attached to its owning resource.
              Account erasure includes connected media when the provider is
              available.
            </p>
          ),
        },
        {
          label: "AI processing",
          title: "Configured providers process investigation content.",
          content: (
            <p>
              Verith sends only the content needed for a requested analysis to
              its configured AI or transcription provider. Provider retention
              and model-improvement terms can differ between free and paid
              plans, so the deployment operator must disclose and select the
              appropriate plan before production use.
            </p>
          ),
        },
        {
          label: "Your controls",
          title: "Visibility, export, and deletion.",
          content: (
            <p>
              Authenticated settings control profile and leaderboard
              visibility. You can request an encrypted data export or begin an
              account-deletion process with a configured grace period.
            </p>
          ),
        },
        {
          label: "WhatsApp",
          title: "Encrypted linkage with explicit consent.",
          content: (
            <p>
              Linked phone numbers are encrypted, separately hashed for lookup,
              and removed from the link record when the account is unlinked.
              Incoming webhooks require Meta signature verification.
            </p>
          ),
        },
      ]}
      title="Privacy controls tied to real operations."
    />
  );
}
