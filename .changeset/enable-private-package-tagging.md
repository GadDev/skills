---
"gaddev-skills": patch
---

fix: enable git tag creation for the private package

`npx changeset tag` was silently skipping tag creation because
`gaddev-skills` is a private package and `privatePackages.tag` wasn't set
in `.changeset/config.json`. This meant no git tag (and no GitHub Release)
was ever created after a version PR merged. Adds
`"privatePackages": { "version": true, "tag": true }` so versioning and
tagging apply to this private package as expected.
