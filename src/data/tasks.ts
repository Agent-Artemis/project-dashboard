// Dashboard Tasks - Updated May 20, 2026 (Nightly Cleanup)
// Source: memory/heartbeat-state.json + MEMORY.md

export interface Task {
  id: string;
  title: string;
  assigned: string;
  status: "active" | "blocked" | "waiting" | "archived";
  priority: "P0" | "P1" | "P2";
  dueDate?: string;
  note?: string;
  days?: number;
}

// JEFF'S BOARD (awaiting his decisions/actions)
export const jeffTasks: Task[] = [
  {
    id: "telegram-token",
    title: "CRITICAL: Fix Telegram briefing delivery",
    assigned: "Jeff",
    status: "blocked",
    priority: "P0",
    dueDate: "2026-05-20",
    note: "Execute BRIEFING-DEPLOYMENT-EXEC.md (5-min fix). Broken since May 1 (19 days). Token: get from @BotFather. Chat ID: -5143276750. When fixed: morning briefing surfaces 3 critical overdue parked items.",
    days: 19,
  },
  {
    id: "parked-decisions",
    title: "Decide on 3 parked items (overdue 19 days)",
    assigned: "Jeff",
    status: "waiting",
    priority: "P0",
    dueDate: "2026-05-20",
    note: "Options per item: A) Reactivate, B) Keep waiting, C) Drop. Items: (1) voice_ai_platform (parked Apr 16), (2) napoleon_hill_youtube (parked Apr 8), (3) hcip_acquisitions (parked Apr 11). Each has full context in memory/heartbeat-state.json.",
    days: 19,
  },
  {
    id: "sam-api-key",
    title: "Get real SAM.gov API key (optional)",
    assigned: "Jeff",
    status: "waiting",
    priority: "P1",
    dueDate: "TBD",
    note: "TheGrant.Ninja currently using DEMO_KEY. At https://sam.gov API docs. Not blocking launch.",
  },
];

// ARTEMIS BOARD (active execution items)
export const artemisTasks: Task[] = [
  {
    id: "morning-briefing-exec",
    title: "Morning briefing automation (pending Telegram fix)",
    assigned: "Artemis",
    status: "blocked",
    priority: "P0",
    dueDate: "2026-05-21",
    note: "Blocked by Telegram token. When Jeff fixes token, briefing resumes at 7:30 AM MDT daily. 48 briefings generated but unread (file fallback May 1-20).",
    days: 19,
  },
  {
    id: "zero-revenue-activation",
    title: "Marketing activation (48 days, $0 external revenue)",
    assigned: "Artemis",
    status: "active",
    priority: "P0",
    dueDate: "2026-05-27",
    note: "All 5 products live. Zero marketing activated. Activation playbooks built (scripts/zero-revenue-activation-plan.md). Week 1 focus: Healthcare Playbook (target: 5 downloads by May 27). Charlie + Dennis executing.",
  },
  {
    id: "trading-daily-journal",
    title: "Trading Day 48 journal + EOD report",
    assigned: "Artemis",
    status: "active",
    priority: "P1",
    dueDate: "2026-05-20",
    note: "Ongoing. Paper trading on pace. Live $300 (no positions yet). Journal at ~/trading/journal/. Charts at ~/trading/charts/MASTER.md.",
  },
  {
    id: "social-automation",
    title: "3 social posts/day (X, LinkedIn, Instagram, Facebook)",
    assigned: "Artemis",
    status: "active",
    priority: "P1",
    dueDate: "ongoing",
    note: "Running cleanly since April 17. Daily content via Charlie (drafted) + Artemis (posted). Zernio integration for social scheduling.",
  },
  {
    id: "ghl-dashboard-sync",
    title: "GHL daily sync (8 AM MDT) - 7 projects tracked",
    assigned: "Artemis",
    status: "active",
    priority: "P1",
    dueDate: "daily",
    note: "Live at dashboard-six-roan-46.vercel.app. 20 custom fields synced. All programs reporting correctly.",
  },
];

// Archive section (DONE items from past 30 days)
export const archivedTasks: Task[] = [
  {
    id: "archived-grant-scout-api",
    title: "Grant Scout: 4→9 API sources (ARCHIVED)",
    assigned: "Artemis",
    status: "archived",
    priority: "P0",
    dueDate: "2026-04-09",
    note: "COMPLETED: Added NIH RePORTER, NSF Awards, World Bank Projects, EU Portal, Federal Register. Live at grant-scout.vercel.app/search.",
  },
  {
    id: "archived-acquisition-contacts",
    title: "HCIP Acquisitions: 25 contact list (ARCHIVED)",
    assigned: "Artemis",
    status: "archived",
    priority: "P0",
    dueDate: "2026-04-08",
    note: "COMPLETED: CSV with 25 targets (503B, RV Parks, Storage, Port Land) + phone + direct URLs. GitHub: Agent-Artemis/acquisitions.",
  },
  {
    id: "archived-grant-rfp-pricing",
    title: "Grant/RFP Ninja: 3-tier pricing (ARCHIVED)",
    assigned: "Artemis",
    status: "archived",
    priority: "P1",
    dueDate: "2026-04-15",
    note: "COMPLETED: Both sites live with $97/mo, $970/yr, $2,497 flat tiers. Stripe integration working.",
  },
  {
    id: "archived-codex-setup",
    title: "Codex CLI configured (ARCHIVED)",
    assigned: "Artemis",
    status: "archived",
    priority: "P1",
    dueDate: "2026-03-31",
    note: "COMPLETED: New OpenAI API key loaded. Key in TOOLS.md under OpenAI (Codex).",
  },
  {
    id: "archived-voice-clarity",
    title: "Voice AI platform scoping clarified (ARCHIVED)",
    assigned: "Artemis",
    status: "archived",
    priority: "P1",
    dueDate: "2026-04-16",
    note: "COMPLETED: No JSON config needed. Retell builds first agent. Project ON HOLD waiting for first client.",
  },
  {
    id: "archived-heartbeat-looping",
    title: "Memory looping fix (ARCHIVED)",
    assigned: "Artemis",
    status: "archived",
    priority: "P0",
    dueDate: "2026-04-16",
    note: "COMPLETED (2026-05-16): Fixed nightly consolidation to AUDIT heartbeat-state.json for stale items, not just update. Jeff called out looping (May 14); fixed completely by May 16.",
  },
];

// Export for UI
export const tasks = [...jeffTasks, ...artemisTasks];

// Define table columns
export const jeffColumns = [
  { key: "title", label: "Jeff's Tasks" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "days", label: "Days Open" },
  { key: "note", label: "Notes" },
];

export const agentColumns = [
  { key: "title", label: "Artemis Tasks" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "dueDate", label: "Due" },
  { key: "note", label: "Notes" },
];
