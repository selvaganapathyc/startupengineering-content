# STRUCTURE.md — file formats and conventions

Reference for contributors and tool builders. Paired with the JSON Schemas in
`schemas/`.

## Folder layout

```
[phase]/index.md                      # Phase overview
[phase]/[sub-area]/index.md           # Sub-area overview (design only, today)
[phase]/[topic]/                      # Topic folder
  ├── index.md                        # Principle + variants framing
  ├── variants.yaml                   # Metadata for every variant
  └── [variant-folder]/               # One folder per Selva-authored variant only
      ├── skill.md
      ├── visual.tsx                  # Optional, framework-agnostic React
      ├── README.md                   # Optional, human-readable docs
      └── plugin/                     # Optional, plugin manifest and files
```

Only Selva-authored variants get local folders. Individual and company
recommendations live exclusively as entries in `variants.yaml` with external URLs.

## `index.md`

### Phase `index.md`

```yaml
---
title: Develop
phase_number: 4
slug: develop
short_description: Build, review, ship code
audience:
  - Engineers shipping code
---

Body: prose introducing the phase.
```

Schema: `schemas/phase-frontmatter.schema.json`.

### Sub-area `index.md`

```yaml
---
title: Data design
slug: data-design
parent_phase: design
short_description: Schemas, stores, and decisions that outlive your code.
---

Body: prose introducing the sub-area.
```

Schema: `schemas/subarea-frontmatter.schema.json`.

### Topic `index.md`

```yaml
---
title: Code review
slug: code-review
phase: develop
sub_area: null        # null for topics directly under a phase
audience: []
stage: []             # pre-seed | seed | series-a | post-pmf
read_time_minutes: 5
last_updated: 2026-04-19
---

## Principle

Prose — Selva's "why this matters".

## Choosing a variant

Prose — when to reach for which variant.
```

Both sections are parsed by heading. Do not add other `##` sections today.

Schema: `schemas/topic-frontmatter.schema.json`.

## `variants.yaml`

Top-level `variants:` list. Each entry conforms to `schemas/variant.schema.json`.

Fields:

| Field | Required | Notes |
|---|---|---|
| `id` | yes | kebab-case; globally unique across the repo; immutable |
| `name` | yes | ≤ 80 chars |
| `author` | yes | Person or company name |
| `author_type` | yes | `individual` or `company` |
| `context_fit` | yes | "When this variant fits" — written by Selva regardless of author |
| `recommender_note` | when `author != Selva` | Selva's reason for including; forbidden when `author == Selva` |
| `source_url` | when `author != Selva` | Canonical URL for the variant |
| `source_skill_url` | recommended | Direct URL to the skill file at source |
| `install_command` | optional | e.g., `/plugin install org/repo` |
| `last_verified` | recommended | `YYYY-MM-DD`; date Selva last confirmed the variant |
| `layers` | yes | Map of layer → path (`./...`) or URL (`http...`) |
| `tags` | optional | `category:value` strings, lowercase with hyphens |

### Paths in `layers.*`

- `./something/skill.md` — local to the topic folder.
- `https://...` — external URL.

Never use bare paths — the prefix distinguishes local from external.

## Variant `skill.md`

Standard skill file. Optional YAML frontmatter for skill metadata, then content
the agent consumes. Keep focused on agent instructions. Author reasoning lives
in the topic's `index.md`, not here.

## Tags

Format: `category:value`, lowercase, hyphens.

Common categories:

- `difficulty:beginner | intermediate | advanced`
- `stage:pre-seed | seed | series-a | post-pmf`
- `time:quick | weekend | multi-week`
- `lang:python | typescript | any`
- `tech:postgres | mongodb | stripe | security`

Tags must NOT encode phase, topic, sub-area, author, or author_type — those
are structural fields.

## Identifier stability

- **Variant `id`** is immutable. Changing it breaks external references.
- **Topic `slug`** = folder name. Renaming it is a breaking change (major bump).
- **Phase slug** is fixed; never changes.

See `VERSIONING.md`.
