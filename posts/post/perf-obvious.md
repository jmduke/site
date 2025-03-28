---
title: "Performance improvements can be obvious and silly in retrospect"
date: "2025-03-27"
tags: post
---

One of the most useful and janky internal tools [we have in Buttondown’s codebase](https://buttondown.com)  is a codegen pipeline called “autogen”. There is nothing “auto” about autogen: it is a series of scripts that munges a bunch of data into a bunch of different formats, to generate things like our API clients and code snippets and storybooks. Some of this data is stateful, and therefore requires a database, and therefore requires migrations — you see how this kind of thing can grow somewhat labrynthine.

Each individual script is pretty simple, but as we’ve found more and more things to glom onto autogen. This, to be clear, is a _good_ thing. It’s really nice to have automatic, consistent data and types everywhere, so that we *literally cannot change the API without also pushing a concomitant change to the API docs*. With each glom, though, the wall-clock time of running autogen increases — and so I found myself staring down the barrel at a 50second script running whenever we wanted to make any sort of non-trivial change to our schema.

Fifty seconds was too many seconds. I set a budget of ten seconds — still a long time, but significantly less onerous — and began digging in at low-hanging fruit. There was a lot. A few that come to mind: 

1. We split up our `vite` config so we could only run the portion that we needed (cross-piling and minifying our CSS bundles;
2. We disabled all Sentry and perf-tracing stuff that was getting enabled as part of the standard build;
3. We no-oped all of the Python-land data generation if it was already there, since that stateful data didn’t change very often.

This was all great, but we were still left with 15 seconds of wall clock time. Profiling each individual cog in the script revealed that the problem was essentially “it’s Python”: four items in the script ran Django commands, and just spinning up the Django process and running autodiscovery took around two seconds. Ouch!

The impulse was to cut down that runtime. A [great post by Adam](https://adamj.eu/tech/2023/03/02/django-profile-and-improve-import-time/) led us to discover the biggest culprit was our [Stripe imports](https://github.com/stripe/stripe-python/issues/1427), and we timeboxed a bit of time to try and get rid of them, either by deferring the imports or excising the library; neither seemed particularly feasible. 

Then, suddenly, the answer seemed obvious. If we have four scripts where the fixed cost of invoking Django is the long pole, why not simply combine the scripts?

And that’s exactly what we did:

```python
    if len(sys.argv) > 1 and "," in sys.argv[1]:
        commands = sys.argv[1].split(",")
        original_argv = sys.argv.copy()

        for command in commands:
            sys.argv[1] = command
            execute_from_command_line(sys.argv)

        sys.argv = original_argv
    else:
        execute_from_command_line(sys.argv)
```