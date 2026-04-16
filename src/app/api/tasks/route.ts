import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const tasks = [
    // JEFF'S BOARD - TODAY (Only real blockers)
    {
      id: "j-sam-gov",
      title: "Get SAM.gov real API key",
      assignee: "jeff",
      board: "jeff",
      column: "today",
      status: "not-started",
      priority: "medium",
      description: "Optional upgrade for TheGrant.Ninja. Currently using DEMO_KEY.",
      details: [
        "Go to https://sam.gov/",
        "Request API Key",
        "Send to Artemis",
      ],
    },
    
    // AGENT'S BOARD - ACTIVE WORK
    {
      id: "a-001",
      title: "Monitor Trading Experiment",
      assignee: "artemis",
      board: "agent",
      column: "today",
      status: "in-progress",
      priority: "high",
      description: "Day 9 of 60-day experiment. Paper: $104,892 (+4.89%), Live: $300",
      details: [
        "Daily journal at 3:45 PM ET",
        "Strategy: 9:45 AM, 12:30 PM, 3:45 PM trades",
        "Book documentation ongoing",
      ],
    },
    {
      id: "a-002",
      title: "GHL Dashboard Daily Sync",
      assignee: "artemis",
      board: "agent",
      column: "today",
      status: "done",
      priority: "high",
      description: "Auto-sync at 8 AM MDT. All 7 projects updated with live data.",
    },
    {
      id: "a-003",
      title: "Social Media Posts (3/day)",
      assignee: "artemis",
      board: "agent",
      column: "today",
      status: "in-progress",
      priority: "medium",
      description: "Twitter, Facebook, Instagram, LinkedIn automation running",
    },
    
    // THIS WEEK
    {
      id: "a-week-1",
      title: "Marketing for Playbooks",
      assignee: "artemis",
      board: "agent",
      column: "this-week",
      status: "not-started",
      priority: "high",
      description: "Both playbooks live but $0 external sales. Need marketing push.",
    },
    {
      id: "a-week-2",
      title: "Add auth to Grant/RFP.Ninja",
      assignee: "artemis",
      board: "agent",
      column: "this-week",
      status: "not-started",
      priority: "high",
      description: "Subscriptions live but no way for users to log in after paying",
    },
  ];
  
  const jeffColumns = [
    { id: "today", title: "Today", color: "#FF5252" },
    { id: "this-week", title: "This Week", color: "#FFB800" },
    { id: "general", title: "General", color: "#00C805" },
  ];
  
  const agentColumns = [
    { id: "today", title: "Today", color: "#FF5252" },
    { id: "this-week", title: "This Week", color: "#FFB800" },
    { id: "next-week", title: "Next Week", color: "#00C805" },
    { id: "30-days", title: "30 Days", color: "#666" },
    { id: "future", title: "Future", color: "#444" },
  ];
  
  return NextResponse.json({ tasks, jeffColumns, agentColumns });
}
