# Description rubric and anti-patterns

Read this when drafting or auditing a description, or when scope-checking a
skill idea. Not needed for every invocation — only when step 2 or step 4 of
SKILL.md sends you here.

## Description rubric (all four, in order)

1. **Trigger condition** — "when writing/reviewing/doing X." Concrete
   situation, not a topic.
2. **Output/action** — what it produces or applies, named plainly.
3. **Distinctive marker** — what makes this skill the right match versus a
   sibling skill or Claude's own default behavior on the same topic.
4. **Negative case** — what NOT to use it for, and which sibling skill (if
   any) handles that case instead.

Score each candidate description against all four. Missing #1 → won't
trigger. Missing #3 → collides with siblings. Missing #4 is tolerable for a
skill with no siblings, but add it the moment a second, similar skill
exists.

## Common anti-patterns (check before finalizing)

- **Bundling unrelated workflows** — a coding standard + a PR format + a
  security checklist in one skill. Split by "would a user ever want just
  this piece" — if yes, separate skill.
- **Restating what Claude already knows how to do** — a skill that just
  says "write clean code" or "use good practices" adds context weight
  with no new instruction. Every line should encode something Claude
  wouldn't otherwise do.
- **Over-prescribing exploration tasks** — rigid numbered steps for a task
  that's inherently open-ended (e.g. "investigate this incident") train
  the model out of using judgment. Prescriptive steps belong to workflows
  with a genuinely fixed shape (formats, checklists, transformations);
  open-ended tasks want principles and one example, not a script.
- **Inlining rarely-needed detail** — a full schema, template, or table
  pasted into SKILL.md that's only relevant on a subset of invocations.
  Move it to a bundled file and reference it with a `Read ./file for X`
  line instead — keeps the always-loaded description/body lean.
- **Vague or over-broad description** — see rubric above; both fail, just
  in opposite directions (never triggers vs. triggers on everything).
- **No worked example** — three paragraphs of abstract rules is weaker
  than one concrete input/output pair. If you can't produce a real one,
  that's a signal the workflow itself isn't concrete enough yet.

## Test checklist (run all three before calling a skill done)

1. A realistic trigger phrase loads it.
2. A near-miss phrase (sounds similar, shouldn't match) does NOT load it.
3. The output matches what was specified in the description.

Fix loading failures by editing the description. Fix wrong-output failures
by adding one targeted declarative rule to the body. Change one thing,
retest, then move to the next.
