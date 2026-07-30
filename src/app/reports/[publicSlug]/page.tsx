import type { Metadata } from "next";
import PublicReport from "./PublicReport";

export const metadata: Metadata = {
  description:
    "Inspect a sanitized evidence-based verification report shared through Verith.",
  title: "Shared evidence report | Verith",
};

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ publicSlug: string }>;
}) {
  const { publicSlug } = await params;
  return <PublicReport slug={publicSlug} />;
}
