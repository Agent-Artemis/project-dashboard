// Type definitions only - data moved to /api/projects
export type Brand = "augeo-health" | "artemis";
export type Status = "active" | "in-progress" | "planned" | "existing" | "on-hold";

export interface Project {
  id: string;
  name: string;
  brand: Brand;
  status: Status;
  description: string;
  url?: string;
  keyMetric: { label: string; value: string };
  recentActivity: string[];
}
