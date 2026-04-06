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
  // Archive will be populated by nightly cleanup process
];