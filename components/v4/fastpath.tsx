"use client";

import { useEffect, useState } from "react";
import { CV_PDF, EMAIL, LINKEDIN } from "./chrome";

/* ------------------------------------------------------------------ */
/*  RECRUITER BAR — persistent quiet toolbar. Appears after the hero,  */
/*  hides near the contact section (its CTAs take over). Fixed to the  */
/*  bottom, thumb-reachable on mobile, compact pill on desktop.        */
/*  State-driven CSS transitions only — no exit animations.            */
/* ------------------------------------------------------------------ */

export function RecruiterBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const fromBottom =
        document.documentElement.scrollHeight - (y + window.innerHeight);
      // past the hero, but not once the contact CTAs are on screen
      setShow(y > 600 && fromBottom > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-label="Quick actions"
      className={`fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-500 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div className="flex w-full max-w-[420px] items-center gap-2 rounded-full border border-[var(--v4-border-strong)] bg-[#12100d] px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.55)] sm:w-auto">
        <span className="hidden items-center gap-1.5 pl-2 pr-1 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--v4-green)] shadow-[0_0_8px_var(--v4-green)]" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--v4-text-3)]">
            Available
          </span>
        </span>

        <a
          href={CV_PDF}
          download="Liam-Petersen-CV.pdf"
          className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--v4-amber)] px-4 py-3 text-[12.5px] font-medium text-black transition-colors hover:bg-[var(--v4-amber-hi)] sm:flex-none sm:py-2.5"
        >
          <span aria-hidden>↓</span> Download CV
        </a>

        <a
          href={`mailto:${EMAIL}`}
          className="flex flex-1 items-center justify-center whitespace-nowrap rounded-full border border-[var(--v4-border-strong)] px-4 py-3 text-[12.5px] text-[var(--v4-text)] transition-colors hover:border-[var(--v4-amber)]/50 hover:text-[var(--v4-amber-hi)] sm:flex-none sm:py-2.5"
        >
          Email
        </a>

        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center whitespace-nowrap rounded-full border border-[var(--v4-border-strong)] px-4 py-3 text-[12.5px] text-[var(--v4-text)] transition-colors hover:border-[var(--v4-amber)]/50 hover:text-[var(--v4-amber-hi)] sm:flex-none sm:py-2.5"
      >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
