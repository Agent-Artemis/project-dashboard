export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: "active" | "idle" | "busy" | "blocked";
  currentTask?: string;
  completedTasks: number;
  totalTasks: number;
  capabilities: string[];
  utilization: number; // percentage of capacity being used
}

export const agents: Agent[] = [
  {
    id: "benny",
    name: "Benny", 
    role: "Healthcare Operations",
    description: "CCM/RPM billing, pre-auth, voice AI platform",
    status: "active",
    currentTask: "Voice AI platform review",
    completedTasks: 12,
    totalTasks: 17,
    capabilities: ["healthcare", "billing", "automation", "voice-ai"],
    utilization: 15
  },
  {
    id: "charlie",
    name: "Charlie",
    role: "Content & Distribution", 
    description: "X/Twitter, Beehiiv, content strategy",
    status: "busy",
    currentTask: "Social media content push",
    completedTasks: 23,
    totalTasks: 31,
    capabilities: ["content", "social-media", "newsletters", "distribution"],
    utilization: 25
  },
  {
    id: "dennis", 
    name: "Dennis",
    role: "Sales & Outreach",
    description: "Lead gen, cold outreach, HCIP acquisition calls", 
    status: "busy",
    currentTask: "HCIP acquisition calls",
    completedTasks: 19,
    totalTasks: 25,
    capabilities: ["sales", "outreach", "lead-gen", "acquisitions"],
    utilization: 33
  },
  {
    id: "evelyn",
    name: "Evelyn", 
    role: "Research & Scout",
    description: "Market analysis, competitive intel, grant research",
    status: "active",
    currentTask: "Grant platform research", 
    completedTasks: 31,
    totalTasks: 38,
    capabilities: ["research", "analysis", "competitive-intel", "grants"],
    utilization: 50
  },
  {
    id: "frank",
    name: "Frank",
    role: "Acquisitions & Finance", 
    description: "Business acquisitions, trading, financial analysis",
    status: "blocked",
    currentTask: "Paper trading active ($100K)", 
    completedTasks: 12,
    totalTasks: 17,
    capabilities: ["finance", "trading", "acquisitions", "analysis"],
    utilization: 20
  }
];