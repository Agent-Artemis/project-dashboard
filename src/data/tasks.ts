export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "urgent" | "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  tags: string[];
}

// Active tasks managed by nightly cleanup
export const activeTasks: Task[] = [
  {
    id: "linkedin-intro",
    title: "LinkedIn Intro Post", 
    description: "Personal story version ready for Jeff's review and posting",
    assignedTo: "Jeff",
    status: "pending",
    priority: "urgent", 
    createdAt: "2026-04-06T10:00:00Z",
    updatedAt: "2026-04-06T20:00:00Z",
    tags: ["content", "social-media"]
  },
  {
    id: "hcip-calls",
    title: "HCIP Acquisition Calls",
    description: "Qualgen LLC (405-341-7537), Apollo Care (573-234-5678)",
    assignedTo: "Dennis",
    status: "pending", 
    priority: "urgent",
    createdAt: "2026-04-06T08:00:00Z",
    updatedAt: "2026-04-06T19:00:00Z", 
    tags: ["acquisitions", "outreach"]
  },
  {
    id: "social-media-blitz",
    title: "Social Media Content",
    description: "FB, X, Instagram posts ready for Monday schedule", 
    assignedTo: "Charlie",
    status: "in-progress",
    priority: "medium",
    createdAt: "2026-04-06T09:00:00Z",
    updatedAt: "2026-04-06T18:00:00Z",
    tags: ["content", "social-media"]
  },
  {
    id: "grant-research", 
    title: "Grant Platform Research",
    description: "Agent leasing competitive analysis and market sizing",
    assignedTo: "Evelyn",
    status: "in-progress",
    priority: "medium", 
    createdAt: "2026-04-06T11:00:00Z",
    updatedAt: "2026-04-06T17:00:00Z",
    tags: ["research", "grants"]
  },
  {
    id: "paper-trading",
    title: "Paper Trading Monitor", 
    description: "$100K virtual portfolio monitoring",
    assignedTo: "Frank",
    status: "blocked",
    priority: "low",
    createdAt: "2026-04-06T12:00:00Z", 
    updatedAt: "2026-04-06T21:00:00Z",
    tags: ["trading", "finance"]
  },
  {
    id: "voice-ai-platform", 
    title: "Voice AI Platform Review",
    description: "Review Retell AI implementation for CCM/RPM calls",
    assignedTo: "Benny",
    status: "in-progress", 
    priority: "medium",
    createdAt: "2026-04-06T13:00:00Z",
    updatedAt: "2026-04-06T16:00:00Z", 
    tags: ["healthcare", "ai"]
  },
  {
    id: "agent-leasing-research",
    title: "Agent Leasing Research", 
    description: "Competitive analysis for agent temp agency model",
    assignedTo: "Evelyn", 
    status: "pending",
    priority: "low",
    createdAt: "2026-04-06T14:00:00Z",
    updatedAt: "2026-04-06T14:00:00Z",
    tags: ["research", "business-model"]
  }
];

export const completedTasks: Task[] = [
  {
    id: "dashboard-task-mgmt",
    title: "Dashboard Task Management",
    description: "Built real-time task system, nightly cleanup automation", 
    assignedTo: "Artemis",
    status: "completed",
    priority: "high",
    createdAt: "2026-04-06T08:00:00Z", 
    updatedAt: "2026-04-06T20:46:00Z",
    completedAt: "2026-04-06T20:46:00Z",
    tags: ["infrastructure", "automation"]
  },
  {
    id: "frank-setup", 
    title: "Frank Paper Trading Setup",
    description: "$100K virtual account activated, API tested",
    assignedTo: "Frank",
    status: "completed",
    priority: "medium", 
    createdAt: "2026-04-06T08:00:00Z",
    updatedAt: "2026-04-06T16:46:00Z", 
    completedAt: "2026-04-06T16:46:00Z",
    tags: ["trading", "setup"]
  }
];