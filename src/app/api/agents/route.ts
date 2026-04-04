import { NextResponse } from "next/server";
import { agentProfiles } from "@/data/agents";
import type { Agent } from "@/data/agents";
import { tasks } from "@/data/tasks";

export const dynamic = "force-dynamic";

export async function GET() {
  const agents: Agent[] = agentProfiles.map((profile) => {
    const agentTasks = tasks.filter((t) => t.assignee === profile.id || t.assignee === profile.name.toLowerCase());
    const completed = agentTasks.filter((t) => t.status === "done").length;
    const inProgress = agentTasks.filter((t) => t.status === "in-progress").length;
    const total = agentTasks.length;
    
    // Current task = first in-progress task, or null
    const currentTaskObj = agentTasks.find((t) => t.status === "in-progress");
    const currentTask = currentTaskObj ? currentTaskObj.title : null;
    
    // Status: active if any tasks in progress
    const status = inProgress > 0 ? "active" : "idle";
    
    // Workload: based on ratio of active+pending to total capacity
    // Orchestrator has higher baseline
    const activeTasks = agentTasks.filter((t) => t.status !== "done").length;
    let workload = 0;
    if (profile.isOrchestrator) {
      workload = Math.min(100, Math.round((activeTasks / Math.max(total, 1)) * 100));
    } else {
      workload = inProgress > 0 ? Math.min(100, inProgress * 30 + activeTasks * 5) : 0;
    }

    return {
      ...profile,
      status: status as "active" | "idle",
      currentTask,
      tasksCompleted: completed,
      tasksInProgress: inProgress,
      tasksTotal: total,
      lastActive: new Date().toISOString(),
      workload,
    };
  });

  return NextResponse.json({ agents });
}
