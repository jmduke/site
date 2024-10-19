---
title: "You should build this:"
date: "2024-10-19"
tags: post
---

A prior iteration of this site had a page called "Project ideas" that listed a bunch of things that I'd like to build. This was a good idea and useful in its own right (I got a few people to build companies and projects based on them, and it was a useful avenue by which folks could tell me which ideas were already implemented.)

I still haven't quite worked out how this current iteration of my site should handle these sorts of long-form mutable catalog-style posts: the whole thing is really organized around a central timeline, and in lieu of search or a colophon page its harder to designate a given post as an evergreen dumping ground. So instead, I'm just going to batch a few ideas every few months.

(If you end up exploring any of these ideas, please let me know!)

### Fuzzy search atop git history

There's a lot of interesting work around applying LLM-powered search to software development workflows; many of these are inordinately ambitious ([[You gotta be able to taste the kool-aid]]), to the detriment of the more mundane but solvable problems. Things like:

1. "Which commit introduced the `Automation` model?"
2. "Which of my myriad stashes contains the exploration work I was doing on a new splash page?"
3. "What un-merged branches touch the markdown rendering engine?"

### API wrapper around RDS Performance Insights

One genre of project that I stubbornly refuse to change my priors on despite a dearth of success stories (RIP [Briefmetrics](https://github.com/shazow/briefmetrics)!) is: "UI wrapper around obscure/arcane/annoying but valuable FAANG API." RDS Performance Insights is a great example of this, and one can even purloin [the great work done by Planetscale](https://planetscale.com/blog/introducing-database-reports) to find an early form factor that works well.

### A better search around `chat.db`.

iMessage is one of the biggest social networks in the world; every MacBook has its entire iMessage history stored in a SQLite database called `chat.db`. It is wild to me that there aren't more projects that take advantage of this, given how annoying it is to actually search and collate one's iMessage history at scale?
