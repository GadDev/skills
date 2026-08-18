---
name: design-skill
description: Guides the user through designing and authoring a new Claude Code Skill by asking targeted questions and formatting their answers into a working SKILL.md — covering trigger design (the description field), scope (one workflow per skill), structure, worked examples, and bundled reference files. Use whenever the user wants to create, author, design, draft, or scaffold a new skill — e.g. "help me build a skill for X," "design a skill," "how do I write a SKILL.md," "turn this workflow into a skill," "why isn't my skill triggering." Not for editing an unrelated existing skill's content (just edit it directly) — this is for the design/authoring process itself, including diagnosing why a skill isn't loading.
---

# Design Skill

Helps a user go from "I have a workflow I keep repeating" to a Skill Claude
actually loads at the right time. The two failure modes this exists to
prevent: a skill with a vague description that never triggers, and a skill
that tries to do too much and either over-triggers or dilutes its own
instructions.

**The description field is the trigger, not a summary.** Claude decides
whether to load a skill by matching the task against the `description`
field alone, before reading anything else. Everything in this skill is in
service of getting that one field right, then keeping the body focused.

## When to use this

- The user wants to create a new skill from scratch
- The user has a skill that isn't triggering and wants to fix it
- The user wants feedback on a skill's description or scope before adding it

Do NOT use this to fix a bug in a skill's instructions once it's already
triggering correctly and producing the wrong output — that's a normal edit
(see the fix-loop in step 5), not a full design pass.

## Process

### 1. Ask for the trigger condition and the workflow, in one batch

Don't start drafting. Ask the user (batched, not one at a time):

- **When should this fire?** What request, phrasing, or situation should
  cause Claude to load it? Ask for 2-3 example phrasings the user would
  actually type.
- **What does it produce or apply?** A format, a checklist, a standard, a
  transformation — name the concrete output.
- **What makes it distinct?** If there's a sibling skill covering similar
  ground (e.g. two documentation standards), what's the differentiator?
- **Is there a negative case?** A phrasing that sounds similar but should
  route elsewhere, or not trigger at all.

If the user already has a rough draft, a workflow they do manually, or a
set of real examples of the output, extract these answers from that
instead of re-asking what they already told you.

### 2. Check scope and fast-path eligibility

One skill = one workflow. If the answers from step 1 describe two or more
unrelated things (a coding standard *and* a PR format *and* a security
checklist), stop and tell the user to split it — see `checklist.md` for
the full anti-pattern list and the splitting heuristic.

If the workflow is simple and self-contained and the user can hand you
**~5 concrete examples of the desired output**, skip straight to drafting
a complete SKILL.md from those examples (the "Skill Creator" shortcut) —
then still run it through steps 3 and 5 below before calling it done. Don't
run the full interview on something this scoped; do run the description
rubric and the test checklist on it regardless of how it was drafted.

### 3. Draft or diagnose the description against the rubric

Read `checklist.md` for the four-part description rubric and score the
draft against it before writing anything else in SKILL.md. Show the
description to the user for approval before proceeding.

If the user instead arrives with "Claude never loads my skill," this is
the same step run backwards: read the existing description and score it
against the same rubric rather than jumping to rewrite instructions.
Almost always the fix is a sharper description. If the report is instead
about *wrong output* (skill loads, does the wrong thing), that's not a
description problem — go to step 5's fix-loop.

### 4. Write the body: core guidance, one example, link the rest

Structure, matching the shape in `example-skill.md`:

- **Frontmatter** — `name` (lowercase-kebab, matches folder), `description`
  from step 3.
- **What it does / when to use it** — one short paragraph plus explicit
  in-scope and out-of-scope bullets.
- **One worked example** — a complete, concrete input/output pair beats
  three paragraphs of abstract rules. If the user can't produce one, ask
  for a real instance of the workflow instead of inventing one.
- **Core rules**, stated as short declaratives, not prose essays. Start
  minimal — expand only from real usage gaps, not anticipated ones.
- **Reference files**, only for detail Claude needs occasionally, not
  every time: `Read ./reference.md for the full schema.` Don't inline a
  full schema/template into SKILL.md if it's only needed on a subset of
  invocations — bundle it as a sibling file instead.

Check the draft against the anti-pattern list in `checklist.md` (restating
default behavior, over-prescribing open-ended tasks, inlining rare detail)
before treating the body as finished.

### 5. Test, then run the fix-loop

Run the three-item test checklist in `checklist.md`: a realistic phrase
loads it, a near-miss phrase doesn't, and the output matches the
description's promise.

- **Doesn't trigger** → fix the description (step 3), not the body.
- **Triggers but consistently wrong on one specific thing** → add one
  explicit declarative sentence to the body (e.g. "Only include the
  Lessons Learned section for P1/P2 incidents"). Claude follows a stated
  constraint before it infers one from example patterns, so this beats
  adding more examples or scrapping the skill.

Change one thing at a time, retest, then move on — don't edit the
description and the body in the same pass.

### 6. Wire it into the repo conventions

If this repo has an `AGENTS.md` or equivalent skill-authoring convention
(as this one does), follow it: folder name equals frontmatter `name`, add
the skill to any skill index/table, run the repo's validation script, and
add a changeset if the repo uses one. Don't skip repo-specific packaging
steps just because the skill content itself is done.

## Reference files

- `checklist.md` — the description rubric, the anti-pattern list, and the
  three-item test checklist. Read when drafting/auditing a description
  (step 3) or scope-checking an idea (step 2) or reviewing a body (step 4).
- `example-skill.md` — a complete, unabridged SKILL.md produced by this
  process, showing target shape and length. Read when writing the body
  (step 4) if a concrete reference would help more than the bullet list
  above.

## Notes

- A precise description that never gets used is worthless — but so is a
  perfectly-scoped skill nobody can find. If the user isn't sure what to
  name it, name it after the workflow, not the tool ("incident-postmortem",
  not "postmortem-helper").
- Treat skills like code: version them, keep them in the repo, expect the
  description to need a follow-up edit once real usage reveals a
  near-miss phrasing you didn't anticipate.
