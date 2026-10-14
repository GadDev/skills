# Workshop registration constitution

Source: `../feature.txt`. Untagged requirements below are stated V1 decisions. `[OPEN]` items are unresolved, not commitments or assumptions.

## Principles and constraints

- Keep the existing React + TypeScript frontend.
- Allow participants to see upcoming workshops and register, subject to resolving the eligibility contradiction below.
- Give each workshop a capacity set by the organiser.
- Prevent duplicate registrations for the same email and workshop.
- Allow organisers to view registrations and export them as CSV.
- Collect only name and email.
- Delete registration data 30 days after the workshop. The deletion mechanism is not selected.
- Keep payments and calendar integrations outside V1.
- Plan for one maintainer and roughly two weekends to build the pilot.
- First prove registration and capacity handling with one workshop; add organiser export after that.

## Open decisions

- **Eligibility contradiction:** “Participants shouldn't need an account.” conflicts with “Also, only authenticated employees should be allowed to register.” Neither requirement takes precedence. [OPEN] Resolve the intended participant access and authentication model.
- [OPEN] Backend and database. Firebase was suggested, not selected or excluded.
- [OPEN] Exact capacity handling, including what happens when a workshop is full.
- [OPEN] How registration data will be deleted 30 days after the workshop.
- [OPEN] Placement of the remaining V1 requirements within the pilot and subsequent work; only the one-workshop proof followed by export is explicitly ordered.
- [OPEN] Waitlists are a possible later feature, with no commitment.

## Assumptions to confirm

None. No unstated implementation choices or additional requirements have been adopted.
