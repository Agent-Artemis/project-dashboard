import { NextResponse } from "next/server";
import { ideaModels } from "@/data/idea-models";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ models: ideaModels });
}
