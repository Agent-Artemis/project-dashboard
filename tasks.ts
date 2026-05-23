// tasks.ts - Dashboard Task Definitions
// Synced from heartbeat-state.json + MEMORY.md
// Last updated: 2026-05-23 06:00 UTC (12:00 AM MDT)
// Nightly cleanup run completed: 2026-05-23 06:00 UTC

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "P0" | "P1" | "P2";
  status: "open" | "in-progress" | "blocked" | "archived" | "done";
  category: "blocker" | "waiting-on-jeff" | "parked" | "resolved";
  addedDate: string;
  dueDate?: string;
  updatedAt: string;
  notes?: string;
  owner?: string;
  tags?: string[];
}

export const TASKS: Task[] = [
  // CRITICAL BLOCKERS (P0)
  {
    id: "voice_ai_platform_decision",
    title: "URGENT: Voice AI Platform Re-evaluation Decision",
    description:
      "Voice AI Platform parked April 16. Re-evaluation deadline (May 1) is now 22 days overdue. Decision required ASAP.",
    priority: "P0",
    status: "blocked",
    category: "waiting-on-jeff",
    addedDate: "2026-04-16",
    dueDate: "2026-05-10",
    updatedAt: "2026-05-23T06:00:00Z",
    notes:
      "Options: (A) Re-activate client hunt (build sales playbook, Benny + Dennis), (B) Keep waiting (passive), (C) Drop entirely. Product: Retell AI voice agents. ROI depends on first client validation. NOW 22 DAYS OVERDUE.",
    owner: "Jeff",
    tags: ["parked", "overdue", "decision-required"],
  },
  {
    id: "napoleon_hill_youtube_decision",
    title: "URGENT: Napoleon Hill YouTube Strategy Decision",
    description:
      "Strategy documented, scripts pending execution. Re-evaluation deadline (May 1) is 22 days overdue.",
    priority: "P0",
    status: "blocked",
    category: "waiting-on-jeff",
    addedDate: "2026-04-08",
    dueDate: "2026-05-10",
    updatedAt: "2026-05-23T06:00:00Z",
    notes:
      "Options: (A) Build scripts + launch (5-7 day sprint, target 100 videos by May 31), (B) Deprioritize vs 9 active projects, (C) Drop. Two-channel strategy in knowledge/projects/. NOW 22 DAYS OVERDUE.",
    owner: "Jeff",
    tags: ["parked", "overdue", "decision-required"],
  },
  {
    id: "hcip_acquisitions_decision",
    title: "URGENT: HCIP Acquisitions Roll-Up Strategy Decision",
    description:
      "503B compliance arbitrage research complete. Parked April 11, re-eval deadline (May 1) now 22 days overdue.",
    priority: "P0",
    status: "blocked",
    category: "waiting-on-jeff",
    addedDate: "2026-04-11",
    dueDate: "2026-05-10",
    updatedAt: "2026-05-23T06:00:00Z",
    notes:
      "Options: (A) Resume hunt (contact dealers, brokers, scout distressed), (B) Keep parked, (C) Drop. Estimated $10M+ opportunity. Capital-intensive but huge upside. NOW 22 DAYS OVERDUE.",
    owner: "Jeff",
    tags: ["parked", "overdue", "decision-required"],
  },
  {
    id: "linkedin_posts_healthcare_activation",
    title: "CRITICAL: Post 2 Healthcare Playbook LinkedIn Drafts",
    description:
      "2 LinkedIn drafts pending for 41+ days (since April 12). This unblocks Healthcare Playbook conversion funnel.",
    priority: "P0",
    status: "open",
    category: "waiting-on-jeff",
    addedDate: "2026-04-12",
    dueDate: "2026-05-10",
    updatedAt: "2026-05-23T06:00:00Z",
    notes:
      "Jeff posts 2 drafts → Calculator + Playbook conversion funnel activated. Target: 10+ downloads by May 23. $0 revenue for 51 days depends on this. NOW 13 DAYS OVERDUE.",
    owner: "Jeff",
    tags: ["marketing", "linkedin", "revenue-unlocker"],
  },
  {
    id: "augeoagency_dns_godaddy",
    title: "Point augeoagency.com DNS to Vercel",
    description:
      "augeoagency-site.vercel.app deployed 42+ days ago. GoDaddy DNS not updated. Blocking brand site launch.",
    priority: "P0",
    status: "open",
    category: "waiting-on-jeff",
    addedDate: "2026-04-10",
    dueDate: "2026-05-10",
    updatedAt: "2026-05-23T06:00:00Z",
    notes:
      "GoDaddy creds in TOOLS.md. Nameserver: vercel.com. Low revenue impact but brand activation ready. NOW 13 DAYS OVERDUE.",
    owner: "Jeff",
    tags: ["blocking", "dns", "low-priority"],
  },

  // CRITICAL WAITING-ON-JEFF (P1)
  {
    id: "sam_gov_api_key",
    title: "SAM.gov API Key (Optional)",
    description:
      "Grant Scout / RFP Ninja can use DEMO_KEY indefinitely. Optional upgrade for live data feeds.",
    priority: "P1",
    status: "open",
    category: "waiting-on-jeff",
    addedDate: "2026-04-09",
    dueDate: "2026-06-01",
    updatedAt: "2026-05-10T06:00:00Z",
    notes: "Evelyn has research. Nice-to-have, not critical. Both services operational with DEMO_KEY.",
    owner: "Evelyn",
    tags: ["optional", "grant-research"],
  },
  {
    id: "telegram_bot_token_refresh",
    title: "Refresh Telegram Bot Token (401 Unauthorized)",
    description:
      "Morning briefing + EOD report failing since May 1. Fallback to file storage working. Token needs regeneration.",
    priority: "P1",
    status: "open",
    category: "waiting-on-jeff",
    addedDate: "2026-05-02",
    dueDate: "2026-05-14",
    updatedAt: "2026-05-14T06:00:00Z",
    notes:
      "Verify via Telegram BotFather (@BotFather). Regenerate if expired. Update .env or TOOLS.md. Test: node scripts/morning-briefing-runner.js",
    owner: "Jeff",
    tags: ["infrastructure", "urgent"],
  },

  // RESOLVED / ARCHIVED TASKS (for history)
  {
    id: "grant_scout_launch",
    title: "Grant/RFP Search Engine LIVE",
    description: "Grant Scout deployed to production with 9 APIs connected.",
    priority: "P0",
    status: "done",
    category: "resolved",
    addedDate: "2026-04-01",
    updatedAt: "2026-04-09T06:00:00Z",
    notes: "https://grant-scout.vercel.app. Live. Monetized. Awaiting marketing activation. ARCHIVED.",
    tags: ["archived", "resolved"],
  },
  {
    id: "codex_agent_configured",
    title: "OpenAI Codex Agent Configured",
    description: "Codex API key configured and tested.",
    priority: "P1",
    status: "done",
    category: "resolved",
    addedDate: "2026-04-05",
    updatedAt: "2026-04-08T06:00:00Z",
    notes: "API key stored in TOOLS.md. Integrated with coding agent dispatch. ARCHIVED.",
    tags: ["archived", "resolved"],
  },
  {
    id: "acquisition_contact_list",
    title: "Acquisition Contact List CSV Built",
    description: "Contacts list published to GitHub.",
    priority: "P1",
    status: "done",
    category: "resolved",
    addedDate: "2026-04-03",
    updatedAt: "2026-04-08T06:00:00Z",
    notes: "https://github.com/Agent-Artemis/acquisitions. ARCHIVED.",
    tags: ["archived", "resolved"],
  },
  {
    id: "telegram_health_monitoring",
    title: "Telegram Health Monitoring Script",
    description: "Detects bot token failures. Logs errors for visibility.",
    priority: "P1",
    status: "done",
    category: "resolved",
    addedDate: "2026-04-15",
    updatedAt: "2026-05-02T06:00:00Z",
    notes: "Token rotation / verification pending. Script working.",
    tags: ["archived", "resolved"],
  },
  {
    id: "morning_briefing_runner",
    title: "Morning Briefing Unified Orchestrator",
    description: "Integrated health check + generation + fallback logic.",
    priority: "P1",
    status: "done",
    category: "resolved",
    addedDate: "2026-04-20",
    updatedAt: "2026-05-05T06:00:00Z",
    notes: "Ready for deployment to morning cron. Fallback to file storage working.",
    tags: ["archived", "resolved"],
  },
  {
    id: "overdue_parked_items_audit",
    title: "Nightly Consolidation Parked Items Audit",
    description: "Audit step for overdue parked items added to consolidation script.",
    priority: "P1",
    status: "done",
    category: "resolved",
    addedDate: "2026-04-25",
    updatedAt: "2026-05-03T06:00:00Z",
    notes: "Step 4b in nightly-consolidation.md flags items past evaluateDate.",
    tags: ["archived", "resolved"],
  },
];

export const STATS = {
  totalTasks: TASKS.length,
  openTasks: TASKS.filter((t) => t.status === "open").length,
  blockedTasks: TASKS.filter((t) => t.status === "blocked").length,
  doneTasks: TASKS.filter((t) => t.status === "done").length,
  archivedTasks: TASKS.filter((t) => t.category === "resolved").length,
  criticalTasks: TASKS.filter((t) => t.priority === "P0").length,
  lastSyncedAt: "2026-05-23T06:00:00Z",
  lastCleanupRun: "2026-05-23T06:00:00Z",
};

export default TASKS;
