export type WfKind = "trigger" | "code" | "merge" | "gate" | "ai" | "sink";

export type WfNode = { label: string; sub?: string; kind?: WfKind };
export type WfStage = { nodes: WfNode[]; parallelLabel?: string };

export type WfCategory =
  | "sales"
  | "support"
  | "research"
  | "hr"
  | "ops"
  | "finance"
  | "marketing";

export type Workflow = {
  id: string;
  index: string;
  category: WfCategory;
  categoryLabel: string;
  /** the painful, boring problem in the business's own words — the hook */
  problem: string;
  /** the named outcome */
  title: string;
  /** plain-English description of what it does */
  purpose: string;
  /** popular, recognizable tools it connects */
  systems: string[];
  /** verified live-execution stat, from a real run */
  stat: string;
  stages: WfStage[];
};

export const categoryOrder: { id: WfCategory; label: string }[] = [
  { id: "sales", label: "Sales" },
  { id: "support", label: "Support" },
  { id: "research", label: "Research" },
  { id: "hr", label: "HR" },
  { id: "ops", label: "Operations" },
  { id: "finance", label: "Finance" },
  { id: "marketing", label: "Marketing" },
];

export const workflows: Workflow[] = [
  {
    id: "instant-lead-response",
    index: "W-01",
    category: "sales",
    categoryLabel: "Sales",
    problem:
      "Leads sit for hours before anyone replies — and the hot ones go cold.",
    title: "Every lead answered in seconds",
    purpose:
      "A lead fills in the website form. In one second, AI reads it, decides how hot it is, and either texts them back instantly or starts a nurture email — then saves them to the CRM and pings the sales team. No lead ever waits.",
    systems: ["WordPress", "OpenAI", "WhatsApp", "Mailchimp", "HubSpot", "Slack"],
    stat: "hot lead · replied in seconds · saved · 0.25s",
    stages: [
      { nodes: [{ label: "New website lead", sub: "WordPress", kind: "trigger" }] },
      { nodes: [{ label: "Read the lead", kind: "code" }] },
      { nodes: [{ label: "Score & qualify", sub: "AI", kind: "ai" }] },
      { nodes: [{ label: "Is it a hot lead?", kind: "gate" }] },
      {
        parallelLabel: "reply now, or nurture",
        nodes: [
          { label: "Text back in seconds", sub: "WhatsApp", kind: "code" },
          { label: "Add to email nurture", sub: "Mailchimp", kind: "code" },
        ],
      },
      { nodes: [{ label: "Save to the CRM", sub: "HubSpot", kind: "merge" }] },
      { nodes: [{ label: "Tell the sales team", sub: "Slack", kind: "sink" }] },
    ],
  },
  {
    id: "support-triage",
    index: "W-02",
    category: "support",
    categoryLabel: "Support",
    problem:
      "The support inbox overflows with the same questions, and replies are slow.",
    title: "An AI front desk for support",
    purpose:
      "Every incoming message gets sorted by topic and urgency, then AI drafts a reply using only your help-centre articles. If it's confident and simple, it sends and closes the ticket. If not, it hands the draft to a human to approve first — so nothing risky goes out alone.",
    systems: ["Gmail", "Zendesk", "Claude", "Slack"],
    stat: "auto-resolved · 2 sources cited · 0.21s",
    stages: [
      { nodes: [{ label: "New support message", sub: "Gmail", kind: "trigger" }] },
      { nodes: [{ label: "Read the message", kind: "code" }] },
      { nodes: [{ label: "Sort it + flag urgency", sub: "AI", kind: "ai" }] },
      { nodes: [{ label: "Draft a grounded reply", sub: "AI", kind: "ai" }] },
      { nodes: [{ label: "Safe to auto-send?", kind: "gate" }] },
      {
        parallelLabel: "send, or get approval",
        nodes: [
          { label: "Send the reply", sub: "Zendesk", kind: "code" },
          { label: "Agent approves first", sub: "Slack", kind: "sink" },
        ],
      },
      { nodes: [{ label: "Tag + close", sub: "Zendesk", kind: "sink" }] },
    ],
  },
  {
    id: "community-moderation",
    index: "W-03",
    category: "support",
    categoryLabel: "Support",
    problem:
      "Your community needs watching around the clock for spam and rule-breakers.",
    title: "A moderator that never sleeps",
    purpose:
      "Every new post is checked against your community rules. Clean posts pass instantly; anything borderline — spam, self-promo, abuse — gets sent to a human with the reason attached. The bot flags, it never bans on its own, and every decision is logged.",
    systems: ["Facebook Groups", "OpenAI", "Slack", "Google Sheets"],
    stat: "flagged · sent to a human · logged · 0.24s",
    stages: [
      { nodes: [{ label: "New community post", sub: "Facebook", kind: "trigger" }] },
      { nodes: [{ label: "Read the post", kind: "code" }] },
      { nodes: [{ label: "Check against the rules", sub: "AI", kind: "ai" }] },
      { nodes: [{ label: "Is it clearly fine?", kind: "gate" }] },
      {
        parallelLabel: "approve, or ask a human",
        nodes: [
          { label: "Approve automatically", kind: "code" },
          { label: "Send to a moderator", sub: "Slack", kind: "sink" },
        ],
      },
      { nodes: [{ label: "Log the decision", sub: "Sheets", kind: "sink" }] },
    ],
  },
  {
    id: "customer-research-engine",
    index: "W-04",
    category: "research",
    categoryLabel: "Research",
    problem:
      "Teams write copy and make decisions on gut feel instead of what customers actually say.",
    title: "Customer research, in under a second",
    purpose:
      "Type in one brand, and it listens to what real customers are saying about it in nine different places — Reddit, Amazon reviews, TikTok, competitor Facebook ads, and more. Then it checks it gathered enough, and notes exactly where every quote came from, all before anyone writes a single word.",
    systems: ["Apify", "Jina", "Supabase"],
    stat: "9 sources · 24 findings · checks passed · 0.4s",
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
    index: "W-05",
    category: "ops",
    categoryLabel: "Operations",
    problem: "A sale closes and six teams scramble to do their bit by hand.",
    title: "When a sale closes, the whole company reacts",
    purpose:
      "The moment a sale is marked “won,” six teams spring into action at the same time — the invoice goes out, onboarding tasks are created, the customer's account is set up, welcome emails start, and leadership gets a heads-up — all without anyone lifting a finger.",
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
    index: "W-06",
    category: "hr",
    categoryLabel: "HR",
    problem:
      "New hires flood HR with questions already answered in the handbook.",
    title: "A help-desk bot for new hires",
    purpose:
      "A new hire asks a question in Slack. The bot looks it up in the employee handbook, answers only from what it actually found (and links the page), and if it isn't sure, it quietly hands the question to a real person. It never makes anything up.",
    systems: ["Slack", "Claude", "Handbook search"],
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
  {
    id: "overdue-invoice-chaser",
    index: "W-07",
    category: "finance",
    categoryLabel: "Finance",
    problem: "Someone chases unpaid invoices by hand every single week.",
    title: "Invoices that chase themselves",
    purpose:
      "Every morning it pulls your overdue invoices, picks the right tone for each based on how late it is — a gentle nudge, a firm reminder, or a final notice — sends them all, and flags the worst offenders to a human. The money gets chased while you sleep.",
    systems: ["Stripe", "QuickBooks", "Gmail", "Slack", "Google Sheets"],
    stat: "3 invoices · 3 reminders · 1 escalated · 0.2s",
    stages: [
      { nodes: [{ label: "Run every morning", sub: "scheduler", kind: "trigger" }] },
      { nodes: [{ label: "Find unpaid invoices", sub: "Stripe", kind: "code" }] },
      { nodes: [{ label: "Pick the right reminder", sub: "by age", kind: "code" }] },
      { nodes: [{ label: "Send the reminders", sub: "Gmail", kind: "code" }] },
      { nodes: [{ label: "Flag the worst for a human", sub: "Slack", kind: "code" }] },
      { nodes: [{ label: "Log what went out", sub: "Sheets", kind: "sink" }] },
    ],
  },
  {
    id: "receipts-to-books",
    index: "W-08",
    category: "finance",
    categoryLabel: "Finance",
    problem: "Receipts pile up and get typed into the books one by one.",
    title: "Receipts that file themselves",
    purpose:
      "A receipt lands in the inbox. AI reads the photo or PDF — vendor, amount, category — checks it isn't a duplicate and fits policy, then posts it straight to the books. Anything odd gets flagged to a human. The shoebox of receipts disappears.",
    systems: ["Gmail", "OpenAI", "QuickBooks", "Google Sheets", "Slack"],
    stat: "receipt read · booked to Travel · 0.2s",
    stages: [
      { nodes: [{ label: "New receipt email", sub: "Gmail", kind: "trigger" }] },
      { nodes: [{ label: "Read the receipt", sub: "OCR / AI", kind: "ai" }] },
      { nodes: [{ label: "Check duplicates + policy", kind: "code" }] },
      { nodes: [{ label: "Looks clean?", kind: "gate" }] },
      {
        parallelLabel: "book it, or flag it",
        nodes: [
          { label: "Add to the books", sub: "QuickBooks", kind: "code" },
          { label: "Flag for review", sub: "Slack", kind: "sink" },
        ],
      },
      { nodes: [{ label: "Log it", sub: "Sheets", kind: "sink" }] },
    ],
  },
  {
    id: "meeting-notes-to-tasks",
    index: "W-09",
    category: "ops",
    categoryLabel: "Operations",
    problem: "Meeting decisions get made, then never turn into tracked tasks.",
    title: "Meetings that turn into action",
    purpose:
      "When a meeting ends, AI reads the transcript, pulls out every action item with its owner and due date, creates the tasks, messages each person their part, and posts a clean recap. Nothing said in the room gets forgotten.",
    systems: ["Zoom", "Claude", "Asana", "Slack"],
    stat: "3 action items · assigned + scheduled · 0.2s",
    stages: [
      { nodes: [{ label: "A meeting ends", sub: "Zoom", kind: "trigger" }] },
      { nodes: [{ label: "Read the transcript", kind: "code" }] },
      { nodes: [{ label: "Pull out the action items", sub: "AI", kind: "ai" }] },
      { nodes: [{ label: "Create the tasks", sub: "Asana", kind: "code" }] },
      { nodes: [{ label: "Tell each owner", sub: "Slack", kind: "code" }] },
      { nodes: [{ label: "Post a recap", sub: "Slack", kind: "sink" }] },
    ],
  },
  {
    id: "content-repurposing",
    index: "W-10",
    category: "marketing",
    categoryLabel: "Marketing",
    problem: "One blog post should become ten pieces of content, but never does.",
    title: "One post becomes ten",
    purpose:
      "Publish a blog post and it instantly becomes a LinkedIn post, an X thread, a newsletter blurb, an Instagram caption and a short-video script — all in your brand voice — then gets scheduled and saved to your content calendar. One piece of work, a week of content.",
    systems: ["WordPress", "OpenAI", "Buffer", "Notion"],
    stat: "1 post → 5 formats · scheduled · 0.3s",
    stages: [
      { nodes: [{ label: "New blog post published", sub: "WordPress", kind: "trigger" }] },
      { nodes: [{ label: "Read the post", kind: "code" }] },
      {
        parallelLabel: "5 formats at once",
        nodes: [
          { label: "LinkedIn post", sub: "AI", kind: "ai" },
          { label: "X thread", sub: "AI", kind: "ai" },
          { label: "Newsletter blurb", sub: "AI", kind: "ai" },
          { label: "Instagram caption", sub: "AI", kind: "ai" },
          { label: "Short-video script", sub: "AI", kind: "ai" },
        ],
      },
      { nodes: [{ label: "Collect all five", kind: "merge" }] },
      { nodes: [{ label: "Schedule them all", sub: "Buffer", kind: "code" }] },
      { nodes: [{ label: "Save the drafts", sub: "Notion", kind: "sink" }] },
    ],
  },
];
