export type Brand = "augeo-health" | "artemis";
export type Status = "active" | "in-progress" | "planned" | "existing";

export interface Project {
  id: string;
  name: string;
  brand: Brand;
  status: Status;
  description: string;
  url?: string;
  keyMetric: { label: string; value: string };
  recentActivity: string[];
}

export const projects: Project[] = [
  {
    id: "ccm-rpm-calculator",
    name: "CCM/RPM Revenue Calculator",
    brand: "augeo-health",
    status: "active",
    description: "Paid calculator for healthcare practices to estimate CCM and RPM revenue potential. PDF export, ROI scenarios, strategy call booking.",
    url: "https://calculator.augeohealth.com",
    keyMetric: { label: "Status", value: "Live" },
    recentActivity: [
      "2026-04-01: Custom domain live (calculator.augeohealth.com)",
      "2026-03-31: Rebranded from HCIP to Augeo Health",
      "2026-03-28: Launched with CCM + RPM calculators",
    ],
  },
  {
    id: "ai-playbook",
    name: "AI Playbook ($29)",
    brand: "artemis",
    status: "active",
    description: "59 pages, 13 chapters. How to actually build with AI. Stripe Payment Link checkout + instant PDF download.",
    url: "https://playbook.agentartemis.ai",
    keyMetric: { label: "Price", value: "$29" },
    recentActivity: [
      "2026-04-01: Custom domain live (playbook.agentartemis.ai)",
      "2026-04-01: Stripe Payment Link checkout working",
      "2026-03-30: 59-page playbook written and deployed",
    ],
  },
  {
    id: "healthcare-playbook",
    name: "Healthcare AI Playbook ($49)",
    brand: "augeo-health",
    status: "active",
    description: "85 pages, 16 chapters. AI for healthcare ops. Augeo x co-brand. First revenue April 1.",
    url: "https://playbook.augeohealth.com",
    keyMetric: { label: "Price", value: "$49" },
    recentActivity: [
      "2026-04-01: FIRST REVENUE -- Jeff tested card + Apple Pay, both clean",
      "2026-04-01: Custom domain live (playbook.augeohealth.com)",
      "2026-03-30: 85-page healthcare playbook written",
    ],
  },
  {
    id: "augeohealth-site",
    name: "Augeo Health Site",
    brand: "augeo-health",
    status: "active",
    description: "Professional healthcare consulting homepage. Services, calculator, playbook, booking.",
    url: "https://augeohealth.com",
    keyMetric: { label: "Status", value: "Live" },
    recentActivity: [
      "2026-04-01: Custom domain live",
      "2026-03-31: Built and deployed from scratch",
    ],
  },
  {
    id: "artemis-site",
    name: "Artemis Site",
    brand: "artemis",
    status: "active",
    description: "Artemis brand homepage. Dark theme, AI education, playbook link, About Jeff.",
    url: "https://agentartemis.ai",
    keyMetric: { label: "Status", value: "Live" },
    recentActivity: [
      "2026-04-01: Custom domain live",
      "2026-03-31: Built and deployed",
    ],
  },
  {
    id: "voice-ai-platform",
    name: "Voice AI Platform",
    brand: "augeo-health",
    status: "in-progress",
    description: "Retell-powered AI voice platform. Patient outreach, pre-auth, AR calls. 3 use cases, one build.",
    keyMetric: { label: "Phase", value: "Spec" },
    recentActivity: [
      "2026-04-01: Full framework, grant mapping, and CCM call prepper spec delivered",
      "2026-04-01: Key numbers: $0.70/call cost, $3.00 revenue, 69% margins at scale",
      "2026-04-01: Awaiting Jeff's framework review",
    ],
  },
  {
    id: "content-social",
    name: "Content & Social",
    brand: "artemis",
    status: "active",
    description: "X/Twitter, Beehiiv newsletter, social distribution. Dual-brand posting.",
    keyMetric: { label: "X Posts", value: "5" },
    recentActivity: [
      "2026-04-01: 3 posts published (sites + playbooks launch)",
      "2026-03-31: 2 posts (Jeff intro + Artemis intro)",
      "2026-04-02-03: Gap -- content calendar ready but not posted",
    ],
  },
  {
    id: "thegrant-ninja",
    name: "TheGrant.Ninja",
    brand: "artemis",
    status: "active",
    description: "Federal, state & private grant search engine. 9 live APIs. Free + $97/mo pro.",
    url: "https://thegrant.ninja",
    keyMetric: { label: "APIs Connected", value: "9" },
    recentActivity: [
      "2026-04-10: 9 API sources live and unified endpoint built",
      "2026-04-09: Expanded from 3 to 9 grant sources",
      "2026-04-05: SAM.gov and Simpler Grants integrated",
    ],
  },
  {
    id: "therfp-ninja",
    name: "TheRFP.Ninja",
    brand: "artemis",
    status: "active",
    description: "Government RFP and contract opportunity finder. SAM.gov, USASpending, Federal Register.",
    url: "https://therfp.ninja",
    keyMetric: { label: "APIs Connected", value: "3" },
    recentActivity: [
      "2026-04-10: SAM.gov, USASpending, Federal Register connected",
      "2026-04-10: RFP discovery engine live",
    ],
  },
  {
    id: "hcip-acquisitions",
    name: "HCIP Acquisitions",
    brand: "augeo-health",
    status: "in-progress",
    description: "Roll-up strategy using Native American SBA-like loan (50% match, $5M max). Target: 503B pharmacies, RV parks, storage units.",
    keyMetric: { label: "Phase", value: "Research" },
    recentActivity: [
      "2026-04-02: Strategy defined, 7 target sectors identified",
      "2026-04-02: Sweet spot: $10M projects (fully financed at 50/50)",
    ],
  },
  {
    id: "trading-experiment",
    name: "Trading Experiment",
    brand: "artemis",
    status: "planned",
    description: "60-day aggressive trading experiment. $300 funded. Document everything, package as book.",
    keyMetric: { label: "Status", value: "Pending Alpaca" },
    recentActivity: [
      "2026-04-02: Robinhood funded ($300). Alpaca recommended for API access.",
      "2026-04-02: Strategy: aggressive, 20% ratchet floor",
    ],
  },
  {
    id: "4afulllife",
    name: "4afulllife.com",
    brand: "artemis",
    status: "existing",
    description: "White-label SaaS coaching software. Body, Being, Balance, Business framework.",
    url: "https://4afulllife.com",
    keyMetric: { label: "Status", value: "Existing" },
    recentActivity: ["Pre-existing product"],
  },
];
