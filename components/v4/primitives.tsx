"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Reveal — fade + rise on scroll into view                           */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  WordsReveal — headline words rise out of clip masks                */
/* ------------------------------------------------------------------ */

export function WordsReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.08em",
            marginBottom: "-0.08em",
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={reduced ? false : { y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Counter — spring count-up when in view                             */
/* ------------------------------------------------------------------ */

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const places = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22 });
  const text = useTransform(spring, (v) =>
    `${prefix}${v.toFixed(places)}${suffix}`
  );

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  if (reduced) {
    return (
      <span ref={ref}>
        {prefix}
        {value.toFixed(places)}
        {suffix}
      </span>
    );
  }
  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic — element leans toward the pointer                        */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spot — pointer-tracked spotlight card wrapper                      */
/* ------------------------------------------------------------------ */

export function Spot({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`v4-spot ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading                                                      */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  tail,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  /** word(s) inside the title to render in serif italic amber */
  accent?: string;
  /** text after the accent */
  tail?: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="v4-mono-dim">{index}</span>
          <span className="v4-eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="v4-display mt-6 text-[clamp(30px,4.6vw,52px)] text-[var(--v4-text)]">
          {title}{" "}
          {accent ? (
            <span className="v4-serif text-[var(--v4-amber)] text-[1.06em]">
              {accent}
            </span>
          ) : null}
          {tail ? <> {tail}</> : null}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-[15px] leading-[1.75] text-[var(--v4-text-2)]">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  hooks                                                               */
/* ------------------------------------------------------------------ */

export function useCopy(text: string, resetMs = 1800) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}
