"use client";

import { workflows, type WfNode, type WfStage } from "@/data/workflows";
import { Reveal, SectionHeading, Spot } from "./primitives";

/* ------------------------------------------------------------------ */
/*  LIVE WORKFLOWS — cross-department n8n automations, each verified.   */
/*  Diagrams are faithful renders of the real n8n graphs; the stat on  */
/*  each card is from an actual logged execution.                      */
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

export function Workflows() {
  return (
    <section
      id="workflows"
      className="relative py-28 md:py-36 border-t border-[var(--v4-border)]"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <SectionHeading
          index="01.5"
          eyebrow="Live workflows"
          title="Cross-department automations, wired from"
          accent="real APIs."
          description="Not screenshots of an idea — running n8n workflows that take the tools a business already pays for (Klaviyo, Stripe, Meta, GoHighLevel, Slack) and turn the seams between departments into one orchestrated system. Each one below was executed and verified."
        />

        <div className="mt-16 space-y-6">
          {workflows.map((wf, i) => (
            <Reveal key={wf.id} delay={i * 0.08}>
              <Spot className="v4-card rounded-2xl p-7 md:p-9">
                <div className="grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
                  {/* meta */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--v4-amber)]/70">
                        {wf.index}
                      </span>
                      <span className="v4-mono-dim !text-[9.5px] truncate">
                        {wf.department}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[22px] md:text-[26px] font-medium tracking-[-0.02em] leading-[1.12] text-[var(--v4-text)]">
                      {wf.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.75] text-[var(--v4-text-2)]">
                      {wf.purpose}
                    </p>

                    {/* systems */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {wf.systems.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-[var(--v4-border)] bg-[rgba(255,244,224,0.02)] px-2.5 py-1 font-mono text-[11px] text-[var(--v4-text-2)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* verified stat */}
                    <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.06)] px-4 py-2">
                      <span className="text-[var(--v4-green)] text-[11px]">✓</span>
                      <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--v4-text)]">
                        {wf.stat}
                      </span>
                    </div>
                  </div>

                  {/* diagram */}
                  <div className="min-w-0 lg:border-l lg:border-[var(--v4-border)] lg:pl-12">
                    <div className="v4-mono-dim !text-[9.5px] mb-4">
                      n8n · {wf.stages.reduce((n, s) => n + s.nodes.length, 0)} nodes
                    </div>
                    <Rail stages={wf.stages} />
                  </div>
                </div>
              </Spot>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl font-mono text-[11.5px] leading-relaxed text-[var(--v4-text-3)]">
            Built and verified on a live self-hosted n8n instance. Diagrams mirror
            the real graphs; the cached demo data keeps them runnable end-to-end
            without touching a client&apos;s systems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
