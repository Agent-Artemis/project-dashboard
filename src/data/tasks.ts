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

  // TODAY (P0 Blockers)
  {
    id: "j-011",
    title: "Send Voice AI JSON config",
    assignee: "jeff",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "BLOCKS #3 priority project. Session cut off April 11 before you sent it.",
    details: [
      "Voice AI platform will live under AugeoAgency.com (name TBD)",
      "Send the JSON config to Artemis on Telegram",
      "Artemis starts the build immediately on receipt",
    ],
  },
  {
    id: "j-014",
    title: "Get Simpler Grants API key (10 min)",
    assignee: "jeff",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "BLOCKS #1 priority project (TheGrant.Ninja). Free API, takes 10 minutes to register.",
    details: [
      "Go to https://simpler.grants.gov/developer",
      "Click 'Get API Key' (free, no credit card)",
      "Copy API key and send to Artemis on Telegram",
      "Artemis will add it to Vercel env vars for grant-scout",
    ],
    links: [
      { label: "Simpler Grants API", url: "https://simpler.grants.gov/developer" },
    ],
  },
  {
    id: "j-015",
    title: "Get SAM.gov real API key (15 min)",
    assignee: "jeff",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "BLOCKS #1 priority project. Currently using DEMO_KEY which has rate limits.",
    details: [
      "Go to https://sam.gov/",
      "Create account or log in",
      "Navigate to API Access → Request API Key",
      "Send API key to Artemis on Telegram",
    ],
    links: [
      { label: "SAM.gov API", url: "https://sam.gov/" },
    ],
  },
  {
    id: "j-016",
    title: "Approve Grant Scout Stripe setup ($97/mo tier)",
    assignee: "jeff",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "BLOCKS revenue on #1 priority project. Ready to build, need green light.",
    details: [
      "$97/mo subscription via Stripe",
      "Unlocks state portals + saved searches",
      "Same payment flow as playbooks (working, tested)",
      "Reply 'approved' and Artemis builds it today",
    ],
  },

  // THIS WEEK (P1 items)
  {
    id: "j-017",
    title: "Update Dashboard live programs status",
    assignee: "artemis",
    board: "jeff",
    column: "this-week",
    status: "in-progress",
    priority: "high",
    description: "Dashboard Programs Status section needs real-time updates. Currently static JSON from April 10.",
    details: [
      "Wire to real data sources (Stripe API, trading API, GitHub commits)",
      "Or at minimum: update nightly via cron with yesterday's activity",
      "Jeff needs live visibility into what's shipping",
    ],
  },
  {
    id: "j-012",
    title: "Set up augeoagency.com DNS",
    assignee: "jeff",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "augeoagency.com is sitting unpointed for 8+ days. GoDaddy account — update nameservers to Vercel or add A record.",
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
  {
    id: "j-018",
    title: "Confirm first live trade executed Monday 4/13",
    assignee: "jeff",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Did you get the Telegram update Monday morning about the first live trade? Artemis needs to verify the cron worked.",
  },
  {
    id: "j-013",
    title: "Name the Voice AI product",
    assignee: "jeff",
    board: "jeff",
    column: "this-week",
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

  // GENERAL (P2 items)
  {
    id: "j-019",
    title: "Set up Zernio for social media management",
    assignee: "jeff",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "medium",
    description: "Social automation platform. 4+ days waiting. Nice-to-have for scaling content distribution.",
    links: [
      { label: "Zernio", url: "https://zernio.com/" },
    ],
  },
  {
    id: "j-009",
    title: "Post 2 LinkedIn drafts (ready now)",
    assignee: "jeff",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "medium",
    description: "Dennis drafted 2 LinkedIn posts in your voice. 11+ days waiting.",
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
    id: "j-007",
    title: "Provide Pixelmator logo exports",
    assignee: "jeff",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
    description: "Your Pixelmator exports look better than anything AI generates. Need logos for all 3 brand sites. 11+ days waiting.",
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

  // ═══════════════════════════════
  // AGENT BOARD
  // ═══════════════════════════════

  // TODAY
  {
    id: "a-025",
    title: "Update all stale dashboard data",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "Dashboard sync in progress. Updating tasks.ts, live-status.json, programs-status.json to reflect current reality (April 14).",
  },
  {
    id: "a-028",
    title: "Archive DONE tasks from dashboard",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "Remove completed tasks from active view. Jeff's screenshot showed multiple DONE tasks still visible.",
  },

  // THIS WEEK
  {
    id: "a-027",
    title: "Grant Scout Stripe $97/mo subscription",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Add paid tier to TheGrant.Ninja. $97/mo via Stripe. Unlocks state portals and saved searches. Waiting on Jeff approval.",
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
    id: "a-029",
    title: "TheRFP.Ninja search engine build",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "#2 priority project. Build RFP search using SAM.gov + USASpending + Federal Register APIs. Mirror Grant Scout architecture.",
  },
  {
    id: "a-006",
    title: "Build initial prospect list (billing companies)",
    assignee: "dennis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
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
