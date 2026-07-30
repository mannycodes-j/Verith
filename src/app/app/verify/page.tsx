import type { Metadata } from "next";
import VerificationComposer from "./VerificationComposer";

export const metadata: Metadata = {
  title: "New investigation",
};

export default function NewVerificationPage() {
  return <VerificationComposer />;
}
