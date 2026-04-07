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
,
  {
    id: "1",
    title: "Review Q1 financial reports",
    assignedTo: "Jeff Oldroyd",
    status: "completed",
    priority: "high",
    createdAt: "2026-04-05T10:00:00Z",
    updatedAt: "2026-04-06T15:30:00Z",
    completedAt: "2026-04-06T15:30:00Z",
    tags: ["finance", "quarterly"]
  ,
    archivedAt: "2026-04-07T02:50:34.081Z"
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
    tags: ["marketing", "leads"]
  ,
    archivedAt: "2026-04-07T02:50:34.081Z"
  }
];