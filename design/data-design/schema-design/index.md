---
title: Schema design
slug: schema-design
phase: design
sub_area: data-design
audience: []
stage: []
read_time_minutes: 6
last_updated: "2026-04-19"
---

## Principle

The shape of your data outlives the code that reads it. A bad schema keeps
paying interest long after the week you saved by skipping the design
conversation — queries get slower, migrations get scarier, and every new
feature pays a tax. The core discipline is the same across every datastore:
model around how the data is read, not how it feels natural to store.
Embed what is accessed together; reference what is accessed independently;
never design for a database feature you are not using.

## Choosing a variant

Pick the variant that matches your datastore. If you’re on MongoDB, use
the MongoDB team’s own document-model guidance — it’s the canonical source
and stays current with Atlas’s Performance Advisor. If you’re on Postgres
(or Supabase), use the Supabase-authored Postgres guide — it’s broader
than schema alone, with rules prioritized by impact, and its Schema Design
category is the natural Postgres counterpart to MongoDB’s. Variants for
other datastores will be added here as they become available.
