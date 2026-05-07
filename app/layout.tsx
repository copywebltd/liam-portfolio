import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liam Petersen — Direct response operator. Full-stack AI builder.",
  description:
    "Six years in direct response. Two years shipping production AI. Built Foxelli Studio, an end-to-end ad production platform serving a $20M+ portfolio. Now founder of Copyweb.",
  openGraph: {
    title: "Liam Petersen — Direct response operator. Full-stack AI builder.",
    description:
      "Production AI systems with revenue receipts. $674K/mo peak. 3.3× email. 6× ad output. Built on Claude Code.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
