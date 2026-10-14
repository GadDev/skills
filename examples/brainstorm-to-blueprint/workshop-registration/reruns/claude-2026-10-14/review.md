# Review of the Claude rerun

Partial improvement. Deletion stays mechanism-neutral and Firebase stays
unselected. Scope status still drifts between documents, and not every added
planning inference is tagged. Preserve these outputs as evidence.

| Criterion | Finding | Evidence |
| --- | --- | --- |
| Frontend and pilot effort preserved | Pass | Constitution keeps React + TypeScript and attaches two weekends to the pilot |
| Deletion outcome separated from mechanism | Pass | Constitution principle 4 and techstack require the outcome without automatic deletion or a scheduler |
| Firebase remains undecided | Pass | Techstack candidates explicitly leave it unchosen |
| Unsupported backend comparisons avoided | Pass | No performance, cost, or maintenance comparison is made |
| Identity contradiction surfaced | Pass | Constitution quotes both requirements and does not choose one |
| Waitlist status consistent | Fail | Constitution says neither committed nor excluded; roadmap puts waitlists under “Not in V1” |
| Added ordering assumptions tagged | Partial | Roadmap “Before building” imposes identity and backend/database gates without tags |
| Assumptions carried across artifacts | Partial | Concurrency/normalization are tagged in constitution and absent elsewhere, rather than promoted; organiser access is tagged in roadmap/techstack |
| Final assumptions/open lists complete | Partial | Roadmap lacks both required ending lists; techstack omits its company-login availability dependency from the assumptions collection |

## Findings for a future revision

1. **Heading placement changes scope.** An item under “Not in V1” is excluded
   by its heading even if its bullet says “not committed.” Keep waitlists under
   open decisions or a separate uncommitted section across all artifacts.
2. **Planning gates are added decisions.** The source orders registration and
   capacity before export. It does not mandate resolving all identity/backend
   choices before any building. Mark such recommended gates as assumptions;
   distinguish implementation dependencies from the user's explicit ordering.
3. **Organiser viewing is not explicitly sequenced after the pilot.** Export
   is. Grouping both in Phase 2 adds a placement inference that should be
   tagged or left open. This is narrower than rejecting the stated export order.
4. **Check labels at document boundaries.** Each artifact should end with
   open decisions and assumptions collections. The roadmap does not. An
   assumption need not be repeated in an artifact where it is not used, but
   it must not become an untagged requirement where it is used.
5. **Identity options remain proposals.** The techstack tags the interpretation
   of “no account” but also assumes an existing company login. Keep availability
   unverified and collect it if retained. Dropping either requirement requires
   user approval; listing that option does not resolve the contradiction.

## Comparison and claim limits

Relative to the original recorded output, this output no longer mandates
automatic deletion or adds unverified backend trade-offs. Waitlist drift remains
in the roadmap, so the summary overstates success. Do not promote a claim that
the revised skill reliably prevents all invented decisions. This is one
manually reviewed, user-supplied run with incomplete environment provenance,
not a controlled evaluation or a production-readiness assessment.
