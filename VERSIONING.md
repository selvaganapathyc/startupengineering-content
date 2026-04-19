# VERSIONING.md

This repo follows **content-SemVer**. The version string lives in
`MANIFEST.yaml` under `version` and git tags mark each release (e.g., `v1.0.0`).

## Levels

- **Major** (`1.0.0` → `2.0.0`) — breaking. Folder structure reorganized, schema
  fields removed or renamed, topic URLs moved, variant IDs renamed.
- **Minor** (`1.0.0` → `1.1.0`) — additive. New phases, new topics, new schema
  fields (backward-compatible), new variants.
- **Patch** (`1.0.0` → `1.0.1`) — content edits, typo fixes, variant additions
  to existing topics, `last_verified` date updates.

## Consumption

`main` moves freely. Consumers (including the canonical site) choose when to
update by pinning to a specific version tag or commit.

- Pin to a tag for deterministic builds: `v1.0.0`.
- Pin to `main` for always-latest (accept the risk of breakage).

## Breaking changes

Any change that meets any of these criteria is breaking and requires a major
bump plus a migration note in this file:

- A topic folder is renamed or moved.
- A phase slug changes (extremely unlikely — the six phase slugs are fixed).
- A schema field is removed or renamed.
- A variant `id` is reused for a different variant.

## Non-breaking changes

- New topics, sub-areas, phases (if ever added).
- New optional schema fields.
- New variants in an existing topic.
- Prose edits in any `index.md`, `skill.md`, or other markdown.
- Updates to `last_verified` dates.

## Migrations

This section records notable breaking changes. Empty at 1.0.0.

---

## 1.0.0 — 2026-04-19

Initial structured release. Six lifecycle phases, one topic fully populated as
a reference (`develop/code-review-and-quality/`), all existing Selva-authored
skills migrated from the pre-structural layout to topic folders with
`index.md` + `variants.yaml` + `selva-*/skill.md`.
