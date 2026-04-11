import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPO = "Agent-Artemis/project-dashboard";
const FILE_PATH = "public/programs-status.json";

export interface ProgramStatus {
  name: string;
  status: "live" | "building" | "paused" | "pending";
  url?: string;
  revenue7d: number;
  revenueMonth: number;
  lastActivity: string;
  nextAction: string;
  updatedAt: string;
}

async function readFile(token: string) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `token ${token}`, "User-Agent": "artemis-dashboard" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return { data: getDefaults(), sha: "" };
  const file = await res.json();
  const content = Buffer.from(file.content, "base64").toString("utf-8");
  return { data: JSON.parse(content) as ProgramStatus[], sha: file.sha };
}

async function writeFile(token: string, data: ProgramStatus[], sha: string, message: string) {
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: { Authorization: `token ${token}`, "Content-Type": "application/json", "User-Agent": "artemis-dashboard" },
    body: JSON.stringify({ message, content, sha }),
  });
}

function getDefaults(): ProgramStatus[] {
  return [
    { name: "Healthcare AI Playbook", status: "live", url: "https://playbook.augeohealth.com", revenue7d: 0, revenueMonth: 0, lastActivity: "Live since April 1", nextAction: "LinkedIn post driving traffic", updatedAt: new Date().toISOString() },
    { name: "General AI Playbook", status: "live", url: "https://playbook.agentartemis.ai", revenue7d: 0, revenueMonth: 0, lastActivity: "Live since March 30", nextAction: "X/Twitter content + LinkedIn", updatedAt: new Date().toISOString() },
    { name: "CCM/RPM Calculator", status: "live", url: "https://calculator.augeohealth.com", revenue7d: 0, revenueMonth: 0, lastActivity: "Free lead gen tool", nextAction: "Drive traffic from healthcare posts", updatedAt: new Date().toISOString() },
    { name: "TheGrant.Ninja", status: "live", url: "https://thegrant.ninja", revenue7d: 0, revenueMonth: 0, lastActivity: "9 APIs connected April 9", nextAction: "Build $97/mo subscription tier", updatedAt: new Date().toISOString() },
    { name: "TheRFP.Ninja", status: "building", url: "https://therfp.ninja", revenue7d: 0, revenueMonth: 0, lastActivity: "Listed on dashboard April 10", nextAction: "Build out RFP search functionality", updatedAt: new Date().toISOString() },
    { name: "Trading Experiment", status: "live", url: "", revenue7d: 0, revenueMonth: 0, lastActivity: "Paper +2.66% | Live $300 no trades yet", nextAction: "First live trade Monday April 13", updatedAt: new Date().toISOString() },
    { name: "agentartemis.ai", status: "live", url: "https://agentartemis.ai", revenue7d: 0, revenueMonth: 0, lastActivity: "Analytics added April 10", nextAction: "LinkedIn traffic + X content", updatedAt: new Date().toISOString() },
    { name: "augeohealth.com", status: "live", url: "https://augeohealth.com", revenue7d: 0, revenueMonth: 0, lastActivity: "Analytics added April 10", nextAction: "Healthcare LinkedIn outreach", updatedAt: new Date().toISOString() },
  ];
}

// GET — dashboard fetches this to display program status
export async function GET() {
  const token = process.env.GITHUB_TOKEN ?? "";
  if (!token) return NextResponse.json({ programs: getDefaults() });

  try {
    const { data } = await readFile(token);
    return NextResponse.json({ programs: data, updatedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ programs: getDefaults() });
  }
}

// POST — morning briefing agent updates all program statuses
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const programs: ProgramStatus[] = Array.isArray(body) ? body : body.programs;
    if (!programs?.length) return NextResponse.json({ error: "programs array required" }, { status: 400 });

    const token = process.env.GITHUB_TOKEN ?? "";
    if (!token) return NextResponse.json({ ok: true, persisted: false });

    const { data: existing, sha } = await readFile(token);

    // Merge: update existing entries, add new ones
    const merged = [...existing];
    for (const update of programs) {
      const idx = merged.findIndex((p) => p.name === update.name);
      if (idx >= 0) {
        merged[idx] = { ...merged[idx], ...update, updatedAt: new Date().toISOString() };
      } else {
        merged.push({ ...update, updatedAt: new Date().toISOString() });
      }
    }

    await writeFile(token, merged, sha, `programs update: ${new Date().toISOString()}`);
    return NextResponse.json({ ok: true, persisted: true, count: merged.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
