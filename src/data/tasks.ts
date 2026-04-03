export type Board = "jeff" | "agent";
export type JeffColumn = "today" | "this-week" | "general";
export type AgentColumn = "today" | "this-week" | "next-week" | "30-days" | "future";
export type TaskStatus = "not-started" | "in-progress" | "done";
export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  board: Board;
  column: JeffColumn | AgentColumn;
  status: TaskStatus;
  priority: Priority;
  description?: string;
  details?: string[];
  links?: { label: string; url: string }[];
}

export const tasks: Task[] = [
  // === JEFF'S BOARD ===
  {
    id: "j-001",
    title: "Refresh Facebook Page Access Token",
    assignee: "artemis",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Token expired April 1. Need new one so Artemis can post to Augeo Agency page.",
    details: [
      "Go to Graph API Explorer (link below)",
      "Select app: Augeo Agency (ID: 1674993343520476)",
      "Click 'Get Token' dropdown -> 'Get Page Access Token'",
      "Select the Augeo Agency page from the list",
      "Copy the token and send it to Artemis on Telegram",
      "Artemis will convert it to a 60-day long-lived token this time",
    ],
    links: [
      { label: "Graph API Explorer", url: "https://developers.facebook.com/tools/explorer/" },
      { label: "Augeo Agency FB Page", url: "https://www.facebook.com/profile.php?id=103923762424965" },
    ],
  },
  {
    id: "j-002",
    title: "Review Voice AI platform framework",
    assignee: "benny",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Benny built the full framework: 3 use cases (CCM outreach, pre-auth, AR), cost model, go-to-market.",
    details: [
      "The doc covers: Retell AI integration, $0.70/call cost vs $3.00 revenue, 69% margins",
      "Three revenue models: per-claim ($3-5), tiered sub ($1,500-$8,000/mo), hybrid",
      "Go-to-market: billing companies first, then clinics",
      "Review and tell Artemis: green light to build, changes needed, or park it",
    ],
    links: [
      { label: "Retell AI (HIPAA/SOC2)", url: "https://www.retellai.com/" },
      { label: "Augeo Health Site", url: "https://augeohealth.com" },
    ],
  },
  {
    id: "j-003",
    title: "Open Alpaca paper trading account",
    assignee: "artemis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Robinhood has no API. Alpaca does. Need this for the 60-day trading experiment.",
    details: [
      "Go to alpaca.markets and sign up for a paper trading account",
      "Paper trading = fake money, real market data. No risk.",
      "Once signed up, go to API Keys in the dashboard",
      "Send Artemis the API Key + Secret Key",
      "Artemis already has placeholder keys in TOOLS.md -- we'll swap them for real ones",
    ],
    links: [
      { label: "Alpaca Sign Up", url: "https://app.alpaca.markets/signup" },
      { label: "Alpaca Paper Trading Docs", url: "https://docs.alpaca.markets/docs/paper-trading" },
    ],
  },
  {
    id: "j-004",
    title: "SAM.gov registration (Augeo LLC)",
    assignee: "evelyn",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Required to apply for federal grants. 2-4 week processing time -- every day we wait costs us.",
    details: [
      "Go to SAM.gov (link below) and click 'Get Started'",
      "You'll need: Augeo LLC EIN, DUNS/UEI number, bank account info",
      "If you don't have a UEI yet, request one at SAM.gov (takes ~2 days)",
      "Complete Entity Registration for Augeo LLC",
      "This unlocks: grants.gov applications, SBIR/STTR submissions, federal contracts",
      "SBIR/STTR just got reauthorized April 1 after 6-month freeze -- $6B in funding about to flow",
    ],
    links: [
      { label: "SAM.gov Registration", url: "https://sam.gov/content/entity-registration" },
      { label: "UEI Request (if needed)", url: "https://sam.gov/content/entity-registration" },
      { label: "SBIR/STTR Portal", url: "https://www.sbir.gov/" },
    ],
  },
  {
    id: "j-005",
    title: "Post 2 LinkedIn posts (draft ready)",
    assignee: "dennis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Dennis is drafting LinkedIn posts for Jeff to publish from his personal account. LinkedIn = Jeff's biggest network.",
    details: [
      "Dennis is building the full outreach playbook now",
      "He'll have 2 LinkedIn posts ready: 1 healthcare angle, 1 AI angle",
      "Copy-paste from the draft and post from your LinkedIn profile",
      "Your network is where the buyers are -- practice managers, billing companies",
      "Each post drives to a sales page",
    ],
    links: [
      { label: "LinkedIn (post from here)", url: "https://www.linkedin.com/feed/" },
      { label: "Healthcare Playbook (CTA target)", url: "https://playbook.augeohealth.com" },
      { label: "AI Playbook (CTA target)", url: "https://playbook.agentartemis.ai" },
    ],
  },
  {
    id: "j-006",
    title: "Share Augeo Agency posts to personal Facebook",
    assignee: "artemis",
    board: "jeff",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Once Artemis posts to the Augeo Agency page, share to your personal profile for reach.",
    details: [
      "Blocked until j-001 (token refresh) is done",
      "Once token is refreshed, Artemis will post both today's tweets as FB posts",
      "Go to the Augeo Agency page and hit 'Share' on each post",
      "Share to your personal timeline with a brief comment",
    ],
    links: [
      { label: "Augeo Agency FB Page", url: "https://www.facebook.com/profile.php?id=103923762424965" },
    ],
  },
  {
    id: "j-007",
    title: "Provide Pixelmator logo exports for sites",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "medium",
    description: "Your Pixelmator exports look better than anything AI generates. Need logos for all 3 brand sites.",
    details: [
      "Needed: Augeo Health logo, Artemis logo, Augeo Agency logo",
      "Export as PNG with transparent background, at least 512x512",
      "The compass-as-O concept is the brand mark",
      "Send to Artemis on Telegram or drop in the shared workspace",
      "Artemis will deploy to all sites (agentartemis.ai, augeohealth.com, dashboard)",
    ],
    links: [
      { label: "agentartemis.ai (needs logo)", url: "https://agentartemis.ai" },
      { label: "augeohealth.com (needs logo)", url: "https://augeohealth.com" },
    ],
  },
  {
    id: "j-008",
    title: "Update OpenClaw elevated access config",
    assignee: "artemis",
    board: "jeff",
    column: "general",
    status: "not-started",
    priority: "low",
    description: "Gives Artemis permission to run certain commands without asking each time.",
    details: [
      "Run in terminal: openclaw config edit",
      "Add elevated permissions for common operations",
      "Not urgent -- Artemis works around it, just slightly slower",
    ],
  },
  {
    id: "j-009",
    title: "Post LinkedIn drafts (2 posts ready)",
    assignee: "dennis",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "Dennis drafted 2 LinkedIn posts in your voice. Copy-paste and post from your profile -- your network is where the buyers are.",
    details: [
      "Post 1 (Healthcare): CCM revenue most practices miss. Drives to calculator.",
      "Post 2 (AI): 'I hired an AI as an employee.' Drives to playbook.",
      "Use 'link in comments' pattern -- post the text, then drop the link as the first comment. Beats the algorithm.",
      "Artemis will send both drafts here in Telegram for you to copy-paste.",
    ],
    links: [
      { label: "LinkedIn (post here)", url: "https://www.linkedin.com/feed/" },
      { label: "Calculator (CTA)", url: "https://calculator.augeohealth.com" },
      { label: "AI Playbook (CTA)", url: "https://playbook.agentartemis.ai" },
    ],
  },
  {
    id: "j-010",
    title: "Approve Chase ACH transfer for Alpaca",
    assignee: "artemis",
    board: "jeff",
    column: "today",
    status: "not-started",
    priority: "medium",
    description: "Chase flagged the Alpaca ACH transfer. Need to clear it with the bank.",
    details: [
      "Check Chase app for a fraud alert or pending verification",
      "Or call Chase: 1-800-935-9935",
      "Verify you recognize the Alpaca transfer",
      "Once cleared, the transfer should process within 1-2 business days",
      "Note: paper trading works without funding -- you can trade with virtual money now",
    ],
    links: [
      { label: "Chase App", url: "https://www.chase.com" },
      { label: "Alpaca Dashboard", url: "https://app.alpaca.markets/paper/dashboard/overview" },
    ],
  },

  // === AGENT BOARD ===
  // Today
  {
    id: "a-001",
    title: "Rebuild Project HQ dashboard",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "in-progress",
    priority: "high",
    description: "Robinhood-style dark theme, live data, kanban boards",
  },
  {
    id: "a-002",
    title: "Post today's social media content",
    assignee: "artemis",
    board: "agent",
    column: "today",
    status: "not-started",
    priority: "high",
    description: "April 3 tweets from Charlie's content calendar",
  },
  {
    id: "a-003",
    title: "Generate April 3-4 tweet content",
    assignee: "charlie",
    board: "agent",
    column: "today",
    status: "done",
    priority: "high",
    description: "Content ready in content/charlie-april-push.md",
  },

  // This Week
  {
    id: "a-004",
    title: "Update all stale dashboard data",
    assignee: "artemis",
    board: "agent",
    column: "this-week",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "a-005",
    title: "Beehiiv newsletter draft",
    assignee: "charlie",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
    description: "Healthcare audience newsletter",
  },
  {
    id: "a-006",
    title: "Build initial prospect list (billing companies)",
    assignee: "dennis",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "high",
    description: "Target medical billing companies for Voice AI pilot",
  },
  {
    id: "a-007",
    title: "503B compounding pharmacy acquisition deep dive",
    assignee: "evelyn",
    board: "agent",
    column: "this-week",
    status: "not-started",
    priority: "medium",
  },

  // Next Week
  {
    id: "a-008",
    title: "Voice AI MVP architecture",
    assignee: "benny",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "high",
    description: "Technical architecture based on approved framework",
  },
  {
    id: "a-009",
    title: "Week 2 content calendar",
    assignee: "charlie",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-010",
    title: "Cold outreach sequence draft",
    assignee: "dennis",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "high",
    description: "Email sequences for billing company outreach",
  },
  {
    id: "a-011",
    title: "RV park + storage unit market analysis",
    assignee: "evelyn",
    board: "agent",
    column: "next-week",
    status: "not-started",
    priority: "medium",
  },

  // 30 Days
  {
    id: "a-012",
    title: "Voice AI pilot with first billing company",
    assignee: "benny",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "high",
  },
  {
    id: "a-013",
    title: "5 qualified leads in pipeline",
    assignee: "dennis",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "high",
  },
  {
    id: "a-014",
    title: "100+ X followers milestone",
    assignee: "charlie",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-015",
    title: "Complete acquisition target shortlist",
    assignee: "evelyn",
    board: "agent",
    column: "30-days",
    status: "not-started",
    priority: "medium",
  },

  // Future / Ideas
  {
    id: "a-016",
    title: "Grant Scout SaaS platform build",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-017",
    title: "Trading experiment book",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
  },
  {
    id: "a-018",
    title: "YouTube channel launch",
    assignee: "charlie",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
  },
  {
    id: "a-019",
    title: "Guided journaling app",
    assignee: "artemis",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "low",
  },
  {
    id: "a-020",
    title: "Pre-auth Level II AI caller",
    assignee: "benny",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
  },
  {
    id: "a-021",
    title: "Medical billing AI caller",
    assignee: "benny",
    board: "agent",
    column: "future",
    status: "not-started",
    priority: "medium",
  },
];

export const jeffColumns: { key: JeffColumn; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "this-week", label: "This Week" },
  { key: "general", label: "General" },
];

export const agentColumns: { key: AgentColumn; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "this-week", label: "This Week" },
  { key: "next-week", label: "Next Week" },
  { key: "30-days", label: "30 Days" },
  { key: "future", label: "Future / Ideas" },
];
