import { NextResponse } from "next/server";
import { agentProfiles } from "@/data/agents";
import type { Agent } from "@/data/agents";
import { tasks } from "@/data/tasks";

export const dynamic = "force-dynamic";

const LIVE_STATUS_URL =
  "https://raw.githubusercontent.com/Agent-Artemis/project-dashboard/main/live-status.json";

interface LiveAgent {
  status?: "active" | "idle";
  currentTask?: string | null;
  workload?: number;
}

interface LiveStatus {
  updatedAt?: string;
  agents?: Record<string, LiveAgent>;
}

export async function GET() {
  // 1. Try to fetch live status from GitHub (cache-bust with timestamp)
  let live: LiveStatus = {};
  try {
    const res = await fetch(`${LIVE_STATUS_URL}?t=${Date.now()}`, {
      next: { revalidate: 0 },
      cache: "no-store",
    });
    if (res.ok) live = await res.json();
  } catch {
    // Fall back to task-based computation
  }

  // 2. Compute task-based stats as baseline
  const agents: Agent[] = agentProfiles.map((profile) => {
    const agentTasks = tasks.filter(
      (t) =>
        t.assignee === profile.id ||
        t.assignee === profile.name.toLowerCase()
    );
    const completed = agentTasks.filter((t) => t.status === "done").length;
    const inProgress = agentTasks.filter(
      (t) => t.status === "in-progress"
    ).length;
    const total = agentTasks.length;

    // Defaults from tasks
    const currentTaskObj = agentTasks.find(
      (t) => t.status === "in-progress"
    );
    let currentTask = currentTaskObj ? currentTaskObj.title : null;
    let status: "active" | "idle" = inProgress > 0 ? "active" : "idle";
    const activeTasks = agentTasks.filter((t) => t.status !== "done").length;
    let workload = profile.isOrchestrator
      ? Math.min(100, Math.round((activeTasks / Math.max(total, 1)) * 100))
      : inProgress > 0
        ? Math.min(100, inProgress * 30 + activeTasks * 5)
        : 0;

    // 3. Override with live data if available
    const liveAgent = live.agents?.[profile.id];
    if (liveAgent) {
      if (liveAgent.status !== undefined) status = liveAgent.status;
      if (liveAgent.currentTask !== undefined)
        currentTask = liveAgent.currentTask;
      if (liveAgent.workload !== undefined) workload = liveAgent.workload;
    }

    return {
      ...profile,
      status,
      currentTask,
      tasksCompleted: completed,
      tasksInProgress: inProgress,
      tasksTotal: total,
      lastActive: live.updatedAt ?? new Date().toISOString(),
      workload,
    };
  });

  return NextResponse.json({
    agents,
    liveUpdatedAt: live.updatedAt ?? null,
  });
}
