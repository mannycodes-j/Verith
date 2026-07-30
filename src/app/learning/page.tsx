import type { Metadata } from "next";
import LearningCatalog from "@/components/learning/LearningCatalog";

export const metadata: Metadata = {
  description:
    "Learn practical methods for evaluating claims, evidence, context, and sources.",
  title: "Media literacy learning | Verith",
};

export default function LearningPage() {
  return (
    <main className="mx-auto max-w-[1500px] px-(--page-gutter) pb-20">
      <LearningCatalog />
    </main>
  );
}
