# Workshop registration techstack

Source: `../feature.txt`. Only the existing frontend is selected. No external factual or comparative technology claims are needed to preserve the source decisions.

## Selected technologies

- **React** — keep the existing website frontend for the V1 workshop-registration feature.
- **TypeScript** — keep the existing website frontend language.
- **CSV export format** — serves the stated organiser registration-export requirement; no export library is selected.

## Open technology choices

- **Backend — [OPEN].** Options: the suggested Firebase, or another backend not yet named. Required capabilities to evaluate: workshop registration, organiser-set capacity, duplicate prevention for the same email and workshop, organiser registration viewing and CSV export, and the stated deletion outcome. Firebase is not selected or excluded. Technical trade-offs remain unverified and open.
- **Database — [OPEN].** No database is selected or named independently. It must support the registration feature and deletion of registration data 30 days after the workshop. A backend choice has not been treated as uniquely deciding the database. Technical trade-offs remain open.
- **Participant access/authentication — [OPEN].** The governing requirements conflict: “Participants shouldn't need an account.” and “Also, only authenticated employees should be allowed to register.” No identity provider, account model, or authentication mechanism is selected.
- **Deletion mechanism — [OPEN].** Serves the required deletion of registration data 30 days after the workshop. No automatic job, scheduler, service, or manual process is selected.
- **CSV implementation — [OPEN].** Serves organiser export after the one-workshop registration-and-capacity proof. No library or implementation location is selected.

## Constraints on implementation

- Collect only name and email.
- Preserve organiser-set workshop capacity; exact full-workshop behavior is [OPEN].
- Prevent duplicate registrations for the same email and workshop.
- Plan for one maintainer and roughly two weekends for the pilot.
- First prove registration and capacity handling with one workshop; add organiser export afterward.
- Payments and calendar integrations are outside V1.

## Open decisions

- [OPEN] Select backend and database; assess options and their trade-offs before committing.
- [OPEN] Resolve the participant-account versus authenticated-employee contradiction.
- [OPEN] Define exact capacity handling, including full-workshop behavior.
- [OPEN] Select the deletion mechanism and CSV implementation.
- [OPEN] Place remaining V1 requirements within pilot and subsequent work; no additional implementation gates have been inferred.
- [OPEN] Decide whether to pursue waitlists later; no waitlist technology is selected.

## Assumptions to confirm

None. No technology suggestion has been promoted to a decision, and no unsupported technical comparison has been added.
