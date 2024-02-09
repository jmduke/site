---
layout: post.njk
title: Mass renaming files in fish on macOS
date: "2023-12-17"
tags: microblog
---

One of many two-liners to come as I migrate things from the old site onto Obsidian:

```
brew install rename
rename "s/.mdx/.md/" **.md
```
