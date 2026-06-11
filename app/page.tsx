import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./v4/v4.css";
import {
  CommandPalette,
  Footer,
  Nav,
  ProgressRail,
} from "@/components/v4/chrome";
import {
  Arc,
  Contact,
  Credentials,
  Hero,
  Principles,
  Receipts,
  RecruiterCard,
  Stack,
  Ticker,
} from "@/components/v4/sections";
import { Systems } from "@/components/v4/systems";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Liam Petersen · Direct Response → AI Strategy → Production AI Builder",
  description:
    "Direct response copywriter turned Head of AI Strategy, now building production AI. Built Foxelli Studio, an end-to-end ad production platform serving a $20M+ portfolio. Eleven systems shipped end-to-end. Founder of Copyweb.",
};

export default function Home() {
  return (
    <div className={`v4 min-h-screen ${instrument.variable}`}>
      <main className="relative">
        <Nav />
        <ProgressRail />
        <CommandPalette />
        <Hero />
        <Ticker />
        <RecruiterCard />
        <Systems />
        <Receipts />
        <Arc />
        <Principles />
        <Stack />
        <Credentials />
        <Contact />
        <Footer />
      </main>
      <div className="v4-grain" aria-hidden />
    </div>
  );
}
