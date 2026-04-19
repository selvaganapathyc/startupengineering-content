# Templates

Reusable templates for new content. Copy, rename, fill in.

- `index.md` — template for a topic's `index.md` (principle + choosing a variant).
- `variants.yaml` — template for a topic's `variants.yaml`.
- `skill.md` — template for a Selva-authored variant's `skill.md`.

Workflow for a new topic:

1. Make a folder at `[phase]/[topic]/` (or `[phase]/[sub-area]/[topic]/`).
2. Copy `templates/index.md` in, fill in the frontmatter and the two prose
   sections.
3. Copy `templates/variants.yaml` in, add your first variant entry.
4. If you're the author, make a subfolder `selva-[slug]/`, copy
   `templates/skill.md` in as `skill.md`, and write the skill body.
5. Run `node scripts/validate.js` from the repo root to check your work.
