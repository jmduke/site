---
title: "Keeping a technical edge"
date: "2024-08-29"
tags: post
---

Someone emailed me in response to [[Two years as an independent technologist]], in which I wrote:

> I miss of being at a large company, which is dealing with deeply cutting-edge technical problems, but my ability to analyze information, make decisions, and perform at a high-level has grown very quickly.

They followed up:

> I had a lot of trepidation around “losing my edge” not working on “hard engineering problems”. It sounds like you had the exact same concerns as well. Reflecting now, do you think you’ve continued to level up or refine your engineering skills?

My response is as follows!

---

Depends on how specifically you want to define “engineering skills.” For instance: everything Buttondown-related is, objectively speaking, pretty trivial in terms of scale. Our largest table is in the order of ~five billion rows, and that’s an outlier (event data!); this is just simply not that much compared to my time at Stripe/Amazon, where a much bigger part of my job was some variation of “figure out how to architect a system that can handle one or two orders of magnitude more volume than conventional wisdom permits.”

So, unless you’re working on a very specific kind of company, I think it’s just not very likely that you’re going to progress in terms of “hard engineering” through independent work compared to spending time at a FAANG where all of the engineering problems are definitionally hard engineering problems.

However! There are two (slightly related) things that make up for this:

1. What you lose in depth, you make up for in breadth. I am exposed to _so much more new stuff_ on a weekly or even daily basis: partially because the ease of adopting and deploying a new piece of technology is much higher (no SecRev, no SOC2, no enterprise sales dance...), partially becauses there is so much ground to be covered, so quickly.
2. You can always outsource your core competencies (don’t want to deal with hardware? use Vercel/Railway! don’t want to deal with hyperscaing a database? use Planetscale! etc.) but you can’t even outsource the _decision_ to outsource those core competencies. There’s no `#search` team in Slack that you get to pepper with questions about benefits and drawbacks of certain ElasticSearch use case; you learn by doing, and you learn that it’s important to do so _really, really quickly._
