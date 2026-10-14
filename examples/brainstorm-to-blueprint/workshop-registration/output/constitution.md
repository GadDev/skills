# Constitution — Workshop Registration (V1)

Source: `feature.txt`. Tags: **[STATED]** = in the brainstorm; `[ASSUMPTION — confirm]` = not stated.

## Problem
Monthly engineering workshops are registered via messages and a spreadsheet. People register twice and organisers lose track of available places. [STATED]

## Principles (must always / never)
1. Each workshop has a capacity set by the organiser; registrations never exceed it. [STATED: capacity] `[ASSUMPTION — confirm]` that "never exceed" must hold under simultaneous submissions.
2. The same email cannot register twice for the same workshop. [STATED]
3. Only name and email are collected. Nothing else. [STATED]
4. Registration data is deleted 30 days after the workshop. [STATED] `[ASSUMPTION — confirm]` deletion is automatic, not a manual task, and "30 days" counts from the workshop date.
5. The existing React + TypeScript frontend is kept. [STATED]
6. Payments and calendar integrations are out of V1. [STATED]
7. Waitlists are not committed. They are not built in V1. [STATED: "not committed"; "later" at most]

## Scope (V1)
- Participants see upcoming workshops and register. [STATED]
- Organisers view registrations and export CSV. [STATED]

## Constraints
- One maintainer; roughly two weekends for the pilot. [STATED]
- Pilot proves registration + capacity handling with one workshop; organiser export comes after. [STATED]

## ⚠ Contradiction — needs your decision
The brainstorm says both:
- "Participants shouldn't need an account" (line 22)
- "Only authenticated employees should be allowed to register" (line 23)

These conflict unless "authenticated" means something lighter than an account (e.g. company SSO login that is not a separate sign-up, or a company-email check). No principle is written for participant identity until resolved. Options in `techstack.md`.

## Assumptions to confirm
- Capacity holds under concurrent registrations.
- Deletion is automatic; 30 days measured from workshop date.
- Email comparison for duplicates is case-insensitive and trimmed.
- Organiser access to registrations/export needs some access control (the brainstorm doesn't say how organisers are identified).
- Pilot (two weekends) covers registration + capacity for one workshop only, excluding export.
