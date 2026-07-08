"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  categoryOrder,
  workflows,
  type WfCategory,
  type WfNode,
  type WfStage,
  type Workflow,
} from "@/data/workflows";
import { EASE, Reveal, SectionHeading } from "./primitives";

/* ------------------------------------------------------------------ */
/*  LIVE WORKFLOWS — a filterable library of cross-department          */
/*  automations. Each is a real n8n flow, executed and verified.       */
/* ------------------------------------------------------------------ */

function Node({ node }: { node: WfNode }) {
  const kind = node.kind ?? "code";
  return (
    <div className={`v4-wf-node v4-wf-${kind}`}>
      <span className="v4-wf-node-label">{node.label}</span>
      {node.sub ? <span className="v4-wf-node-sub">{node.sub}</span> : null}
    </div>
  );
}

function Stage({ stage }: { stage: WfStage }) {
  if (stage.nodes.length === 1) return <Node node={stage.nodes[0]} />;
  return (
    <div className="v4-wf-parallel">
      {stage.parallelLabel ? (
        <span className="v4-wf-parallel-tag">{stage.parallelLabel}</span>
      ) : null}
      {stage.nodes.map((n) => (
        <Node key={n.label} node={n} />
      ))}
    </div>
  );
}

function Rail({ stages }: { stages: WfStage[] }) {
  return (
    <div className="v4-wf-scroll">
      <div className="v4-wf-rail">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center">
            <Stage stage={stage} />
            {i < stages.length - 1 ? <span className="v4-wf-link" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Shows the real n8n canvas screenshot if one exists at
   /workflows/{id}.png, otherwise falls back to the rendered diagram.
   Drop a correctly-named PNG in public/workflows/ and redeploy. */
function CanvasVisual({ wf }: { wf: Workflow }) {
  const [ok, setOk] = useState(false);
  const src = `/workflows/${wf.id}.png`;

  // preload via a detached Image so the real <img> renders only once it's
  // confirmed to exist + load (no lazy/hidden-image races, no broken icons)
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setOk(true);
    img.onerror = () => alive && setOk(false);
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <div>
      <div className="v4-mono-dim !text-[9.5px] mb-4">
        {ok ? "Real n8n canvas · executed" : "Live in n8n · runs left to right"}
      </div>
      {ok ? (
        <img
          src={src}
          alt={`${wf.title} workflow canvas in n8n`}
          className="w-full rounded-xl border border-[var(--v4-border-strong)]"
        />
      ) : (
        <Rail stages={wf.stages} />
      )}
    </div>
  );
}

function Card({ wf }: { wf: Workflow }) {
  const [open, setOpen] = useState(false);
  const [hasJson, setHasJson] = useState(false);
  const stepCount = wf.stages.reduce((n, s) => n + s.nodes.length, 0);

  // show the download link only when the exported workflow actually exists
  useEffect(() => {
    let alive = true;
    fetch(`/workflows/${wf.id}.json`, { method: "HEAD" })
      .then((r) => {
        if (alive && r.ok) setHasJson(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [wf.id]);

  return (
    <div className={`v4-card v4-spot rounded-2xl p-7 md:p-8 ${open ? "lg:col-span-2" : ""}`}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--v4-amber)]/70">
            {wf.index}
          </span>
          <span className="v4-pill v4-pill-amber">{wf.categoryLabel}</span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.06)] px-3 py-1.5">
          <span className="text-[var(--v4-green)] text-[10px]">✓</span>
          <span className="font-mono text-[10px] tracking-[0.03em] text-[var(--v4-text-2)] hidden sm:inline">
            {wf.stat}
          </span>
          <span className="font-mono text-[10px] text-[var(--v4-text-2)] sm:hidden">
            verified
          </span>
        </span>
      </div>

      {/* clear name — leads, so you know what it is at a glance */}
      <h3 className="text-[20px] md:text-[22px] font-medium tracking-[-0.02em] leading-snug text-[var(--v4-text)]">
        {wf.title}
      </h3>

      {/* the problem it kills — the hook */}
      <p className="mt-2.5 text-[14.5px] leading-[1.55] text-[var(--v4-text-2)]">
        “{wf.problem}”
      </p>

      {/* what it does */}
      <p className="mt-3.5 text-[13.5px] leading-[1.7] text-[var(--v4-text-3)] max-w-[68ch]">
        {wf.purpose}
      </p>

      {/* tools */}
      <div className="mt-5 flex flex-wrap gap-2">
        {wf.systems.map((s) => (
          <span
            key={s}
            className="rounded-md border border-[var(--v4-border)] bg-[rgba(255,244,224,0.02)] px-2.5 py-1 font-mono text-[11px] text-[var(--v4-text-2)]"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--v4-amber)] hover:text-[var(--v4-amber-hi)] transition-colors"
        >
          {open ? "Hide the steps" : `See how it works · ${stepCount} steps`}
          <span
            className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            aria-hidden
          >
            →
          </span>
        </button>
        {hasJson && (
          <a
            href={`/workflows/${wf.id}.json`}
            download
            className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--v4-text-3)] hover:text-[var(--v4-text)] transition-colors"
          >
            <span aria-hidden>↓</span> Download workflow (.json)
          </a>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-7 pt-7 border-t border-[var(--v4-border)]">
              <CanvasVisual wf={wf} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Workflows() {
  const [filter, setFilter] = useState<WfCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const chips = useMemo(() => {
    const present = new Set(workflows.map((w) => w.category));
    return [
      { id: "all" as const, label: "All" },
      ...categoryOrder.filter((c) => present.has(c.id)),
    ];
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? workflows : workflows.filter((w) => w.category === filter)),
    [filter]
  );

  // keep the section skimmable: cap the unfiltered list until asked
  const shown =
    filter !== "all" || showAll ? visible : visible.slice(0, 6);
  const hiddenCount = visible.length - shown.length;

  return (
    <section
      id="workflows"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="01.5"
          eyebrow="Live workflows"
          title="The boring, expensive busywork,"
          accent="automated."
          description="A growing library of real automations I built and ran in n8n (a tool for wiring apps together). Each one takes a painful, repetitive job a team does by hand and turns it into a system that runs on its own, using the tools a business already pays for. Filter by team, and open any one to see exactly how it works."
        />

        {/* filters */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2">
            {chips.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`v4-chip ${filter === c.id ? "v4-chip-on" : ""}`}
              >
                {c.label}
              </button>
            ))}
            <span className="ml-auto self-center v4-mono-dim">
              {shown.length === visible.length
                ? `${visible.length} ${visible.length === 1 ? "workflow" : "workflows"}`
                : `${shown.length} of ${visible.length} workflows`}
            </span>
          </div>
        </Reveal>

        {/* the pattern */}
        <Reveal delay={0.12}>
          <div className="mt-8 v4-card rounded-2xl p-6 md:p-7">
            <div className="v4-eyebrow !text-[10px] mb-3.5">
              The pattern behind all of these
            </div>
            <p className="text-[14px] leading-[1.75] text-[var(--v4-text-2)] max-w-[72ch]">
              Every workflow runs on the same backbone, and the guardrail is in
              all of them: a confidence check with a human fallback, so nothing
              risky ever happens unattended.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
              {[
                "Something happens",
                "Read it",
                "AI does the thinking",
                "Check it · human if unsure",
                "Take the action",
                "Log it",
              ].map((step, i, arr) => (
                <span key={step} className="inline-flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[11px] rounded-md border px-2.5 py-1 ${
                      i === 3
                        ? "border-[rgba(245,158,11,0.5)] bg-[rgba(245,158,11,0.08)] text-[var(--v4-amber-hi)]"
                        : "border-[var(--v4-border)] bg-[rgba(255,244,224,0.02)] text-[var(--v4-text-2)]"
                    }`}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 ? (
                    <span className="text-[var(--v4-amber)]/50 text-[11px]" aria-hidden>
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* library */}
        <div className="mt-8 grid lg:grid-cols-2 gap-5 items-start">
          {shown.map((wf, i) => (
            <Reveal key={wf.id} delay={Math.min(i * 0.05, 0.25)}>
              <Card wf={wf} />
            </Reveal>
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="mt-9 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="v4-chip v4-chip-on !px-7 !py-3 text-[13px]"
            >
              Show all {visible.length} workflows ⌄
            </button>
          </div>
        )}

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl font-mono text-[11.5px] leading-relaxed text-[var(--v4-text-3)]">
            Built, wired and tested end-to-end on my own n8n. The plain-English
            names are what you see; the real APIs and models sit one layer down in
            each step. More being added.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
