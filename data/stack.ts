export type StackTab = {
  id: string;
  label: string;
  groups: { heading: string; items: string[] }[];
  note?: string;
};

export const stackTabs: StackTab[] = [
  {
    id: "build",
    label: "Build environment",
    note:
      "The runtime, the surfaces, and what's wired in. Most portfolios list AI alongside React. Mine doesn't. AI is the layer everything runs through.",
    groups: [
      {
        heading: "Runtime",
        items: [
          "Claude Code (primary)",
          "Claude Agent SDK",
          "60+ custom skills authored",
          "Custom hooks + settings.json automation",
        ],
      },
      {
        heading: "Surfaces",
        items: ["VS Code (daily driver)", "Google Antigravity", "Terminal CLI"],
      },
      {
        heading: "MCP servers wired",
        items: [
          "Supabase",
          "n8n",
          "Notion",
          "GitHub",
          "Firecrawl",
          "Figma",
          "Stitch",
        ],
      },
      {
        heading: "CLIs addressable",
        items: ["Codex", "Gemini", "NotebookLM"],
      },
    ],
  },
  {
    id: "models",
    label: "Models I reach for",
    note:
      "Use-case aware, not vendor-loyal. The model that ships the work today is rarely the one I reach for next quarter.",
    groups: [
      {
        heading: "Coding & orchestration",
        items: [
          "Claude Opus 4.7 — primary, the model I trust to ship",
          "Codex / GPT-5.5 — heavy refactors, OpenAI agentic loops",
        ],
      },
      {
        heading: "Frontend design",
        items: [
          "Gemini 3.1 Pro — currently benchmark-leading at UI work",
        ],
      },
      {
        heading: "Other",
        items: [
          "Claude Sonnet 4.6 — fast iteration",
          "Claude Haiku 4.5 — high-volume routing",
          "Gemini 2.0 Flash — image generation backbone",
        ],
      },
    ],
  },
  {
    id: "media",
    label: "AI image & video",
    note:
      "Treating model selection as engineering. All routed through Kie.ai at ~60% under retail provider pricing.",
    groups: [
      {
        heading: "Image",
        items: [
          "GPT Image 2 (default)",
          "Nano Banana 2 (fallback)",
          "Stable Diffusion + ComfyUI (fine control)",
        ],
      },
      {
        heading: "Video",
        items: [
          "Kling 3.0",
          "Seedance 2 / Seedance 2 Fast",
          "VEO 3.1 (legacy option)",
          "Sora 2 Pro",
        ],
      },
      {
        heading: "Voice & audio",
        items: ["ElevenLabs (cloning + voiceover)", "Groq Whisper (transcription)"],
      },
      {
        heading: "Discipline",
        items: [
          "Brand-fit ranker scores output before delivery",
          "Claim-types controlled vocabulary",
          "Pixel-perfect logo compositing",
          "Provider registry with automatic fallback",
        ],
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    groups: [
      {
        heading: "Frameworks",
        items: ["React 18 / 19", "Next.js 15", "TypeScript"],
      },
      {
        heading: "Styling",
        items: ["Tailwind CSS v4", "shadcn/ui", "Radix UI primitives"],
      },
      {
        heading: "Motion & state",
        items: ["Framer Motion", "GSAP ScrollTrigger", "TanStack Query"],
      },
      {
        heading: "Routing",
        items: ["App Router", "Wouter (lightweight projects)"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    groups: [
      {
        heading: "Server",
        items: ["Express 5", "Node.js (ESM)", "Next.js Route Handlers"],
      },
      {
        heading: "Data",
        items: [
          "Supabase (PostgreSQL + RLS) — primary",
          "Drizzle ORM",
          "Airtable (legacy projects)",
        ],
      },
      {
        heading: "Orchestration",
        items: ["n8n Cloud", "n8n self-hosted (Hetzner)", "Modal.com (serverless cron)"],
      },
      {
        heading: "Auth",
        items: ["Clerk", "Role-based routing", "Allowlisted endpoints"],
      },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    groups: [
      {
        heading: "Hosting",
        items: ["Vercel", "Replit", "Hetzner ($2.43/mo n8n self-host)"],
      },
      {
        heading: "Notifications & comms",
        items: ["Telegram Bot API", "Resend (transactional)", "Dropbox API"],
      },
      {
        heading: "Enrichment & data",
        items: ["Apollo.io", "Hunter.io", "Pinecone", "Kie.ai (cost layer)"],
      },
    ],
  },
];
