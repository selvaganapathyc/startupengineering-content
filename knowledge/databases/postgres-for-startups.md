---
title: Postgres for Startups
tags: [databases, postgres, architecture]
summary: Why Postgres is almost always the right default, and how to use it well from day one without painting yourself into a corner.
---

# Postgres for Startups

Postgres is boring. That's the feature.

For a startup at 0→1, the database is not where you want novelty. You want a store that:

- Handles your schema changes without drama.
- Survives 10× traffic growth without rewriting the app.
- Has every library, every ORM, every hosted option.
- Lets you sleep at night.

That's Postgres.

## Why it wins

- **ACID + rich SQL**: complex joins, transactions, constraints, window functions.
- **JSON support**: when you genuinely need schemaless, `jsonb` covers it without leaving Postgres.
- **Extensions**: `pgvector` for embeddings, `PostGIS` for geo, `pg_stat_statements` for profiling, `TimescaleDB` for time-series.
- **Portability**: every host runs it. Your SQL moves with you.
- **Talent**: everyone knows it.

## Hosted options (pick one)

- **Neon** — serverless, branching (great for preview environments), generous free tier.
- **Supabase** — Postgres + auth + storage + realtime. Solid for full-stack starts.
- **RDS / Cloud SQL** — if you already live on AWS/GCP.
- **Crunchy, PlanetScale (MySQL cousin), Fly Postgres** — all fine.

Default pick at 0→1: **Neon** for serverless web apps, **Supabase** if you also want auth/storage bundled.

## Day-one setup that scales

1. **UUIDs, not serial ints** for public-facing IDs. (`uuid_generate_v7()` once available; `ULID` or `uuid-ossp v4` today.)
2. **`created_at` / `updated_at`** on every table. You'll thank yourself.
3. **Soft delete with `deleted_at`** — easier to recover than to explain lost data.
4. **Foreign keys on**. They catch bugs cheaply.
5. **One schema per logical domain** if the app grows — easier than splitting DBs later.
6. **Migrations from day one**: Prisma, Drizzle, Atlas, or plain `.sql` + `psql` — but versioned in git.

## Things to learn early

- **`EXPLAIN ANALYZE`** — read query plans before you optimize.
- **Indexes**: B-tree for most, GIN for JSON/array/FTS, GiST for geo.
- **Connection pooling**: use PgBouncer or a serverless-aware pooler (Neon's built-in, Supavisor). Don't let your app open N connections.
- **`pg_stat_statements`** — turn it on, find your slow queries.
- **Vacuum**: autovacuum handles 99% of cases; know it exists.

## When Postgres is *not* enough

- You're doing 100k+ writes/sec. (You aren't.)
- You need truly global, multi-region reads/writes. (You don't, yet.)
- Your data is genuinely graph-shaped with deep traversal. (Rarely.)

If any of those become true, you've earned the right to add a second store. Until then: Postgres.

## Related
- [Database landscape](./landscape.md)
