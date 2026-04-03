import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ projects });
}
