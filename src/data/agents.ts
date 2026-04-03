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
  workload: number; // 0-100 percentage
}

export const agents: Agent[] = [
  {
    id: "artemis",
    name: "Artemis",
    role: "Chief of Staff / Orchestrator",
    specialty: "Strategy, delegation, execution, full-stack building",
    status: "active",
    currentTask: "Building Grant Scout MVP + managing all sub-agents",
    tasksCompleted: 52,
    lastActive: "2026-04-03T18:50:00Z",
    isOrchestrator: true,
    workload: 90,
  },
  {
    id: "benny",
    name: "Benny",
    role: "Healthcare Operations",
    specialty: "CCM/RPM, billing AI, pre-auth, revenue modeling",
    status: "idle",
    currentTask: null,
    tasksCompleted: 4,
    lastActive: "2026-04-02T20:49:00Z",
    workload: 0,
  },
  {
    id: "charlie",
    name: "Charlie",
    role: "Content & Distribution",
    specialty: "X/Twitter, Beehiiv, site content, YouTube",
    status: "active",
    currentTask: "Delivered today's 2 X posts (both live). Queuing afternoon round.",
    tasksCompleted: 4,
    lastActive: "2026-04-03T18:03:00Z",
    workload: 45,
  },
  {
    id: "dennis",
    name: "Dennis",
    role: "Sales & Outreach",
    specialty: "Lead gen, cold outreach, pipeline management",
    status: "active",
    currentTask: "Building full outreach playbook -- Reddit, X, LinkedIn, cold DMs, FB groups",
    tasksCompleted: 1,
    lastActive: "2026-04-03T18:51:00Z",
    workload: 80,
  },
  {
    id: "evelyn",
    name: "Evelyn",
    role: "Research & Scout",
    specialty: "Market analysis, competitive intel, grants",
    status: "active",
    currentTask: "Delivered Scout tools architecture. Grant Scout + Acquisition Scout scoped.",
    tasksCompleted: 4,
    lastActive: "2026-04-03T18:06:00Z",
    workload: 35,
  },
  {
    id: "frank",
    name: "Frank",
    role: "Acquisitions & Finance",
    specialty: "Business acquisitions, real estate, financial modeling, deal sourcing",
    status: "idle",
    currentTask: null,
    tasksCompleted: 0,
    lastActive: "2026-04-03T18:48:00Z",
    workload: 0,
  },
];
