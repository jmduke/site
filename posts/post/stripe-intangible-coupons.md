---
title: Hidden coupons
date: 2025-09-29
tags: post
---

Much of our work at Buttondown revolves around resolving amorphous bits of state and cleaning it up to our ends, particularly state from exogenous sources. This manifests itself in a lot of ways: SMTP error codes, importing archives, et cetera. But one particularly pernicious way is straight. An author can come to ButtonDown having already set up a Stripe account, whether for some ad hoc use case or because they were using a separate paid subscriptions platform such as Substack or Ghost that also interfaces with Stripe. And one of the first things we do is slurp up all that data so we understand exactly what their prior history is, how many paid subscribers they have, et cetera. As you might imagine, this is very, very effective because the biggest perceived barrier for users is friction and how difficult it is for them to move from one place to another. And every time we can make it incrementally easier for them, it's worth our while. However, as you can also imagine, we deal with a lot of edge cases and idiosyncratic bits of behavior from Stripe. (And if anyone from Stripe is reading this essay, please don't interpret it as that large of a complaint because Connect is a pretty impressive bit of engineering, janky as it is.)

One thing we have to do is pull in all coupon and discount data. So this is for a variety of reasons that are all uninteresting. The point of this essay is to talk about a divergence and where the abstract breaks down.

You might think, as we once did, that the way to do this is pretty simple. You compile a list of all the available coupons, and then you iterate through every single subscription looking for said coupons. This is also the approach outlined in the docs and surfaced in the dashboard, so your naivete is excusable. 

However, this neglects to highlight an entirely different genre of discount, which is ad hoc discounts that are created and applied during the checkout session process, as well as probably a couple other places in which I'm unaware. To iterate through these, you must iterate through the subscriptions themselves:

```python
tangible_coupon_ids = [c.id for c in stripe.Coupon.list().auto_paging_iter()]
intangible_coupons = []
for subscription in stripe.Subscription.list():
  if not subscription.discount:
    continue
  if subscription.discount.coupon.id not in tangible_coupon_ids:
    intangible_coupons.append(subscription.discount.coupon.id)
```

I'm sure there are a lot of interesting and nuanced reasons why these intangible coupons are not actually available through the core endpoint — I also don't care! It is a bad abstraction that I can get two different answers for "what are the coupons for this account?"; it is particularly bad because the "real" answer is by looking in the non-obvious place.

At the same time, I am sympathetic. "I should not have to create a dedicated Coupon object just to apply a single discount to a single subscription" is a very reasonable papercut that I understand Stripe's desire to solve; in so doing, they created a different (and perhaps more esoteric) problem. This is why API design is a fun and interesting problem.