# Roadmap — Workshop Registration (V1)

Source: `feature.txt`. Ordering is the user's: prove registration and capacity first, export after.

## Phase 0 — Resolve blockers (before building)
- Resolve the identity contradiction: no account vs authenticated employees only (see `constitution.md`).
- Pick a backend and database (not chosen; Firebase was only a suggestion).
- Why first: both drive everything in Phase 1.

## Phase 1 — Pilot: registration + capacity, one workshop (~two weekends, one maintainer)
- Show the workshop in the existing React + TypeScript site.
- Register with name + email.
- Enforce organiser-set capacity.
- Reject duplicate email for the same workshop.
- Why: this is the stated first proof, and it targets the two actual pains (double registration, lost track of places).
- `[ASSUMPTION — confirm]` Phase 1 includes the 30-day deletion rule, or it follows right after the pilot. The brainstorm lists it as a V1 requirement but does not place it in the pilot.
- `[ASSUMPTION — confirm]` Phase 1 fits in two weekends only if the identity question is simple.

## Phase 2 — Organiser view and CSV export
- Organisers view registrations; export as CSV.
- Why: stated to come "after" the pilot proves registration and capacity.
- `[ASSUMPTION — confirm]` organiser access control is needed here (not stated).

## Phase 3 — Remaining V1
- List multiple upcoming workshops (the pilot uses one). `[ASSUMPTION — confirm]` this and the 30-day deletion (if not done in Phase 1) sit here.

## Not in V1
- Payments, calendar integrations. [STATED]
- Waitlists: "useful later", not committed. [STATED]
