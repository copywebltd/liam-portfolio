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
import { JumpMap } from "@/components/v4/jumpmap";
import { Showcase } from "@/components/v4/showcase";
import { VideoShowcase } from "@/components/v4/videoShowcase";
import { RecruiterBar } from "@/components/v4/fastpath";

export default function V4Page() {
  return (
    <main className="relative">
      <Nav />
      <ProgressRail />
      <CommandPalette />
      <RecruiterBar />
      <Hero />
      <JumpMap />
      <Ticker />
      <RecruiterCard />
      <Systems />
      <Workflows />
      <Showcase />
      <VideoShowcase />
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
