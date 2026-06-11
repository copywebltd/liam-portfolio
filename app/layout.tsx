import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liampetersen.dev"),
  title: "Liam Petersen, Direct Response → AI Strategy → Production AI Builder",
  description:
    "Direct response copywriter turned Head of AI Strategy, now building production AI. Built Foxelli Studio, an end-to-end ad production platform serving a $20M+ portfolio. Eleven systems shipped end-to-end. Founder of Copyweb.",
  openGraph: {
    title: "Liam Petersen, Direct Response → AI Strategy → Production AI Builder",
    description:
      "Production AI systems with revenue receipts. $800K/mo peak. 26 production workflows. 60+ custom Claude Code skills. Built on Claude Code.",
    type: "website",
    url: "https://liampetersen.dev",
    siteName: "Liam Petersen",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
