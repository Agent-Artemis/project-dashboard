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

// Blocked tasks (waiting on Jeff)
export const blockedTasks: Task[] = [
  {
    id: "refresh-facebook-token",
    title: "Refresh Facebook Page Access Token",
    description: "Facebook API token expired, need Jeff to re-authenticate Augeo Agency page access for automated posting",
    assignedTo: "main",
    status: "blocked",
    priority: "high",
    createdAt: "2026-04-06T14:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for Jeff to complete Facebook re-authentication",
    dueDate: "2026-04-08T12:00:00",
    tags: ["facebook", "api", "authentication", "social-media"]
  },
  {
    id: "sam-gov-registration",
    title: "SAM.gov registration (Augeo LLC)",
    description: "Monitor SAM.gov registration approval for federal contract access - documentation submitted",
    assignedTo: "research",
    status: "blocked",
    priority: "high",
    createdAt: "2026-04-07T15:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for SAM.gov document review and approval notification",
    dueDate: "2026-04-10T12:00:00",
    tags: ["sam-gov", "registration", "federal-contracts", "augeo"]
  },
  {
    id: "grants-gov-registration",
    title: "Grants.gov Registration",
    description: "Complete organizational registration for grant application API access",
    assignedTo: "research", 
    status: "blocked",
    priority: "high",
    createdAt: "2026-04-07T21:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for Jeff to complete organizational registration process",
    dueDate: "2026-04-09T12:00:00",
    tags: ["grants-gov", "registration", "api-access", "grants"]
  },
  {
    id: "voice-ai-platform-review",
    title: "Review Voice AI platform framework",
    description: "Jeff needs to review Retell AI platform documentation and approve implementation approach",
    assignedTo: "healthcare-ops",
    status: "blocked",
    priority: "medium",
    createdAt: "2026-04-06T16:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for Jeff to review platform docs and provide feedback",
    dueDate: "2026-04-08T17:00:00",
    tags: ["voice-ai", "retell", "platform", "review"]
  },
  {
    id: "linkedin-post-drafts",
    title: "Post LinkedIn drafts (2 posts ready)",
    description: "Two LinkedIn posts drafted and ready for Jeff's review and posting approval",
    assignedTo: "content-distribution",
    status: "blocked",
    priority: "medium",
    createdAt: "2026-04-06T18:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for Jeff to review and approve LinkedIn post content",
    dueDate: "2026-04-08T09:00:00",
    tags: ["linkedin", "content", "approval", "social-media"]
  },
  {
    id: "data-coverage-review",
    title: "Review Data Coverage - State/Source Priorities",
    description: "Approve state/source priorities for ninja platform expansion (federal, state, private foundations)",
    assignedTo: "main",
    status: "blocked",
    priority: "medium",
    createdAt: "2026-04-07T21:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for Jeff to approve data source integration strategy",
    dueDate: "2026-04-09T17:00:00",
    tags: ["data-sources", "ninja-platforms", "strategy", "approval"]
  },
  {
    id: "success-fee-confirmation",
    title: "Confirm 8.5% Success Fee Strategy",
    description: "Confirm pricing strategy across all funding sources (grants, RFPs, state, federal)",
    assignedTo: "main",
    status: "blocked",
    priority: "low",
    createdAt: "2026-04-07T21:00:00",
    updatedAt: "2026-04-07T21:00:00",
    blockedReason: "Waiting for Jeff to confirm pricing model across all platforms",
    dueDate: "2026-04-10T17:00:00",
    tags: ["pricing", "strategy", "success-fee", "confirmation"]
  }
];

// All tasks combined
export const allTasks: Task[] = [...activeTasks, ...blockedTasks];

// Utility functions
export function getTasksByStatus(status: TaskStatus): Task[] {
  return allTasks.filter(task => task.status === status);
}

export function getTasksByPriority(priority: TaskPriority): Task[] {
  return allTasks.filter(task => task.priority === priority);
}

export function getTasksByAgent(agentId: string): Task[] {
  return allTasks.filter(task => task.assignedTo === agentId);
}

export function getActiveTasksByAgent(agentId: string): Task[] {
  return allTasks.filter(task => task.assignedTo === agentId && task.status === "active");
}

export function getBlockedTasksByAgent(agentId: string): Task[] {
  return allTasks.filter(task => task.assignedTo === agentId && task.status === "blocked");
}

export function getOverdueTasks(): Task[] {
  const now = new Date();
  return allTasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < now && 
    task.status !== "completed"
  );
}
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
  ];