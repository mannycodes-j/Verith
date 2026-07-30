import ChallengeWorkspace from "./ChallengeWorkspace";

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ChallengeWorkspace slug={slug} />;
}
