---
title: Buttondown Analytics 3.0
date: "2024-02-11"
tags: post
---

Working on a new analytics engine — a scant eleven months after [the previous 'new analytics engine'](https://buttondown.email/changelog/2023-03-28).

Calling this `3.0` is a bit of a misnomer: most of the code, design, and plumbing from the 2023 redesign is sticking around, just in a more modular format. The goal here is to address a couple shortfalls in the previous architecture:

- Business and presentation logic was split between the backend and the frontend. This made shipping faster, but made it harder to do things like build _weekly reports_ which are calculated entirely from the backend.
- Analytics were very tightly coupled in groups of "breakout metrics", which made in-line calculations very quick but makes it harder to incrementally ship _new_ metrics that are useful but don't fall neatly into existing archetypes.
- The _density_ of the metrics seemed very nice and virtuous to me, but was hard for folks who just wanted to reach for a few KPIs that they really cared about.

The goal of this new tranch of work is threefold:

1. Analytics calculations should exist entirely on the backend, in a modular architecture that makes it trivial to add new calculations and filters over time
2. Analytics should be _portable_ in a way that makes it easy to embed certain KPIs outside the core analytics page (e.g. in a splash page or in weekly/monthly reporting emails)
3. Make it easier for folks to answer lifetime-style KPIs

It's interesting — it's _really_ hard to find 'good' analytics experiences on the web. One reason I suspect I've had so much design-level churn here (three designs in three years!) is that this feels very much like the wild west, unlike other parts of the app where we've generally settled on what the right designs are for the 80/20 of people.
