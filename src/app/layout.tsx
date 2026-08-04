import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
    <html data-scroll-behavior="smooth" lang="en" className={`dark ${outfit.variable}`} data-theme="dark">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased selection:bg-white/10 selection:text-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
