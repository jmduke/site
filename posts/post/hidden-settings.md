---
title: "Hidden settings are for cowards"
date: 2024-12-06
tags: post
---

At Stripe, we had two abstractions for branching logic in production: `flags`, which were meant to be explicitly temporal (temporarily split-testing traffic; rolling out a new feature or code path; exposing a specific path for a cohort of users during a closed beta) and `gates`, which were meant to be explicitly permanent (overriding a statement descriptor for a Thingish merchant; preserving historical functionality in a neglected API endpoint).

Gates were — are — considered a bit of a last resort, and pushing a new gate to production required a not-trivial amount of sign-off and acceptance from a number of teams, not just for the performance and maintainability burdens they created but for the sheer sign of defeat that they symbolized.

I say this as means of introduction to the anodyne concept of "hidden settings". Buttondown has [hidden settings](https://docs.buttondown.com/hidden-settings) — who doesn't!: eighteen at the time of writing, down from twenty-two an hour prior. Every quarter I'll double-check the list and check if:

1. Anything can be 'mainlined' into a core setting available to everyone;
2. Anything can be 'unshipped' because nobody's actually using it.

Q4 2024's reaping: four completely unused settings, summarily deleted. None of these four settings felt, even at the time, like they were "worth it", and the anecdata bears that out:

1. The user who requested Setting A churned after one month (having never upgraded to a paid plan);
1. The user who requested Setting B churned after _two_ months (having never upgraded to a paid plan);
1. The user who requested Setting C never finished onboarding;
1. The user who requested Setting D is an active and loyal user who never even _used_ the hidden feature.

I am, on average, two years smarter and less foolish than I was when I introduced those four hidden settings, and most of the hidden settings look more like flags than gates at this point. [^1] If it's a good idea to build, we build it properly (and triage it alongside the other forty-seven things we need to do properly); if it's not a good idea to build, it doesn't magically become more palatable by virtue of its obscurity.

[^1]: We've introduced three hidden settings in the past twelve months; one of them was an edge-case performance thing, and the other two are features that are planned to be mainlined in Q1.
