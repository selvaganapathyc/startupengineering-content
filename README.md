# startupengineering

Curated knowledge base for building startups in the agentic era, by Selva Ganapathy.

This is a **content repo** — markdown, YAML, and supporting assets only. It is the
source of truth consumed by humans browsing the files, agents fetching them cold,
forks building their own renderings, and the canonical site at
<https://startupengineering.io>.

## What's here

Six lifecycle phases, plus a non-lifecycle onboarding category:

- `define/` — Problem, user, bet
- `discover/` — Solution options, feasibility
- `design/` — APIs, schemas, architecture (has sub-areas)
- `develop/` — Build, review, ship code
- `validate/` — Prove the bet, measure value
- `operate/` — Reliability, scale, operate
- `agentic-engineering/` — Onboarding for working with coding agents

## Layout

Each topic lives in `[phase]/[topic]/` (or `[phase]/[sub-area]/[topic]/`) and has:

- `index.md` — the principle (Selva's "why this matters") plus a short
  "choosing a variant" framing.
- `variants.yaml` — metadata for every variant that applies the principle.
  Selva-authored variants point to a local `./selva-*/skill.md`. Individual
  and company recommendations point to external URLs.
- `selva-*/skill.md` — the agent-facing skill for each Selva-authored variant.

Top-level helpers:

- `schemas/` — JSON Schemas that formalize the shapes above.
- `scripts/` — `validate.js`, `generate-manifest.js`, `check-links.js`.
- `shared/` — cross-cutting content (philosophy, glossary).
- `MANIFEST.yaml` — auto-generated machine-readable index of the whole repo.

## Consuming this repo

- **Humans:** browse the folders; each `index.md` is readable on its own.
- **Agents:** start at [AGENTS.md](./AGENTS.md) and [MANIFEST.yaml](./MANIFEST.yaml).
- **Site / tool builders:** [STRUCTURE.md](./STRUCTURE.md) describes the file
  formats; [VERSIONING.md](./VERSIONING.md) describes how this repo evolves.

## Contributing

Open a pull request. CI runs `node scripts/validate.js` against every change.
Please read `STRUCTURE.md` before adding a new topic or variant.

## License

Selva-authored content: [CC-BY-4.0](./LICENSE). Variants that point to external
sources retain their original authors' licenses.
