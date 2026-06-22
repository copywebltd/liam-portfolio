"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
/*  SYSTEMS — one consistent expandable list. Scan the rows, tap to    */
/*  open the build inline. Identical on every screen size.             */
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
            title={`${caseStudies.length} systems. Three continents.`}
            accent="One builder."
            description="Production platforms, internal tools, open-source templates, and the meta-tooling that ships them. Each one built on Claude Code. Tap any row to open the build."
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

        <Reveal delay={0.12}>
          <div className="mt-8 rounded-2xl border border-[var(--v4-border)] overflow-hidden">
            {visible.map((cs, i) => {
              const open = openSlug === cs.slug;
              return (
                <div
                  key={cs.slug}
                  id={`case-${cs.slug}`}
                  className={`scroll-mt-24 border-b border-[var(--v4-border)] last:border-b-0 ${
                    open ? "bg-[rgba(245,158,11,0.05)]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenSlug(open ? null : cs.slug)}
                    aria-expanded={open}
                    className="group w-full text-left px-4 md:px-6 py-4 md:py-5 grid grid-cols-[24px_1fr_auto] items-center gap-3 md:gap-5"
                  >
                    <span className="self-start pt-1 font-mono text-[11px] tracking-[0.12em] text-[var(--v4-amber)]/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="flex items-center gap-2 mb-1.5">
                        <span className="v4-pill v4-pill-amber !py-[3px] !px-2 !text-[9px]">
                          {cs.categoryLabel}
                        </span>
                        {cs.videoId ? (
                          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--v4-amber)]/80">
                            ▸ video
                          </span>
                        ) : null}
                      </span>
                      <span
                        className={`block text-[17px] md:text-[19px] font-medium tracking-[-0.02em] leading-snug transition-colors ${
                          open
                            ? "text-[var(--v4-amber-hi)]"
                            : "text-[var(--v4-text)] group-hover:text-[var(--v4-amber-hi)]"
                        }`}
                      >
                        {cs.title}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--v4-text-3)] truncate">
                        {cs.subtitle}
                      </span>
                    </span>

                    <span className="flex items-center gap-3 shrink-0">
                      <span className="text-[15px] md:text-[18px] font-light tracking-[-0.02em] text-[var(--v4-amber)] tabular-nums">
                        {cs.metrics[0]?.value}
                      </span>
                      <span
                        className={`text-[var(--v4-text-3)] text-[13px] transition-transform duration-300 ${
                          open ? "rotate-180 text-[var(--v4-amber)]" : ""
                        }`}
                        aria-hidden
                      >
                        ⌄
                      </span>
                    </span>
                  </button>

                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-9 pt-1">
                        <ProjectDetail cs={cs} />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ProjectDetail — the expanded build for one system.                */
/* ------------------------------------------------------------------ */

function ProjectDetail({ cs }: { cs: CaseStudy }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="v4-pill">{cs.year}</span>
        <span className="v4-mono-dim !text-[9.5px] text-[var(--v4-green)]">
          ● {cs.status}
        </span>
        <span className="v4-mono-dim !text-[9.5px]">{cs.org}</span>
      </div>

      <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--v4-text)] max-w-[64ch]">
        {cs.oneLiner}
      </p>

      {/* metrics */}
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border border-[var(--v4-border)] bg-[var(--v4-border)]">
        {cs.metrics.map((m) => (
          <div key={m.label} className="bg-[var(--v4-surface)] p-4 md:p-5">
            <div className="text-[22px] md:text-[26px] font-light tracking-[-0.03em] text-[var(--v4-amber)]">
              {m.value}
            </div>
            <div className="mt-1 text-[9.5px] uppercase tracking-[0.1em] leading-tight text-[var(--v4-text-3)]">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* video */}
      {cs.videoId && (
        <div className="mt-8 max-w-3xl">
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
            <p className="mt-2.5 v4-mono-dim !text-[10px]">{cs.videoCaption}</p>
          )}
        </div>
      )}

      {/* sections */}
      <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-7 max-w-5xl">
        {cs.sections.map((s) => (
          <div key={s.heading}>
            <h4 className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80">
              {s.heading}
            </h4>
            <p className="mt-2.5 text-[14px] leading-[1.8] text-[var(--v4-text-2)]">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* proof point */}
      {cs.proofPoint && (
        <div className="mt-8 max-w-3xl rounded-xl border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)] p-5">
          <div className="v4-eyebrow !text-[10px] mb-2">Proof point</div>
          <div className="text-[14px] leading-relaxed text-[var(--v4-text)]">
            {cs.proofPoint}
          </div>
        </div>
      )}

      {/* stack */}
      <div className="mt-8">
        <div className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80 mb-3">
          Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {cs.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[var(--v4-border)] bg-[rgba(255,244,224,0.02)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--v4-text-2)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 font-mono text-[11.5px] italic leading-relaxed text-[var(--v4-text-3)]">
        {cs.builtOn} · {readingTime(cs)} read
      </div>
    </div>
  );
}
