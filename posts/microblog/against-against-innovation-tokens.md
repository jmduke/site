---
title: "Against Against Innovation Tokens"
date: "2024-07-04"
tags: microblog
---

Glyph (whose writing and contributions to the Python ecosystem I am deeply grateful for) wrote [Against Innovation Tokens](https://blog.glyph.im/2024/07/against-innovation-tokens.html) yesterday:

> In 2015, Dan McKinley laid out a model for software teams selecting technologies. He proposed that each team have a limited supply of “innovation tokens”, and, when selecting a technology, they can choose boring ones for free but “innovative” ones cost a token. This implies that we all know which technologies are innovative, and we assume that they are inherently costly, so we want to restrict their supply. That model has become popular to the point that it is now part of the vernacular. In many discussions, it is accepted as received wisdom, or even common sense. In this post I aim to show you that despite being superficially helpful, this model is wrong, and in fact, may be counterproductive. I believe it is an attractive nuisance in computer programming discourse.

I find his argument unpersuasive, for two reasons:

1. His minor quibbles about CBT [^1] are enumerated as “it’s incorrect to assume that new technologies have more overhead than old technologies; it’s incorrect to assume that new technologies are harder to learn than old ones; you shouldn’t make technology choices based on how easy it will be to hire people, since you’ll need to train them up regardless.” I think that third point is a nuanced and interesting one, but the _whole point of CBT_ is that there’s no way to truly understand the difficulty of a newer technology without the experience of using it in a deployed environment, and doing so is risky.
2. The larger metaphor he uses to illustrate the downside of CBT — deploying Haskell and then wrapping it in Ruby to limit the blast radius — misses the fundamental question one should ask, which is: “do we actually need to use Haskell in the first place?” I think search is a really useful example here because it's something that many engineering teams have encountered — the process of spinning up an ElasticSearch instance (or something similar) and suddenly having to deal with an entirely new caste of problems versus pouring time and effort into improving the existing relational database to make it handle search-shaped workloads.

However, he introduces what I think is a very useful concept: **boundary tokens**. He writes:

> That is to say, rather than evaluating the general sense of weird vibes from your architecture, consider the consistency of that architecture. If you’re using Haskell, use Haskell. You should be all-in on Haskell web frameworks, Haskell ORMs, Haskell OAuth integrations, and so on.1 To cross the boundary out of Haskell, you need to spend a boundary token, and you shouldn’t have many of those. ... When people complain about programming languages, they’re often complaining about how many different kinds of thing they have to remember in order to use it.

I think this is absolutely correct, and the north star a nascent engineering organization should be pursuing is something along the lines of: **how much fixed-cost (onboarding) and marginal-cost (context-switching) time and energy is required to be able to touch every single part of the codebase?**

This is hard to quantify, but it's one of those things for which vibe-checking is very effective. At Buttondown, we've got a core app written in Vue and a bunch of smaller auxiliary microservices running on Next; these are separate frameworks, sure, but it's all Typescript, and plexing between the two is much more trivial than if you had to hop over to Phoenix or Rails something entirely different.

<hr />

Glyph also talks about the anti-intellectualism inherent in CBT, an argument to which I'm sympathetic. If you were to take CBT to its rhetorical and logical extreme, you'd never use _anything_ new; doing so is a sort of bet against the fundamental promise of technology, which is that things are (jaggedly, but monotonically) only getting better over time.

First off: I think both the accusation and the reality are kind of true. Kubernetes is the go-to punching bag for this kind of thing, but it is important to internalize, _deeply internalize_, that many new technologies are not going to improve the rate at which the median technology company can create enterprise value. (For more on this, read [[Use Rails]].) If you are a senior member of a technical organization, your job is to keenly and efficiently evaluate various new technologies on the bleeding-edge, to find the rare exceptions where that is not the case.

Second off: I do think it's important to have escape valves in technical organizations so that you _can_ evaluate new technologies in a manner that is less operationally onerous than prod, but more legitimate than a hackathon or side-project. Good candidates include: internal-facing tools, microservices that can be interfaced with over REST, engineering-as-marketing buildouts.

[^1]: Choose Boring Technology, not, uh, the other one.
