---
title: handbook.directory
date: 2024-09-18
---

It has been a while since I shipped a new thing; it felt good to get back in the saddle, even if the project was so small as to barely warrant the price of the (admittedly fun) domain. I present [handbook.directory](https://handbook.directory/), a constellation of various once-internal PDFs for company culture. (This was inspired by the brouhaha around Mr. Beast's leaked manual.)

The entire contents is [open source](https://github.com/jmduke/handbook.directory), though I'm using [Blot](https://blot.im/) to host it. 

I was thinking about using this as an opportunity to kick the tires on Astro, but the sheer paucity of content and the fact that I really wanted to get this across the finish line in the course of a one-hour lunch break led me to Blot, which I had never used before but had roughly pigeonholed as "the easiest way to ship very simple static content".

That pigeonholing turned out to be accurate! There was a bit of onboarding jank choosing a theme and getting the DNS records set up (when is there not?) but I was very happy with how Blot performed. Moreover, the thing that really impressed me with Blot was _just how fast_ deploys are. I hit `git push blot` and by the time I hop over to Chrome and refresh the tab the changes are there. 

It is a good reminder of the strides that we've made on the Buttondown front with CI — down roughly from twenty minutes end-to-end to ten — might be impressive in a relative sense but we've got a long way to go in an absolute sense.

There's no real "endgame" with `handbook.directory`, but it got some solid traction on Twitter and ended up with a dozen GitHub stars and around three thousand pageviews. I'll take it!