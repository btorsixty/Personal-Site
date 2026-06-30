---
title: "Processing Integrity as a SOC II Differentiator"
date: 2026-06-12
section: longform
category: "Opinion Paper"
dek: "Why the least-used Trust Services Criterion separates a real systems audit from a checkbox exercise."
---

Most SOC 2 reports are built on five Trust Services Criteria, and most of them only ever touch one. Security is mandatory, so it shows up everywhere. Availability and Confidentiality get added when a client asks. Privacy comes up rarely. And Processing Integrity, the criterion that asks whether a system actually does what it claims, correctly and completely, gets quietly left off the scope nearly every time.

That omission is usually framed as a practical decision. It isn't. It's the most revealing one in the whole engagement.

## The criterion everyone skips

Processing Integrity sounds abstract until you state it plainly: does data go in, get processed, and come out the other side accurate, complete, timely, and authorized? Most platforms can wave at Security with a tidy stack of policies. Far fewer can show you, with evidence, that a transaction wasn't silently dropped or double-counted somewhere in the pipeline.

> A control environment that can't prove its outputs is just a well-documented hope.

That's the uncomfortable part. Security tells you the doors are locked. Processing Integrity tells you the thing inside the building actually works.

## What it actually tests

When you scope it in honestly, you end up examining things most engagements never reach:

- Input validation, and what happens to the records that fail it
- Reconciliation between systems that are supposed to agree
- Error handling that surfaces failures instead of swallowing them
- Completeness checks on batch and streaming jobs alike

None of these are exotic. They're just harder to fake.

### Where teams get stuck

The usual blocker isn't capability, it's evidence. A team knows its reconciliation runs nightly. Proving it ran, caught a discrepancy, and that someone acted on it is a different exercise.

```
job: nightly_reconciliation
  source: ledger.transactions
  target: warehouse.fact_transactions
  on_mismatch: open_ticket + alert(#data-integrity)
  evidence: reconciliation_log, ticket_history
```

The job on its own is plumbing. The log and the ticket trail are the control.

## Scoping it without drowning

If you want to add Processing Integrity without turning the audit into a forensic accounting project, sequence it:

1. Pick the one data flow that matters most to the customer
2. Map it end to end, including every failure path
3. Find where completeness and accuracy are actually checked
4. Test those checkpoints, not the whole system at once

Done this way, it doesn't expand the audit so much as sharpen it. The firms that lead with Processing Integrity aren't showing off. They've figured out that the criterion nobody else includes is the one that signals you did the work.
