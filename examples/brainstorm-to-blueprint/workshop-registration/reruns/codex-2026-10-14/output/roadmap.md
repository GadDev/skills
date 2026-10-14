# Workshop registration roadmap

Source: `../feature.txt`. The two milestones follow the stated order: “First prove registration and capacity handling with one workshop. Add organiser export after that.”

## Milestone 1 — One-workshop proof

- Prove registration and capacity handling with one workshop.
- Work within the stated pilot constraint: one maintainer, roughly two weekends.
- Ordering rationale: the source explicitly places this proof before organiser export.

## Milestone 2 — Organiser export

- Add CSV export of registrations for organisers.
- Ordering rationale: the source explicitly places export after the one-workshop proof.

## V1 requirements with placement open

The V1 scope also requires upcoming-workshop visibility, organiser-set capacity, duplicate prevention for the same email and workshop, organiser registration viewing, name-and-email-only collection, deletion 30 days after the workshop, and retention of the existing React + TypeScript frontend. These remain requirements; the source does not assign each to a milestone.

Payments and calendar integrations are outside V1.

## Open decisions

- [OPEN] Assign the remaining V1 requirements to pilot or subsequent work. This is one unresolved placement decision; they have not been silently deferred or made additional pilot gates.
- **Eligibility contradiction:** “Participants shouldn't need an account.” conflicts with “Also, only authenticated employees should be allowed to register.” [OPEN] Resolve access and authentication before implementing that behavior; neither requirement is selected here.
- [OPEN] Backend and database. Firebase is a suggestion only.
- [OPEN] Exact capacity handling, including full-workshop behavior.
- [OPEN] Deletion mechanism for the stated 30-day requirement; the outcome does not itself select automation or a scheduler.
- [OPEN] Waitlists may be useful later, but are not a committed milestone.

## Assumptions to confirm

None. No additional milestones, implementation dependencies, gates, or dates have been inferred.
