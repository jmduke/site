---
title: "Git one-liner: get the earliest commit from X hours ago"
date: "2024-05-23"
tags: microblog
---

I wanted to get a commit that was _temporally_ some distance back as part of my experimentation with [git cliff](https://github.com/orhun/git-cliff). This took some time to do, but here's what I ended up with:

```bash
git log  --since="72 hours ago" --until="now" --reverse --pretty=format:"%h" | head -1
```

Nothing particularly fancy, but I hope it's useful!
