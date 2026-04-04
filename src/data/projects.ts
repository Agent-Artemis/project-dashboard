export type Brand = "augeo-health" | "artemis";
export type Status = "active" | "in-progress" | "planned" | "existing" | "archived";
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
  archivedDate?: string;
}

export const projects: Project[] = [
  // ===== ACTIVE PROJECTS =====
  {
    id: "ccm-rpm-calculator",
    name: "CCM/RPM Revenue Calculator",
    brand: "augeo-health",
    status: "active",
    description:
      "Paid calculator tool for healthcare practices to estimate CCM and RPM revenue potential. Includes PDF export, ROI scenarios, and strategy call booking.",
    url: "https://calculator.augeohealth.com",
    github: "https://github.com/Agent-Artemis/ccm-revenue-calculator",
    stripeUrl: "https://dashboard.stripe.com",
    keyMetric: { label: "Revenue", value: "$0", trend: "flat" },
    kpis: [
      { label: "Total Revenue", value: "$0", trend: "flat", detail: "Launched 3/28" },
      { label: "Purchases", value: "0", trend: "flat" },
      { label: "Page Views", value: "--", trend: "flat", detail: "Vercel Analytics enabled" },
      { label: "Conversion Rate", value: "--", trend: "flat" },
      { label: "Strategy Calls Booked", value: "0", trend: "flat" },
    ],
    recentActivity: [
      "2026-04-01: Live on custom domain calculator.augeohealth.com",
      "2026-03-31: Rebranded from HCIP to Augeo Health",
      "2026-03-30: Stripe LIVE keys deployed",
      "2026-03-28: Launched with CCM + RPM calculators, PDF export, promo codes",
    ],
  },
  {
    id: "healthcare-playbook",
    name: "Healthcare AI Playbook",
    brand: "augeo-health",
    status: "active",
    description:
      "85-page, 16-chapter playbook on AI in healthcare operations. Augeo Health branded. $49 via Stripe Payment Link.",
    url: "https://playbook.augeohealth.com",
    github: "https://github.com/Agent-Artemis/hcip-playbook",
    stripeUrl: "https://buy.stripe.com/7sY00kcqn8QR3Kc14K6kg01",
    keyMetric: { label: "Revenue", value: "$49", trend: "up" },
    kpis: [
      { label: "Total Revenue", value: "$49", trend: "up", detail: "First sale 4/1!" },
      { label: "Purchases", value: "1", trend: "up" },
      { label: "Page Views", value: "--", trend: "flat", detail: "Vercel Analytics enabled" },
      { label: "Test Coupon", value: "TESTJEFFHC", trend: "flat", detail: "$49 -> $1" },
    ],
    recentActivity: [
      "2026-04-01: FIRST REVENUE -- Jeff test purchase validated full pipeline",
      "2026-04-01: Live on custom domain playbook.augeohealth.com",
      "2026-04-01: Sales funnel: Landing -> Capture (email/newsletter) -> Checkout -> Download",
      "2026-03-31: Rebranded from HCIP to Augeo Health",
      "2026-03-30: 85 pages, 16 chapters written and deployed",
    ],
  },
  {
    id: "ai-playbook",
    name: "AI Playbook",
    brand: "artemis",
    status: "active",
    description:
      "59-page, 13-chapter playbook on putting AI to work. Artemis branded. $29 via Stripe Payment Link.",
    url: "https://playbook.agentartemis.ai",
    github: "https://github.com/Agent-Artemis/artemis-playbook",
    stripeUrl: "https://buy.stripe.com/6oUfZiaiffff6Wo9Bg6kg00",
    keyMetric: { label: "Revenue", value: "$0", trend: "flat" },
    kpis: [
      { label: "Total Revenue", value: "$0", trend: "flat" },
      { label: "Purchases", value: "0", trend: "flat" },
      { label: "Page Views", value: "--", trend: "flat", detail: "Vercel Analytics enabled" },
      { label: "Test Coupon", value: "TESTJEFF", trend: "flat", detail: "$29 -> $1" },
    ],
    recentActivity: [
      "2026-04-01: Live on custom domain playbook.agentartemis.ai",
      "2026-04-01: Sales funnel with email capture + Beehiiv integration",
      "2026-03-30: 59 pages, 13 chapters written and deployed",
    ],
  },
  {
    id: "augeohealth-site",
    name: "Augeo Health Website",
    brand: "augeo-health",
    status: "active",
    description:
      "Healthcare consulting homepage. Blue/teal design. Links to calculator, playbook, and strategy call booking.",
    url: "https://augeohealth.com",
    github: "https://github.com/Agent-Artemis/augeohealth-site",
    keyMetric: { label: "Status", value: "Live", trend: "up" },
    kpis: [
      { label: "Page Views", value: "--", trend: "flat", detail: "Vercel Analytics enabled" },
      { label: "Bounce Rate", value: "--", trend: "flat" },
      { label: "Calls Booked", value: "0", trend: "flat" },
    ],
    recentActivity: [
      "2026-04-01: Built and deployed on custom domain",
      "2026-04-01: DNS managed via Namecheap API",
    ],
  },
  {
    id: "agentartemis-site",
    name: "Agent Artemis Website",
    brand: "artemis",
    status: "active",
    description:
      "Artemis brand homepage. Dark theme, bold hero. Links to AI Playbook and Augeo Health.",
    url: "https://agentartemis.ai",
    github: "https://github.com/Agent-Artemis/agentartemis-site",
    keyMetric: { label: "Status", value: "Live", trend: "up" },
    kpis: [
      { label: "Page Views", value: "--", trend: "flat", detail: "Vercel Analytics enabled" },
      { label: "Bounce Rate", value: "--", trend: "flat" },
    ],
    recentActivity: [
      "2026-04-01: Built and deployed on custom domain",
      "2026-04-01: Hero: Think Big. Move Fast. Get Results.",
    ],
  },
  {
    id: "content-newsletter",
    name: "Content & Newsletter",
    brand: "artemis",
    status: "in-progress",
    description:
      "Beehiiv newsletter, X/Twitter (@Artemis_jeff), YouTube, LinkedIn. Dual-brand content engine driving inbound.",
    keyMetric: { label: "X Posts", value: "3", trend: "up" },
    kpis: [
      { label: "Email Subscribers", value: "0", trend: "flat", detail: "Beehiiv" },
      { label: "X Followers", value: "--", trend: "flat", detail: "@Artemis_jeff" },
      { label: "X Posts", value: "3", trend: "up", detail: "Jeff intro + 2 Artemis" },
      { label: "YouTube Subs", value: "0", trend: "flat" },
      { label: "LinkedIn", value: "Pending", trend: "flat", detail: "Drafts ready for review" },
    ],
    recentActivity: [
      "2026-04-03: Charlie content push drafted, awaiting Jeff review",
      "2026-04-03: Dennis LinkedIn drafts ready for review",
      "2026-03-31: 3 posts published on X (Jeff intro + 2 Artemis)",
      "2026-03-31: Jeff's headshot uploaded as X profile pic",
    ],
  },

  // ===== IN PROGRESS =====
  {
    id: "partner-program",
    name: "Channel Partner Program",
    brand: "augeo-health",
    status: "in-progress",
    description:
      "Affiliate and channel partner program across all products. Consultants, billing companies, associations sell for us. Jeff closes partners, Artemis handles fulfillment.",
    keyMetric: { label: "Partners", value: "0", trend: "flat" },
    kpis: [
      { label: "Partners Recruited", value: "0", trend: "flat" },
      { label: "Partner Revenue", value: "$0", trend: "flat" },
      { label: "Commission Paid", value: "$0", trend: "flat" },
    ],
    recentActivity: [
      "2026-04-04: Scaling framework defined -- baked into all products",
      "2026-04-04: Tier structure: Consultants (20-30%), Associations (15-20%), EHR vendors (10-15%), Billing cos (25%)",
    ],
  },
  {
    id: "acquisition-tracker",
    name: "Acquisition Tracker Platform",
    brand: "augeo-health",
    status: "planned",
    description:
      "Platform for tracking acquisition targets across sectors (503B pharmacies, RV parks, storage, home health). Supports the HCIP acquisitions project.",
    keyMetric: { label: "Status", value: "Planned", trend: "flat" },
    kpis: [
      { label: "Targets Tracked", value: "0", trend: "flat" },
      { label: "Sectors", value: "7", trend: "flat", detail: "503B, RV, Storage, Home Health, Dental, HVAC, Vet" },
    ],
    recentActivity: [
      "2026-04-03: HCIP acquisition report delivered (4 sectors)",
      "2026-04-03: 503B compliance arbitrage strategy defined",
      "2026-04-02: Native American SBA-like loan structure identified ($5M match)",
    ],
  },
  {
    id: "trading-experiment",
    name: "60-Day Trading Experiment",
    brand: "artemis",
    status: "in-progress",
    description:
      "Aggressive 60-day trading experiment. $300 funded via Alpaca (paper + live). Document everything, then package as a book.",
    keyMetric: { label: "Balance", value: "$300", trend: "flat" },
    kpis: [
      { label: "Starting Balance", value: "$300", trend: "flat" },
      { label: "Current Balance", value: "$300", trend: "flat" },
      { label: "Paper Trading", value: "Starts Mon 4/7", trend: "flat" },
      { label: "Live Trading", value: "Starts Thu 4/10", trend: "flat" },
    ],
    recentActivity: [
      "2026-04-03: Alpaca connected -- Paper $100K + Live $300, crypto active",
      "2026-04-03: Strategy doc finalized, 20% gain ratchet rule set",
      "2026-04-02: Project scoped, Robinhood $300 funded",
    ],
  },
  {
    id: "voice-ai-platform",
    name: "Healthcare Voice AI",
    brand: "augeo-health",
    status: "planned",
    description:
      "AI voice platform (Retell) for patient outreach, pre-auth calls, and AR/billing follow-up. One build, three use cases. HIPAA compliant.",
    keyMetric: { label: "Status", value: "Planned", trend: "flat" },
    kpis: [
      { label: "Use Cases", value: "3", trend: "flat", detail: "Outreach, Pre-Auth, AR" },
      { label: "Platform", value: "Retell AI", trend: "flat", detail: "HIPAA, SOC 2, ~$0.20/min" },
      { label: "Go-to-Market", value: "Billing cos first", trend: "flat" },
    ],
    recentActivity: [
      "2026-04-03: Benny framework + Evelyn grant mapping delivered",
      "2026-03-31: Jeff unified 3 use cases into one platform build",
      "2026-03-29: Retell AI selected as platform",
    ],
  },
  {
    id: "healthcare-analytics",
    name: "Healthcare Practice Analytics",
    brand: "augeo-health",
    status: "planned",
    description:
      "Analytics dashboard for healthcare practices using API Ninjas data. Competitor analysis, market saturation, demographics. Sold through channel partners.",
    keyMetric: { label: "Status", value: "Scoping", trend: "flat" },
    kpis: [
      { label: "Target Price", value: "$99-299/mo", trend: "flat" },
      { label: "Channel", value: "Partners", trend: "flat", detail: "Consultants, billing cos" },
    ],
    recentActivity: [
      "2026-04-04: Concept defined -- API Ninjas powered, channel-sold",
      "2026-04-04: Revenue model: per-practice subscription + white-label option",
    ],
  },

  // ===== EXISTING =====
  {
    id: "ccm-rpm-consulting",
    name: "CCM/RPM Consulting",
    brand: "augeo-health",
    status: "planned",
    description:
      "Fractional COO / implementation consulting for practices launching CCM/RPM programs.",
    keyMetric: { label: "Pipeline", value: "$0", trend: "flat" },
    kpis: [
      { label: "Pipeline Value", value: "$0", trend: "flat" },
      { label: "Active Clients", value: "0", trend: "flat" },
      { label: "Calls Scheduled", value: "0", trend: "flat" },
    ],
    recentActivity: [
      "2026-03-28: Cal.com booking page created",
    ],
  },
  {
    id: "4afulllife",
    name: "4afulllife.com",
    brand: "artemis",
    status: "existing",
    description:
      "White-label SaaS coaching software. Body, Being, Balance, Business framework.",
    url: "https://4afulllife.com",
    keyMetric: { label: "Status", value: "Existing", trend: "flat" },
    kpis: [
      { label: "MRR", value: "--", trend: "flat" },
      { label: "Active Users", value: "--", trend: "flat" },
    ],
    recentActivity: ["Pre-existing product"],
  },
];

export function getProjectsByBrand(brand: Brand | "all"): Project[] {
  if (brand === "all") return projects.filter((p) => p.status !== "archived");
  return projects.filter((p) => p.brand === brand && p.status !== "archived");
}

export function getArchivedProjects(): Project[] {
  return projects.filter((p) => p.status === "archived");
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getAggregateKPIs(brand: Brand | "all") {
  const filtered = brand === "all" 
    ? projects.filter((p) => p.status !== "archived")
    : projects.filter((p) => p.brand === brand && p.status !== "archived");
  return {
    totalProjects: filtered.length,
    activeProjects: filtered.filter((p) => p.status === "active").length,
    inProgress: filtered.filter((p) => p.status === "in-progress").length,
    planned: filtered.filter((p) => p.status === "planned").length,
  };
}
