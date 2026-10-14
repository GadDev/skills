# Recorded run

## Provenance

| Field | Recorded value |
| --- | --- |
| Agent | Claude Code, as reported by the maintainer |
| Model | Sonnet 5.5 — user-reported label; exact model ID not captured |
| Claude Code version | Not recorded |
| Execution date | Not recorded; evidence supplied for review on 2026-10-14 |
| Input | `feature.txt`, supplied as context |
| Invocation | `prompt.txt`; wording preserved, whitespace normalized |
| Skill loading | Explicit load confirmed in supplied transcript excerpt |
| evidence-tiering | Not installed in the project, per maintainer; global availability unconfirmed |
| Source revision used at execution | Not recorded |
| Installed skill content hash | `d0982f239addf75336f4715986093296311291157b5fd02403cdf17b65a14b84`, from the run's committed skills-lock.json |
| Original evidence commit | `5d9b4b7fb37162145812c89f1941fa3612f456cf` in PR #18 |

The original evidence commit is an archive of the submitted files, not proof
of the source revision loaded during execution. Its installation artifacts
were removed from the final demo layout; the content hash above preserves
what the lockfile reported. The installation command was not captured.

## Loading evidence

Excerpt supplied by the maintainer (not a complete session export):

```text
Skill(brainstorm-to-blueprint)
Successfully loaded skill
10 skills available
```

The transcript reports reading one file and writing all three output files.
The agent reported no questions before writing because the contradiction did
not block the artifacts. It then asked which identity option the user wanted.
No clarification answers were supplied with this run evidence.

## Preservation and limits

The three Markdown files under `output/` retain the bytes committed in the
original evidence commit. They have been moved, not corrected. Their source
references and line numbers are original generated text, not independently
verified annotations. Relative file names describe the original working layout.

No complete session export, timing, cost, source-verification log, or clean
session evidence was captured. This record does not establish automatic skill
selection, absence of other installed skills, or comparative improvement over
a run without the skill. No second run was performed during packaging.
