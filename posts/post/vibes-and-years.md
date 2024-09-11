---
title: Vibes and years
date: "2024-02-24"
tags: post
---

[XH](https://twitter.com/xhfloz/status/1760671916627734811) asks:

> How do indie developers/small teams keep track of and prioritize long-term roadmaps?
>
> I've been basically work off my gut + Feeling of the Day for the past few years, and that's getting a bit unsustainable

Buttondown's roadmapping has existed for the past three years in a bimodal fashion:

1. In November—December, I spend a lot of active and passive time thinking about what the most important _big_ investments I need to make are. By design, these tend to be infrastructural, ambitious, and nebulous — "introduce localization", "rebuild analytics pipeline", "re-design email editor." These are _never_ quantitative/measurable; I've never found metrics-based business goals useful in the context of Buttondown. [^1]
2. I keep a [big, gnarly, public roadmap](https://github.com/buttondown-email/roadmap/issues) and pop things off the roadmap as I deem fit, in response to various exogenous factors (what I find interesting to work on in a given day; what customers have flagged recently; what strikes me as particularly time-sensitive.)

Of the time I spend working as an engineer, probably 40% of my time is spent on the big ambitious stuff and 60% of my time is spent on the reactive/vibes-based stuff. This distribution should probably be closer to 50-50, if I'm being honest, but it works well for my goals.

IMHO: roadmaps with horizons greater than a year are only useful in large organizations where you need long-term resource planning and financial allocation. (Even then, they're mostly onanistic: every single 3—5 year plan that I've worked on has become consigned to history by Year 2.)

Conversely, roadmaps with horizons _less_ than a year incur a productivity tax in exchange for legibility. Sometimes that tax is worth paying (coordinating comms with writers; working on multiple large projects in parallel with other engineers); right now, it's not worth paying for Buttondown.

Metrics, roadmaps — all of these things are tools, and often they can point you in a given direction in exchange for a cost in time and/or money. Vibes cost nothing; they might not be perfectly accurate, but I think your most important job as an early founder is to have a preternaturally strong sense of what direction to go in absent external stimuli.

("Why have an annual plan at all, if vibes are so useful?", you might ask. Because I was never a two-marshmellow child, and I am personally quite bad at keeping important-but-not-urgent work top-of-mind. It's hard for me to wake up and suddenly think "hm, maybe this is the day to start rebuilding the editor", and the ritual of committing to that kind of project for a year keeps me from spending all my time snacking on lower-ROI but more easily-actionable work.)

[^1]: I find metrics-based goals very useful for operational or performance-related tasks (drive p90 response time for /v1/subscribers down to one second), though.
