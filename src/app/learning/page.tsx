import type { Metadata } from "next";
import LearningCatalog from "@/components/learning/LearningCatalog";
import PublicNavbar from "@/components/public/PublicNavbar";

export const metadata: Metadata = {
  description:
    "Learn practical methods for evaluating claims, evidence, context, and sources.",
  title: "Media literacy learning | Verith",
};

export default function LearningPage() {
  return (
    <>
      <PublicNavbar />
      <main
        className="mx-auto max-w-[1500px] px-(--page-gutter) pt-24 pb-20"
        id="main-content"
        tabIndex={-1}
      >
        <LearningCatalog />
      </main>
    </>
  );
}
