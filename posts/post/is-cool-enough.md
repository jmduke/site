---
title: "Is cool enough?"
date: "2024-03-21"
tags: post
---

Via HN I ran into not [one](https://tkte.ch/articles/2024/03/15/parsing-urls-in-python.html) but [two](https://github.com/gruns/furl) extremely neat
and pleasant-looking libraries for URL manipulation. They look like great libraries, and a prior version of me would have taken a brief set of cursory
glances at the hodgepodge of janky URL manipulation code that _I_ wrote for [Buttondown](https://buttondown.com) and said "okay, time to rip out all
of this and replace it with a library that knows what it's doing."

Right now — and I don't mean this in some sort of absolute, zealous sense — that seems unwise. The _incremental cost and ongoing burden_ of pulling in a third-party library for something so trivial and tangential feels high relative to best-case return. (It's not like my existing logic is brittle or terrible: it has bugs and edge cases, I'm sure, but they're not an ongoing concern.)

The right way to evaluate new libraries, even small ones, is just like anything else: "does the value this brings me outweigh not just the one-time cost of adopting it but the ongoing cost of having to rely on it?" Sometimes — often times! — the answer is yes. But people tend to underrate the ongoing costs of depending on third-party libraries, because those costs are more volatile and implicit than depending on your own code.
