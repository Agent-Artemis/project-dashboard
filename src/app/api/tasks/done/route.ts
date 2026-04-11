import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPO = "Agent-Artemis/project-dashboard";
const FILE_PATH = "public/done-tasks.json";

interface DoneEntry {
  taskId: string;
  title: string;
  doneAt: string;
}

async function readDoneFile(token: string): Promise<{ entries: DoneEntry[]; sha: string }> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `token ${token}`, "User-Agent": "artemis-dashboard" },
  });
  if (!res.ok) return { entries: [], sha: "" };
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { entries: JSON.parse(content), sha: data.sha };
}

async function writeDoneFile(token: string, entries: DoneEntry[], sha: string, message: string) {
  const content = Buffer.from(JSON.stringify(entries, null, 2)).toString("base64");
  await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "artemis-dashboard",
    },
    body: JSON.stringify({ message, content, sha }),
  });
}

// POST — Jeff clicks DONE on a task
export async function POST(req: Request) {
  try {
    const { taskId, title, doneAt } = await req.json();
    if (!taskId) return NextResponse.json({ error: "taskId required" }, { status: 400 });

    const token = process.env.GITHUB_TOKEN ?? "";
    if (!token) return NextResponse.json({ ok: true, persisted: false });

    const { entries, sha } = await readDoneFile(token);
    if (!entries.find((e) => e.taskId === taskId)) {
      entries.push({ taskId, title, doneAt });
      await writeDoneFile(token, entries, sha, `task done: ${taskId} - ${title}`);
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: true, persisted: false });
  }
}

// DELETE — Jeff undoes a done task
export async function DELETE(req: Request) {
  try {
    const { taskId } = await req.json();
    if (!taskId) return NextResponse.json({ error: "taskId required" }, { status: 400 });

    const token = process.env.GITHUB_TOKEN ?? "";
    if (!token) return NextResponse.json({ ok: true });

    const { entries, sha } = await readDoneFile(token);
    const updated = entries.filter((e) => e.taskId !== taskId);
    if (updated.length !== entries.length) {
      await writeDoneFile(token, updated, sha, `task undone: ${taskId}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: true });
  }
}

// GET — nightly sweep reads this to know what Jeff marked done
export async function GET() {
  const token = process.env.GITHUB_TOKEN ?? "";
  if (!token) return NextResponse.json({ tasks: [] });

  try {
    const { entries } = await readDoneFile(token);
    return NextResponse.json({ tasks: entries });
  } catch {
    return NextResponse.json({ tasks: [] });
  }
}
