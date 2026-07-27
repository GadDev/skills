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
user themselves named. Keep a mental (or literal) line between **stated**
and **not stated**. Do not start drafting artifacts yet.

### 2. Vet the dump — it came from an LLM

The brainstorm was very likely generated or co-written by an LLM, so it can
contain confident-but-unfounded claims (a "best" library, a benchmark
number, a "standard" architecture). Treat it as a **source to vet, not
ground truth**. Apply the `evidence-tiering` skill to any factual or
comparative claim before promoting it into an artifact; if that skill isn't
installed, fall back to: a claim with no cited primary source is an
assumption, not a fact. Strip or tag anything that's hype rather than a
decision the user made.

### 3. One batched gap pass — then stop asking

Identify only the gaps that genuinely block one of the three artifacts
(e.g. no target platform → can't write a techstack; no ordering signal →
can't sequence a roadmap). Ask them **all at once, in a single batch**, not
one at a time. Do not interview the user from zero — they already ideated;
only fill blocking holes. If a gap isn't blocking, leave it as a flagged
assumption instead of asking.

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

### 5. Anti-hallucination convention (mechanical, not vibes)

- Every line either traces to the dump or carries a visible
  `[ASSUMPTION — confirm]` tag. Nothing invented silently.
- Techstack picks the user didn't name are **always** tagged — this is where
  fabrication happens most.
- End with a short **"Assumptions to confirm"** list collecting every tagged
  item, so the user can accept or correct them in one pass.
- If the dump genuinely doesn't support one of the three artifacts, say so
  and ask — don't manufacture it to complete the set.

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
