# PRD: Project Dashboard

## Overview
Internal dashboard for Jeff to monitor all projects across HCIP and Augeo brands. Shows aggregate KPIs with drill-down into individual projects. Toggle between HCIP, Augeo, and Total views.

## Pages
1. `/` -- Main dashboard with brand toggle (HCIP / Augeo / All)
2. `/project/[id]` -- Individual project detail page

## Brand Toggle
- Three tabs at the top: **All** | **HCIP** | **Augeo**
- Switching tabs filters all KPIs and project cards
- Persistent across page navigation

## KPIs (Top-Level)
- **Total Revenue** (all time + this month)
- **Active Projects** (count)
- **Monthly Recurring Revenue** (if applicable)
- **Conversion Rate** (site visits -> purchases where applicable)
- **Strategy Calls Booked** (this month)
- **Pipeline Value** (estimated contract value from leads)

## Project Cards (Grid)
Each project shows:
- Project name
- Brand (HCIP / Augeo)
- Status badge (Active / In Progress / Planned)
- Key metric (revenue, users, etc.)
- Trend indicator (up/down/flat)
- Click to drill down

## Project Detail Page
- Full KPI breakdown for that project
- Revenue chart (placeholder for now, will wire to Stripe later)
- Activity log (recent events)
- Quick links (live URL, GitHub, Stripe dashboard)

## Initial Projects to Seed
### HCIP
1. **CCM/RPM Revenue Calculator** -- Status: Active, URL: ccm-revenue-calculator.vercel.app
2. **CCM/RPM Consulting** -- Status: Planned

### Augeo
1. **4afulllife.com** -- Status: Existing
2. **AI Automation Services** -- Status: Planned
3. **Content/Newsletter** -- Status: In Progress (Beehiiv)

## Tech Stack
- Next.js 16 + Tailwind (same as calculator)
- Static data file for now (projects.json) -- easy to swap to API/DB later
- Deploy to Vercel

## Design
- Dark sidebar with brand toggle
- Clean white content area
- Navy (#1e3a5f) + green (#22c55e) accent for HCIP
- Navy + a different accent for Augeo (maybe gold/amber #f59e0b)
- Cards with subtle shadows, clean typography
- Mobile responsive

## Auth
- Simple password protection for now (not public-facing)
- Preview bypass param like calculator
