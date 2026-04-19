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

  // TODAY (P1 - Optional)
  {
    id: "j-015",
    title: "Get SAM.gov real API key (optional)",
    assignee: "jeff",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "medium",
    description: "Optional upgrade for TheGrant.Ninja. Currently using DEMO_KEY which works but has rate limits.",
    details: [
      "Go to https://sam.gov/",
      "Create account or log in",
      "Navigate to API Access → Request API Key",
      "Send API key to Artemis on Telegram",
      "Not blocking - DEMO_KEY works for now",
    ],
    links: [
      { label: "SAM.gov API", url: "https://sam.gov/" },
    ],
  },

  // THIS WEEK
  {
    id: "j-012",
    title: "Set up augeoagency.com DNS",
    assignee: "jeff",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "augeoagency.com is sitting unpointed for 10+ days. GoDaddy account — update nameservers to Vercel or add A record.",
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

  // THIS WEEK
  {
    id: "a-030",
    title: "Marketing campaigns for Grant/RFP.Ninja",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "high",
    description: "Activate marketing for Grant.Ninja + RFP.Ninja. Both live with Stripe subscriptions but $0 revenue. Time to activate outreach.",
    details: [
      "Target: Grant writers, consultants, nonprofits, small businesses",
      "Channels: LinkedIn posts, X threads, cold email to grant consultants",
      "Messaging: Save 20+ hours/week on grant research",
    ],
  },
  {
    id: "a-031",
    title: "Marketing campaigns for AI Playbooks",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "high",
    description: "Healthcare AI Playbook ($49) + General AI Playbook ($29) both live but $0 external revenue. Activate marketing.",
    details: [
      "Healthcare: Target practice managers, COOs, billing companies",
      "General: Target entrepreneurs, consultants, small business owners",
      "Jeff has 2 LinkedIn drafts ready to post",
    ],
  },
  {
    id: "a-032",
    title: "Trading experiment daily execution",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "high",
    description: "Day 11/60 complete. Paper: $104,050.51 (+4.05%). Live: $300 (no positions yet). Daily journal + chart generation automated.",
  },
  {
    id: "a-033",
    title: "GHL Dashboard daily sync",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "medium",
    description: "Daily 8 AM MDT sync of 7 projects to GoHighLevel opportunities with 20 custom fields. Running clean.",
  },
  {
    id: "a-034",
    title: "Social media automation (3 posts/day)",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "medium",
    description: "Automated social posts running: morning healthcare (Twitter/LinkedIn), noon Instagram, afternoon Artemis (Twitter/LinkedIn). Content calendar loaded.",
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
