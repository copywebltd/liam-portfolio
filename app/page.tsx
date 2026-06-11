import {
  Nav,
  Hero,
  BuildDoctrine,
  TLDR,
  Receipts,
  Arc,
  Principles,
  Stack,
  Credentials,
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
      <Credentials />
      <Contact />
      <Footer />
    </main>
  );
}
