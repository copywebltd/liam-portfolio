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
/*  SYSTEMS — gallery with live preview.                               */
/*  Desktop: pick on the left, detail in a sticky pane on the right.    */
/*  Mobile: the list collapses to a tap-to-expand accordion.           */
/* ------------------------------------------------------------------ */

export function Systems() {
  const [filter, setFilter] =
    useState<(typeof filterChips)[number]["id"]>("all");
  const [activeSlug, setActiveSlug] = useState<string>(caseStudies[0].slug);

  const visible =
    filter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === filter);

  // keep the selection valid when the filter changes
  useEffect(() => {
    if (!visible.some((c) => c.slug === activeSlug)) {
      setActiveSlug(visible[0]?.slug ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // command palette can open a specific case
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setFilter("all");
      setActiveSlug(slug);
    };
    window.addEventListener("v4:open-case", onOpen);
    return () => window.removeEventListener("v4:open-case", onOpen);
  }, []);

  const active = visible.find((c) => c.slug === activeSlug) ?? visible[0];

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
            description="Production platforms, internal tools, open-source templates, and the meta-tooling that ships them. Each one built on Claude Code. Pick one on the left to see the build."
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
          <div className="mt-10 grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.5fr)] gap-6 lg:gap-10 items-start">
            {/* LIST */}
            <div className="rounded-2xl border border-[var(--v4-border)] overflow-hidden">
              {visible.map((cs, i) => {
                const isActive = cs.slug === active?.slug;
                return (
                  <div
                    key={cs.slug}
                    id={`case-${cs.slug}`}
                    className={`scroll-mt-28 border-b border-[var(--v4-border)] last:border-b-0 ${
                      isActive ? "bg-[rgba(245,158,11,0.05)]" : ""
                    }`}
                  >
                    <button
                      onClick={() => setActiveSlug(cs.slug)}
                      aria-expanded={isActive}
                      className="group w-full text-left px-4 md:px-5 py-4 md:py-[18px] grid grid-cols-[26px_1fr_auto] items-center gap-3 md:gap-4"
                    >
                      <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--v4-amber)]/70 self-start pt-1">
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
                          className={`block text-[16px] md:text-[17px] font-medium tracking-[-0.015em] leading-snug transition-colors ${
                            isActive
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
                      <span className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[15px] md:text-[17px] font-light tracking-[-0.02em] text-[var(--v4-amber)] tabular-nums">
                          {cs.metrics[0]?.value}
                        </span>
                        <span
                          className={`lg:hidden text-[var(--v4-text-3)] text-[12px] transition-transform duration-300 ${
                            isActive ? "rotate-180 text-[var(--v4-amber)]" : ""
                          }`}
                          aria-hidden
                        >
                          ⌄
                        </span>
                      </span>
                    </button>

                    {/* mobile-only inline detail */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="px-4 pb-8 pt-1">
                          <ProjectDetail cs={cs} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DESKTOP STICKY PREVIEW */}
            <div className="hidden lg:block lg:sticky lg:top-24 self-start">
              {active && (
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="rounded-2xl border border-[var(--v4-border)] bg-[linear-gradient(180deg,rgba(255,244,224,0.03),rgba(255,244,224,0.008))] p-7 xl:p-9"
                >
                  <ProjectDetail cs={active} />
                </motion.div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ProjectDetail — one renderer, used by both the desktop pane        */
/*  and the mobile inline accordion.                                   */
/* ------------------------------------------------------------------ */

function ProjectDetail({ cs }: { cs: CaseStudy }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="v4-pill v4-pill-amber">{cs.categoryLabel}</span>
        <span className="v4-pill">{cs.year}</span>
        <span className="v4-mono-dim !text-[9.5px] text-[var(--v4-green)]">
          ● {cs.status}
        </span>
      </div>

      <h3 className="mt-4 text-[24px] md:text-[27px] font-medium tracking-[-0.02em] leading-tight text-[var(--v4-text)]">
        {cs.title}
      </h3>
      <div className="mt-1.5 v4-mono-dim !text-[9.5px]">{cs.org}</div>

      <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--v4-text)]">
        {cs.oneLiner}
      </p>

      {/* metrics */}
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border border-[var(--v4-border)] bg-[var(--v4-border)]">
        {cs.metrics.map((m) => (
          <div key={m.label} className="bg-[var(--v4-surface)] p-4">
            <div className="text-[21px] md:text-[24px] font-light tracking-[-0.03em] text-[var(--v4-amber)]">
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
        <div className="mt-7">
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
      <div className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-6">
        {cs.sections.map((s) => (
          <div key={s.heading}>
            <h4 className="v4-mono-dim !text-[10px] !text-[var(--v4-amber)]/80">
              {s.heading}
            </h4>
            <p className="mt-2.5 text-[13.5px] leading-[1.8] text-[var(--v4-text-2)]">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* proof point */}
      {cs.proofPoint && (
        <div className="mt-7 rounded-xl border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)] p-5">
          <div className="v4-eyebrow !text-[10px] mb-2">Proof point</div>
          <div className="text-[14px] leading-relaxed text-[var(--v4-text)]">
            {cs.proofPoint}
          </div>
        </div>
      )}

      {/* stack */}
      <div className="mt-7">
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
