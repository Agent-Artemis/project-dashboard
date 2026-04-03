export type ResourceStatus = "Live" | "Active" | "Setup" | "Existing" | "Internal" | "Repo" | "Test Mode";

export interface ResourceItem {
  name: string;
  url: string;
  description: string;
  status: ResourceStatus;
}

export interface ResourceCategory {
  category: string;
  color: string;
  items: ResourceItem[];
}

export const resources: ResourceCategory[] = [
  {
    category: "Augeo Health Products",
    color: "#00C805",
    items: [
      {
        name: "CCM/RPM Revenue Calculator",
        url: "https://calculator.augeohealth.com",
        description: "Paid calculator -- CCM + RPM revenue estimates, PDF export, ROI scenarios",
        status: "Live",
      },
      {
        name: "Healthcare AI Playbook ($49)",
        url: "https://playbook.augeohealth.com",
        description: "85 pages, 16 chapters. AI for healthcare operations. Stripe checkout + PDF delivery.",
        status: "Live",
      },
      {
        name: "Augeo Health Site",
        url: "https://augeohealth.com",
        description: "Professional healthcare consulting homepage. Services, calculator, playbook, booking.",
        status: "Live",
      },
      {
        name: "Strategy Call Booking",
        url: "https://cal.com/agentartemis/30-minutes-with-jeff-oldroyd",
        description: "Cal.com booking -- 30-minute strategy call with Jeff",
        status: "Live",
      },
      {
        name: "CCM Calculator (Preview Bypass)",
        url: "https://calculator.augeohealth.com?preview=augeo2026",
        description: "Direct preview link -- bypasses paywall for review",
        status: "Internal",
      },
    ],
  },
  {
    category: "Artemis Brand",
    color: "#00BFFF",
    items: [
      {
        name: "Artemis Site",
        url: "https://agentartemis.ai",
        description: "AI education brand homepage. Dark theme, playbook link, About Jeff.",
        status: "Live",
      },
      {
        name: "AI Playbook ($29)",
        url: "https://playbook.agentartemis.ai",
        description: "59 pages, 13 chapters. How to put an AI to work. Stripe checkout + PDF.",
        status: "Live",
      },
    ],
  },
  {
    category: "Dashboards",
    color: "#FFB800",
    items: [
      {
        name: "Project HQ",
        url: "https://dashboard-six-roan-46.vercel.app",
        description: "Internal command center -- all projects, agents, kanban boards, live data",
        status: "Live",
      },
    ],
  },
  {
    category: "Platforms & Accounts",
    color: "#FF5252",
    items: [
      {
        name: "X / Twitter (@Artemis_jeff)",
        url: "https://x.com/Artemis_jeff",
        description: "5 posts live. API connected (OAuth 1.0a). 2/day schedule.",
        status: "Active",
      },
      {
        name: "Stripe Dashboard",
        url: "https://dashboard.stripe.com",
        description: "Payments -- LIVE keys deployed. First revenue April 1.",
        status: "Active",
      },
      {
        name: "Beehiiv Newsletter",
        url: "https://beehiiv.com",
        description: "Email newsletter platform -- audience building",
        status: "Setup",
      },
      {
        name: "YouTube",
        url: "https://youtube.com",
        description: "Long-form content channel",
        status: "Setup",
      },
      {
        name: "Gumroad",
        url: "https://gumroad.com",
        description: "Digital product storefront",
        status: "Setup",
      },
      {
        name: "4afulllife.com",
        url: "https://4afulllife.com",
        description: "White-label SaaS coaching software -- Body, Being, Balance, Business",
        status: "Existing",
      },
    ],
  },
  {
    category: "Domains",
    color: "#8B5CF6",
    items: [
      {
        name: "agentartemis.ai",
        url: "https://agentartemis.ai",
        description: "AI education brand (Namecheap, Vercel DNS)",
        status: "Live",
      },
      {
        name: "augeohealth.com",
        url: "https://augeohealth.com",
        description: "Healthcare brand (Namecheap, Vercel DNS)",
        status: "Live",
      },
      {
        name: "augeoagency.com",
        url: "https://augeoagency.com",
        description: "Umbrella agency site (GoDaddy)",
        status: "Existing",
      },
      {
        name: "aihelp.ninja",
        url: "#",
        description: "Parked (Namecheap)",
        status: "Setup",
      },
    ],
  },
  {
    category: "GitHub Repos",
    color: "#9CA3AF",
    items: [
      {
        name: "project-dashboard",
        url: "https://github.com/Agent-Artemis/project-dashboard",
        description: "Project HQ dashboard source",
        status: "Repo",
      },
      {
        name: "ccm-revenue-calculator",
        url: "https://github.com/Agent-Artemis/ccm-revenue-calculator",
        description: "CCM/RPM calculator source",
        status: "Repo",
      },
      {
        name: "agentartemis-site",
        url: "https://github.com/Agent-Artemis/agentartemis-site",
        description: "Artemis brand site source (was artemis-site)",
        status: "Repo",
      },
      {
        name: "hcip-playbook",
        url: "https://github.com/Agent-Artemis/hcip-playbook",
        description: "Healthcare AI Playbook source",
        status: "Repo",
      },
      {
        name: "artemis-playbook",
        url: "https://github.com/Agent-Artemis/artemis-playbook",
        description: "AI Playbook source",
        status: "Repo",
      },
      {
        name: "nails-by-izzy",
        url: "https://github.com/Agent-Artemis/nails-by-izzy",
        description: "Izzy's nail art site",
        status: "Repo",
      },
    ],
  },
];
