# Constitution — Workshop Registration (V1)

Source: `feature.txt`. Tags: `[OPEN]` = undecided choice; `[ASSUMPTION — confirm]` = my inference, not in the source.

## Problem
Monthly engineering workshops are registered via messages and a spreadsheet. People sometimes register twice and organisers lose track of available places.

## Principles
1. Each workshop has a capacity set by the organiser.
2. A registration is unique per email and workshop; duplicates are prevented.
3. Only name and email are collected.
4. Registration data is deleted 30 days after the workshop. (Required outcome only; the mechanism is not decided.)
5. The existing React + TypeScript frontend is kept.
6. Payments and calendar integrations are outside V1.

## V1 scope
- Participants can see upcoming workshops and register.
- Organisers can view registrations and export them as CSV.

## Constraints
- One maintainer; roughly two weekends to build the pilot.
- The pilot first proves registration and capacity handling with one workshop. Organiser export is added after that.

## Not committed
- Waitlists "could be useful later"; not committed, so neither in nor explicitly excluded from V1 scope.

## Contradiction — needs your decision
- "Participants shouldn't need an account."
- "Only authenticated employees should be allowed to register."

These may be reconcilable (e.g. login with an existing company identity, with no separate sign-up), but the source does not say so. No identity principle is written until you resolve it.

## Open decisions
- `[OPEN]` Participant identity (the contradiction above).
- `[OPEN]` Backend and database (Firebase was suggested, not decided).
- `[OPEN]` Whether the 30-day deletion is part of the two-weekend pilot or follows it.

## Assumptions to confirm
- `[ASSUMPTION — confirm]` Capacity must hold under simultaneous registrations.
- `[ASSUMPTION — confirm]` Duplicate detection ignores case and surrounding whitespace in emails.
- `[ASSUMPTION — confirm]` Organiser view/export needs some access control; the source does not say how organisers are identified.
