export type WfKind = "trigger" | "code" | "merge" | "gate" | "ai" | "sink";

export type WfNode = { label: string; sub?: string; kind?: WfKind };
export type WfStage = { nodes: WfNode[]; parallelLabel?: string };

export type Workflow = {
  id: string;
  index: string;
  title: string;
  department: string;
  purpose: string;
  systems: string[];
  /** verified live-execution stat, from a real run */
  stat: string;
  stages: WfStage[];
};

export const workflows: Workflow[] = [
  {
    id: "customer-research-engine",
    index: "W-01",
    title: "Customer Research Engine",
    department: "Research / Insights",
    purpose:
      "One brand in, nine real sources of customer voice out — Reddit, Amazon, FB Ads, YouTube, TikTok, Trustpilot, Instagram, web search and landing pages — normalized, threshold-gated, and provenance-stamped before a single word gets written.",
    systems: ["Apify (9 actors)", "Jina", "Supabase"],
    stat: "9/9 channels · 24 signals · gates PASS · 396ms",
    stages: [
      { nodes: [{ label: "Run", kind: "trigger" }] },
      { nodes: [{ label: "brand_facts", sub: "input contract", kind: "code" }] },
      {
        parallelLabel: "9 channels in parallel",
        nodes: [
          { label: "Reddit", sub: "harshmaur", kind: "code" },
          { label: "Amazon", sub: "web_wanderer", kind: "code" },
          { label: "FB Ads", sub: "curious_coder", kind: "code" },
          { label: "YouTube", sub: "streamers ×2", kind: "code" },
          { label: "TikTok", sub: "clockworks", kind: "code" },
          { label: "Trustpilot", sub: "memo23", kind: "code" },
          { label: "Instagram", sub: "apify", kind: "code" },
          { label: "Web Search", sub: "Jina · free", kind: "code" },
          { label: "Jina Reader", sub: "LP · free", kind: "code" },
        ],
      },
      { nodes: [{ label: "Merge", sub: "VOC corpus", kind: "merge" }] },
      { nodes: [{ label: "Signal density + fail-loud gates", kind: "gate" }] },
      { nodes: [{ label: "Provenance manifest", sub: "G-7", kind: "gate" }] },
      { nodes: [{ label: "Supabase", sub: "research_briefs", kind: "sink" }] },
    ],
  },
  {
    id: "deal-won-cascade",
    index: "W-02",
    title: "Deal Won → whole-company cascade",
    department: "Sales · Finance · Ops · Support · Marketing · Exec",
    purpose:
      "One 'closed won' event fans into six departments at once — CRM stage, Stripe invoice, Notion onboarding, support provisioning, Klaviyo nurture, and a leadership ping — with no human stitching the tools together.",
    systems: ["GoHighLevel", "Stripe", "Notion", "Intercom", "Klaviyo", "Slack"],
    stat: "6 departments · 6 systems · cascade complete · 246ms",
    stages: [
      { nodes: [{ label: "Deal Won", sub: "CRM webhook", kind: "trigger" }] },
      { nodes: [{ label: "Normalize deal", kind: "code" }] },
      {
        parallelLabel: "6 departments react",
        nodes: [
          { label: "Sales", sub: "GoHighLevel", kind: "code" },
          { label: "Finance", sub: "Stripe", kind: "code" },
          { label: "Ops", sub: "Notion", kind: "code" },
          { label: "Support", sub: "Intercom", kind: "code" },
          { label: "Marketing", sub: "Klaviyo", kind: "code" },
          { label: "Exec", sub: "Slack", kind: "code" },
        ],
      },
      { nodes: [{ label: "Merge", sub: "all departments", kind: "merge" }] },
      { nodes: [{ label: "Cascade summary", kind: "code" }] },
      { nodes: [{ label: "Leadership notified", sub: "Slack", kind: "sink" }] },
    ],
  },
  {
    id: "hr-onboarding-assistant",
    index: "W-03",
    title: "HR Onboarding Assistant",
    department: "HR / People",
    purpose:
      "A new hire asks a question in Slack; the bot retrieves from the employee handbook, answers only from what it found with citations, and hands off to a human the moment its confidence drops. It never guesses.",
    systems: ["Slack", "pgvector", "Claude"],
    stat: "retrieved 3 · confidence 0.91 · grounded + cited · 230ms",
    stages: [
      { nodes: [{ label: "New hire asks", sub: "Slack", kind: "trigger" }] },
      { nodes: [{ label: "Parse question", kind: "code" }] },
      { nodes: [{ label: "Retrieve", sub: "pgvector · handbook", kind: "ai" }] },
      { nodes: [{ label: "Confidence gate", sub: "score ≥ 0.78", kind: "gate" }] },
      {
        parallelLabel: "answer or escalate",
        nodes: [
          { label: "Answer · Claude", sub: "grounded + cited", kind: "ai" },
          { label: "Escalate to human", sub: "#people-team", kind: "sink" },
        ],
      },
      { nodes: [{ label: "Reply in Slack", sub: "in-thread", kind: "sink" }] },
    ],
  },
];
