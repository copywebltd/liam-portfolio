"use client";

import { useEffect, useState } from "react";
import { hijacks } from "@/data/hijacks";
import { Reveal, SectionHeading } from "./primitives";

/* ------------------------------------------------------------------ */
/*  HIJACKS — swipe → brand. A proven outside ad's design grammar,     */
/*  rebuilt on the brand's real product. Tap to see the source.        */
/* ------------------------------------------------------------------ */

export function Hijacks() {
  const [open, setOpen] = useState<string | null>(null);
  const active = hijacks.find((h) => h.slug === open);

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
      id="hijacks"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="01.8"
          eyebrow="The method"
          title="Steal like a"
          accent="system."
          description="Pick a proven ad from anyone — Apple, Patagonia, Nike, Mastercard — and rebuild its exact design grammar on a brand's real product. The system reads the source, respects what it leaves out, renders three, and scores each against the original before I ever see it. Tap any ad to see the one it came from."
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {hijacks.map((h, i) => (
            <Reveal key={h.slug} delay={Math.min(i * 0.05, 0.3)}>
              <button
                onClick={() => setOpen(h.slug)}
                className="group block w-full text-left"
              >
                <div className="relative overflow-hidden rounded-xl border border-[var(--v4-border)] bg-[var(--v4-surface)]">
                  <img
                    src={`/showcase/hijack/${h.slug}-gen.jpg`}
                    alt={`${h.brand} ad, built from ${h.via}`}
                    loading="lazy"
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[12.5px] font-medium text-white">
                      {h.brand}
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--v4-amber-hi)]">
                      see the source
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium text-[var(--v4-text)]">
                    {h.brand}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--v4-text-3)]">
                    via {h.via.split(",")[0]}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-9 max-w-2xl font-mono text-[11.5px] leading-relaxed text-[var(--v4-text-3)]">
            Every product is the brand&apos;s real packaging, accurate to the SKU;
            the layout is the source ad&apos;s, down to what it deliberately leaves
            out. Generated and self-scored by the system, then human-picked.
          </p>
        </Reveal>
      </div>

      {/* lightbox — source -> generation, with the breakdown */}
      {active && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8 bg-[rgba(6,5,4,0.9)] backdrop-blur-md"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.brand} hijack, built from ${active.via}`}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-5 right-5 grid place-items-center w-10 h-10 rounded-full border border-[var(--v4-border-strong)] bg-[rgba(10,9,7,0.6)] text-[var(--v4-text-2)] hover:text-[var(--v4-text)] hover:border-[rgba(245,158,11,0.5)] transition-colors"
          >
            ✕
          </button>
          <figure
            className="w-full max-w-[860px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4">
              <div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--v4-text-3)] mb-2">
                  the swipe · {active.via}
                </div>
                <img
                  src={`/showcase/hijack/${active.slug}-src.jpg`}
                  alt={`${active.via} source ad`}
                  className="w-full h-auto max-h-[62vh] object-contain rounded-lg border border-[var(--v4-border)] opacity-90"
                />
              </div>
              <span
                className="text-[var(--v4-amber-hi)] text-xl md:text-2xl select-none"
                aria-hidden
              >
                →
              </span>
              <div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--v4-amber-hi)] mb-2">
                  our build · {active.brand}
                </div>
                <img
                  src={`/showcase/hijack/${active.slug}-gen.jpg`}
                  alt={`${active.brand} generated ad`}
                  className="w-full h-auto max-h-[62vh] object-contain rounded-lg border border-[var(--v4-border-strong)]"
                />
              </div>
            </div>
            <figcaption className="mt-4 max-w-2xl mx-auto text-center text-[13.5px] leading-relaxed text-[var(--v4-text-2)]">
              {active.note}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
