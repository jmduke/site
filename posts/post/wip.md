---
title: ""
tags: post
---

[Paul's excellent review of GPT-5](https://aboard.com/desperately-seeking-software/) has stuck in my head ever since I read it, in particular this passage:

> ChatGPT 5 is an incrementally better, higher-quality experience than its predecessors, and it lets you use an LLM in many different ways. But as a piece of software, it’s absolutely bananas how busted it is—and I think we’ve all gone so far down the rabbit hole that we’re not seeing it. It’s like Windows Vista, or Apple in the era of MacOS 9/Taligent: Huge efforts that ultimately required big reboots (or acquisitions) to move Microsoft and Apple forward.

I find myself returning to this framing device when I use LLM developer tools, and how wild the experience would be in any other context: Claude creating an artifact that immediately crashes; Cursor suggesting an autocompletion that is ten `)` in a row; asking Amp to do something using method Foo instead of method Bar, then asking it to fix the code it broke — at which point it uses method Foo instead. Imagine a non-deterministic Typescript compiler that returns different results depending on the number of other people using it at any given time; imagine a terminal that helpfully tried to hide any folders that it thought you weren't interested in.
