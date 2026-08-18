---
"gaddev-skills": minor
---

feat: add `design-skill` skill

Guides the user through designing and authoring a new Claude Code skill by
asking targeted questions and formatting the answers into a working
SKILL.md. Covers getting the description field right (trigger condition,
output, distinctive marker, negative case), keeping scope to one workflow
per skill, a "Skill Creator" fast path for simple skills backed by 5
concrete examples, writing one worked example instead of prose rules,
bundling reference files for occasional detail, and diagnosing skills that
fail to trigger versus skills that trigger but produce the wrong output.
Ships its own `checklist.md` (description rubric, anti-pattern list, test
checklist) and `example-skill.md` (a full worked SKILL.md) as bundled
reference files, practicing the progressive-disclosure pattern it teaches.
