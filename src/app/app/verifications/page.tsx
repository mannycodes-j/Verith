import type { Metadata } from "next";
import VerificationHistory from "./VerificationHistory";

export const metadata: Metadata = {
  title: "Verification history",
};

export default function VerificationHistoryPage() {
  return <VerificationHistory />;
}
