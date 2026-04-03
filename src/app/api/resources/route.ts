import { NextResponse } from "next/server";
import { resources } from "@/data/resources";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ resources });
}
