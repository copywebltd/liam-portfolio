import Link from "next/link";

export const metadata = {
  title: "Liam Petersen — v3 prototypes (BridgeMind-flavored)",
  description: "Two design prototypes inspired by bridgemind.ai.",
};

export default function V3Index() {
  return (
    <main className="v3-theme min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="v3-eyebrow mb-8">
          <span className="dot" />
          v3 · prototype
          <span className="sep">·</span>
          inspired by bridgemind.ai
        </div>

        <h1 className="v3-display max-w-4xl mb-6">
          Two flavors. <span className="muted">Same DNA.</span>
        </h1>

        <p className="v3-body max-w-2xl mb-16">
          Sharp corners, Plus Jakarta Sans, JetBrains Mono mono labels, deep-black
          surfaces, BridgeMind&apos;s signal-green accent. Both variants share the
          theme tokens. They differ in how literally they mirror BridgeMind&apos;s
          section structure.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/v3/a"
            className="v3-card v3-card--accent p-8 md:p-10 group"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="v3-step-num v3-step-num--active">A · FAITHFUL</span>
              <span className="v3-pill v3-pill--live">LIVE</span>
            </div>
            <h2 className="v3-h2 mb-3">
              The BridgeMind clone. <span style={{ color: "#71717a" }}>Your content.</span>
            </h2>
            <p className="v3-body mb-8">
              Mirrors BridgeMind&apos;s exact section order — eyebrow + display
              hero, four-product grid, three-step workflow, swarm grid, agentic
              stack logo wall, big CTA. Every block replaced with case studies
              from your <code className="v3-mono text-[12px]">data/</code> folder.
              Inline fake terminals, kanbans, code-diffs as decorative proof.
            </p>
            <span className="v3-link group-hover:text-[var(--v3-accent)]">
              Open variant A →
            </span>
          </Link>

          <Link
            href="/v3/b"
            className="v3-card p-8 md:p-10 group"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="v3-step-num">B · OPERATOR</span>
              <span className="v3-pill">PORTFOLIO</span>
            </div>
            <h2 className="v3-h2 mb-3">
              Same aesthetic. <span style={{ color: "#71717a" }}>Restructured for an operator.</span>
            </h2>
            <p className="v3-body mb-8">
              Identical theme tokens — same colors, same fonts, same sharp
              corners — but the IA is a portfolio, not a SaaS landing. Hero,
              case-study ledger, the arc, stack tabs, contact. No fake pricing
              tiers, no fake reviews. The aesthetic carries; the pretense
              doesn&apos;t.
            </p>
            <span className="v3-link group-hover:text-[var(--v3-accent)]">
              Open variant B →
            </span>
          </Link>
        </div>

        <div className="mt-20 v3-rule pt-8 flex items-center justify-between text-[12px] v3-mono text-[var(--v3-text-tertiary)]">
          <span>v3 · BridgeMind-flavored prototype</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[var(--v3-text)]">v1 · Helios</Link>
            <Link href="/v2" className="hover:text-[var(--v3-text)]">v2 · Vibecademy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
