import StandaloneLesson from "@/components/learning/StandaloneLesson";
import PublicNavbar from "@/components/public/PublicNavbar";

export default async function PublicLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  return (
    <>
      <PublicNavbar />
      <main
        className="mx-auto max-w-[1500px] px-(--page-gutter) pt-24 pb-20"
        id="main-content"
        tabIndex={-1}
      >
        <StandaloneLesson slug={lessonSlug} />
      </main>
    </>
  );
}
