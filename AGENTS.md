# AGENTS.md — Agent-oriented intro

You are reading a curated knowledge base of skills, principles, and recommendations
for building startups in the agentic era. This file tells you how to navigate it.

## Folder tree

```
startupengineering-content/
├── README.md                         # Human-oriented intro
├── AGENTS.md                         # This file
├── MANIFEST.yaml                     # Machine-readable overview of the whole repo
├── STRUCTURE.md                      # Detailed file-format documentation
├── VERSIONING.md                     # Stability / versioning policy
├── LICENSE
│
├── agentic-engineering/              # Non-lifecycle onboarding category
├── define/                           # Phase 1 — problem, user, bet
├── discover/                         # Phase 2 — solution options, feasibility
├── design/                           # Phase 3 — APIs, schemas, architecture (has sub-areas)
├── develop/                          # Phase 4 — build, review, ship code
├── validate/                         # Phase 5 — prove the bet
├── operate/                          # Phase 6 — reliability, scale, operate
│
├── shared/                           # Cross-cutting content
│   ├── philosophy.md
│   └── glossary.md
│
├── parking-lot/                      # Skills not yet placed
├── schemas/                          # JSON Schemas
└── scripts/                          # validate.js, generate-manifest.js, check-links.js
```

## Where principles live

Every topic has an `index.md` at its root. It contains two prose sections:

- `## Principle` — Selva's "why this matters".
- `## Choosing a variant` — how to pick among the variants that apply it.

File locations:

- `[phase]/[topic]/index.md` — topics directly under a phase.
- `[phase]/[sub-area]/[topic]/index.md` — topics under a sub-area (today only
  under `design/`).

## Where variant metadata lives

Every topic has a `variants.yaml` next to its `index.md`. It lists every variant
that applies the topic's principle:

```yaml
variants:
  - id: selva-code-review
    name: Pragmatic code review
    author: Selva
    author_type: individual
    context_fit: "For 2–6 engineers doing fast iteration with Claude Code."
    last_verified: 2026-04-19
    layers:
      skill: ./selva-code-review/skill.md      # local path
      visual: ./selva-code-review/visual.tsx
    tags: [difficulty:intermediate]

  - id: karpathy-deep-review
    name: Deep code review
    author: Andrej Karpathy
    author_type: individual
    context_fit: "For teams where every merge matters."
    source_url: https://github.com/example
    source_skill_url: https://github.com/example/blob/main/SKILL.md
    recommender_note: "Reach for this when you're past PMF."
    last_verified: 2026-04-19
    layers:
      skill: https://github.com/example/blob/main/SKILL.md   # external URL
    tags: [difficulty:advanced]
```

## What `author` / `author_type` mean

- `author: Selva` + `author_type: individual` — Selva's own authored work. Lives
  in a local `selva-*/` folder.
- `author: [person]` + `author_type: individual` — a curated recommendation from
  an individual author. No local folder; all layers point to external URLs.
- `author: [company]` + `author_type: company` — a vendor-authored canonical skill.
  No local folder; all layers point to the vendor's URLs.

Non-Selva variants always include `source_url` and `recommender_note` (Selva's
reason for including them). The schema enforces this.

## Local paths vs external URLs in `layers.*`

- Starts with `./` → **local**. Resolve relative to the directory that contains
  `variants.yaml`. Fetch from the local filesystem or raw GitHub.
- Starts with `http://` or `https://` → **external**. Fetch from the URL.

Never use bare paths — the prefix is how agents detect which mode to use.

## How to consume

Typical agent flow:

1. Clone the repo, or fetch raw files via the GitHub API.
2. Read this file and `MANIFEST.yaml` to orient.
3. Navigate to the topic you care about (e.g., `develop/code-review/index.md`).
4. Read `variants.yaml` in that directory. For each variant:
   - If `layers.skill` starts with `./`, fetch it locally.
   - Otherwise fetch the external URL.
5. Validate any data you parse against `schemas/*.json` if you want certainty.

## What you must NOT do

- Do not modify files in this repo. Contributions happen via pull requests from
  humans.
- Do not assume site-specific context. This repo is framework-agnostic; there is
  no `next.config`, no theme colors, no tab names.
- Do not dereference URLs under the assumption they're stable. Check
  `last_verified` on each variant; a stale date means the URL may no longer
  point to the intended content.
