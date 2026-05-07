"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { arc } from "@/data/arc";
import { stackTabs } from "@/data/stack";
import {
  Eyebrow,
  Pill,
  Button,
  Card,
  FadeIn,
  SectionHeading,
  EngineeringMarkers,
  AnimatedCounter,
} from "./ui";

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/70 border-b border-[var(--color-border-structural)]/40">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold tracking-tight text-[var(--color-accent)]">
            LP
          </span>
          <span className="text-sm font-medium text-[var(--color-text-secondary)] hidden sm:inline">
            Liam Petersen
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--color-text-secondary)]">
          <a href="#systems" className="hover:text-[var(--color-text-primary)] transition-colors">Systems</a>
          <a href="#arc" className="hover:text-[var(--color-text-primary)] transition-colors">Arc</a>
          <a href="#stack" className="hover:text-[var(--color-text-primary)] transition-colors">Stack</a>
          <a href="#about" className="hover:text-[var(--color-text-primary)] transition-colors">About</a>
        </div>
        <Button href="mailto:liam@copyweb.io" variant="secondary">
          Email me
        </Button>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO — with aurora + engineering markers + ambient glow            */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] pt-32 pb-24 overflow-hidden flex items-center"
    >
      <div className="aurora"><span /></div>
      <div className="absolute inset-0 dot-grid opacity-90 z-[1]" />
      <div className="absolute inset-0 ambient-glow breathe pointer-events-none z-[1]" />
      <EngineeringMarkers />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full">
        <FadeIn>
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              Open to senior AI + advisory roles · Remote, global
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02] tracking-[-0.04em] font-medium text-[var(--color-text-primary)] max-w-4xl">
            Six years in direct response. Two years shipping production AI.{" "}
            <span className="text-[var(--color-text-secondary)]">The numbers got bigger.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 max-w-2xl space-y-5 text-[16px] leading-[1.7] text-[var(--color-text-secondary)]">
            <p>
              I&apos;m Liam. I&apos;ve spent six years writing copy that had to convert or get killed,
              and the last two building the systems that scale that work to a portfolio doing $20M+ a year.
            </p>
            <p>
              I&apos;m not a developer pretending to understand marketing. I&apos;m a direct response operator
              who learned to ship platforms because no one was building the ones I needed.
            </p>
            <p className="text-[var(--color-text-primary)]">
              <strong className="font-medium">Every system on this site was built inside Claude Code.</strong>{" "}
              Frontends, backends, agents, skills, MCP integrations. One runtime, one operator, real receipts.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="#systems">View my projects</Button>
            <Button href="mailto:liam@copyweb.io" variant="secondary">
              Email me
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
            <span className="text-[var(--color-accent)]/70">▎</span> Worked across the US, Europe, and South Africa.
            Currently founder at Copyweb, building custom AI marketing systems for $10M–$100M DTC brands.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BUILD DOCTRINE STRIP                                               */
/* ------------------------------------------------------------------ */

export function BuildDoctrine() {
  return (
    <section className="relative border-y border-[var(--color-border-structural)]/60 bg-[var(--color-surface)]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center gap-4 overflow-x-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] whitespace-nowrap">
          {"// build doctrine"}
        </span>
        <span className="text-[13px] text-[var(--color-text-secondary)] whitespace-nowrap md:whitespace-normal">
          Every system below was built on Claude Code. Custom skills, MCP servers, CLIs wired into one runtime.
          AI as the build environment, not the assistant.
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TL;DR STRIP — the 10-second answer for HR scanners                 */
/* ------------------------------------------------------------------ */

const tldr = [
  { label: "Role", value: "Direct response operator + AI builder" },
  { label: "Experience", value: "6 yrs DR copy · 2 yrs production AI" },
  { label: "Worked across", value: "United States · Europe · South Africa" },
  { label: "Status", value: "Open to senior AI + advisory roles · Remote, global" },
];

export function TLDR() {
  return (
    <section className="relative py-12 md:py-16 border-b border-[var(--color-border-structural)]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-6">
            // tl;dr
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
          {tldr.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.06}>
              <div className="border-l-2 border-[var(--color-accent)]/50 pl-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-2 font-mono">
                  {item.label}
                </div>
                <div className="text-[14px] leading-snug text-[var(--color-text-primary)]">
                  {item.value}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RECEIPTS STRIP                                                     */
/* ------------------------------------------------------------------ */

type Receipt = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  sub: string;
};

const receipts: Receipt[] = [
  { value: 3, suffix: "×", label: "Site conversion lift", sub: "1.2% → 3.6% at Foxelli" },
  { value: 3.3, suffix: "×", label: "Email revenue scaled", sub: "$76K → $249K in 4 months" },
  { value: 6, suffix: "×", label: "Video ad output", sub: "25/wk → 150/wk, same 4 editors" },
  { value: 674, prefix: "$", suffix: "K/mo", label: "Peak revenue", sub: "Through systems I built" },
];

export function Receipts() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeading
            eyebrow="// receipts"
            title="Real numbers from production systems."
            description="Every number below ties to a system I shipped. No vanity metrics, no rounding tricks."
          />
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {receipts.map((r, i) => (
            <FadeIn key={r.label} delay={i * 0.08}>
              <Card className="card-lift p-7 h-full hover:border-[var(--color-accent)]/40">
                <div className="text-[44px] md:text-[56px] font-medium text-[var(--color-accent)] tracking-[-0.04em] leading-none tabular-nums">
                  <AnimatedCounter value={r.value} prefix={r.prefix} suffix={r.suffix} />
                </div>
                <div className="mt-4 text-[13px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                  {r.label}
                </div>
                <div className="mt-2 text-[12px] text-[var(--color-text-tertiary)] font-mono">
                  {r.sub}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ARC — full timeline with alternating sides                         */
/* ------------------------------------------------------------------ */

export function Arc() {
  return (
    <section id="arc" className="relative py-24 md:py-32 border-t border-[var(--color-border-structural)]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeading
            eyebrow="// the arc"
            title="From copy to code, across three continents."
            description="Six years of direct response craft. Two years of production AI systems. The line between writing and shipping got thinner every year."
          />
        </FadeIn>

        <div className="mt-16 relative">
          <div
            aria-hidden
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)]/40 via-[var(--color-border-structural)] to-transparent"
          />
          <div className="space-y-12">
            {arc.map((phase, i) => (
              <FadeIn key={phase.years} delay={i * 0.1}>
                <div
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-12 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]"
                  />

                  <div className="ml-12 md:ml-0 md:px-6 md:text-right">
                    <Eyebrow>{phase.years}</Eyebrow>
                    <h3 className="mt-2 text-[22px] md:text-[26px] font-medium text-[var(--color-text-primary)] tracking-[-0.02em]">
                      {phase.role}
                    </h3>
                    <div className="mt-1 text-[14px] text-[var(--color-text-secondary)]">
                      {phase.org}
                    </div>
                    <div className="mt-1 text-[12px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-[0.12em]">
                      {phase.geo}
                    </div>
                  </div>

                  <div className="ml-12 md:ml-0 md:px-6">
                    <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                      {phase.body}
                    </p>
                    <div className="mt-4 inline-flex">
                      <Pill tone="accent">{phase.highlight}</Pill>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRINCIPLES — 5 cards                                               */
/* ------------------------------------------------------------------ */

const principles = [
  {
    title: "Claude Code is the build environment, not the assistant.",
    body:
      "Every system in this portfolio shipped through Claude Code. Frontends, backends, agents, skills, MCP integrations, CLIs. One runtime. Most people use AI to write code. I use it to ship systems.",
  },
  {
    title: "Humans stay in the chair.",
    body:
      "AI handles 90% of the heavy lifting. The human approves every output that touches a customer. Brand voice, creative instinct, customer empathy. Those don't get automated.",
  },
  {
    title: "Every system gets a learning loop.",
    body:
      "If it can't get smarter from the work, I haven't finished building it. Editor feedback, customer corrections, failed campaigns. All of it feeds back into the next pass.",
  },
  {
    title: "Build the meta-tool.",
    body:
      "Don't write a script when you can write the skill that writes the script. Don't write the skill when you can write the agent that picks the right skill. The leverage compounds.",
  },
  {
    title: "Run AI economically.",
    body:
      "All media generation routed through Kie.ai at ~60% under retail. Token discipline upstream: prompt caching, tight context windows, reuse over re-fetching. Cost-engineering an AI stack is engineering. I do both halves.",
  },
];

export function Principles() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--color-border-structural)]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeading
            eyebrow="// how I work"
            title="Five principles that decide what gets built and what doesn't."
          />
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <Card className="card-lift p-8 h-full hover:border-[var(--color-accent)]/40">
                <div className="font-mono text-[11px] text-[var(--color-accent)]/70 mb-4">
                  P-0{i + 1}
                </div>
                <h3 className="text-[20px] font-medium text-[var(--color-text-primary)] tracking-[-0.015em] leading-snug">
                  {p.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                  {p.body}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STACK — tabbed                                                     */
/* ------------------------------------------------------------------ */

export function Stack() {
  const [activeTab, setActiveTab] = useState(stackTabs[0].id);
  const active = stackTabs.find((t) => t.id === activeTab) ?? stackTabs[0];

  return (
    <section id="stack" className="relative py-24 md:py-32 border-t border-[var(--color-border-structural)]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeading
            eyebrow="// stack"
            title="The runtime, the surfaces, and what's wired in."
            description="Most portfolios list AI alongside React. Mine doesn't. AI is the layer everything else runs through."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            {stackTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                  activeTab === t.id
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "border-[var(--color-border-structural)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="mt-8 p-8 md:p-10">
            {active.note && (
              <p className="mb-8 text-[14px] leading-relaxed text-[var(--color-text-secondary)] max-w-2xl border-l-2 border-[var(--color-accent)]/40 pl-4">
                {active.note}
              </p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {active.groups.map((g) => (
                <div key={g.heading}>
                  <h4 className="text-[12px] uppercase tracking-[0.15em] text-[var(--color-accent)]/80 font-semibold mb-4">
                    {g.heading}
                  </h4>
                  <ul className="space-y-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="text-[13px] leading-relaxed text-[var(--color-text-secondary)] font-mono"
                      >
                        <span className="text-[var(--color-accent)]/40 mr-2">▎</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-[var(--color-border-structural)]/60">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeading eyebrow="// about" title="A builder who used to write copy." />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 space-y-6 text-[16px] leading-[1.8] text-[var(--color-text-secondary)]">
            <p>
              I&apos;m Liam. Writing this from Cape Town. Wife, a kid, and a six-year direct response
              habit that won&apos;t quit.
            </p>
            <p>
              The story starts in 2021 with daily emails for a crypto gaming platform. Two years
              later, more emails written than worth counting, and the only lesson that matters
              in direct response was learned: you&apos;ll know if it worked by Wednesday.
            </p>
            <p>
              Got into AI early. Not because AI was exciting. Because the same brief twice was
              killing me. By 2024 I was running AI strategy across seven DTC brands and a $20M+
              portfolio. By 2026, four production AI platforms shipped and 60+ custom Claude Code
              skills authored.
            </p>
            <p className="text-[var(--color-text-primary)]">
              I don&apos;t call myself an architect or an engineer. I&apos;m a builder. I write copy, I ship code,
              I run systems, and I lead teams. The line between those things got thinner every year, and I stopped
              trying to draw it.
            </p>
            <p className="font-mono text-[13px] text-[var(--color-text-tertiary)] pt-4 border-t border-[var(--color-border-structural)]/50">
              Open to senior AI and advisory roles. Remote, global. Or just say hi.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12">
            <Eyebrow>Certifications</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Claude Code in Action — Anthropic",
                "Building with the Claude API — Anthropic",
                "Introduction to MCP — Anthropic",
                "MCP: Advanced Topics — Anthropic (in progress)",
                "EFSET English C2 Advanced (75/100)",
              ].map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT + FOOTER                                                   */
/* ------------------------------------------------------------------ */

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-[var(--color-border-structural)]/60">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <Eyebrow>// contact</Eyebrow>
          <h2 className="mt-4 text-[36px] md:text-[52px] font-medium tracking-[-0.03em] leading-[1.05]">
            Let&apos;s build something that compounds.
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Open to senior AI engineering, AI strategy, and advisory roles. Remote, global. Available now.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="mailto:liam@copyweb.io">Email me</Button>
            <Button href="https://linkedin.com/in/liam-petersen-68464118b" variant="secondary" external>
              LinkedIn
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-structural)]/60 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
          © 2026 Liam Petersen · Built on Claude Code
        </div>
        <div className="flex items-center gap-6 text-[13px] text-[var(--color-text-secondary)]">
          <a href="mailto:liam@copyweb.io" className="hover:text-[var(--color-accent)] transition-colors">
            liam@copyweb.io
          </a>
          <a
            href="https://github.com/copywebltd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://copyweb.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            copyweb.io
          </a>
        </div>
      </div>
    </footer>
  );
}
