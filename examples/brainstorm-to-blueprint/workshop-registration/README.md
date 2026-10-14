# Workshop registration: notes to planning documents

A fictional workshop-registration brainstorm becomes three planning documents.
The useful result: React + TypeScript stays decided, Firebase stays open, and
conflicting identity requirements become visible instead of silently resolved.

This is one recorded Claude Code run, with untouched output and a separate
review. It demonstrates useful behavior and limitations; it is not a benchmark
or evidence of consistent behavior across models.

## Inspect the result

| Material | Purpose |
| --- | --- |
| [Original brainstorm](feature.txt) | Decisions, open choices, and an intentional contradiction |
| [Invocation](prompt.txt) | Exact user-reported wording, with normalized whitespace |
| [Constitution](output/constitution.md) | Principles, constraints, and identity conflict |
| [Roadmap](output/roadmap.md) | Pilot first, organiser export afterward |
| [Techstack](output/techstack.md) | Decided frontend and unresolved backend choices |
| [Run record](run.md) | Reported environment, loading evidence, and provenance gaps |
| [Review](review.md) | What worked and what still needs correction |

Read the review before treating the output as implementation guidance. In
particular, automatic deletion becomes a requirement without user approval.

## Reproduce the workflow

1. Use a fresh working directory so existing instructions and planning files
   do not influence the run. Copy only `feature.txt` there.
2. Install `brainstorm-to-blueprint` for Claude Code using the repository's
   [installation instructions](../../../README.md#installation). Record the
   installed skill revision or content hash, CLI version, model, and date.
   This run had no project installation of `evidence-tiering`; availability
   outside the project was not established.
3. Open Claude Code in that directory. Supply `feature.txt` as context and
   submit the contents of `prompt.txt`. Confirm explicit skill loading.
4. Preserve `output/` and any clarification exchange before editing. If the
   agent asks blocking questions, record the answers rather than silently
   changing the input.
5. Compare the results against [the review criteria](review.md). Expect
   differences in wording and possibly behavior; this is workflow reproduction,
   not byte-for-byte output reproduction.

Do not run over this example's recorded output. The unresolved identity choice
is intentional: reproducing the example does not require choosing a backend
or implementing the workshop application.

## Revised-skill run

See the [separate Codex rerun and comparison](reruns/codex-2026-10-14/README.md).
It uses the same input with revised instructions, preserves new outputs, and
explains why it is not a controlled Sonnet before/after comparison.
