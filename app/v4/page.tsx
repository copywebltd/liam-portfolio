import { CommandPalette, Footer, Nav, ProgressRail } from "@/components/v4/chrome";
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
import { Workflows } from "@/components/v4/workflows";

export default function V4Page() {
  return (
    <main className="relative">
      <Nav />
      <ProgressRail />
      <CommandPalette />
      <Hero />
      <Ticker />
      <RecruiterCard />
      <Systems />
      <Workflows />
      <Receipts />
      <Arc />
      <Principles />
      <Stack />
      <Credentials />
      <Contact />
      <Footer />
    </main>
  );
}
