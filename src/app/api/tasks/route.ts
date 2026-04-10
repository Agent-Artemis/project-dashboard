import { NextResponse } from "next/server";
import { tasks, jeffColumns, agentColumns } from "@/data/tasks";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ tasks, jeffColumns, agentColumns });
}
