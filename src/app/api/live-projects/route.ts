import { NextResponse } from 'next/server';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || '';

async function getStripeRevenue() {
  try {
    const res = await fetch('https://api.stripe.com/v1/charges?limit=100', {
      headers: {
        'Authorization': `Bearer ${STRIPE_KEY}`,
      },
    });
    const data = await res.json();
    
    const total = data.data
      ?.filter((charge: any) => charge.paid && !charge.refunded)
      ?.reduce((sum: number, charge: any) => sum + charge.amount, 0) || 0;
    
    return (total / 100).toFixed(2);
  } catch (error) {
    console.error('Stripe error:', error);
    return '0.00';
  }
}

async function getAlpacaData() {
  try {
    const paperRes = await fetch('https://paper-api.alpaca.markets/v2/account', {
      headers: {
        'APCA-API-KEY-ID': 'PKREY34TMTLUWCGNVOGFZBXHHY',
        'APCA-API-SECRET-KEY': 'EMaFFN9Sobir6N3dh4zHn52pGiT7E4pUkKuYD4airX1c',
      },
    });
    const paperData = await paperRes.json();
    
    const liveRes = await fetch('https://api.alpaca.markets/v2/account', {
      headers: {
        'APCA-API-KEY-ID': 'AKATMLBN3PCWLQGHYSNHMCYZJJ',
        'APCA-API-SECRET-KEY': '393YpduZNj4AuxUyY1F9fDUspmZ56NLbHJ2EVUqjpwuB',
      },
    });
    const liveData = await liveRes.json();
    
    return {
      paper: parseFloat(paperData.equity || '100000').toFixed(2),
      live: parseFloat(liveData.equity || '300').toFixed(2),
    };
  } catch (error) {
    console.error('Alpaca error:', error);
    return { paper: '100000.00', live: '300.00' };
  }
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  const revenue = await getStripeRevenue();
  const trading = await getAlpacaData();
  
  const projects = [
    {
      id: "thegrant-ninja",
      name: "TheGrant.Ninja",
      brand: "artemis" as const,
      status: "active" as const,
      description: "Federal, state & private grant search engine. 3 pricing tiers live: $97/mo, $970/yr, $2,497 + $997+8.5%.",
      url: "https://thegrant.ninja",
      keyMetric: { label: "Pricing Tiers", value: "3" },
      recentActivity: [
        `${today}: 3-tier pricing live ($97/mo + $970/yr subscriptions)`,
        "2026-04-10: 9 API sources connected",
        "2026-04-08: First version shipped",
      ],
    },
    {
      id: "therfp-ninja",
      name: "TheRFP.Ninja",
      brand: "artemis" as const,
      status: "active" as const,
      description: "Government RFP search engine. 3 pricing tiers live: $97/mo, $970/yr, $2,497 + $997+8.5%.",
      url: "https://therfp.ninja",
      keyMetric: { label: "Pricing Tiers", value: "3" },
      recentActivity: [
        `${today}: 3-tier pricing live ($97/mo + $970/yr subscriptions)`,
        "2026-04-10: SAM.gov, USASpending, Federal Register connected",
      ],
    },
    {
      id: "voice-ai-platform",
      name: "Voice AI Platform",
      brand: "augeo-health" as const,
      status: "on-hold" as const,
      description: "Retell-powered AI voice platform. ON HOLD - waiting for first client. Retell will build initial agent.",
      keyMetric: { label: "Status", value: "ON HOLD" },
      recentActivity: [
        `${today}: ON HOLD - waiting for first client`,
        "2026-04-01: 3 use cases defined: CCM outreach, pre-auth, AR calls",
      ],
    },
    {
      id: "trading-experiment",
      name: "Trading Experiment",
      brand: "artemis" as const,
      status: "active" as const,
      description: `60-day trading experiment. Paper: $${trading.paper}, Live: $${trading.live}. Documenting for book ($29 + $49 bundle).`,
      keyMetric: { label: "Paper Account", value: `$${trading.paper}` },
      recentActivity: [
        `${today}: Paper $${trading.paper}, Live $${trading.live}`,
        "2026-04-13: First live trade executed",
        "2026-04-07: Paper trading started",
      ],
    },
    {
      id: "healthcare-playbook",
      name: "Healthcare AI Playbook",
      brand: "augeo-health" as const,
      status: "active" as const,
      description: "85 pages, 16 chapters. $49. Stripe live. First revenue April 1.",
      url: "https://playbook.augeohealth.com",
      keyMetric: { label: "Price", value: "$49" },
      recentActivity: [
        `${today}: Total revenue: $${revenue}`,
        "2026-04-01: First sale (Jeff test purchase)",
        "2026-03-30: 85-page playbook deployed",
      ],
    },
    {
      id: "ai-playbook",
      name: "General AI Playbook",
      brand: "artemis" as const,
      status: "active" as const,
      description: "59 pages, 13 chapters. $29. Stripe live.",
      url: "https://playbook.agentartemis.ai",
      keyMetric: { label: "Price", value: "$29" },
      recentActivity: [
        `${today}: Total revenue: $${revenue}`,
        "2026-04-01: Custom domain live",
        "2026-03-30: 59-page playbook deployed",
      ],
    },
    {
      id: "ccm-rpm-calculator",
      name: "CCM/RPM Revenue Calculator",
      brand: "augeo-health" as const,
      status: "active" as const,
      description: "Free calculator tool. PDF export, editable labor costs. Lead gen for Augeo Health services.",
      url: "https://calculator.augeohealth.com",
      keyMetric: { label: "Type", value: "Free Tool" },
      recentActivity: [
        `${today}: Live with PDF export`,
        "2026-03-31: Rebranded to Augeo Health",
        "2026-03-28: First version deployed",
      ],
    },
  ];
  
  return NextResponse.json({ projects, lastUpdated: today, totalRevenue: revenue });
}
