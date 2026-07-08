"use client";

import { useEffect, useState } from "react";
import { videoAds } from "@/data/video-showcase";
import { Reveal, SectionHeading } from "./primitives";

/* ------------------------------------------------------------------ */
/*  VIDEO SHOWCASE - AI video ads. Tap a poster to play with sound     */
/*  and see the phase-by-phase breakdown of how it was built.          */
/* ------------------------------------------------------------------ */

const PIPELINE = [
  "Real product in",
  "Script",
  "AI voice",
  "Creator + footage",
  "Lip-sync",
  "Captions + cut",
];

export function VideoShowcase() {
  const [open, setOpen] = useState<string | null>(null);
  const active = videoAds.find((a) => a.file === open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      id="video-ads"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="01.9"
          eyebrow="Motion"
          title="AI video ads, start to"
          accent="finish."
          description="Full video ads generated end to end with AI: script, voiceover, footage, and edit, each built around the brand's real product. Tap any one to play with sound and see exactly how it was made."
        />

        {/* the pipeline behind every one of these */}
        <Reveal delay={0.1}>
          <div className="mt-12 v4-card rounded-2xl p-6 md:p-7">
            <div className="v4-eyebrow !text-[10px] mb-3.5">
              One system, adapted to each format
            </div>
            <p className="text-[14px] leading-[1.75] text-[var(--v4-text-2)] max-w-[72ch]">
              Each ad below leads with a different technique: lip-sync, b-roll,
              reengineering, animation. The pipeline underneath is the same every
              time, and so is the rule: the product is never invented. Every ad
              starts from the brand&apos;s real packaging and is composed around
              it, accurate to the SKU.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
              {PIPELINE.map((step, i, arr) => (
                <span key={step} className="inline-flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[11px] rounded-md border px-2.5 py-1 ${
                      i === 0
                        ? "border-[rgba(245,158,11,0.5)] bg-[rgba(245,158,11,0.08)] text-[var(--v4-amber-hi)]"
                        : "border-[var(--v4-border)] bg-[rgba(255,244,224,0.02)] text-[var(--v4-text-2)]"
                    }`}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 ? (
                    <span
                      className="text-[var(--v4-amber)]/50 text-[11px]"
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {videoAds.map((a, i) => (
            <Reveal key={a.file} delay={Math.min(i * 0.05, 0.3)}>
              <button
                onClick={() => setOpen(a.file)}
                className="group block w-full text-left"
                aria-label={`Play ${a.brand} ${a.tag}`}
              >
                <div className="relative overflow-hidden rounded-xl border border-[var(--v4-border)] bg-[var(--v4-surface)]">
                  <img
                    src={`/video-ads/${a.file}.jpg`}
                    alt={`${a.brand} ${a.tag}`}
                    loading="lazy"
                    className="w-full aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  {/* play glyph */}
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-12 h-12 rounded-full bg-[rgba(10,9,7,0.55)] border border-[rgba(255,255,255,0.4)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M4 2.5v11l9-5.5-9-5.5z" fill="#fff" />
                      </svg>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[12.5px] font-medium text-white">
                      {a.brand}
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium text-[var(--v4-text)]">
                    {a.brand}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--v4-text-3)]">
                    {a.tag}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-9 max-w-2xl font-mono text-[11.5px] leading-relaxed text-[var(--v4-text-3)]">
            Generated end to end with AI: script, voiceover, footage, and edit.
            Every product is composed around the brand&apos;s real packaging,
            accurate to the SKU.
          </p>
        </Reveal>
      </div>

      {/* lightbox - video plays with sound, next to the build breakdown */}
      {active && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8 bg-[rgba(6,5,4,0.9)] backdrop-blur-md"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.brand} ${active.tag}`}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-5 right-5 grid place-items-center w-10 h-10 rounded-full border border-[var(--v4-border-strong)] bg-[rgba(10,9,7,0.6)] text-[var(--v4-text-2)] hover:text-[var(--v4-text)] hover:border-[rgba(245,158,11,0.5)] transition-colors z-10"
          >
            ✕
          </button>
          <div
            className="w-full max-w-[880px] max-h-[88vh] overflow-y-auto grid md:grid-cols-[minmax(0,340px)_1fr] gap-6 md:gap-8 items-start"
            onClick={(e) => e.stopPropagation()}
          >
            {/* the ad */}
            <figure className="mx-auto md:mx-0 max-w-[340px] w-full">
              <video
                key={active.file}
                src={`/video-ads/${active.file}.mp4`}
                poster={`/video-ads/${active.file}.jpg`}
                controls
                autoPlay
                playsInline
                className="w-full h-auto rounded-xl border border-[var(--v4-border-strong)] bg-black"
              />
              <figcaption className="mt-3 flex items-center justify-between v4-mono-dim">
                <span className="text-[var(--v4-text-2)]">{active.brand}</span>
                <span>{active.tag}</span>
              </figcaption>
            </figure>

            {/* how it was built */}
            <div className="min-w-0">
              <p className="text-[14.5px] leading-[1.6] text-[var(--v4-text-2)]">
                {active.note}
              </p>

              <div className="mt-7 v4-eyebrow !text-[10px]">How it was built</div>
              <ol className="mt-4 space-y-4">
                {active.phases.map((p, i) => (
                  <li key={p.step} className="flex gap-3.5">
                    <span className="mt-0.5 shrink-0 grid place-items-center w-6 h-6 rounded-full border border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.07)] font-mono text-[11px] text-[var(--v4-amber-hi)]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-medium text-[var(--v4-text)]">
                        {p.step}
                      </div>
                      <div className="mt-1 text-[12.5px] leading-[1.65] text-[var(--v4-text-3)]">
                        {p.detail}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
