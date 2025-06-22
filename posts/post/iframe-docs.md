---
title: Replacing screenshots and videos with iframes
date: "2025-06-22"
tags:
- buttondown
- post
---

[Scattered throughout the Buttondown docs site](https://docs.buttondown.com/change-username), you'll see the fruits of the latest experiment I'm running: getting rid of outdated screenshots and videos by replacing them with iframes. The iframe itself points to our demo instance, which helps alleviate some security issues, and some very light parsing of query parameters allows us to apply a mask and highlight a specific element. This seems really cool, and after hacking out a proof of concept, I'm kind of surprised I haven't seen this tactic applied in more places.

One of many fundamental problems that rapidly evolving tech companies have to face is the drift between docs and the things that they're documenting, and a huge part of this pain comes from the fact that it's really, really hard to keep media artifacts up to date. This seems like a nice way to sidestep that problem entirely while also making a better user experience, since the user could just go from this specific frame, click on it, and then open that exact page in their browser.

There are two obvious reasons that I can think of for not doing this:

1. Security. We solve this by using a completely separate [demo instance](https://demo.buttondown.com) of Buttondown that's permanently logged into its own account. [^1]
2. Performance. iframes are slow! We're not doing it here yet, but it seems pretty trivial to just take a Puppeteer screenshot of every single iframe as a facade and then lazily load on hover or based on some other heuristic. 

Early feedback from this approach has been really positive, and it feels not unlike stumbling upon `gofmt` for the first time — a joy and confidence in the knowledge that this onerous chore has become 80% easier. I'm sure there's a lot of other nuances and edge cases and weirdnesses that I haven't really stumbled into — but it's surprisingly versatile. 

I think it's rare that we get to make our docs better and easier to maintain at the same time, and I'm excited to see where this approach ends up. If you've run into any companies attempting or succeeding with a similar approach, please let me know. 

[^1]: As a sidebar, this is another thing that I'm surprised more people don't do, because it's just really, really useful to be able to point someone towards a hyperlink that shows off exactly what they're asking about without having to muck around with auth or any admin tooling or deal with any mock data.
