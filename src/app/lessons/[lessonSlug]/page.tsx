import StandaloneLesson from "@/components/learning/StandaloneLesson";

export default async function PublicLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  return <StandaloneLesson slug={lessonSlug} />;
}
