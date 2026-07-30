import type { Metadata } from "next";
import VerificationDetail from "./VerificationDetail";

export const metadata: Metadata = {
  title: "Investigation",
};

export default async function VerificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VerificationDetail id={id} />;
}
