export type Board = "jeff" | "agent";
export type JeffColumn = "today" | "this-week" | "general";
export type AgentColumn = "today" | "this-week" | "next-week" | "30-days" | "future";
export type TaskStatus = "not-started" | "in-progress" | "done";
export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  board: Board;
  column: JeffColumn | AgentColumn;
  status: TaskStatus;
  priority: Priority;
  description?: string;
  details?: string[];
  links?: { label: string; url: string }[];
}

export const tasks: Task[] = [
  // ═══════════════════════════════
  // JEFF'S BOARD
  // ═══════════════════════════════

  // TODAY
  {
    id: "j-011",
    title: "Send Voice AI JSON config",
    assignee: "artemis",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "You were about to send this April 11 when the session cut off. This unblocks the #3 priority project.",
    details: [
      "Voice AI platform will live under AugeoAgency.com (name TBD)",
      "Send the JSON config to Artemis on Telegram",
      "Artemis starts the build immediately on receipt",
    ],
  },
  {
    id: "j-001",
    title: "Refresh Facebook Page Access Token",
    assignee: "artemis",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Token expired April 1. Artemis can't post to Augeo Agency page until this is refreshed.",
    details: [
      "Go to Graph API Explorer (link below)",
      "Select app: Augeo Agency (ID: 1674993343520476)",
      "Click 'Get Token' → 'Get Page Access Token'",
      "Select Augeo Agency page",
      "Copy token and send to Artemis on Telegram",
    ],
    links: [
      { label: "Graph API Explorer", url: "https://developers.facebook.com/tools/explorer/" },
      { label: "Augeo Agency FB Page", url: "https://www.facebook.com/profile.php?id=103923762424965" },
    ],
  },
  {
    id: "j-002",
    title: "Review Voice AI platform framework",
    assignee: "benny",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Benny built the full framework: 3 use cases (CCM outreach, pre-auth, AR), cost model, go-to-market. Green light or changes?",
    details: [
      "Retell AI integration, HIPAA compliant, SOC 2",
      "$0.70/call cost vs $3.00 revenue = 69% margins at scale",
      "Three revenue models: per-claim ($3-5), tiered sub ($1,500-$8,000/mo), hybrid",
      "Go-to-market: billing companies first, then clinics",
      "Tell Artemis: green light / changes needed / park it",
    ],
    links: [
      { label: "Retell AI (HIPAA/SOC2)", url: "https://www.retellai.com/" },
    ],
  },

  // THIS WEEK
  {
    id: "j-009",
    title: "Post 2 LinkedIn drafts (ready now)",
    assignee: "dennis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Dennis drafted 2 LinkedIn posts in your voice. Your network is where the buyers are — every day these sit is a missed touch.",
    details: [
      "Post 1 (Healthcare): CCM revenue most practices miss. Drives to calculator.",
      "Post 2 (AI): 'I hired an AI as an employee.' Drives to playbook.",
      "Use 'link in comments' pattern — post text first, drop link as first comment. Beats algorithm.",
      "Ask Artemis to send both drafts here to copy-paste.",
    ],
    links: [
      { label: "LinkedIn (post here)", url: "https://www.linkedin.com/feed/" },
      { label: "Calculator (CTA)", url: "https://calculator.augeohealth.com" },
      { label: "AI Playbook (CTA)", url: "https://playbook.agentartemis.ai" },
    ],
  },
  {
    id: "j-004",
    title: "SAM.gov registration (Augeo LLC)",
    assignee: "evelyn",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Required to apply for federal grants. Every day we wait = missed opportunities. SBIR/STTR just reauthorized — $6B about to flow.",
    details: [
      "Go to SAM.gov, click 'Get Started'",
      "Need: Augeo LLC EIN, DUNS/UEI number, bank account info",
      "If no UEI yet, request one at SAM.gov (takes ~2 days)",
      "Complete Entity Registration for Augeo LLC",
    ],
    links: [
      { label: "SAM.gov Registration", url: "https://sam.gov/content/entity-registration" },
      { label: "SBIR/STTR Portal", url: "https://www.sbir.gov/" },
    ],
  },
  {
    id: "j-012",
    title: "Set up augeoagency.com DNS",
    assignee: "artemis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "augeoagency.com is sitting unpointed. GoDaddy account — update nameservers to Vercel or add A record.",
    details: [
      "Log into GoDaddy (credentials in TOOLS.md)",
      "Go to DNS for augeoagency.com",
      "Either: change nameservers to Vercel's, OR add A record pointing to 76.76.21.21",
      "Send Artemis a confirmation once done",
    ],
    links: [
      { label: "GoDaddy DNS", url: "https://dcc.godaddy.com/manage/dns" },
    ],
  },

  // GENERAL
  {
    id: "j-007",
    title: "Provide Pixelmator logo exports",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "medium",
    description: "Your Pixelmator exports look better than anything AI generates. Need logos for all 3 brand sites.",
    details: [
      "Needed: Augeo Health, Artemis, Augeo Agency logos",
      "Export as PNG, transparent background, at least 512x512",
      "Send to Artemis on Telegram or drop in workspace",
    ],
    links: [
      { label: "agentartemis.ai", url: "https://agentartemis.ai" },
      { label: "augeohealth.com", url: "https://augeohealth.com" },
    ],
  },
  {
    id: "j-013",
    title: "Name the Voice AI product",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
    description: "Voice AI platform lives under AugeoAgency.com. Needs a product name before launch.",
    details: [
      "Jeff said 'we will figure out a name'",
      "Think: what would a billing company trust? What sounds clinical but modern?",
      "Options: Augeo Voice, ClearCall, AuthFlow, PulseAI — or something else entirely",
      "Not urgent, but needed before any marketing copy",
    ],
  },

  // ═══════════════════════════════
  // AGENT BOARD
  // ═══════════════════════════════

  // TODAY
  {
    id: "a-024",
    title: "Live trading Day 1 — monitor 9:45 AM ET",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Monday April 13 is Day 1 of live trading on Alpaca ($300 account). First real trade at 9:45 AM ET. Send Jeff a Telegram update the moment it executes.",
  },
  {
    id: "a-025",
    title: "Update all stale dashboard data",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "projects.ts, agents.ts, tasks.ts — all updated as of April 12. Dashboard reflects current reality.",
  },

  // THIS WEEK
  {
    id: "a-006",
    title: "Build initial prospect list (billing companies)",
    assignee: "dennis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Target medical billing companies for Voice AI pilot. 20-30 qualified prospects with contact info.",
  },
  {
    id: "a-005",
    title: "Beehiiv newsletter draft — healthcare audience",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "First newsletter issue for healthcare audience. Focus: AI in CCM/RPM operations.",
  },
  {
    id: "a-026",
    title: "Voice AI build (pending Jeff's JSON)",
    assignee: "benny",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Blocked on Jeff sending Voice AI JSON config. Once received, Benny starts Retell AI integration for 3 use cases.",
  },
  {
    id: "a-027",
    title: "Grant Scout Stripe $97/mo subscription",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Add paid tier to TheGrant.Ninja. $97/mo via Stripe. Unlocks state portals and saved searches.",
  },

  // NEXT WEEK
  {
    id: "a-008",
    title: "Voice AI MVP architecture",
    assignee: "benny",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "high",
    description: "Technical architecture based on approved framework. Retell AI + webhook flows.",
  },
  {
    id: "a-009",
    title: "Week 2 content calendar",
    assignee: "charlie",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-010",
    title: "Cold outreach sequence draft",
    assignee: "dennis",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "high",
    description: "Email sequences for billing company outreach. 5-touch sequence, value-first.",
  },

  // 30 DAYS
  {
    id: "a-012",
    title: "Voice AI pilot with first billing company",
    assignee: "benny",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "high",
  },
  {
    id: "a-013",
    title: "5 qualified leads in pipeline",
    assignee: "dennis",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "high",
  },
  {
    id: "a-014",
    title: "100+ X followers milestone",
    assignee: "charlie",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "medium",
  },

  // FUTURE / IDEAS
  {
    id: "a-017",
    title: "Trading experiment book (after 60 days)",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
    description: "Two books: Phase 1 (autonomous AI, $29) + Phase 2 (human-in-the-loop, $29). Bundle at $49.",
  },
  {
    id: "a-018",
    title: "YouTube channel launch",
    assignee: "charlie",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
    description: "Napoleon Hill content strategy. Two channels: general + women's.",
  },
  {
    id: "a-019",
    title: "Guided journaling app",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
  },
  {
    id: "a-020",
    title: "Pre-auth Level II AI caller",
    assignee: "benny",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-021",
    title: "Medical billing AI caller",
    assignee: "benny",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
  },
];

export const jeffColumns: { key: JeffColumn; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "this-week", label: "This Week" },
  { key: "general", label: "General" },
];

export const agentColumns: { key: AgentColumn; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "this-week", label: "This Week" },
  { key: "next-week", label: "Next Week" },
  { key: "30-days", label: "30 Days" },
  { key: "future", label: "Future / Ideas" },
];
