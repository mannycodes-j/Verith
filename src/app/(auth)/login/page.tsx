import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Access your Verith investigation workspace.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string | string[] }>;
}) {
  const reason = (await searchParams).reason;
  return <LoginForm sessionExpired={reason === "session-expired"} />;
}
