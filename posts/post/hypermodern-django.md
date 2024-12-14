---
title: "Hypermodern Django"
date: "2024-12-14"
tags: post
---

I've been on the hunt for a new way to dogfood Buttondown for the past month or so, and I've finally found it: [Hypermodern Django](https://hypermoderndjango.com/).

At this point, all of my/our usages of Buttondown _for_ Buttondown don't involve archives: we're using it headlessly, with RSS-to-email and APIs powering both this site's newsletter _and_ the 'official' one. This is great, and I'm proud of the fact that we can _even do that_, but it means:

1. archives are turned off
2. the "general" analytics flow of everything archive-related is turned off

And this is a shame! I learn best about where the product needs evolution from usage; we've known abstractly that the archives are good-but-not-great for a while, and I suspect a huge part of that is because we're not using them.

So, the search (idle, errant) for a good newsletter concept began. I had the following criteria:

1. Something that didn't make more sense to be on the actual `buttondown.com` domain;
2. Something that wasn't _expressly_ Buttondown-specific;
3. Something whose average reader _might_ be a Buttondown user;
4. Something that wouldn't be expressly tiresome to maintain, either by me or by the Buttondown team.
5. Something that would be a legitimately good newsletter in its own right, not just a way to dogfood Buttondown.

And here we are, with Hypermodern Django. I've already been starting to write more about our Django usage ([[Improving Django's default pagination performance]], [[MD5-based uniqueness constraints in Django]], [[Postgres batch enqueuing in ten lines of Django]]) and this feels like a logical extension of that work in a niche that really _needs_ it (in my experience, too much Django content is explicitly focused on novice-level usage, which of course is great but leaves a bit of a gap for more serious practitioners).

Anyway — that's the rationale. [Please subscribe to Hypermodern Django](https://hypermoderndjango.com/) and let me know what you think!
