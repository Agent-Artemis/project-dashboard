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
}

export const tasks: Task[] = [
  // === JEFF'S BOARD ===
  {
    id: "j-001",
    title: "Approve April 3-4 tweets for posting",
    assignee: "charlie",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Charlie has tweets ready in content/charlie-april-push.md",
  },
  {
    id: "j-002",
    title: "Review Voice AI platform framework",
    assignee: "benny",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Full framework doc at knowledge/projects/voice-ai-platform-framework.md",
  },
  {
    id: "j-003",
    title: "Open Alpaca paper trading account",
    assignee: "artemis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Needed to start the 60-day trading experiment",
  },
  {
    id: "j-004",
    title: "SAM.gov registration",
    assignee: "evelyn",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "2-4 week lead time for federal grants. Start ASAP.",
  },
  {
    id: "j-005",
    title: "Review Grant Scout SaaS concept",
    assignee: "artemis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "3-tier model: Search ($29/mo) + Grant Writing ($499-2,500) + Success Fee (5-10%)",
  },
  {
    id: "j-006",
    title: "Share Augeo Agency posts to personal Facebook",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
    description: "Artemis posts to page, Jeff shares to personal profile",
  },
  {
    id: "j-007",
    title: "Provide Pixelmator logo exports for sites",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "medium",
    description: "Jeff's own exports are better than AI-generated versions",
  },
  {
    id: "j-008",
    title: "Update OpenClaw elevated access config",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
  },

  // === AGENT BOARD ===
  // Today
  {
    id: "a-001",
    title: "Rebuild Project HQ dashboard",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "Robinhood-style dark theme, live data, kanban boards",
  },
  {
    id: "a-002",
    title: "Post today's social media content",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "April 3 tweets from Charlie's content calendar",
  },
  {
    id: "a-003",
    title: "Generate April 3-4 tweet content",
    assignee: "charlie",
    board: "agent",
    column: "today",
    status: "done",
    priority: "high",
    description: "Content ready in content/charlie-april-push.md",
  },

  // This Week
  {
    id: "a-004",
    title: "Update all stale dashboard data",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "a-005",
    title: "Beehiiv newsletter draft",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Healthcare audience newsletter",
  },
  {
    id: "a-006",
    title: "Build initial prospect list (billing companies)",
    assignee: "dennis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Target medical billing companies for Voice AI pilot",
  },
  {
    id: "a-007",
    title: "503B compounding pharmacy acquisition deep dive",
    assignee: "evelyn",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
  },

  // Next Week
  {
    id: "a-008",
    title: "Voice AI MVP architecture",
    assignee: "benny",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "high",
    description: "Technical architecture based on approved framework",
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
    description: "Email sequences for billing company outreach",
  },
  {
    id: "a-011",
    title: "RV park + storage unit market analysis",
    assignee: "evelyn",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "medium",
  },

  // 30 Days
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
  {
    id: "a-015",
    title: "Complete acquisition target shortlist",
    assignee: "evelyn",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "medium",
  },

  // Future / Ideas
  {
    id: "a-016",
    title: "Grant Scout SaaS platform build",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-017",
    title: "Trading experiment book",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
  },
  {
    id: "a-018",
    title: "YouTube channel launch",
    assignee: "charlie",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
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
