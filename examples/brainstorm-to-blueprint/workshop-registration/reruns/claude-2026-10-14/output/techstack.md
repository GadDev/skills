# Techstack — Workshop Registration (V1)

Source: `feature.txt`. Only the frontend is decided; other choices are options, not picks.

| Slot | Choice | Serves |
|---|---|---|
| Frontend | React + TypeScript, existing site (stated) | Keep the existing frontend |
| Backend | `[OPEN]` | Capacity, duplicate prevention, deletion, export |
| Database | `[OPEN]` | Same |
| Participant identity | `[OPEN]` — contradiction | "No account" vs "authenticated employees only" |
| Organiser access | `[OPEN]` `[ASSUMPTION — confirm]` needed | View/export registrations |
| Hosting | `[OPEN]` `[ASSUMPTION — confirm]` needed | Not stated |

## Backend / database candidates
- **Firebase** — suggested by someone; the source says explicitly this is not a decision. Unchosen.
- **Other options** — not discussed in the source; the field is open.

I did not verify any comparative claims about these options, so none are made here. Whatever is chosen must support: uniqueness per (workshop, email); capacity enforcement; deletion 30 days after the workshop; CSV export. How each is met is for the choice to decide.

## Identity options (to resolve the contradiction)
- **Reuse an existing company login** — would satisfy "authenticated employees" without a separate sign-up. Requires knowing what login exists. `[ASSUMPTION — confirm]` this reading of "no account".
- **Drop one of the two statements** — either keep "no account" and open registration, or keep "employees only" and accept an account/login.

## Open decisions
Backend, database, hosting, participant identity, organiser access.

## Assumptions to confirm
- Hosting and organiser access are needed.
- "No account" may mean "no separate sign-up".
