"use client";

const resources = [
  {
    category: "Augeo Health Products",
    color: "#22c55e",
    items: [
      {
        name: "CCM/RPM Revenue Calculator",
        url: "https://ccm-revenue-calculator.vercel.app",
        description: "Paid calculator for healthcare practices — CCM + RPM revenue estimates, PDF export, ROI scenarios",
        status: "Live",
        statusColor: "bg-green-100 text-green-700",
      },
      {
        name: "CCM Calculator (Preview Bypass)",
        url: "https://ccm-revenue-calculator.vercel.app?preview=augeo2026",
        description: "Direct preview link — bypasses paywall for review",
        status: "Internal",
        statusColor: "bg-yellow-100 text-yellow-700",
      },
      {
        name: "Strategy Call Booking",
        url: "https://cal.com/agentartemis/30-minutes-with-jeff-oldroyd",
        description: "Cal.com booking page — 30-minute strategy call with Jeff",
        status: "Live",
        statusColor: "bg-green-100 text-green-700",
      },
    ],
  },
  {
    category: "Downloads",
    color: "#3b82f6",
    items: [
      {
        name: "HCIP Acquisition Targets (CSV)",
        url: "https://augeohealth.com/HCIP-Acquisition-Targets.csv",
        description: "Comprehensive list of 503B pharmacies, RV parks, storage facilities, and land opportunities for HCIP acquisition project",
        status: "Ready",
        statusColor: "bg-blue-100 text-blue-700",
      },
    ],
  },
  {
    category: "Artemis Brand",
    color: "#8b5cf6",
    items: [
      {
        name: "Artemis Product Site",
        url: "https://artemis-site-pi.vercel.app",
        description: "FelixCraft-style product site — AI-as-author positioning, AI playbook ($29 coming soon)",
        status: "Live",
        statusColor: "bg-green-100 text-green-700",
      },
      {
        name: "Artemis Public Dashboard",
        url: "https://artemis-site-pi.vercel.app/dashboard",
        description: "Public transparency dashboard — revenue, products sold, build log",
        status: "Live",
        statusColor: "bg-green-100 text-green-700",
      },
    ],
  },
  {
    category: "Dashboards",
    color: "#3b82f6",
    items: [
      {
        name: "Project HQ — All Projects",
        url: "https://dashboard-six-roan-46.vercel.app",
        description: "Internal command center — all projects across Augeo Health and Artemis",
        status: "Live",
        statusColor: "bg-green-100 text-green-700",
      },
      {
        name: "Augeo Health Partner Dashboard",
        url: "https://dashboard-six-roan-46.vercel.app/hcip",
        description: "Shareable Augeo Health-only view — safe for partners",
        status: "Live",
        statusColor: "bg-green-100 text-green-700",
      },
    ],
  },
  {
    category: "Platforms & Accounts",
    color: "#f59e0b",
    items: [
      {
        name: "X / Twitter",
        url: "https://x.com/Artemis_jeff",
        description: "@Artemis_jeff — API connected, tweets queued pending logo/approval",
        status: "Active",
        statusColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "Beehiiv Newsletter",
        url: "https://beehiiv.com",
        description: "Email newsletter platform — audience building",
        status: "Setup",
        statusColor: "bg-gray-100 text-gray-600",
      },
      {
        name: "YouTube",
        url: "https://youtube.com",
        description: "Long-form content channel",
        status: "Setup",
        statusColor: "bg-gray-100 text-gray-600",
      },
      {
        name: "Gumroad",
        url: "https://gumroad.com",
        description: "Digital product storefront",
        status: "Setup",
        statusColor: "bg-gray-100 text-gray-600",
      },
      {
        name: "4afulllife.com",
        url: "https://4afulllife.com",
        description: "White-label SaaS coaching software — Body, Being, Balance, Business",
        status: "Existing",
        statusColor: "bg-purple-100 text-purple-700",
      },
    ],
  },
  {
    category: "GitHub Repos",
    color: "#6b7280",
    items: [
      {
        name: "CCM Revenue Calculator",
        url: "https://github.com/Agent-Artemis/ccm-revenue-calculator",
        description: "Next.js 16 + Tailwind + Stripe — calculator source code",
        status: "Repo",
        statusColor: "bg-gray-100 text-gray-600",
      },
      {
        name: "Artemis Product Site",
        url: "https://github.com/Agent-Artemis/artemis-site",
        description: "Product site + public dashboard source code",
        status: "Repo",
        statusColor: "bg-gray-100 text-gray-600",
      },
    ],
  },
  {
    category: "Payments & Infrastructure",
    color: "#a855f7",
    items: [
      {
        name: "Stripe Dashboard",
        url: "https://dashboard.stripe.com",
        description: "Payments — currently in test mode, needs live keys",
        status: "Test Mode",
        statusColor: "bg-yellow-100 text-yellow-700",
      },
      {
        name: "Vercel Dashboard",
        url: "https://vercel.com/dashboard",
        description: "Hosting — all sites deployed here",
        status: "Active",
        statusColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "Namecheap",
        url: "https://namecheap.com",
        description: "Domain registrar — custom domains pending",
        status: "Setup",
        statusColor: "bg-gray-100 text-gray-600",
      },
    ],
  },
];

export default function ResourcesPage() {
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
            <a
              href="/future"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
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
            <div className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-blue-400" />
              Resources
            </div>
          </nav>

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-blue-300 text-xs">Quick Links</p>
            <div className="mt-3 space-y-2">
              <a href="https://ccm-revenue-calculator.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-200 hover:text-white block">Calculator ↗</a>
              <a href="https://artemis-site-pi.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-200 hover:text-white block">Artemis Site ↗</a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Mobile nav */}
          <div className="flex gap-2 mb-6 lg:hidden">
            <a href="/" className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-600">
              Dashboard
            </a>
            <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#1e3a5f] text-white">
              Resources
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">Resources</h1>
            <p className="text-gray-500 mt-1">
              Every link across all projects in one place. No digging required.
            </p>
          </div>

          <div className="space-y-10">
            {resources.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
                  <h2 className="text-lg font-bold text-[#1e3a5f]">{group.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow block group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#1e3a5f] group-hover:text-blue-600 transition-colors">
                          {item.name}
                          <span className="text-gray-400 ml-1 text-sm">↗</span>
                        </h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Last Updated */}
          <div className="mt-12 text-center text-sm text-gray-400">
            <p>Last updated: March 29, 2026</p>
            <p className="mt-1">Maintained by Artemis</p>
          </div>
        </main>
      </div>
    </div>
  );
}
