"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Agent } from "@/data/agents";
import type { Task, JeffColumn, AgentColumn } from "@/data/tasks";
import type { Project, Brand, Status } from "@/data/projects";
import type { FutureProject, FPriority, FStatus } from "@/data/future-projects";
import type { IdeaModel, Track, ModelStatus } from "@/data/idea-models";
import type { ResourceCategory, ResourceStatus } from "@/data/resources";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Tab = "dashboard" | "marketing" | "future" | "models" | "resources";

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */

function WorkloadRing({ pct, size = 40 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 80 ? "#FF5252" : pct >= 50 ? "#FFB800" : pct > 0 ? "#00C805" : "#2A2A2A";
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2A2A2A" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000" />
      </svg>
      <span className="absolute text-[10px] font-bold text-white">{pct}%</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB 1: DASHBOARD
   ═══════════════════════════════════════════ */

function RevenueHero() {
  const { data } = useSWR("/api/revenue", fetcher, { refreshInterval: 60000 });
  const weekRevenue = data?.weekRevenue ?? 0;
  const weekTarget = data?.weekTarget ?? 10000;
  const progress = Math.min(100, (weekRevenue / weekTarget) * 100);
  const daily = data?.daily ?? [];

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-[#9CA3AF] text-sm font-medium mb-1">Weekly Revenue</p>
          <p className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            ${weekRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 max-w-[200px] h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${progress}%`, backgroundColor: progress > 50 ? "#00C805" : progress > 20 ? "#FFB800" : "#FF5252" }} />
            </div>
            <span className="text-sm text-[#9CA3AF]">{progress.toFixed(1)}% of ${(weekTarget / 1000).toFixed(0)}K target</span>
          </div>
          <div className="flex gap-6 mt-4">
            <div>
              <p className="text-xs text-[#9CA3AF]">Month</p>
              <p className="text-lg font-bold">${(data?.monthRevenue ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Txns (Week)</p>
              <p className="text-lg font-bold">{data?.weekCount ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Txns (Month)</p>
              <p className="text-lg font-bold">{data?.monthCount ?? 0}</p>
            </div>
          </div>
        </div>
        {daily.length > 0 && (
          <div className="w-full md:w-[320px] h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daily}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C805" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C805" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#fff" }}
                  labelStyle={{ color: "#9CA3AF" }}
                  formatter={(v) => [`$${Number(v).toFixed(2)}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#00C805" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const isActive = agent.status === "active";
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <WorkloadRing pct={agent.workload} size={agent.isOrchestrator ? 48 : 40} />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1A1A1A] ${isActive ? "bg-[#00C805] animate-pulse-green" : "bg-[#FF5252]"}`} />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{agent.name}</h3>
            <p className="text-xs text-[#9CA3AF]">{agent.role}</p>
          </div>
        </div>
        <span className="text-xs text-[#9CA3AF] bg-[#2A2A2A] px-2 py-1 rounded-md">{agent.tasksCompleted}/{agent.tasksTotal ?? "?"}</span>
      </div>
      <p className="text-xs text-[#00BFFF] mb-3">{agent.specialty}</p>
      <div className="bg-[#111111] rounded-lg px-3 py-2">
        <p className="text-sm text-white">{isActive && agent.currentTask ? agent.currentTask : "Standing by"}</p>
      </div>
    </div>
  );
}

function AgentCommandCenter() {
  const { data } = useSWR("/api/agents", fetcher, { refreshInterval: 30000 });
  const agentList: Agent[] = data?.agents ?? [];
  const orchestrator = agentList.find((a) => a.isOrchestrator);
  const subAgents = agentList.filter((a) => !a.isOrchestrator);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Agent Command Center</h2>
        {data?.liveUpdatedAt && (
          <span className="text-xs text-[#9CA3AF]">
            Live &bull; {new Date(data.liveUpdatedAt).toLocaleString("en-US", { timeZone: "America/Denver", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
          </span>
        )}
      </div>

      {/* Top row: Artemis card + team image side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {orchestrator && <AgentCard agent={orchestrator} />}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden relative group">
          <video
            src="/team-office.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-85 min-h-[180px]"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-sm font-bold">The Team</p>
            <p className="text-[#9CA3AF] text-xs">1950s grit. 2026 tech.</p>
          </div>
        </div>
      </div>

      {/* Org chart connector line */}
      <div className="flex justify-center py-1">
        <div className="w-px h-6 bg-[#2A2A2A]" />
      </div>
      <div className="flex justify-center mb-2">
        <div className="h-px bg-[#2A2A2A]" style={{ width: "80%" }} />
      </div>
      <div className="flex justify-around mb-2" style={{ width: "80%", margin: "0 auto" }}>
        {subAgents.map((_, i) => (
          <div key={i} className="w-px h-4 bg-[#2A2A2A]" />
        ))}
      </div>

      {/* Sub-agents grid below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {subAgents.map((a) => <AgentCard key={a.id} agent={a} />)}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const [expanded, setExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`task-status-${task.id}`);
      return stored ?? task.status;
    }
    return task.status;
  });
  const [marking, setMarking] = useState(false);

  const priorityColors: Record<string, string> = { high: "border-l-[#FF5252]", medium: "border-l-[#FFB800]", low: "border-l-[#9CA3AF]" };
  const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
    "not-started": { bg: "bg-[#2A2A2A]", text: "text-[#9CA3AF]", label: "Not Started" },
    "in-progress": { bg: "bg-[#00BFFF]/20", text: "text-[#00BFFF]", label: "In Progress" },
    done: { bg: "bg-[#00C805]/20", text: "text-[#00C805]", label: "Done ✓" },
  };
  const badge = statusBadge[currentStatus] ?? statusBadge["not-started"];
  const hasDetails = (task.details && task.details.length > 0) || (task.links && task.links.length > 0) || task.description;

  const handleStatusClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStatus === "done") return; // already done
    setMarking(true);
    const newStatus = currentStatus === "not-started" ? "done" : "done";
    setCurrentStatus(newStatus);
    if (typeof window !== "undefined") {
      localStorage.setItem(`task-status-${task.id}`, newStatus);
      // Track done tasks for nightly sweep
      const doneList: string[] = JSON.parse(localStorage.getItem("done-tasks") ?? "[]");
      if (!doneList.includes(task.id)) {
        doneList.push(task.id);
        localStorage.setItem("done-tasks", JSON.stringify(doneList));
      }
    }
    // Notify backend
    try {
      await fetch("/api/tasks/done", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id, title: task.title, doneAt: new Date().toISOString() }),
      });
    } catch (_) { /* silent fail */ }
    setMarking(false);
  };

  if (currentStatus === "done" && task.status !== "done") {
    // Fade out done tasks marked by Jeff
    return (
      <div className={`bg-[#111111]/50 rounded-lg p-3 border-l-4 border-l-[#00C805]/30 mb-2 opacity-40`}>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#9CA3AF] line-through flex-1">{task.title}</p>
          <span className="text-xs px-2 py-0.5 rounded bg-[#00C805]/20 text-[#00C805]">Done ✓</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#111111] rounded-lg p-3 border-l-4 ${priorityColors[task.priority]} mb-2`}>
      <div className={`${hasDetails ? "cursor-pointer" : ""}`} onClick={() => hasDetails && setExpanded(!expanded)}>
        <div className="flex items-start justify-between">
          <p className="text-sm text-white font-medium flex-1">{task.title}</p>
          {hasDetails && (
            <span className="text-xs text-[#9CA3AF] ml-2 shrink-0">{expanded ? "−" : "+"}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[#9CA3AF] capitalize">{task.assignee}</span>
          <button
            onClick={handleStatusClick}
            disabled={currentStatus === "done" || marking}
            className={`text-xs px-2 py-0.5 rounded transition-all ${
              currentStatus === "done"
                ? `${badge.bg} ${badge.text} cursor-default`
                : `${badge.bg} ${badge.text} hover:bg-[#00C805]/20 hover:text-[#00C805] cursor-pointer active:scale-95`
            }`}
            title={currentStatus !== "done" ? "Click to mark as Done" : ""}
          >
            {marking ? "..." : badge.label}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#2A2A2A] space-y-3">
          {task.description && (
            <p className="text-xs text-[#9CA3AF]">{task.description}</p>
          )}
          {task.details && task.details.length > 0 && (
            <div>
              <p className="text-xs text-[#FFB800] font-semibold mb-1">Steps:</p>
              <ol className="space-y-1">
                {task.details.map((d, i) => (
                  <li key={i} className="text-xs text-[#9CA3AF] flex gap-2">
                    <span className="text-[#FFB800] shrink-0">{i + 1}.</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {task.links && task.links.length > 0 && (
            <div>
              <p className="text-xs text-[#00BFFF] font-semibold mb-1">Links:</p>
              <div className="flex flex-wrap gap-2">
                {task.links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer"
                    className="text-xs bg-[#00BFFF]/10 text-[#00BFFF] px-2 py-1 rounded hover:bg-[#00BFFF]/20 transition-colors">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function KanbanBoard({ title, tasks, columns }: { title: string; tasks: Task[]; columns: { key: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(200px, 1fr))` }}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.key);
          return (
            <div key={col.key}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">{col.label}</h3>
                <span className="text-xs text-[#9CA3AF] bg-[#2A2A2A] px-2 py-0.5 rounded-full">{colTasks.length}</span>
              </div>
              <div className="min-h-[100px]">
                {colTasks.map((t) => <TaskCard key={t.id} task={t} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskBoards() {
  const { data } = useSWR("/api/tasks", fetcher, { refreshInterval: 30000 });
  const allTasks: Task[] = data?.tasks ?? [];
  const jCols: { key: JeffColumn; label: string }[] = data?.jeffColumns ?? [];
  const aCols: { key: AgentColumn; label: string }[] = data?.agentColumns ?? [];
  return (
    <div className="space-y-8">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 overflow-x-auto">
        <KanbanBoard title="Waiting on Jeff" tasks={allTasks.filter((t) => t.board === "jeff")} columns={jCols} />
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 overflow-x-auto">
        <KanbanBoard title="Agent Workflow" tasks={allTasks.filter((t) => t.board === "agent")} columns={aCols} />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const brandColor: Record<Brand, string> = { "augeo-health": "#00BFFF", artemis: "#00C805" };
  const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
    active: { bg: "bg-[#00C805]/20", text: "text-[#00C805]", label: "Active" },
    "in-progress": { bg: "bg-[#00BFFF]/20", text: "text-[#00BFFF]", label: "In Progress" },
    planned: { bg: "bg-[#2A2A2A]", text: "text-[#9CA3AF]", label: "Planned" },
    existing: { bg: "bg-[#FFB800]/20", text: "text-[#FFB800]", label: "Existing" },
  };
  const s = statusStyles[project.status];
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 hover:bg-[#222222] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: brandColor[project.brand] }}>
            {project.brand === "augeo-health" ? "Augeo Health" : "Artemis"}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">{project.name}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-md ${s.bg} ${s.text}`}>{s.label}</span>
      </div>
      <p className="text-sm text-[#9CA3AF] mb-3">{project.description}</p>
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-[#111111] rounded-lg px-3 py-2">
          <p className="text-xs text-[#9CA3AF]">{project.keyMetric.label}</p>
          <p className="text-lg font-bold text-white">{project.keyMetric.value}</p>
        </div>
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer" className="text-sm text-[#00BFFF] hover:underline">
            {project.url.replace("https://", "")}
          </a>
        )}
      </div>
      <div className="space-y-1">
        {project.recentActivity.slice(0, 3).map((a, i) => <p key={i} className="text-xs text-[#9CA3AF]">{a}</p>)}
      </div>
    </div>
  );
}

function ProjectsGrid() {
  const { data } = useSWR("/api/projects", fetcher, { refreshInterval: 60000 });
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data?.projects ?? []).map((p: Project) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  );
}

function SocialMetrics() {
  const { data } = useSWR("/api/twitter", fetcher, { refreshInterval: 120000 });
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Social & Content</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "X Followers", value: data?.followerCount, sub: data?.handle ?? "@Artemis_jeff" },
          { label: "Total Tweets", value: data?.tweetCount },
          { label: "Likes", value: data?.likeCount },
          { label: "FB Followers", value: 50, sub: "Augeo Agency" },
        ].map((m, i) => (
          <div key={i} className="bg-[#111111] rounded-lg p-4">
            <p className="text-xs text-[#9CA3AF]">{m.label}</p>
            <p className="text-2xl font-bold text-white">{m.value ?? "--"}</p>
            {m.sub && <p className="text-xs text-[#9CA3AF]">{m.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardTab() {
  return (
    <div className="space-y-8">
      <RevenueHero />
      <AgentCommandCenter />
      <TaskBoards />
      <ProjectsGrid />
      <SocialMetrics />
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB 2: FUTURE PROJECTS
   ═══════════════════════════════════════════ */

function FutureProjectsTab() {
  const { data } = useSWR("/api/future-projects", fetcher, { refreshInterval: 60000 });
  const [filter, setFilter] = useState<"all" | FPriority>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | FStatus>("all");
  const projects: FutureProject[] = data?.projects ?? [];
  const filtered = projects
    .filter((p) => filter === "all" || p.priority === filter)
    .filter((p) => statusFilter === "all" || p.status === statusFilter);

  const priorityColors: Record<FPriority, string> = { high: "#FF5252", medium: "#FFB800", low: "#9CA3AF" };
  const statusColors: Record<FStatus, { bg: string; text: string }> = {
    idea: { bg: "bg-[#8B5CF6]/20", text: "text-[#8B5CF6]" },
    scoping: { bg: "bg-[#00BFFF]/20", text: "text-[#00BFFF]" },
    "ready-to-build": { bg: "bg-[#00C805]/20", text: "text-[#00C805]" },
    active: { bg: "bg-[#00C805]/20", text: "text-[#00C805]" },
    done: { bg: "bg-[#9CA3AF]/20", text: "text-[#9CA3AF]" },
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: projects.length },
          { label: "High Priority", value: projects.filter((p) => p.priority === "high").length, color: "#FF5252" },
          { label: "Scoping", value: projects.filter((p) => p.status === "scoping").length, color: "#00BFFF" },
          { label: "Active", value: projects.filter((p) => p.status === "active" || p.status === "done").length, color: "#00C805" },
          { label: "Ideas", value: projects.filter((p) => p.status === "idea").length, color: "#8B5CF6" },
        ].map((k, i) => (
          <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF]">{k.label}</p>
            <p className="text-3xl font-extrabold" style={{ color: k.color ?? "#fff" }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-[#9CA3AF] self-center mr-1">Priority:</span>
        {(["all", "high", "medium", "low"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? "bg-white text-black" : "bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333]"}`}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="text-xs text-[#9CA3AF] self-center ml-4 mr-1">Status:</span>
        {(["all", "idea", "scoping", "active", "done"] as const).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === f ? "bg-white text-black" : "bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333]"}`}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      <p className="text-sm text-[#9CA3AF]">Showing {filtered.length} of {projects.length}</p>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((p) => {
          const s = statusColors[p.status] ?? statusColors.idea;
          return (
            <div key={p.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 border-l-4" style={{ borderLeftColor: priorityColors[p.priority] }}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs text-[#9CA3AF]">{p.category}</span>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: priorityColors[p.priority] + "33", color: priorityColors[p.priority] }}>
                    {p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-md ${s.bg} ${s.text}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1).replace("-", " ")}</span>
                </div>
              </div>
              <p className="text-sm text-[#9CA3AF] mb-3">{p.description}</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-[#111111] rounded-lg p-3">
                  <p className="text-xs text-[#9CA3AF]">Revenue Model</p>
                  <p className="text-sm font-semibold text-white">{p.revenueModel}</p>
                </div>
                <div className="bg-[#111111] rounded-lg p-3">
                  <p className="text-xs text-[#9CA3AF]">Est. Revenue</p>
                  <p className="text-sm font-semibold text-white">{p.estimatedRevenue}</p>
                </div>
              </div>
              {p.notes.length > 0 && (
                <ul className="space-y-1">
                  {p.notes.map((n, i) => <li key={i} className="text-xs text-[#9CA3AF]">-- {n}</li>)}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB 3: IDEA MODELS
   ═══════════════════════════════════════════ */

function IdeaModelsTab() {
  const { data } = useSWR("/api/idea-models", fetcher, { refreshInterval: 60000 });
  const [trackFilter, setTrackFilter] = useState<"all" | Track>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ModelStatus>("all");
  const models: IdeaModel[] = data?.models ?? [];
  const filtered = models
    .filter((m) => trackFilter === "all" || m.track === trackFilter)
    .filter((m) => statusFilter === "all" || m.status === statusFilter);

  const trackColors: Record<Track, string> = { healthcare: "#00BFFF", artemis: "#00C805", personal: "#FFB800" };
  const effortColors: Record<string, string> = { low: "#00C805", medium: "#FFB800", high: "#FF5252" };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-[#9CA3AF] self-center mr-1">Track:</span>
        {(["all", "healthcare", "artemis", "personal"] as const).map((f) => (
          <button key={f} onClick={() => setTrackFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${trackFilter === f ? "bg-white text-black" : "bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333]"}`}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="text-xs text-[#9CA3AF] self-center ml-4 mr-1">Status:</span>
        {(["all", "ready-now", "needs-scoping", "future"] as const).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === f ? "bg-white text-black" : "bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#333]"}`}>
            {f === "all" ? "All" : f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      <p className="text-sm text-[#9CA3AF]">Showing {filtered.length} of {models.length}</p>

      <div className="space-y-4">
        {filtered.map((m) => (
          <div key={m.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase" style={{ color: trackColors[m.track] }}>{m.track}</span>
                  <span className="text-xs text-[#9CA3AF]">{m.type}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: effortColors[m.effort] + "33", color: effortColors[m.effort] }}>
                  {m.effort} effort
                </span>
                <span className="text-xs px-2 py-1 rounded-md bg-[#2A2A2A] text-[#9CA3AF]">{m.status.replace(/-/g, " ")}</span>
              </div>
            </div>
            <p className="text-sm text-[#9CA3AF] mb-4">{m.description}</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-[#111111] rounded-lg p-3">
                <p className="text-xs text-[#9CA3AF]">Monthly Potential</p>
                <p className="text-sm font-bold text-white">{m.monthlyPotential}</p>
              </div>
              <div className="bg-[#111111] rounded-lg p-3">
                <p className="text-xs text-[#9CA3AF]">Time to Revenue</p>
                <p className="text-sm font-bold text-white">{m.timeToRevenue}</p>
              </div>
              <div className="bg-[#111111] rounded-lg p-3">
                <p className="text-xs text-[#9CA3AF]">Cost to Launch</p>
                <p className="text-sm font-bold text-white">{m.costToLaunch}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-[#9CA3AF] font-medium mb-1">How it works</p>
              <ul className="space-y-1">
                {m.howItWorks.map((step, i) => <li key={i} className="text-xs text-[#9CA3AF]">{i + 1}. {step}</li>)}
              </ul>
            </div>

            <div className="bg-[#111111] rounded-lg p-3 mb-3">
              <p className="text-xs text-[#9CA3AF] mb-1">Why it wins</p>
              <p className="text-sm text-white">{m.whyItWins}</p>
            </div>

            {m.dependencies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-[#9CA3AF]">Needs:</span>
                {m.dependencies.map((d, i) => <span key={i} className="text-xs bg-[#2A2A2A] text-[#9CA3AF] px-2 py-0.5 rounded">{d}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB 4: RESOURCES
   ═══════════════════════════════════════════ */

function ResourcesTab() {
  const { data } = useSWR("/api/resources", fetcher, { refreshInterval: 60000 });
  const categories: ResourceCategory[] = data?.resources ?? [];

  const statusStyles: Record<ResourceStatus, { bg: string; text: string }> = {
    Live: { bg: "bg-[#00C805]/20", text: "text-[#00C805]" },
    Active: { bg: "bg-[#00BFFF]/20", text: "text-[#00BFFF]" },
    Setup: { bg: "bg-[#2A2A2A]", text: "text-[#9CA3AF]" },
    Existing: { bg: "bg-[#FFB800]/20", text: "text-[#FFB800]" },
    Internal: { bg: "bg-[#FF5252]/20", text: "text-[#FF5252]" },
    Repo: { bg: "bg-[#2A2A2A]", text: "text-[#9CA3AF]" },
    "Test Mode": { bg: "bg-[#FFB800]/20", text: "text-[#FFB800]" },
  };

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.category} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            <h3 className="text-lg font-bold text-white">{cat.category}</h3>
            <span className="text-xs text-[#9CA3AF] bg-[#2A2A2A] px-2 py-0.5 rounded-full">{cat.items.length}</span>
          </div>
          <div className="space-y-2">
            {cat.items.map((item) => {
              const s = statusStyles[item.status] ?? statusStyles.Setup;
              return (
                <a key={item.name} href={item.url} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between bg-[#111111] rounded-lg p-3 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-[#00BFFF] transition-colors truncate">{item.name}</p>
                    <p className="text-xs text-[#9CA3AF] truncate">{item.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-md shrink-0 ml-3 ${s.bg} ${s.text}`}>{item.status}</span>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TAB: MARKETING
   ═══════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function KpiCard({ label, value, sub, color, prefix, suffix }: { label: string; value: any; sub?: string; color?: string; prefix?: string; suffix?: string }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
      <p className="text-xs text-[#9CA3AF] mb-1">{label}</p>
      <p className="text-2xl font-extrabold" style={{ color: color ?? "#fff" }}>
        {prefix}{typeof value === "number" ? value.toLocaleString("en-US", { minimumFractionDigits: value % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 }) : value}{suffix}
      </p>
      {sub && <p className="text-xs text-[#9CA3AF] mt-1">{sub}</p>}
    </div>
  );
}

function MarketingTab() {
  const { data } = useSWR("/api/marketing", fetcher, { refreshInterval: 60000 });
  const kpis = data?.kpis ?? {};
  const sites = data?.sites ?? [];
  const channels = data?.channels ?? [];
  const funnel = data?.funnel ?? {};

  const brandColors: Record<string, string> = { "augeo-health": "#00BFFF", artemis: "#00C805" };

  return (
    <div className="space-y-8">
      {/* KPI Header Row */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Marketing KPIs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <KpiCard label="Monthly Revenue" value={kpis.monthlyRevenue ?? 0} prefix="$" color="#00C805" sub={`Target: $${((kpis.revenueTarget ?? 10000) * 4).toLocaleString()}/mo`} />
          <KpiCard label="Weekly Revenue" value={kpis.weeklyRevenue ?? 0} prefix="$" color="#00C805" sub={`${(kpis.revenueProgress ?? 0).toFixed(1)}% of $10K target`} />
          <KpiCard label="Avg Order Value" value={kpis.avgOrderValue ?? 0} prefix="$" />
          <KpiCard label="Total Customers" value={kpis.totalCustomers ?? 0} color="#00BFFF" />
          <KpiCard label="Customer Acquisition Cost" value={kpis.customerAcquisitionCost ?? 0} prefix="$" color={kpis.customerAcquisitionCost > 0 ? "#FFB800" : "#00C805"} sub="$0 = organic" />
          <KpiCard label="LTV:CAC Ratio" value={kpis.ltcCacRatio ?? "N/A"} color="#8B5CF6" sub="Target: >3:1" />
        </div>
      </div>

      {/* Sales Funnel */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Sales Funnel</h2>
        <div className="space-y-3">
          {[
            { label: "Visitors", value: funnel.visitors ?? 0, color: "#9CA3AF", width: "100%" },
            { label: "Leads (Email Captured)", value: funnel.leads ?? 0, color: "#00BFFF", width: funnel.visitors ? `${Math.max(5, (funnel.leads / funnel.visitors) * 100)}%` : "60%" },
            { label: "Customers (Purchased)", value: funnel.customers ?? 0, color: "#00C805", width: funnel.visitors ? `${Math.max(5, (funnel.customers / funnel.visitors) * 100)}%` : "20%" },
            { label: "Revenue", value: `$${(funnel.revenue ?? 0).toFixed(2)}`, color: "#8B5CF6", width: "15%" },
          ].map((step, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#9CA3AF]">{step.label}</span>
                <span className="text-sm font-bold" style={{ color: step.color }}>{typeof step.value === "number" ? step.value.toLocaleString() : step.value}</span>
              </div>
              <div className="h-8 bg-[#2A2A2A] rounded-lg overflow-hidden">
                <div className="h-full rounded-lg transition-all duration-1000 flex items-center pl-3"
                  style={{ width: step.width, backgroundColor: step.color + "33", borderLeft: `3px solid ${step.color}` }}>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF] mt-4">Visitor data populates once Vercel Analytics is enabled in project settings.</p>
      </div>

      {/* Site Performance */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Site Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#9CA3AF] text-xs uppercase tracking-wider border-b border-[#2A2A2A]">
                <th className="text-left py-3 pr-4">Site</th>
                <th className="text-right py-3 px-3">Visitors</th>
                <th className="text-right py-3 px-3">Conversions</th>
                <th className="text-right py-3 px-3">Conv. Rate</th>
                <th className="text-right py-3 px-3">Revenue</th>
                <th className="text-right py-3 pl-3">AOV</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {sites.map((site: any, i: number) => (
                <tr key={i} className="border-b border-[#2A2A2A]/50 hover:bg-[#222222] transition-colors">
                  <td className="py-3 pr-4">
                    <div>
                      <span className="text-xs font-bold uppercase" style={{ color: brandColors[site.brand] ?? "#9CA3AF" }}>
                        {site.brand === "augeo-health" ? "Augeo Health" : "Artemis"}
                      </span>
                      <p className="text-white font-medium">{site.name}</p>
                      <a href={`https://${site.domain}`} target="_blank" rel="noreferrer" className="text-xs text-[#9CA3AF] hover:text-[#00BFFF]">{site.domain}</a>
                    </div>
                  </td>
                  <td className="text-right py-3 px-3 text-white">{site.visitors ?? "--"}</td>
                  <td className="text-right py-3 px-3 text-white">{site.conversions}</td>
                  <td className="text-right py-3 px-3">
                    <span className={site.conversionRate > 2 ? "text-[#00C805]" : "text-[#9CA3AF]"}>
                      {site.conversionRate > 0 ? `${site.conversionRate.toFixed(1)}%` : "--"}
                    </span>
                  </td>
                  <td className="text-right py-3 px-3 text-white font-semibold">${site.revenue.toFixed(2)}</td>
                  <td className="text-right py-3 pl-3 text-[#9CA3AF]">{site.avgOrderValue > 0 ? `$${site.avgOrderValue.toFixed(2)}` : "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Channel Attribution */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Channel Attribution</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#9CA3AF] text-xs uppercase tracking-wider border-b border-[#2A2A2A]">
                <th className="text-left py-3 pr-4">Channel</th>
                <th className="text-right py-3 px-3">Leads</th>
                <th className="text-right py-3 px-3">Conversions</th>
                <th className="text-right py-3 px-3">Revenue</th>
                <th className="text-right py-3 px-3">CAC</th>
                <th className="text-right py-3 pl-3">ROI</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {channels.map((ch: any, i: number) => (
                <tr key={i} className="border-b border-[#2A2A2A]/50 hover:bg-[#222222] transition-colors">
                  <td className="py-3 pr-4 text-white font-medium">{ch.channel}</td>
                  <td className="text-right py-3 px-3 text-white">{ch.leads || "--"}</td>
                  <td className="text-right py-3 px-3 text-white">{ch.conversions || "--"}</td>
                  <td className="text-right py-3 px-3 text-white font-semibold">{ch.revenue > 0 ? `$${ch.revenue.toFixed(2)}` : "--"}</td>
                  <td className="text-right py-3 px-3 text-[#9CA3AF]">{ch.costPerAcquisition > 0 ? `$${ch.costPerAcquisition.toFixed(2)}` : "$0"}</td>
                  <td className="text-right py-3 pl-3">
                    <span className={ch.roi === "Infinite" ? "text-[#00C805]" : "text-[#9CA3AF]"}>{ch.roi}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content & Social KPIs */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Content & Social</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard label="X Followers" value={kpis.totalPosts ?? 0} sub="@Artemis_jeff" />
          <KpiCard label="Email Subscribers" value={kpis.emailSubscribers ?? 0} sub="Beehiiv" />
          <KpiCard label="Total Posts" value={kpis.totalPosts ?? 0} sub="X + LinkedIn + FB" />
          <KpiCard label="Engagement Rate" value="--" sub="Coming soon" />
        </div>
      </div>

      {/* Goals Tracker */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Goals & Benchmarks</h2>
        <div className="space-y-4">
          {[
            { label: "$10K/week revenue", current: kpis.weeklyRevenue ?? 0, target: 10000, color: "#00C805" },
            { label: "100 email subscribers", current: kpis.emailSubscribers ?? 0, target: 100, color: "#00BFFF" },
            { label: "500 X followers", current: 0, target: 500, color: "#8B5CF6" },
            { label: "5 qualified sales leads", current: 0, target: 5, color: "#FFB800" },
            { label: "2% site conversion rate", current: 0, target: 2, color: "#FF5252" },
          ].map((goal, i) => {
            const pct = Math.min(100, (goal.current / goal.target) * 100);
            return (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white">{goal.label}</span>
                  <span className="text-sm font-bold" style={{ color: goal.color }}>
                    {typeof goal.current === "number" && goal.label.includes("$") ? `$${goal.current.toLocaleString()}` : goal.current} / {goal.label.includes("$") ? `$${goal.target.toLocaleString()}` : goal.target}
                  </span>
                </div>
                <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${pct}%`, backgroundColor: goal.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

const tabs: { key: Tab; label: string; dot: string }[] = [
  { key: "dashboard", label: "Dashboard", dot: "#00C805" },
  { key: "marketing", label: "Marketing", dot: "#8B5CF6" },
  { key: "future", label: "Future Projects", dot: "#FFB800" },
  { key: "models", label: "Idea Models", dot: "#FF5252" },
  { key: "resources", label: "Resources", dot: "#00BFFF" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <main className="min-h-screen bg-[#0D0D0D] p-4 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Project HQ</h1>
        <span className="text-xs text-[#9CA3AF]">Live data</span>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab.key ? "bg-white text-black" : "bg-[#1A1A1A] text-[#9CA3AF] hover:bg-[#222222] hover:text-white"
            }`}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tab.dot }} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "marketing" && <MarketingTab />}
      {activeTab === "future" && <FutureProjectsTab />}
      {activeTab === "models" && <IdeaModelsTab />}
      {activeTab === "resources" && <ResourcesTab />}
    </main>
  );
}
