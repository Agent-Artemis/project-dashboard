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

// Current active tasks for all agents
export const activeTasks: Task[] = [
  {
    id: "frank-paper-trading",
    title: "Paper Trading - Day 1 STARTED ✅", 
    description: "Paper trading account active, $100K virtual balance, API connected, daily monitoring in progress. Live trading starts Thu Apr 10",
    assignedTo: "acquisitions-finance",
    status: "completed",
    priority: "high",
    createdAt: "2026-04-06T08:00:00",
    updatedAt: "2026-04-06T16:46:00",
    completedAt: "2026-04-06T16:46:00",
    dueDate: "2026-04-07T16:00:00",
    tags: ["trading", "alpaca", "finance"]
  },
  {
    id: "charlie-content-review",
    title: "Content Push Awaiting Jeff Review",
    description: "Social media content queue ready for Jeff's approval before publishing across X/Twitter and LinkedIn",
    assignedTo: "content-distribution", 
    status: "blocked",
    priority: "medium",
    createdAt: "2026-04-03T14:00:00",
    updatedAt: "2026-04-06T08:00:00",
    blockedReason: "Awaiting Jeff's content review and approval",
    tags: ["content", "social-media", "approval"]
  },
  {
    id: "dennis-linkedin-drafts",
    title: "LinkedIn Drafts Awaiting Jeff Review", 
    description: "LinkedIn post drafts prepared for Jeff's professional account, waiting for review and approval",
    assignedTo: "sales-outreach",
    status: "blocked", 
    priority: "medium",
    createdAt: "2026-04-03T14:00:00",
    updatedAt: "2026-04-06T08:00:00",
    blockedReason: "Awaiting Jeff's LinkedIn draft review",
    tags: ["linkedin", "outreach", "approval"]
  },
  {
    id: "artemis-websites-logos",
    title: "Update Website Logos",
    description: "Deploy Augeo compass logos to augeohealth.com and augeoagency.com sites",
    assignedTo: "main",
    status: "active", 
    priority: "medium",
    createdAt: "2026-04-06T08:45:00",
    updatedAt: "2026-04-06T08:45:00",
    tags: ["websites", "branding", "deployment"]
  },
  {
    id: "artemis-acquisition-tracker",
    title: "Build Acquisition Tracker Platform", 
    description: "Create platform to track acquisition targets, deal progress, and financial modeling for the HCIP acquisition project",
    assignedTo: "main",
    status: "active",
    priority: "high",
    createdAt: "2026-04-04T00:00:00",
    updatedAt: "2026-04-06T08:00:00",
    dueDate: "2026-04-08T00:00:00",
    tags: ["acquisitions", "platform", "hcip"]
  },
  {
    id: "artemis-agent-leasing-research",
    title: "Agent Leasing Competitive Research",
    description: "Research AI agent service providers, pricing models, and competitive landscape for the Agent Leasing Company concept",
    assignedTo: "main", 
    status: "active",
    priority: "medium",
    createdAt: "2026-04-04T00:00:00",
    updatedAt: "2026-04-06T08:00:00", 
    tags: ["research", "competitive-analysis", "agent-leasing"]
  },
  {
    id: "fix-calculator-branding",
    title: "Fix CCM Calculator Branding",
    description: "calculator.augeohealth.com still shows 'Healthcare Industry Partners' instead of 'Augeo Health' - deployment or caching issue",
    assignedTo: "main",
    status: "active",
    priority: "high",
    createdAt: "2026-04-06T15:15:00",
    updatedAt: "2026-04-06T15:15:00",
    dueDate: "2026-04-06T18:00:00",
    tags: ["branding", "deployment", "caching", "calculator"]
  },
  {
    id: "fix-logo-sizes",
    title: "Investigate Logo Size Issues", 
    description: "augeohealth.com logo still appears small despite multiple size adjustments - may be browser caching",
    assignedTo: "main",
    status: "active",
    priority: "medium",
    createdAt: "2026-04-06T15:15:00",
    updatedAt: "2026-04-06T15:15:00",
    tags: ["branding", "css", "caching", "logos"]
  },
  {
    id: "social-media-blitz",
    title: "Social Media Content Push",
    description: "FB posts for Augeo Agency (50 followers!), X posts, Instagram cross-posting, LinkedIn intro post - coordinate across all platforms",
    assignedTo: "content",
    status: "active",
    priority: "urgent",
    createdAt: "2026-04-06T16:46:00",
    updatedAt: "2026-04-06T16:46:00",
    dueDate: "2026-04-06T18:00:00",
    tags: ["social-media", "content", "branding", "linkedin"]
  },
  {
    id: "acquisition-followup",
    title: "HCIP Acquisition Follow-up Calls",
    description: "Enhanced contact list ready - priority calls to Qualgen LLC (405-341-7537), Apollo Care (573-234-5678), Storage portfolio leads",
    assignedTo: "sales",
    status: "active", 
    priority: "high",
    createdAt: "2026-04-06T16:46:00",
    updatedAt: "2026-04-06T16:46:00",
    dueDate: "2026-04-07T17:00:00",
    tags: ["acquisitions", "outreach", "hcip", "503b-pharmacy"]
  },
  {
    id: "grant-platform-spec",
    title: "Grant Research Platform - Spec & Pricing",
    description: "Design subscription model: search ($X/mo), fill-out (1x fee), submission + follow-up (8.5% success fee). Competitive research on existing platforms",
    assignedTo: "research",
    status: "active",
    priority: "medium",
    createdAt: "2026-04-06T16:46:00",
    updatedAt: "2026-04-06T16:46:00",
    dueDate: "2026-04-08T17:00:00",
    tags: ["grants", "platform", "saas", "pricing-model"]
  },
  {
    id: "agent-leasing-research",
    title: "Agent Leasing Competitive Research",
    description: "Research existing AI agent service companies, pricing models, service delivery. Map competitive landscape for temp-agency-style AI agent leasing",
    assignedTo: "research",
    status: "active",
    priority: "medium",
    createdAt: "2026-04-06T16:46:00",
    updatedAt: "2026-04-06T16:46:00",
    dueDate: "2026-04-08T17:00:00",
    tags: ["agents", "competitive", "pricing", "business-model"]
  }
];

export const completedTasks: Task[] = [
  // Completed tasks will be moved here and cleaned up nightly
];

// Task management utilities
export function getTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => task.assignedTo === agentId);
}

export function getActiveTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => 
    task.assignedTo === agentId && task.status === "active"
  );
}

export function getBlockedTasksByAgent(agentId: string): Task[] {
  return activeTasks.filter(task => 
    task.assignedTo === agentId && task.status === "blocked"
  );
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
    task.dueDate && new Date(task.dueDate) < now && task.status !== "completed"
  );
}

export function markTaskCompleted(taskId: string): Task | null {
  const taskIndex = activeTasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return null;
  
  const task = activeTasks[taskIndex];
  task.status = "completed";
  task.completedAt = new Date().toISOString();
  task.updatedAt = new Date().toISOString();
  
  // Move to completed tasks
  completedTasks.push(task);
  activeTasks.splice(taskIndex, 1);
  
  return task;
}

export function addTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
  const newTask: Task = {
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  activeTasks.push(newTask);
  return newTask;
}

export function updateTask(taskId: string, updates: Partial<Task>): Task | null {
  const task = activeTasks.find(t => t.id === taskId);
  if (!task) return null;
  
  Object.assign(task, updates, { updatedAt: new Date().toISOString() });
  return task;
}

// Nightly cleanup - remove completed tasks older than 24 hours
export function cleanupCompletedTasks(): number {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - 24);
  
  const initialLength = completedTasks.length;
  const filtered = completedTasks.filter(task => 
    !task.completedAt || new Date(task.completedAt) > cutoff
  );
  
  completedTasks.length = 0;
  completedTasks.push(...filtered);
  
  return initialLength - filtered.length;
}