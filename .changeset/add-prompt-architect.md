---
"gaddev-skills": minor
---

Add `prompt-architect` skill — an iterative guardrail and assistant for writing effective prompts.

The skill runs an analyse → improve → score loop until a prompt passes a readiness check, and actively applies structured techniques as part of every improvement:

- **Input triage (Step 0)** — refuses adversarial or jailbreak prompts before analysis; stops to ask when the goal is undefined
- **Prompt type classification** — separates task prompts, system prompts, and multi-step chains, applying a different improvement strategy to each
- **Five structural techniques** — system prompt design, XML tags, few-shot examples, output constraints, and grounding / hallucination control (source restriction, auditable citations, quote-before-analyze)
- **Internal scoring loop with cap** — re-scores improved drafts against a readiness checklist; surfaces unresolvable ambiguities rather than looping forever
- **Diligence Flag** — explicitly calls out when prompt quality is not the bottleneck and human review is required regardless of how well-engineered the prompt is
