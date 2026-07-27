---
"gaddev-skills": minor
---

feat: add `brainstorm-to-blueprint` skill

Turns a raw feature brainstorm (typically a messy dump pasted from ChatGPT
or notes) into three grounded planning artifacts — a constitution, a
roadmap, and a techstack — without inventing scope, decisions, or
technology the user never stated. Treats the dump as LLM-authored source to
vet (hooking into `evidence-tiering`) rather than ground truth, tags every
unstated inference with `[ASSUMPTION — confirm]`, and writes into Spec Kit
(`.specify/`) or OpenSpec (`openspec/`) locations when present instead of
reimplementing their downstream flow.
