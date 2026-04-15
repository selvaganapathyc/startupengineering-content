---
title: Picking a Cloud for Your Startup
tags: [cloud, decisions, infrastructure, cost]
summary: A decision framework for choosing where to host your startup — prioritizing speed, cost predictability, and future optionality.
---

# Picking a Cloud for Your Startup

Most "AWS vs GCP vs Vercel" debates miss the point. At 0→1, the right question is: **what lets me ship fastest without boxing me in later?**

## The three constraints

1. **Speed to first deploy.** Every day spent on infra is a day not spent on product.
2. **Cost predictability.** Surprise bills kill runway faster than burn.
3. **Exit optionality.** Can I move if I need to?

Rank them in that order at pre-PMF. Flip 1 and 3 once you have real revenue.

## Decision tree

1. **Are you building a typical web app (Next.js, React + API)?**
   - Yes → Vercel for frontend + Neon/Supabase for DB. Done.
   - No → continue.

2. **Long-running backend service?**
   - Yes → Fly.io or Render. Managed Postgres alongside.
   - No → continue.

3. **Data-heavy workload?**
   - Batch pipelines → GCP (BigQuery-first).
   - Streaming → AWS (Kinesis) or Confluent Cloud.

4. **ML/GPU workloads?**
   - Inference → Modal, Replicate, Baseten.
   - Training → Lambda Labs, CoreWeave, RunPod.

5. **Enterprise sales motion from day one?**
   - Customer is on Azure → Azure.
   - Customer is AWS-default → AWS.
   - (This matters more than you think for procurement.)

## Avoid these traps

- **Premature hyperscaler.** Using AWS for a 3-person team "because we'll need it later" costs 10× the time for 0× the benefit right now.
- **Vendor-locked primitives.** DynamoDB, Firestore, Cosmos DB — convenient, painful to migrate out of. Prefer Postgres unless you have a real reason.
- **Free tier abuse.** If your business depends on a free tier staying free, you have a business-model problem.
- **Multi-cloud early.** Don't. Pick one, master it, revisit in 18 months.

## What to do on day one

- Buy the domain.
- Deploy a "hello world" to your chosen host.
- Put a Postgres (Neon free tier) behind it.
- Add a CDN and auto-deploy from GitHub.
- Stop there. Build features.

Most startups die from not shipping, not from picking the wrong cloud.

## Related
- [Cloud landscape](./landscape.md)
