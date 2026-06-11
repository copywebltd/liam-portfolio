import {
  V3bNav,
  V3bHero,
  V3bAbout,
  V3bLedger,
  V3bArc,
  V3bStack,
  V3bContact,
  V3bFooter,
} from "@/components/v3/sections-b";

export const metadata = {
  title: "Liam Petersen — v3b · Operator (BridgeMind-flavored)",
  description: "Variant B: BridgeMind aesthetic restructured for an operator portfolio.",
};

export default function V3BPage() {
  return (
    <main className="v3-theme min-h-screen">
      <V3bNav />
      <V3bHero />
      <V3bAbout />
      <V3bLedger />
      <V3bArc />
      <V3bStack />
      <V3bContact />
      <V3bFooter />
    </main>
  );
}
