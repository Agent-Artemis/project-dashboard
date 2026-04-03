"use client";

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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

/* ───── Revenue Hero ───── */
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
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress > 50 ? "#00C805" : progress > 20 ? "#FFB800" : "#FF5252",
                }}
              />
            </div>
            <span className="text-sm text-[#9CA3AF]">
              {progress.toFixed(1)}% of ${(weekTarget / 1000).toFixed(0)}K target
            </span>
          </div>
          <div className="flex gap-6 mt-4">
            <div>
              <p className="text-xs text-[#9CA3AF]">Month</p>
              <p className="text-lg font-bold">${(data?.monthRevenue ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Transactions (Week)</p>
              <p className="text-lg font-bold">{data?.weekCount ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF]">Transactions (Month)</p>
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
                <Tooltip
                  contentStyle={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px", color: "#fff" }}
                  labelStyle={{ color: "#9CA3AF" }}
                  formatter={(v) => [`$${Number(v).toFixed(2)}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00C805" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── Agent Card ───── */
function AgentCard({ agent }: { agent: Agent }) {
  const isActive = agent.status === "active";
  return (
    <div
      className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 ${
        agent.isOrchestrator ? "md:col-span-full" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isActive ? "bg-[#00C805] animate-pulse-green" : "bg-[#FF5252]"
            }`}
          />
          <div>
            <h3 className="font-bold text-white text-lg">{agent.name}</h3>
            <p className="text-xs text-[#9CA3AF]">{agent.role}</p>
          </div>
        </div>
        <span className="text-xs text-[#9CA3AF] bg-[#2A2A2A] px-2 py-1 rounded-md">
          {agent.tasksCompleted} tasks
        </span>
      </div>
      <p className="text-xs text-[#00BFFF] mb-3">{agent.specialty}</p>
      <div className="bg-[#111111] rounded-lg px-3 py-2">
        <p className="text-sm text-white">
          {isActive && agent.currentTask ? agent.currentTask : "Standing by"}
        </p>
      </div>
    </div>
  );
}

/* ───── Agent Command Center ───── */
function AgentCommandCenter() {
  const { data } = useSWR("/api/agents", fetcher, { refreshInterval: 30000 });
  const agentList: Agent[] = data?.agents ?? [];
  const orchestrator = agentList.find((a) => a.isOrchestrator);
  const subAgents = agentList.filter((a) => !a.isOrchestrator);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Agent Command Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {orchestrator && <AgentCard agent={orchestrator} />}
        {subAgents.map((a) => (
          <AgentCard key={a.id} agent={a} />
        ))}
      </div>
    </div>
  );
}

/* ───── Kanban Task Card ───── */
function TaskCard({ task }: { task: Task }) {
  const priorityColors: Record<string, string> = {
    high: "border-l-[#FF5252]",
    medium: "border-l-[#FFB800]",
    low: "border-l-[#9CA3AF]",
  };
  const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
    "not-started": { bg: "bg-[#2A2A2A]", text: "text-[#9CA3AF]", label: "Not Started" },
    "in-progress": { bg: "bg-[#00BFFF]/20", text: "text-[#00BFFF]", label: "In Progress" },
    done: { bg: "bg-[#00C805]/20", text: "text-[#00C805]", label: "Done" },
  };
  const badge = statusBadge[task.status] ?? statusBadge["not-started"];

  return (
    <div className={`bg-[#111111] rounded-lg p-3 border-l-4 ${priorityColors[task.priority]} mb-2`}>
      <p className="text-sm text-white font-medium">{task.title}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-[#9CA3AF] capitalize">{task.assignee}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>
    </div>
  );
}

/* ───── Kanban Board ───── */
function KanbanBoard({
  title,
  tasks,
  columns,
}: {
  title: string;
  tasks: Task[];
  columns: { key: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(200px, 1fr))` }}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.key);
          return (
            <div key={col.key}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  {col.label}
                </h3>
                <span className="text-xs text-[#9CA3AF] bg-[#2A2A2A] px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>
              <div className="min-h-[100px]">
                {colTasks.map((t) => (
                  <TaskCard key={t.id} task={t} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───── Task Boards ───── */
function TaskBoards() {
  const { data } = useSWR("/api/tasks", fetcher, { refreshInterval: 30000 });
  const allTasks: Task[] = data?.tasks ?? [];
  const jCols: { key: JeffColumn; label: string }[] = data?.jeffColumns ?? [];
  const aCols: { key: AgentColumn; label: string }[] = data?.agentColumns ?? [];
  const jeffTasks = allTasks.filter((t) => t.board === "jeff");
  const agentTasks = allTasks.filter((t) => t.board === "agent");

  return (
    <div className="space-y-8">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 overflow-x-auto">
        <KanbanBoard title="Waiting on Jeff" tasks={jeffTasks} columns={jCols} />
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 overflow-x-auto">
        <KanbanBoard title="Agent Workflow" tasks={agentTasks} columns={aCols} />
      </div>
    </div>
  );
}

/* ───── Project Card ───── */
function ProjectCard({ project }: { project: Project }) {
  const brandColor: Record<Brand, string> = {
    "augeo-health": "#00BFFF",
    artemis: "#00C805",
  };
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
        {project.recentActivity.slice(0, 3).map((a, i) => (
          <p key={i} className="text-xs text-[#9CA3AF]">{a}</p>
        ))}
      </div>
    </div>
  );
}

/* ───── Projects Grid ───── */
function ProjectsGrid() {
  const { data } = useSWR("/api/projects", fetcher, { refreshInterval: 60000 });
  const projectList: Project[] = data?.projects ?? [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectList.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

/* ───── Social Metrics ───── */
function SocialMetrics() {
  const { data } = useSWR("/api/social", fetcher, { refreshInterval: 120000 });

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Social & Content</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111111] rounded-lg p-4">
          <p className="text-xs text-[#9CA3AF]">X Followers</p>
          <p className="text-2xl font-bold text-white">{data?.followers ?? "--"}</p>
          <p className="text-xs text-[#9CA3AF]">{data?.handle ?? "@Artemis_jeff"}</p>
        </div>
        <div className="bg-[#111111] rounded-lg p-4">
          <p className="text-xs text-[#9CA3AF]">Recent Posts</p>
          <p className="text-2xl font-bold text-white">{data?.recentTweetCount ?? "--"}</p>
        </div>
        <div className="bg-[#111111] rounded-lg p-4">
          <p className="text-xs text-[#9CA3AF]">Likes</p>
          <p className="text-2xl font-bold text-white">{data?.totalLikes ?? "--"}</p>
        </div>
        <div className="bg-[#111111] rounded-lg p-4">
          <p className="text-xs text-[#9CA3AF]">Retweets</p>
          <p className="text-2xl font-bold text-white">{data?.totalRetweets ?? "--"}</p>
        </div>
      </div>
    </div>
  );
}

/* ───── Main Page ───── */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] p-4 md:p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Project HQ
        </h1>
        <span className="text-xs text-[#9CA3AF]">Live data refreshes every 30-60s</span>
      </div>
      <RevenueHero />
      <AgentCommandCenter />
      <TaskBoards />
      <ProjectsGrid />
      <SocialMetrics />
    </main>
  );
}
