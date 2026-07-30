import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Verith account and begin an evidence investigation.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
