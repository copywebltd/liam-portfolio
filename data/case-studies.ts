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
    slug: "copyads",
    title: "CopyAds",
    subtitle: "A Meta Ads AIOS that reads your account and builds the next ads",
    org: "Copyweb · Meta Ads operating system · per-brand install",
    category: "production",
    categoryLabel: "Shipped to production",
    year: "2026",
    status: "Client-installable, in production",
    oneLiner:
      "A custom dashboard wired into a brand's Meta Ads account through the API. Every morning it reads the whole account and writes the team a brief: what to scale, what to kill, and the next ads already built and paused.",
    metrics: [
      { value: "Daily", label: "Account read → brief" },
      { value: "5", label: "Expert angles per winner" },
      { value: "17", label: "Council scorers" },
      { value: "Paused", label: "Every launch, until you approve" },
    ],
    sections: [
      {
        heading: "The problem",
        body:
          "Media buyers drown in dashboards. Meta's native UI tells you what happened, not what to do next. The work that actually moves the account — reading yesterday, deciding the next move, building the creative to test it — still lands on the team every single morning. That's the bottleneck, and it doesn't scale.",
      },
      {
        heading: "The build",
        body:
          "A custom dashboard installed per brand, wired straight into the Meta Ads account through the Marketing API. It auto-detects each account's real conversion event (purchase, lead, subscribe — never hard-coded), so the numbers are right on day one. Every morning it reads spend, creatives, fatigue, and frequency, then writes a plain-English brief: scale the winner, kill the one that's burning, and here are fresh angles already built and paused.",
      },
      {
        heading: "The Studio",
        body:
          "Take a winning ad. One click, and the Studio builds five new angles, each carrying a different expert framework: comparison, problem-aware, offer math, authority, stat-led. Every angle is scored by a 17-expert council grounded in direct-response canon. The real product is never redrawn — every image is composed around the brand's actual SKU, accurate to the pixel.",
      },
      {
        heading: "Accuracy and safety gates",
        body:
          "Every claim is pulled from a certified list before it can ship. A vision gate reads the generated image itself, not just the text fields, so baked-in claims like '#1' or 'clinically proven' get caught in the pixels before anything launches. And every ad leaves the system paused. Nothing spends until the team approves it. The human stays the one who launches.",
      },
      {
        heading: "Why it matters",
        body:
          "Andromeda-era Meta rewards on-brand, clear-angle creative at volume. The teams that win are the ones who can read the account, build the next test, and score it before lunch — without shipping slop into the auction. CopyAds gives a team that loop every morning and keeps a human on the trigger.",
      },
    ],
    stack: [
      "Claude Opus 4.7",
      "Meta Marketing API",
      "GPT Image 2",
      "Nano Banana 2",
      "17-expert council",
      "Next.js",
      "Supabase",
      "Kie.ai (routing)",
      "Vercel",
    ],
    builtOn:
      "Built on Claude Code. Per-brand install reads the account daily, routes winners through the council, and writes every new ad paused for human approval.",
    videoId: "aBdk6GShv2M",
    videoCaption: "Full walkthrough — it reads, it builds, it scores. 1:13.",
  },
  {
    slug: "copysite",
    title: "CopySite",
    subtitle: "A Landing Page AIOS: a brand URL in, a deployed page out",
    org: "Copyweb · Landing Page operating system",
    category: "production",
    categoryLabel: "Shipped to production",
    year: "2026",
    status: "Live at copyweb.io",
    oneLiner:
      "Point it at a brand and it ships a production landing page: research, copy, design, deploy. copyweb.io is one it built end to end.",
    metrics: [
      { value: "URL → page", label: "Brand in, deployed page out" },
      { value: "16", label: "Expert frameworks bound" },
      { value: "99.9%", label: "Claim accuracy by design" },
      { value: "Vercel", label: "Deploy target" },
    ],
    sections: [
      {
        heading: "The problem",
        body:
          "The landing page is where DTC spend converts or dies, and it usually takes weeks of back-and-forth between a copywriter, a designer, and a developer. Most AI site builders skip that and hand you a generic template that reads like every other SaaS page. Slop on the page is slop in the funnel, and the algorithm makes you pay for it.",
      },
      {
        heading: "The build",
        body:
          "CopySite takes a brand and ships a full production landing page end to end. It researches the brand and its customer, writes the copy routed through the expert canon, designs every section, and deploys to a live URL. Each section earns its place: the problem in the customer's own words, the mechanism, proof from real results, the offer, objections handled, and a close. Not a template with the logo swapped. A page built for that one brand.",
      },
      {
        heading: "Built on the accuracy moat",
        body:
          "Every claim on the page traces back to source. Real brand assets, never AI-invented product shots. The same source-of-truth, verification-agent, human-gate chain that runs across every Copyweb system. 99.9% accuracy by design, because a landing page that overpromises is a refund and a chargeback waiting to happen.",
      },
      {
        heading: "The proof is this page",
        body:
          "copyweb.io is a CopySite build, shown end to end in the walkthrough above. A premium animated hero, scroll-driven sections, a 5-layer architecture explainer, real client results, founders in the open, and a close that tells you exactly where to start. Built on Next.js, deployed on Vercel.",
      },
      {
        heading: "Why it matters",
        body:
          "The landing page is the highest-leverage surface in a funnel. CopySite produces one that reads like a craftsman wrote it, at the speed and cost of a template, with every claim provable. That is the whole Copyweb thesis on a single page.",
      },
    ],
    stack: [
      "Claude Opus 4.7",
      "Next.js",
      "Lenis",
      "Motion",
      "Tailwind",
      "16 expert canon",
      "Supabase",
      "Resend",
      "Vercel",
    ],
    builtOn:
      "Built on Claude Code. Brand research → expert-routed copy → section design → Vercel deploy, one pipeline.",
    videoId: "XqS_8s3yHtk",
    videoCaption: "A CopySite build, start to finish: copyweb.io. 1:01.",
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
    slug: "autonomous-ops",
    title: "Autonomous Ops",
    subtitle: "A pipeline dashboard plus five agents that run the business on cron",
    org: "Copyweb · Internal operations",
    category: "internal",
    categoryLabel: "Internal ops",
    year: "2026",
    status: "Running daily",
    oneLiner:
      "I got tired of running my own ops by hand, so I built the system that runs them. A real-time pipeline dashboard, and five specialized agents that prospect, write, sell, deliver, and brief me on cron.",
    metrics: [
      { value: "5", label: "Specialized agents" },
      { value: "11", label: "Pipeline stages tracked" },
      { value: "4", label: "Daily cron triggers" },
      { value: "Telegram", label: "Command center" },
    ],
    sections: [
      {
        heading: "Mission Control — the dashboard",
        body:
          "A real-time view of every prospect, deliverable, and stage in the business. Pipeline across 11 stages, 14-day stale-lead auto-flagging, and Telegram pings when something needs attention. It cross-references Airtable, Supabase, and n8n executions into a single pane of glass. Standard Next.js + Supabase + n8n, the same materials I use for client builds.",
      },
      {
        heading: "The Agent Quintet — the workforce",
        body:
          "Five agents run on cron with a shared 3-layer memory. Scout prospects daily against a weighted ICP rubric and enriches via Apollo and Hunter. Wordsmith batches LinkedIn and X content on a 3:1 value ratio. Closer drafts outreach, follow-ups, and proposals in the client's own language. Architect runs a 6-phase delivery engine and produces 90% complete first drafts. Command Center syncs at 5:30 AM, briefs at 7, pulses at noon, and wraps at 8, all over Telegram.",
      },
      {
        heading: "Why it matters",
        body:
          "A one-person operation moves at the velocity of a team only if the boring, repeatable work runs itself. The dashboard tells me what needs attention; the agents handle what doesn't. They don't get tired and they don't forget.",
      },
    ],
    stack: ["Claude Code", "SKILL.md architecture", "Cron scheduling", "Next.js", "Supabase", "n8n", "Telegram", "Apollo.io", "Hunter.io"],
    builtOn:
      "Built on Claude Code. A Next.js + Supabase ops dashboard plus five skill-bundle agents on cron with shared 3-layer memory.",
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
