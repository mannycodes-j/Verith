import StandaloneLesson from "@/components/learning/StandaloneLesson";

export default async function AppLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  return <StandaloneLesson authenticated slug={lessonSlug} />;
}
