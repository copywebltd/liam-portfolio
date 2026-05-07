import {
  Nav,
  Hero,
  BuildDoctrine,
  TLDR,
  Receipts,
  Arc,
  Principles,
  Stack,
  About,
  Contact,
  Footer,
} from "@/components/sections";
import { CaseStudies } from "@/components/case-studies";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <BuildDoctrine />
      <TLDR />
      <Receipts />
      <CaseStudies />
      <Arc />
      <Principles />
      <Stack />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
