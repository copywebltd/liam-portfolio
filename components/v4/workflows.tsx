"use client";

import { useMemo, useState } from "react";
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
  const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading");
  const src = `/workflows/${wf.id}.png`;
  return (
    <div>
      <div className="v4-mono-dim !text-[9.5px] mb-4">
        {status === "ok"
          ? "Real n8n canvas · executed"
          : "Live in n8n · runs left to right"}
      </div>
      {status !== "fail" && (
        <img
          src={src}
          alt={`${wf.title} — n8n workflow canvas`}
          loading="lazy"
          onLoad={() => setStatus("ok")}
          onError={() => setStatus("fail")}
          className="w-full rounded-xl border border-[var(--v4-border-strong)]"
          style={{ display: status === "ok" ? "block" : "none" }}
        />
      )}
      {status !== "ok" && <Rail stages={wf.stages} />}
    </div>
  );
}

function Card({ wf }: { wf: Workflow }) {
  const [open, setOpen] = useState(false);
  const stepCount = wf.stages.reduce((n, s) => n + s.nodes.length, 0);

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

      {/* the pain — the hook */}
      <p className="text-[17px] md:text-[19px] leading-[1.4] font-medium text-[var(--v4-text)] tracking-[-0.01em]">
        “{wf.problem}”
      </p>

      {/* the fix */}
      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="text-[var(--v4-amber)] text-[13px]">→</span>
        <span className="v4-serif text-[var(--v4-amber-hi)] text-[18px]">
          {wf.title}
        </span>
      </div>

      <p className="mt-3 text-[14px] leading-[1.75] text-[var(--v4-text-2)] max-w-[68ch]">
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

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--v4-amber)] hover:text-[var(--v4-amber-hi)] transition-colors"
      >
        {open ? "Hide the steps" : `See how it works · ${stepCount} steps`}
        <span
          className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
          aria-hidden
        >
          →
        </span>
      </button>

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

  return (
    <section
      id="workflows"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="01.5"
          eyebrow="Live workflows"
          title="The boring, expensive busywork —"
          accent="automated."
          description="A growing library of real automations I built and ran in n8n (a tool for wiring apps together). Each one takes a painful, repetitive job a team does by hand and turns it into a system that runs on its own — using the tools a business already pays for. Filter by team, and open any one to see exactly how it works."
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
              {visible.length} {visible.length === 1 ? "system" : "systems"}
            </span>
          </div>
        </Reveal>

        {/* library */}
        <div className="mt-8 grid lg:grid-cols-2 gap-5 items-start">
          {visible.map((wf, i) => (
            <Reveal key={wf.id} delay={Math.min(i * 0.05, 0.25)}>
              <Card wf={wf} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl font-mono text-[11.5px] leading-relaxed text-[var(--v4-text-3)]">
            Built and tested on my own live n8n setup. The plain-English names are
            what you see; the real APIs and models sit one layer down in each
            step. They run on saved sample data, so nothing ever touches a real
            customer&apos;s accounts. More being added.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
