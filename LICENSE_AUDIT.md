# License Audit — Skill Content

This file tracks the license status of every variant's SKILL.md content.
Every variant in `variants.yaml` with a `source_skill_url` must have its
license declared. This file is the human-readable record of those
declarations, paired with the machine-readable `license` field on each
variant.

## Status definitions

- **Permitted**: License explicitly allows reproduction with attribution.
  Site caches content and renders inline.
- **Restricted**: No explicit license, or license doesn't permit
  reproduction. Site links out to canonical source.
- **Permission pending**: Reached out to author, awaiting response.
  Treated as restricted until confirmed.

## Permitted license values

| License | Status | Notes |
|---|---|---|
| `MIT` | Permitted | Standard permissive license |
| `Apache-2.0` | Permitted | Standard permissive with patent grant |
| `BSD-2-Clause`, `BSD-3-Clause` | Permitted | Standard permissive |
| `CC-BY-4.0` | Permitted | Creative Commons with attribution |
| `CC-BY-SA-4.0` | Permitted | Creative Commons with attribution + share-alike |
| `CC0-1.0` | Permitted | Public domain dedication |
| `ISC` | Permitted | Permissive, similar to MIT |
| `Unlicense` | Permitted | Public domain dedication |
| `granted-by-author` | Permitted | Individual author personally granted permission |
| `all-rights-reserved` | Restricted | Default when no license file present |
| `unknown` | Restricted | Awaiting verification |
| `GPL-*` | Restricted | Copyleft — caching triggers complex obligations |
| `proprietary` | Restricted | No explicit reproduction permission |

## Variants

| Variant ID | Author | License | Status | Verified |
|---|---|---|---|---|
| selva-idea-refine | Selva | MIT | Permitted | 2026-04-19 |
| selva-planning-and-task-breakdown | Selva | MIT | Permitted | 2026-04-19 |
| selva-spec-driven-development | Selva | MIT | Permitted | 2026-04-19 |
| selva-api-and-interface-design | Selva | MIT | Permitted | 2026-04-19 |
| selva-documentation-and-adrs | Selva | MIT | Permitted | 2026-04-19 |
| selva-frontend-ui-engineering | Selva | MIT | Permitted | 2026-04-19 |
| selva-code-review-and-quality | Selva | MIT | Permitted | 2026-04-19 |
| selva-code-simplification | Selva | MIT | Permitted | 2026-04-19 |
| selva-context-engineering | Selva | MIT | Permitted | 2026-04-19 |
| selva-debugging-and-error-recovery | Selva | MIT | Permitted | 2026-04-19 |
| selva-incremental-implementation | Selva | MIT | Permitted | 2026-04-19 |
| selva-source-driven-development | Selva | MIT | Permitted | 2026-04-19 |
| selva-test-driven-development | Selva | MIT | Permitted | 2026-04-19 |
| selva-using-agent-skills | Selva | MIT | Permitted | 2026-04-19 |
| selva-browser-testing-with-devtools | Selva | MIT | Permitted | 2026-04-19 |
| selva-performance-optimization | Selva | MIT | Permitted | 2026-04-19 |
| selva-shipping-and-launch | Selva | MIT | Permitted | 2026-04-19 |
| selva-ci-cd-and-automation | Selva | MIT | Permitted | 2026-04-19 |
| selva-deprecation-and-migration | Selva | MIT | Permitted | 2026-04-19 |
| selva-git-workflow-and-versioning | Selva | MIT | Permitted | 2026-04-19 |
| selva-security-and-hardening | Selva | MIT | Permitted | 2026-04-19 |
| mongodb-schema-design | MongoDB | Apache-2.0 | Permitted | 2026-04-19 |
| supabase-postgres-best-practices | Supabase | MIT | Permitted | 2026-04-19 |

## Permission requests sent

Track individual authors who've been contacted for permission.

| Author | Skill | Date sent | Status | Notes |
|---|---|---|---|---|
| (none yet) | | | | |

## License verification checklist for new variants

Before adding a variant to `variants.yaml`:

1. Visit author's repo
2. Check for `LICENSE` / `LICENSE.md` / frontmatter `license:` field
3. If permissive license exists, record it in `variants.yaml` `license` field
4. If no license, decide: link-out only (`all-rights-reserved`), or request
   permission
5. If requesting permission, log in this file and send email
6. Update this file with verified status

Never set a `license` value to a permissive string without actually verifying
it. The field is a legal declaration, not a guess.
