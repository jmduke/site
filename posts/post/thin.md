---
title: "Does that dependency spark joy?"
date: 2025-03-01
tags: post
---

If there's been one through line in changes to Buttondown's architecture over the past six months or so, it's been the removal and consolidation of dependencies: on the front-end, back-end, and in paid services. I built our own very spartan version of Metabase, Notion, and Storybook; we vended a half-dozen or so Django packages that were not worth the overhead of pulling from PyPI (and rewrote another half-dozen or so, which we will open-source in due time); we ripped out c3, our visualization library, and built our own; we ripped out `vuedraggable` and a `headlessui` and a slew more of otherwise-underwhelming frontend packages in favor of purpose-built (faster, smaller, less-flexible) versions. [^1]

There are a few reasons for this:

- Both Buttondown as an application and I as a developer have now been around long enough to be scarred by _big_ ecosystem changes. Python has gone through both the 2.x to 3.x transition _and_, more recently, the _untyped_ to _typed_ transition; Vue has gone from 2.x to 3.x. The academic problem of "what happens if this language completely changes?" is no longer academic, and packages that we installed back in 2018 slowly succumbed to bitrot.
- It's more obvious to me now than a few years ago that pulling in dependencies incurs a non-trivial _learning_ cost for folks paratrooping into the codebase. A wrapper library around `fetch` might be marginally easier to invoke once you get used to it, but it's a meaningful bump in the learning curve to adapt to it for the first time.
- It is easier than ever to build 60% of a tool, which is problematic in many respects but useful if you know exactly which 60% you care about. (Internal tools like Storybook or Metabase are great examples of this. It was a fun and trivial exercise to get Claude to build a tool that did everything I wanted Metabase to do, and save me $120/mo in the process.)

We still use a _lot_ of very heavy, very complex stuff that we're very happy with. Our editor sits on top of `tiptap` (and therefore `ProseMirror`); we use `marked` and `turndown` _liberally_, because they're fast and robust. On the Python side, our number of non-infrastructural packages is smaller but still meaningful (`beautifulsoup`, for instance, and `django-allauth` / `django-anymail` which are both worth their weight in gold). But the bar for pulling in a _small_ dependency is much higher than it was, say, twelve months ago.

[^1]: My current white whale is to finally get rid of `axios`. 39 call sites to go!
