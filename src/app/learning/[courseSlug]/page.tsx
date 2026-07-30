import type { Metadata } from "next";
import CourseReader from "@/components/learning/CourseReader";

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
    <main className="mx-auto max-w-[1500px] px-(--page-gutter) pb-20">
      <CourseReader slug={courseSlug} />
    </main>
  );
}
