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
    id: "2", 
    title: "Update healthcare automation pipeline",
    assignedTo: "Artemis",
    status: "in-progress",
    priority: "high",
    createdAt: "2026-04-06T09:00:00Z",
    updatedAt: "2026-04-06T20:49:00Z",
    tags: ["automation", "healthcare"]
  },
  {
    id: "3",
    title: "Prepare weekly revenue report", 
    assignedTo: "Jeff Oldroyd",
    status: "pending",
    priority: "medium",
    createdAt: "2026-04-06T08:00:00Z",
    updatedAt: "2026-04-06T08:00:00Z",
    tags: ["revenue", "reporting"]
  }
];;