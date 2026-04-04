import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripe = new Stripe(key.trim());
    const now = Math.floor(Date.now() / 1000);
    const weekStart = now - 7 * 86400;
    const monthStart = now - 30 * 86400;

    // Fetch recent charges
    const charges = await stripe.charges.list({
      created: { gte: monthStart },
      limit: 100,
    });

    let weekRevenue = 0;
    let monthRevenue = 0;
    let weekCount = 0;
    let monthCount = 0;
    const dailyRevenue: Record<string, number> = {};

    for (const charge of charges.data) {
      if (charge.status !== "succeeded") continue;
      const amount = charge.amount / 100;
      const date = new Date(charge.created * 1000).toISOString().split("T")[0];

      monthRevenue += amount;
      monthCount++;
      dailyRevenue[date] = (dailyRevenue[date] || 0) + amount;

      if (charge.created >= weekStart) {
        weekRevenue += amount;
        weekCount++;
      }
    }

    // Build daily array for chart (last 30 days)
    const dailyData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split("T")[0];
      dailyData.push({ date: key, revenue: dailyRevenue[key] || 0 });
    }

    return NextResponse.json({
      weekRevenue,
      monthRevenue,
      weekCount,
      monthCount,
      weekTarget: 10000,
      weekProgress: Math.min(100, (weekRevenue / 10000) * 100),
      daily: dailyData,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
