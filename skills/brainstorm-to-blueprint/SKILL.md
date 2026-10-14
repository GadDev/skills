---
name: brainstorm-to-blueprint
description: Turns a raw feature brainstorm (usually a messy dump pasted from ChatGPT or notes) into three grounded planning artifacts — a constitution, a roadmap, and a techstack — without inventing scope, decisions, or technology the user never stated. Use this whenever the user pastes brainstorm/ideation content and asks to structure, formalize, or "clean up" it into a spec, constitution, roadmap, or tech-stack doc — e.g. "turn this brainstorm into a spec," "make a constitution/roadmap/techstack from this," "structure my idea dump," "format this into planning docs." Compatible with Spec Kit (.specify/) and OpenSpec (openspec/) if the project uses them. For evaluating an AI product/release instead, use ai-release-triage.
---

# Brainstorm to Blueprint

Converts an unstructured feature brainstorm into three planning artifacts —
**constitution**, **roadmap**, **techstack** — that faithfully reflect what
the user actually decided, and visibly flag what they didn't. The failure
mode this exists to prevent: an agent handed a messy dump quietly invents
requirements, phases, and library choices to fill the gaps, producing a
confident spec full of decisions the user never made.

**The input is the primary source.** The user already did the ideation
(often in ChatGPT). Your job is to *structure it faithfully*, not to
re-run the brainstorm or pad it. No fluff — if the dump doesn't say it and
it isn't a flagged assumption, it doesn't go in the output.

## When to use this

- The user pastes brainstorm/ideation text and wants it structured into
  planning docs
- They ask for a constitution, roadmap, techstack, or "spec" from an idea
- They mention Spec Kit, OpenSpec, or a `.specify/` / `openspec/` folder and
  want front-end artifacts to feed into them

Do NOT use this to design a feature from scratch with no source material —
if there's no dump and no stated intent, ask the user for the brainstorm
first rather than generating one.

## Process

### 1. Extract before you write

Read the dump and pull out only what's actually stated: the problem, the
users, explicit requirements, any named constraints, and any technology the
user themselves named. Classify each substantive item before drafting:

- **Stated decision/constraint** — preserve its wording and strength.
- **Open choice** — use `[OPEN]`; an undecided choice is not an assumption.
- **Contradiction** — quote both statements; do not resolve either silently.
- **Added inference/recommendation** — use `[ASSUMPTION — confirm]`.

Carry the same status across all three documents. A suggestion is not a
selection; “not committed” is not an explicit exclusion. Do not start drafting
artifacts yet.

### 2. Vet the dump — it came from an LLM

The brainstorm was very likely generated or co-written by an LLM, so it can
contain confident-but-unfounded claims (a "best" library, a benchmark
number, a "standard" architecture). Treat it as a **source to vet, not
ground truth**. Apply the `evidence-tiering` skill to any factual or
comparative claim before promoting it into an artifact; if that skill isn't
installed, fall back to: a claim with no cited primary source is an
assumption, not a fact. Apply the same rule to factual claims you add, including technology
trade-offs. Cite a primary source actually checked, or mark the individual
claim `[ASSUMPTION — confirm]` and unverified. A blanket disclaimer does not
make unsupported comparisons grounded. If verification is unavailable, keep
options open and omit unnecessary comparative claims.

### 3. One batched gap pass — then stop asking

Identify only the gaps that genuinely block one of the three artifacts
(e.g. no target platform → can't write a techstack; no ordering signal →
can't sequence a roadmap). Ask them **all at once, in a single batch**, not
one at a time. Do not interview the user from zero — they already ideated;
only fill blocking holes. If an unresolved choice can be represented as `[OPEN]` without fabricating
content, it does not block writing. Preserve nonblocking questions in an
“Open decisions” list; do not start another interview after delivery. Keep
added inferences in “Assumptions to confirm,” separate from open decisions.

### 4. Emit the three artifacts

Write each with every line traceable to the dump or explicitly tagged:

- **Constitution** — the non-negotiable principles and constraints that
  govern the feature (Spec Kit sense): what it must always/never do, scope
  boundaries, quality bars. Short, declarative, testable statements — not
  goals or nice-to-haves.
- **Roadmap** — the work sequenced into phases/milestones with a one-line
  rationale for the ordering (what unblocks what). This is the user's own
  artifact — neither Spec Kit nor OpenSpec generates it — so keep it a plain
  phased list, not a spec.
- **Techstack** — each technology choice on its own line **with the
  requirement it serves**. Never fill a slot with a plausible default
  silently: an unstated choice is `[ASSUMPTION — confirm]`, and a genuinely
  open choice is listed as options with trade-offs, not a fabricated pick.

### 5. Check consistency before saving

Review the three artifacts together against the source:

- Trace substantive requirements to a source statement or an explicit
  `[ASSUMPTION — confirm]` tag. Do not relabel stated decisions as assumptions.
- Never promote a tagged assumption into “must,” a selected technology, or a
  committed milestone elsewhere. Repeat its tag wherever it affects a plan.
- Separate a required outcome from its mechanism. “Delete data after 30 days”
  does not decide automatic deletion, a scheduler, or a particular service.
- Preserve stated sequencing. If requirement placement in the pilot is unknown,
  record one `[OPEN]` placement decision rather than assigning it to several
  phases or silently postponing it. Any recommended gate is an added assumption.
- List technology alternatives as options, not selections. Tag unchosen proposed
  picks and ground their factual trade-offs as described above. One resolved
  choice may inform others; do not claim it uniquely determines the stack.
- Collect every added assumption under “Assumptions to confirm” and every
  unresolved choice/contradiction under “Open decisions.” Use “None” if empty.
- Check quotes and any source locations. Do not invent line references.

If the source genuinely cannot support one artifact even with open choices,
ask the single batch of blocking questions instead of manufacturing it.

## Output location

- If `.specify/` exists (Spec Kit), the constitution belongs at
  `.specify/memory/constitution.md`; offer to write there and let its
  `/speckit.specify` and `/speckit.plan` consume the rest.
- If `openspec/` exists (OpenSpec), offer to seed a change proposal under
  `openspec/changes/<feature>/` from these artifacts.
- Otherwise, write three standalone files (`constitution.md`, `roadmap.md`,
  `techstack.md`) wherever the user is working.

Do not reimplement Spec Kit or OpenSpec's downstream flow — this skill is
the grounded front end that feeds them.

## Notes

- Faithfulness beats completeness. A short artifact that only contains real
  decisions is better than a long one padded with invented ones.
- If the dump contradicts itself, surface the contradiction for the user to
  resolve rather than silently picking a side.
