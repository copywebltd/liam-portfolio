"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { arc } from "@/data/arc";
import { caseStudies } from "@/data/case-studies";
import { stackTabs } from "@/data/stack";

/* ---------- imagery (Unsplash, late-night-builder set) -------------- */

const IMG = {
  // Calm wide laptop-at-night shot — atmospheric, not aggressive
  hero: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2400&q=80",
  // Code editor for "ship code" quote break
  break1: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2400&q=80",
  // Keyboard with desk lamp — moody
  break2: "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=2400&q=80",
  // Three loop acts: spec / ship / learn
  loop1: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
  loop2: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
  loop3: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
};

/* ---------- shared atoms ------------------------------------------- */

function FadeIn({
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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Dispatch({
  role,
  location,
  time,
}: {
  role: string;
  location: string;
  time: string;
}) {
  return (
    <span className="v2-dispatch">
      <span className="marker">●</span> {role}
      <span className="sep">·</span>
      {location}
      <span className="sep">·</span>
      {time}
    </span>
  );
}

function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [d, setD] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setD(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setD(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  const hasDecimal = value % 1 !== 0;
  const f = hasDecimal ? d.toFixed(1) : Math.round(d).toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {f}
      {suffix}
    </span>
  );
}

/* ---------- NAV ----------------------------------------------------- */

export function V2Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--v2-bg)]/70 border-b border-[var(--v2-border)]">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="v2-mono text-[12px] tracking-[0.18em] uppercase text-[var(--v2-text)]">
            LP
          </span>
          <span className="hidden sm:inline text-[13px] text-[var(--v2-text-secondary)]">
            Liam Petersen
          </span>
        </a>
        <div className="hidden md:flex items-center gap-9 text-[13px] text-[var(--v2-text-secondary)]">
          <a className="hover:text-[var(--v2-text)] transition-colors" href="#loop">Inside the loop</a>
          <a className="hover:text-[var(--v2-text)] transition-colors" href="#artifacts">Artifacts</a>
          <a className="hover:text-[var(--v2-text)] transition-colors" href="#arc">Arc</a>
          <a className="hover:text-[var(--v2-text)] transition-colors" href="#stack">Stack</a>
        </div>
        <a href="mailto:liam@copyweb.io" className="v2-btn text-[12px] px-4 py-2">
          Email me <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}

/* ---------- HERO — full-bleed, anchored top-left ------------------- */

export function V2Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden flex items-end pb-20 md:pb-28"
    >
      <div className="v2-hero-image" style={{ backgroundImage: `url('${IMG.hero}')` }} />
      <div className="v2-grain" />
      <div className="v2-ambient" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <FadeIn delay={0.1}>
          <Dispatch role="Builder" location="Cape Town" time="23:14" />
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="v2-display mt-8 max-w-5xl">
            Direct response operator.
            <br />
            <span className="text-[var(--v2-text-secondary)]">
              Production AI builder.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-10 max-w-xl text-[14px] leading-[1.7] text-[var(--v2-text-secondary)]">
            Six years writing copy that had to convert or get killed. Two years
            shipping the AI systems that scale that work to a $20M+ portfolio.
            Eleven production systems. Sixty custom Claude Code skills. One
            operator.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#artifacts" className="v2-btn v2-btn--solid">
              See the artifacts
            </a>
            <a href="mailto:liam@copyweb.io" className="v2-btn">
              Get in touch
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- DOCTRINE STRIP ----------------------------------------- */

export function V2Doctrine() {
  return (
    <section className="border-y border-[var(--v2-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-7 flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
        <span className="v2-eyebrow text-[var(--v2-violet)]">
          Build doctrine / 01
        </span>
        <p className="text-[14px] leading-[1.6] text-[var(--v2-text-secondary)] max-w-3xl">
          Every system below shipped through Claude Code. Frontends, backends,
          agents, skills, MCP integrations, CLIs. AI as the build environment,
          not the assistant. One runtime, one operator, real receipts.
        </p>
      </div>
    </section>
  );
}

/* ---------- PHOTO BREAK 1 — overlay quote --------------------------- */

export function V2PhotoBreakOne() {
  return (
    <section className="v2-photo-break">
      <div className="v2-photo-break-img" style={{ backgroundImage: `url('${IMG.break1}')` }} />
      <div className="v2-grain" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <FadeIn>
          <Dispatch role="Field note" location="Amsterdam" time="2024" />
        </FadeIn>
        <FadeIn delay={0.15}>
          <blockquote
            className="mt-10 max-w-3xl font-light tracking-[-0.03em] leading-[1.1] text-[var(--v2-text)]"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
          >
            &ldquo;Most teams use AI to write code.
            <br />
            <span className="text-[var(--v2-text-secondary)]">
              I use it to ship systems.&rdquo;
            </span>
          </blockquote>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-10 v2-mono text-[11px] uppercase tracking-[0.22em] text-[var(--v2-text-tertiary)]">
            Six months · blank repo to production · 7 brands · $20M portfolio
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- INSIDE THE LOOP — three acts with imagery -------------- */

const acts = [
  {
    n: "01",
    title: "Spec.",
    img: IMG.loop1,
    body:
      "The brief is the artifact. Before any model touches the work, the spec is written: who it's for, what it has to do, what failure looks like. Most AI work skips this. That's why most AI work fails.",
    bullets: ["Customer language pulled, not assumed", "Constraints named upfront", "Edge cases listed before code"],
  },
  {
    n: "02",
    title: "Ship.",
    img: IMG.loop2,
    body:
      "Claude Code as the build environment. Frontends, backends, agents, skills, MCPs — one runtime, one operator. The model writes. The human approves every output that touches a customer.",
    bullets: ["Claude Opus 4.7 primary", "60+ custom skills authored", "MCP-wired to live data"],
  },
  {
    n: "03",
    title: "Learn.",
    img: IMG.loop3,
    body:
      "If a system can't get smarter from the work, it isn't finished. Editor corrections, customer signals, failed campaigns — all of it feeds back into the next pass. The system compounds. So does the leverage.",
    bullets: ["Brand-fit ranker scores every output", "Corrections versioned in vault", "Skills evolve with the work"],
  },
];

export function V2Loop() {
  return (
    <section id="loop" className="relative py-28 md:py-36 border-t border-[var(--v2-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="v2-eyebrow mb-6">// Inside the loop</div>
          <h2 className="v2-display max-w-4xl" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
            Three acts.
            <br />
            <span className="text-[var(--v2-text-secondary)]">
              How every system gets built.
            </span>
          </h2>
        </FadeIn>

        <div className="mt-20 grid lg:grid-cols-3 gap-x-8 gap-y-16">
          {acts.map((a, i) => (
            <FadeIn key={a.n} delay={i * 0.1}>
              <article>
                <div
                  className="v2-loop-img"
                  style={{ backgroundImage: `url('${a.img}')` }}
                />
                <div className="mt-8 flex items-baseline gap-4">
                  <span className="v2-mono text-[11px] uppercase tracking-[0.22em] text-[var(--v2-violet)]">
                    Act / {a.n}
                  </span>
                </div>
                <h3
                  className="mt-3 font-light tracking-[-0.03em] text-[var(--v2-text)]"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1 }}
                >
                  {a.title}
                </h3>
                <p className="mt-5 text-[14px] leading-[1.75] text-[var(--v2-text-secondary)]">
                  {a.body}
                </p>
                <ul className="mt-6 space-y-2">
                  {a.bullets.map((b) => (
                    <li
                      key={b}
                      className="v2-mono text-[12px] uppercase tracking-[0.12em] text-[var(--v2-text-tertiary)] flex gap-3"
                    >
                      <span className="text-[var(--v2-violet)]">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- METRICS — giant standalone callouts -------------------- */

const metrics = [
  { value: 800, prefix: "$", suffix: "K", label: "Peak monthly revenue", sub: "Blackmores · running on Foxelli Studio" },
  { value: 3.3, suffix: "×", label: "Email revenue scaled", sub: "$76K → $249K in four months" },
  { value: 60, suffix: "+", label: "Custom Claude Code skills", sub: "Authored end-to-end" },
  { value: 11, suffix: "", label: "Production systems shipped", sub: "Cross-functional, end-to-end" },
];

export function V2Metrics() {
  return (
    <section className="relative py-28 md:py-36 border-t border-[var(--v2-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="v2-eyebrow mb-6">// Receipts</div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.08}>
              <div className="border-t border-[var(--v2-border-strong)] pt-8">
                <div className="v2-metric">
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="mt-6 text-[15px] tracking-[-0.01em] text-[var(--v2-text)]">
                  {m.label}
                </div>
                <div className="mt-2 v2-mono text-[12px] text-[var(--v2-text-tertiary)]">
                  {m.sub}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PHOTO BREAK 2 — between metrics and artifacts ---------- */

export function V2PhotoBreakTwo() {
  return (
    <section className="v2-photo-break">
      <div className="v2-photo-break-img" style={{ backgroundImage: `url('${IMG.break2}')` }} />
      <div className="v2-grain" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <FadeIn>
          <Dispatch role="Manifest" location="Eleven systems" time="2024 — 2026" />
        </FadeIn>
        <FadeIn delay={0.15}>
          <h2
            className="mt-10 max-w-3xl font-light tracking-[-0.045em] leading-[0.95] text-[var(--v2-text)]"
            style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
          >
            The artifacts
            <br />
            <span className="text-[var(--v2-text-secondary)]">are the proof.</span>
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- ARTIFACTS — case studies as shipped artifacts ----------- */

export function V2Artifacts() {
  const featured = caseStudies.slice(0, 6);
  return (
    <section id="artifacts" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="v2-eyebrow mb-6">// Shipped artifacts · 01 — 06</div>
        </FadeIn>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {featured.map((cs, i) => (
            <FadeIn key={cs.slug} delay={i * 0.06}>
              <article className="v2-artifact h-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="v2-mono text-[11px] tracking-[0.2em] uppercase text-[var(--v2-text-tertiary)]">
                    Artifact / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="v2-mono text-[11px] tracking-[0.2em] uppercase text-[var(--v2-violet)]">
                    {cs.year}
                  </span>
                </div>

                <h3 className="mt-10 text-[26px] md:text-[32px] leading-[1.05] tracking-[-0.03em] font-light text-[var(--v2-text)]">
                  {cs.title}
                </h3>
                <div className="mt-3 text-[14px] text-[var(--v2-text-secondary)]">
                  {cs.subtitle}
                </div>

                <p className="mt-8 text-[14px] leading-[1.75] text-[var(--v2-text-secondary)] border-l border-[var(--v2-border-strong)] pl-5">
                  {cs.oneLiner}
                </p>

                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 pt-8 border-t border-[var(--v2-border)]">
                  {cs.metrics.slice(0, 4).map((mt) => (
                    <div key={mt.label}>
                      <div className="text-[22px] font-light tracking-[-0.02em] text-[var(--v2-text)]">
                        {mt.value}
                      </div>
                      <div className="mt-1 v2-mono text-[10px] uppercase tracking-[0.18em] text-[var(--v2-text-tertiary)]">
                        {mt.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10 v2-mono text-[11px] uppercase tracking-[0.18em] text-[var(--v2-text-tertiary)]">
                  {cs.org}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ARC — ledger style ------------------------------------- */

export function V2Arc() {
  return (
    <section id="arc" className="relative py-28 md:py-36 border-t border-[var(--v2-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="v2-eyebrow mb-6">// The arc</div>
          <h2 className="v2-display max-w-4xl" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
            From copy to code,
            <br />
            <span className="text-[var(--v2-text-secondary)]">across three continents.</span>
          </h2>
        </FadeIn>

        <div className="mt-20">
          {arc.map((p, i) => (
            <FadeIn key={p.years} delay={i * 0.06}>
              <div className="v2-ledger-row md:grid-cols-[180px_1fr_2fr]">
                <div>
                  <div className="v2-mono text-[12px] tracking-[0.15em] uppercase text-[var(--v2-violet)]">
                    {p.years}
                  </div>
                  <div className="mt-2 v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--v2-text-tertiary)]">
                    {p.geo}
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] tracking-[-0.015em] text-[var(--v2-text)] font-light">
                    {p.role}
                  </h3>
                  <div className="mt-1 text-[13px] text-[var(--v2-text-secondary)]">
                    {p.org}
                  </div>
                </div>
                <div>
                  <p className="text-[14px] leading-[1.75] text-[var(--v2-text-secondary)]">
                    {p.body}
                  </p>
                  <div className="mt-4 v2-mono text-[11px] uppercase tracking-[0.18em] text-[var(--v2-violet)]">
                    {p.highlight}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STACK -------------------------------------------------- */

export function V2Stack() {
  const [active, setActive] = useState(stackTabs[0].id);
  const tab = stackTabs.find((t) => t.id === active) ?? stackTabs[0];
  return (
    <section id="stack" className="relative py-28 md:py-36 border-t border-[var(--v2-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="v2-eyebrow mb-6">// Stack</div>
          <h2 className="v2-display max-w-4xl" style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}>
            The runtime,
            <br />
            <span className="text-[var(--v2-text-secondary)]">and what's wired in.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-x-1 gap-y-2 -mx-1">
            {stackTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`v2-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 transition-colors ${
                  active === t.id
                    ? "text-[var(--v2-text)] border-b border-[var(--v2-text)]"
                    : "text-[var(--v2-text-tertiary)] border-b border-transparent hover:text-[var(--v2-text-secondary)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 border-t border-[var(--v2-border-strong)] pt-10"
        >
          {tab.note && (
            <p className="text-[14px] leading-[1.7] text-[var(--v2-text-secondary)] max-w-2xl mb-12">
              {tab.note}
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {tab.groups.map((g) => (
              <div key={g.heading}>
                <h4 className="v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--v2-violet)] mb-5">
                  {g.heading}
                </h4>
                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13.5px] leading-[1.55] text-[var(--v2-text-secondary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- ABOUT -------------------------------------------------- */

export function V2About() {
  return (
    <section id="about" className="relative py-28 md:py-36 border-t border-[var(--v2-border)]">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <FadeIn>
          <Dispatch role="From the desk" location="Cape Town" time="ongoing" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            className="v2-display mt-10"
            style={{ fontSize: "clamp(32px, 4.2vw, 48px)" }}
          >
            A builder who used to write copy.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 space-y-7 text-[16px] leading-[1.85] text-[var(--v2-text-secondary)]">
            <p>
              I&apos;m Liam. Writing this from Cape Town. Wife, a kid, and a
              six-year direct response habit that won&apos;t quit.
            </p>
            <p>
              The story starts in 2021 with daily emails for a crypto gaming
              platform. Two years later, more emails written than worth
              counting. The only lesson that matters in direct response:
              you&apos;ll know if it worked by Wednesday.
            </p>
            <p>
              Got into AI early. Not because AI was exciting. Because the same
              brief twice was killing me. By 2024 I was running AI strategy
              across seven DTC brands and a $20M+ portfolio. By 2026, eleven
              production systems and 60+ custom Claude Code skills.
            </p>
            <p className="text-[var(--v2-text)]">
              I don&apos;t call myself an architect or an engineer. I&apos;m a
              builder. I write copy, I ship code, I run systems, I lead teams.
              The line between those things got thinner every year. I stopped
              trying to draw it.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- CONTACT ------------------------------------------------ */

export function V2Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-[var(--v2-border)]">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <div className="v2-eyebrow mb-6">// Sign-off</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="v2-display" style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}>
            Let&apos;s build something
            <br />
            <span className="text-[var(--v2-text-secondary)]">that compounds.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-10 text-[15px] leading-[1.7] text-[var(--v2-text-secondary)] max-w-xl mx-auto">
            Open to senior AI engineering, AI strategy, and advisory roles.
            Remote · US &amp; EU only. Available now.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a href="mailto:liam@copyweb.io" className="v2-btn v2-btn--solid">
              Email me
            </a>
            <a
              href="https://linkedin.com/in/liam-petersen-68464118b"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-btn"
            >
              LinkedIn
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- FOOTER ------------------------------------------------- */

export function V2Footer() {
  return (
    <footer className="border-t border-[var(--v2-border)] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--v2-text-tertiary)]">
          © 2026 Liam Petersen <span className="text-[var(--v2-text-faint)] mx-2">·</span> Built on Claude Code
        </div>
        <div className="flex items-center gap-6 v2-mono text-[11px] uppercase tracking-[0.2em] text-[var(--v2-text-tertiary)]">
          <a href="mailto:liam@copyweb.io" className="hover:text-[var(--v2-text)] transition-colors">
            liam@copyweb.io
          </a>
          <a
            href="https://github.com/copywebltd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--v2-text)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://copyweb.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--v2-text)] transition-colors"
          >
            copyweb.io
          </a>
        </div>
      </div>
    </footer>
  );
}
