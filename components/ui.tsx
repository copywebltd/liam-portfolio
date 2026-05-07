"use client";

import { motion, type HTMLMotionProps, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
      {children}
    </span>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const styles =
    tone === "accent"
      ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/8 text-[var(--color-accent)]"
      : "border-[var(--color-border-structural)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}

export function StackChip({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] tracking-tight rounded-md border border-[var(--color-border-structural)] bg-[var(--color-surface)] px-2 py-1 text-[var(--color-text-secondary)]">
      {children}
    </span>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  external,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-medium tracking-wide transition-all duration-300 rounded-md overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-accent)] text-[var(--color-text-on-accent)] hover:bg-[var(--color-accent-hover)] shadow-beautiful"
      : "border border-[var(--color-border-structural)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-x-0 -bottom-px h-px border-beam pointer-events-none" />
      )}
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`gradient-border-card rounded-2xl shadow-beautiful ${className}`}
    >
      {children}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  ...rest
}: { children: ReactNode; delay?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[36px] md:text-[44px] font-medium tracking-[-0.025em] text-[var(--color-text-primary)] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedCounter — counts up when in viewport                       */
/* ------------------------------------------------------------------ */

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  // Format: keep one decimal if value has one, else integer with commas
  const hasDecimal = value % 1 !== 0;
  const formatted = hasDecimal
    ? display.toFixed(1)
    : Math.round(display).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Spotlight wrapper — cursor-follow radial glow                      */
/* ------------------------------------------------------------------ */

export function SpotlightWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-grid ${className}`}>
      {children}
    </div>
  );
}

export function EngineeringMarkers() {
  return (
    <div className="absolute inset-x-0 top-20 z-10 flex justify-between max-w-7xl mx-auto px-6 md:px-10 pointer-events-none">
      {["X-01", "X-02", "X-03", "X-04"].map((m) => (
        <span key={m} className="engineering-marker">
          {m}
        </span>
      ))}
    </div>
  );
}
