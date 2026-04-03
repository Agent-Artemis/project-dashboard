import { NextResponse } from "next/server";
import { futureProjects } from "@/data/future-projects";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ projects: futureProjects });
}
