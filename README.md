# skills

My agent skills, covering two areas: cutting through AI hype, and writing
prompts that actually work — built from tracking AI models, tools, and
agent-engineering techniques closely enough to know when a launch claim
doesn't hold up, and from enough prompt-debugging sessions to know what
usually goes wrong.

## The problems

**AI hype.** Launch blogs, demo videos, and viral threads are optimized to
make a release look maximally impressive. Left alone, an agent will just
repeat those claims back to you. The hype-filtering skills add a
structured pass before that happens: rank the evidence, figure out what
actually changed, and only then decide if it matters.

**Weak prompts.** Most prompts fail because the model can't infer what the
user didn't write — missing context, undefined success conditions, no
examples to anchor style. `prompt-architect` runs an analyse → improve →
score loop instead of a one-shot rewrite, and doubles as a guardrail
against adversarial or ill-defined prompts.

## Install

```bash
npx skills@latest add GadDev/skills
```

Pick the skills you want and which agents to install them to.
`ai-release-triage` and `ai-pulse` both call into `evidence-tiering` for
source credibility checks, so it's worth installing all three together if
you want either. `prompt-architect` is a separate, standalone skill — no
dependency on the other three.

### Install one skill at a time

```bash
# See what's available first
npx skills@latest add GadDev/skills --list

# Install just one
npx skills@latest add GadDev/skills --skill ai-release-triage
npx skills@latest add GadDev/skills --skill ai-pulse
npx skills@latest add GadDev/skills --skill evidence-tiering
npx skills@latest add GadDev/skills --skill prompt-architect
```

If you install `ai-release-triage` or `ai-pulse` without `evidence-tiering`,
they still work — each has a fallback rule built in — but the source
credibility checks are more thorough with `evidence-tiering` installed
alongside them.

### Or install as a Claude Code plugin

Prefer a read-only, managed bundle over editable copies:

```bash
claude plugin marketplace add GadDev/skills
claude plugin install gaddev-skills@gaddev
```

## Skills

All five are **model-invoked** — they trigger automatically when the
conversation calls for them, no slash command needed.

### AI hype-filtering

| Skill                                                    | What it's for                                                                                                           |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [`ai-release-triage`](skills/ai-release-triage/SKILL.md) | Evaluating one specific new model/tool/framework release — is it hype, what actually changed, is it worth adopting      |
| [`ai-pulse`](skills/ai-pulse/SKILL.md)                   | Broad "what's new in AI" digests and research-paper roundups — multi-item scans, not deep dives                         |
| [`evidence-tiering`](skills/evidence-tiering/SKILL.md)   | The shared credibility rubric both skills above call into — usable standalone any time an AI claim needs a sanity check |
| [`brainstorm-to-blueprint`](skills/brainstorm-to-blueprint/SKILL.md) | Turning a raw feature brainstorm (e.g. a ChatGPT dump) into a grounded constitution, roadmap, and techstack — without inventing scope or tech you never chose. Feeds Spec Kit / OpenSpec |

### Prompt engineering

| Skill                                                  | What it's for                                                                                                                                                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`prompt-architect`](skills/prompt-architect/SKILL.md) | Diagnosing and rewriting prompts that aren't producing good output — applies system-prompt structure, XML tags, few-shot examples, and output constraints, and refuses to improve adversarial or goal-less prompts |

## Usage examples

All skills are model-invoked — just talk naturally and the right one
fires. These are the phrases that trigger each skill.

### AI hype-filtering

```
"Is the new [model name] release actually good or is it hype?"
"What actually changed in [release] compared to the previous version?"
"Should I switch my agent stack to [framework]?"
"What's new in AI this week?"
"Any interesting papers on reasoning lately?"
```

The triage skills lead with a verdict, then explain the evidence quality
behind it. They won't repeat a vendor claim at face value.

### prompt-architect

```
"Help me write a better prompt for [task]"
"My prompt keeps giving generic output — what's wrong with it?"
"Improve this:" [paste prompt]
"I need a system prompt for an agent that does [X]"
"How do I stop this from hallucinating?"
```

What you get back: a scored analysis of what's missing, an improved
prompt with structural techniques applied (XML tags, few-shot examples,
output constraints, grounding instructions), and a concise explanation
of each change. If the improved prompt can't be resolved due to an
ambiguity in your goal, it stops and asks rather than guessing.

**Example — before/after**

Before (typical underspecified prompt):

```
Summarise this contract for me.
```

After (with XML structure, grounding, and output constraints applied):

```xml
<context>
You are a legal assistant helping a non-lawyer understand a contract
before signing. The reader has no legal background.
</context>
<task>
Summarise the attached contract, focusing on obligations, key dates,
termination conditions, and any clauses that carry significant risk.
</task>
<constraints>
Answer only from the provided contract text. If a topic is not covered,
say "not addressed in this document." Do not use legal jargon without
explaining it in plain English immediately after.
</constraints>
<output_format>
Plain English. Use headings: Obligations, Key Dates, Termination,
Risk Clauses. Maximum 400 words total.
</output_format>
```

## Why these are separate skills

`evidence-tiering` is the reusable judgment primitive: how to weigh a
claim by source quality. `ai-release-triage` and `ai-pulse` are two
different jobs built on top of it — one deep, one broad. Splitting them
means the credibility logic stays consistent everywhere it's used instead
of drifting between copies.

`prompt-architect` solves an unrelated problem (prompt quality, not claim
credibility) and has no dependency on the other three — install it on its
own if that's the only thing you need.

## Release process

Versioning uses [changesets](https://github.com/changesets/changesets). Every
PR that changes a skill should include a changeset (`npx changeset`)
describing the change and its version bump (patch/minor/major).

Merging a PR with a changeset doesn't cut a release by itself — it updates
a running `chore: version skills` PR that accumulates every pending
changeset. Releases are **batched, not per-fix**: that PR is left open and
merged deliberately, once enough changes have landed to justify a version
bump, not automatically after every merge. Merging it bumps the version
once, writes one `CHANGELOG.md` entry covering everything batched in, and
tags a GitHub release.

There's no fixed cadence — merge the version PR whenever the batch feels
release-worthy (a handful of related fixes, a new skill, a security fix
that shouldn't wait). A single urgent fix is a valid reason to merge it
immediately rather than wait for a batch.

## Contributing / adapting

These are meant to be hacked on. Fork it, edit the SKILL.md files, make
them reflect your own judgment calls. If you find a case where a skill
gave a verdict that didn't hold up, that's the most useful kind of issue
to open.

## License

MIT
