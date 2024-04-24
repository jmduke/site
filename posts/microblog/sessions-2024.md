---
title: Stripe Sessions 2024
date: "2024-04-24"
tags: microblog
---

Stripe held the keynote for [Sessions](https://stripesessions.com/), their annual WWDC/re:invent-esque conference, this morning. I wanted to jot down some thoughts while they’re still fresh. (I think the [changelog](https://stripe.com/changelog) is the best way to poke around both the changes I’m writing about and the ones that I omitted.)

## Caveat / disclosure

I am a Stripe user and shareholder. That being said, I have a public track record of being very persnickety, as evinced by the sheer number of emails I send to bugs@stripe.com:

![Thank you Jeff (and every engineer who fixed one of my nits!)](/img/bugs.png)

## Stuff I am particularly jazzed about

- It seems very clear to me that if we were to flash-forward five years, the single most important thing shipped (though it technically soft-launched back in January, I think) was [Automations](https://docs.stripe.com/billing/automations). If you were to take the entirety of all payments integration code in the world and throw it into a very large graduated cylinder, you’d see a _huge_ swath of “valuable-in-terms-of-revenue-but-cheap-in-terms-of-differentiation” code float to the top that all looks essentially like “listen to `invoice.will_be_due` and then send a coupon if usage is low,” and I think it is a clear and obvious area that Stripe should invest in. Automations efforts are always a very interesting exercise in prioritization and triage; the things that you can do right now are pretty limited and largely a superset of stuff that was buried in that terrifying Billing settings page, but I doubt that will be the case for long. _In particular_, I think the success of automations will be driven by Stripe’s ability to ingest more and more customer-level usage data and evolve past the fairly crude `metadata` key-value store. (Imagine, for instance, being able to spin up an automation _within the dashboard_ that says “if someone cancelled their subscription, cited pricing as a reason, _and had used the product for at least six months_, offer them a 50% discount but only if they pre-pay for a year.)
- **Organizations**, allowing you to group various accounts together and run aggregated analyses. A very iykyk pain, but one that I am quite excited to have solved for [Third South Capital](https://thirdsouth.capital)-related reasons.
- [Usage-based billing](https://docs.stripe.com/billing/subscriptions/usage-based). Just an absolutely beautiful API; I am the first to whine about how convoluted the core Billing models have become in the efforts to be able to model more and more complex use cases, but this feels elegant and ergonomic.
- [Risk management with Connect](https://docs.stripe.com/connect/risk-management). It is kind of odd to me that this not being branded as “Radar for Connect” [^3], but I’m happy with the end result. Connect _stuff_ is where I feel the most underequipped on a day-to-day basis with Stripe, and this is a strong step in the right direction.
- [Adaptive pricing](https://support.stripe.com/questions/adaptive-pricing#:~:text=What%20is%20Adaptive%20Pricing%3F,latest%20Stripe%2Dprovided%20exchange%20rates.), which is very boring but will instantly wipe out a solid 13% of my inbound billing questions

## Things that weren’t mentioned but still jazz-worthy

Some stuff was posted in the changelog that I think is _quite_ exciting, despite not making the “will the CFO at Mindbody care about this?” cut:

- [Sandboxes](https://insiders.stripe.dev/t/stripe-sandboxes-are-here/84), a spiritual successor to “test mode”. Being able to arbitrarily spin up environments for end-to-end testing or contractors would be _tremendously_ useful.
- [Connect platforms can access support cases for connected accounts](https://docs.stripe.com/connect/dashboard/managing-individual-accounts#view-and-unblock-support-cases), which is _tremendously and immediately useful_. [^1]
- [Entitlements](https://docs.stripe.com/billing/entitlements), which allow you to start pushing a bit more about your billing state machine to Stripe. [^2] I struggle to think of particular use cases _today_ in which I’d want to do this, but can think of many that I’m sure will come, like:
  - Surfacing entitlement information within the Customer Portal
  - A/B testing entitlement splits and seeing impact on upsell within Checkout

## What’s still on my wishlist

- More investment in customer portal.
- More investment in bringing all of the small nice ships (upsells! branding! etc.) to Connect so I can enable them automatically on behalf of my users.
- [Recurring pay-what-you-want prices](https://twitter.com/jmduke/status/1707420897299112375).
- Programmatic access to the `notes` field on customers, invoices, etc.
- A/B testing non-payment-options pieces of Checkout, such as copy or branding.

[^1]: With the caveat that I can’t use this, because it excepts “Connected accounts who are or have been connected to multiple platforms”. This, like many other things, is both incredibly frustrating and incredibly understandable, and I think leads to some pernicious incentives for platforms.
[^2]: Good primer on entitlements here: https://arnon.dk/why-you-should-separate-your-billing-from-entitlement/.
[^3]: I get that it’s more than that, but still!
