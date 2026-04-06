"use client";

import { useState } from "react";
import {
  projects,
  getProjectsByBrand,
  getArchivedProjects,
  getAggregateKPIs,
  type Brand,
  type Status,
  type Trend,
  type Project,
} from "@/data/projects";
import {
  agents,
  agentStatusStyles,
  getActiveAgentCount,
  getIdleAgentCount,
  type SubAgent,
} from "@/data/agents";

const brandColors: Record<Brand, string> = {
  "augeo-health": "#22c55e",
  artemis: "#f59e0b",
};

const brandLabels: Record<Brand | "all", string> = {
  all: "All Projects",
  "augeo-health": "Augeo Health",
  artemis: "Artemis",
};

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  "in-progress": { bg: "bg-blue-100", text: "text-blue-700", label: "In Progress" },
  planned: { bg: "bg-gray-100", text: "text-gray-600", label: "Planned" },
  existing: { bg: "bg-purple-100", text: "text-purple-700", label: "Existing" },
  archived: { bg: "bg-stone-100", text: "text-stone-500", label: "Archived" },
};

const trendIcons: Record<Trend, { icon: string; color: string }> = {
  up: { icon: "▲", color: "text-green-500" },
  down: { icon: "▼", color: "text-red-500" },
  flat: { icon: "—", color: "text-gray-400" },
};

function AgentCard({ agent }: { agent: SubAgent }) {
  const style = agentStatusStyles[agent.status];
  return (
    <div className={`rounded-xl border border-gray-200 p-5 ${style.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${style.dot} ${agent.status === "active" ? "animate-pulse" : ""}`} />
          <h3 className="font-bold text-[#1e3a5f] text-sm">{agent.name}</h3>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.text} bg-white/60`}>
          {style.label}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3">{agent.description}</p>
      {agent.currentTask && (
        <div className="bg-white/80 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-gray-400">Current Task</p>
          <p className="text-sm font-medium text-[#1e3a5f]">{agent.currentTask}</p>
        </div>
      )}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{agent.tasksCompleted} tasks completed</span>
        <span>{agent.capabilities.length} capabilities</span>
      </div>
    </div>
  );
}

function KPICard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-extrabold text-[#1e3a5f] mt-1">{value}</p>
      {detail && <p className="text-xs text-gray-400 mt-1">{detail}</p>}
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const status = statusStyles[project.status];
  const trend = trendIcons[project.keyMetric.trend];

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-md transition-shadow w-full"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: brandColors[project.brand] }}
          >
            {project.brand.toUpperCase()}
          </span>
          <h3 className="text-lg font-bold text-[#1e3a5f] mt-1">{project.name}</h3>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-400">{project.keyMetric.label}</p>
          <p className="text-xl font-bold text-[#1e3a5f]">{project.keyMetric.value}</p>
        </div>
        <span className={`text-lg ${trend.color}`}>{trend.icon}</span>
      </div>
    </button>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const status = statusStyles[project.status];

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-[#1e3a5f] mb-4 flex items-center gap-1">
        ← Back to Dashboard
      </button>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">{project.name}</h1>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
          {status.label}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: brandColors[project.brand] }}>
          {project.brand.toUpperCase()}
        </span>
      </div>

      <p className="text-gray-600 mb-8">{project.description}</p>

      {/* Quick Links */}
      {(project.url || project.github || project.stripeUrl) && (
        <div className="flex gap-3 mb-8 flex-wrap">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm bg-[#1e3a5f] text-white px-4 py-2 rounded-lg hover:bg-[#2a4a73] transition-colors">
              Live Site ↗
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              GitHub ↗
            </a>
          )}
          {project.stripeUrl && (
            <a href={project.stripeUrl} target="_blank" rel="noopener noreferrer" className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Stripe ↗
            </a>
          )}
        </div>
      )}

      {/* KPIs */}
      <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Key Performance Indicators</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {project.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-[#1e3a5f]">{kpi.value}</p>
              {kpi.trend && <span className={`text-sm ${trendIcons[kpi.trend].color}`}>{trendIcons[kpi.trend].icon}</span>}
            </div>
            {kpi.detail && <p className="text-xs text-gray-400 mt-1">{kpi.detail}</p>}
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Recent Activity</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-3">
          {project.recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] mt-2 shrink-0" />
              <p className="text-sm text-gray-600">{activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeBrand, setActiveBrand] = useState<Brand | "all">("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [showArchived, setShowArchived] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState("");

  const filteredProjects = getProjectsByBrand(activeBrand);
  const archivedProjects = getArchivedProjects();
  const filteredArchived = archiveSearch
    ? archivedProjects.filter(
        (p) =>
          p.name.toLowerCase().includes(archiveSearch.toLowerCase()) ||
          p.description.toLowerCase().includes(archiveSearch.toLowerCase())
      )
    : archivedProjects;
  const agg = getAggregateKPIs(activeBrand);
  const detail = selectedProject ? projects.find((p) => p.id === selectedProject) : null;

  return (
    <div className="min-h-screen">
      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1e3a5f] min-h-screen p-6 hidden lg:block">
          <h1 className="text-white text-xl font-bold mb-1">Project HQ</h1>
          <p className="text-blue-300 text-xs mb-8">Jeff Oldroyd - Updated 2:32 PM</p>

          <nav className="space-y-2">
            {(["all", "augeo-health", "artemis"] as const).map((brand) => (
              <button
                key={brand}
                onClick={() => { setActiveBrand(brand); setSelectedProject(null); }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  activeBrand === brand
                    ? "bg-white/10 text-white"
                    : "text-blue-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{
                    backgroundColor: brand === "all" ? "#fff" : brandColors[brand as Brand],
                  }}
                />
                {brandLabels[brand]}
              </button>
            ))}
            <div className="mt-6 mb-2 px-4">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Sub-Agents</p>
            </div>
            {agents.map((agent) => {
              const style = agentStatusStyles[agent.status];
              return (
                <div
                  key={agent.id}
                  className="w-full text-left px-4 py-2 rounded-lg text-blue-200 text-sm font-medium flex items-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full ${style.dot} ${agent.status === "active" ? "animate-pulse" : ""}`} />
                  <span className="truncate">{agent.name}</span>
                </div>
              );
            })}
            <a
              href="/future"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block mt-4"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-amber-400" />
              Future Projects
            </a>
            <a
              href="/models"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-pink-400" />
              Idea Models
            </a>
            <a
              href="/resources"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-blue-400" />
              Resources
            </a>
          </nav>

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-blue-300 text-xs">Revenue Target</p>
            <p className="text-white text-lg font-bold">$10,000/week</p>
            <p className="text-blue-300 text-xs mt-1">by May 25, 2026</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Mobile brand toggle */}
          <div className="flex gap-2 mb-6 lg:hidden">
            {(["all", "augeo-health", "artemis"] as const).map((brand) => (
              <button
                key={brand}
                onClick={() => { setActiveBrand(brand); setSelectedProject(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeBrand === brand
                    ? "bg-[#1e3a5f] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {brandLabels[brand]}
              </button>
            ))}
          </div>

          {detail ? (
            <ProjectDetail project={detail} onBack={() => setSelectedProject(null)} />
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">
                  {brandLabels[activeBrand]}
                </h1>
                <p className="text-gray-500 mt-1">
                  {activeBrand === "all"
                    ? "Overview of all projects across Augeo Health and Artemis"
                    : `Projects under the ${brandLabels[activeBrand]} brand`}
                </p>
              </div>

              {/* Aggregate KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <KPICard label="Total Projects" value={agg.totalProjects} />
                <KPICard label="Active" value={agg.activeProjects} />
                <KPICard label="In Progress" value={agg.inProgress} />
                <KPICard label="Planned" value={agg.planned} />
              </div>

              {/* Revenue Targets */}
              <div className="bg-[#1e3a5f] rounded-xl p-6 mb-8 text-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-blue-200 text-sm">Weekly Target</p>
                    <p className="text-2xl font-extrabold">$10,000</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">This Week</p>
                    <p className="text-2xl font-extrabold text-[#22c55e]">$0</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">This Month</p>
                    <p className="text-2xl font-extrabold">$0</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">All Time</p>
                    <p className="text-2xl font-extrabold">$0</p>
                  </div>
                </div>
              </div>

              {/* Agent Status */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#1e3a5f]">Sub-Agents</h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-gray-500">{getActiveAgentCount()} Active</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400" />
                      <span className="text-gray-500">{getIdleAgentCount()} Idle</span>
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>

              {/* Project Cards */}
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project.id)}
                  />
                ))}
              </div>

              {/* Archived Activities */}
              {archivedProjects.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <button
                    onClick={() => setShowArchived(!showArchived)}
                    className="flex items-center gap-3 text-gray-500 hover:text-[#1e3a5f] transition-colors mb-4"
                  >
                    <span className={`text-sm transition-transform ${showArchived ? "rotate-90" : ""}`}>▶</span>
                    <h2 className="text-lg font-bold">Archived Activities</h2>
                    <span className="text-sm font-normal bg-gray-100 px-2 py-0.5 rounded-full">
                      {archivedProjects.length}
                    </span>
                  </button>

                  {showArchived && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search archived items..."
                        value={archiveSearch}
                        onChange={(e) => setArchiveSearch(e.target.value)}
                        className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-200 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                      />
                      {filteredArchived.length === 0 ? (
                        <p className="text-sm text-gray-400">No archived items match your search.</p>
                      ) : (
                        <div className="space-y-3">
                          {filteredArchived.map((project) => (
                            <div
                              key={project.id}
                              className="bg-stone-50 rounded-xl border border-stone-200 p-5 flex items-start justify-between"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-bold text-stone-600 text-sm">{project.name}</h3>
                                  <span
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{ color: brandColors[project.brand] }}
                                  >
                                    {project.brand === "augeo-health" ? "AUGEO HEALTH" : "ARTEMIS"}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-500 mb-2">{project.description}</p>
                                <div className="flex items-center gap-4 text-xs text-stone-400">
                                  {project.archivedDate && <span>Archived: {project.archivedDate}</span>}
                                  <span>{project.keyMetric.label}: {project.keyMetric.value}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedProject(project.id)}
                                className="text-xs text-stone-400 hover:text-[#1e3a5f] ml-4 shrink-0"
                              >
                                View →
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
