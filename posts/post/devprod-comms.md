---
title: "Productivity is the rate at which you produce value"
---

Regardless of your position on LLMs, you should take a certain amount of rhetorical umbrage [from this essay by Pawel Brodzinski](https://pawelbrodzinski.substack.com/p/development-speed-is-not-a-bottleneck), in which he implicitly argues that developer productivity is unimportant insofaras we define developer productivity as WPM. Let’s set aside LLMs specifically and focus on the argument in the abstract, which I will charitably phrase as “significant increases to developer productivity are unimportant because they do not solve the harder problems in the product development lifecycle,”

There’s a few fallacies deployed in the essay (including, perhaps most woefully of all, a Daniel Kahneman quote), but the one I want to highlight is this:

> With all the engineering power Google has, the pace of development could have been set arbitrarily high for any of these products. While no official information is available, it's been rumored that Google had a few hundred engineers working on Google+ alone. If the pace of development were all that counted, it would always be the incumbents who would win the product race in any niche. After all, they can pump as much engineering firepower as they want, leveraging their existing revenue streams, customer bases, and whatnot.
>
> ...
>
> At Lunar Logic, when estimating work for a client we've never worked with before, we always go with a wide range. Not as wide as we'd like, as to be brutally honest, we'd need to go with something like "It can take less than a month, or more than a quarter." Still, the bracket is uncomfortably wide for many of our potential customers.
>
> Poor communication creates rework. It's not unusual that the quality of communication, or rather lack thereof, adds as much as an additional 100% to the effort.
>
> That compounds with the development of all unnecessary features. If you look at such a gig in hindsight, the value-adding work may stack up to just several percent of the whole effort.
>
> Adding development speed would only exacerbate the problem. The cost of rework doesn't pile up linearly. Once you rework the rework, it's like a compound interest rate, except in reverse. Go figure what it does to the costs.

Pawel is defining "the thing that can be sped up" roughly as "the stuff that happens after all the work is scoped out", and as such speeding that process up is equivalent to shelling out for slightly thinner and lighter tires when you're biking to work in a chainmail suit every day. And to that extent he's correct! Implementing features is never the hard part: software development is a fractal, complex, and very nascent ecosystem, and translating something from English into code is the easiest part of the process. And, in much the same way that Google could have tripled the engineering budget for Google+ and still lost the product race [^1], many individual efforts cannot be accelerated into the solution space.

But most projects are not Google+, nor are they 0-to-1 opportunities that require feedback and iteration and exogenous wall clock time waiting for engagement metrics. If you were to pick, from random, an engineering team at any default-alive company, their backlog likely looks something like this, ordered roughly by urgency:

1. 20% mandated must-do work
2. 20% interesting, probably-valuable work that can't be justifiably placed above the cut line
3. 60% obviously valuable work that is otherwise boring or uncritical

Teams work on the first bucket; work occassionaly migrates from the second and third buckets _into_ the first bucket. This is the nature of the beast: teams have more inflow than outflow, and triage (both at a local and global level) is the hardest part about maintaining velocity in an engineering organization. As such, many 

[^1]: As many know, Google shifting so much engineering budget towards Google+ ended up actually _hurting_ the product efforts, because it introduced a large amount of communication overhead and politicing for what was otherwise a product tailored for a 20%-time-shaped approach.