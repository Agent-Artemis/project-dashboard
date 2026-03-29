export type Brand = "hcip" | "augeo";
export type Status = "active" | "in-progress" | "planned" | "existing";
export type Trend = "up" | "down" | "flat";

export interface ProjectKPI {
  label: string;
  value: string;
  trend?: Trend;
  detail?: string;
}

export interface Project {
  id: string;
  name: string;
  brand: Brand;
  status: Status;
  description: string;
  url?: string;
  github?: string;
  stripeUrl?: string;
  keyMetric: { label: string; value: string; trend: Trend };
  kpis: ProjectKPI[];
  recentActivity: string[];
}

export const projects: Project[] = [
  {
    id: "ccm-rpm-calculator",
    name: "CCM/RPM Revenue Calculator",
    brand: "hcip",
    status: "active",
    description:
      "Paid calculator tool for healthcare practices to estimate CCM and RPM revenue potential. Includes PDF export, ROI scenarios, and strategy call booking.",
    url: "https://ccm-revenue-calculator.vercel.app",
    github: "https://github.com/Agent-Artemis/ccm-revenue-calculator",
    stripeUrl: "https://dashboard.stripe.com",
    keyMetric: { label: "Revenue", value: "$0", trend: "up" },
    kpis: [
      { label: "Total Revenue", value: "$0", trend: "up", detail: "Launched 3/28/2026" },
      { label: "Purchases", value: "0", trend: "flat" },
      { label: "Page Views", value: "--", trend: "flat", detail: "Analytics pending" },
      { label: "Conversion Rate", value: "--", trend: "flat" },
      { label: "Strategy Calls Booked", value: "0", trend: "flat" },
      { label: "Avg Order Value", value: "$39", trend: "flat", detail: "Bundle: $49, Individual: $29" },
    ],
    recentActivity: [
      "2026-03-28: Launched with CCM + RPM calculators",
      "2026-03-28: Added ROI scenario toggle",
      "2026-03-28: Added PDF export (HCIP branded)",
      "2026-03-28: Updated pricing to $29/$49",
      "2026-03-28: Stripe checkout + promo codes enabled",
    ],
  },
  {
    id: "ccm-rpm-consulting",
    name: "CCM/RPM Consulting",
    brand: "hcip",
    status: "planned",
    description:
      "Fractional COO / implementation consulting for healthcare practices launching CCM and RPM programs. Revenue from strategy calls booked through calculator.",
    keyMetric: { label: "Pipeline", value: "$0", trend: "flat" },
    kpis: [
      { label: "Pipeline Value", value: "$0", trend: "flat" },
      { label: "Active Clients", value: "0", trend: "flat" },
      { label: "Monthly Contract Value", value: "$0", trend: "flat" },
      { label: "Calls Scheduled", value: "0", trend: "flat" },
    ],
    recentActivity: [
      "2026-03-28: Cal.com booking page created",
      "2026-03-28: Linked to calculator CTA",
    ],
  },
  {
    id: "4afulllife",
    name: "4afulllife.com",
    brand: "augeo",
    status: "existing",
    description:
      "White-label SaaS coaching software for coaching companies. Body, Being, Balance, Business framework.",
    url: "https://4afulllife.com",
    keyMetric: { label: "Status", value: "Existing", trend: "flat" },
    kpis: [
      { label: "MRR", value: "--", trend: "flat" },
      { label: "Active Users", value: "--", trend: "flat" },
      { label: "Churn Rate", value: "--", trend: "flat" },
    ],
    recentActivity: ["Pre-existing product"],
  },
  {
    id: "ai-automation",
    name: "AI Automation Services",
    brand: "augeo",
    status: "planned",
    description:
      "AI automation consulting and implementation for businesses. Healthcare-focused initially.",
    keyMetric: { label: "Pipeline", value: "$0", trend: "flat" },
    kpis: [
      { label: "Pipeline Value", value: "$0", trend: "flat" },
      { label: "Leads", value: "0", trend: "flat" },
      { label: "Active Projects", value: "0", trend: "flat" },
    ],
    recentActivity: ["2026-03-28: Project planned"],
  },
  {
    id: "content-newsletter",
    name: "Content & Newsletter",
    brand: "augeo",
    status: "in-progress",
    description:
      "Beehiiv newsletter for audience building. X account for social distribution. YouTube for long-form content.",
    keyMetric: { label: "Subscribers", value: "0", trend: "up" },
    kpis: [
      { label: "Email Subscribers", value: "0", trend: "flat", detail: "Beehiiv" },
      { label: "X Followers", value: "0", trend: "flat", detail: "@Artemis_jeff" },
      { label: "YouTube Subscribers", value: "0", trend: "flat" },
      { label: "Tweets Posted", value: "0", trend: "flat", detail: "API pending" },
    ],
    recentActivity: [
      "2026-03-28: X account @Artemis_jeff created",
      "2026-03-28: Beehiiv account created",
      "2026-03-28: YouTube account created",
      "2026-03-28: X API keys configured (credits pending)",
      "2026-03-28: 8 tweets drafted, awaiting approval",
    ],
  },
];

export function getProjectsByBrand(brand: Brand | "all"): Project[] {
  if (brand === "all") return projects;
  return projects.filter((p) => p.brand === brand);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getAggregateKPIs(brand: Brand | "all") {
  const filtered = getProjectsByBrand(brand);
  return {
    totalProjects: filtered.length,
    activeProjects: filtered.filter((p) => p.status === "active").length,
    inProgress: filtered.filter((p) => p.status === "in-progress").length,
    planned: filtered.filter((p) => p.status === "planned").length,
  };
}
