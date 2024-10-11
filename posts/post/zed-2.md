---
title: "Notes on Zed, revisited"
date: "2024-10-11"
tags: post
---

A little over six months ago, I wrote [[Notes on Zed]]. My conclusion at that time was that Zed made a lot of great choices and felt really good to use, but lacked parity with VS Code's feature/ecosystem to its detriment.

Six months later, I spent a few days using it as my daily driver to see what had changed:

- It's still really, really fast — and in fact, the _delta_ between VS Code and Zed has grown even larger (either objectively or subjectively) since I last used it.
- They've made a good amount of progress on Python support, but it's still not great:
  - [Pyright is so bad as to almost entirely disqualify it from being a Python editor](https://github.com/zed-industries/zed/issues/7296), and extensions are still so nascent so as to be an exercise in Linux-esque experimentation rather than outright pragmatism.
  - Similarly, [the LSP architecture makes it difficult to employ both Ruff and Pyright](https://github.com/zed-industries/zed/issues/15691).
  - I timeboxed an hour to figure out how to get Zed's task runner to recognize my `pytest` suite; I was unable to do so.
- Multi-buffer editing is great though it breaks my brain a little. It seems obviously like the _correct_ interface change, not unlike so many other little lovely decisions Zed has made.
- There are [a myriad of memory leaks](https://github.com/zed-industries/zed/issues/17937). I diagnosed two during my time with Zed: one, due to it trying to index a SQLite database within the repository; another, due to [inline assistance](https://github.com/zed-industries/zed/issues/18062).
- I miss GitLens and ErrorLens much more than I would have expected.

This list probably sounds more negative than my experience warrants. Zed's core value proposition — performance and productivity — is still enticing and tangible, despite some of my fears about them pivoting towards AI and collaboration tools. The team is iterating quickly: I'm excited both to try Zed again in a few months.

What surprised me the _most_ about this time was how much I missed Cursor, which I've been using ever since [[Using Cursor to port Django tests to pytest]]. Common wisdom is that the AI layer for all of these tools is essentially a commodity without much differentiation, but I found myself missing the aggressive autocomplete and file-level refactoring that Cursor is (in)famous for.

So: at least for Buttondown, back to Cursor. But the Zed team is doing really good work, and the things that they're investing in feel much more durable than the things their competitors are investing in. If I were to bet, this time next year Zed will be my full-time editor of choice.
