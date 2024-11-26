---
title: "Shipping is capturing value"
date: 2024-11-24
tags: post
---

This [great essay from Sean Goedecke](https://www.seangoedecke.com/how-to-ship/) went viral two weeks ago, drawing fury and fervor alike for a [[Moral Mazes]]-esque analysis of how engineers at large companies should think about shipping:

> Shipping is a social construct within a company. Concretely, that means that a project is shipped when the important people at your company believe it is shipped.

This essay reminded me of [Zach Holman's on 'Double Shipping' from 2018](https://zachholman.com/posts/double-shipping), in which he argues the same point — shipping is not an actual concrete event so much as a social construct by which we proselytize:

> One of the things we did all the time at early GitHub was a two-step ship: basically, ship a big launch, but days or weeks afterwards, ship a smaller, add-on feature. In the second launch post, you can refer back to the initial bigger post and you get twice the bang for the buck.

---

Three useful things to internalize as early as possible in your career:

1. The act of writing and deploying code is more akin to potential energy than kinetic energy.
2. The platonic ideal of software development is a world in which changes and improvements are instantly and comprehensively understood by all stakeholders; the delta between this ideal and reality is much larger and more pernicious and more valuable than software itself.
3. Nobody has even a fraction as much knowledge or context or even baseline awareness of what you're doing as you do.

It's very easy — and comfortable! — to be cynical about this kind of stuff. Certainly there are organizations notorious for prioritizing shipping in a pluperfect sense — Google, for instance, and their promo-doc-driven culture. Certainly there are organizations that wither and die because their engineering culture is insular and insufficiently collaborative. Certainly there are great engineers who build great things and are washed out of the company because they "didn't politic enough". Running big technical organizations is an unsolved problem; there are few strictly correct answers.

Here is a slightly different and more useful framing: when you are writing code, start from the _why_ — who cares about this thing, why do they care, and what is their success criteria? That person might be you (or future engineers on your team); it might be a customer (or one who is secretly planning on churning next month anyway); it might be a VP (who green-lit the project largely as a reason to get a couple extra heads). Willful ignorance of the answer "what happens, what _really_ happens if this thing never hits production?" (or, conversely, "what happens if this thing hits production and is never used?") is the path to being a capable "programmer" with no leverage or cultural capital.

(Put another way: [[Your job is to produce value]], and code is Work in Progress and not the value itself.)
