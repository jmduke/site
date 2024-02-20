---
title: Migrating someone who's on Stripe Connect Express
date: "2024-01-13"
tags: microblog
---

Most Stripe accounts on Substack are “Standard Connect”, which essentially means that:

1. the author has full agency over their account and is the merchant of record;
2. they can revoke OAuth access from Substack (or whomever) at any time;
3. Substack continues to take that 10% as an application fee, though the author (or another connected account) can remove that fee once the OAuth access is revoked.

A couple edge cases accounts, though, are “Express Connect” (like Talia!) This means that:

1. the author has full agency over their account and is the merchant of record;
2. but they _cannot_ eject their account from Substack — the account is irrevocably tied to being a “subaccount” of Substack.

For such accounts, though, you can still remove yourself and retain subscriber state/information with two steps:

1. **Migrate** customer data from the original account to a new “standard” account using Stripe’s built-in migration tooling;
2. **Export** subscriptions from the original account via CSV, and then recreate those original subscriptions based on the details within the CSV
