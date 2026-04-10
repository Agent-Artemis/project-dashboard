import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

interface SiteMetrics {
  name: string;
  domain: string;
  brand: "artemis" | "augeo-health";
  visitors: number;
  pageViews: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  avgOrderValue: number;
}

interface ChannelMetrics {
  channel: string;
  visitors?: number;
  leads: number;
  conversions: number;
  revenue: number;
  costPerAcquisition: number;
  roi: string;
}

const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN || "";

// Project IDs for analytics
const PROJECT_IDS: Record<string, string> = {
  "playbook.agentartemis.ai": "prj_j0JULp0wNkodg2J0QkRpqCnZjLZq",
  "playbook.augeohealth.com": "prj_UXBjgFwWMxe7MJnZBhWLKOswlpU5",
  "agentartemis.ai": "prj_DQrYD75Jpo9nyWOHWcRTsokSAOyq",
  "augeohealth.com": "prj_CuPMqdblmoYPGNVJ6stXjrHg57ao",
  "calculator.augeohealth.com": "prj_OWHLmvotxvNvM4fxtBOc0vhs13wH",
};

async function getVisitors(projectId: string): Promise<{ visitors: number; pageViews: number }> {
  if (!VERCEL_TOKEN) return { visitors: 0, pageViews: 0 };
  try {
    const now = new Date();
    const from = new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0];
    const to = now.toISOString().split("T")[0];
    const res = await fetch(
      `https://vercel.com/api/web-analytics/timeseries?projectId=${projectId}&from=${from}&to=${to}&environment=production`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }, cache: "no-store" }
    );
    if (!res.ok) return { visitors: 0, pageViews: 0 };
    const data = await res.json();
    const groups = data?.data?.groups?.all ?? [];
    let visitors = 0;
    let pageViews = 0;
    for (const g of groups) {
      pageViews += g.total ?? 0;
      visitors += g.devices ?? 0;
    }
    return { visitors, pageViews };
  } catch {
    return { visitors: 0, pageViews: 0 };
  }
}

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  try {
    const stripe = new Stripe(stripeKey.trim());
    const now = Math.floor(Date.now() / 1000);
    const weekStart = now - 7 * 86400;
    const monthStart = now - 30 * 86400;

    // Get all charges
    const charges = await stripe.charges.list({ created: { gte: monthStart }, limit: 100 });
    
    // Get all customers
    const customers = await stripe.customers.list({ limit: 100 });
    
    // Get payment links for conversion tracking
    const sessions = await stripe.checkout.sessions.list({ created: { gte: monthStart }, limit: 100 });
    
    // Aggregate by product/payment link
    let totalRevenue = 0;
    let totalTransactions = 0;
    let weekRevenue = 0;
    let weekTransactions = 0;
    const productRevenue: Record<string, { revenue: number; count: number }> = {};

    for (const charge of charges.data) {
      if (charge.status !== "succeeded") continue;
      const amount = charge.amount / 100;
      totalRevenue += amount;
      totalTransactions++;
      if (charge.created >= weekStart) {
        weekRevenue += amount;
        weekTransactions++;
      }
      
      const product = charge.description || charge.metadata?.product || "unknown";
      if (!productRevenue[product]) productRevenue[product] = { revenue: 0, count: 0 };
      productRevenue[product].revenue += amount;
      productRevenue[product].count++;
    }

    // Fetch analytics for all sites in parallel
    const siteConfigs: { name: string; domain: string; brand: "artemis" | "augeo-health"; convs: number; rev: number }[] = [
      { name: "AI Playbook", domain: "playbook.agentartemis.ai", brand: "artemis", convs: totalTransactions, rev: totalRevenue },
      { name: "Healthcare Playbook", domain: "playbook.augeohealth.com", brand: "augeo-health", convs: 0, rev: 0 },
      { name: "CCM/RPM Calculator", domain: "calculator.augeohealth.com", brand: "augeo-health", convs: 0, rev: 0 },
      { name: "Artemis Homepage", domain: "agentartemis.ai", brand: "artemis", convs: 0, rev: 0 },
      { name: "Augeo Health Homepage", domain: "augeohealth.com", brand: "augeo-health", convs: 0, rev: 0 },
    ];

    const analyticsResults = await Promise.all(
      siteConfigs.map((s) => getVisitors(PROJECT_IDS[s.domain] || ""))
    );

    let totalVisitors = 0;
    let totalPageViews = 0;

    const sites: SiteMetrics[] = siteConfigs.map((s, i) => {
      const { visitors, pageViews } = analyticsResults[i];
      totalVisitors += visitors;
      totalPageViews += pageViews;
      const convRate = visitors > 0 ? (s.convs / visitors) * 100 : 0;
      return {
        name: s.name,
        domain: s.domain,
        brand: s.brand,
        visitors,
        pageViews,
        conversions: s.convs,
        revenue: s.rev,
        conversionRate: convRate,
        avgOrderValue: s.convs > 0 ? s.rev / s.convs : 0,
      };
    });

    // Channel metrics (will be populated as we get data)
    const channels: ChannelMetrics[] = [
      {
        channel: "X / Twitter",
        leads: 0,
        conversions: 0,
        revenue: 0,
        costPerAcquisition: 0,
        roi: "N/A",
      },
      {
        channel: "LinkedIn",
        leads: 0,
        conversions: 0,
        revenue: 0,
        costPerAcquisition: 0,
        roi: "N/A",
      },
      {
        channel: "Direct / Organic",
        leads: 0,
        conversions: totalTransactions,
        revenue: totalRevenue,
        costPerAcquisition: 0,
        roi: "Infinite",
      },
      {
        channel: "Newsletter (Beehiiv)",
        leads: customers.data.length,
        conversions: 0,
        revenue: 0,
        costPerAcquisition: 0,
        roi: "N/A",
      },
    ];

    // Funnel metrics
    const funnel = {
      visitors: totalVisitors,
      pageViews: totalPageViews,
      leads: customers.data.length,
      trials: 0,
      customers: totalTransactions,
      revenue: totalRevenue,
    };

    // Overall conversion rate
    const overallConversionRate = totalVisitors > 0 ? (totalTransactions / totalVisitors) * 100 : 0;

    // KPI summary
    const kpis = {
      // Revenue
      monthlyRevenue: totalRevenue,
      weeklyRevenue: weekRevenue,
      avgOrderValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      revenueTarget: 10000,
      revenueProgress: Math.min(100, (weekRevenue / 10000) * 100),
      
      // Traffic
      totalVisitors,
      totalPageViews,
      
      // Customers
      totalCustomers: customers.data.length,
      newCustomersThisMonth: totalTransactions,
      
      // Conversion
      overallConversionRate,
      
      // Content
      totalPosts: 0, // Will pull from X API
      emailSubscribers: 0, // Will pull from Beehiiv
      
      // Cost
      totalAdSpend: 0,
      customerAcquisitionCost: 0,
      lifetimeValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      ltcCacRatio: totalTransactions > 0 ? "Infinite" : "N/A",
    };

    return NextResponse.json({
      kpis,
      sites,
      channels,
      funnel,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
