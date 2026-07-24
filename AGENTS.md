# Working in this repo

This is a **content repo of agent skills** — no application code, no build
step. Each skill is a single `SKILL.md` file; the value is in the prose, so
edits are mostly writing, not programming.

## Layout

```
skills/<name>/SKILL.md    # one skill per folder; folder name == frontmatter name
scripts/validate-skills.mjs   # frontmatter + folder/name checks (dependency-free)
.claude-plugin/marketplace.json   # Claude Code plugin install path
.changeset/               # versioning (changesets)
```

## SKILL.md conventions

Every skill starts with YAML frontmatter:

```yaml
---
name: my-skill              # lowercase-kebab, MUST equal the folder name
description: One paragraph, third person, that tells the agent WHEN to trigger.
                            # Lead with what it does, then concrete trigger phrases.
---
```

Guidelines these skills follow — keep them consistent:

- **The description is a trigger, not a summary.** Include the phrasings a
  user would actually say, and explicitly note when *not* to use it (and
  which sibling skill to use instead).
- **Skills compose.** `ai-release-triage` and `ai-pulse` both call into
  `evidence-tiering`, and each has a fallback rule so it still works if the
  shared skill isn't installed. Preserve that pattern when adding related
  skills.
- **Method over snapshot.** Skills describe how to reason, not a frozen list
  of "current" models/tools — they should stay useful as the landscape
  changes.
- **Lead with the verdict**, then the supporting reasoning.

## Before committing

- `npm run validate` — checks every SKILL.md has valid frontmatter and that
  `name` matches its folder. CI runs the same check on push/PR.
- Add a changeset (`npm run changeset`) for any user-facing skill change so
  the release workflow can version it.

## Adding a skill

1. `mkdir skills/<name>` and write `SKILL.md` with the frontmatter above.
2. Add it to the table in `README.md`.
3. `npm run validate`, then `npm run changeset`.
