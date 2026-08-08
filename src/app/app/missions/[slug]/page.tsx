import MissionWorkspace from "./MissionWorkspace";

export default async function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MissionWorkspace slug={slug} />;
}

