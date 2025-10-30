---
title: "Cheetah II"
date: 2025-10-29
tags: post
---

I wrote about [[Cheetah]] two weeks ago and appreciated the multiple people who quietly whispered in my ear after publication that it was, in fact, a Cursor model.

[They have released it and given it the branding of Composer, which, to be clear, is a much worse name:](https://cursor.com/blog/composer)

> Our motivation comes from our experience developing Cursor Tab, our custom completion model. We found that often developers want the smartest model that can support interactive use, keeping them in the flow of coding. In our development process, we experimented with a prototype agent model, codenamed Cheetah, to better understand the impact of faster agent models. Composer is a smarter version of this model that keeps coding delightful by being fast enough for an interactive experience.

Branding aside, I'm excited to see this. I've been historically fairly bearish on Cursor's prospects as a company with a long-term moat, even as I count myself an MAU. This is perhaps a devastating blow to that argument because they've built something that, for my use case of LLMs, is overwhelmingly some version of fuzzy copy-paste. I think trade-offs between speed and accuracy are hard to reason about. I suspect that it might be idiosyncratic of me to profess happily trading a little bit of precision for a whole lot of speed.

The reason for that is fairly simple: my use case of LLMs is overwhelmingly some version of a copy-paste. It's rare that I ask an LLM to do something that is not already implemented in a similar fashion somewhere in my codebase, such as:

1. implementing a bulk action for changing the color of a tag (we already have bulk actions and we already have the ability to change tag colors in the API, just not in bulk)
2. or recreate the test suite that we have for all Mailgun events except for SendGrid (we have the exact suite, just need updated constants and fixtures)

My mental model of work like this is something like the following: if you were to rate every single LLM on a competence scale of 1 to 100, where 1 is "fired from the job" and 100 is my own competence, all of the work required by this genre of task is usually somewhere between 25 and 75. All of the truly pernicious bugs one can introduce, the really gnarly edge cases, are somewhere between 95 and, like, 125.

Therefore, an LLM that performs at a level of 90 as opposed to 80 actually provides me no value: the work I'm giving it does not benefit from its extra ten points. But if that LLM instead outperforms on _speed_, well, that is a tangible difference: twenty seconds and five seconds are _oceans_ apart from one another in terms of ability to stay in flow.
