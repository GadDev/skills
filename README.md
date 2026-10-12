# GadDev Agent Skills

[![skills.sh](https://skills.sh/b/gaddev/skills)](https://skills.sh/gaddev/skills)

Agent skills for evidence-backed AI research, grounded planning, prompt
improvement, and agent skill authoring. Each skill addresses a specific
workflow; install the ones you need.

**Have a messy feature brainstorm? Start with `brainstorm-to-blueprint`.**
It turns existing notes into a constitution, roadmap, and techstack while
preserving stated decisions and flagging assumptions and open choices.

## Choose a skill

| Your task | Start with |
| --- | --- |
| Decide whether to adopt a particular AI release | [`ai-release-triage`](skills/ai-release-triage/SKILL.md) |
| Catch up on AI news or research across several items | [`ai-pulse`](skills/ai-pulse/SKILL.md) |
| Check the evidence behind an AI claim | [`evidence-tiering`](skills/evidence-tiering/SKILL.md) |
| Structure an existing brainstorm into planning artifacts | [`brainstorm-to-blueprint`](skills/brainstorm-to-blueprint/SKILL.md) |
| Design an agent skill or diagnose why it is not loading | [`design-skill`](skills/design-skill/SKILL.md) |
| Diagnose and improve a prompt | [`prompt-architect`](skills/prompt-architect/SKILL.md) |

## Install

### Select skills with the skills CLI

You need Node.js and npm to run the installer:

```bash
npx skills@latest add GadDev/skills
```

Choose the skills and agent installation targets offered by the CLI.
Installing these Markdown instructions does not require running `npm install`
in this repository; its development dependencies support maintenance and releases.

List the catalogue without installing:

```bash
npx skills@latest add GadDev/skills --list
```

Install an individual skill:

```bash
npx skills@latest add GadDev/skills --skill ai-release-triage
npx skills@latest add GadDev/skills --skill ai-pulse
npx skills@latest add GadDev/skills --skill evidence-tiering
npx skills@latest add GadDev/skills --skill brainstorm-to-blueprint
npx skills@latest add GadDev/skills --skill design-skill
npx skills@latest add GadDev/skills --skill prompt-architect
```

Each command above selects one skill; run the commands for the skills you want.

### Install the Claude Code plugin bundle

```bash
claude plugin marketplace add GadDev/skills
claude plugin install gaddev-skills@gaddev
```

The plugin bundles the repository's skills. Choose one installation route
for a given agent to avoid loading duplicate copies.

## Requirements and optional companions

| Skill | Optional companion | Inputs and capabilities needed |
| --- | --- | --- |
| `ai-release-triage` | `evidence-tiering` | A specific release and adoption context; web search and access to current sources for verification |
| `ai-pulse` | `evidence-tiering` | A topic or time window; web search and current sources for news and research roundups |
| `evidence-tiering` | None | Claims and source material; source access when checking beyond the supplied evidence |
| `brainstorm-to-blueprint` | `evidence-tiering` | Existing brainstorm notes; file access to save artifacts; source access when verifying external claims |
| `design-skill` | None | A workflow and desired outcome; file access to save the skill and supporting resources |
| `prompt-architect` | None | The original prompt, intended outcome, and relevant context |

`ai-release-triage`, `ai-pulse`, and `brainstorm-to-blueprint` all include a
fallback when `evidence-tiering` is absent. It is an optional companion,
not a hard installation dependency. In the planning workflow it helps vet
claims in the notes; it does not select your technology stack for you.

An installation does not provide the agent with browsing, credentials, or
other tools. If source access is unavailable, current claims cannot be
independently verified; distinguish supplied evidence from unresolved claims.

### Compatibility and invocation

These skills are written for Claude Code. The skills CLI also supports other
agent installation targets, but installer support does not establish equivalent
runtime behaviour. Verify the selected workflow in your agent before relying on it.

The descriptions are written to support automatic selection when a request
matches the workflow. Selection depends on the agent, model, and available
context; a matching request does not guarantee the skill was loaded.

After installation:

1. Confirm that your agent lists the selected skill.
2. Try a usage example below and confirm that the agent loaded the skill.
3. Check the required tool access and review the actual output.

For loading or explicit invocation, consult your agent's documentation,
including [Claude Code's skill documentation](https://code.claude.com/docs/en/skills).

## Skills

### AI research

| Skill | What it does |
| --- | --- |
| [`ai-release-triage`](skills/ai-release-triage/SKILL.md) | Evaluates one AI model, tool, framework, or coding-agent technique: what changed, how strong the evidence is, and whether adoption makes sense in your context |
| [`ai-pulse`](skills/ai-pulse/SKILL.md) | Produces multi-item AI news and research roundups with technical depth and source scrutiny |
| [`evidence-tiering`](skills/evidence-tiering/SKILL.md) | Weighs AI claims by source quality and flags weaknesses before claims are repeated |

### Grounded planning

| Skill | What it does |
| --- | --- |
| [`brainstorm-to-blueprint`](skills/brainstorm-to-blueprint/SKILL.md) | Structures existing notes into a constitution, roadmap, and techstack; preserves decisions and surfaces assumptions, missing information, and contradictions |

The planning skill includes placement guidance for projects using Spec Kit
or OpenSpec. It supplies planning artifacts rather than replacing those
tools' downstream specification and implementation workflows.

### Prompt improvement

| Skill | What it does |
| --- | --- |
| [`prompt-architect`](skills/prompt-architect/SKILL.md) | Diagnoses missing context and unclear success conditions, then iteratively revises the prompt with structure, constraints, examples, and grounding guidance |

### Agent skill authoring

| Skill | What it does |
| --- | --- |
| [`design-skill`](skills/design-skill/SKILL.md) | Guides skill scope, trigger descriptions, instructions, worked examples, and supporting resources; also helps diagnose loading problems |

`design-skill` concerns agent skill authoring, not UI or graphic design.

## Usage examples

These requests match the intended workflows. Confirm loading when testing;
they are illustrative inputs, not recorded performance results.

### Evaluate a release

```text
Should I adopt [specific AI release] for [my workflow]?
Compare it with [what I use now], check the evidence, and lead with a verdict.
```

### Get a research or news roundup

```text
What changed in AI engineering during [date range]?
Prioritise architecture, serving efficiency, and agent tooling.
```

### Check a claim

```text
Check the evidence behind this AI benchmark claim.
Separate what the supplied sources establish from what remains unverified.
[paste the claim and sources]
```

### Structure a brainstorm

```text
Turn these existing notes into a constitution, roadmap, and techstack.
Preserve my decisions, flag assumptions, and surface contradictory requirements.
[paste your brainstorm]
```

Bring existing source material. This skill structures an idea you have
already explored; it is not a feature-design workflow starting from nothing.

### Improve a prompt

```text
This prompt keeps producing generic answers. Help me improve it.
My intended outcome is [outcome].
[paste the prompt and an example of the problem]
```

### Author a skill

```text
Help me design an agent skill for reviewing release notes.
Its users are [users], its input is [input], and its output should be [output].
```

## Why the skills are separate

`evidence-tiering` is a shared credibility framework. `ai-release-triage`
applies it to one release, `ai-pulse` to a broad roundup, and
`brainstorm-to-blueprint` to claims within planning notes. Their outputs
and intended triggers differ, so they remain separate workflows.

`prompt-architect` and `design-skill` are standalone: one improves a prompt,
the other helps author an agent skill. Neither requires the research skills.

## Directory presentation

[Browse GadDev skills on skills.sh](https://skills.sh/gaddev/skills).
The root `skills.sh.json` groups the directory page by workflow. It changes
page organisation, not skill installation or ranking.

According to the [official customization documentation](https://skills.sh/docs/customize),
configuration changes are picked up after a telemetry-enabled CLI installation
from the default branch, followed by processing and cache refresh. Visiting
the page alone does not trigger an update.

## Validation and contributions

Run the repository's skill validator before proposing a change:

```bash
npm run validate
```

Review prose and examples as well as metadata. Passing a structural validator
does not establish that a skill triggers correctly or improves task outcomes.

For changes to user-facing skill behaviour, include a changeset:

```bash
npm run changeset
```

These skills are meant to be adapted. Useful feedback includes the request,
agent/model, loaded skill, actual output, expected output, and the correction
you needed. Remove sensitive material before sharing examples.

## Release process

Versioning uses [Changesets](https://github.com/changesets/changesets).
PRs that change skills should describe the change and its intended version bump
in a changeset.

Merging a changeset updates the running `chore: version skills` PR; it does
not immediately cut a release. Releases are batched, and the version PR is
merged deliberately when the accumulated changes justify a release.

Merging the version PR bumps the version, updates the changelog, and tags
a GitHub release through the release workflow. An urgent fix can justify
releasing a smaller batch.

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE).
