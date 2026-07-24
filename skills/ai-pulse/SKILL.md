---
name: ai-pulse
description: Produces hype-filtered, technically substantive AI news digests and research-paper roundups instead of relaying a wall of product headlines uncritically. Defaults to engineering depth — architecture changes, training methods, infra/serving efficiency, benchmark internals — not just pricing, availability, and marketing copy. Use this whenever the user asks for an AI news roundup or digest — e.g. "what's new in AI," "catch me up on AI news," "any AI news today," "give me an AI update," "anything technical happening in AI" — or asks about recent AI research or papers — e.g. "any interesting AI papers lately," "what's new in research," "latest papers on [topic]." For a question about one specific named model/tool/release, use `ai-release-triage` instead — this skill is for broad, multi-item roundups.
---

# AI Pulse

A framework for multi-item AI news and research roundups that filters
noise and flags weak evidence instead of just listing whatever came up in
search. This skill assumes the **`evidence-tiering`** skill is also
installed — use it for the credibility checks in both modes below. If it
isn't available, fall back to a simple rule: independent reproductions and
primary sources outrank vendor blogs, which outrank demos and secondhand
summaries.

**Default stance: go technical, not just product-level.** A "what's new"
request defaults to engineering substance — what changed in the
architecture, training recipe, serving/inference stack, or benchmark
methodology — rather than a rundown of pricing tiers and feature
announcements. Product news still gets a mention when it's genuinely
significant, but the emphasis and the depth of explanation should sit on
the technical *why*, not the marketing *what*.

## When to use this

- "What's new in AI" / "catch me up" / "any AI news today" — broad,
  unnamed-item requests
- "Any interesting papers lately" / "what's new in research on [topic]"
- Any request that implies scanning several items, not evaluating one
  named release in depth (for that, use `ai-release-triage`)

## News digest mode

1. Search for what's actually happened recently (last day to last few
   days, matching the user's implied window). Cast a wide net across
   **technical sources specifically** — lab engineering blogs, technical
   reports/model cards, systems and infra write-ups (serving, quantization,
   distributed training), independent benchmark trackers, and arXiv — not
   just product-launch news aggregators. Then narrow.
2. Filter out noise before writing anything: skip minor version bumps, UI
   tweaks, and pure marketing posts unless the user wants everything. Keep
   items that involve a real technical change (architecture, training
   method, efficiency/infra improvement, benchmark result) or something the
   user would plausibly act on. When a product-level item and a technical
   item compete for space, prefer the technical one unless the product item
   is unusually consequential.
3. For each item kept, go one layer deeper than a headline: name the
   specific technical mechanism where possible (e.g. "mixture-of-experts
   routing change," "new KV-cache compression," "prospective credit
   assignment during training") rather than just "got better." Apply a
   *compressed* evidence-tiering check alongside it — one clause on
   evidence quality, one clause on what actually changed. Give a full
   adoption verdict only if one item is clearly the most relevant to the
   user's own stack; otherwise keep it light.
4. Order by technical significance to the user, not chronological order or
   press volume.
5. Keep each item to 1-3 sentences — enough room to name the actual
   mechanism, not just the headline claim. This is a scan, not a report —
   offer to go deeper on any single item rather than expanding all of them
   by default.

Example shape:

> **Worth knowing:** [Model X] shipped [what changed], benchmarked
> independently at [result] — [one-clause hype check]. [Tool Y] added
> [feature] which matters if you're doing [task].
>
> **Lower signal:** [Item Z] is a minor point release / vendor-only claim,
> skip unless you use that stack directly.

## Research paper mode

Trigger this for recent AI research or papers — scrutinized differently
than product releases.

1. Search arXiv, lab publication pages, and conference proceedings
   (NeurIPS, ICML, ACL, etc., depending on timing) for recent papers on the
   relevant topic. If no topic is given, cover a broad recent spread across
   whatever areas the user has shown interest in (agents, training
   techniques, evals, safety, etc.).
2. Vet each paper on dimensions specific to research, not product hype:
   - **Venue/status** — peer-reviewed and published, accepted-pending-
     publication, or arXiv preprint with no review yet. Preprint isn't
     disqualifying — a lot of frontier work lives there first — but it
     means the claims haven't been checked externally yet.
   - **Reproducibility** — is code/data released, and has anyone outside
     the author group reproduced the core result
   - **Scale of the claim vs. scale of the experiment** — a result on a
     toy task or small model isn't evidence the same holds at frontier
     scale; watch for that generalization gap being glossed over
   - **Lab/author affiliation is a weak signal, not a strong one** — a big
     lab's name doesn't make a result true, and a small/unknown group's
     result isn't automatically weak; weight the method and evidence, not
     the letterhead
3. For each paper, give: what it claims (one line), why it matters or
   doesn't (one line), and its verification status (peer-reviewed /
   preprint / reproduced elsewhere). Skip purely incremental papers unless
   the user wants exhaustive coverage.
4. If a paper's finding is being amplified by a viral summary thread,
   treat the thread as bottom-tier evidence (see `evidence-tiering`) even
   if the underlying paper is solid — go to the paper itself, not the
   thread's framing of it.

## Output Format

- Both modes: 1-2 sentences per item, grouped by significance, not a
  full report. Offer to expand any single item on request.
- Always lead each item with what changed/what it claims, immediately
  followed by the evidence-quality note — don't separate them into
  different sections at this scan-level depth.

## Notes

- This is about running the same discipline across many items quickly,
  not doing a shallow version of `ai-release-triage` on each one.
- It's fine to say "nothing significant happened today" if that's true —
  padding a thin day with minor items to fill space defeats the purpose.
