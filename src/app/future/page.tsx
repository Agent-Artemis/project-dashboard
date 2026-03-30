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
  // === HIGH PRIORITY ===
  {
    id: "pre-auth-software",
    name: "Pre-Auth Software w/ HIPAA Compliance",
    category: "Healthcare SaaS",
    description:
      "Prior authorization automation software. HIPAA-compliant. One of the biggest pain points in healthcare -- hours wasted on phone calls and faxes for insurance approvals.",
    revenueModel: "TBD -- SaaS subscription likely",
    estimatedRevenue: "TBD -- high potential",
    priority: "high",
    status: "scoping",
    notes: [
      "Jeff's #1 priority from idea list",
      "Target: clinics specifically",
      "Needs: workflow definition, buyer profile, revenue model",
      "HIPAA compliance is table stakes -- must be built in from day one",
      "AI can automate submission, tracking, and follow-up with payers",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "ai-playbook",
    name: "How to Put an AI to Work",
    category: "Digital Product",
    description:
      "PDF playbook for giving an AI a real job. Identity, memory, tools, safety, operating relationship. The Artemis brand flagship product.",
    revenueModel: "One-time purchase -- $29",
    estimatedRevenue: "$2,900 per 100 sales",
    priority: "high",
    status: "scoping",
    notes: [
      "Already listed on Artemis site as 'Coming Soon'",
      "FelixCraft model -- single product, public dashboard",
      "Needs: content written, Stripe live keys, Gumroad listing",
    ],
    dateAdded: "2026-03-28",
  },
  {
    id: "guided-journaling-app",
    name: "Guided Journaling App",
    category: "Mobile App",
    description:
      "Standalone journaling app for men and women. Daily guided prompts, progress tracking, reflection tools. Broad market, separate brand from 4afulllife.",
    revenueModel: "Subscription -- $5-$10/month",
    estimatedRevenue: "$3,750-$7,500/mo at 500 subs",
    priority: "high",
    status: "idea",
    notes: [
      "Standalone product -- NOT tied to 4afulllife",
      "Broad audience: men and women",
      "React Native / Expo build",
      "Needs: brand name, feature spec",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "youth-coaching-app",
    name: "Youth Coaching App",
    category: "Mobile App",
    description:
      "4afulllife coaching framework adapted for young people. Same proven structure, repositioned for teens/young adults.",
    revenueModel: "Subscription -- $5-$10/month",
    estimatedRevenue: "$3,750-$7,500/mo at 500 subs",
    priority: "high",
    status: "idea",
    notes: [
      "Based on existing 4afulllife framework",
      "Repositioning play -- content structure exists",
      "Age target: likely 13+",
      "Needs: age-appropriate content adaptation, brand identity",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "ccm-rpm-clients",
    name: "CCM/RPM Clients",
    category: "Healthcare Consulting",
    description:
      "Land CCM/RPM implementation clients. Fractional COO contracts for practices launching chronic care management and remote patient monitoring programs.",
    revenueModel: "Consulting contracts",
    estimatedRevenue: "TBD -- per contract",
    priority: "high",
    status: "idea",
    notes: [
      "Calculator + strategy calls are the lead gen funnel",
      "Jeff's core expertise -- MHA, ran nursing homes",
      "Needs: outreach strategy, pipeline building",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "medsync-clients",
    name: "MedSync Clients",
    category: "Healthcare",
    description:
      "MedSync client acquisition. Details TBD.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "high",
    status: "idea",
    notes: [
      "Jeff to add details",
    ],
    dateAdded: "2026-03-29",
  },
  // === MEDIUM PRIORITY ===
  {
    id: "radical-stone",
    name: "Radical Stone -- ID & UT Builders",
    category: "Business Development",
    description:
      "Find construction/builder companies in Idaho and Utah for Radical Stone.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Target market: builders in ID and UT",
      "Jeff to add details on Radical Stone relationship",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "blakes-supplements",
    name: "Blake's Supplements",
    category: "Health & Wellness",
    description:
      "Supplement business or partnership. Details TBD. Connected to 'Ask Blake' note.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Related contact: Blake",
      "Jeff to add details",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "spv-raise",
    name: "SPV Raise (Real Estate)",
    category: "Real Estate / Finance",
    description:
      "Special Purpose Vehicle fundraise for real estate investment.",
    revenueModel: "Investment returns / fees",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Jeff to add details on deal structure",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "ai-training",
    name: "AI Training",
    category: "Education / Services",
    description:
      "AI training services or courses. Teaching businesses or individuals how to use AI effectively.",
    revenueModel: "TBD -- courses, workshops, or consulting",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Natural extension of the Artemis brand and AI playbook",
      "Jeff to add details on format and audience",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "hormone-business",
    name: "Hormone Business",
    category: "Health & Wellness",
    description:
      "Hormone therapy or optimization business. Details TBD.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Jeff to add details",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "exosome-hair",
    name: "Exosome Hair Package",
    category: "Health & Wellness",
    description:
      "Exosome-based hair restoration treatment package.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Jeff to add details on pricing, partnerships, target market",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "4afulllife-os",
    name: "4a Full Life OS",
    category: "Coaching SaaS",
    description:
      "Operating system / platform evolution of 4afulllife.com coaching software.",
    revenueModel: "TBD -- likely subscription",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Evolution of existing 4afulllife.com platform",
      "Jeff to add details on what 'OS' means here",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "copywriter-rfp",
    name: "Copywriter Searches & RFP Applications",
    category: "Services / Automation",
    description:
      "Automated search for copywriting opportunities and RFP application submissions.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Could be an Artemis automation -- AI finds and applies to RFPs",
      "Jeff to add details",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "re-opportunity-zone",
    name: "RE / Opportunity Zone",
    category: "Real Estate / Finance",
    description:
      "Real estate search combined with Opportunity Zone investing. These two overlap -- find RE deals in qualified OZs for tax-advantaged returns.",
    revenueModel: "Investment returns + tax benefits",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Overlay between RE search and OZ investing -- not separate plays",
      "Jeff to add details on target zones, deal size",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "personal-re",
    name: "Personal Real Estate",
    category: "Real Estate",
    description:
      "Personal real estate projects or investments.",
    revenueModel: "Equity / cash flow",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Jeff to add details",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "investment",
    name: "Investment Agent",
    category: "Finance",
    description:
      "Personal investment agent for Jeff. AI-managed investment research, opportunity tracking, and portfolio analysis.",
    revenueModel: "Personal use -- ROI on investments",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Personal tool for Jeff, not a product to sell",
      "Artemis handles research, tracking, and analysis",
      "Jeff to add details on investment focus areas",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "personal-trainer",
    name: "Personal Trainer",
    category: "Health & Wellness",
    description:
      "Personal training service or app. Details TBD.",
    revenueModel: "TBD",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Jeff to add details -- service, app, or platform?",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "fundraiser-nonprofit",
    name: "Fundraiser for Non-Profit -- Helping Captives (HC)",
    category: "Non-Profit",
    description:
      "Fundraising for Helping Captives, a healthcare-focused non-profit. Fundraiser events, campaigns, donor outreach.",
    revenueModel: "Non-profit fundraising",
    estimatedRevenue: "N/A -- charitable",
    priority: "medium",
    status: "idea",
    notes: [
      "Healthcare-focused non-profit",
      "Related contacts: Caleb & Nate",
      "Jeff to add details on fundraising goals and timeline",
    ],
    dateAdded: "2026-03-29",
  },
  // === NEW IDEAS (3/29 evening) ===
  {
    id: "product-lab",
    name: "Product Lab",
    category: "SaaS / Education",
    description:
      "Tool that walks people through the full product lifecycle: idea validation, patents, production/manufacturing, and selling. End-to-end guided product development.",
    revenueModel: "TBD -- SaaS subscription or high-ticket course",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Full lifecycle: idea -> patents -> manufacturing -> sales",
      "Nobody does this well in one place",
      "Could be AI-guided with step-by-step workflows",
      "Jeff to add details on format and audience",
    ],
    dateAdded: "2026-03-29",
  },
  {
    id: "business-in-a-box",
    name: "Business in a Box",
    category: "SaaS / Education",
    description:
      "Turnkey setup for new entrepreneurs. Everything needed to launch a business: LLC formation, branding, website, payments, first product -- all guided in one system.",
    revenueModel: "TBD -- subscription, one-time fee, or service",
    estimatedRevenue: "TBD",
    priority: "medium",
    status: "idea",
    notes: [
      "Meta play -- build the machine that builds businesses",
      "Could be AI-guided or done-for-you service",
      "Jeff to add details on target entrepreneur type",
    ],
    dateAdded: "2026-03-29",
  },
  // === INFRASTRUCTURE ===
  {
    id: "sub-agents",
    name: "Artemis Sub-Agent Team",
    category: "Infrastructure",
    description:
      "Specialized sub-agents managed by Artemis. Content agent, code agent, research agent -- building a delegatable AI team.",
    revenueModel: "Internal capability -- accelerates all projects",
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
  "Healthcare SaaS": "#ef4444",
  "Healthcare Consulting": "#22c55e",
  Healthcare: "#22c55e",
  "Digital Product": "#f59e0b",
  "Mobile App": "#8b5cf6",
  "Coaching SaaS": "#8b5cf6",
  "Health & Wellness": "#ec4899",
  "Business Development": "#f97316",
  "Real Estate / Finance": "#0ea5e9",
  "Real Estate": "#0ea5e9",
  Finance: "#0ea5e9",
  "Education / Services": "#6366f1",
  "Services / Automation": "#6366f1",
  "SaaS / Education": "#10b981",
  "Non-Profit": "#14b8a6",
  Infrastructure: "#6b7280",
};

export default function FutureProjectsPage() {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(futureProjects.map((p) => p.category)))];

  const filtered = futureProjects
    .filter((p) => filter === "all" || p.priority === filter)
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter);

  const highCount = futureProjects.filter((p) => p.priority === "high").length;
  const scopingCount = futureProjects.filter((p) => p.status === "scoping").length;

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
            <p className="text-blue-300 text-xs">Pipeline</p>
            <p className="text-white text-2xl font-bold">{futureProjects.length}</p>
            <p className="text-blue-300 text-xs mt-1">ideas in the hopper</p>
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
              The full idea pipeline. {futureProjects.length} projects across {categories.length - 1} categories.
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
              <p className="text-sm text-gray-500 font-medium">Scoping</p>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{scopingCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 font-medium">Ready to Build</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">
                {futureProjects.filter((p) => p.status === "ready-to-build").length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              <p className="text-sm text-gray-400 font-medium self-center mr-1">Priority:</p>
              {(["all", "high", "medium", "low"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filter === f
                      ? "bg-[#1e3a5f] text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="text-sm text-gray-400 font-medium self-center mr-1">Category:</p>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 text-gray-600 border-0"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-4">
            Showing {filtered.length} of {futureProjects.length} projects
          </p>

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
            <p>Ideas captured in real-time. Send updates to Artemis to refine.</p>
            <p className="mt-1">Last updated: March 29, 2026</p>
          </div>
        </main>
      </div>
    </div>
  );
}
