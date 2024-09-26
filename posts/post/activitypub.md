---
title: Notes on ActivityPub
date: "2024-05-22"
tags: post
---

- By far the single most-fruitful tactic has been "just look at raw GET responses from Mastodon and see what things are shaped like." I know that "ActivityPub is under-specified" is a bit of a meme, but it's _wild_ how little prior art there is.
- Something that gives distinctly bad vibes: `ostatus.org` (which ostensibly describes a bunch of the schemae for subscription interactions) now redirects to a gambling site. [See more.](https://socialhub.activitypub.rocks/t/change-ostatus-uri-in-webfinger-rel-property-pointing-to-squatted-domain/2425)
- Webfinger is not part of ActivityPub per ce, but it makes sense as an initial beachhead.
- Here's a fun, interesting, vaguely audacious top-level goal: _every subscription form on the web should take an ActivityPub username as well as an email address_. [Ghost has this in their mocks as well](https://activitypub.ghost.org/), and I don't think it's technically that complex — [Hugh Rundle walks through the steps](https://www.hughrundle.net/how-to-implement-remote-following-for-your-activitypub-project/) but, if my understanding is correct, he unnecessarily complicates things a little bit. All we _really_ need to do is hit webfinger and then redirect. (Maybe a higher-level question: how do you determine if `foo@buttondown.com` is an email address or an AP username?)
- [This screed](https://gist.github.com/jdarcy/60107fe4e653819138396257df302eef) is a pretty interesting bear case on the scalability of ActivityPub. I am not _super_ worried about the implications here — I get and agree with where the author is coming from, but as an implementer this feels like a "cross this bridge when I get to it" situation.
