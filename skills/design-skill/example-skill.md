# Worked example: a full SKILL.md produced by this process

Input from user: "We keep writing incident postmortems inconsistently, I
want a skill for our format." Answers extracted in step 1: triggers on
"write a postmortem" / "document this incident"; sections are Summary,
Timeline, Root Cause, Action Items, and Lessons Learned (P1/P2 only);
distinct from general debugging notes.

This is the resulting file, unabridged, showing the target shape and
length — frontmatter, scope bullets, one worked example, short declarative
rules, nothing more:

---

```markdown
---
name: incident-postmortem
description: Apply the client's incident postmortem format when writing or reviewing an incident writeup. Sections: Summary, Timeline, Root Cause, Action Items, and Lessons Learned (P1/P2 severity only). Use when a developer asks to "write a postmortem," "document this incident," or fill out an incident report — not for general debugging notes or live triage.
---

# Incident Postmortem

Applies the team's standard incident writeup format so postmortems are
consistent regardless of who writes them.

## When to use this

- Writing or reviewing a postmortem for a resolved incident
- Filling out an incident report template

Do NOT use this for live triage notes or debugging scratchpads — only for
the post-resolution writeup.

## Format

Sections, in order: Summary, Timeline, Root Cause, Action Items. Add
Lessons Learned only for P1/P2 severity incidents — omit it entirely for
P3/P4.

## Example

**Summary:** Checkout API returned 500s for 12 minutes on 2026-08-10,
affecting ~3% of checkout attempts.

**Timeline:**
- 14:02 — deploy of checkout-service v2.3.1
- 14:04 — error rate alert fires
- 14:16 — rollback completes, errors stop

**Root Cause:** v2.3.1 removed a null check on `cart.discount`, throwing on
carts with no discount applied.

**Action Items:**
- Add null-check regression test (owner: A. Diallo, due 2026-08-17)
- Add discount-field to deploy smoke test (owner: platform team)

**Lessons Learned** (P1/P2 only): Smoke tests didn't cover the discount
path — expand smoke test coverage before next major release.

## Rules

- Lessons Learned section only for P1/P2 — do not add it for P3/P4.
- Action Items always need an owner and a due date, no exceptions.
- Root Cause is a mechanism, not a person — describe what broke, not who
  broke it.
```

Note what's absent: no restated general advice about "writing clearly,"
no inlined full incident-severity taxonomy (that would be a bundled
reference file if the team needed one), no hedging language. Every line
does work.
