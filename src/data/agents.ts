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
    name: "Healthcare Ops Agent",
    role: "Healthcare Operations",
    description:
      "CCM/RPM pipeline automation, medical billing AI, pre-auth workflows, and healthcare operations support.",
    status: "idle",
    lastActive: "2026-03-30T10:00:00",
    tasksCompleted: 0,
    currentTask: undefined,
    capabilities: [
      "CCM/RPM pipeline automation",
      "Medical billing research",
      "Pre-auth workflow design",
      "Healthcare compliance checks",
      "Revenue modeling",
    ],
  },
  {
    id: "content-distribution",
    name: "Content & Distribution Agent",
    role: "Content & Distribution",
    description:
      "X/Twitter posting, Beehiiv newsletter, Artemis site content, YouTube scripts. Handles both HCIP and Artemis brands.",
    status: "idle",
    lastActive: "2026-03-30T10:00:00",
    tasksCompleted: 0,
    currentTask: undefined,
    capabilities: [
      "X/Twitter content creation",
      "Newsletter drafting (Beehiiv)",
      "Blog/site content",
      "YouTube script writing",
      "Social engagement tracking",
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
