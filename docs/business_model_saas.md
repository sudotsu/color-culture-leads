# Business Model: "ColorCulture Leads"

## Core Objective
Build a lightweight, embeddable paint visualizer that functions as a high-conversion lead magnet for painting contractors.

## The "Nikki" Pilot (v1)
- **Tenant:** Nikki's Painting.
- **Goal:** Capture homeowner contact info + project details.
- **Metric:** Leads generated per month (not paint sold).
- **Deployment:** Embedded via iFrame or Widget on existing WordPress/Squarespace site.

## The SaaS Vision (v2+)
- **Architecture:** Multi-tenant from Day 1.
- **Scalability:** The system allows new contractors ("Tenants") to be added via configuration, not code changes.
- **Monetization:** 1. **SaaS Fee:** Monthly subscription for the widget.
  2. **Lead Fee:** Per-qualified lead pricing.

## Product Principles
1. **Low Friction:** No accounts for end-users. Upload -> Visualize -> Quote.
2. **"Good Enough" Visuals:** The preview must be credible enough to build trust, but does not need to be architectural-grade AR.
3. **Mobile First:** 80% of traffic will be mobile web.
4. **Data Isolation:** Tenant A (Nikki) must never see Tenant B's leads.