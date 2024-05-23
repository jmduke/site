---
title: Notes on ActivityPub
date: "2024-05-22"
tags: microblog
---

- By far the single most-fruitful tactic has been "just look at raw GET responses from Mastodon and see what things are shaped like." I know that "ActivityPub is under-specified" is a bit of a meme, but it's _wild_ how little prior art there is.
- Something that gives distinctly bad vibes: `ostatus.org` (which ostensibly describes a bunch of the schemae for subscription interactions) now redirects to a gambling site. [See more.](https://socialhub.activitypub.rocks/t/change-ostatus-uri-in-webfinger-rel-property-pointing-to-squatted-domain/2425)
- Webfinger is not part of ActivityPub per ce, but it makes sense as an initial beachhead.
