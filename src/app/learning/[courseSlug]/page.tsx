import type { Metadata } from "next";
import CourseReader from "@/components/learning/CourseReader";
import PublicNavbar from "@/components/public/PublicNavbar";
import PremiumBackground from "@/components/public/PremiumBackground";

export const metadata: Metadata = {
  title: "Learning course | Verith",
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative selection:bg-white/10 selection:text-white">
      <PremiumBackground />
      <PublicNavbar />
      <main
        className="relative z-10 mx-auto max-w-[1500px] px-(--page-gutter) pt-24 pb-20"
        id="main-content"
        tabIndex={-1}
      >
        <CourseReader slug={courseSlug} />
      </main>
    </div>
  );
}
