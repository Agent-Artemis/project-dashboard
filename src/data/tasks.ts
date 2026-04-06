export type TaskStatus = "active" | "blocked" | "completed" | "cancelled";
export type TaskPriority = "urgent" | "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string; // agent id
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  blockedReason?: string;
  dueDate?: string;
  tags: string[];
}

// Helper functions to work with tasks
export function getActiveTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => task.assignedTo === agentId && task.status === 'active');
}

export function getTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => task.assignedTo === agentId);
}

export function getBlockedTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => task.assignedTo === agentId && task.status === 'blocked');
}

export function getCompletedTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => task.assignedTo === agentId && task.status === 'completed');
}

export function getTasksByStatus(status: TaskStatus): Task[] {
  return activeTasks.filter(task => task.status === status);
}

export function getTasksByPriority(priority: TaskPriority): Task[] {
  return activeTasks.filter(task => task.priority === priority);
}

export function getOverdueTasks(): Task[] {
  const now = new Date();
  return activeTasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < now && task.status !== 'completed'
  );
}

// Current active tasks for all agents
export const activeTasks: Task[] = [
  {
    id: "social-media-blitz-monday",
    title: "Social Media Blitz - Monday Schedule",
    description: "Publishing across all platforms: LinkedIn intro post, FB milestone (50 followers!), X acquisition insights, Instagram cross-posting. Content ready, executing schedule.",
    assignedTo: "content-distribution",
    status: "active", 
    priority: "urgent",
    createdAt: "2026-04-06T18:46:00",
    updatedAt: "2026-04-06T20:22:00",
    dueDate: "2026-04-06T23:00:00",
    tags: ["social-media", "linkedin", "facebook", "twitter", "instagram", "content"]
  },
  {
    id: "acquisition-followup-calls", 
    title: "HCIP Acquisition Follow-up Calls",
    description: "Priority outreach: Qualgen LLC (405-341-7537) - clean 503B pharmacy, Apollo Care (573-234-5678) - distressed acquisition opportunity, Bixby Storage Portfolio ($7M). Enhanced contact list ready.",
    assignedTo: "sales-outreach",
    status: "active",
    priority: "high", 
    createdAt: "2026-04-06T18:46:00",
    updatedAt: "2026-04-06T20:22:00",
    dueDate: "2026-04-07T17:00:00",
    tags: ["acquisitions", "outreach", "503b-pharmacy", "storage", "hcip", "phone-calls"]
  },
  {
    id: "grant-platform-research",
    title: "GrantScout Platform Development",
    description: "Research competitive landscape, validate pricing model (8.5% success fee), begin platform specification. Target: healthcare practices for SBIR/STTR grants.",
    assignedTo: "research",
    status: "active",
    priority: "medium",
    createdAt: "2026-04-06T18:46:00", 
    updatedAt: "2026-04-06T20:22:00",
    dueDate: "2026-04-08T17:00:00",
    tags: ["grants", "platform", "saas", "pricing-model", "healthcare"]
  },
  {
    id: "agent-leasing-competitive-research",
    title: "Agent Leasing Market Analysis",
    description: "Research AI agent service companies, pricing models ($50/mo to $200K+), competitive landscape. Map opportunity for 'AI temp agency' model.",
    assignedTo: "research", 
    status: "active",
    priority: "medium",
    createdAt: "2026-04-06T18:46:00",
    updatedAt: "2026-04-06T20:22:00", 
    dueDate: "2026-04-08T17:00:00",
    tags: ["agents", "competitive", "pricing", "business-model", "market-research"]
  },
  {
    id: "frank-paper-trading-monitoring",
    title: "Frank - Paper Trading Daily Monitoring",
    description: "Monitor $100K virtual account, track trades and P&L, document strategy for book content. Day 1 complete, 2 more days before live trading Thu Apr 10 with $300.",
    assignedTo: "acquisitions-finance",
    status: "active",
    priority: "high",
    createdAt: "2026-04-06T16:46:00",
    updatedAt: "2026-04-06T20:22:00",
    dueDate: "2026-04-10T09:00:00", 
    tags: ["trading", "alpaca", "paper-trading", "monitoring", "frank"]
  },
  {
    id: "dashboard-deployment-fix",
    title: "Fix Dashboard Real-time Updates",
    description: "Resolve deployment issues preventing task updates from showing on live dashboard. Jeff needs real-time team visibility.",
    assignedTo: "main",
    status: "active",
    priority: "high",
    createdAt: "2026-04-06T20:22:00",
    updatedAt: "2026-04-06T20:22:00",
    dueDate: "2026-04-06T22:00:00",
    tags: ["dashboard", "deployment", "vercel", "real-time", "infrastructure"]
  },
  {
    id: "website-branding-fixes",
    title: "CCM Calculator & Logo Branding Updates", 
    description: "Fix CCM calculator still showing 'Healthcare Industry Partners', resolve logo sizing issues on augeohealth.com. Customer-facing branding consistency.",
    assignedTo: "main",
    status: "active",
    priority: "medium",
    createdAt: "2026-04-06T15:00:00",
    updatedAt: "2026-04-06T20:22:00",
    dueDate: "2026-04-07T12:00:00",
    tags: ["branding", "calculator", "logos", "websites", "augeo-health"]
  }
];