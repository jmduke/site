---
title: There's no such thing as a zero-marginal-cost free tier
date: 2024-03-16
---

In the [latest episode of Mostly Technical](https://mostlytechnical.com/episodes/27-the-layoff), Ian brings up ConvertKit as an example of a company for which [having a free tier](https://convertkit.com/pricing) makes more sense than PlanetScale, since there are no marginal costs — you don't need to spin up a large amount of fixed-cost resources for every free customer, and you get those sweet network effects for nothing.

I preface this with the disclaimer that I am confident Ian and Aaron know everything I'm about to say already, and "zero marginal costs" was just a shorthand for "negligible." But, as you might imagine, "free tier for an email service" is a topic near and dear to my heart, and so I must briefly opine.

**The truth is, _of course_ there's a cost!**

There's the marginal database load; the fractional cost in _sending emails_ (back when Buttondown had a much more permissive free tier, something like 40% of the outgoing volume was for non-paying users — and the transactional cost of sending emails was and is Buttondown's single largest line-item expense!); the customer support burden; the noise and distraction.

This doesn't mean they, or I, or you, should / shouldn't have a free tier. But the free tier is (or should be) a _marketing_ decision, not a product one. [^1]

If you're a conventional SaaS, by offering a free tier you are allocating money (in the form of ops load, compute, and various other things) in order to acquire customers. Whether or not that offering is correct is not subjective or qualitative: it's just like any other avenue of paid acquisition, where you look at CAC and you look at LTV and you look at your runway and you call the shot.

When I cut the knees off of Buttondown's free tier, it wasn't because I hated free users and it wasn't because I thought they weren't particularly valuable. It was because the napkin math showed that the cost of the free tier had begun to outweigh its return.

[^1]: Or at least insofar as every marketing decision is a product one and vice-versa.
