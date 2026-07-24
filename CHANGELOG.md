# gaddev-skills

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
