See [AGENTS.md](AGENTS.md) for repo layout, SKILL.md conventions, and the
validate/changeset workflow. Everything there applies to Claude Code too.

Quick reminders:

- One skill per `skills/<name>/SKILL.md`; the folder name must equal the
  frontmatter `name`.
- Run `npm run validate` after editing any SKILL.md.
- The description field is a *trigger* — write it so the skill fires on the
  phrasings a user would actually use.
