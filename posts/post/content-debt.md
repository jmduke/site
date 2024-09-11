---
title: "Content debt"
date: "2024-07-08"
tags: post
---

There’s a nascent trend of releasing ostensibly-private material (changelogs, public wikis, handbooks, etc.) to the public as a bit of a marketing push. This is essentially a form of debt, to the extent that you’re taking a lump-sum payment now in exchange for the implicit cost of keeping these things “up to date” indefinitely (and if you don’t, it’s immediately obvious: nothing gives me the ick more than seeing a changelog whose last entry was six months ago or a “internal handbook” that hasn’t changed since it was launched.) There are some teams that do it well ([GitLab](https://handbook.gitlab.com/) and [Significa](https://significa.co/handbook) come to mind); there are other teams where it fairly vividly reads as “we haven’t figured out a marketing channel yet, maybe this will do the trick.”

Buttondown’s most pernicious form of content debt is the more conventional kind: docs have screenshots that are out of date, blog posts reference features that have been moved or renamed, comparison pages are anchored on old pricing, et cetera. It all boils down to some variation on vestigiality: you publish a thing that doesn’t have a direct line of communication to the source of truth (whether that source of truth is “a YAML file containing pricing plan information” or “the live production-level codebase” or whatever.) A lot of my strategic work the past month, and in the month to come, is focused on widening those lines:

1. Replacing screenshots in the docs-site with automatically-generated iframes;
2. Replacing hand-written API examples with ones built by [httpsnippet](https://github.com/Kong/httpsnippet) and verified in CI;
3. Building out a single-source-of-truth demo site with reasonably, semantic fixture data in support of both above efforts.

This is yeoman’s work; it can be fun to puzzle out efficient solutions, but it’s certainly hard to justify on the grounds of immediate business value alone. But, like investing in paying down technical debt, it earns its keep over the course of years if not months.

Moreover, whenever I’m poking around interesting marketing or content projects the thing that I ask myself first is: “what is the cost of maintaining this accurately and indefinitely?” Which, you know, is a fairly anodyne and 101-level question — but I’m more used to asking it about _code_ than content.

(It also strikes me that _this_ kind of thing is much more fertile ground for better developer tooling. I don’t think I’ve talked to a single founder who feels really good about their process of making sure docs stay up to date.)

Lastly, the organizations I’m most envious of are the ones that sidestep this problem entirely by shipping their application as their marketing site: [Rows](https://rows.com/), [Typefully](https://typefully.com/), I’m sure there are others. Do these experiences convert at a rate as high as a dedicated buildout might? I don’t know, but there’s a single-mindedness and clarity that I admire.
