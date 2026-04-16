import { NextResponse } from "next/server";
import { agentProfiles } from "@/data/agents";
import type { Agent } from "@/data/agents";

export const dynamic = "force-dynamic";

const LIVE_STATUS_URL =
  "https://raw.githubusercontent.com/Agent-Artemis/project-dashboard/main/live-status.json";

interface LiveAgent {
  status?: "active" | "idle";
  currentTask?: string | null;
  workload?: number;
  tasksCompleted?: number;
  tasksInProgress?: number;
  tasksTotal?: number;
}

interface LiveStatus {
  updatedAt?: string;
  agents?: Record<string, LiveAgent>;
}

export async function GET() {
  // Fetch live status from GitHub (cache-bust with timestamp)
  let live: LiveStatus = {};
  try {
    const res = await fetch(`${LIVE_STATUS_URL}?t=${Date.now()}`, {
      next: { revalidate: 0 },
      cache: "no-store",
    });
    if (res.ok) live = await res.json();
  } catch {
    // Fall back to defaults
  }

  // Build agent array with live data or sensible defaults
  const agents: Agent[] = agentProfiles.map((profile) => {
    const liveAgent = live.agents?.[profile.id];
    
    // Use live data if available, otherwise default to idle
    const status = liveAgent?.status ?? "idle";
    const currentTask = liveAgent?.currentTask ?? null;
    const workload = liveAgent?.workload ?? 0;
    const tasksCompleted = liveAgent?.tasksCompleted ?? 0;
    const tasksInProgress = liveAgent?.tasksInProgress ?? 0;
    const tasksTotal = liveAgent?.tasksTotal ?? 0;

    return {
      ...profile,
      status,
      currentTask,
      tasksCompleted,
      tasksInProgress,
      tasksTotal,
      lastActive: live.updatedAt ?? new Date().toISOString(),
      workload,
    };
  });

  return NextResponse.json({
    agents,
    liveUpdatedAt: live.updatedAt ?? null,
  });
}
