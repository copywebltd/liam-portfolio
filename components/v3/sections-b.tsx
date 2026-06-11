"use client";

import Link from "next/link";
import { useState } from "react";
import { caseStudies } from "@/data/case-studies";
import { arc } from "@/data/arc";
import { stackTabs } from "@/data/stack";
import { Eyebrow, FadeIn, StatusPill } from "./atoms";

/* ---------- nav ----------------------------------------------------- */

export function V3bNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(10,10,10,0.7)] border-b border-[var(--v3-border)]">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/v3/b" className="flex items-center gap-3">
          <span className="w-7 h-7 border border-[var(--v3-border-strong)] grid place-items-center v3-mono text-[11px] tracking-[0.18em]">
            LP
          </span>
          <span className="hidden sm:inline text-[14px] font-medium">Liam Petersen</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-[var(--v3-text-secondary)]">
          <a href="#about" className="hover:text-[var(--v3-text)]">About</a>
          <a href="#ledger" className="hover:text-[var(--v3-text)]">Work</a>
          <a href="#arc" className="hover:text-[var(--v3-text)]">Arc</a>
          <a href="#stack" className="hover:text-[var(--v3-text)]">Stack</a>
          <a href="#contact" className="hover:text-[var(--v3-text)]">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/v3" className="v3-btn text-[12px] px-3 py-2 hidden sm:inline-flex">
            ↩ Variants
          </Link>
          <a href="mailto:liam@copyweb.io" className="v3-btn text-[12px] px-4 py-2">
            Email me
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------- hero — typography-led, editorial ----------------------- */

export function V3bHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="v3-glow" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-20">
        <FadeIn>
          <Eyebrow>
            BUILDER · CAPE TOWN
            <span className="sep">·</span>
            <span style={{ color: "var(--v3-accent)" }}>2026</span>
            <span className="sep">·</span>
            ONLINE
          </Eyebrow>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="v3-display mt-8 max-w-5xl">
            Six years of direct response.
            <br />
            <span className="muted">Two years shipping</span>{" "}
            <span className="accent">production AI.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="v3-body mt-10 max-w-2xl text-[17px] leading-[1.6]">
            I&apos;m Liam. I built Foxelli Studio — an end-to-end ad production
            platform serving a $20M+ DTC portfolio. Eleven systems shipped
            end-to-end. Founder of Copyweb. The work below has revenue receipts.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a href="#ledger" className="v3-btn">
              Read the work <span aria-hidden>↓</span>
            </a>
            <a href="mailto:liam@copyweb.io" className="v3-btn v3-btn--accent">
              Email me <span aria-hidden>→</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--v3-border)] pt-10">
            {[
              { v: "11", l: "Systems shipped" },
              { v: "26", l: "Production workflows" },
              { v: "60+", l: "Custom skills" },
              { v: "$800K/mo", l: "Peak revenue running" },
            ].map((s) => (
              <div key={s.l}>
                <div className="v3-mono text-[28px] md:text-[32px] font-light leading-none text-[var(--v3-text)]">
                  {s.v}
                </div>
                <div className="v3-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--v3-text-tertiary)] mt-3">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- about / north star ------------------------------------- */

export function V3bAbout() {
  return (
    <section id="about" className="relative border-t border-[var(--v3-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid lg:grid-cols-12 gap-12">
        <FadeIn className="lg:col-span-4">
          <Eyebrow>NORTH STAR<span className="sep">·</span>HOW I WORK</Eyebrow>
        </FadeIn>
        <FadeIn delay={0.05} className="lg:col-span-8">
          <h2 className="v3-h2 mb-8">
            Don&apos;t write the script.
            <br />
            <span style={{ color: "var(--v3-text-tertiary)" }}>Write the skill</span>{" "}
            <span style={{ color: "var(--v3-accent)" }}>that writes the script.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div>
              <h3 className="v3-h3 mb-3">The thesis</h3>
              <p className="v3-body">
                Most AI &quot;engineers&quot; use Claude or ChatGPT as an
                assistant. The shift is using Claude Code as the build
                environment — a runtime where 60+ custom skills compound the
                work and onboard new projects fast.
              </p>
            </div>
            <div>
              <h3 className="v3-h3 mb-3">The discipline</h3>
              <p className="v3-body">
                Six years of direct response means I scope what good looks like
                before code lands. Every output gets reviewed. The system gets
                smarter with every correction. The team stays in the chair.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- ledger of work ----------------------------------------- */

export function V3bLedger() {
  return (
    <section id="ledger" className="relative border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-14">
          <Eyebrow>THE WORK<span className="sep">·</span>11 SYSTEMS · END-TO-END</Eyebrow>
          <h2 className="v3-h2 mt-5">
            Eleven systems. <span style={{ color: "var(--v3-text-tertiary)" }}>Receipts only.</span>
          </h2>
          <p className="v3-body mt-5">
            Sorted by what&apos;s in daily production. Every entry shipped
            end-to-end with real users and real money on the line.
          </p>
        </FadeIn>

        <div className="max-w-6xl">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.slug} delay={i * 0.03}>
              <div className="v3-ledger grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-2">
                  <div className="v3-mono text-[12px] tracking-[0.18em] uppercase text-[var(--v3-text-tertiary)]">
                    {String(i + 1).padStart(2, "0")} · {cs.year}
                  </div>
                  <div className="mt-3">
                    <StatusPill
                      variant={
                        cs.category === "production"
                          ? "live"
                          : cs.category === "open-source"
                          ? "neutral"
                          : "neutral"
                      }
                    >
                      {cs.categoryLabel}
                    </StatusPill>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h3 className="v3-h3 text-[22px] md:text-[26px] leading-tight mb-2">
                    {cs.title}
                    <span className="text-[var(--v3-text-tertiary)] font-normal">
                      {" — "}
                      {cs.subtitle}
                    </span>
                  </h3>
                  <div className="v3-mono text-[11px] tracking-[0.06em] uppercase text-[var(--v3-text-tertiary)] mb-4">
                    {cs.org}
                  </div>
                  <p className="v3-body text-[14.5px]">{cs.oneLiner}</p>
                  {cs.proofPoint && (
                    <div className="mt-4 inline-flex items-center gap-2 v3-mono text-[11px] tracking-[0.14em] uppercase text-[var(--v3-accent)] border border-[rgba(68,201,117,0.3)] px-3 py-1 bg-[var(--v3-accent-glow)]">
                      ▲ {cs.proofPoint}
                    </div>
                  )}
                </div>
                <div className="md:col-span-3">
                  <ul className="space-y-2">
                    {cs.metrics.slice(0, 3).map((m) => (
                      <li key={m.label} className="flex items-baseline justify-between gap-3 border-b border-[var(--v3-border)] pb-2">
                        <span className="v3-mono text-[18px] font-light text-[var(--v3-text)]">
                          {m.value}
                        </span>
                        <span className="v3-mono text-[10px] tracking-[0.12em] uppercase text-[var(--v3-text-tertiary)] text-right">
                          {m.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- arc ---------------------------------------------------- */

export function V3bArc() {
  return (
    <section id="arc" className="relative border-t border-[var(--v3-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-12">
          <Eyebrow>THE ARC<span className="sep">·</span>5 YEARS</Eyebrow>
          <h2 className="v3-h2 mt-5">
            DR copy <span style={{ color: "var(--v3-text-tertiary)" }}>→</span> head of AI{" "}
            <span style={{ color: "var(--v3-text-tertiary)" }}>→</span>{" "}
            <span style={{ color: "var(--v3-accent)" }}>founder.</span>
          </h2>
        </FadeIn>

        <div className="max-w-5xl">
          {arc.map((phase, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="v3-ledger grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                <div className="md:col-span-3">
                  <div className="v3-mono text-[13px] tracking-[0.16em] uppercase text-[var(--v3-accent)]">
                    {phase.years}
                  </div>
                  <div className="v3-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)] mt-2">
                    {phase.geo}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="v3-h3 text-[22px] mb-1">{phase.role}</h3>
                  <div className="v3-mono text-[11px] tracking-[0.06em] uppercase text-[var(--v3-text-tertiary)] mb-4">
                    {phase.org}
                  </div>
                  <p className="v3-body mb-4">{phase.body}</p>
                  <div className="text-[13px] v3-mono text-[var(--v3-text-secondary)] border-l-2 border-[var(--v3-accent)] pl-4">
                    {phase.highlight}
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

/* ---------- stack tabs --------------------------------------------- */

export function V3bStack() {
  const [active, setActive] = useState(stackTabs[0].id);
  const tab = stackTabs.find((t) => t.id === active) ?? stackTabs[0];

  return (
    <section id="stack" className="relative border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="max-w-3xl mb-12">
          <Eyebrow>THE STACK<span className="sep">·</span>USE-CASE AWARE</Eyebrow>
          <h2 className="v3-h2 mt-5">
            Vendor-loyal stacks <span style={{ color: "var(--v3-text-tertiary)" }}>age fast.</span>
            <br />
            <span style={{ color: "var(--v3-accent)" }}>Use-case-aware</span> stacks compound.
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="border-y border-[var(--v3-border)]">
            <div className="flex flex-wrap gap-0">
              {stackTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`v3-mono text-[11px] tracking-[0.16em] uppercase px-5 py-4 border-r border-[var(--v3-border)] transition-colors ${
                    active === t.id
                      ? "text-[var(--v3-accent)] bg-[var(--v3-accent-glow)]"
                      : "text-[var(--v3-text-tertiary)] hover:text-[var(--v3-text)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-12 gap-10 mt-10">
          {tab.note && (
            <FadeIn className="md:col-span-4">
              <p className="v3-body text-[14.5px] border-l-2 border-[var(--v3-accent)] pl-5">
                {tab.note}
              </p>
            </FadeIn>
          )}
          <div className={`grid sm:grid-cols-2 gap-6 ${tab.note ? "md:col-span-8" : "md:col-span-12"}`}>
            {tab.groups.map((g) => (
              <FadeIn key={g.heading}>
                <div className="v3-card p-6 h-full">
                  <Eyebrow>{g.heading}</Eyebrow>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="text-[13.5px] text-[var(--v3-text-secondary)] flex gap-2"
                      >
                        <span className="text-[var(--v3-accent)] flex-shrink-0">·</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ------------------------------------------------ */

export function V3bContact() {
  return (
    <section id="contact" className="relative border-t border-[var(--v3-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
        <FadeIn className="max-w-4xl">
          <Eyebrow>CONTACT<span className="sep">·</span>2 FOUNDER-RATE SLOTS</Eyebrow>
          <h2 className="v3-display mt-6">
            Want one shipped <span className="muted">for your team?</span>
          </h2>
          <p className="v3-body mt-8 max-w-2xl text-[16px]">
            DTC and CPG brands at $10M–$100M. Architect → Build → Ship. Same
            loop that shipped Foxelli Studio in six months. Founder rate: 60%
            off retail while runway is the constraint.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a href="mailto:liam@copyweb.io" className="v3-btn v3-btn--accent">
              liam@copyweb.io <span aria-hidden>→</span>
            </a>
            <a href="https://copyweb.io" target="_blank" rel="noopener noreferrer" className="v3-btn">
              See Copyweb
            </a>
          </div>
          <ul className="mt-10 grid sm:grid-cols-2 gap-3 max-w-2xl v3-mono text-[11.5px] tracking-[0.12em] uppercase text-[var(--v3-text-tertiary)]">
            <li className="border-l-2 border-[var(--v3-accent)] pl-4">· 6-week build window</li>
            <li className="border-l-2 border-[var(--v3-accent)] pl-4">· Receipts on request</li>
            <li className="border-l-2 border-[var(--v3-accent)] pl-4">· No agencies, no juniors</li>
            <li className="border-l-2 border-[var(--v3-accent)] pl-4">· Founder-rate while runway holds</li>
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- footer ------------------------------------------------- */

export function V3bFooter() {
  return (
    <footer className="border-t border-[var(--v3-border)] bg-[var(--v3-bg-deep)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 border border-[var(--v3-border-strong)] grid place-items-center v3-mono text-[11px] tracking-[0.18em]">
            LP
          </span>
          <div>
            <div className="text-[14px] font-medium">Liam Petersen</div>
            <div className="v3-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
              CAPE TOWN · SHIPPING DAILY
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 v3-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
          <Link href="/v3" className="hover:text-[var(--v3-text)]">↩ Variants</Link>
          <Link href="/v3/a" className="hover:text-[var(--v3-text)]">v3a · Faithful</Link>
          <Link href="/v2" className="hover:text-[var(--v3-text)]">v2 · Vibecademy</Link>
          <Link href="/" className="hover:text-[var(--v3-text)]">v1 · Helios</Link>
        </div>
      </div>
      <div className="border-t border-[var(--v3-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between v3-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--v3-text-tertiary)]">
          <span>© 2026 Liam Petersen · prototype v3b</span>
          <span>BUILT ON CLAUDE CODE</span>
        </div>
      </div>
    </footer>
  );
}
