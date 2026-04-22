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

  // TODAY — No critical P0 blockers

  // THIS WEEK
  {
    id: "j-012",
    title: "Set up augeoagency.com DNS (9+ days waiting)",
    assignee: "jeff",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "BLOCKING. augeoagency.com site built but DNS unpointed for 9 days. GoDaddy account needed.",
    details: [
      "Log into GoDaddy (credentials in TOOLS.md)",
      "Go to DNS for augeoagency.com",
      "Either: change nameservers to Vercel's, OR add A record pointing to 76.76.21.21",
      "Send Artemis confirmation when done",
    ],
    links: [
      { label: "GoDaddy DNS", url: "https://dcc.godaddy.com/manage/dns" },
    ],
  },
  {
    id: "j-015",
    title: "Post 2 LinkedIn drafts (12+ days waiting)",
    assignee: "jeff",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Dennis drafted 2 LinkedIn posts. Copy-paste into LinkedIn, use 'link in comments' pattern.",
    details: [
      "Post 1: CCM revenue most practices miss → links to calculator",
      "Post 2: 'I hired an AI as an employee' → links to AI playbook",
      "Ask Artemis to send drafts now",
    ],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/feed/" },
      { label: "Calculator", url: "https://calculator.augeohealth.com" },
      { label: "AI Playbook", url: "https://playbook.agentartemis.ai" },
    ],
  },

  // GENERAL (P2 items)
  {
    id: "j-019",
    title: "Set up Zernio for social media management (optional)",
    assignee: "jeff",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
    description: "Nice-to-have for scaling content distribution. Low priority — social automation running manually.",
    links: [
      { label: "Zernio", url: "https://zernio.com/" },
    ],
  },
  {
    id: "j-007",
    title: "Provide Pixelmator logo exports (nice-to-have)",
    assignee: "jeff",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
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

  // ═══════════════════════════════
  // AGENT BOARD
  // ═══════════════════════════════

  // TODAY — All automated systems running clean
  {
    id: "a-032",
    title: "Trading experiment daily execution",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "Day 14/60. Paper: +4.89% (on pace). Live: $300 (no positions). Ahead of 20% target. Crons automated.",
  },
  {
    id: "a-033",
    title: "Dashboard nightly cleanup & sync (12 AM MDT)",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "Sync tasks.ts, live-status.json, programs-status.json with memory/heartbeat-state.json. Archive DONE tasks. Run nightly.",
  },
  {
    id: "a-034",
    title: "Social automation (3 posts/day)",
    assignee: "charlie",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "medium",
    description: "Morning healthcare + noon Instagram + afternoon Artemis. Content calendar loaded, automated.",
  },

  // THIS WEEK
  {
    id: "a-030",
    title: "CRITICAL: Activate marketing campaigns (Grant/RFP.Ninja)",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "$0 revenue for 21 days. Both sites live with $97/mo + $970/yr tiers. 7-day activation plan ready.",
    details: [
      "Target: Grant writers, consultants, nonprofits, professional services",
      "Channels: LinkedIn posts, X threads, direct email outreach",
      "Messaging: Save 20+ hours/week on research + compliance",
      "Execution: Follow zero-revenue-activation-plan.md scripts",
    ],
  },
  {
    id: "a-031",
    title: "CRITICAL: Activate marketing campaigns (AI Playbooks)",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "$0 external revenue for 21 days. Healthcare + General playbooks live. Week 1 focus: Healthcare playbook only.",
    details: [
      "Week 1 target: 5 downloads of Healthcare Playbook by April 25",
      "Healthcare: target practice managers, COOs, billing company owners",
      "Jeff's 2 LinkedIn drafts ready to post (12+ days waiting)",
      "Execution: Follow zero-revenue-activation-plan.md scripts",
    ],
  },

  // NEXT WEEK
  {
    id: "a-008",
    title: "Voice AI MVP architecture",
    assignee: "benny",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "medium",
    description: "PARKED until first client secured. Retell AI will build agent when client ready. Re-evaluate May 1.",
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
