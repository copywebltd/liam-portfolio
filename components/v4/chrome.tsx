"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { caseStudies } from "@/data/case-studies";
import { EASE, useCopy } from "./primitives";

export const EMAIL = "liam@copyweb.io";
export const LINKEDIN = "https://linkedin.com/in/liam-petersen-68464118b";
export const GITHUB = "https://github.com/copywebltd";

export const SECTIONS = [
  { id: "systems", label: "Systems" },
  { id: "workflows", label: "Workflows" },
  { id: "receipts", label: "Receipts" },
  { id: "arc", label: "The arc" },
  { id: "principles", label: "How I work" },
  { id: "stack", label: "Stack" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export function openPalette() {
  window.dispatchEvent(new CustomEvent("v4:palette"));
}

export function openCase(slug: string) {
  const el = document.getElementById(`case-${slug}`);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.dispatchEvent(new CustomEvent("v4:open-case", { detail: slug }));
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                 */
/* ------------------------------------------------------------------ */

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[rgba(10,9,7,0.82)] border-b border-[var(--v4-border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1320px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg border border-[var(--v4-border-strong)] bg-[rgba(245,158,11,0.06)] font-mono text-[12px] font-semibold text-[var(--v4-amber)] transition-colors group-hover:border-[rgba(245,158,11,0.5)]">
            LP
          </span>
          <span className="text-[13.5px] font-medium text-[var(--v4-text-2)] hidden sm:inline group-hover:text-[var(--v4-text)] transition-colors">
            Liam Petersen
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-[13.5px]">
          {SECTIONS.slice(0, 5).map((s) => (
            <a key={s.id} href={`#${s.id}`} className="v4-navlink">
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openPalette}
            className="hidden md:inline-flex items-center gap-2.5 rounded-full border border-[var(--v4-border-strong)] bg-[rgba(255,244,224,0.025)] px-4 py-2 text-[12.5px] text-[var(--v4-text-2)] hover:border-[rgba(245,158,11,0.45)] hover:text-[var(--v4-text)] transition-all"
            aria-label="Open command palette"
          >
            <span>Navigate</span>
            <span className="v4-kbd">⌘K</span>
          </button>
          <a href={`mailto:${EMAIL}`} className="v4-btn v4-btn-ghost !px-5 !py-2 text-[13px]">
            Email me
          </a>
        </div>
      </nav>
      {/* scroll progress */}
      <motion.div
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[var(--v4-amber-deep)] via-[var(--v4-amber)] to-[var(--v4-amber-hi)]"
        style={{ scaleX: progress }}
      />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  PROGRESS RAIL — fixed section index, desktop only                  */
/* ------------------------------------------------------------------ */

export function ProgressRail() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed left-7 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-label={s.label}
          >
            <span
              className={`h-[1.5px] transition-all duration-500 ${
                on
                  ? "w-7 bg-[var(--v4-amber)]"
                  : "w-4 bg-[rgba(235,217,188,0.18)] group-hover:bg-[rgba(245,158,11,0.5)]"
              }`}
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-500 ${
                on
                  ? "text-[var(--v4-amber)] opacity-100"
                  : "text-[var(--v4-text-3)] opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMMAND PALETTE                                                     */
/* ------------------------------------------------------------------ */

type PaletteItem = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { copied, copy } = useCopy(EMAIL);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const items: PaletteItem[] = useMemo(() => {
    const go = (id: string) => () => {
      close();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return [
      ...SECTIONS.map((s) => ({
        id: `sec-${s.id}`,
        group: "Sections",
        label: s.label,
        hint: "Jump to",
        run: go(s.id),
      })),
      ...caseStudies.map((cs) => ({
        id: `case-${cs.slug}`,
        group: "Case studies",
        label: cs.title,
        hint: cs.categoryLabel,
        run: () => {
          close();
          openCase(cs.slug);
        },
      })),
      {
        id: "act-email",
        group: "Actions",
        label: copied ? "Copied to clipboard ✓" : `Copy email · ${EMAIL}`,
        hint: "Action",
        run: () => {
          void copy();
          setTimeout(close, 700);
        },
      },
      {
        id: "act-mail",
        group: "Actions",
        label: "Compose email",
        hint: "mailto",
        run: () => {
          close();
          window.location.href = `mailto:${EMAIL}`;
        },
      },
      {
        id: "act-li",
        group: "Actions",
        label: "Open LinkedIn",
        hint: "↗",
        run: () => {
          close();
          window.open(LINKEDIN, "_blank", "noopener");
        },
      },
      {
        id: "act-gh",
        group: "Actions",
        label: "Open GitHub",
        hint: "↗",
        run: () => {
          close();
          window.open(GITHUB, "_blank", "noopener");
        },
      },
      {
        id: "act-cw",
        group: "Actions",
        label: "Open copyweb.io",
        hint: "↗",
        run: () => {
          close();
          window.open("https://copyweb.io", "_blank", "noopener");
        },
      },
    ];
  }, [close, copied, copy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.group} ${i.label}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  // global listeners
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("v4:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("v4:palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  };

  // grouped render order
  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, PaletteItem[]>();
    for (const it of filtered) {
      if (!map.has(it.group)) {
        map.set(it.group, []);
        order.push(it.group);
      }
      map.get(it.group)!.push(it);
    }
    return order.map((g) => ({ group: g, items: map.get(g)! }));
  }, [filtered]);

  let flatIndex = -1;

  /* Always mounted; animated via state. AnimatePresence exit animations
     can wedge under React 19 + framer-motion 11, leaving the overlay
     stuck at full opacity — so the palette never relies on exit. */
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: open ? 0.22 : 0 }}
      style={{
        // instant hide on close: visibility kills the backdrop-filter cost,
        // pointer-events can never trap clicks under a stalled animation
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
      }}
      aria-hidden={!open}
    >
      {open && (
        <div
          className="absolute inset-0 bg-[rgba(6,5,4,0.7)] backdrop-blur-md"
          onClick={close}
        />
      )}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[620px] rounded-2xl border border-[var(--v4-border-strong)] bg-[rgba(18,16,12,0.96)] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,158,11,0.07)] overflow-hidden"
        initial={false}
        animate={
          open
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.97, y: -10 }
        }
        transition={{ duration: 0.28, ease: EASE }}
      >
            <div className="flex items-center gap-3 px-5 border-b border-[var(--v4-border)]">
              <span className="text-[var(--v4-amber)] font-mono text-[13px]">
                ›
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to a section, case study, or action…"
                className="flex-1 bg-transparent py-4 text-[14.5px] text-[var(--v4-text)] placeholder:text-[var(--v4-text-3)] outline-none"
              />
              <span className="v4-kbd">esc</span>
            </div>

            <div className="max-h-[46vh] overflow-y-auto py-2">
              {groups.length === 0 && (
                <div className="px-5 py-8 text-center text-[13.5px] text-[var(--v4-text-3)]">
                  Nothing matches “{query}”.
                </div>
              )}
              {groups.map(({ group, items: gi }) => (
                <div key={group} className="px-2 pb-1">
                  <div className="px-3 pt-3 pb-2 v4-mono-dim !text-[9.5px]">
                    {group}
                  </div>
                  {gi.map((it) => {
                    flatIndex += 1;
                    const idx = flatIndex;
                    const on = idx === cursor;
                    return (
                      <button
                        key={it.id}
                        onClick={it.run}
                        onMouseEnter={() => setCursor(idx)}
                        className={`w-full flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors ${
                          on
                            ? "bg-[rgba(245,158,11,0.1)] text-[var(--v4-text)]"
                            : "text-[var(--v4-text-2)]"
                        }`}
                      >
                        <span className="truncate">{it.label}</span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.14em] shrink-0 ${
                            on ? "text-[var(--v4-amber)]" : "text-[var(--v4-text-3)]"
                          }`}
                        >
                          {it.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 px-5 py-3 border-t border-[var(--v4-border)] v4-mono-dim !text-[9.5px]">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto text-[var(--v4-amber)]/70">
                Built into the site. Like everything else here.
              </span>
            </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--v4-border)] py-12">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="v4-mono-dim !normal-case !tracking-[0.14em]">
          © 2026 Liam Petersen · Built on Claude Code · This redesign shipped
          with Claude Fable 5
        </div>
        <div className="flex items-center gap-7 text-[13px] text-[var(--v4-text-2)]">
          <a
            href={`mailto:${EMAIL}`}
            className="hover:text-[var(--v4-amber)] transition-colors"
          >
            {EMAIL}
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--v4-amber)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://copyweb.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--v4-amber)] transition-colors"
          >
            copyweb.io
          </a>
        </div>
      </div>
    </footer>
  );
}
