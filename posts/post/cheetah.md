---
title: "Cheetah"
date: 2025-10-13
tags: post
---

My usage of LLM tooling has plateaued — a word I use deliberately. 

I feel like I've developed a pretty solid sense over the past three months of what these models can do and are good for and, inversely, what they can't, and I've largely curtailed my usage of them accordingly:

1. ["codemod"-shaped work](/posts/post/cursor/);
2. MVPs that can afford to be poorly written;
3. First cuts that I know I'm going to go back and refactor heavily.

I'm not trying to undersell the value here: if LLM progress halted tomorrow, I'd still consider the technology invaluable and a significant driver of my incremental productivity.

Being an LLM centrist is boring, I know. But I think both sides of the quality debate around LLM tooling is largely overstating the case. The code is not garbage, nor is it perfect. It is generally around average, and there are many applications in which average is a perfectly fine benchmark. (Buttondown is not one of those, and I say that out of realism rather than pride: we are resource-constrained and therefore need to draw a lot of leverage from the strength of our code base.)

---

A new tool has entered the chat, though, which is Cheetah. Cheetah is a stealth model, a concept I frankly hate. Theories of who "owns" Cheetah range from the obvious subjects to the more arcane ones, and feel immaterial relative to the question of "is the model's quality durable enough to withstand general availability?" 

My experience of using Cheetah is that it is more or less at par with the code quality of its contemporaries: like GPT-5 and Sonnet 4.5, it is a machine for generating average quality code.

Where Cheetah wins, though, is speed. Cheetah is an order of magnitude faster than those aforementioned peers: small tasks that would take Sonnet three minutes take Cheetah five seconds. This matters a lot! My frustration with LLM-based tooling draws in no small part from the slowness of the REPL and the pain of context switching back into whatever I asked a model to do; with Cheetah, you are never switching context because it is fast enough (not unline the inline-editing or autocompletion affordances popularized by Copilot) to keep you in flow.

The net result of this is that I'm asking Cheetah to do much more than I have asked other models to do, in a way that feels pragmatic rather than aspirational.