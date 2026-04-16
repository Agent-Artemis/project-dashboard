export type Brand = "augeo-health" | "artemis";
export type Status = "active" | "in-progress" | "planned" | "existing" | "on-hold";

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
    id: "thegrant-ninja",
    name: "TheGrant.Ninja",
    brand: "artemis",
    status: "active",
    description: "Federal, state & private grant search engine. 9 live APIs. Free + $97/mo pro tier.",
    url: "https://thegrant.ninja",
    keyMetric: { label: "APIs Connected", value: "9" },
    recentActivity: [
      "2026-04-10: 9 API sources live, unified endpoint built",
      "2026-04-09: Expanded from 3 → 9 grant sources",
      "2026-04-08: First version shipped at grant-scout.vercel.app",
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
    id: "voice-ai-platform",
    name: "Voice AI Platform",
    brand: "augeo-health",
    status: "in-progress",
    description: "Retell-powered AI voice platform. Patient outreach, pre-auth, AR calls. 3 use cases, one build. HIPAA compliant, SOC 2.",
    keyMetric: { label: "Margin at Scale", value: "69%" },
    recentActivity: [
      "2026-04-11: Awaiting Jeff's Voice AI JSON config to start build",
      "2026-04-01: Framework: $0.70/call cost, $3.00 revenue, 69% margins",
      "2026-04-01: 3 use cases: CCM outreach, pre-auth, AR calls",
    ],
  },
  {
    id: "trading-experiment",
    name: "Trading Experiment",
    brand: "artemis",
    status: "active",
    description: "60-day aggressive trading experiment. Paper ($100K) + Live ($300). Document everything, package as two books ($29 + $49 + $49 bundle).",
    keyMetric: { label: "Live Account", value: "$300" },
    recentActivity: [
      "2026-04-13: Day 1 of live trading begins (9:45 AM ET)",
      "2026-04-10: Paper portfolio at $101,643 (+$1,643 / +1.6%)",
      "2026-04-07: Paper trading started, strategy v2 running 3x/day",
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
      "2026-04-01: FIRST REVENUE — card + Apple Pay tested, both clean",
      "2026-04-01: Custom domain live (playbook.augeohealth.com)",
      "2026-03-30: 85-page healthcare playbook written and deployed",
    ],
  },
  {
    id: "ai-playbook",
    name: "AI Playbook ($29)",
    brand: "artemis",
    status: "active",
    description: "59 pages, 13 chapters. How to actually build with AI. Stripe Payment Link + instant PDF download.",
    url: "https://playbook.agentartemis.ai",
    keyMetric: { label: "Price", value: "$29" },
    recentActivity: [
      "2026-04-01: Custom domain live (playbook.agentartemis.ai)",
      "2026-04-01: Stripe checkout working",
      "2026-03-30: 59-page playbook written and deployed",
    ],
  },
  {
    id: "ccm-rpm-calculator",
    name: "CCM/RPM Revenue Calculator",
    brand: "augeo-health",
    status: "active",
    description: "Free calculator for healthcare practices to estimate CCM/RPM revenue. PDF export, ROI scenarios, strategy call booking.",
    url: "https://calculator.augeohealth.com",
    keyMetric: { label: "Status", value: "Live" },
    recentActivity: [
      "2026-04-01: Custom domain live (calculator.augeohealth.com)",
      "2026-03-31: Rebranded from HCIP to Augeo Health",
      "2026-03-28: Launched with CCM + RPM calculators",
    ],
  },
  {
    id: "augeohealth-site",
    name: "Augeo Health Site",
    brand: "augeo-health",
    status: "active",
    description: "Healthcare consulting homepage. Services, calculator, playbook, booking.",
    url: "https://augeohealth.com",
    keyMetric: { label: "Status", value: "Live" },
    recentActivity: [
      "2026-04-05: Compass logo deployed",
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
      "2026-04-09: Vercel Analytics added",
      "2026-04-01: Custom domain live",
      "2026-03-31: Built and deployed",
    ],
  },
  {
    id: "hcip-acquisitions",
    name: "HCIP Acquisitions",
    brand: "augeo-health",
    status: "on-hold",
    description: "Roll-up strategy using Native American SBA-like loan (50% match, $5M max). 503B pharmacies, RV parks, storage units.",
    keyMetric: { label: "Phase", value: "On Hold" },
    recentActivity: [
      "2026-04-11: Project placed on hold by Jeff — re-evaluate May 1",
      "2026-04-08: 25-target acquisition contact list delivered",
      "2026-04-03: 503B compliance arbitrage strategy crystallized",
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
