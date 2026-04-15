---
title: The Database Landscape for Startups
tags: [databases, postgres, nosql, vector, infrastructure]
summary: A map of database categories and when each actually makes sense for an early-stage startup.
---

# The Database Landscape for Startups

You'll eventually have multiple databases. At 0→1, you want as few as possible. One good default handles 90% of cases; the other 10% is where specialized stores earn their keep.

## Categories

### Relational (OLTP)
**Postgres, MySQL.**

The default. ACID, rich SQL, mature ecosystem. Postgres is the right answer for nearly every startup unless you have a specific reason otherwise.

Hosted options: **Neon** (serverless, branching), **Supabase** (Postgres + auth + storage + realtime), **PlanetScale** (MySQL, infinite scale), **Crunchy**, **RDS**.

### Document
**MongoDB, DynamoDB, Firestore.**

Schemaless-ish, flexible. Good when your data really is document-shaped (event logs, JSON blobs, highly variable schemas). Bad when it isn't — JOINs get painful, analytics queries suffer.

### Key-value / cache
**Redis, Upstash, Memcached, Cloudflare KV.**

Session stores, rate limits, counters, short-TTL cache. Don't use as a primary store.

### Search
**Elasticsearch, Meilisearch, Typesense, Algolia.**

When users search free-text and Postgres FTS isn't enough. Algolia is hosted and opinionated; Meili/Typesense are cheaper if you self-host.

### Analytics (OLAP)
**ClickHouse, BigQuery, Snowflake, DuckDB, Tinybird.**

Columnar, massive aggregation queries, not for transactional workloads. Run alongside your OLTP, not instead of it.

### Vector
**pgvector, Pinecone, Weaviate, Qdrant, Chroma.**

Embeddings + similarity search. Start with **pgvector** inside Postgres — one fewer system, good enough until it's not.

### Graph
**Neo4j, Dgraph, DuckDB + recursive CTEs.**

Useful for social graphs, knowledge graphs. Rarely the right first DB — Postgres handles most graph use cases fine up to medium scale.

### Time-series
**TimescaleDB, InfluxDB, QuestDB.**

Metrics, IoT, event telemetry. TimescaleDB is Postgres with extensions — low switching cost.

## Rule of thumb

Start with **Postgres**. Add specialized stores only when a real workload forces you to.

- Cache? Add Redis.
- Full-text search? Try Postgres FTS first; graduate to Meilisearch.
- Embeddings? pgvector.
- Analytics at scale? ClickHouse or BigQuery alongside.
- Events/logs? Separate from your primary DB.

## What not to do

- Pick MongoDB "for flexibility." Flexibility is what migrations are for.
- Use DynamoDB on day one because someone said it scales. So does Postgres — for longer than your startup will live.
- Run three databases at 5 users. You're optimizing imaginary problems.

## Related
- [Postgres for startups](./postgres-for-startups.md)
