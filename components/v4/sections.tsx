"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { arc } from "@/data/arc";
import { caseStudies } from "@/data/case-studies";
import { stackTabs } from "@/data/stack";
import { EmberField } from "./shader";
import { EMAIL, LINKEDIN, openPalette } from "./chrome";
import {
  Counter,
  EASE,
  Magnetic,
  Reveal,
  SectionHeading,
  Spot,
  WordsReveal,
  useCopy,
} from "./primitives";

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* shader field */}
      <div className="absolute inset-0">
        <EmberField />
      </div>
      {/* hairline grid + fades */}
      <div className="absolute inset-0 v4-hairline-grid" />
      <div className="absolute inset-0 v4-vignette" />
      <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-b from-transparent to-[var(--v4-bg)]" />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-10 pt-32 pb-28"
      >
        {/* status */}
        <Reveal>
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--v4-border-strong)] bg-[rgba(10,9,7,0.55)] backdrop-blur-md pl-4 pr-5 py-2.5">
            <span className="v4-dot" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--v4-text-2)]">
              Available · Senior AI builder + advisory roles · Remote · US &amp; EU
            </span>
          </div>
        </Reveal>

        {/* headline */}
        <h1 className="v4-display mt-10 text-[clamp(44px,7.6vw,108px)] max-w-[14ch]">
          <WordsReveal text="Six years of" delay={0.15} />{" "}
          <span className="v4-serif text-[1.04em] text-[var(--v4-text)]">
            <WordsReveal text="direct response." delay={0.32} />
          </span>
          <br />
          <WordsReveal text="Three years shipping" delay={0.5} />{" "}
          <span className="text-[var(--v4-amber)]">
            <WordsReveal text="production AI." delay={0.72} />
          </span>
        </h1>

        {/* sub */}
        <Reveal delay={0.85}>
          <div className="mt-10 max-w-[560px] space-y-4 text-[15px] leading-[1.75] text-[var(--v4-text-2)]">
            <p>
              I&apos;m Liam. Six years writing copy that had to convert or get
              killed. Three years building the systems that scale that work to
              a $20M+ portfolio.
            </p>
            <p className="text-[var(--v4-text)]">
              Every system on this site was built inside Claude Code.
              Frontends, backends, agents, skills, MCP integrations. One
              runtime, one builder, real receipts.
            </p>
          </div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={1.0}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#systems" className="v4-btn v4-btn-primary">
                See the work
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="v4-btn v4-btn-ghost">
                Email me
              </a>
            </Magnetic>
            <button
              onClick={openPalette}
              className="hidden md:inline-flex items-center gap-2.5 text-[13px] text-[var(--v4-text-3)] hover:text-[var(--v4-text-2)] transition-colors ml-1"
            >
              or press <span className="v4-kbd">⌘K</span> to navigate
            </button>
          </div>
        </Reveal>

        {/* footer strip */}
        <Reveal delay={1.15}>
          <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 v4-mono-dim">
            <span>Founder · Copyweb</span>
            <span className="hidden sm:inline text-[var(--v4-border-strong)]">/</span>
            <span>Worked across US · EU · ZA</span>
            <span className="hidden sm:inline text-[var(--v4-border-strong)]">/</span>
            <span>Open to roles where the work has to ship</span>
          </div>
        </Reveal>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--v4-amber)]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TICKER — real receipts as a live instrument strip                  */
/* ------------------------------------------------------------------ */

const tickerItems = [
  "$800K peak monthly revenue · Hooks & Needles",
  "Email revenue 3.3× in 4 months · Mindful Souls",
  "60+ custom Claude Code skills authored",
  `${caseStudies.length} systems shipped end-to-end`,
  "26 production workflows · Foxelli Studio",
  "$3.16 per cinematic ad spot",
  "~60% media cost reduction via Kie.ai routing",
  "3 Anthropic certifications verified",
];

export function Ticker() {
  const row = (
    <>
      {tickerItems.map((t) => (
        <span key={t} className="inline-flex items-center">
          <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[var(--v4-text-2)] whitespace-nowrap">
            {t}
          </span>
          <span className="mx-8 text-[var(--v4-amber)]/50 text-[10px]">◆</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="relative border-y border-[var(--v4-border)] bg-[rgba(18,16,12,0.5)] py-4 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[var(--v4-bg)] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[var(--v4-bg)] to-transparent pointer-events-none" />
      <div className="v4-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RECRUITER CARD — the 10-second answer                              */
/* ------------------------------------------------------------------ */

const tldr = [
  { label: "Role", value: "Direct Response → AI Strategy → Production AI" },
  { label: "Experience", value: "6 yrs DR copy · 3 yrs production AI" },
  { label: "Worked across", value: "US · EU · ZA" },
  { label: "Status", value: "Open to senior AI + advisory roles · Remote · US & EU only" },
];

export function RecruiterCard() {
  const { copied, copy } = useCopy(EMAIL);
  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <Reveal>
          <Spot className="v4-card rounded-2xl p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="v4-eyebrow">Reading in 10 seconds?</span>
                <span className="v4-mono-dim hidden md:inline">
                  · the short version
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => void copy()}
                  className="v4-chip !py-2 !px-4 text-[12.5px]"
                >
                  {copied ? "Copied ✓" : `Copy ${EMAIL}`}
                </button>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v4-chip !py-2 !px-4 text-[12.5px]"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-7">
              {tldr.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.07}>
                  <div className="border-l border-[var(--v4-amber)]/40 pl-5">
                    <div className="v4-mono-dim !text-[9.5px] mb-2.5">
                      {item.label}
                    </div>
                    <div className="text-[14.5px] leading-snug text-[var(--v4-text)]">
                      {item.value}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Spot>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RECEIPTS                                                            */
/* ------------------------------------------------------------------ */

type Receipt = {
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  sub: string;
};

const receipts: Receipt[] = [
  { value: 800, prefix: "$", suffix: "K", label: "Peak monthly revenue", sub: "Hooks & Needles · $414K → $800K via Foxelli Studio" },
  { value: 3.3, suffix: "×", decimals: 1, label: "Email revenue scaled", sub: "$76K → $249K in 4 months · Mindful Souls" },
  { value: 60, suffix: "+", label: "Custom Claude Code skills", sub: "Authored end-to-end" },
  { value: caseStudies.length, suffix: "", label: "Systems shipped", sub: "Cross-functional, end-to-end" },
];

export function Receipts() {
  return (
    <section id="receipts" className="relative py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="01"
          eyebrow="Receipts"
          title="Real numbers from"
          accent="production"
          tail="systems."
          description="Every number below ties to a system I shipped. No vanity metrics, no rounding tricks."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {receipts.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.09} className="h-full">
              <div
                className={`h-full px-1 py-9 sm:px-8 border-t border-[var(--v4-border)] lg:border-t lg:border-l ${
                  i === 0 ? "lg:!border-l-0 sm:!pl-1" : ""
                } group`}
              >
                <div className="text-[clamp(46px,5vw,68px)] font-light tracking-[-0.045em] leading-none text-[var(--v4-amber)] tabular-nums transition-transform duration-500 group-hover:-translate-y-1">
                  <Counter
                    value={r.value}
                    prefix={r.prefix}
                    suffix={r.suffix}
                    decimals={r.decimals}
                  />
                </div>
                <div className="mt-5 text-[12.5px] uppercase tracking-[0.14em] text-[var(--v4-text)]">
                  {r.label}
                </div>
                <div className="mt-2.5 font-mono text-[11.5px] leading-relaxed text-[var(--v4-text-3)]">
                  {r.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ARC — sticky left heading + drawing timeline                       */
/* ------------------------------------------------------------------ */

export function Arc() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section
      id="arc"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 lg:gap-20">
        <div className="lg:sticky lg:top-32 self-start">
          <SectionHeading
            index="02"
            eyebrow="The arc"
            title="From copy to code, across"
            accent="three continents."
            description="Six years of direct response craft. Three years of production AI systems. The line between writing and shipping got thinner every year."
          />
        </div>

        <div ref={listRef} className="relative">
          {/* track + drawn line */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-[var(--v4-border)]" />
          <motion.div
            className="absolute left-0 top-1 bottom-1 w-px origin-top bg-gradient-to-b from-[var(--v4-amber)] to-[var(--v4-amber-deep)]"
            style={{ scaleY: lineScale }}
          />
          <div className="space-y-14">
            {arc.map((phase, i) => (
              <Reveal key={phase.years} delay={i * 0.05}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-[7px] -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[var(--v4-amber)] ring-4 ring-[var(--v4-bg)]" />
                  <div className="v4-eyebrow !text-[10px]">{phase.years}</div>
                  <h3 className="mt-3 text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-[var(--v4-text)]">
                    {phase.role}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-[13.5px] text-[var(--v4-text-2)]">
                    <span>{phase.org}</span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--v4-text-3)]">
                      {phase.geo}
                    </span>
                  </div>
                  <p className="mt-4 max-w-[58ch] text-[14.5px] leading-[1.8] text-[var(--v4-text-2)]">
                    {phase.body}
                  </p>
                  <div className="mt-4">
                    <span className="v4-pill v4-pill-amber v4-pill-wrap !normal-case !tracking-[0.05em] !text-[11px]">
                      {phase.highlight}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRINCIPLES                                                          */
/* ------------------------------------------------------------------ */

const principles = [
  {
    title: "Claude Code is the build environment, not the assistant.",
    body: "Every system in this portfolio shipped through Claude Code. Frontends, backends, agents, skills, MCP integrations, CLIs. One runtime. Most people use AI to write code. I use it to ship systems.",
  },
  {
    title: "Humans where it counts. Autonomous everywhere else.",
    body: "Anything that touches a customer gets a human's approval, and brand voice and creative instinct stay human. Back-office systems run fully autonomous, no approval loop. The real skill is knowing which is which.",
  },
  {
    title: "Every system gets a learning loop.",
    body: "If it can't get smarter from the work, I haven't finished building it. Editor feedback, customer corrections, failed campaigns. All of it feeds back into the next pass.",
  },
  {
    title: "Build the meta-tool.",
    body: "Don't write a script when you can write the skill that writes the script. Don't write the skill when you can write the agent that picks the right skill. The leverage compounds.",
  },
  {
    title: "Run AI economically.",
    body: "All media generation routed through Kie.ai at ~60% under retail. Token discipline upstream: prompt caching, tight context windows, reuse over re-fetching. Cost-engineering an AI stack is engineering. I do both halves.",
  },
];

export function Principles() {
  return (
    <section
      id="principles"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="03"
          eyebrow="How I work"
          title="Five principles that decide what gets built"
          accent="and what doesn't."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {principles.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 0.08}
              className={i === 4 ? "md:col-span-2" : ""}
            >
              <Spot className="v4-card h-full rounded-2xl p-8 md:p-9">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--v4-amber)]/70">
                    P-0{i + 1}
                  </span>
                  <span className="h-px flex-1 mx-5 bg-[var(--v4-border)]" />
                </div>
                <h3
                  className={`mt-6 font-medium tracking-[-0.015em] leading-snug text-[var(--v4-text)] ${
                    i === 4 ? "text-[20px] md:text-[24px] max-w-[28ch]" : "text-[19px] md:text-[21px]"
                  }`}
                >
                  {p.title}
                </h3>
                <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.8] text-[var(--v4-text-2)]">
                  {p.body}
                </p>
              </Spot>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STACK — segmented tabs with animated indicator                     */
/* ------------------------------------------------------------------ */

export function Stack() {
  const [activeTab, setActiveTab] = useState(stackTabs[0].id);
  const active = stackTabs.find((t) => t.id === activeTab) ?? stackTabs[0];

  return (
    <section
      id="stack"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="04"
          eyebrow="Stack"
          title="The runtime, the surfaces, and"
          accent="what's wired in."
          description="Most portfolios list AI alongside React. Mine doesn't. AI is the layer everything else runs through."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 flex gap-1.5 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            {stackTabs.map((t) => {
              const on = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="relative whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors"
                  style={{
                    color: on ? "var(--v4-amber-hi)" : "var(--v4-text-2)",
                  }}
                >
                  {on && (
                    <motion.span
                      layoutId="stack-tab"
                      className="absolute inset-0 rounded-full border border-[rgba(245,158,11,0.5)] bg-[rgba(245,158,11,0.09)]"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Spot className="v4-card mt-7 rounded-2xl p-8 md:p-11">
            {active.note && (
              <p className="mb-9 max-w-2xl border-l border-[var(--v4-amber)]/40 pl-5 text-[14px] leading-[1.75] text-[var(--v4-text-2)]">
                {active.note}
              </p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-9">
              {active.groups.map((g) => (
                <div key={g.heading}>
                  <h4 className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80 mb-4">
                    {g.heading}
                  </h4>
                  <ul className="space-y-2.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-[12.5px] leading-relaxed text-[var(--v4-text-2)]"
                      >
                        <span className="text-[var(--v4-amber)]/35 mr-2.5">▎</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Spot>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CREDENTIALS                                                         */
/* ------------------------------------------------------------------ */

const certs = [
  { name: "Claude Code in Action", issuer: "Anthropic", verified: true },
  { name: "Building with the Claude API", issuer: "Anthropic", verified: true },
  { name: "Introduction to MCP", issuer: "Anthropic", verified: true },
  { name: "MCP: Advanced Topics", issuer: "Anthropic", verified: false },
  { name: "EFSET English C2 Advanced", issuer: "75/100", verified: true },
];

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="05"
          eyebrow="Credentials"
          title="Verified by the people who"
          accent="built the tools."
          description="Anthropic certifications, English fluency, and the receipts behind the work. The certs come from the lab whose tools I build on every day."
        />

        <Reveal delay={0.12}>
          <Spot className="v4-card mt-14 rounded-2xl p-8 md:p-10">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div className="v4-eyebrow !text-[10px]">
                Verified credentials · 2025–2026
              </div>
              <div className="v4-mono-dim">4 verified · 1 in progress</div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {certs.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2.5 rounded-full border border-[var(--v4-border-strong)] bg-[rgba(255,244,224,0.025)] px-4.5 py-2.5 pl-4 pr-5 text-[13px] text-[var(--v4-text)]"
                >
                  <span
                    className={
                      c.verified
                        ? "text-[var(--v4-green)]"
                        : "text-[var(--v4-amber)]"
                    }
                    aria-hidden
                  >
                    {c.verified ? "✓" : "◐"}
                  </span>
                  <span>{c.name}</span>
                  <span className="text-[var(--v4-text-3)]">· {c.issuer}</span>
                </span>
              ))}
            </div>
            <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Languages", value: "English (C2 · native-equivalent)" },
                { label: "Domain depth", value: "Direct response · 6 yrs · production AI · 3 yrs" },
                { label: "Built on", value: "Claude Code · 60+ custom skills authored" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="border-t border-[var(--v4-border)] pt-4"
                >
                  <div className="v4-mono-dim !text-[9.5px]">{b.label}</div>
                  <div className="mt-2 text-[14px] text-[var(--v4-text)]">
                    {b.value}
                  </div>
                </div>
              ))}
            </div>
          </Spot>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                             */
/* ------------------------------------------------------------------ */

export function Contact() {
  const { copied, copy } = useCopy(EMAIL);
  return (
    <section
      id="contact"
      className="relative py-32 md:py-44 border-t border-[var(--v4-border)] overflow-hidden"
    >
      {/* soft ember glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, rgba(180,83,9,0.18), transparent 65%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <div className="v4-eyebrow">Contact</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="v4-display mt-6 text-[clamp(38px,6vw,72px)]">
            Let&apos;s build something that{" "}
            <span className="v4-serif text-[var(--v4-amber)] text-[1.05em]">
              compounds.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 mx-auto max-w-xl text-[15.5px] leading-[1.75] text-[var(--v4-text-2)]">
            Open to senior AI engineering, AI strategy, and advisory roles.
            Remote · US &amp; EU only. Available now.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-11 flex flex-wrap justify-center items-center gap-4">
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="v4-btn v4-btn-primary">
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="v4-btn v4-btn-ghost"
              >
                LinkedIn ↗
              </a>
            </Magnetic>
          </div>
          <button
            onClick={() => void copy()}
            className="mt-7 font-mono text-[12px] tracking-[0.1em] text-[var(--v4-text-3)] hover:text-[var(--v4-amber)] transition-colors"
          >
            {copied ? "copied to clipboard ✓" : EMAIL}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
