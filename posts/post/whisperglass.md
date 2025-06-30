---
title: "Whisperglass"
date: "2025-06-30"
tags: post
---

![](https://pbs.twimg.com/media/GupfIchXAAAEJMM?format=jpg&name=large)

I spent a couple hours this weekend resuming work on Whisperglass, born from some of the internal functionality within Buttondown. _Resuming_ is perhaps a misleading choice of words: the work hitherto performed on the app was: thinking of the idea, registering a domain, and putting a [Google Docs-based landing page](https://whisperglass.com) in front of it. This weekend, I actually created a repository and started adding some code. This is going to be a hodgepodge of various notes from the early onset before I forget them all.

## Scope

This is, in many ways, an app that I should have done before Buttondown, in that the scope is so tight and the TAM is so small that it's a bit of a training wheels SaaS compared to most other things I've worked on. There's nothing wrong with that, obviously. I've always admired products like [DMARC Digests](https://dmarcdigests.com/) and the since-departed [Briefmetrics](https://github.com/shazow/briefmetrics/) as smart ways to try and just get a little bit of incremental value out of a common pain point.

## Goals

There's really no expectation of this being a meaningful financial success. I think it will be fun to do this and get my hands dirty programming from scratch in a way that I haven't done in a long time, and I think it can be a good little source of inbound traffic for Buttondown — but it feels like the 95% case for this is, ultimately, a trivial revenue number compared to anything on the Buttondown side or anything on the Third South side. 

However! One of the things that I have really wanted to exist for my own tinkering is an open-source SaaS in Django that I can point people to and use as a legitimate example for some patterns and tactics. This is a nice way of being able to do that, and it will also mean that I can credibly and reasonably riposte complaints that the prices for Whisperglass are too high — "just host it yourself" is a fun card to be able to play.

## Name

I don't love the name, I'll be honest. I wanted something that wasn't explicitly GPT-related in both senses of the term. I wanted something that had an easy dot-com to remember and pronounce. Whisperglass was the best I could come up with, and I guess it theoretically leaves the door open to surface area expansion down the line.

## Stack

Django, Tailwind, PostgreSQL — pretty much the same as Buttondown. A couple notes around the edges:

1. Going to explore the use of [django-cotton](https://django-cotton.com/) and resist the siren song of a JS framework. (Nothing wrong with them, but this is not a sufficiently demanding frontend to warrant the big guns.)
2. Going to explore using Postgres _only_ for queuing and crons, rather than using Redis.
3. Wherever this gets deployed, it's not going to be on Heroku (mostly as a training exercise for a large Heroku exfiltration down the line.) 

## Speed

I mentioned that I started this app in earnest this weekend per timing. I spent three hours total with my laptop open. During that time, I was able to get the core schema, registration, auth, core data sync mechanism, a pretty solid design system, a landing page, linting, tests, the 0.0.1 iterations on notifications, and a generalized activity feed. I framed this as with my laptop open specifically because the majority of my input came from using Aqua to talk to Claude, and the minority of the input largely came from copy-pasting existing functionality, dependencies, and utilities from. I think those things are almost equal in weight, obviously flawed, as a tremendously powerful lever for sloppy code. But I think it's really, really hard still to get meaningfully well-architected code out of it without having a lot of backstops and a lot of prior art. 

## Like and Subscribe

- If you want to follow along: just subscribe to this blog. I'll be posting updates here as I go.
- If you want to test Whisperglass as an actual user: [email me](mailto:justin@buttondown.email).