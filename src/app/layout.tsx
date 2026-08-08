import type { Metadata } from "next";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";
import AdaptiveExperience from "@/components/providers/AdaptiveExperience";

export const metadata: Metadata = {
  title: {
    default: "Verith — Evidence-led media verification",
    template: "%s — Verith",
  },
  description:
    "Investigate claims, inspect evidence, and understand uncertainty before you share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" className="dark" data-theme="dark">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased selection:bg-white/10 selection:text-white">
        <AdaptiveExperience />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
