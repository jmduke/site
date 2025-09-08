---
title: "Django forever"
date: 2025-09-07
tags: post
---

Tomorrow, I am taking a very early morning flight to Chicago to attend DjangoCon US. Buttondown is sponsoring, less as an exercise in lead generation and more as an act of circuitous open source sponsorship, and perhaps "sponsorship" is not quite the right word compared to gratuity in the most literal sense. I have been writing Django for fourteen years now: I started during `1.3`, a hinterlands time that I remember mostly in two respects:

1. Django did not support migrations yet (RIP `south`);
2. Beyond that, Django was substantially the same framework it is today, a point often levelled as a criticism that I offer as praise.

Professionally, I see myself mostly surrounded by frameworks largely dominated by superfans: Rails, Laravel, and Next all make it their business (for the latter two, quite literally so) to turn framework adoption into a quasi-religious affair. Each one of these frameworks has something I admire and, in the truest form of admiration, occasionally try to steal wholesale in some form:

1. Rails has an aggressive, opinionated, and unapologetic stance on [elevating an opinionated way to do things "correctly" and making it very easy to do, at the exclusion of all other approaches](https://dhh.dk/2012/rails-is-omakase.html);
2. Laravel has turned the in-sourcing of community frameworks that reach sufficient levels of traction and maturity into an art form;
3. Next looks at every single piece of an application and asks "is there a better way to do this?" and then implements it, consequences be damned.

It is tempting to find elements of Django staid in comparison. `contrib` is littered with packages that should have been excised long ago (`flatpages` comes to mind) and it has taken longer than I would find ideal to in-source things that feel like vital parts of the ecosystem: an async runner (though this is on its way!); email adapters; Oauth; a developer toolbar.

And yet: these things pale in comparison to what I think Django gets _right_, and why I turn to it time and time again (besides, of course, the touch-feel familiarity of having used it for a decade): it _nails_ doing the hard stuff both at an API level (user modeling and everything therein; ORM; routing and middlewares) and an existential level (friendliness and commitment to politesse; extremely good documentation).

It is not an exaggeration in either direction to say: when I look up a StackOverflow answer about Next from one year ago it is usually outdated, and when I look up a StackOverflow answer about Django from six years ago it is almost always still accurate. Stability can be boring; but Buttondown's codebase is at the age (seven years!) where Ship of Theseus metaphors start becoming apt, and while many many parts of the codebase have changed, everything in Django-land core is as rock-solid as ever: ergonomic, performant, and humming away.

I am grateful for everyone who has contributed to Django over the years: the core team, the community, the countless users who have made it what it is today. Using it is a blessing that I do not take lightly.
