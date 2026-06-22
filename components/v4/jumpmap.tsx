"use client";

import { caseStudies } from "@/data/case-studies";
import { workflows } from "@/data/workflows";
import { Reveal } from "./primitives";

/* ------------------------------------------------------------------ */
/*  JUMP MAP — the "what's inside" wayfinder right under the hero.     */
/*  Makes the work findable in one glance and invites the jump.        */
/* ------------------------------------------------------------------ */

const dests = [
  {
    n: "01",
    label: "The systems",
    meta: `${caseStudies.length} shipped`,
    desc: "Production platforms, internal tools, open source",
    href: "#systems",
  },
  {
    n: "02",
    label: "Live workflows",
    meta: `${workflows.length} automations`,
    desc: "Cross-department, every one verified",
    href: "#workflows",
  },
  {
    n: "03",
    label: "The receipts",
    meta: "real numbers",
    desc: "Revenue from the systems I built",
    href: "#receipts",
  },
  {
    n: "04",
    label: "The arc",
    meta: "6 yrs · 3 continents",
    desc: "Direct response to production AI",
    href: "#arc",
  },
];

export function JumpMap() {
  return (
    <section className="relative border-b border-[var(--v4-border)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-10 md:py-12">
        <Reveal>
          <div className="flex items-baseline justify-between mb-7">
            <span className="v4-eyebrow">What&apos;s inside</span>
            <span className="v4-mono-dim hidden sm:inline">
              scroll, or jump straight in
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl border border-[var(--v4-border)] bg-[var(--v4-border)]">
            {dests.map((d) => (
              <a
                key={d.n}
                href={d.href}
                className="group flex h-full flex-col bg-[var(--v4-bg)] p-5 md:p-6 transition-colors hover:bg-[rgba(245,158,11,0.05)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--v4-amber)]/70">
                    {d.n}
                  </span>
                  <span className="v4-mono-dim !text-[9.5px]">{d.meta}</span>
                </div>
                <div className="mt-4 text-[17px] md:text-[19px] font-medium tracking-[-0.015em] text-[var(--v4-text)] transition-colors group-hover:text-[var(--v4-amber-hi)]">
                  {d.label}
                </div>
                <div className="mt-1.5 text-[12.5px] leading-snug text-[var(--v4-text-3)]">
                  {d.desc}
                </div>
                <div className="mt-auto pt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v4-text-3)] transition-colors group-hover:text-[var(--v4-amber)]">
                  Jump
                  <span
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden
                  >
                    ↓
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
