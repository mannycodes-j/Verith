import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = { title: "About | Verith" };

export default function AboutPage() {
  return (
    <PublicEditorial
      eyebrow="About: Verith"
      introduction="Verith is an evidence investigation and media-literacy system designed to make verification outputs inspectable, qualified, and useful before information is shared."
      sections={[
        {
          label: "Purpose",
          title: "Support better information decisions.",
          content: (
            <p>
              The product helps people inspect claims, evidence relationships,
              missing context, source transparency, and uncertainty. It does not
              claim institutional authority over truth.
            </p>
          ),
        },
        {
          label: "Method",
          title: "Evidence before confidence.",
          content: (
            <p>
              Conclusions remain tied to source records. Unsupported claims stay
              unsupported, inaccessible analysis stays unavailable, and report
              limitations remain visible.
            </p>
          ),
        },
        {
          label: "Learning",
          title: "Build verification skill, not dependence.",
          content: (
            <p>
              Published courses, quizzes, and challenges reinforce practical
              source and claim evaluation alongside the investigation tools.
            </p>
          ),
        },
      ]}
      title="An evidence desk for uncertain information."
    />
  );
}
