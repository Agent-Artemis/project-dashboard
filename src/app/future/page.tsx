"use client";

import { useState } from "react";

interface FutureProject {
  id: string;
  name: string;
  category: string;
  description: string;
  revenueModel: string;
  estimatedRevenue: string;
  priority: "high" | "medium" | "low";
  status: "idea" | "scoping" | "ready-to-build";
  notes: string[];
  dateAdded: string;
}

const futureProjects: FutureProject[] = [
  {
    id: "guided-journaling-app",
    name: "Guided Journaling App",
    category: "Mobile App",
    description:
      "Standalone journaling app for men and women. Daily guided prompts, progress tracking, reflection tools. Broad market, separate brand from 4afulllife.",
    revenueModel: "Subscription — $5-$10/month",
    estimatedRevenue: "$3,750-$7,500/mo at 500 subscribers",
    priority: "high",
    status: "idea",
    notes: [
      "Standalone product — NOT tied to 4afulllife",
      "Broad audience: men and women",
      "React Native / Expo build",
      "Needs: brand name, target audience refinement, feature spec",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "youth-coaching-app",
    name: "Youth Coaching App",
    category: "Mobile App",
    description:
      "4afulllife coaching framework adapted for young people. Same proven structure, repositioned for teens/young adults.",
    revenueModel: "Subscription — $5-$10/month",
    estimatedRevenue: "$3,750-$7,500/mo at 500 subscribers",
    priority: "high",
    status: "idea",
    notes: [
      "Based on existing 4afulllife framework",
      "Repositioning play — content structure already exists",
      "Age target: likely 13+ (avoids COPPA complexity)",
      "Needs: age-appropriate content adaptation, brand identity",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "sub-agents",
    name: "Artemis Sub-Agent Team",
    category: "Infrastructure",
    description:
      "Specialized sub-agents managed by Artemis. Content agent, code agent, research agent — building a delegatable AI team.",
    revenueModel: "Internal capability — accelerates all projects",
    estimatedRevenue: "Force multiplier",
    priority: "medium",
    status: "idea",
    notes: [
      "Enables parallel execution across projects",
      "Each agent has specialized skills and context",
      "Artemis orchestrates and delegates",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "ai-playbook",
    name: "How to Put an AI to Work",
    category: "Digital Product",
    description:
      "PDF playbook for giving an AI a real job. Identity, memory, tools, safety, operating relationship. The Artemis brand flagship product.",
    revenueModel: "One-time purchase — $29",
    estimatedRevenue: "Depends on volume — $2,900 per 100 sales",
    priority: "high",
    status: "scoping",
    notes: [
      "Already listed on Artemis site as 'Coming Soon'",
      "FelixCraft model — single product, public dashboard",
      "Needs: content written, Stripe live keys, Gumroad listing",
    ],
    dateAdded: "2026-03-28",
  },
];

const priorityStyles = {
  high: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "High" },
  medium: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "Medium" },
  low: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200", label: "Low" },
};

const statusStyles = {
  idea: { bg: "bg-purple-100", text: "text-purple-700", label: "Idea" },
  scoping: { bg: "bg-blue-100", text: "text-blue-700", label: "Scoping" },
  "ready-to-build": { bg: "bg-green-100", text: "text-green-700", label: "Ready to Build" },
};

const categoryColors: Record<string, string> = {
  "Mobile App": "#8b5cf6",
  "Digital Product": "#f59e0b",
  Infrastructure: "#6b7280",
};

export default function FutureProjectsPage() {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filtered = filter === "all"
    ? futureProjects
    : futureProjects.filter((p) => p.priority === filter);

  const highCount = futureProjects.filter((p) => p.priority === "high").length;
  const totalEstimatedMRR = "$7,500 - $17,900+";

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1e3a5f] min-h-screen p-6 hidden lg:block">
          <h1 className="text-white text-xl font-bold mb-1">Project HQ</h1>
          <p className="text-blue-300 text-xs mb-8">Jeff Oldroyd</p>

          <nav className="space-y-2">
            <a
              href="/"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-white" />
              Dashboard
            </a>
            <div className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-amber-400" />
              Future Projects
            </div>
            <a
              href="/resources"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-blue-400" />
              Resources
            </a>
          </nav>

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-blue-300 text-xs">Pipeline Potential</p>
            <p className="text-white text-lg font-bold">{totalEstimatedMRR}</p>
            <p className="text-blue-300 text-xs mt-1">est. monthly if all ship</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Mobile nav */}
          <div className="flex gap-2 mb-6 lg:hidden flex-wrap">
            <a href="/" className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-600">
              Dashboard
            </a>
            <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#1e3a5f] text-white">
              Future Projects
            </div>
            <a href="/resources" className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-600">
              Resources
            </a>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">Future Projects</h1>
            <p className="text-gray-500 mt-1">
              Ideas, scoped projects, and what's next in the pipeline.
            </p>
          </div>

          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 font-medium">Total Ideas</p>
              <p className="text-3xl font-extrabold text-[#1e3a5f] mt-1">{futureProjects.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 font-medium">High Priority</p>
              <p className="text-3xl font-extrabold text-red-600 mt-1">{highCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 font-medium">Ready to Build</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">
                {futureProjects.filter((p) => p.status === "ready-to-build").length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 font-medium">Est. MRR Potential</p>
              <p className="text-xl font-extrabold text-[#1e3a5f] mt-1">{totalEstimatedMRR}</p>
              <p className="text-xs text-gray-400 mt-1">if all projects ship</p>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {(["all", "high", "medium", "low"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filter === f
                    ? "bg-[#1e3a5f] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {f === "all" ? "All" : `${f.charAt(0).toUpperCase() + f.slice(1)} Priority`}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="space-y-6">
            {filtered.map((project) => {
              const priority = priorityStyles[project.priority];
              const status = statusStyles[project.status];
              const catColor = categoryColors[project.category] || "#6b7280";

              return (
                <div
                  key={project.id}
                  className={`bg-white rounded-xl border-2 ${priority.border} p-6`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: catColor }}
                        >
                          {project.category}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-400">Added {project.dateAdded}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1e3a5f]">{project.name}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priority.bg} ${priority.text}`}>
                        {priority.label}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 font-medium">Revenue Model</p>
                      <p className="text-sm font-semibold text-[#1e3a5f]">{project.revenueModel}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 font-medium">Estimated Revenue</p>
                      <p className="text-sm font-semibold text-[#1e3a5f]">{project.estimatedRevenue}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-2">Notes</p>
                    <ul className="space-y-1">
                      {project.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gray-300 mt-0.5 text-xs">--</span>
                          <span className="text-sm text-gray-500">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-sm text-gray-400">
            <p>Ideas captured in real-time. Priorities shift as we execute.</p>
            <p className="mt-1">Last updated: March 29, 2026</p>
          </div>
        </main>
      </div>
    </div>
  );
}
