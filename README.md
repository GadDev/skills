# skills

My agent skills for cutting through AI hype — built from actually tracking
AI models, tools, and agent-engineering techniques closely enough to know
when a launch claim doesn't hold up.

## The problem

Launch blogs, demo videos, and viral threads are optimized to make a
release look maximally impressive. Left alone, an agent will just repeat
those claims back to you. These skills add a structured pass before that
happens: rank the evidence, figure out what actually changed, and only
then decide if it matters.

## Install

```bash
npx skills@latest add GadDev/skills
```

Pick the skills you want and which agents to install them to. All three
work together — `ai-release-triage` and `ai-pulse` both call into
`evidence-tiering` for source credibility checks — so it's worth
installing all three even if you only expect to use one directly.

### Install one skill at a time

```bash
# See what's available first
npx skills@latest add GadDev/skills --list

# Install just one
npx skills@latest add GadDev/skills --skill ai-release-triage
npx skills@latest add GadDev/skills --skill ai-pulse
npx skills@latest add GadDev/skills --skill evidence-tiering
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

All three are **model-invoked** — they trigger automatically when the
conversation calls for them, no slash command needed.

| Skill | What it's for |
|---|---|
| [`ai-release-triage`](skills/ai-release-triage/SKILL.md) | Evaluating one specific new model/tool/framework release — is it hype, what actually changed, is it worth adopting |
| [`ai-pulse`](skills/ai-pulse/SKILL.md) | Broad "what's new in AI" digests and research-paper roundups — multi-item scans, not deep dives |
| [`evidence-tiering`](skills/evidence-tiering/SKILL.md) | The shared credibility rubric both skills above call into — usable standalone any time an AI claim needs a sanity check |

## Why these are separate skills

`evidence-tiering` is the reusable judgment primitive: how to weigh a
claim by source quality. `ai-release-triage` and `ai-pulse` are two
different jobs built on top of it — one deep, one broad. Splitting them
means the credibility logic stays consistent everywhere it's used instead
of drifting between copies.

## Contributing / adapting

These are meant to be hacked on. Fork it, edit the SKILL.md files, make
them reflect your own judgment calls. If you find a case where a skill
gave a verdict that didn't hold up, that's the most useful kind of issue
to open.

## License

MIT
