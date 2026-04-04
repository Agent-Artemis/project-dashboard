import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

interface SiteMetrics {
  name: string;
  domain: string;
  brand: "artemis" | "augeo-health";
  visitors?: number;
  pageViews?: number;
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

    // Site metrics
    const sites: SiteMetrics[] = [
      {
        name: "AI Playbook",
        domain: "playbook.agentartemis.ai",
        brand: "artemis",
        conversions: totalTransactions, // Will split when we have per-product tracking
        revenue: totalRevenue,
        conversionRate: 0, // Need visitor data
        avgOrderValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      },
      {
        name: "Healthcare Playbook",
        domain: "playbook.augeohealth.com",
        brand: "augeo-health",
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
        avgOrderValue: 0,
      },
      {
        name: "CCM/RPM Calculator",
        domain: "calculator.augeohealth.com",
        brand: "augeo-health",
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
        avgOrderValue: 0,
      },
      {
        name: "Artemis Homepage",
        domain: "agentartemis.ai",
        brand: "artemis",
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
        avgOrderValue: 0,
      },
      {
        name: "Augeo Health Homepage",
        domain: "augeohealth.com",
        brand: "augeo-health",
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
        avgOrderValue: 0,
      },
    ];

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
      visitors: 0, // Need analytics
      leads: customers.data.length,
      trials: 0,
      customers: totalTransactions,
      revenue: totalRevenue,
    };

    // KPI summary
    const kpis = {
      // Revenue
      monthlyRevenue: totalRevenue,
      weeklyRevenue: weekRevenue,
      avgOrderValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      revenueTarget: 10000,
      revenueProgress: Math.min(100, (weekRevenue / 10000) * 100),
      
      // Customers
      totalCustomers: customers.data.length,
      newCustomersThisMonth: totalTransactions,
      
      // Conversion
      overallConversionRate: 0, // Need visitor data
      
      // Content
      totalPosts: 0, // Will pull from X API
      emailSubscribers: 0, // Will pull from Beehiiv
      
      // Cost
      totalAdSpend: 0,
      customerAcquisitionCost: 0,
      lifetimeValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
      ltcCacRatio: "N/A",
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
