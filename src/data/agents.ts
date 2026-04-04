export type AgentStatus = "active" | "idle" | "offline" | "error";

export interface SubAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  lastActive: string;
  tasksCompleted: number;
  currentTask?: string;
  capabilities: string[];
}

export const agents: SubAgent[] = [
  {
    id: "healthcare-ops",
    name: "Benny",
    role: "Healthcare Operations",
    description:
      "CCM/RPM pipeline automation, medical billing AI, pre-auth workflows, voice AI platform, and healthcare operations support.",
    status: "idle",
    lastActive: "2026-04-03T12:00:00",
    tasksCompleted: 3,
    currentTask: undefined,
    capabilities: [
      "CCM/RPM pipeline automation",
      "Medical billing research",
      "Pre-auth workflow design",
      "Healthcare compliance checks",
      "Revenue modeling",
      "Voice AI framework (Retell)",
    ],
  },
  {
    id: "content-distribution",
    name: "Charlie",
    role: "Content & Distribution",
    description:
      "X/Twitter posting, Beehiiv newsletter, site content, YouTube scripts, LinkedIn. Dual-brand: Augeo Health and Artemis.",
    status: "idle",
    lastActive: "2026-04-03T14:00:00",
    tasksCompleted: 5,
    currentTask: "Content push awaiting Jeff review",
    capabilities: [
      "X/Twitter content creation",
      "Newsletter drafting (Beehiiv)",
      "Blog/site content",
      "YouTube script writing",
      "LinkedIn post drafting",
      "Social engagement tracking",
    ],
  },
  {
    id: "sales-outreach",
    name: "Dennis",
    role: "Sales & Outreach",
    description:
      "Lead generation, cold outreach, prospect research, pipeline management, and channel partner recruitment.",
    status: "idle",
    lastActive: "2026-04-03T14:00:00",
    tasksCompleted: 2,
    currentTask: "LinkedIn drafts awaiting Jeff review",
    capabilities: [
      "Lead generation",
      "Email sequence drafting",
      "Prospect research",
      "Pipeline tracking",
      "Cal.com booking integration",
      "Partnership outreach",
      "Channel partner recruitment",
    ],
  },
  {
    id: "research-scout",
    name: "Evelyn",
    role: "Research & Opportunity Scout",
    description:
      "Market analysis, competitive intel, acquisition research, grant scouting, and technology scouting.",
    status: "idle",
    lastActive: "2026-04-03T16:00:00",
    tasksCompleted: 4,
    currentTask: undefined,
    capabilities: [
      "Market analysis",
      "Competitive intelligence",
      "Acquisition target research",
      "Grant scouting & writing",
      "Arbitrage detection",
      "Technology scouting",
    ],
  },
];

export const agentStatusStyles: Record<
  AgentStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  active: {
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
    label: "Active",
  },
  idle: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    dot: "bg-gray-400",
    label: "Idle",
  },
  offline: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
    label: "Offline",
  },
  error: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    label: "Error",
  },
};

export function getActiveAgentCount(): number {
  return agents.filter((a) => a.status === "active").length;
}

export function getIdleAgentCount(): number {
  return agents.filter((a) => a.status === "idle").length;
}
