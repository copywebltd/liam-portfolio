"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  dot = true,
  children,
}: {
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="v3-eyebrow">
      {dot && <span className="dot" />}
      {children}
    </div>
  );
}

export function StatusPill({
  variant = "live",
  children,
}: {
  variant?: "live" | "soon" | "neutral";
  children: ReactNode;
}) {
  const cls =
    variant === "live"
      ? "v3-pill v3-pill--live"
      : variant === "soon"
      ? "v3-pill v3-pill--soon"
      : "v3-pill";
  return <span className={cls}>{children}</span>;
}

export function StepNum({ n, active = false }: { n: string; active?: boolean }) {
  return (
    <span className={active ? "v3-step-num v3-step-num--active" : "v3-step-num"}>
      {n}
    </span>
  );
}

/* ---- Inline UI mocks used as decorative proof artifacts ------------- */

export function TerminalMock({
  title = "liam@operator",
  lines,
}: {
  title?: string;
  lines: { text: ReactNode; className?: string }[];
}) {
  return (
    <div className="v3-mock">
      <div className="v3-mock-bar">
        <span className="lights">
          <i />
          <i />
          <i />
        </span>
        <span>{title}</span>
      </div>
      <div className="v3-mock-body">
        {lines.map((l, i) => (
          <div key={i} className={l.className}>
            {l.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export function KanbanMock({
  columns,
}: {
  columns: { title: string; cards: string[] }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {columns.map((col, i) => (
        <div key={i} className="v3-kanban-col">
          <h4>{col.title}</h4>
          {col.cards.map((c, j) => (
            <div key={j} className="v3-kanban-card">
              {c}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DiffMock({
  filename,
  added,
  removed,
  lines,
}: {
  filename: string;
  added: number;
  removed: number;
  lines: { text: string; type?: "add" | "del" | "dim" | "hl" }[];
}) {
  return (
    <div className="v3-mock">
      <div className="v3-mock-bar flex justify-between">
        <span>{filename}</span>
        <span>
          <span style={{ color: "#86efac" }}>+{added}</span>
          <span className="ml-2" style={{ color: "#fca5a5" }}>
            −{removed}
          </span>
        </span>
      </div>
      <div className="v3-mock-body">
        {lines.map((l, i) => (
          <div key={i} className={l.type ?? ""}>
            {l.text}
          </div>
        ))}
      </div>
    </div>
  );
}
