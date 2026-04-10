export type AgentStatus = "active" | "idle";

export interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: AgentStatus;
  currentTask: string | null;
  tasksCompleted: number;
  tasksInProgress: number;
  tasksTotal: number;
  lastActive: string;
  isOrchestrator?: boolean;
  workload: number; // 0-100 percentage
}

// Base agent profiles -- stats are computed dynamically from tasks
export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  isOrchestrator?: boolean;
}

export const agentProfiles: AgentProfile[] = [
  {
    id: "artemis",
    name: "Artemis",
    role: "Chief of Staff / Orchestrator",
    specialty: "Strategy, delegation, execution, full-stack building",
    isOrchestrator: true,
  },
  {
    id: "benny",
    name: "Benny",
    role: "Healthcare Operations",
    specialty: "CCM/RPM, billing AI, pre-auth, revenue modeling",
  },
  {
    id: "charlie",
    name: "Charlie",
    role: "Content & Distribution",
    specialty: "X/Twitter, Beehiiv, site content, YouTube",
  },
  {
    id: "dennis",
    name: "Dennis",
    role: "Sales & Outreach",
    specialty: "Lead gen, cold outreach, pipeline management",
  },
  {
    id: "evelyn",
    name: "Evelyn",
    role: "Research & Scout",
    specialty: "Market analysis, competitive intel, grants",
  },
  {
    id: "frank",
    name: "Frank",
    role: "Acquisitions & Finance",
    specialty: "Business acquisitions, real estate, financial modeling, deal sourcing",
  },
];
