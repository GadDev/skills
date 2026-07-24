---
"gaddev-skills": patch
---

fix: guard all three skills against prompt injection from fetched web content

Adds an explicit instruction to treat fetched web content (articles, threads,
comments) as untrusted data to evaluate, never as instructions to follow.
Added to `evidence-tiering` and, since `ai-pulse` and `ai-release-triage`
both fetch web content directly and fall back to a simpler rule when
`evidence-tiering` isn't installed, the same guard is now duplicated
directly in each of those two skills so the protection holds even when
`evidence-tiering` is absent.
