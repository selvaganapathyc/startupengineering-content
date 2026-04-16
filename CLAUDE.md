# Guidance for agents

This repo is a skill library for startup engineering. When a user connects to it:

- Orient via root `README.md`, then folder READMEs.
- Skills are organized into six SDLC-aligned categories: `planning-and-design/`, `implementation/`, `code-quality/`, `security-and-performance/`, `delivery-and-operations/`, `agent-workflow/`.
- Each skill lives in its own folder with a `SKILL.md` (Claude Code skill convention: `name` + `description` frontmatter).
- New skill: copy `templates/skill.md` into a new folder as `SKILL.md` under the appropriate category. Preserve frontmatter.
- Conventions live in `meta/README.md`.
- Keep skills atomic — one skill per folder, linked rather than duplicated.
