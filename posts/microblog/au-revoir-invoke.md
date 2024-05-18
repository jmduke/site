---
title: "Au revoir, Invoke"
date: "2024-05-18"
tags: microblog
---

It's not quite interesting or noteworthy enough to warrant a full-on essay, but yesterday we unshipped the last remaining [Invoke](https://github.com/pyinvoke/invoke) commands and ported them over to [just](https://just.systems/).

I think Invoke is a good, cool project, and I wish it well. If you're at the precise intersection of "you have shell commands that need to be encapsulated in some source of truth", "those shell commands need imperative logic", and "your application is pure Python", I think it's the right tool for the job — but we were already using `just` for every other part of the monorepo, _and_ some parts of the core Django application, and it felt vestigial to hold onto some `tasks.py` that was out of step with the rest of the commands that you needed to run.

It's also emotionally much _easier_ to decide to stop using a project when the latest commit is from six months ago. This is, of course, a terrible way to judge projects' efficacy — things can and should be finished! — but when I'm on the fence about something like this I tend to go with the approach that clearly has more current emphasis behind it.
