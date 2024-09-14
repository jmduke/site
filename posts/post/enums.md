---
title: "Always use an enum for your status field"
date: "2024-09-14"
tags: post
---

When I was first starting my career at Amazon — even more bright-eyed and rosy-cheeked than I am now — I was _thrilled_ by the concept of an "architecture review", and by extension the concept of a "Principal Engineer" (Amazon's term for a staff-level engineer, someone beyond career level) who was always treated with some level of mystique and reverence.

This person's role, in the abstract, seemed much more exciting and powerful at the time than it does today — to be a sort of technical [Commodus](https://www.imdb.com/title/tt0172495/), weighing in from the heavens on various proposed schemas and designs, relying on sheer technical _metis_ to make decisions that affect the lives of millions of people. [^1]

One afternoon, we proposed a cluster of microservices for tracking various metadata across versions of Kindle eBooks to better track duplicates and divergences. After a two-hour presentation, we were thrilled to get only a tiny little bit of actionable feedback: squirreled away in the ERD we presented was some sort of `is_active` field for each revision of the book, which we would use to filter out revisions of an eBook that weren't circulating on customers' devices. His comment:

> Shift `is_active` to something more generic: a `status` field, so we can expand it down the line for other parts of the state space.

As luck would have it, this principal engineer was stuck in an elevator with me heading down from Obidos across the street, and he kindly endured my timid battery of questions: what was it like, doing all these reviews? How did he notice the `is_active` field specifically? What did he think about how we were approaching PubSub? And so on.

He paused for a moment, and then said:

> Honestly, 80% of the time in these meetings I just tell people to either use an enum instead of a boolean or to make it more clear which data is events and which is state. I'm always right, it's always useful, and there's never that much fuss about it.

It took me a couple more years to realize the broader implications of what this nice Swedish man was saying, but I find myself returning to the object-level architectural advice more often than not. It's not a free _lunch_, but prematurely turning state from a binary into an enum is an easy way to save yourself — not quite a migraine headache, but a headache nonetheless — down the line when you inevitably need to expand `active | inactive` into `active | inactive | paused` or what have you.

[^1]: This is of course a simplification of the role, which speaks in equal parts to my then-naivete and to Amazon's dearth in career ladder education.
