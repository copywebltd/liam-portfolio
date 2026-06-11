import {
  V3aBanner,
  V3aNav,
  V3aHero,
  V3aSystems,
  V3aWorkflow,
  V3aSpotlight,
  V3aStack,
  V3aArc,
  V3aProof,
  V3aCTA,
  V3aFooter,
} from "@/components/v3/sections-a";

export const metadata = {
  title: "Liam Petersen — v3a · Faithful (BridgeMind-flavored)",
  description: "Variant A: faithful BridgeMind structure with portfolio content.",
};

export default function V3APage() {
  return (
    <main className="v3-theme min-h-screen">
      <V3aBanner />
      <V3aNav />
      <V3aHero />
      <V3aSystems />
      <V3aWorkflow />
      <V3aSpotlight />
      <V3aStack />
      <V3aArc />
      <V3aProof />
      <V3aCTA />
      <V3aFooter />
    </main>
  );
}
