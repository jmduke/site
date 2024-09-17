---
title: "Vendor outages"
date: 2024-09-16
---

[Postmark had an eight-hour outage due to an SSL certificate expiry](https://status.postmarkapp.com/notices/5jmmv4cyfqboak2v-service-issue-outbound-smtp-sending-issues).

[Buttondown](http://buttondown.com/) was _not_ affected; we send [a lot of our custom domain traffic through Postmark](https://buttondown.com/stack), but all of it is hitting their API, rather than their SMTP, and their SMTP is what had the SSL issue.

Still, if we _had_ been impacted we would have been fine. A few years ago I [accidentally made a great decision to abstract out our backing ESP](https://weeknotes.buttondown.email/archive/expanding-to-multiple-esps/), which means at any point in time I can run a command like:

```python
Newsletter
  .objects
  .filter(delivery_provider="postmark")
  .update(delivery_provider="sendgrid")
```

Whenever these things happen, consternation always emerges: some about the specific genre of issue (“an SSL cert? really?”) some about time to resolution, some about comms. [^1] Sometimes this discourse is productive; often it is not.

In particular, the _least_ valuable genre of discourse is “well, it’s time to move to $COMPETITOR.” I say that this is not valuable because in general, you should operate under the assumption that _every_ vendor you rely on will have an outage at some point in your time as a customer. (And, indeed, the competitor that I saw most often referenced as a replacement for Postmark has had a noteworthily poor amount of uptime over the past two years.) Your job as a technologist is not to find the one magic vendor that never goes down (it doesn’t exist!) but to build resiliency into your system such that the impact of any downtime can be minimized as much as possible.

This is not to say that you shouldn’t re-evaluate your choice in vendor due to outages — I initially moved _off_ of Mailgun for that exact reason! — but that you don’t solve single point of failure issues by replacing one single point with another. [^2]

Two other notes that this reminded me of:

1. There is no easier way to generate negative karma than to try and use a competitor’s outage to your advantage. ([To wit, I will probably never use Render.](https://x.com/isamlambert/status/1514675406577680391/photo/1))
2. I was talking with a founder friend a few months back about existential risks, and we both landed on the same conclusion: the single biggest vendor-related fear we had was Stripe.

[^1]: Comms, by the way, is where I extend the least possible grace; I have, as of this writing, not yet received an email from Postmark informing me of the incident.
[^2]: This is unrelated, but: this is also why, at a meta-level, running a business where you can essentially be hot-swapped out by changing an endpoint or three is such brutal work. Especially when one of the endpoints that your customer base can switch to is, well, Amazon.
