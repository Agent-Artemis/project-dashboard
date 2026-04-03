import { NextResponse } from "next/server";
import { agents } from "@/data/agents";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ agents });
}
