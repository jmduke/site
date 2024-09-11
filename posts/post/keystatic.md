---
title: "PSA: mess around with Keystatic"
date: "2024-03-20"
tags: post
---

We've been using [Keystatic](https://keystatic.com/) in Buttondown for around six months now: we migrated most of the content on the marketing site (which is backed by Next) from MDX onto Keystatic, and were so happy with the experience that [the upcoming rebuild of the docs site](https://github.com/buttondown/roadmap/issues/1716) will be featuring Keystatic as well.

It's hard to accurately describe _why Keystatic_, because the market for "semi-static content, but also there are some types, but also there's a CMS, but also there's an API" feels so saturated: Gatsby, Sanity, Storyblok, Butter, Strapi, Contentful, the list grows and becomes more confusing over time. Really, the reason why it felt — feels! – so good to use was because everything felt like roughly the right set of tradeoffs:

- It is very fast. (Even at Buttondown's fairly meager content size, MDX was _incredibly slow_ to compile);
- Getting a typesafe API right out of the box makes it much easier to do content buildout;
- There's a CMS that is good enough that I can feel comfortable pointing a technical writer at it, even if it's not good enough that I feel comfortable pointing _anybody_ at it;
- The process of registering and rendering custom components is easy and ergonomic.

It is still early days for the project, but I think it's the best option out there. Give it a shot.
