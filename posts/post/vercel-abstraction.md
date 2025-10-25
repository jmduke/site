---
title: Vercel's abstractions
date: 2025-10-25
tags: post
---

`use workflow` is cool. I admire Vercel for many things, but in particular for what I will phrase charitably as a steadfast refusal to shackle themselves to the past. One gets the sense of their core philosophy being as simple as:

1. What’s a problem facing developers?
2. What’s the best possible experience we can build in solving that problem?
3. How do we ship that as quickly as possible?

At the same time, I get an overwhelming sense of “the best possible experience” being defined in terms that do not rhyme with my own. Buttondown’s Next sites are simple — almost entirely static — with low code churn and little regard for performance hyperoptimization. The value I get from a lot of the things they work on are academic rather than practical; certainly the improvements I have reaped from, say, `App Router` does not outweigh the cost in having migrated to it in the first place.

Abstractions feel magical until you are on attempt #22 of trying to fix a bug that appears in production but not on your laptop. Vercel’s (very cool!) A/B pre-compute abstraction which involves building static variants of every possible combination of flags makes for a great demo; then you discover it doesn’t really play nice with Vercel’s (very cool!) `og:image` generator.

The feeling I get using Vercel’s fancier stuff is, more than anything, that of playing Minesweeper: at this point, I know where most of the bombs are on the grid but I’d prefer they bump down the difficulty level. (I also know I am not the target audience for most of what they spend their time working on, and perhaps my future is with a framework more interested in _websites_ rather than _applications_ like Astro.)
