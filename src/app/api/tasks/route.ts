import { NextResponse } from "next/server";
import { tasks, jeffColumns, agentColumns } from "@/data/tasks";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ 
    tasks, 
    jeffColumns: jeffColumns.map(c => ({ key: c.key, label: c.label })), 
    agentColumns: agentColumns.map(c => ({ key: c.key, label: c.label })) 
  });
}
