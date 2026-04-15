---
title: The Cloud Landscape for Startups
tags: [cloud, infrastructure, aws, gcp, azure, vercel, cloudflare]
summary: A map of cloud providers and deployment targets, framed for early-stage teams choosing where to run.
---

# The Cloud Landscape for Startups

The cloud isn't one thing. For a startup, the choice is less "AWS vs GCP" and more "how much infra do I want to run myself vs rent fully managed." That axis matters more than vendor loyalty at the 0→1 stage.

## The tiers

### 1. Hyperscalers
**AWS, Google Cloud, Azure.**

Full control, every primitive, deepest discounts at scale. Also: dozens of services you don't need yet, bills that surprise you, and IAM that will humble you.

- **AWS** — broadest catalog, most mature, most tutorials.
- **GCP** — cleaner abstractions, first-class for data/ML, better UX in several places.
- **Azure** — picked mostly in enterprise contexts; strongest when your buyer already lives in Microsoft land.

Default pick at 0→1: none of these, unless you have a specific reason.

### 2. Simplified clouds
**Fly.io, Render, Railway, DigitalOcean App Platform, Heroku.**

Abstract away regions, VPCs, IAM. Push code, get URL. Pricing is predictable. Perfect for a first year — and often a second.

### 3. Serverless / edge
**Vercel, Netlify, Cloudflare Workers, AWS Lambda, Cloudflare Pages.**

Great for web apps, APIs, and static content. Especially Vercel for Next.js, Cloudflare for global edge. Pay per request, auto-scale, near-zero ops.

### 4. Specialized
- **Databases**: Neon, Supabase, PlanetScale, Turso, Upstash.
- **Storage**: Cloudflare R2, AWS S3, Backblaze B2.
- **Auth**: Clerk, Auth.js, WorkOS.
- **Queues/cron**: Inngest, Trigger.dev, Defer.

You'll end up composing several of these.

## How to think about picking

Ask in this order:

1. **What's my app shape?** Static + API = Vercel/Cloudflare. Long-running server = Fly/Render. Big data pipeline = GCP/AWS.
2. **What's my team depth?** No DevOps person → stay in tiers 2–4.
3. **What's my cost ceiling?** Tiers 2–4 are predictable. Tier 1 is not, without discipline.
4. **What's my exit door?** Prefer providers where data portability is easy (Postgres > proprietary stores).

## Rule of thumb for 0→1

- **Web app**: Vercel + Neon + Cloudflare R2.
- **Backend service**: Fly.io or Render + managed Postgres.
- **Data pipeline**: GCP (BigQuery) or AWS (serverless Lambda + S3 + Athena).
- **Mobile backend**: Supabase or Firebase.

Migrate to a hyperscaler when the math demands it — not before.

## Related
- [Picking a cloud](./picking-a-cloud.md)
