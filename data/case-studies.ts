export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  org: string;
  category: "production" | "internal" | "open-source" | "meta";
  categoryLabel: string;
  year: string;
  status: string;
  oneLiner: string;
  metrics: Metric[];
  sections: { heading: string; body: string }[];
  stack: string[];
  builtOn: string;
  proofPoint?: string;
  videoId?: string;
  videoCaption?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "foxelli-studio",
    title: "Foxelli Studio",
    subtitle: "End-to-end AI ad production platform",
    org: "Foxelli Group · Netherlands · 7 DTC brands · $20M+ portfolio",
    category: "production",
    categoryLabel: "Shipped to production",
    year: "2024 — 2026",
    status: "In daily use",
    oneLiner:
      "Six months from blank repo to a platform the entire ads team uses every day. 26-workflow engine. Architected for 100 concurrent users.",
    metrics: [
      { value: "26", label: "Production workflows" },
      { value: "60+", label: "Custom skills authored" },
      { value: "73", label: "Production bugs resolved" },
      { value: "6×", label: "Video ad output (25 → 150/wk)" },
    ],
    sections: [
      {
        heading: "The problem",
        body:
          "Foxelli runs seven DTC brands. Each one needed a steady stream of ad creative. The bottleneck wasn't ideas. It was the gap between 'we have an idea' and 'we have a finished video ad you can run on Meta tomorrow.' That gap was eating my team's week.",
      },
      {
        heading: "The build",
        body:
          "A conversational planning interface where a strategist works with AI to generate and score ad concepts against a quality framework synthesized from five direct response copywriting disciplines: Halbert, Schwartz, Ogilvy, Sugarman, Bencivenga. Behind it, a 26-workflow production engine handling script generation (a 4-layer chain of context, strategy, writing, and validation), image generation across 5 visual modes, video production with cross-scene face consistency, voiceover with voice cloning, and automated export.",
      },
      {
        heading: "The learning loop",
        body:
          "Every editor decision gets analyzed by Claude and fed back into future prompts. The system learns the team's taste. Reject a script and the next one for the same brand starts closer to what an editor would actually approve.",
      },
      {
        heading: "An architecture call worth keeping",
        body:
          "The data layer and the media-generation layer are separated by design. Stateful business logic (auth, jobs, brands, feedback loops) lives in Supabase, where row-level security protects tenant data and Postgres handles transactional reads. The heavy-lifting media calls (image gen, video gen, voice) run through n8n, where queueing, retries, and provider fallback are trivial to wire and easy to swap. Putting media gen in Postgres would have made the database the bottleneck. Putting business logic in n8n would have made every read a webhook. Splitting them by responsibility kept both layers honest.",
      },
      {
        heading: "Production safeguards",
        body:
          "Endpoint and table allowlisting so only pre-approved n8n endpoints and Supabase tables are accessible. Tiered rate limiting (60/20/5 req/min). Adaptive polling: 15s when generating, 60s when idle, exponential backoff on 429s, tab-visibility pause to stop firing webhooks at midnight when no one's logged in. Stuck-job detection per status with automatic reset to a known-good prior state. Per-operation cancellation refs to prevent race conditions.",
      },
      {
        heading: "Token discipline",
        body:
          "The 4-layer script generation chain runs with prompt caching at the upstream layers and tight context windows downstream. Most teams treat every model call as a fresh transaction. The smarter pattern is to treat the chain as a system: cache what doesn't change between requests, reload only what does. That kept the cost line flat as the team scaled from 25 to 150 ads per week.",
      },
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Express 5",
      "Supabase (PostgreSQL + RLS)",
      "n8n Cloud",
      "Clerk",
      "Claude Sonnet",
      "Kling 3.0",
      "Seedance 2.0",
      "VEO 3.1",
      "Gemini 2.0 Flash",
      "ElevenLabs",
      "Tailwind",
      "shadcn/ui",
      "TanStack Query",
      "Framer Motion",
    ],
    builtOn:
      "Built on Claude Code. 60+ custom skills, MCP servers for Supabase and n8n, CLI integrations for Replit deploy.",
    proofPoint: "$414K → $800K/mo brand revenue (Hooks & Needles) running through this pipeline.",
    videoId: "tsBNAIj_h1Y",
    videoCaption: "Full platform walkthrough. 1:23.",
  },
  {
    slug: "static-ad-system",
    title: "Outreach Pack",
    subtitle: "A full personalized outreach pack per prospect, across 16 expert frameworks",
    org: "Copyweb · Cold outreach + client delivery",
    category: "production",
    categoryLabel: "Shipped to production",
    year: "2026",
    status: "Daily production use",
    oneLiner:
      "A complete personalized outreach pack per prospect: five Facebook-ready ads, a customer intelligence brief, and a long-form sales page. Copy routed across 16 expert frameworks. Every claim traced to source.",
    metrics: [
      { value: "16", label: "Expert frameworks bound" },
      { value: "~280", label: "Evidence entries in canon" },
      { value: "~60%", label: "Cost reduction on media" },
      { value: "4 hrs", label: "Human time per pack" },
    ],
    sections: [
      {
        heading: "The problem",
        body:
          "Cold outreach with AI-generated slop kills the deal before the pitch. Most 'AI ad tools' produce work that screams 'made by a machine in 30 seconds.' In the Andromeda era of Meta ads, where the algorithm rewards on-brand, clear-angle, scroll-stopping creative, slop doesn't just look bad. It costs you the auction.",
      },
      {
        heading: "The build",
        body:
          "A skill orchestrator called /lfsl takes a brand's URL and produces a complete cold-outreach pack: deep customer research, a Customer Intelligence Brief, five static ads with copy and visuals, a long-form sales letter, and a Vercel deploy. The copy gets routed through whichever of 16 expert frameworks fits the angle. Halbert for direct response. Schwartz for awareness staging. Ogilvy for fact-led. Sugarman for slippery slide. Bencivenga for proof-heavy. Plus 11 others. Each ad in a pack carries a different framework. Every static ad ships with a Facebook-ready copy package (primary text, headline, description) and a craft breakdown showing the angle, the expert, and the proof behind every line. Any claim the system cannot trace to a source gets cut before the pack ships.",
      },
      {
        heading: "The visual layer",
        body:
          "GPT Image 2 (default) and Nano Banana 2 (fallback) for static images. Kling 3.0 and Seedance 2.0 for video. ElevenLabs for voice. A brand-fit ranker scores every output before it ships. Claim-types controlled vocabulary keeps the language on-brand. Pixel-perfect logo compositing handled client-side. Product images are AI-composed around the brand's real product, so every ad is accurate to the actual SKU instead of an AI guess.",
      },
      {
        heading: "Cost engineering",
        body:
          "All media generation routes through Kie.ai instead of provider APIs direct. That's a ~60% cost reduction with no quality drop. Most teams pay retail because they don't shop the layer. This one does.",
      },
      {
        heading: "Validated on",
        body:
          "BLK & Bold and Create Wellness, shown back to back in the walkthrough above. Also run on Inno Supps, Sun Home, Tower 28, Clove Ona Brilliant White, and Pique. Each pack scoped, researched, written, designed, and shipped in under 4 hours of human time.",
      },
      {
        heading: "Why it matters",
        body:
          "Cold outreach is a math problem. Response rate times deal size equals revenue per touch. Sloppy AI work tanks the response rate. Expert-grade work doesn't. So I built the system that produces expert-grade work at the cost basis of slop.",
      },
    ],
    stack: [
      "Claude Opus 4.7",
      "GPT Image 2",
      "Nano Banana 2",
      "Kling 3.0",
      "Seedance 2.0",
      "ElevenLabs",
      "Kie.ai (routing)",
      "Vercel",
      "Next.js 15",
      "16 expert canon",
    ],
    builtOn:
      "Built on Claude Code. Single skill orchestrator (/lfsl) chains research → copy → image → video → deploy.",
    videoId: "WHlnVYEmlLA",
    videoCaption: "One system, two brands. BLK & Bold + Create Wellness. 1:22.",
  },
  {
    slug: "cinematic-ad-pipeline",
    title: "Cinematic Ad Pipeline",
    subtitle: "Single AI video ad spots, end-to-end, $3.16/spot",
    org: "Copyweb · Production deliverable",
    category: "production",
    categoryLabel: "Shipped to production",
    year: "2026",
    status: "Daily production use",
    oneLiner:
      "From product image to 720p cinematic ad spot in one orchestrated pipeline. Cross-scene face consistency, voice clone, and brand-fit ranker before delivery.",
    metrics: [
      { value: "$3.16", label: "Cost per spot" },
      { value: "720p", label: "Seedance 2.0 output" },
      { value: "5", label: "Visual modes supported" },
      { value: "Pixel-perfect", label: "Logo composite" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "A single orchestrator (/cinematic-ad) takes a brand product image and a creative direction and produces a complete cinematic video ad spot. Six phases: brand voice extraction, 4K storyboard generation, expert-grounded ad copy, image generation across 5 visual modes, video synthesis with cross-scene face consistency, voice clone + voiceover, and final composite with logo placement. Total human time per spot: about 10 minutes.",
      },
      {
        heading: "The model layer",
        body:
          "Seedance 2.0 for video synthesis (720p production default). GPT Image 2 (default) and Nano Banana 2 (fallback) for 4K storyboard image generation. Kling 3.0 as alternate video provider. ElevenLabs for voice cloning. All routed through Kie.ai at ~60% under retail. Brand-fit ranker scores every output before delivery. Anti-slop validators catch common AI video artifacts (small-label text ceiling, hand mutations, scene drift).",
      },
      {
        heading: "Production safeguards",
        body:
          "Universal AI video small-label text ceiling enforced (no AI-generated text smaller than ~24pt — they always degrade). Cross-scene face consistency check between storyboard panels. Provider fallback when any model degrades or rate-limits. Cost ceiling: $3.16/spot is the production default with the 4K storyboard + Seedance 2.0 720p combo.",
      },
      {
        heading: "Why it matters",
        body:
          "DTC brands need video at scale, but most AI video tools produce unusable slop. This pipeline enforces production discipline at every phase — script, visual, motion, voice, composite — and ships cinema-quality output at ad-spend-friendly cost.",
      },
    ],
    stack: [
      "Claude Opus 4.7",
      "GPT Image 2",
      "Nano Banana 2",
      "Seedance 2.0",
      "Kling 3.0",
      "ElevenLabs",
      "Kie.ai (routing)",
      "FFmpeg compositor",
    ],
    builtOn:
      "Built on Claude Code. Single skill orchestrator (/cinematic-ad) chains storyboard → ad copy → image gen → video synthesis → voice clone → composite.",
  },
  {
    slug: "cinematic-sites-pipeline",
    title: "Cinematic Sites Pipeline",
    subtitle: "Transform any website into a cinematic experience, end-to-end",
    org: "Copyweb · Production deliverable",
    category: "production",
    categoryLabel: "Shipped to production",
    year: "2026",
    status: "Live demos shipped",
    oneLiner:
      "Brand analysis, AI-generated 3D hero animations, cinematic module library, Vercel deploy. Four steps, one command.",
    metrics: [
      { value: "4 steps", label: "Brand → analyze → generate → deploy" },
      { value: "3D", label: "AI-generated hero animations" },
      { value: "Vercel", label: "Deploy target" },
      { value: "~30 min", label: "Human time per site" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "A skill orchestrator (/cinematic-sites) transforms any prospect's website into a cinematic experience. Four phases: brand analysis (voice, palette, hero focal point) → AI-generated 3D hero animation (Nano Banana 2 for stills + Kling 3.0 for motion) → cinematic module assembly from a curated library (parallax, scroll-driven scenes, cinematic transitions) → Vercel deploy with a live URL handed off.",
      },
      {
        heading: "The visual layer",
        body:
          "Nano Banana 2 generates the 3D hero stills (multiple angles, multiple light setups). Kling 3.0 animates them into cinematic loops or parallax sequences. The module library handles scroll-driven scene transitions, camera moves, and reveal animations. Brand-derived palette and typography flow through every layer.",
      },
      {
        heading: "Why it matters",
        body:
          "Cold-outreach prospects need to see what's possible before they buy. A static deck pitches services. A cinematic site is the service. The pipeline turns one prospect URL into a deployed demo in 30 minutes — every prospect gets a custom-built, cinematic experience as a hand-raiser, not a generic template.",
      },
    ],
    stack: [
      "Claude Opus 4.7",
      "Nano Banana 2",
      "Kling 3.0",
      "Cinematic module library",
      "Vercel",
      "Next.js",
    ],
    builtOn:
      "Built on Claude Code. /cinematic-sites orchestrator chains brand analysis → 3D hero generation → cinematic modules → Vercel deploy.",
  },
  {
    slug: "skill-library",
    title: "Skill Library",
    subtitle: "60+ custom Claude Code skills running production work",
    org: "Copyweb · Personal infrastructure",
    category: "meta",
    categoryLabel: "Meta-tooling",
    year: "2025 — Present",
    status: "Used daily",
    oneLiner:
      "I don't just use AI. I build the skills that build the systems. The skills compound. So does the work.",
    metrics: [
      { value: "60+", label: "Custom skills authored" },
      { value: "9", label: "MCP servers wired" },
      { value: "3", label: "CLIs addressable" },
      { value: "1", label: "Operator running it all" },
    ],
    sections: [
      {
        heading: "The thesis",
        body:
          "Don't write a script when you can write the skill that writes the script. Don't write the skill when you can write the agent that picks the right skill. The leverage compounds.",
      },
      {
        heading: "What's in the library",
        body:
          "/lfsl orchestrates a full cold-outreach brand pack in 60 minutes. /creative-engine ships five direct-response ad concepts grounded in expert frameworks. /customer-research runs deep pre-writing research with Georgi's 22 questions and One Big Idea. /codex-loop runs adversarial planning against my own plans before I touch code. /stream-new, /stream-start, /stream-end run the work-stream system that replaced my todo list. /humanizer strips AI-writing signals. /fact-checker verifies claims. Plus 50+ more.",
      },
      {
        heading: "How they're built",
        body:
          "Progressive-disclosure pattern. Each skill has a small frontmatter, a body that only loads when called, and references to deeper resources fetched only when needed. Token-efficient by design. Versioned in the vault. Updated whenever the work corrects them.",
      },
      {
        heading: "Why it matters",
        body:
          "Most 'AI engineers' use Claude or ChatGPT as an assistant. The shift is using Claude Code as the build environment. The 60+ skills are how a one-person operation moves at the velocity of a team. They're also how new work onboards fast: new client, new campaign, new project, the skill stack already knows the patterns.",
      },
    ],
    stack: [
      "Claude Code",
      "Claude Agent SDK",
      "MCP servers",
      "Custom hooks",
      "settings.json automation",
      "Markdown vault",
    ],
    builtOn:
      "Built on Claude Code. The skills that build the skills.",
  },
  {
    slug: "ad-professor",
    title: "Ad Professor",
    subtitle: "Strategy-first AI ad generator + competitor reverse engineering",
    org: "Foxelli Group · Internal",
    category: "internal",
    categoryLabel: "Internal tool",
    year: "2026",
    status: "Shipped to production",
    oneLiner:
      "Most AI ad generators are slot machines. Mine is grounded in 99 advertising principles, cross-validated against Ogilvy.",
    metrics: [
      { value: "99", label: "Ad principles bound" },
      { value: "28", label: "n8n nodes" },
      { value: "4,450", label: "Lines of code" },
      { value: "$0.40", label: "Per full cycle" },
    ],
    sections: [
      {
        heading: "Strategy-first generation",
        body:
          "Every ad is grounded in a named advertising principle from a library of 99 (@The_AdProfessor) and cross-validated against David Ogilvy's 24 lessons + 38 rules. Claude Sonnet generates 3 concepts per batch, each with a different principle, clever idea, headline, image prompt, and complete Facebook ad copy.",
      },
      {
        heading: "Competitor reverse engineering",
        body:
          "Upload a winning competitor ad and the system explains why it works (Ogilvy analysis across 10 dimensions), extracts its exact spatial layout as a JSON spec, then rebuilds it for your brand while preserving the winning formula and swapping all content.",
      },
      {
        heading: "Layout zone system",
        body:
          "Solved the problem of image AIs ignoring spatial instructions. Each layout zone's position and size gets converted to natural language. Zones sorted top-to-bottom for natural reading order. Client-side canvas logo compositor for pixel-perfect brand placement.",
      },
    ],
    stack: ["React 18", "n8n Cloud", "Claude Sonnet", "Nano Banana 2", "Kling 3.0", "Sora 2 Pro", "Airtable", "Python"],
    builtOn:
      "Built on Claude Code. Custom Ogilvy-grounded scoring skills, n8n MCP for orchestration.",
  },
  {
    slug: "ai-agent-team",
    title: "Agent Quintet",
    subtitle: "Five autonomous agents running B2B operations on cron",
    org: "Copyweb · Internal operations",
    category: "production",
    categoryLabel: "In production",
    year: "2026",
    status: "Running daily",
    oneLiner:
      "I got tired of running my own ops manually. So I built five agents who run them for me. They don't get tired. They don't forget.",
    metrics: [
      { value: "5", label: "Specialized agents" },
      { value: "4", label: "Daily cron triggers" },
      { value: "3-layer", label: "Memory system" },
      { value: "Telegram", label: "Command center" },
    ],
    sections: [
      {
        heading: "Scout — recon specialist",
        body:
          "Daily B2B prospecting with weighted ICP scoring rubric (Team Size 25%, AI Readiness 25%, Budget 20%, DM Access 15%, Pain Signals 15%). Auto-enriches via Apollo.io + Hunter.io. Tracks pipeline across 11 stages with 14-day stale-lead auto-flagging.",
      },
      {
        heading: "Wordsmith — content engine",
        body:
          "Weekly LinkedIn/X content batches using Hook-Retain-Reward structure. Enforces 3:1 value ratio. Rotates content types. Monitors engagement signals and flags ICP decision-maker interactions.",
      },
      {
        heading: "Closer — sales operations",
        body:
          "Complete sales workflow from A-C-A outreach drafting through 3-touch follow-up sequences to proposal generation. Pre-call SPIN question briefs. Post-call proposals using client's own language from interviews.",
      },
      {
        heading: "Architect — client delivery",
        body:
          "6-phase delivery engine: pre-diagnostic research, interview prep, transcription processing, scorecard generation, blueprint presentation, evolution monitoring. Generates 90% complete first drafts of all client deliverables.",
      },
      {
        heading: "Command Center — orchestrator",
        body:
          "5:30 AM data sync, 7 AM morning brief, 12 PM midday pulse, 8 PM evening wrap, all via Telegram. Cross-agent coordination. Voice note routing with transcription. Auto-escalates overdue tasks.",
      },
    ],
    stack: ["Claude Code", "SKILL.md architecture", "Cron scheduling", "Telegram", "Apollo.io", "Hunter.io", "Supabase"],
    builtOn:
      "Built on Claude Code. All five agents are skill bundles running on cron with shared 3-layer memory.",
  },
  {
    slug: "creative-content-engine",
    title: "Forge",
    subtitle: "AI content factory: from product photo to scheduled post",
    org: "Open community template",
    category: "open-source",
    categoryLabel: "Open source",
    year: "2026",
    status: "Released as community template",
    oneLiner:
      "Open-sourced because the alternatives cost $200/month and produce slop. Mine produces work I'd actually post.",
    metrics: [
      { value: "3", label: "Core workflows" },
      { value: "6", label: "Python tools" },
      { value: "<$7", label: "Per 30-day campaign" },
      { value: "4", label: "Social platforms" },
    ],
    sections: [
      {
        heading: "ART framework architecture",
        body:
          ".agent/ folder with AGENT.md brain (404 lines), modular skills (Blotato scheduling, Modal deployment), and 3 declarative workflows: 30-Day Campaign, On-Demand Generation, and YouTube-to-LinkedIn automation.",
      },
      {
        heading: "Multi-provider abstraction",
        body:
          "Provider registry routes to Google AI Studio (free tier), Kie AI, or WaveSpeed based on model and availability. Image generation via Nano Banana 2, video via Veo 3.1 / Kling 3.0 / Sora 2 Pro. Automatic fallback when a provider goes down.",
      },
      {
        heading: "Serverless automation",
        body:
          "YouTube-to-LinkedIn pipeline runs daily on Modal.com (~$0.30/month). Monitors RSS feeds, extracts transcripts, generates branded infographics, writes captions in creator's voice, and posts automatically.",
      },
    ],
    stack: ["Python", "Claude Code", "Google AI Studio", "Kie AI", "WaveSpeed AI", "Gemini 2.0 Flash", "Airtable", "Blotato", "Modal.com"],
    builtOn:
      "Built on Claude Code. ART framework with declarative workflows, Modal.com for serverless cron.",
  },
  {
    slug: "copyweb-v2",
    title: "copyweb.io",
    subtitle: "Production marketing site, end-to-end self-built",
    org: "Copyweb",
    category: "production",
    categoryLabel: "Live in production",
    year: "2026",
    status: "Live at copyweb.io",
    oneLiner:
      "Most 'founder portfolios' are Squarespace. Mine is the same Next.js + Supabase + Vercel + Resend stack I'd build for a paying client.",
    metrics: [
      { value: "Next.js 15", label: "App Router" },
      { value: "Supabase", label: "Postgres + RLS" },
      { value: "Resend", label: "Transactional email" },
      { value: "Telegram", label: "Pipeline pings" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "Expert Council positioning. 3-step offer (Audit / Build / Train). Live application form at /apply that writes to Supabase, sends a Resend email to liam@copyweb.io, and pings me on Telegram in real time. Full v2 redesign on the v2-redesign branch.",
      },
      {
        heading: "Why it matters",
        body:
          "I should be able to dogfood my own offer. Every component, every migration, every API route shipped through Claude Code. The site is the credibility artifact.",
      },
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind v4", "Supabase", "Resend", "Telegram API", "Vercel"],
    builtOn:
      "Built on Claude Code. Every component, every migration, every API route shipped through the runtime.",
  },
  {
    slug: "mission-control",
    title: "Mission Control",
    subtitle: "Internal pipeline ops dashboard",
    org: "Copyweb · Internal",
    category: "internal",
    categoryLabel: "Internal tool",
    year: "2026",
    status: "Phase 4 complete, running daily",
    oneLiner:
      "Real-time view of every prospect, deliverable, and stage in my business. Telegram pings when something needs attention.",
    metrics: [
      { value: "11", label: "Pipeline stages tracked" },
      { value: "4", label: "Daily sync cron jobs" },
      { value: "Real-time", label: "Telegram alerts" },
      { value: "Phase 4", label: "Complete" },
    ],
    sections: [
      {
        heading: "What it does",
        body:
          "Pipeline view across 11 prospect stages. 14-day stale-lead auto-flagging. Pipeline-state Telegram pings. Cross-references Airtable + Supabase + n8n executions. Used as the single pane of glass for my outbound and delivery work.",
      },
      {
        heading: "Stack",
        body:
          "Standard Next.js + Supabase + n8n. Same materials I use for client builds. Predictable, supportable, fast.",
      },
    ],
    stack: ["Next.js", "Supabase", "n8n", "Telegram", "Apollo.io"],
    builtOn:
      "Built on Claude Code. Full-stack Next.js + Supabase ops dashboard, zero hand-rolled boilerplate.",
  },
  {
    slug: "copywriting-intelligence-layer",
    title: "The Canon",
    subtitle: "16 expert frameworks · ~280 evidence entries · weighted ranker",
    org: "Copyweb · Substrate",
    category: "meta",
    categoryLabel: "Meta-tooling",
    year: "2025 — Present",
    status: "Underlies every shipped copywriting deliverable",
    oneLiner:
      "The substrate under everything I ship. Schwartz on awareness. Halbert on directness. Wiebe on voice of customer. Hormozi on offer construction.",
    metrics: [
      { value: "16", label: "Expert frameworks" },
      { value: "~280", label: "Evidence entries" },
      { value: "10", label: "New JSONs added in 2026" },
      { value: "51", label: "Reference ads bound" },
    ],
    sections: [
      {
        heading: "What it is",
        body:
          "A research-grade knowledge substrate that powers every copywriting and creative skill across the stack. Each expert has a profile, a worked-examples library, and a weighted set of canonical principles. The ranker chooses the right voice for the angle, the awareness level, the audience, and the medium.",
      },
      {
        heading: "Why it exists",
        body:
          "Generic AI copy is generic because the model doesn't know whose voice it should be channeling. Give it an expert, give it evidence, give it a ranker. The output stops sounding like 'a model trying to write copy.' It starts sounding like a craftsman writing for a specific situation.",
      },
    ],
    stack: ["Claude Code", "Markdown vault", "Weighted ranker", "JSON evidence canon"],
    builtOn:
      "Built on Claude Code. Skill-driven canon ingestion, weighted ranker, ~280 evidence entries.",
  },
];

export const filterChips: { id: CaseStudy["category"] | "all"; label: string }[] = [
  { id: "all", label: "All systems" },
  { id: "production", label: "Production" },
  { id: "internal", label: "Internal tools" },
  { id: "open-source", label: "Open source" },
  { id: "meta", label: "Meta-tooling" },
];
