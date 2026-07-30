import CourseReader from "@/components/learning/CourseReader";

export default async function AuthenticatedCoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  return <CourseReader authenticated slug={courseSlug} />;
}
