---
title: Why Buttondown isn't OSS
date: 2024-04-15
---

A number of people have asked me in the past week why Buttondown isn't open-source, given:

1. the love and overt financial commitment we have to [open source](https://twitter.com/jmduke/status/1777688621744521441)
2. the increasing number of "open source startups" (Cal, Maybe, Lago coming to mind)

I preface this answer with the fact that this is coming from my personal blog and not Buttondown's blog, and maybe a year from now either my philosophy or my math has changed on the matter, but the answer right now is something like the following:

1. To be open source in a _meaningful_ sense, the process of working on Buttondown would have to change pretty drastically.
2. The number of users who _benefit_ from Buttondown being open source is fairly small.
3. The theoretical increased rate at which the product could improve is not particularly high. [^1]
4. I think running a company (even an idiosyncratic one) is a fairly distinct skillset and bag of incentives from open source maintainership, and as bad as I am at the former I think I'd be even worse at the latter.

I write the above in pencil, not pen — I think points one and three could very well change in the future. But right now I think the vast majority of startups who "go open source" do so more as a marketing tactic than as a genuine belief in open source, and I think the best way for Buttondown to "be open source" is to open source _components_ ([e.g.](https://github.com/buttondown-email/django-typescript-routes)) and contribute financially to the software on which it relies.

[^1]: I find it instructive to look at [Posthog's commit history](https://github.com/PostHog/posthog/commits/master/).
