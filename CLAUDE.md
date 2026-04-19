# Guidance for agents

See [AGENTS.md](./AGENTS.md) for the full agent-oriented introduction. Summary:

- Six lifecycle phases (`define`, `discover`, `design`, `develop`, `validate`,
  `operate`) plus `agentic-engineering/`.
- Each topic = `[phase]/[topic]/` containing `index.md` (principle) and
  `variants.yaml` (one entry per variant).
- Selva-authored variants live in a local `selva-*/skill.md` subfolder. Other
  variants point to external URLs via their `layers.*` fields.
- Schemas are in `schemas/`. Validate with `node scripts/validate.js`.
- Machine-readable overview: `MANIFEST.yaml` (auto-generated — do not hand-edit).

Do not modify files in this repo without a pull request from a human.
