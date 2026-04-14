# Meta

Conventions for this repo.

## Principles
- Write for a founder-engineer audience.
- Prefer concrete over abstract. Show examples.
- One idea per file. Link generously.
- Keep frontmatter consistent so the website and agents can parse it.

## Frontmatter
Every content file should start with YAML frontmatter. See [`../templates/`](../templates).

## Naming
- Folders and files: `kebab-case`.
- One topic per folder when it has multiple files.

## Agent usage
When an agent is connected to this repo, it should:
1. Read `README.md` at the root first.
2. Use folder READMEs to orient.
3. Respect frontmatter tags when filtering.
