export type AgentStatus = "active" | "idle";

export interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: AgentStatus;
  currentTask: string | null;
  tasksCompleted: number;
  lastActive: string;
  isOrchestrator?: boolean;
}

export const agents: Agent[] = [
  {
    id: "artemis",
    name: "Artemis",
    role: "Chief of Staff / Orchestrator",
    specialty: "Strategy, delegation, execution, full-stack building",
    status: "active",
    currentTask: "Rebuilding Project HQ dashboard",
    tasksCompleted: 47,
    lastActive: "2026-04-03T17:30:00Z",
    isOrchestrator: true,
  },
  {
    id: "benny",
    name: "Benny",
    role: "Healthcare Operations",
    specialty: "CCM/RPM, billing AI, pre-auth, revenue modeling",
    status: "idle",
    currentTask: null,
    tasksCompleted: 3,
    lastActive: "2026-04-01T20:49:00Z",
  },
  {
    id: "charlie",
    name: "Charlie",
    role: "Content & Distribution",
    specialty: "X/Twitter, Beehiiv, site content, YouTube",
    status: "idle",
    currentTask: null,
    tasksCompleted: 2,
    lastActive: "2026-04-01T19:56:00Z",
  },
  {
    id: "dennis",
    name: "Dennis",
    role: "Sales & Outreach",
    specialty: "Lead gen, cold outreach, pipeline management",
    status: "idle",
    currentTask: null,
    tasksCompleted: 0,
    lastActive: "2026-03-30T12:20:00Z",
  },
  {
    id: "evelyn",
    name: "Evelyn",
    role: "Research & Scout",
    specialty: "Market analysis, competitive intel, grants",
    status: "idle",
    currentTask: null,
    tasksCompleted: 2,
    lastActive: "2026-04-01T20:49:00Z",
  },
];
