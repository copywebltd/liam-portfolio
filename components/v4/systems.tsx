"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudies, filterChips, type CaseStudy } from "@/data/case-studies";
import { EASE, Reveal, SectionHeading } from "./primitives";

function readingTime(cs: CaseStudy): string {
  const words =
    cs.sections.reduce((sum, s) => sum + s.body.split(/\s+/).length, 0) +
    cs.oneLiner.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

/* ------------------------------------------------------------------ */
/*  SYSTEMS — editorial index. Scan the list, expand the build.        */
/* ------------------------------------------------------------------ */

export function Systems() {
  const [filter, setFilter] =
    useState<(typeof filterChips)[number]["id"]>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // command palette can open a specific case
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setFilter("all");
      setOpenSlug(slug);
    };
    window.addEventListener("v4:open-case", onOpen);
    return () => window.removeEventListener("v4:open-case", onOpen);
  }, []);

  const visible =
    filter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === filter);

  return (
    <section
      id="systems"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="00"
            eyebrow="Systems shipped"
            title="Eleven systems. Three continents."
            accent="One builder."
            description="Production platforms, internal tools, open-source templates, and the meta-tooling that ships them. Each one built on Claude Code. Scan the index, expand the builds that matter to you."
          />
          <Reveal delay={0.15}>
            <div className="v4-mono-dim pb-2">
              {visible.length} {visible.length === 1 ? "system" : "systems"} shown
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setFilter(chip.id)}
                className={`v4-chip ${filter === chip.id ? "v4-chip-on" : ""}`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10">
          {visible.map((cs, i) => (
            <CaseRow
              key={cs.slug}
              cs={cs}
              index={i + 1}
              open={openSlug === cs.slug}
              onToggle={() =>
                setOpenSlug((cur) => (cur === cs.slug ? null : cs.slug))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CaseRow                                                             */
/* ------------------------------------------------------------------ */

function CaseRow({
  cs,
  index,
  open,
  onToggle,
}: {
  cs: CaseStudy;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const num = String(index).padStart(2, "0");

  return (
    <div
      id={`case-${cs.slug}`}
      className={`v4-row scroll-mt-28 ${open ? "v4-row-open" : ""}`}
    >
      {/* row head — always scannable */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="v4-row-head w-full text-left py-7 md:py-8 grid grid-cols-[auto_1fr_auto] md:grid-cols-[64px_minmax(0,5fr)_minmax(0,4fr)_auto] items-start md:items-center gap-x-5 md:gap-x-8"
      >
        <span className="font-mono text-[12px] tracking-[0.14em] text-[var(--v4-amber)]/70 pt-1.5 md:pt-0">
          {num}
        </span>

        <span className="min-w-0">
          <span className="v4-row-title block text-[clamp(21px,2.6vw,30px)] font-medium tracking-[-0.025em] leading-[1.12] text-[var(--v4-text)]">
            {cs.title}
          </span>
          <span className="mt-1.5 block text-[13.5px] leading-snug text-[var(--v4-text-2)]">
            {cs.subtitle}
          </span>
        </span>

        <span className="hidden md:flex flex-col gap-1.5 min-w-0">
          <span className="flex items-center gap-2 flex-wrap">
            <span className="v4-pill v4-pill-amber">{cs.categoryLabel}</span>
            <span className="v4-pill">{cs.year}</span>
            {cs.videoId ? <span className="v4-pill">▸ video</span> : null}
          </span>
          <span className="v4-mono-dim !text-[9.5px] truncate">{cs.org}</span>
        </span>

        <span
          className={`justify-self-end grid place-items-center w-10 h-10 rounded-full border transition-all duration-500 ${
            open
              ? "border-[rgba(245,158,11,0.6)] bg-[rgba(245,158,11,0.12)] text-[var(--v4-amber)] rotate-45"
              : "border-[var(--v4-border-strong)] text-[var(--v4-text-2)]"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      {/* expanded build */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-12 md:pb-14 md:pl-[calc(64px+2rem)]">
              {/* meta strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 v4-mono-dim">
                <span className="text-[var(--v4-green)]">● {cs.status}</span>
                <span>{cs.org}</span>
                <span>{readingTime(cs)} read</span>
              </div>

              {/* one-liner */}
              <p className="max-w-[62ch] border-l border-[var(--v4-amber)]/50 pl-5 text-[16px] md:text-[17px] leading-[1.7] text-[var(--v4-text)]">
                {cs.oneLiner}
              </p>

              {/* metrics */}
              <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border border-[var(--v4-border)] bg-[var(--v4-border)]">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="bg-[var(--v4-surface)] p-5 md:p-6">
                    <div className="text-[24px] md:text-[28px] font-light tracking-[-0.03em] text-[var(--v4-amber)]">
                      {m.value}
                    </div>
                    <div className="mt-1.5 text-[10px] uppercase tracking-[0.12em] leading-tight text-[var(--v4-text-3)]">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* video */}
              {cs.videoId && (
                <div className="mt-10 max-w-3xl">
                  <div className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80 mb-3">
                    Walkthrough
                  </div>
                  <div
                    className="relative w-full overflow-hidden rounded-xl border border-[var(--v4-border-strong)] bg-black"
                    style={{ aspectRatio: "16 / 9" }}
                  >
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
                    <p className="mt-2.5 v4-mono-dim !text-[10px]">
                      {cs.videoCaption}
                    </p>
                  )}
                </div>
              )}

              {/* sections — editorial two-column */}
              <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
                {cs.sections.map((s) => (
                  <div key={s.heading}>
                    <h4 className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80">
                      {s.heading}
                    </h4>
                    <p className="mt-3 text-[14px] leading-[1.85] text-[var(--v4-text-2)]">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* proof point */}
              {cs.proofPoint && (
                <div className="mt-10 max-w-3xl rounded-xl border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)] p-6">
                  <div className="v4-eyebrow !text-[10px] mb-2.5">
                    Proof point
                  </div>
                  <div className="text-[14.5px] leading-relaxed text-[var(--v4-text)]">
                    {cs.proofPoint}
                  </div>
                </div>
              )}

              {/* stack */}
              <div className="mt-10">
                <div className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80 mb-3.5">
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {cs.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-[var(--v4-border)] bg-[rgba(255,244,224,0.02)] px-3 py-1.5 font-mono text-[11.5px] text-[var(--v4-text-2)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 max-w-3xl font-mono text-[12px] italic leading-relaxed text-[var(--v4-text-3)]">
                {cs.builtOn}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
