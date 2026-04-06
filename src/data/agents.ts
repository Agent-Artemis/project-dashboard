import { getActiveTasksByAgent, getTasksByAgent, getBlockedTasksByAgent } from "./tasks";

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

// Helper function to get current task dynamically
function getCurrentTask(agentId: string): string | undefined {
  try {
    const activeTasks = getActiveTasksByAgent(agentId);
    const blockedTasks = getBlockedTasksByAgent(agentId);
    
    // Show blocked tasks first (waiting on Jeff)
    if (blockedTasks.length > 0) {
      const priorities = { urgent: 4, high: 3, medium: 2, low: 1 };
      const sortedBlocked = blockedTasks.sort((a, b) => 
        priorities[b.priority] - priorities[a.priority]
      );
      return sortedBlocked[0].title;
    }
    
    // Then show active tasks
    if (activeTasks.length > 0) {
      const priorities = { urgent: 4, high: 3, medium: 2, low: 1 };
      const sortedActive = activeTasks.sort((a, b) => 
        priorities[b.priority] - priorities[a.priority]
      );
      return sortedActive[0].title;
    }
    
    return undefined;
  } catch (error) {
    // Fallback if tasks module has issues
    return undefined;
  }
}

// Helper function to get completed task count dynamically
function getCompletedTaskCount(agentId: string): number {
  // Historical counts from before task tracking system
  const historicalCounts: Record<string, number> = {
    "healthcare-ops": 3,
    "content-distribution": 5, 
    "sales-outreach": 2,
    "research-scout": 4,
    "acquisitions-finance": 1,
    "main": 12 // Artemis main agent
  };
  return historicalCounts[agentId] || 0;
}

// Helper function to determine agent status dynamically
function getAgentStatus(agentId: string): AgentStatus {
  try {
    const activeTasks = getActiveTasksByAgent(agentId);
    const blockedTasks = getBlockedTasksByAgent(agentId);
    
    if (activeTasks.length > 0) return "active";
    if (blockedTasks.length > 0) return "idle"; // Blocked = idle (waiting)
    return "idle";
  } catch (error) {
    return "idle";
  }
}

// Base agent configurations
const baseAgents = [
  {
    id: "healthcare-ops",
    name: "Benny",
    role: "Healthcare Operations",
    description:
      "CCM/RPM pipeline automation, medical billing AI, pre-auth workflows, voice AI platform, and healthcare operations support.",
    lastActive: "2026-04-03T12:00:00",
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
    lastActive: "2026-04-03T14:00:00",
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
    lastActive: "2026-04-03T14:00:00",
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
    lastActive: "2026-04-03T16:00:00",
    capabilities: [
      "Market analysis",
      "Competitive intelligence",
      "Acquisition target research",
      "Grant scouting & writing",
      "Arbitrage detection",
      "Technology scouting",
    ],
  },
  {
    id: "acquisitions-finance",
    name: "Frank",
    role: "Acquisitions & Finance",
    description:
      "Acquisition target analysis, financial modeling, paper trading, investment research, deal structuring, and financial operations.",
    lastActive: "2026-04-06T08:00:00",
    capabilities: [
      "Acquisition target analysis",
      "Financial modeling",
      "Paper trading automation",
      "Investment research",
      "Deal structuring",
      "Portfolio management",
      "Market analysis",
      "Risk assessment"
    ],
  },
];

// Dynamic agents list that pulls current tasks and status
export const agents: SubAgent[] = baseAgents.map(agent => ({
  ...agent,
  status: getAgentStatus(agent.id),
  tasksCompleted: getCompletedTaskCount(agent.id),
  currentTask: getCurrentTask(agent.id)
}));

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

export function getAgentById(agentId: string): SubAgent | undefined {
  return agents.find(agent => agent.id === agentId);
}