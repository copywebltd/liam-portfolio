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
    department: "For a research / marketing team",
    purpose:
      "Type in one brand, and it listens to what real customers are saying about it in nine different places — Reddit, Amazon reviews, TikTok, competitor Facebook ads, and more. Then it checks it gathered enough, and notes exactly where every quote came from, all before anyone writes a single word.",
    systems: ["Apify", "Jina", "Supabase"],
    stat: "9 sources · 24 customer findings · checks passed · 0.4s",
    stages: [
      { nodes: [{ label: "Start", kind: "trigger" }] },
      { nodes: [{ label: "The brand to research", sub: "your input", kind: "code" }] },
      {
        parallelLabel: "9 places, all at once",
        nodes: [
          { label: "Listen to Reddit", sub: "Reddit", kind: "code" },
          { label: "Read Amazon reviews", sub: "Amazon", kind: "code" },
          { label: "Pull competitor ads", sub: "Facebook", kind: "code" },
          { label: "Read YouTube comments", sub: "YouTube", kind: "code" },
          { label: "Read TikTok comments", sub: "TikTok", kind: "code" },
          { label: "Read Trustpilot reviews", sub: "Trustpilot", kind: "code" },
          { label: "Read Instagram", sub: "Instagram", kind: "code" },
          { label: "Search the web", sub: "web", kind: "code" },
          { label: "Read their website", sub: "website", kind: "code" },
        ],
      },
      { nodes: [{ label: "Combine everything", sub: "one list", kind: "merge" }] },
      { nodes: [{ label: "Check we found enough", kind: "gate" }] },
      { nodes: [{ label: "Note where each came from", kind: "gate" }] },
      { nodes: [{ label: "Save the research", sub: "database", kind: "sink" }] },
    ],
  },
  {
    id: "deal-won-cascade",
    index: "W-02",
    title: "When a sale closes, the whole company reacts",
    department: "For sales, finance, ops, support, marketing & leadership",
    purpose:
      "The moment a sale is marked “won,” six teams spring into action at the same time — the invoice goes out, onboarding tasks are created, the customer’s account is set up, welcome emails start, and leadership gets a heads-up — all without anyone lifting a finger.",
    systems: ["GoHighLevel", "Stripe", "Notion", "Intercom", "Klaviyo", "Slack"],
    stat: "6 teams · 6 tools · all done · 0.25s",
    stages: [
      { nodes: [{ label: "A deal is marked Won", sub: "the trigger", kind: "trigger" }] },
      { nodes: [{ label: "Read the deal details", kind: "code" }] },
      {
        parallelLabel: "6 teams react together",
        nodes: [
          { label: "Sales: mark it Won", sub: "GoHighLevel", kind: "code" },
          { label: "Finance: send the invoice", sub: "Stripe", kind: "code" },
          { label: "Ops: onboarding tasks", sub: "Notion", kind: "code" },
          { label: "Support: set up account", sub: "Intercom", kind: "code" },
          { label: "Marketing: welcome emails", sub: "Klaviyo", kind: "code" },
          { label: "Leadership: post the news", sub: "Slack", kind: "code" },
        ],
      },
      { nodes: [{ label: "Wait for all six", kind: "merge" }] },
      { nodes: [{ label: "Confirm it all ran", kind: "code" }] },
      { nodes: [{ label: "Done — team notified", sub: "Slack", kind: "sink" }] },
    ],
  },
  {
    id: "hr-onboarding-assistant",
    index: "W-03",
    title: "A help-desk bot for new hires",
    department: "For an HR / people team",
    purpose:
      "A new hire asks a question in Slack. The bot looks it up in the employee handbook, answers only from what it actually found (and links the page), and if it isn’t sure, it quietly hands the question to a real person. It never makes anything up.",
    systems: ["Slack", "Claude AI", "Handbook search"],
    stat: "answered from the handbook · 91% sure · with a source · 0.23s",
    stages: [
      { nodes: [{ label: "New hire asks a question", sub: "in Slack", kind: "trigger" }] },
      { nodes: [{ label: "Read the question", kind: "code" }] },
      { nodes: [{ label: "Search the handbook", sub: "find the answer", kind: "ai" }] },
      { nodes: [{ label: "Did we find a good answer?", kind: "gate" }] },
      {
        parallelLabel: "answer it, or ask a human",
        nodes: [
          { label: "Write the answer", sub: "from the handbook", kind: "ai" },
          { label: "Ask a human instead", sub: "the people team", kind: "sink" },
        ],
      },
      { nodes: [{ label: "Reply in Slack", sub: "with a link", kind: "sink" }] },
    ],
  },
];
