import type { Metadata } from "next";
import CourseReader from "@/components/learning/CourseReader";
import PublicNavbar from "@/components/public/PublicNavbar";

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
    <>
      <PublicNavbar />
      <main
        className="mx-auto max-w-[1500px] px-(--page-gutter) pt-24 pb-20"
        id="main-content"
        tabIndex={-1}
      >
        <CourseReader slug={courseSlug} />
      </main>
    </>
  );
}
