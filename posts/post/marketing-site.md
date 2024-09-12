---
title: "Why your marketing site should be separate"
date: "2024-09-12"
tags: post
---

In [[Notes on buttondown.com]] and [[How Buttondown uses HAProxy]], I outlined the slightly kludgy way we serve `buttondown.com` both as a marketing site (public-facing, Next/Vercel, largely just content pushed by non-developers) and an author-facing app (behind a login, Django/Heroku/Vue) and recommended developers _not do that_ and instead just do the sensible thing of having:

- `foo.com`, a marketing site
- `app.foo.com`, an application site

This prompted questions, all of the genre: “why do you need your marketing site to be hosted/built differently from your application site?”

A few reasons:

1. You are, at some point, going to want someone non-technical to be able to contribute to your marketing site. If you host your marketing site from the same framework/repository as your application site, you have suddenly capped your CMS flexibility at “whatever integrates with my stack.”
2. You do not want to couple deployments/SEO of the marketing site with the application site. (Do you want to force CI to run and end-to-end deployments to trigger to fix a typo? Do you want an OOM to take down your blog?)
3. Namespacing is much easier (for things like, say, a whole-ass domain migration) when you don’t have to keep a sitemap that contains both internal and external paths.

There are reasonable counterarguments:

1. Being able to commingle business logic with marketing can lead to powerful programmatic SEO or other clever things.
2. Shunting your marketing site off to a purpose-built CMS like Webflow hamstrings your ability to iterate quickly.

I think the synthesis that we landed on — Next (powered by [Keystatic](/posts/post/keystatic/)) gives us the best of both worlds. Non-technical writers can publish and edit easily; we can do fancy programmatic things. But none of that obviates what is in my mind the _more_ clear-cut piece of advice:

**Even if you’re dead-set on having a single application serve both the marketing and application site, deploy them to separate domains.**
