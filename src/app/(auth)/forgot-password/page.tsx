import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a secure Verith password-reset link.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
