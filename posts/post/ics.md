---
title: "Are calendars underrated?"
date: 2025-07-19
---

When talking about the power of open formats, discussion generally gravitates to one of two ends of the same spectrum:

1. SMTP, which by all accounts has been a roaring and smashing success story (so long as you ignore the fact that Gmail is for all intents and purposes a benevolent dictator in the space) in no small part _because_ the mechanics of "using the protocol" is abstracted away from the end user.
2. RSS, which is extremely powerful and useful as a medium but has largely failed as a consumer-facing technology in part because it demands, at some level, an understanding of the underlying technology. (We do not call Mimestream an "SMTP client"; we do call Feedbin an "RSS reader.")

Nestled somewhere in between the two is ICS. ICS has a handful of interesting characteristics:

- It is a protocol that has, for all intents and purposes, _won_. Every major calendar app is backed by ICS.
- It's an extremely simple and portable protocol. It's a little janky (XML is underrated!) but it's plain-text and easy to parse in any language or context.
- Everyone uses ICS; very few people who own iPhones don't use their Calendar app.

And yet there's very little discussion about ICS. It doesn't feel like a lot of people are experimenting with it as a form or surface, despite distribution being easy (if you have a useful ICS, every single person on the planet can use it with an app they already have in a single click) and production being easy (again, it's just a text file, which is trivial to generate). The obvious answer is "well, there's not that much stuff to do with a calendar" — I reject this. I think we (or perhaps just I) think about the world through a temporal lens; one can imagine a world where people treat calendar apps as more of a B2B application. A calendar showing every deploy and every incident; a calendar showing every new registration and new churn. Calendar apps have done a lot of shared work in terms of filtering and collating "events" that seem naturally extensible to non-personal use cases.

All of this is prelude to the fact that I am, to a certain extent, [talking my book: I just built a small little converter from ICS to RSS](https://www.caltorss.com/), arguably the _opposite_ of what I'm espousing above. (If you're looking for the inverse operation, I recommend [rsstocal](https://www.rsstocal.com/), a tool with an equally creative name.)  But I am thinking a lot about calendars these days, and where they might be useful in ways hitherto unconsidered.
