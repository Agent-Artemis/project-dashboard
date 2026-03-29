"use client";

import { useState } from "react";
import {
  getProjectsByBrand,
  type Status,
  type Trend,
  type Project,
} from "@/data/projects";

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  "in-progress": { bg: "bg-blue-100", text: "text-blue-700", label: "In Progress" },
  planned: { bg: "bg-gray-100", text: "text-gray-600", label: "Planned" },
  existing: { bg: "bg-purple-100", text: "text-purple-700", label: "Existing" },
};

const trendIcons: Record<Trend, { icon: string; color: string }> = {
  up: { icon: "▲", color: "text-green-500" },
  down: { icon: "▼", color: "text-red-500" },
  flat: { icon: "—", color: "text-gray-400" },
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const status = statusStyles[project.status];
  const trend = trendIcons[project.keyMetric.trend];

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-md transition-shadow w-full"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-[#1e3a5f]">{project.name}</h3>
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
      </div>

      <p className="text-gray-600 mb-8">{project.description}</p>

      {(project.url || project.github) && (
        <div className="flex gap-3 mb-8 flex-wrap">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm bg-[#1e3a5f] text-white px-4 py-2 rounded-lg hover:bg-[#2a4a73] transition-colors">
              Live Site ↗
            </a>
          )}
        </div>
      )}

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

export default function HCIPDashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const hcipProjects = getProjectsByBrand("hcip");
  const detail = selectedProject ? hcipProjects.find((p) => p.id === selectedProject) : null;

  const activeCount = hcipProjects.filter((p) => p.status === "active").length;
  const plannedCount = hcipProjects.filter((p) => p.status === "planned").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                HCIP <span className="text-[#22c55e]">Dashboard</span>
              </h1>
              <p className="text-blue-200 text-sm mt-1">Health Care Industry Partners</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-blue-200 text-xs">Partner Portal</p>
              <p className="text-white text-sm font-medium">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {detail ? (
          <ProjectDetail project={detail} onBack={() => setSelectedProject(null)} />
        ) : (
          <>
            {/* KPI Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 font-medium">Total Projects</p>
                <p className="text-3xl font-extrabold text-[#1e3a5f] mt-1">{hcipProjects.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 font-medium">Active</p>
                <p className="text-3xl font-extrabold text-[#22c55e] mt-1">{activeCount}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 font-medium">Planned</p>
                <p className="text-3xl font-extrabold text-[#1e3a5f] mt-1">{plannedCount}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 font-medium">Revenue (MTD)</p>
                <p className="text-3xl font-extrabold text-[#1e3a5f] mt-1">$0</p>
                <p className="text-xs text-gray-400 mt-1">Tracking begins at launch</p>
              </div>
            </div>

            {/* Revenue Bar */}
            <div className="bg-[#1e3a5f] rounded-xl p-6 mb-8 text-white">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-blue-200 text-sm">Calculator Sales</p>
                  <p className="text-2xl font-extrabold text-[#22c55e]">$0</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Consulting Pipeline</p>
                  <p className="text-2xl font-extrabold">$0</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Strategy Calls Booked</p>
                  <p className="text-2xl font-extrabold">0</p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">HCIP Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {hcipProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-blue-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Health Care Industry Partners. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
