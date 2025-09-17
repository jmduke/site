---
title: "Another reason our pytest suite is slow"
date: "2025-09-16"
tags: post
---

I wrote [two days ago](/posts/post/slow-pytests/) about how our pytest suite was slow, and how we could speed it up by blessing a suite-wide fixture that was scoped to `session`. This was true! But, like a one-year-old with a hammer, I found myself so gratified by the act of swinging that I found myself also trying to pinpoint another performance issue: _why does it take so long to run a single smoke test?_

There are a lot of known problems: for instance, `import stripe` takes _400ms_. But there was an _eight second_ lag between starting `pytest` and the first test running, and I wanted to know why.

All I needed to do was run `pyinstrument -m pytest -k test_smoke` and I got three useful results that I am cataloging in hopes they might find you:

1. `boto3` hits AWS upon client instantiation, and we had a `dependencies` file that imported and created the client. Easy fix: just lazily instantiate it.
2. We were globbing `actions/*.py` to run a test on every single one of our "actions" (see [[Use weird tests to capture tacit knowledge]]). Turns out: this took _2 seconds_. Another fix, though less easy: move the globbing output to an autogen file and read from that instead. (Causes a bit of a Rube Goldberg effect, but it's worth it.)
3. Two more heavy imports (each at 500ms): one for parsing `msg` files, the other for parsing `iCal`. Unlike Stripe, the surface area here is fairly well-contained, so it was easy to move things around to lazily import them.
