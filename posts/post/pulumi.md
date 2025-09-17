---
title: "Pulumi"
date: 2025-09-17
tags: post
---

I'm spending a lot more time lately using Pulumi. This is for a handful of reasons. The two biggest ones are as follows. 

1. First, we're ramping up our investment in quote-unquote infrastructure. We're sending a lot from our own machines and want to be able to scale that up in a way that is more observable, predictable, and legible. 

2. Second, external infrastructure is often a dark forest. It's very, very easy to change state, i.e., swap over a dyno in Heroku or futz with some settings in S3 and never propagate those Changes back to internal docs. This creates a vicious cycle in which someone looks at the docs, notices a difference between the docs and reality, and then decides that the docs aren't worth the time to read, let alone to write.

I approach tools like Pulumi as a bit of an outsider. I’ve never really had to deal with this class of DevOps tooling before—either I was at a small company where orchestration wasn’t worth the trouble, or at a big company where the whole problem was abstracted away. So, if you’re reading this with more experience, you might see some of what follows as naive, or even a little clueless. (Tell me what I'm missing!)

That said: Pulumi is genuinely cool, but I still find myself baffled every time I use it. I get the high-level idea: you declare your infrastructure as code, store the state somewhere, diff the code and the state (and the state and reality), and then apply changes. But the process just feels unnecessarily painful, which makes me wonder if I’m missing something obvious.

Why isn’t there a one-click way to declare all my state in Cloudflare? Why do I have to write a bunch of ad hoc scripts just to slurp up zone records? Why does every provider have its own slightly weird authentication scheme? There are a lot of stubbed toes along the way.

And yet, once you get past all that, it’s still extremely cool. I love being able to write five lines of Python and add MX records to 20 servers at once. I love that those same lines of Python can double as living documentation. Pulumi is a genuinely useful abstraction—one that sometimes feels like it’s succeeding in spite of itself.

A lot of the best advances in developer tooling over the last decade have been about taking practices that were once exclusive to resource-rich, cutting-edge companies and making them accessible to everyone else. There’s a similar opportunity here, especially now that LLMs make it so much easier to reason about your system architecture when it’s all laid out in a tidy YAML file.

Honestly, I think a hyper-opinionated, polished successor to Pulumi—one that nails the first-run experience—would absolutely crush. And if you know of something like that already, please let me know.