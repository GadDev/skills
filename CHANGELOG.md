# gaddev-skills

## 1.4.0

### Minor Changes

- Add `prompt-architect` skill — an iterative guardrail and assistant for writing effective prompts.

  The skill runs an analyse → improve → score loop until a prompt passes a readiness check, and actively applies structured techniques as part of every improvement:

  - **Input triage (Step 0)** — refuses adversarial or jailbreak prompts before analysis; stops to ask when the goal is undefined
  - **Prompt type classification** — separates task prompts, system prompts, and multi-step chains, applying a different improvement strategy to each
  - **Five structural techniques** — system prompt design, XML tags, few-shot examples, output constraints, and grounding / hallucination control (source restriction, auditable citations, quote-before-analyze)
  - **Internal scoring loop with cap** — re-scores improved drafts against a readiness checklist; surfaces unresolvable ambiguities rather than looping forever
  - **Diligence Flag** — explicitly calls out when prompt quality is not the bottleneck and human review is required regardless of how well-engineered the prompt is

## 1.3.0

### Minor Changes

- [#8](https://github.com/GadDev/skills/pull/8) [`f2b9629`](https://github.com/GadDev/skills/commit/f2b96294a6ea70c217debd23659a7c54b7ad2c82) Thanks [@GadDev](https://github.com/GadDev)! - feat: add `brainstorm-to-blueprint` skill

  Turns a raw feature brainstorm (typically a messy dump pasted from ChatGPT
  or notes) into three grounded planning artifacts — a constitution, a
  roadmap, and a techstack — without inventing scope, decisions, or
  technology the user never stated. Treats the dump as LLM-authored source to
  vet (hooking into `evidence-tiering`) rather than ground truth, tags every
  unstated inference with `[ASSUMPTION — confirm]`, and writes into Spec Kit
  (`.specify/`) or OpenSpec (`openspec/`) locations when present instead of
  reimplementing their downstream flow.

## 1.2.2

### Patch Changes

- [#6](https://github.com/GadDev/skills/pull/6) [`dd7ca0a`](https://github.com/GadDev/skills/commit/dd7ca0a91021368ae53d8631f072468a1d993049) Thanks [@GadDev](https://github.com/GadDev)! - fix: enable git tag creation for the private package

  `npx changeset tag` was silently skipping tag creation because
  `gaddev-skills` is a private package and `privatePackages.tag` wasn't set
  in `.changeset/config.json`. This meant no git tag (and no GitHub Release)
  was ever created after a version PR merged. Adds
  `"privatePackages": { "version": true, "tag": true }` so versioning and
  tagging apply to this private package as expected.

## 1.2.1

### Patch Changes

- [#4](https://github.com/GadDev/skills/pull/4) [`a076237`](https://github.com/GadDev/skills/commit/a0762371acd49c473d10099e60f36d85b17aae81) Thanks [@GadDev](https://github.com/GadDev)! - fix: guard all three skills against prompt injection from fetched web content

  Adds an explicit instruction to treat fetched web content (articles, threads,
  comments) as untrusted data to evaluate, never as instructions to follow.
  Added to `evidence-tiering` and, since `ai-pulse` and `ai-release-triage`
  both fetch web content directly and fall back to a simpler rule when
  `evidence-tiering` isn't installed, the same guard is now duplicated
  directly in each of those two skills so the protection holds even when
  `evidence-tiering` is absent.

## 1.2.0

### Minor Changes

- [#1](https://github.com/GadDev/skills/pull/1) [`a044ae0`](https://github.com/GadDev/skills/commit/a044ae06b9af59f0569eff684cd8142f081d59f6) Thanks [@GadDev](https://github.com/GadDev)! - feat: add initial skills and validation framework for AI agent skills

  Adds three model-invoked skills for cutting through AI hype: `evidence-tiering`
  (shared credibility rubric for weighing AI claims by source quality),
  `ai-release-triage` (structured adoption verdict for a single new model/tool
  release), and `ai-pulse` (hype-filtered, technically substantive news and
  research digests). `ai-release-triage` and `ai-pulse` both call into
  `evidence-tiering` for source-vetting, with a built-in fallback rule if it
  isn't installed.
