# gaddev-skills

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
