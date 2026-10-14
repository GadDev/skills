# Techstack — Workshop Registration (V1)

Source: `feature.txt`. Only the frontend is decided. Everything else is open; options are listed, not picked.

| Slot | Choice | Serves |
|---|---|---|
| Frontend | React + TypeScript (existing site) [STATED] | Keep the existing frontend |
| Backend | **OPEN** — not chosen | Capacity, duplicate prevention, deletion, export |
| Database | **OPEN** — not chosen | Same |
| Participant identity | **OPEN — contradiction** | "No account" vs "authenticated employees only" |
| Organiser access | **OPEN** `[ASSUMPTION — confirm]` needed | View/export registrations |
| Hosting | **OPEN** `[ASSUMPTION — confirm]` not stated | — |

## Backend / database options
"Firebase" was suggested but the brainstorm says explicitly it is not a decision. Trade-offs below are general, not vetted claims from the source.

- **Firebase (Firestore + Cloud Functions)** — fast for one maintainer; capacity and duplicate rules need transactions/security rules to hold under concurrent writes; scheduled deletion needs a scheduled function. Vendor lock-in.
- **Small custom API + SQL database** — a unique constraint on (workshop, email) gives duplicate prevention directly, and transactions give capacity safety; more to host and maintain for one maintainer.
- **Other managed backend** — not discussed in the brainstorm; listed only to say the field is open.

Whichever is picked must support: unique (workshop, email); capacity enforced atomically; automatic deletion 30 days after the workshop; CSV export (Phase 2).

## Identity options (resolve the contradiction)
- **A. Employee SSO login (no separate account)** — satisfies "authenticated employees"; arguably satisfies "no account" if it reuses company login. Requires knowing the company identity provider.
- **B. Company-email check (e.g. confirmation link to a company domain)** — no account; weaker than real authentication.
- **C. Open registration, no auth** — satisfies "no account" and drops "employees only".

## Assumptions to confirm
- Backend, database, hosting: all unchosen.
- Which identity option applies.
- How organisers are identified for view/export.
