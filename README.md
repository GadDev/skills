# GadDev Agent Skills

[![skills.sh](https://skills.sh/b/gaddev/skills)](https://skills.sh/gaddev/skills)
[![Validate](https://github.com/GadDev/skills/actions/workflows/validate.yml/badge.svg)](https://github.com/GadDev/skills/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![Scattered notes examined through a lens and organised into planning documents](docs/assets/agent-skills-banner.png)

Agent skills for evidence-backed AI research, grounded planning, prompt
improvement, and agent skill authoring. Each skill addresses a specific
workflow; install the ones you need.

**Have a messy feature brainstorm? Start with `brainstorm-to-blueprint`.**
It turns existing notes into a constitution, roadmap, and techstack while
preserving stated decisions and flagging assumptions and open choices.

## Contents

- [Quick start](#quick-start)
- [Skill catalogue](#skill-catalogue)
- [Installation](#installation)
- [Requirements and compatibility](#requirements-and-compatibility)
- [Usage examples](#usage-examples)
- [Why the skills are separate](#why-the-skills-are-separate)
- [Directory presentation](#directory-presentation)
- [Contributing](#contributing)
- [Release process](#release-process)
- [License](#license)

## Quick start

Try the planning workflow with notes you already have:

1. Install the skill and select your agent when prompted:

   ```bash
   npx skills@latest add GadDev/skills --skill brainstorm-to-blueprint
   ```

2. Open your agent in the project where you want the planning files. Confirm
   that `brainstorm-to-blueprint` is available, then paste this request with
   your notes:

   ```text
   Turn these existing notes into a constitution, roadmap, and techstack.
   Preserve my decisions and flag unstated choices as assumptions.
   [paste your brainstorm]
   ```

3. Confirm the agent loaded the skill. Review the three artifacts against
   your notes: stated decisions should be preserved, unstated technology
   choices tagged, and contradictions surfaced for you to resolve. If a
   blocking detail is missing, the skill asks before completing the files.

For Claude Code, you can invoke a CLI-installed skill explicitly with
`/brainstorm-to-blueprint`. If you install the [plugin bundle](#install-the-claude-code-plugin-bundle),
use `/gaddev-skills:brainstorm-to-blueprint` instead.

These skills are Markdown workflow instructions. Your agent supplies the
model, tools, and file access used to carry them out.

## Skill catalogue

| Your task | Start with | What to expect |
| --- | --- | --- |
| Decide whether to adopt a particular AI release | [`ai-release-triage`](skills/ai-release-triage/SKILL.md) | An adoption verdict supported by evidence, workflow fit, and tradeoffs |
| Catch up on AI news or research across several items | [`ai-pulse`](skills/ai-pulse/SKILL.md) | A concise roundup ordered by technical significance, with evidence notes |
| Check the evidence behind an AI claim | [`evidence-tiering`](skills/evidence-tiering/SKILL.md) | Credibility and confidence notes attached to claims in your answer |
| Structure an existing brainstorm into planning artifacts | [`brainstorm-to-blueprint`](skills/brainstorm-to-blueprint/SKILL.md) | A constitution, roadmap, and techstack with visible assumptions |
| Design an agent skill or diagnose why it is not loading | [`design-skill`](skills/design-skill/SKILL.md) | Guidance on scope, triggers, worked examples, and loading problems |
| Diagnose and improve a prompt | [`prompt-architect`](skills/prompt-architect/SKILL.md) | A revised prompt with an explanation of the changes |

## Installation

### Select skills with the skills CLI

You need Node.js and npm to run the installer. The
[skills CLI documentation](https://skills.sh/docs/cli) covers installation options:

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

## Requirements and compatibility

### Inputs and optional companions

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
It includes placement guidance for Spec Kit and OpenSpec projects, while
leaving their downstream specification and implementation workflows to those tools.

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

`design-skill` concerns agent skill authoring, not UI or graphic design.

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

## Contributing

For repository layout and skill conventions, read [AGENTS.md](AGENTS.md).
Run the dependency-free skill validator from the repository root:

```bash
npm run validate
```

Review prose and examples as well as metadata. Passing a structural validator
does not establish that a skill triggers correctly or improves task outcomes.

For changes to user-facing skill behaviour, include a changeset. Install
maintenance dependencies first if you have not already:

```bash
npm ci
npm run changeset
```

Select `gaddev-skills` and the appropriate version bump. Documentation fixes
can use a patch changeset when they should appear in the release notes.

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

Merging the version PR applies the version bump and changelog update. The
release workflow then runs `changeset tag` to create Git tags; it does not
create GitHub Release entries or publish an npm package. An urgent fix can
justify releasing a smaller batch.

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE).
