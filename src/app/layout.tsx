import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Verith | Digital Investigation Workspace",
  description: "AI-powered media verification and media literacy platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <div className="noise-overlay" />
        <SmoothScroll>
          <main className="app-container">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
