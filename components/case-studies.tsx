"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudies, filterChips, type CaseStudy } from "@/data/case-studies";
import { Card, FadeIn, Pill, SectionHeading, SpotlightWrap, StackChip } from "./ui";

function readingTime(cs: CaseStudy): string {
  const words = cs.sections.reduce((sum, s) => sum + s.body.split(/\s+/).length, 0)
    + cs.oneLiner.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export function CaseStudies() {
  const [filter, setFilter] = useState<(typeof filterChips)[number]["id"]>("all");

  const visible =
    filter === "all" ? caseStudies : caseStudies.filter((c) => c.category === filter);

  return (
    <section
      id="systems"
      className="relative py-24 md:py-32 border-t border-[var(--color-border-structural)]/60"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeading
            eyebrow="// systems shipped"
            title="Eleven systems. Three continents. One builder."
            description="Production platforms, internal tools, open-source templates, and the meta-tooling that ships them. Each one built on Claude Code."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setFilter(chip.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                  filter === chip.id
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "border-[var(--color-border-structural)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/40"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <SpotlightWrap className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-[2]">
            {visible.map((cs, i) => (
              <FadeIn key={cs.slug} delay={Math.min(i * 0.05, 0.3)}>
                <CaseStudyCard cs={cs} index={i + 1} total={visible.length} />
              </FadeIn>
            ))}
          </div>
        </SpotlightWrap>
      </div>
    </section>
  );
}

function CaseStudyCard({ cs, index, total }: { cs: CaseStudy; index: number; total: number }) {
  const [open, setOpen] = useState(false);
  const readTime = readingTime(cs);
  const num = String(index).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <Card className={`card-lift p-7 md:p-9 h-full flex flex-col hover:border-[var(--color-accent)]/40 ${open ? "lg:col-span-2" : ""}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="font-mono text-[11px] tracking-[0.18em] text-[var(--color-accent)]/80">
          {num} <span className="text-[var(--color-text-tertiary)]">/ {totalStr}</span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-text-tertiary)]">
          {readTime}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone="accent">{cs.categoryLabel}</Pill>
            <Pill>{cs.year}</Pill>
          </div>
          <h3 className="mt-5 text-[26px] md:text-[30px] font-medium tracking-[-0.025em] leading-[1.1] text-[var(--color-text-primary)]">
            {cs.title}
          </h3>
          <p className="mt-2 text-[15px] leading-snug text-[var(--color-text-secondary)]">
            {cs.subtitle}
          </p>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
            {cs.org}
          </div>
        </div>
      </div>

      <p className="mt-6 text-[14px] leading-relaxed text-[var(--color-text-secondary)] border-l-2 border-[var(--color-accent)]/40 pl-4">
        {cs.oneLiner}
      </p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {cs.metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[20px] md:text-[24px] font-medium text-[var(--color-accent)] tracking-[-0.02em]">
              {m.value}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-tertiary)] leading-tight">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 pt-8 border-t border-[var(--color-border-structural)]/60 space-y-6">
              {cs.videoId && (
                <div>
                  <h4 className="text-[12px] uppercase tracking-[0.15em] text-[var(--color-accent)]/80 font-semibold mb-3">
                    Walkthrough
                  </h4>
                  <div className="relative w-full overflow-hidden rounded-lg border border-[var(--color-border-structural)]/60 bg-black" style={{ aspectRatio: "16 / 9" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${cs.videoId}`}
                      title={`${cs.title} walkthrough`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  {cs.videoCaption && (
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                      {cs.videoCaption}
                    </p>
                  )}
                </div>
              )}

              {cs.sections.map((s) => (
                <div key={s.heading}>
                  <h4 className="text-[12px] uppercase tracking-[0.15em] text-[var(--color-accent)]/80 font-semibold">
                    {s.heading}
                  </h4>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[var(--color-text-secondary)]">
                    {s.body}
                  </p>
                </div>
              ))}

              {cs.proofPoint && (
                <div className="rounded-lg bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/30 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-accent)] mb-2">
                    Proof point
                  </div>
                  <div className="text-[14px] text-[var(--color-text-primary)]">
                    {cs.proofPoint}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[12px] uppercase tracking-[0.15em] text-[var(--color-accent)]/80 font-semibold mb-3">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cs.stack.map((s) => (
                    <StackChip key={s}>{s}</StackChip>
                  ))}
                </div>
              </div>

              <div className="font-mono text-[12px] text-[var(--color-text-tertiary)] italic pt-2">
                {cs.builtOn}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-7 self-start text-[13px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors inline-flex items-center gap-2 group"
      >
        {open ? "Hide details" : "Read the build"}
        <span
          aria-hidden
          className={`transition-transform duration-300 ${open ? "rotate-90" : "group-hover:translate-x-0.5"}`}
        >
          →
        </span>
      </button>
    </Card>
  );
}
