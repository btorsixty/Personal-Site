---
title: "Transforming Your SOC II Report with Processing Integrity"
date: 2026-07-07
section: longform
category: "Case Study"
dek: "Most SOC II reports stop at the one required criterion. Processing Integrity is the optional one that actually describes what your service does."
---

If your organization's service depends on ingesting, processing, and delivering data, and you're only reporting on Common Criteria in your SOC II, your report is leaving out the part that actually describes what you do.

A quick refresh. The Trust Services Criteria (TSC) are comprised of five distinct criteria. Only one, Common Criteria (often referred to simply as Security), is required for all SOC II reports. The remaining four (Availability, Confidentiality, Privacy, and Processing Integrity) are optional. And in the era of templated reporting and off-the-shelf control frameworks, most organizations start and stop with Common Criteria, maybe tack on Confidentiality or Availability. The result is a report that reads like everyone else's report. It tells the reader the organization takes protection seriously, which is great, but says almost nothing about how the service itself actually operates. If you swapped the company name on the cover page, half the time you wouldn't notice.

Processing Integrity is the criteria that changes that. It's where an organization can move past "we protect data" and into "here's how our system handles data completely, accurately, and on time." It gives the reader a look at the organization's operational performance, not just its security posture, and injects that directly into the report. For data-driven services, it's the difference between a report that checks a box and one that actually represents the product.

## What is Processing Integrity?

Processing Integrity exists to evaluate how the in-scope system is ingesting, processing, and producing data completely, accurately, and timely. The focus still aligns with overall security practices, but PI goes further. It gives the reader a look at how the organization actually performs, and puts that information directly into the report.

## Where Does Processing Integrity Apply?

If your organization is ingesting, transforming, or exporting data as a component of your business, Processing Integrity is key to providing an adequate description of how these are being performed. Consider the following cases:

- In-the-field IoT devices reporting metrics back to a centralized location where they are assessed and reported back to end users.
- FinTech platforms wherein market prices are ingested multiple times a day to the system that breaks down decision points.
- Real-time line-queue systems displaying projected wait-times for potential customers.

## The Criteria, Broken Down

Each TSC in SOC consists of Criteria that must be addressed via organizational controls. The following section walks through each of the Processing Integrity criteria with some broad, illustrative controls to give a sense of what lives inside each one.

To keep things grounded, we'll follow a single organization, a fictional IoT telemetry platform named Meridian, through each criteria so the concepts have something tangible to attach to.

### PI 1.1 — Governance

Good governance sets the stage. Before getting into technical controls, the organization needs a baseline definition of all relevant data that's expected and leveraged as part of service delivery. Think of it as the index: what data exists, what it should look like, and how it moves through the system.

This foundational step matters more than it gets credit for. If something deviates later in the process, this documentation gives the team a reference point for identifying what went wrong and why. Without it, you're troubleshooting against assumptions instead of specifications.

### PI 1.2 — Input

Once governance has established what data the system expects and how it should behave, the next step is making sure data entering the system actually meets those expectations. PI 1.2 is about the front door: the validation that happens before data makes it into the processing pipeline. Completeness and accuracy get enforced here, at the point of entry, which goes a long way toward reducing downstream risk.

This is also where a reader starts to see what makes the service tick. Input controls aren't generic security measures. They're specific to the data the product depends on. A FinTech platform validating market price feeds looks nothing like a payroll system ingesting timesheet data, and PI 1.2 is where those distinctions actually show up in the report. It's a chance for the organization to show that their system was purpose-built for the data it handles, not cobbled together with one-size-fits-all safeguards.

When an organization articulates its input controls through the lens of Processing Integrity, the report moves past confirming that validation exists. It shows the reader what is being validated and why, and that speaks directly to the reliability of the product's foundation. That's the kind of detail that separates a SOC II report from a checklist.

### PI 1.3 — Output

Processing Integrity doesn't end once data has been accepted and transformed. The output has to reach its intended destination completely, accurately, and on time. PI 1.3 addresses the delivery side: how the organization makes sure that what leaves the system reflects what was processed, and that it gets where it needs to go when it needs to get there.

Arguably the most client-relevant section in the criteria, controls surrounding the service's output shape the overall perspective and reliability of its outputs. They're the reports clients pull, the data feeds downstream systems consume, the dashboards stakeholders make decisions from. PI 1.3 is where the SOC II report can articulate how the organization ensures the thing it's actually selling, its deliverable, meets quality standards. For organizations that have invested in output integrity, this is the criteria that puts that investment on display.

An organization can have strong governance and airtight input validation, but none of that matters much if outputs show up late, incomplete, or at the wrong destination. PI 1.3 is where the organization gets to show not just that they deliver, but how they make sure the delivery is right. That's what turns a SOC II report from a compliance artifact into something that actually reflects the service.

### PI 1.4 — Storage

Data doesn't always move through a system in a single, uninterrupted pass. In a lot of environments, inputs are staged, intermediate results are held during processing, and outputs stick around before and after delivery. PI 1.4 is about the integrity of data at rest throughout the processing lifecycle: making sure stored data stays complete, accurate, and retrievable per the system's specifications.

Storage controls can look like they overlap with broader security and availability measures, but the PI lens is different. This isn't about whether data is encrypted or backed up in general. It's about whether the specific data that powers the service keeps its accuracy and completeness while sitting between stages.

Think about a logistics platform that stages route optimization data overnight before dispatching it the next morning. If that data degrades or gets inadvertently modified at rest, the outputs are compromised before processing even runs. PI 1.4 is where the organization shows readers it's accounted for these intermediate steps, that the product's reliability doesn't just exist at the edges where clients interact with the system.

Storage controls are easy to overlook when the focus is on what goes in and what comes out, but the space in between is where silent failures happen. Demonstrating mature storage controls tells report readers that the organization designed its service to maintain integrity across the full data lifecycle, not just at the endpoints a client can see.

### PI 1.5 — Error Handling

No system runs flawlessly all the time. PI 1.5 acknowledges that and evaluates how the organization identifies, captures, and resolves processing errors and exceptions. Think of it as the safety net. Does the organization know what constitutes an error? Can it detect deviations? Does it have procedures to correct and communicate issues before they compound?

From a service differentiation standpoint, this may be the most telling criteria in the entire PI domain. Any organization can describe how its system works when everything goes right. What separates a mature service from an unproven one is how it responds when something goes wrong. PI 1.5 gives the organization a chance to show report readers that it hasn't just anticipated failure scenarios specific to its service, but built structured responses around them. For clients evaluating vendors, this is the criteria that answers the unspoken question: "What happens when something breaks?"

Error handling is where operational maturity becomes visible. Organizations that can show defined error taxonomies, proactive monitoring, structured remediation, and transparent communication are telling report readers something more than "we're compliant." They're demonstrating resilience. A SOC II report with well-articulated PI 1.5 controls tells the reader: this organization knows its service well enough to know how it fails, and built the systems to catch it when it does.

## Don't Sell Yourself Short

Here's the thing. Including Processing Integrity in your report is only half the battle. If the controls read like they were written to satisfy the criteria and nothing else, a reader will notice. You've added scope to your audit without adding value to your report.

The path of least resistance avoids PI entirely. The next easiest option includes it but fills it with generic controls that could describe any system at any company. Two vague references to "data validation" and "output review" don't tell anyone anything about the actual service. They definitely don't differentiate the organization.

What separates a check-the-box implementation from one that actually works is specificity. Controls that reference the actual data, the actual system behavior, the actual service. Anything less and you're adding pages without adding insight.

To put that in perspective, here's Meridian's PI 1.2 (input controls) written two ways. First as a minimal generic implementation, then as the version that represents their service.

<!-- TODO (Ben): the side-by-side comparison of Meridian's PI 1.2 control (generic vs. service-specific) was a table/graphic in the PDF and did not extract as text. Send me the two versions and I'll drop them in here as a native comparison. -->

This isn't about writing longer controls or padding the report. It's about specificity. If a control could be copy-pasted into a different company's report without changing a word, it's not doing the job.

The whole point of adding PI is to let the report speak to the product. If the controls don't reference the product, you did the work for nothing.

## Adding Processing Integrity to an Existing SOC II Program

If your organization already has a SOC II covering Security/Common Criteria, adding PI is not the lift most people think it is. But the hesitation usually isn't about the work. It's about how most organizations are introduced to compliance in the first place.

The reality is that a lot of companies come into SOC II with a very transactional understanding of what they're doing. They're told they need it, handed a control framework, and pointed toward a list of 80–100 controls to implement. The goal becomes "get through the audit." And that's not wrong, it gets the report issued. But it also creates a mindset where the report is something to survive, not something to use. So when someone suggests adding another criteria, the instinct is "why would we add more work to something we're already trying to get off our plate?"

That's the gap. It's not just scope creep concerns. It's that nobody explained that the report can actually work for the organization, not just satisfy a requirement. The leap from "we did our 90 controls and got our report" to "we have a report that third-party reviewers actually find valuable" is a lot shorter than most teams realize. PI is one of the clearest ways to close that gap, because it's the criteria that lets the report describe what the organization actually does, not just how it protects things.

A few things worth keeping in mind:

- **You're documenting what you already do.** Most organizations that should have PI are already performing input validation, output checks, and error handling. The work isn't building new controls from scratch. It's formalizing and articulating what's already in place in terms that map to the criteria.
- **PI controls can reference existing Common Criteria controls.** There's no rule that says PI controls have to be entirely net-new. If your change management process (CC8.1) already governs how processing logic is modified, PI can reference that and extend it with processing-specific detail.
- **Start with your data lifecycle.** If you can map how data enters, moves through, and exits your system, you've already done the hardest part of the scoping exercise. The five PI criteria map directly to that lifecycle: governance, input, output, storage, and error handling.
- **The auditor workload increase is manageable.** For a mature organization, PI typically adds a handful of controls to the report, not a wholesale expansion. The criteria are focused and the scope is bounded by the system description you've already defined.

The barrier to adding PI is almost always perception. Once teams understand that the report isn't just a compliance obligation but a representation of their service, the conversation shifts from "how do we minimize scope" to "how do we make this thing actually useful." That's the shift that matters.

## Up Next: Processing Integrity and AI

There's a conversation happening right now in almost every organization with a SOC II report: what do we do about AI?

If your in-scope system uses AI or machine learning anywhere in how it processes data (predictive models, automated decision-making, classification, enrichment), Processing Integrity is probably the most natural place to address it. The criteria already cover how data is ingested, processed, validated, and delivered. AI just adds complexity to each of those stages, and most reports haven't caught up yet.

Part 2 of this series will get into how PI can articulate controls around internal AI use on in-scope services. Model governance, training data integrity, output validation, drift monitoring, and how Meridian handled it when they dropped a predictive maintenance model into their pipeline.

## Wrapping Up

There's a comfort zone in SOC II reporting. Common Criteria is required, the frameworks are established, and there's no shortage of templates to get you through it. That system works. But it also means a lot of reports end up looking nearly identical. Same criteria, same controls, same structure. The report satisfies the requirement without saying much about the organization behind it.

Adding PI means stepping outside of that. It means documenting controls that are specific to your service, your data, your processing logic. Things that can't be templated because they're unique to what you do. That's uncomfortable for some teams, especially when the existing report has been humming along for years and nobody wants to rock the boat.

But the risk isn't in adding PI. The risk is handing a prospect a 90-page report that covers your security posture in detail and tells them nothing about the service they're actually evaluating.

The controls are likely already in place. The audit effort is measured in hours, not months. And the result is a report that does something most SOC II reports don't: it tells the reader why the service is reliable, not just that it's protected.

If you're thinking about adding PI, or just want to talk through what it would look like, let's chat.
