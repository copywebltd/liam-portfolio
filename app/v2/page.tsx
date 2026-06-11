import {
  V2Nav,
  V2Hero,
  V2Doctrine,
  V2PhotoBreakOne,
  V2Loop,
  V2Metrics,
  V2PhotoBreakTwo,
  V2Artifacts,
  V2Arc,
  V2Stack,
  V2About,
  V2Contact,
  V2Footer,
} from "@/components/v2/sections";

export const metadata = {
  title: "Liam Petersen — v2 mock (Vibecademy-flavored)",
  description: "Prototype design pass for liam-portfolio.",
};

export default function V2Page() {
  return (
    <main className="v2-theme relative min-h-screen">
      <V2Nav />
      <V2Hero />
      <V2Doctrine />
      <V2PhotoBreakOne />
      <V2Loop />
      <V2Metrics />
      <V2PhotoBreakTwo />
      <V2Artifacts />
      <V2Arc />
      <V2Stack />
      <V2About />
      <V2Contact />
      <V2Footer />
    </main>
  );
}
