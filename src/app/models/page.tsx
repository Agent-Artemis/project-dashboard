"use client";

import { useState } from "react";

type Track = "all" | "healthcare" | "artemis" | "personal";

interface IdeaModel {
  id: string;
  name: string;
  track: "healthcare" | "artemis" | "personal";
  type: "product" | "service" | "content" | "infrastructure" | "investment";
  effort: "low" | "medium" | "high";
  timeToRevenue: string;
  revenueType: "recurring" | "one-time" | "contract" | "returns" | "non-revenue";
  monthlyPotential: string;
  costToLaunch: string;
  description: string;
  howItWorks: string[];
  whyItWins: string;
  dependencies: string[];
  connections: string[];
  status: "ready-now" | "needs-scoping" | "future";
}

const ideas: IdeaModel[] = [
  // === HEALTHCARE TRACK ===
  {
    id: "billing-ai",
    name: "Medical Billing AI Caller",
    track: "healthcare",
    type: "product",
    effort: "high",
    timeToRevenue: "4-6 weeks",
    revenueType: "recurring",
    monthlyPotential: "$8,000-$40,000/mo",
    costToLaunch: "$500-$1,000 (Retell credits + dev time)",
    description: "AI voice agent that calls insurance companies for claims follow-up. Navigates IVR trees, authenticates, gets claim status, logs results. Sold to billing companies first, then clinics.",
    howItWorks: [
      "Billing company uploads claims batch (CSV or API)",
      "AI agent calls payer, navigates phone tree, authenticates with NPI/Tax ID",
      "Gets claim status: paid, denied, pending, needs info",
      "If denied: captures reason code and appeal instructions",
      "Results pushed back to billing system with full call notes",
      "Level II: Agent follows up on appeals, re-calls automatically",
    ],
    whyItWins: "A billing staff member costs $20+/hr and handles 4-5 calls/hour. Our AI runs 24/7 on multiple concurrent lines at $6/call. Billing companies manage hundreds of clinics -- one sale scales across all their clients.",
    dependencies: ["Retell AI account", "1-2 pilot billing companies", "Top 5 payer IVR maps"],
    connections: ["pre-auth", "lab-pdf-emr", "ccm-rpm-clients"],
    status: "needs-scoping",
  },
  {
    id: "pre-auth",
    name: "Pre-Auth Software (HIPAA Compliant)",
    track: "healthcare",
    type: "product",
    effort: "high",
    timeToRevenue: "6-8 weeks",
    revenueType: "recurring",
    monthlyPotential: "$5,000-$25,000/mo",
    costToLaunch: "$500-$2,000",
    description: "Prior authorization automation. Submit, track, and follow up on pre-auth requests. Level II adds AI voice follow-up calls to insurance.",
    howItWorks: [
      "Clinic uploads patient info + procedure codes",
      "System auto-generates pre-auth request with correct payer forms",
      "Submits electronically where possible, tracks status",
      "Level I: Dashboard showing all pending/approved/denied auths",
      "Level II: AI voice agent calls payer for follow-up on pending auths",
      "Integrates with EMR for auto-population of clinical data",
    ],
    whyItWins: "Prior auth is the #1 administrative burden in healthcare. Average practice spends 14 hours/week on it. HIPAA compliance built in from day one -- most competitors bolt it on.",
    dependencies: ["HIPAA compliance framework", "Payer submission APIs/portals", "EMR integration (FHIR/HL7)"],
    connections: ["billing-ai", "lab-pdf-emr", "ccm-rpm-clients"],
    status: "needs-scoping",
  },
  {
    id: "lab-pdf-emr",
    name: "Lab PDF to EMR Pipeline",
    track: "healthcare",
    type: "product",
    effort: "medium",
    timeToRevenue: "4-6 weeks",
    revenueType: "recurring",
    monthlyPotential: "$3,000-$15,000/mo",
    costToLaunch: "$200-$500",
    description: "Upload lab PDFs, auto-extract data, cross-reference with EMR, output clean printable documents. Eliminates manual data entry from faxed lab results.",
    howItWorks: [
      "Clinic uploads lab PDF (fax, email, scan)",
      "AI extracts structured data: patient ID, test results, reference ranges, flags",
      "Cross-references with patient record in EMR",
      "Merges into clean, formatted, print-ready PDF",
      "Optionally pushes structured data back into EMR",
      "Audit trail for HIPAA compliance",
    ],
    whyItWins: "Every clinic deals with this daily. Staff manually re-key lab results from faxes -- slow, expensive, error-prone. This is a tangible time-saver they'll feel on day one.",
    dependencies: ["PDF parsing (OCR + AI extraction)", "EMR API access (FHIR)", "HIPAA-compliant hosting"],
    connections: ["pre-auth", "billing-ai"],
    status: "needs-scoping",
  },
  {
    id: "ccm-rpm-clients",
    name: "CCM/RPM Consulting Clients",
    track: "healthcare",
    type: "service",
    effort: "low",
    timeToRevenue: "1-2 weeks",
    revenueType: "contract",
    monthlyPotential: "$5,000-$20,000/mo",
    costToLaunch: "$0 (expertise + existing tools)",
    description: "Fractional COO contracts for practices launching CCM and RPM programs. Jeff's core expertise. Calculator is the lead gen tool, strategy calls close the deal.",
    howItWorks: [
      "Free CCM/RPM calculator drives traffic and captures leads",
      "Strategy call booked through Cal.com",
      "Jeff assesses practice readiness, patient volume, payer mix",
      "Proposes implementation plan with timeline and revenue projections",
      "Engagement: $2,500-$5,000/month fractional COO retainer",
      "Artemis handles reporting, documentation, and tool-building",
    ],
    whyItWins: "Jeff has the MHA, ran nursing homes, knows the regulations. Combined with an AI that builds custom tools in real-time, no other fractional COO can compete on speed or deliverables.",
    dependencies: ["5 warm outreach calls", "Calculator as lead magnet (already built)"],
    connections: ["pre-auth", "billing-ai", "lab-pdf-emr"],
    status: "ready-now",
  },
  {
    id: "medsync",
    name: "MedSync Clients",
    track: "healthcare",
    type: "service",
    effort: "low",
    timeToRevenue: "2-4 weeks",
    revenueType: "contract",
    monthlyPotential: "TBD",
    costToLaunch: "$0",
    description: "MedSync client acquisition. Jeff to provide details on the MedSync relationship and offering.",
    howItWorks: ["Details pending from Jeff"],
    whyItWins: "TBD",
    dependencies: ["Jeff to clarify MedSync details"],
    connections: ["ccm-rpm-clients"],
    status: "needs-scoping",
  },
  // === ARTEMIS / CONTENT TRACK ===
  {
    id: "ai-playbook",
    name: "How to Put an AI to Work ($29 PDF)",
    track: "artemis",
    type: "content",
    effort: "medium",
    timeToRevenue: "1-2 weeks",
    revenueType: "one-time",
    monthlyPotential: "$2,000-$10,000/mo",
    costToLaunch: "$0 (writing + existing site)",
    description: "The FelixCraft mirror play. $29 PDF guide written by an AI (Artemis) about how to give an AI a real job. Site is already live, just needs content and live Stripe.",
    howItWorks: [
      "Study FelixCraft PDF for structure and tone",
      "Write 10-chapter guide from Artemis's perspective",
      "Wire up Stripe (live keys) + Gumroad for delivery",
      "Launch with X thread + newsletter announcement",
      "Public dashboard shows real-time sales (transparency play)",
      "Content marketing drives ongoing sales",
    ],
    whyItWins: "Felix made $170K+ with the same model. Our angle is just as compelling -- a real AI with a real job writing about how it works. The story sells the product.",
    dependencies: ["Live Stripe keys", "FelixCraft PDF to study", "Content written"],
    connections: ["content-engine", "ai-training"],
    status: "needs-scoping",
  },
  {
    id: "ai-training",
    name: "AI Training",
    track: "artemis",
    type: "service",
    effort: "medium",
    timeToRevenue: "2-4 weeks",
    revenueType: "recurring",
    monthlyPotential: "$3,000-$15,000/mo",
    costToLaunch: "$0-$500",
    description: "Training businesses and individuals on practical AI implementation. Workshops, courses, or 1-on-1 consulting. Natural extension of the playbook.",
    howItWorks: [
      "Playbook buyers become warm leads for deeper training",
      "Offer: 1-hour workshop ($500), half-day intensive ($2,000), ongoing advisory ($1,000/mo)",
      "Content: practical AI setup, not theory -- same angle as the playbook",
      "Delivered via Zoom, recorded, can be repackaged as course",
      "Artemis can assist live during sessions (demonstrate the AI in action)",
    ],
    whyItWins: "Every business is asking 'how do we use AI?' Jeff + Artemis can demonstrate a working AI partnership live. That's a demo nobody else can give.",
    dependencies: ["AI playbook as credibility piece", "Landing page or Cal.com booking"],
    connections: ["ai-playbook", "content-engine"],
    status: "needs-scoping",
  },
  {
    id: "content-engine",
    name: "Content Engine (X + Newsletter + YouTube)",
    track: "artemis",
    type: "content",
    effort: "low",
    timeToRevenue: "2-4 weeks (indirect)",
    revenueType: "recurring",
    monthlyPotential: "Drives all other revenue",
    costToLaunch: "$0",
    description: "Daily X threads, weekly Beehiiv newsletter, YouTube content. Documents the journey of building an AI-powered business in public.",
    howItWorks: [
      "Daily: 2-3 tweets documenting what Artemis built that day",
      "Weekly: Beehiiv newsletter -- 'Artemis Weekly' recap + insights",
      "Monthly: YouTube deep-dive on one topic (AI setup, tools, results)",
      "All content feeds into the Artemis brand and drives product sales",
      "Newsletter sponsors become revenue once subscriber base grows",
    ],
    whyItWins: "Building in public with an AI as the narrator is unprecedented. The story itself is the marketing. Every piece of content is a sales funnel for the playbook and training.",
    dependencies: ["HCIP logo for X branding", "Tweet approval from Jeff", "8 tweets already drafted"],
    connections: ["ai-playbook", "ai-training"],
    status: "ready-now",
  },
  {
    id: "journaling-app",
    name: "Guided Journaling App",
    track: "artemis",
    type: "product",
    effort: "high",
    timeToRevenue: "8-12 weeks",
    revenueType: "recurring",
    monthlyPotential: "$3,750-$7,500/mo at 500 subs",
    costToLaunch: "$100-$200 (Apple Dev + Google Play accounts)",
    description: "Standalone journaling app for men and women. Daily guided prompts, progress tracking, reflection tools. Broad market, separate brand.",
    howItWorks: [
      "React Native / Expo build -- cross-platform iOS + Android",
      "Daily guided prompts (rotating themes: gratitude, goals, reflection, growth)",
      "Streak tracking and progress visualization",
      "Optional AI-powered prompt personalization",
      "Freemium: basic journaling free, guided prompts $7/mo",
      "Push notifications for daily reminders",
    ],
    whyItWins: "Journaling apps are a proven market ($1B+). Most are either too simple (blank page) or too complex (CBT therapy tools). The sweet spot is structured daily guidance without being clinical.",
    dependencies: ["Apple Developer Account ($99/yr)", "Google Play Account ($25)", "Brand name + identity"],
    connections: ["youth-coaching", "4afulllife-os"],
    status: "needs-scoping",
  },
  {
    id: "youth-coaching",
    name: "Youth Coaching App",
    track: "artemis",
    type: "product",
    effort: "high",
    timeToRevenue: "8-12 weeks",
    revenueType: "recurring",
    monthlyPotential: "$3,750-$7,500/mo at 500 subs",
    costToLaunch: "$100-$200",
    description: "4afulllife framework adapted for teens/young adults. Same structure, repositioned for a younger audience.",
    howItWorks: [
      "Adapt Body, Being, Balance, Business framework for ages 13+",
      "Simplify language, add gamification elements",
      "Parent dashboard for accountability (optional)",
      "School/youth group licensing for bulk adoption",
      "Same tech stack as journaling app -- shared codebase possible",
    ],
    whyItWins: "The coaching content already exists in 4afulllife. This is a repositioning play, not a ground-up build. Youth market has less competition and schools/churches are distribution channels.",
    dependencies: ["4afulllife content adapted for youth", "COPPA compliance review (if under 13)"],
    connections: ["journaling-app", "4afulllife-os"],
    status: "needs-scoping",
  },
  {
    id: "credit-repair-pdf",
    name: "Credit Repair PDF",
    track: "artemis",
    type: "content",
    effort: "low",
    timeToRevenue: "1 week",
    revenueType: "one-time",
    monthlyPotential: "$500-$3,000/mo",
    costToLaunch: "$0",
    description: "Digital guide on credit repair. Evergreen demand, low effort to produce, easy to sell. Pairs with Business in a Box for entrepreneurs who need funding.",
    howItWorks: [
      "Write comprehensive credit repair guide (dispute letters, strategies, timelines)",
      "Include template dispute letters (plug-and-play)",
      "Sell on Gumroad for $19-$29",
      "Cross-promote with Business in a Box and content engine",
      "Affiliate potential with credit monitoring services",
    ],
    whyItWins: "Evergreen pain point. People in credit trouble are highly motivated buyers. Low production cost, high perceived value with actionable templates.",
    dependencies: ["Content written", "Gumroad listing"],
    connections: ["business-in-a-box"],
    status: "ready-now",
  },
  {
    id: "product-lab",
    name: "Product Lab",
    track: "artemis",
    type: "product",
    effort: "high",
    timeToRevenue: "8-12 weeks",
    revenueType: "recurring",
    monthlyPotential: "$5,000-$20,000/mo",
    costToLaunch: "$500-$1,000",
    description: "Guided tool for the full product lifecycle: idea validation, patent search, manufacturing, selling. Nobody does end-to-end well in one place.",
    howItWorks: [
      "Step 1: Idea validation (market research, competitor analysis, demand scoring)",
      "Step 2: Patent search and IP protection guidance",
      "Step 3: Manufacturing sourcing (domestic + overseas options, MOQs, costs)",
      "Step 4: Pricing and margin calculator",
      "Step 5: Launch playbook (sales channels, marketing, fulfillment)",
      "AI-guided at each step -- asks the right questions, does the research",
    ],
    whyItWins: "Inventors and entrepreneurs waste months figuring out each step alone. This compresses the timeline and prevents costly mistakes. SaaS subscription for ongoing access to tools.",
    dependencies: ["Patent search API integration", "Manufacturing database", "Detailed product spec"],
    connections: ["business-in-a-box"],
    status: "needs-scoping",
  },
  {
    id: "business-in-a-box",
    name: "Business in a Box",
    track: "artemis",
    type: "product",
    effort: "medium",
    timeToRevenue: "4-8 weeks",
    revenueType: "recurring",
    monthlyPotential: "$3,000-$15,000/mo",
    costToLaunch: "$200-$500",
    description: "Turnkey setup for new entrepreneurs. LLC formation, branding, website, payments, first product -- all guided in one system.",
    howItWorks: [
      "Intake questionnaire: what's your business idea, target market, budget?",
      "AI generates: business name options, logo concepts, domain suggestions",
      "Guided LLC formation (link to state filing + registered agent)",
      "Auto-generate website template (choose style, edit content)",
      "Stripe/payment setup wizard",
      "First product launch checklist",
    ],
    whyItWins: "New entrepreneurs are overwhelmed by setup complexity. This removes all friction. Charge monthly for ongoing tools + support, or one-time for the setup kit.",
    dependencies: ["Website template system", "Business formation integration"],
    connections: ["product-lab", "credit-repair-pdf"],
    status: "needs-scoping",
  },
  // === PERSONAL / OTHER TRACK ===
  {
    id: "radical-stone",
    name: "Radical Stone -- ID & UT Builders",
    track: "personal",
    type: "service",
    effort: "low",
    timeToRevenue: "2-4 weeks",
    revenueType: "contract",
    monthlyPotential: "TBD",
    costToLaunch: "$0",
    description: "Find builder companies in Idaho and Utah for Radical Stone. Lead generation and business development.",
    howItWorks: [
      "Scrape/research builders in ID and UT (permits, directories, associations)",
      "Build targeted list with contact info, project history, company size",
      "Outreach campaign on behalf of Radical Stone",
      "CRM tracking for pipeline management",
    ],
    whyItWins: "Artemis can research and build lists at scale. Jeff provides the relationship and sales expertise.",
    dependencies: ["Radical Stone relationship details from Jeff"],
    connections: [],
    status: "needs-scoping",
  },
  {
    id: "blakes-supplements",
    name: "Blake's Supplements",
    track: "personal",
    type: "product",
    effort: "medium",
    timeToRevenue: "TBD",
    revenueType: "recurring",
    monthlyPotential: "TBD",
    costToLaunch: "TBD",
    description: "Supplement business or partnership with Blake. Details pending.",
    howItWorks: ["Jeff to clarify: product line, partnership structure, distribution"],
    whyItWins: "TBD",
    dependencies: ["Details from Jeff and Blake"],
    connections: ["hormone-business", "exosome-hair"],
    status: "needs-scoping",
  },
  {
    id: "spv-raise",
    name: "SPV Raise (Real Estate)",
    track: "personal",
    type: "investment",
    effort: "high",
    timeToRevenue: "3-6 months",
    revenueType: "returns",
    monthlyPotential: "Deal-dependent",
    costToLaunch: "Legal fees ($2,000-$5,000)",
    description: "Special Purpose Vehicle fundraise for real estate investment. Pool investor capital for a specific property or deal.",
    howItWorks: [
      "Identify target property/deal",
      "Structure SPV (LLC) with operating agreement",
      "Create investor deck with projections",
      "Raise capital from accredited investors",
      "Acquire, manage, and distribute returns",
    ],
    whyItWins: "Jeff's real estate background + investor network. SPVs let you do bigger deals without putting up all the capital.",
    dependencies: ["Target deal identified", "Legal counsel", "Investor network"],
    connections: ["re-opportunity-zone", "personal-re"],
    status: "needs-scoping",
  },
  {
    id: "hormone-business",
    name: "Hormone Business",
    track: "personal",
    type: "product",
    effort: "high",
    timeToRevenue: "3-6 months",
    revenueType: "recurring",
    monthlyPotential: "TBD",
    costToLaunch: "TBD",
    description: "Hormone therapy or optimization business. Details pending from Jeff.",
    howItWorks: ["Jeff to clarify: clinic, telemedicine, supplements, or partnership"],
    whyItWins: "Growing market -- hormone optimization is booming. Crosses over with supplements and health/wellness track.",
    dependencies: ["Jeff to clarify model", "Licensing/regulatory review"],
    connections: ["blakes-supplements", "exosome-hair"],
    status: "needs-scoping",
  },
  {
    id: "exosome-hair",
    name: "Exosome Hair Package",
    track: "personal",
    type: "product",
    effort: "medium",
    timeToRevenue: "2-3 months",
    revenueType: "recurring",
    monthlyPotential: "TBD",
    costToLaunch: "TBD",
    description: "Exosome-based hair restoration treatment package. High-ticket health/wellness offering.",
    howItWorks: ["Jeff to clarify: direct treatment, referral partnership, or product resale"],
    whyItWins: "High-ticket item ($3,000-$10,000+ per treatment). Growing demand. Premium market with good margins.",
    dependencies: ["Jeff to clarify model and partnerships"],
    connections: ["hormone-business", "blakes-supplements"],
    status: "needs-scoping",
  },
  {
    id: "4afulllife-os",
    name: "4a Full Life OS",
    track: "personal",
    type: "product",
    effort: "high",
    timeToRevenue: "3-6 months",
    revenueType: "recurring",
    monthlyPotential: "TBD",
    costToLaunch: "TBD",
    description: "Evolution of 4afulllife.com into a full operating system for coaching. Details pending.",
    howItWorks: ["Jeff to clarify what 'OS' means -- expanded feature set? New platform? White-label evolution?"],
    whyItWins: "Existing product with existing users. Evolution is cheaper than starting from scratch.",
    dependencies: ["Jeff to define OS scope"],
    connections: ["journaling-app", "youth-coaching"],
    status: "needs-scoping",
  },
  {
    id: "copywriter-rfp",
    name: "Copywriter Searches & RFP Applications",
    track: "personal",
    type: "service",
    effort: "low",
    timeToRevenue: "1-2 weeks",
    revenueType: "contract",
    monthlyPotential: "$1,000-$5,000/mo",
    costToLaunch: "$0",
    description: "AI-automated search for copywriting jobs and RFP opportunities. Artemis finds, qualifies, and applies.",
    howItWorks: [
      "Artemis monitors job boards, RFP portals, and freelance platforms daily",
      "Filters for relevant opportunities (healthcare, business, AI)",
      "Auto-generates tailored proposals/applications",
      "Jeff reviews and approves before submission",
      "Track win rate and optimize over time",
    ],
    whyItWins: "Volume play. Artemis can scan 100 opportunities and apply to 20 in the time it takes a human to find 5. Even a 5% win rate on high-volume applications adds up.",
    dependencies: ["Target platforms identified", "Jeff's portfolio/samples"],
    connections: [],
    status: "ready-now",
  },
  {
    id: "re-opportunity-zone",
    name: "RE + Opportunity Zone Overlay",
    track: "personal",
    type: "investment",
    effort: "medium",
    timeToRevenue: "3-6 months",
    revenueType: "returns",
    monthlyPotential: "Deal-dependent + tax benefits",
    costToLaunch: "Capital + legal",
    description: "Real estate investing in qualified Opportunity Zones for tax-advantaged returns. These two plays overlap -- find deals in OZs.",
    howItWorks: [
      "Artemis identifies qualified Opportunity Zones in target markets",
      "Cross-reference with RE deal flow (MLS, off-market, auctions)",
      "Model tax benefits (capital gains deferral, 10-year exclusion)",
      "Combine with SPV raise for larger deals",
      "Build investor-ready analysis packages",
    ],
    whyItWins: "OZ investing combines real returns with massive tax advantages. Most investors don't know how to find or evaluate these deals.",
    dependencies: ["Target markets defined", "Capital or investor commitments"],
    connections: ["spv-raise", "personal-re", "investment-agent"],
    status: "needs-scoping",
  },
  {
    id: "investment-agent",
    name: "Investment Agent (Personal)",
    track: "personal",
    type: "infrastructure",
    effort: "medium",
    timeToRevenue: "N/A -- personal ROI",
    revenueType: "returns",
    monthlyPotential: "ROI on investments",
    costToLaunch: "$0",
    description: "Personal AI investment agent for Jeff. Research, tracking, analysis, and opportunity alerts.",
    howItWorks: [
      "Monitor markets, sectors, and specific tickers Jeff cares about",
      "Daily or weekly investment briefing",
      "Alert on significant moves or opportunities",
      "Research deep-dives on request",
      "Track portfolio performance",
    ],
    whyItWins: "Personalized financial research assistant. Not a robo-advisor -- a research analyst that never sleeps.",
    dependencies: ["Jeff to define investment focus areas"],
    connections: ["re-opportunity-zone", "spv-raise"],
    status: "needs-scoping",
  },
  {
    id: "personal-trainer",
    name: "Personal Trainer",
    track: "personal",
    type: "service",
    effort: "medium",
    timeToRevenue: "TBD",
    revenueType: "recurring",
    monthlyPotential: "TBD",
    costToLaunch: "TBD",
    description: "Personal training project. Jeff to clarify: app, service, or platform.",
    howItWorks: ["Jeff to provide details"],
    whyItWins: "Fitness + coaching is in Jeff's wheelhouse. Could tie into 4afulllife or standalone.",
    dependencies: ["Jeff to clarify scope"],
    connections: ["journaling-app", "4afulllife-os"],
    status: "needs-scoping",
  },
  {
    id: "hc-nonprofit",
    name: "Helping Captives Fundraiser",
    track: "personal",
    type: "service",
    effort: "low",
    timeToRevenue: "N/A -- charitable",
    revenueType: "non-revenue",
    monthlyPotential: "N/A",
    costToLaunch: "$0",
    description: "Fundraising for Helping Captives, a healthcare-focused non-profit. Contacts: Caleb & Nate.",
    howItWorks: [
      "Define fundraising goals and timeline with Caleb & Nate",
      "Build donation page / campaign",
      "Social media and email outreach campaign",
      "Event planning if applicable",
      "Artemis handles content, outreach automation, and tracking",
    ],
    whyItWins: "Good cause + Jeff's network. Builds goodwill and relationships in the healthcare space.",
    dependencies: ["Connect with Caleb & Nate", "Define fundraising goals"],
    connections: [],
    status: "needs-scoping",
  },
  {
    id: "sub-agents",
    name: "Artemis Sub-Agent Team",
    track: "personal",
    type: "infrastructure",
    effort: "medium",
    timeToRevenue: "N/A -- force multiplier",
    revenueType: "non-revenue",
    monthlyPotential: "Accelerates everything",
    costToLaunch: "$0",
    description: "Specialized sub-agents managed by Artemis. Content agent, code agent, research agent. Build the AI team.",
    howItWorks: [
      "Define agent roles: content writer, code builder, researcher, outreach",
      "Each agent has specialized prompts, tools, and context",
      "Artemis orchestrates: delegates tasks, reviews output, manages quality",
      "Parallel execution: multiple agents working simultaneously",
    ],
    whyItWins: "More hands (AI hands) on deck. Artemis becomes a manager, not just a worker.",
    dependencies: ["OpenClaw sub-agent infrastructure (already available)"],
    connections: ["All projects benefit"],
    status: "ready-now",
  },
];

const trackColors = {
  healthcare: { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50", border: "border-emerald-200", label: "Healthcare" },
  artemis: { bg: "bg-purple-500", text: "text-purple-600", light: "bg-purple-50", border: "border-purple-200", label: "Artemis / Content" },
  personal: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50", border: "border-blue-200", label: "Personal / Other" },
};

const effortBadge = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const statusBadge = {
  "ready-now": "bg-green-100 text-green-700",
  "needs-scoping": "bg-blue-100 text-blue-700",
  future: "bg-gray-100 text-gray-500",
};

export default function ModelsPage() {
  const [activeTrack, setActiveTrack] = useState<Track>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeTrack === "all" ? ideas : ideas.filter((i) => i.track === activeTrack);

  const readyNow = ideas.filter((i) => i.status === "ready-now");
  const healthcareIdeas = ideas.filter((i) => i.track === "healthcare");
  const artemisIdeas = ideas.filter((i) => i.track === "artemis");

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1e3a5f] min-h-screen p-6 hidden lg:block">
          <h1 className="text-white text-xl font-bold mb-1">Project HQ</h1>
          <p className="text-blue-300 text-xs mb-8">Jeff Oldroyd</p>
          <nav className="space-y-2">
            <a href="/" className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-white" />Dashboard
            </a>
            <a href="/future" className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-amber-400" />Future Projects
            </a>
            <div className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-pink-400" />Idea Models
            </div>
            <a href="/resources" className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-blue-400" />Resources
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          {/* Mobile nav */}
          <div className="flex gap-2 mb-6 lg:hidden flex-wrap">
            <a href="/" className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 text-gray-600">Dashboard</a>
            <a href="/future" className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 text-gray-600">Future</a>
            <div className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1e3a5f] text-white">Models</div>
            <a href="/resources" className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 text-gray-600">Resources</a>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">Idea Models</h1>
            <p className="text-gray-500 mt-1">
              Detailed breakdowns: how each idea works, what it costs, what it earns, and what it needs.
            </p>
          </div>

          {/* Strategy Overview */}
          <div className="bg-[#1e3a5f] rounded-xl p-6 mb-8 text-white">
            <h2 className="text-lg font-bold mb-4">Three-Track Strategy</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <h3 className="font-bold">Healthcare</h3>
                </div>
                <p className="text-blue-200 text-sm mb-2">{healthcareIdeas.length} ideas -- highest revenue potential</p>
                <p className="text-xs text-blue-300">Billing AI, Pre-Auth, Lab Pipeline, CCM/RPM consulting. This is the $10k/week track. Jeff's expertise + Artemis's build speed = unfair advantage.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-purple-400" />
                  <h3 className="font-bold">Artemis / Content</h3>
                </div>
                <p className="text-blue-200 text-sm mb-2">{artemisIdeas.length} ideas -- brand + passive income</p>
                <p className="text-xs text-blue-300">AI Playbook, training, apps, content engine. Builds the Artemis brand and generates passive/recurring revenue. Longer runway but compounds.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400" />
                  <h3 className="font-bold">Personal / Other</h3>
                </div>
                <p className="text-blue-200 text-sm mb-2">{ideas.filter(i => i.track === "personal").length} ideas -- partnerships + investments</p>
                <p className="text-xs text-blue-300">Radical Stone, supplements, RE, SPV, non-profit. Mix of partnerships, investments, and personal projects. Lower priority until healthcare revenue is flowing.</p>
              </div>
            </div>
          </div>

          {/* Ready Now callout */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-green-800 mb-2">Ready to Execute Now ({readyNow.length})</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {readyNow.map((idea) => (
                <div key={idea.id} className="bg-white rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${trackColors[idea.track].bg}`} />
                    <h3 className="font-bold text-[#1e3a5f] text-sm">{idea.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{idea.timeToRevenue} to revenue -- {idea.monthlyPotential}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Track filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["all", "healthcare", "artemis", "personal"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setActiveTrack(t); setExpandedId(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTrack === t ? "bg-[#1e3a5f] text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {t === "all" ? `All (${ideas.length})` : `${trackColors[t].label} (${ideas.filter(i => i.track === t).length})`}
              </button>
            ))}
          </div>

          {/* Idea Cards */}
          <div className="space-y-4">
            {filtered.map((idea) => {
              const track = trackColors[idea.track];
              const expanded = expandedId === idea.id;

              return (
                <div key={idea.id} className={`bg-white rounded-xl border-2 ${track.border} overflow-hidden`}>
                  <button
                    onClick={() => setExpandedId(expanded ? null : idea.id)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`w-2 h-2 rounded-full ${track.bg}`} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${track.text}`}>{track.label}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${effortBadge[idea.effort]}`}>{idea.effort} effort</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge[idea.status]}`}>{idea.status === "ready-now" ? "Ready Now" : idea.status === "needs-scoping" ? "Needs Scoping" : "Future"}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1e3a5f]">{idea.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{idea.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-gray-400">Monthly Potential</p>
                        <p className="text-lg font-bold text-[#1e3a5f]">{idea.monthlyPotential}</p>
                        <p className="text-xs text-gray-400 mt-1">{idea.timeToRevenue}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-400">{expanded ? "Click to collapse ▲" : "Click to expand ▼"}</div>
                  </button>

                  {expanded && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                      {/* How It Works */}
                      <h4 className="text-sm font-bold text-[#1e3a5f] mb-2">How It Works</h4>
                      <ol className="space-y-2 mb-6">
                        {idea.howItWorks.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="bg-[#1e3a5f] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                            <span className="text-sm text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Why It Wins */}
                      <h4 className="text-sm font-bold text-[#1e3a5f] mb-2">Why It Wins</h4>
                      <p className="text-sm text-gray-600 mb-6 bg-green-50 p-3 rounded-lg">{idea.whyItWins}</p>

                      {/* Numbers */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400">Revenue Type</p>
                          <p className="text-sm font-semibold text-[#1e3a5f] capitalize">{idea.revenueType}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400">Monthly Potential</p>
                          <p className="text-sm font-semibold text-[#1e3a5f]">{idea.monthlyPotential}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400">Cost to Launch</p>
                          <p className="text-sm font-semibold text-[#1e3a5f]">{idea.costToLaunch}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400">Time to Revenue</p>
                          <p className="text-sm font-semibold text-[#1e3a5f]">{idea.timeToRevenue}</p>
                        </div>
                      </div>

                      {/* Dependencies */}
                      <h4 className="text-sm font-bold text-[#1e3a5f] mb-2">What We Need</h4>
                      <ul className="space-y-1 mb-6">
                        {idea.dependencies.map((dep, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                            {dep}
                          </li>
                        ))}
                      </ul>

                      {/* Connections */}
                      {idea.connections.length > 0 && (
                        <>
                          <h4 className="text-sm font-bold text-[#1e3a5f] mb-2">Connects To</h4>
                          <div className="flex gap-2 flex-wrap">
                            {idea.connections.map((conn) => {
                              const linked = ideas.find((i) => i.id === conn);
                              return linked ? (
                                <button
                                  key={conn}
                                  onClick={() => setExpandedId(conn)}
                                  className={`text-xs px-3 py-1 rounded-full ${trackColors[linked.track].light} ${trackColors[linked.track].text} font-medium hover:opacity-80`}
                                >
                                  {linked.name}
                                </button>
                              ) : null;
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-sm text-gray-400">
            <p>Models built overnight by Artemis. Last updated: March 30, 2026</p>
          </div>
        </main>
      </div>
    </div>
  );
}
