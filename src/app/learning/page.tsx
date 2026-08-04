import type { Metadata } from "next";
import LearningCatalog from "@/components/learning/LearningCatalog";
import PublicNavbar from "@/components/public/PublicNavbar";
import PremiumBackground from "@/components/public/PremiumBackground";

export const metadata: Metadata = {
  description:
    "Learn practical methods for evaluating claims, evidence, context, and sources.",
  title: "Media literacy learning | Verith",
};

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative selection:bg-white/10 selection:text-white">
      <PremiumBackground />
      <PublicNavbar />
      <main
        className="relative z-10 mx-auto max-w-[1500px] px-(--page-gutter) pt-24 pb-20"
        id="main-content"
        tabIndex={-1}
      >
        <LearningCatalog />
      </main>
    </div>
  );
}
