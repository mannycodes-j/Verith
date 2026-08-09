import type { Metadata } from "next";
import VerificationComposer from "./VerificationComposer";

export const metadata: Metadata = {
  title: "New investigation",
};

export default async function NewVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const source = (await searchParams).source;
  const initialSourceType = [
    "TEXT",
    "IMAGE",
    "SCREENSHOT",
    "AUDIO",
    "VIDEO",
  ].includes(source ?? "")
    ? (source as
        | "TEXT"
        | "IMAGE"
        | "SCREENSHOT"
        | "AUDIO"
        | "VIDEO")
    : "TEXT";
  return <VerificationComposer initialSourceType={initialSourceType} />;
}
