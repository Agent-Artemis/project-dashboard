export interface ArchivedTask {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  status: "completed" | "cancelled";
  priority: "urgent" | "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  archivedAt: string;
  tags: string[];
}

// Archived tasks (moved from active at midnight daily)
export const archivedTasks: ArchivedTask[] = [
  {
    id: "1",
    title: "Review Q1 financial reports",
    assignedTo: "Jeff Oldroyd",
    status: "completed",
    priority: "high",
    createdAt: "2026-04-05T10:00:00Z",
    updatedAt: "2026-04-06T15:30:00Z",
    completedAt: "2026-04-06T15:30:00Z",
    archivedAt: "2026-04-07T02:50:34.081Z",
    tags: ["finance", "quarterly"],
  },
  {
    id: "4",
    title: "Test new lead generation funnel",
    assignedTo: "Artemis",
    status: "completed",
    priority: "high",
    createdAt: "2026-04-05T14:00:00Z",
    updatedAt: "2026-04-06T12:00:00Z",
    completedAt: "2026-04-06T12:00:00Z",
    archivedAt: "2026-04-07T02:50:34.081Z",
    tags: ["marketing", "leads"],
  },
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
    archivedAt: "2026-04-07T06:01:16.763Z",
    tags: ["infrastructure", "automation"],
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
    archivedAt: "2026-04-07T06:01:16.763Z",
    tags: ["trading", "setup"],
  },
];
