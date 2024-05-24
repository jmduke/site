---
title: "Why can't you just...?"
date: 2024-05-23
tags: microblog
---

Buried in a snarky thread about why Google Calendar doesn’t support calendar syncing is a [long, detailed explanation of why shipping this sort of thing is hard](https://x.com/jebank/status/1792753112689901760):

1. Designing a consent experience for the enterprise admin and enterprise end user
2. Creating a special "read only" object type that's only populated via one-way sync from a consumer account. It's not the same as a free/busy share of an entire calendar or an event set to private visibility as those have slightly different semantics. The most analagous concept is the read-only events that come from e.g. OpenTable events, but even those are a bit different from what you'd want here. Make sure this object type is rendered properly across all clients.
3. Making sure that object is rendered correctly and can't be modified from the enterprise account on any native clients to preserve the one-way sync that the source of truth is the consumer account.
4. Ensuring that edits made from the enterprise account in 3P clients (like Apple Calendar) are correctly dropped. Same with legacy native apps that can't be update.
5. Ensuring that the API correctly represents this new object type and drops edits made from enterprise accounts. Note: read only events are super hard when you have an ecosystem of 3P clients and an API that may not respect your readonly designation.
6. Figuring out how to handle this object type for legal retention. Should it appear in Vault? No real precedent, tricky policy question.
7. Can an admin modify or delete this object as they can with all other data in the enterprise account? No real precedent, tricky policy question.
8. If the consumer account is deleted, account for the different wipeout period of the enterprise data.
9. Make sure this event type is correctly represented in all cross-product features, e.g. the warning in Google Chat that someone is in a meeting.
10. Think through a whole bunch of tricky edge cases: e.g. consumer account is deleted but a legal action requires access to the data for some reason and it exists in the audit logs of the enterprise, what happens?

Of course you can skip several of these steps and get dunked on by folks on twitter when the product looks incomplete or broken (or much worse regulators or enterprise clients).

---

There are two things this jeremiad brings to mind (three, if you count how satisfying and thereapeutic it must have been to write it):

First: it’s always harder than you expect to build something once you’re at a significantly large size. I am guilty just like anyone else of forgetting this fact.

The advent of PLG and VC-subsidized growth means that more products are truly horizontal than ever before — the median company now is _much_ more likely to serve both a pre-revenue startup and a Fortune 500 company than at any previous point in time, and such companies tend to contend, as a meaningful design principle, that the same product surfaces should scale gracefully with the size of the customer using it.

I called this the “Lyft problem” while at Stripe. “Why don’t you guys just ship a more granular MRR pivot table? There’s not really _that_ much data for the average merchant!” “Yeah, well, what about Lyft.” [^1]

Second: the job of “deciding what to build” is so radically different as a line-level PM embedded in a FAANG compared to being at a relatively small (<1000 HC) company. Your goal as an individual PM within a Borgish company is largely to find areas of tactical leverage, align stakeholders (lol, I know, but really), and properly balance short-term and long-term investments. These are difficult things to do that are not just underweighted but _non-existent_ in different kinds of companies. [^2]

---

None of this is to say that Google shouldn’t support this use case — they should, and I find it annoying that they don’t!

But I get frustrated with people whose thinking about why a company simply hasn’t shipped X stems from an assumption that they don’t care, or they are ignorant, or they are incompetent.

Administrative capacity and institutional agility are boring topics, but [they’re what actually matter.](https://x.com/vebaccount/status/1083800118833414145)

[^1]: This is also why I am increasingly confident that _ignoring the enterprise_ is a tenable, reasonable strategy for certain companies: you are sacrificing revenue for agility in a way that may make huge amounts of long-term sense.
[^2]: The inverse is of course true as well: the best startup PMs are thrust into a position not dissimilar to an RTS, where _all_ options are theoretically viable and your goal is to rapidly recalibrate and triage where you’re allocating your capital and labor. This is something that Microsoft does not really prepare you for.
