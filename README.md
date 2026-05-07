# liam-portfolio

Personal portfolio site. Next.js 15 + Tailwind v4 + Framer Motion. Helios visual DNA with amber-shifted personal accent.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

```bash
npm install -g vercel
vercel
# then `vercel --prod` for production
```

Connects under the existing Vercel team. Swap to `liampetersen.com` later via DNS.

## What's in here

- **Hero** — Halbert + Neumeier 1-2 punch. "Six years in direct response. Two years shipping production AI. The numbers got bigger." Built-doctrine kicker. CTA + email button.
- **Build doctrine strip** — under hero. "Every system below was built on Claude Code."
- **Receipts** — 4 real numbers as Helios glass cards. No animated counters that show 0 on first paint.
- **9 case studies** — filterable (All / Production / Internal / Open source / Meta-tooling). Expand-on-click for the deep technical sections. Three are fully written: Foxelli Studio, Static Ad System, Skill Library. The other six are populated and shippable but lighter — flesh out as time allows.
- **The arc** — 4 phases. Satoshi (US) → Foxelli copy (NL) → Foxelli AI strategy (NL) → Copyweb founder (ZA → global). Vertical timeline with alternating sides.
- **How I work** — 5 principles. Claude Code as runtime is principle #1.
- **Stack** — tabbed. Build environment leads. Models, AI image & video, Frontend, Backend & data, Infrastructure follow.
- **About** — Halbert confessional. Cape Town, the kid, the six-year habit.
- **Contact** — single block. Email + LinkedIn.

## Visual direction

Helios DNA from `vault/knowledge/tools/copyweb-visual-dna.md`. Same parents, different child:
- Background `#0A0A0A`, surface `#161616`, surface-elevated `#1F1F1F`
- Amber accent `#d97706` (personal twist, distinct from Copyweb's `#F97316`)
- Geist Sans + Geist Mono throughout
- 6-layer beautiful shadow on cards (MengTo signature)
- Gradient border shells on cards
- Static dot-grid background + breathing ambient glow

## What's still v2

These are deliberately deferred so v1 ships fast:

1. **WebGL hero shader.** MVP uses a static dot-grid + CSS breathing glow. To upgrade, port `copyweb-site/src/components/v2/HeroShader.tsx` into `components/HeroShader.tsx` and drop it into the `<Hero>` background layer.
2. **Real screenshots per case study.** Each card currently shows metric pills only. Add a `heroImage` field to the CaseStudy type in `data/case-studies.ts` and a `<div>` slot in `case-studies.tsx`. Source: Replit dashboards, n8n workflow grids, Mission Control UI captures.
3. **GSAP ScrollTrigger choreography.** Sections currently use Framer Motion `whileInView` with stagger. Swap to GSAP for tighter pin/scrub effects on the arc timeline if you want the cinematic feel.
4. **Loom walkthroughs.** Add a `loomUrl` field to CaseStudy; render a small "Watch the build (60s)" link in the expanded section.
5. **MDX expansions.** If any case study grows past 6 sections, move it to its own MDX page at `/systems/[slug]`.
6. **CV download.** Add `public/liam-petersen-cv.pdf` and re-enable the download button in the hero.
7. **OG image.** Add `app/opengraph-image.png` (1200×630) so LinkedIn shares look right.
8. **Flesh out the 6 lighter case studies.** Ad Professor, AI Agent Team, Creative Content Engine, Copyweb v2, Mission Control, Copywriting Intelligence Layer all have content but lighter detail than Foxelli Studio / Static Ad System / Skill Library.

## File map

```
app/
  layout.tsx          # Root layout, Geist fonts, metadata
  page.tsx            # Composes all sections in order
  globals.css         # Tailwind v4 @theme + design tokens + utility classes
components/
  ui.tsx              # Eyebrow, Pill, Button, Card, FadeIn, SectionHeading, EngineeringMarkers
  sections.tsx        # Nav, Hero, BuildDoctrine, Receipts, Arc, Principles, Stack, About, Contact, Footer
  case-studies.tsx    # CaseStudies grid + CaseStudyCard with expand/collapse
data/
  case-studies.ts     # 9 case studies, single source of truth for content
  arc.ts              # 4-phase timeline data
  stack.ts            # Tabbed stack groups (Build env first)
public/               # Static assets — drop the CV PDF and OG image here
```

## Voice rules

All copy passes through:
- Halbert — every line earns the next, sentence chain forward
- Schwartz — chimpanzee brain (vivid, concrete, gut-level), channel existing suspicion
- Neumeier — hand test (cover the name, can you tell who wrote it?)
- Sugarman — slippery slide on hero hook
- No em dashes anywhere
- Sentence case headlines
- No "leverage / unlock / cutting-edge / architect / synergy"

If you edit the copy, run it past those rules. They're load-bearing.
