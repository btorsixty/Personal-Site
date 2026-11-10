# Beyond the Template

A public library of security incidents. Each one is walked step by step and tied to the SOC II criteria that speak to it, the control wording a template would carry, and a control written for that environment.

## How an incident moves through

| Status | What it means | Who moves it on |
|---|---|---|
| candidate | Intake agent found it and opened an issue | Intake owner: accept or reject with a reason |
| accepted | Passed the inclusion rules | Agent opens a draft pull request |
| drafted | Facts and proposed criteria filled in from sources | Mapper |
| in-review | Criteria, failure modes and custom controls written | Second reviewer |
| published | Merged and live | Automatic |
| watching | Live, sources rechecked for 90 days | Agent opens update issues |
| closed | No changes for 90 days | Automatic |

## Who does what
- **Intake owner** reads new candidate issues and labels each `accepted` or `rejected`.
- **Mapper** owns the draft pull request: confirms criteria, sets failure modes, writes custom controls.
- **Second reviewer** checks every `event` against its source and checks EDITORIAL.md. Cannot be the mapper.
- **Source-list owner** maintains `sources.yml`, the taxonomies and the schema.
- **Agent** finds candidates, drafts, and watches. It never merges and never writes a custom control into a published entry.

## What lives where
- `incidents/` one JSON file per incident. The record of truth.
- `schema/incident.schema.json` the fields every entry carries.
- `taxonomy/` criteria codes, failure modes, event categories.
- `sources.yml` where the agent looks.
- `EDITORIAL.md` inclusion, publishing and correction rules.
- `agent/` the standing instructions for the daily intake run and the weekly watch run.
- `site/template.html` the page. `scripts/build.mjs` fills it from `incidents/`.

## Where it lives
This folder sits inside the personal site repository. The site is served at `/beyond-the-template/`. Every site build (Vercel runs `npm run build`) first validates the entries and writes the page to `public/beyond-the-template/index.html`, which is generated and not committed. Merging to `main` publishes, so the two-person rule is enforced at merge.

## Commands (run from the repository root)
```
npm run library                                            # validate, then build the page into the site
npm run drafts && npm run preview                         # local preview with all draft entries, under a yellow banner
node beyond-the-template/scripts/validate.mjs              # check every entry
INCLUDE_DRAFTS=1 node beyond-the-template/scripts/build.mjs  # preview with drafts at beyond-the-template/site/dist/index.html
```

## Seed entries
Seven entries are in `incidents/` with status `drafted`. Their mappings and controls are unreviewed drafts and do not ship until a mapper and reviewer sign them.
