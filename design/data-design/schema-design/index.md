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

Pick the variant that matches your datastore. MongoDB's own team maintains
the canonical document-model guidance and keeps it current with Atlas's
actual suggestions and failure modes — reach for it when you're on MongoDB
and need to design or audit a schema. Variants for other datastores will
be added here as they become available.
