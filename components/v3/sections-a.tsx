"use client";

import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { arc } from "@/data/arc";
import {
  Eyebrow,
  FadeIn,
  StatusPill,
  StepNum,
  TerminalMock,
  KanbanMock,
  DiffMock,
} from "./atoms";

/* ---------- top banner --------------------------------------------- */

export function V3aBanner() {
  return (
    <div className="border-b border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-10 flex items-center justify-center text-[12px] v3-mono text-[var(--v3-text-tertiary)]">
        <span className="hidden sm:inline">FOXELLI STUDIO</span>
        <span className="hidden sm:inline" style={{ color: "var(--v3-text-faint)", margin: "0 12px" }}>·</span>
        <span>$414K → $800K/mo brand revenue running through this pipeline</span>
        <span style={{ color: "var(--v3-text-faint)", margin: "0 12px" }}>·</span>
        <a href="#systems" className="text-[var(--v3-accent)] hover:underline">See the case →</a>
      </div>
    </div>
  );
}

/* ---------- nav ----------------------------------------------------- */

export function V3aNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(10,10,10,0.7)] border-b border-[var(--v3-border)]">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/v3/a" className="flex items-center gap-3">
          <span className="w-7 h-7 border border-[var(--v3-border-strong)] grid place-items-center v3-mono text-[11px] tracking-[0.18em]">
            LP
          </span>
          <span className="hidden sm:inline text-[14px] font-medium">Liam Petersen</span>
          <span className="hidden md:inline v3-mono text-[11px] text-[var(--v3-text-tertiary)] tracking-[0.16em] uppercase border-l border-[var(--v3-border)] pl-3 ml-1">
            Operator · Builder
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-[var(--v3-text-secondary)]">
          <a href="#systems" className="hover:text-[var(--v3-text)]">Systems</a>
          <a href="#workflow" className="hover:text-[var(--v3-text)]">Workflow</a>
          <a href="#spotlight" className="hover:text-[var(--v3-text)]">Spotlight</a>
          <a href="#stack" className="hover:text-[var(--v3-text)]">Stack</a>
          <a href="#arc" className="hover:text-[var(--v3-text)]">Arc</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/v3" className="v3-btn text-[12px] px-3 py-2 hidden sm:inline-flex">↩ Variants</Link>
          <a href="mailto:liam@copyweb.io" className="v3-btn v3-btn--accent text-[12px] px-4 py-2">
            Email me <span aria-hidden>→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------- hero ---------------------------------------------------- */

export function V3aHero() {
  return (
    <section className="relative overflow-hidden v3-grid">
      <div className="v3-glow" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-32 grid lg:grid-cols-12 gap-16 items-center">
        <FadeIn className="lg:col-span-7">
          <div className="mb-8">
            <Eyebrow>
              CAPE TOWN · 2026
              <span className="sep">·</span>
              <span style={{ color: "var(--v3-accent)" }}>SHIPPING DAILY</span>
            </Eyebrow>
          </div>
          <h1 className="v3-display mb-7">
            Direct response operator.
            <br />
            <span className="accent">Production AI builder.</span>
          </h1>
          <p className="v3-body max-w-xl mb-10 text-[16px]">
            Six years in direct response. Two years shipping production AI. Built
            Foxelli Studio — an end-to-end ad production platform serving a $20M+
            DTC portfolio. Eleven systems shipped end-to-end. Founder of Copyweb.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#systems" className="v3-btn v3-btn--accent">
              See the systems <span aria-hidden>→</span>
            </a>
            <a href="mailto:liam@copyweb.io" className="v3-btn">
              Email liam@copyweb.io
            </a>
            <span className="ml-2 hidden md:inline v3-mono text-[11px] text-[var(--v3-text-tertiary)] tracking-[0.16em]">
              ⌘K to start
            </span>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 v3-mono text-[11px] tracking-[0.16em] uppercase text-[var(--v3-text-tertiary)]">
            <span><span style={{ color: "var(--v3-text)" }}>26</span> production workflows</span>
            <span><span style={{ color: "var(--v3-text)" }}>60+</span> custom skills</span>
            <span><span style={{ color: "var(--v3-text)" }}>11</span> systems shipped</span>
            <span><span style={{ color: "var(--v3-text)" }}>$800K/mo</span> peak revenue</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-5">
          <TerminalMock
            title="liam@operator · ~/portfolio"
            lines={[
              { text: <><span className="prompt">❯</span> liam --status</>, },
              { text: "◆ direct-response · 6 yrs · $20M+ portfolio", className: "dim" },
              { text: "◆ production AI · 26 workflows · 11 systems", className: "dim" },
              { text: "✓ foxelli-studio       LIVE   $414→$800K/mo", className: "ok" },
              { text: "✓ lfsl-pipeline        LIVE   60-min cold pack", className: "ok" },
              { text: "✓ cinematic-ad-pipeline LIVE  $3.16/spot", className: "ok" },
              { text: "✓ skill-library        LIVE   60+ skills", className: "ok" },
              { text: "○ next                 → diagnostic-build", className: "dim" },
              { text: "" },
              { text: <><span className="prompt">❯</span> liam --hire <span className="hl">_</span></> },
            ]}
          />
          <div className="mt-3 flex items-center justify-between v3-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--v3-text-tertiary)]">
            <span>● ONLINE · accepting 2 founder-rate slots</span>
            <span>UPDATED 2026</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- systems grid (BridgeMind "Four products" pattern) ------ */

const FEATURED = [
  caseStudies.find((c) => c.slug === "foxelli-studio")!,
  caseStudies.find((c) => c.slug === "static-ad-system")!,
  caseStudies.find((c) => c.slug === "skill-library")!,
  caseStudies.find((c) => c.slug === "cinematic-ad-pipeline")!,
];

export function V3aSystems() {
  return (
    <section id="systems" className="relative border-t border-[var(--v3-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-14">
          <Eyebrow>FOUR FLAGSHIP SYSTEMS<span className="sep">·</span>SHIPPED TO PRODUCTION</Eyebrow>
          <h2 className="v3-h2 mt-5">
            Eleven systems. <span style={{ color: "var(--v3-text-tertiary)" }}>One operator.</span>
          </h2>
          <p className="v3-body mt-5">
            Every project below ran in production with real users and real
            revenue depending on the output. The four flagships sit at the top.
            The other seven are linked.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Foxelli Studio — flagship card with inline kanban */}
          <FadeIn>
            <Link href="#spotlight" className="v3-card v3-card--accent p-7 block group">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 grid place-items-center v3-mono text-[15px] border border-[rgba(68,201,117,0.4)] bg-[var(--v3-accent-glow)] text-[var(--v3-accent)]">
                    F
                  </div>
                  <StatusPill variant="live">LIVE</StatusPill>
                </div>
                <span className="v3-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--v3-accent)]">FLAGSHIP</span>
              </div>
              <h3 className="v3-h3 text-[22px] leading-tight mb-2">{FEATURED[0].title}</h3>
              <p className="v3-body text-[14px] mb-5">
                Your ad production desktop — kanban, agent teammates, 26-workflow
                engine, all in one platform. Six months from blank repo to daily
                team use.
              </p>
              <ul className="space-y-2 mb-6 text-[13px] text-[var(--v3-text-secondary)]">
                <li>· 26 production workflows · 60+ custom skills</li>
                <li>· 4-layer script chain w/ prompt caching</li>
                <li>· Architected for 100 concurrent users</li>
              </ul>
              <KanbanMock
                columns={[
                  { title: "Todo", cards: ["script v3", "voice clone"] },
                  { title: "Doing", cards: ["◆ render queue"] },
                  { title: "Shipped", cards: ["storyboard", "FFmpeg comp"] },
                ]}
              />
              <div className="mt-6 flex items-center justify-between">
                <span className="v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
                  {FEATURED[0].year} · daily use
                </span>
                <span className="v3-link text-[13px]">Open spotlight →</span>
              </div>
            </Link>
          </FadeIn>

          {/* LFSL — terminal mock */}
          <FadeIn delay={0.05}>
            <a href="#all" className="v3-card p-7 block group">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 grid place-items-center v3-mono text-[15px] border border-[var(--v3-border-strong)] bg-[var(--v3-surface-elevated)]">
                    L
                  </div>
                  <StatusPill variant="live">LIVE</StatusPill>
                </div>
                <span className="v3-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--v3-text-tertiary)]">SHIPPED</span>
              </div>
              <h3 className="v3-h3 text-[22px] leading-tight mb-2">{FEATURED[1].title}</h3>
              <p className="v3-body text-[14px] mb-5">
                Cold-outreach pack in 60 minutes of human time. Copy delegated
                across 16 expert frameworks. Media at 60% under retail.
              </p>
              <TerminalMock
                title="~/copyweb · /lfsl"
                lines={[
                  { text: <><span className="prompt">❯</span> /lfsl tower28.com</> },
                  { text: "✓ research · 22 questions answered", className: "ok" },
                  { text: "✓ brief · prospect-facing artifact", className: "ok" },
                  { text: "✓ ads · 5 concepts · 5 frameworks", className: "ok" },
                  { text: "✓ sales letter · long-form deployed", className: "ok" },
                  { text: "▲ pack ready · 58 min", className: "hl" },
                ]}
              />
              <div className="mt-6 flex items-center justify-between">
                <span className="v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">2026 · daily prod</span>
                <span className="v3-link text-[13px]">Read the case →</span>
              </div>
            </a>
          </FadeIn>

          {/* Skill library — diff mock */}
          <FadeIn delay={0.1}>
            <a href="#all" className="v3-card p-7 block group">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 grid place-items-center v3-mono text-[15px] border border-[var(--v3-border-strong)] bg-[var(--v3-surface-elevated)]">
                    S
                  </div>
                  <StatusPill variant="live">LIVE</StatusPill>
                </div>
                <span className="v3-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--v3-text-tertiary)]">META-TOOLING</span>
              </div>
              <h3 className="v3-h3 text-[22px] leading-tight mb-2">{FEATURED[2].title}</h3>
              <p className="v3-body text-[14px] mb-5">
                60+ custom Claude Code skills running production work. Don&apos;t
                write the script. Write the skill that writes the script.
              </p>
              <DiffMock
                filename=".claude/skills/lfsl/SKILL.md"
                added={48}
                removed={12}
                lines={[
                  { text: "+ name: lfsl", type: "add" },
                  { text: "+ description: cold-outreach pack orchestrator", type: "add" },
                  { text: "+ phases: research → brief → ads → letter → deploy", type: "add" },
                  { text: "- TODO: stub", type: "del" },
                  { text: "  status: validated · 4 brands shipped", type: "dim" },
                ]}
              />
              <div className="mt-6 flex items-center justify-between">
                <span className="v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">2025—now · used daily</span>
                <span className="v3-link text-[13px]">Browse the library →</span>
              </div>
            </a>
          </FadeIn>

          {/* Cinematic Ad — terminal mock */}
          <FadeIn delay={0.15}>
            <a href="#all" className="v3-card p-7 block group">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 grid place-items-center v3-mono text-[15px] border border-[var(--v3-border-strong)] bg-[var(--v3-surface-elevated)]">
                    C
                  </div>
                  <StatusPill variant="live">LIVE</StatusPill>
                </div>
                <span className="v3-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--v3-text-tertiary)]">SHIPPED</span>
              </div>
              <h3 className="v3-h3 text-[22px] leading-tight mb-2">{FEATURED[3].title}</h3>
              <p className="v3-body text-[14px] mb-5">
                Single AI video ad spots, end-to-end. Cross-scene face
                consistency, voice clone, brand-fit ranker before delivery.
              </p>
              <TerminalMock
                title="~/cinematic-ad · /run"
                lines={[
                  { text: <><span className="prompt">❯</span> /cinematic-ad clove-ona.png</> },
                  { text: "✓ storyboard · 4K · GPT Image 2", className: "ok" },
                  { text: "✓ video · Seedance 2.0 · 720p", className: "ok" },
                  { text: "✓ voice · ElevenLabs clone", className: "ok" },
                  { text: "✓ FFmpeg composite · logo placed", className: "ok" },
                  { text: "▲ spot ready · cost $3.16", className: "hl" },
                ]}
              />
              <div className="mt-6 flex items-center justify-between">
                <span className="v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">2026 · daily prod</span>
                <span className="v3-link text-[13px]">Watch a sample →</span>
              </div>
            </a>
          </FadeIn>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--v3-border)] pt-6">
          <span className="v3-mono text-[12px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
            + 7 more · ad professor · agent quintet · forge · copyweb.io · mission control · the canon · cinematic sites
          </span>
          <a href="#all" className="v3-link text-[13px]">View all systems →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- workflow (BridgeMind "From prompt to production") ------- */

export function V3aWorkflow() {
  return (
    <section id="workflow" className="relative border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-16">
          <Eyebrow>HOW I BUILD<span className="sep">·</span>3 STEPS</Eyebrow>
          <h2 className="v3-h2 mt-5">
            From prompt <span style={{ color: "var(--v3-text-tertiary)" }}>to</span> production.
          </h2>
          <p className="v3-body mt-5">
            Describe the system. Architect it across the right layers. Ship it
            into the team&apos;s daily workflow. The order is not optional.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-5">
          <FadeIn>
            <div className="v3-card p-7 h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="v3-mono text-[60px] font-light leading-none text-[var(--v3-text)]">01</span>
                <StepNum n="STEP 01" active />
              </div>
              <Eyebrow dot={false}>NATURAL LANGUAGE INTENT</Eyebrow>
              <h3 className="v3-h3 text-[24px] mt-3 mb-3">Describe.</h3>
              <p className="v3-body text-[14px] mb-6">
                Brand, problem, success metric, constraint. Six years of direct
                response means I can scope what good looks like before a single
                line of code lands.
              </p>
              <TerminalMock
                title="intake · liam"
                lines={[
                  { text: "brand · DTC supplements · $20M ARR", className: "dim" },
                  { text: "problem · script→video pipeline broken", className: "dim" },
                  { text: "metric · 25→150 ads/wk · cost flat", className: "dim" },
                  { text: "intent parsed · scope locked", className: "ok" },
                ]}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="v3-card p-7 h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="v3-mono text-[60px] font-light leading-none text-[var(--v3-text)]">02</span>
                <StepNum n="STEP 02" active />
              </div>
              <Eyebrow dot={false}>5-LAYER ARCHITECTURE</Eyebrow>
              <h3 className="v3-h3 text-[24px] mt-3 mb-3">Architect.</h3>
              <p className="v3-body text-[14px] mb-6">
                Context, Data, Intelligence, Agents, Commands. Each layer owns a
                responsibility. Stateful logic in Postgres. Heavy media calls in
                n8n. Split by responsibility, not by what&apos;s convenient.
              </p>
              <TerminalMock
                title="architect · review"
                lines={[
                  { text: "Context  · brand-brain.yaml · v1.0", className: "dim" },
                  { text: "Data     · Supabase · RLS · allow-list", className: "dim" },
                  { text: "Intel    · Claude Opus 4.7 · cached", className: "dim" },
                  { text: "Agents   · n8n · queue · retry · fallback", className: "dim" },
                  { text: "Commands · /skills · skill orchestrator", className: "ok" },
                ]}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="v3-card p-7 h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="v3-mono text-[60px] font-light leading-none text-[var(--v3-text)]">03</span>
                <StepNum n="STEP 03" active />
              </div>
              <Eyebrow dot={false}>PRODUCTION-GRADE OUTPUT</Eyebrow>
              <h3 className="v3-h3 text-[24px] mt-3 mb-3">Ship.</h3>
              <p className="v3-body text-[14px] mb-6">
                Endpoint allowlisting. Tiered rate limits. Adaptive polling.
                Stuck-job detection. Per-op cancellation refs. The boring layer
                that keeps daily use boring.
              </p>
              <DiffMock
                filename="ship-checklist.ts"
                added={42}
                removed={3}
                lines={[
                  { text: "+ 73 production bugs resolved", type: "add" },
                  { text: "+ 4 security audits passed", type: "add" },
                  { text: "+ 100 concurrent users handled", type: "add" },
                  { text: "- TODO: validate", type: "del" },
                ]}
              />
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 max-w-2xl">
          <p className="v3-body">
            From first scope to first deploy in under three weeks for the
            average system. The rest is the system getting smarter from real
            usage.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- spotlight (BridgeMind big-product section) -------------- */

export function V3aSpotlight() {
  const cs = FEATURED[0];
  return (
    <section id="spotlight" className="relative border-t border-[var(--v3-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-14">
          <Eyebrow>
            FLAGSHIP CASE STUDY<span className="sep">·</span>SHIPPED TO PRODUCTION
            <span className="sep">·</span>
            <span style={{ color: "var(--v3-accent)" }}>{cs.year}</span>
          </Eyebrow>
          <h2 className="v3-h2 mt-5">
            <span style={{ color: "var(--v3-accent)" }}>Foxelli Studio.</span>{" "}
            <span style={{ color: "var(--v3-text-tertiary)" }}>
              Your ad production command center.
            </span>
          </h2>
          <p className="v3-body mt-5 max-w-2xl">
            One platform. Multi-pane terminals. Live kanban. One-click agent
            teammates. And the surface area an ads team needs to ship 25 → 150
            video ads a week without context switching.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 v3-mono text-[11px] tracking-[0.16em] uppercase text-[var(--v3-text-tertiary)]">
            <span>FOXELLI GROUP</span>
            <span style={{ color: "var(--v3-text-faint)" }}>·</span>
            <span>NETHERLANDS</span>
            <span style={{ color: "var(--v3-text-faint)" }}>·</span>
            <span>7 DTC BRANDS</span>
            <span style={{ color: "var(--v3-text-faint)" }}>·</span>
            <span style={{ color: "var(--v3-accent)" }}>$20M+ PORTFOLIO</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="v3-card p-6 md:p-10 mb-10">
            <KanbanMock
              columns={[
                {
                  title: "Todo · 6",
                  cards: [
                    "Q3 hero script",
                    "Voice clone · founder",
                    "VEO 3.1 storyboard",
                  ],
                },
                {
                  title: "Doing · 3",
                  cards: ["◆ render queue · seedance", "◆ FFmpeg composite"],
                },
                {
                  title: "Shipped · 142",
                  cards: ["Blackmores Q3 · 24 ads", "DryQuick · 9 ads", "Lash Hub · 12 ads"],
                },
              ]}
            />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cs.metrics.map((m) => (
            <FadeIn key={m.label}>
              <div className="v3-card p-6">
                <div className="v3-mono text-[40px] font-light leading-none mb-3 text-[var(--v3-text)]">
                  {m.value}
                </div>
                <div className="v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
                  {m.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {cs.sections.slice(0, 4).map((sec) => (
            <FadeIn key={sec.heading}>
              <h4 className="v3-h3 text-[18px] mb-3">{sec.heading}</h4>
              <p className="v3-body">{sec.body}</p>
            </FadeIn>
          ))}
        </div>

        {cs.proofPoint && (
          <div className="mt-16 v3-card v3-card--accent p-8 md:p-10">
            <Eyebrow>PROOF POINT<span className="sep">·</span>BLACKMORES</Eyebrow>
            <p className="v3-h2 text-[28px] md:text-[36px] mt-4 max-w-3xl" style={{ lineHeight: 1.2 }}>
              {cs.proofPoint}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- stack (BridgeMind agentic-stack pattern) ---------------- */

const STACK_LOGOS = [
  "Claude Opus 4.7",
  "Claude Code",
  "Cursor",
  "Codex",
  "Gemini 3 Pro",
  "Supabase",
  "n8n",
  "Vercel",
  "Next.js 15",
  "Replit",
  "Modal.com",
  "Kie.ai",
  "ElevenLabs",
  "GPT Image 2",
  "Nano Banana 2",
  "Seedance 2",
  "Kling 3.0",
  "VEO 3.1",
  "Apollo",
  "Hunter",
  "Resend",
  "Telegram",
  "Stripe",
  "Clerk",
];

export function V3aStack() {
  return (
    <section id="stack" className="relative border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-14">
          <Eyebrow>UNIFIED STACK<span className="sep">·</span>24+ TOOLS WIRED</Eyebrow>
          <h2 className="v3-h2 mt-5">
            The <span style={{ color: "var(--v3-accent)" }}>builder&apos;s</span> stack.
          </h2>
          <p className="v3-body mt-5">
            Use-case aware, not vendor-loyal. The model that ships the work
            today is rarely the one I reach for next quarter. Everything below
            is wired in production right now.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="v3-marquee py-6 border-y border-[var(--v3-border)]">
            <div className="v3-marquee-track">
              {[...STACK_LOGOS, ...STACK_LOGOS].map((tool, i) => (
                <span
                  key={i}
                  className="v3-mono text-[15px] tracking-[0.04em] text-[var(--v3-text-secondary)] whitespace-nowrap"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          <FadeIn>
            <div className="v3-card p-7 h-full">
              <Eyebrow>EDITOR · NATIVE</Eyebrow>
              <h4 className="v3-h3 text-[20px] mt-3 mb-3">One config. Every agent ready.</h4>
              <p className="v3-body text-[14px] mb-5">
                MCP servers wired into Cursor + Claude Code: Supabase, n8n,
                Notion, GitHub, Firecrawl, Figma, Stitch.
              </p>
              <TerminalMock
                title=".cursor/mcp.json"
                lines={[
                  { text: "{", className: "dim" },
                  { text: '  "mcpServers": {', className: "dim" },
                  { text: '    "supabase": { "command": "npx", "args": [...] },', className: "hl" },
                  { text: '    "n8n":      { "command": "npx", "args": [...] },', className: "hl" },
                  { text: "  }", className: "dim" },
                  { text: "}", className: "dim" },
                ]}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="v3-card p-7 h-full">
              <Eyebrow>CLI · POWERFUL</Eyebrow>
              <h4 className="v3-h3 text-[20px] mt-3 mb-3">Skill orchestrators run the work.</h4>
              <p className="v3-body text-[14px] mb-5">
                /lfsl, /creative-engine, /cinematic-ad, /customer-research,
                /codex-loop, /humanizer, /fact-checker. 60+ skills, all
                progressive-disclosure.
              </p>
              <TerminalMock
                title="~/.claude/skills"
                lines={[
                  { text: "$ ls -1 | wc -l", className: "dim" },
                  { text: "60", className: "ok" },
                  { text: "$ /lfsl tower28.com", className: "dim" },
                  { text: "▲ pack ready · 58 min", className: "hl" },
                ]}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="v3-card p-7 h-full">
              <Eyebrow>ALWAYS · SYNCED</Eyebrow>
              <h4 className="v3-h3 text-[20px] mt-3 mb-3">Switch tools mid-task. State follows.</h4>
              <p className="v3-body text-[14px] mb-5">
                Vault is the single source of truth. Auto-memory persists across
                sessions. The work compounds because the substrate compounds.
              </p>
              <TerminalMock
                title="vault · sync"
                lines={[
                  { text: "$ git status", className: "dim" },
                  { text: "On branch main · clean", className: "ok" },
                  { text: "$ vault.memory.size", className: "dim" },
                  { text: "240+ entries · 4 types", className: "ok" },
                ]}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ---------- arc (the journey ledger) -------------------------------- */

export function V3aArc() {
  return (
    <section id="arc" className="relative border-t border-[var(--v3-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-12">
          <Eyebrow>THE ARC<span className="sep">·</span>5 YEARS</Eyebrow>
          <h2 className="v3-h2 mt-5">
            From DR copy <span style={{ color: "var(--v3-text-tertiary)" }}>to</span> production AI.
          </h2>
        </FadeIn>

        <div className="max-w-5xl">
          {arc.map((phase, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="v3-ledger grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                <div className="md:col-span-3">
                  <div className="v3-mono text-[12px] tracking-[0.18em] uppercase text-[var(--v3-accent)]">
                    {phase.years}
                  </div>
                  <div className="v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)] mt-2">
                    {phase.geo}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="v3-h3 text-[20px] mb-1">{phase.role}</h3>
                  <div className="v3-mono text-[12px] tracking-[0.06em] uppercase text-[var(--v3-text-tertiary)] mb-4">
                    {phase.org}
                  </div>
                  <p className="v3-body mb-4">{phase.body}</p>
                  <div className="inline-flex items-center gap-2 v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-accent)] border border-[rgba(68,201,117,0.3)] px-3 py-1 bg-[var(--v3-accent-glow)]">
                    ▲ {phase.highlight}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- proof (BridgeMind reviews pattern) ---------------------- */

const PROOFS = [
  {
    initial: "B",
    name: "Blackmores",
    role: "DTC supplements brand · Foxelli portfolio",
    rating: "5.0",
    body: "Revenue went from $414K/mo to $800K/mo with this pipeline running it. The output rate doubled, the CAC didn't move. The platform is the team's daily driver now — every editor, every brand, every market.",
    date: "Mar 2026",
  },
  {
    initial: "F",
    name: "Foxelli Studio team",
    role: "Internal · 7 DTC brands",
    rating: "5.0",
    body: "We were producing 25 ads a week. Liam shipped a 26-workflow engine. We went to 150/week with the same team and a flat cost line. The 4-layer script chain caching alone paid for the build.",
    date: "Feb 2026",
  },
  {
    initial: "C",
    name: "Clove Ona Brilliant White",
    role: "DTC oral care · LFSL pack",
    rating: "5.0",
    body: "Pack arrived in under 4 hours. Customer Intelligence Brief was sharper than anything our agency produced. Five ads grounded in five different expert frameworks. Long-form deployed live. Then he sent it as a DM with no ask.",
    date: "Apr 2026",
  },
];

export function V3aProof() {
  return (
    <section className="relative border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-14">
          <Eyebrow>SHIP-LEVEL PROOF<span className="sep">·</span>REVENUE RECEIPTS</Eyebrow>
          <h2 className="v3-h2 mt-5">
            What it shipped. <span style={{ color: "var(--v3-text-tertiary)" }}>Receipts only.</span>
          </h2>
          <p className="v3-body mt-5">
            Three projects. Three different layers of the stack. Three pieces of
            evidence that the systems work in production.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-5">
          {PROOFS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="v3-card p-7 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 grid place-items-center v3-mono text-[14px] border border-[var(--v3-border-strong)] bg-[var(--v3-surface-elevated)]">
                      {p.initial}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium">{p.name}</div>
                      <div className="v3-mono text-[10.5px] tracking-[0.06em] text-[var(--v3-text-tertiary)]">
                        {p.role}
                      </div>
                    </div>
                  </div>
                  <span className="v3-mono text-[12px] text-[var(--v3-accent)]">★ {p.rating}</span>
                </div>
                <p className="v3-body text-[14px] mb-5">{p.body}</p>
                <div className="v3-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
                  {p.date} · case-study evidence
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- big CTA ------------------------------------------------- */

export function V3aCTA() {
  return (
    <section className="relative border-t border-[var(--v3-border)] v3-grid">
      <div className="v3-glow" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-32 text-center">
        <FadeIn className="max-w-4xl mx-auto">
          <Eyebrow>READY TO BUILD<span className="sep">·</span>2 FOUNDER-RATE SLOTS OPEN</Eyebrow>
          <h2 className="v3-display mt-6">
            Stop pitching AI. <span className="accent">Ship the system.</span>
          </h2>
          <p className="v3-body mt-6 max-w-2xl mx-auto text-[16px]">
            Architect → Build → Ship. The same loop that took Foxelli Studio
            from blank repo to daily use in six months. For DTC and CPG brands
            at $10M–$100M.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:liam@copyweb.io" className="v3-btn v3-btn--accent">
              Email me <span aria-hidden>→</span>
            </a>
            <a href="https://copyweb.io" target="_blank" rel="noopener noreferrer" className="v3-btn">
              See Copyweb
            </a>
            <span className="ml-2 hidden md:inline v3-mono text-[11px] text-[var(--v3-text-tertiary)] tracking-[0.16em]">
              ⌘K to start
            </span>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
            <li>· founder rate · 60% off retail</li>
            <li>· 6-week build window</li>
            <li>· no agencies · no juniors</li>
            <li>· receipts on request</li>
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- footer -------------------------------------------------- */

export function V3aFooter() {
  return (
    <footer className="border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-7 border border-[var(--v3-border-strong)] grid place-items-center v3-mono text-[11px] tracking-[0.18em]">
              LP
            </span>
            <span className="text-[14px] font-medium">Liam Petersen</span>
          </div>
          <p className="v3-body text-[13px]">
            Direct response operator. Production AI builder. Cape Town, shipping
            for DTC brands worldwide.
          </p>
        </div>

        <div>
          <h4 className="v3-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--v3-text-tertiary)] mb-4">
            SYSTEMS
          </h4>
          <ul className="space-y-2 text-[13px] text-[var(--v3-text-secondary)]">
            <li>Foxelli Studio</li>
            <li>LFSL Pipeline</li>
            <li>Cinematic Ad</li>
            <li>Skill Library</li>
          </ul>
        </div>

        <div>
          <h4 className="v3-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--v3-text-tertiary)] mb-4">
            CONTACT
          </h4>
          <ul className="space-y-2 text-[13px] text-[var(--v3-text-secondary)]">
            <li><a className="v3-link" href="mailto:liam@copyweb.io">liam@copyweb.io</a></li>
            <li><a className="v3-link" href="https://copyweb.io">copyweb.io</a></li>
            <li><a className="v3-link" href="#">linkedin / x / github</a></li>
          </ul>
        </div>

        <div>
          <h4 className="v3-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--v3-text-tertiary)] mb-4">
            VARIANTS
          </h4>
          <ul className="space-y-2 text-[13px] text-[var(--v3-text-secondary)]">
            <li><Link className="v3-link" href="/v3">v3 · chooser</Link></li>
            <li><Link className="v3-link" href="/v3/b">v3 · operator (B)</Link></li>
            <li><Link className="v3-link" href="/v2">v2 · vibecademy</Link></li>
            <li><Link className="v3-link" href="/">v1 · helios</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--v3-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between v3-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
          <span>© 2026 Liam Petersen · prototype v3a</span>
          <span>BUILT ON CLAUDE CODE · DEPLOYED ON VERCEL</span>
        </div>
      </div>
    </footer>
  );
}
