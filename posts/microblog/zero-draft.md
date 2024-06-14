---
title: Zero draft
date: 2024-06-12
tag: microblog
---

This quote [from Peter Drucker, via @zetalyrae](https://x.com/zetalyrae/status/1797384601746518385?s=12&t=M_YJHCkPF0gWKK16v7jjYg) resonates a lot:

> Write a report may, for instance, require six or eight hours, at least for the first draft. It is pointless to give seven hours to the task by spending fifteen minutes twice a day for three weeks. All one has at the end is blank paper with some doodles on it. But if one can lock the door, disconnect the telephone, and sit down to wrestle with the report for five or six hours without interruption, one has a good chance to come up with what I call a “zero draft”—the one before the first draft. From then on, one can indeed work in fairly small installments, can rewrite, correct and edit section by section, paragraph by paragraph, sentence by sentence.

This rhymes (but not does _quite_ exactly overlap) with an oft-quoted section of [[The Mythical Man Month]]:

> In most projects, the first system built is barely usable....Hence plan to throw one away; you will, anyhow.

(Notably, Brooks recants that suggestion in later editions of the book, as he says it "assumes the waterfall model of software construction.")

The process of "zero drafting" in my work generally looks something like this:

1. I am tasked with a _hairy_ problem: not an intractable one, but one that feels vague and scary and without an obvious immediate plan of attack or path to resolution.
2. I carve out an afternoon to _attack_ the problem, where the goal is not to solve the problem but to have emerged victorious in my understanding of the problem and with a WIP PR with no plans to merge. [^1] The WIP PR can have broken tests and bugs and poor documentation, but it has the broad strokes of a path forward.
3. I then take time to carve out the obvious and safe things to extract from the WIP PR — inert database changes, necessary refactors, et cetera — and submit net-new PRs for those.
4. Suddenly, all that is remaining is the critical path, and we can close the WIP PR in favor of something cleaner.
5. Lo, the problem, it is solved.

The hardest part of this entire thing is the "carving out an afternoon" bit: good weeks tend to look like ones where I have three entire afternoons, and I'm a sucker for [snacking](https://lethain.com/work-on-what-matters/).

[^1]: This kind of process happens for non-engineering work, too, but I digress.
