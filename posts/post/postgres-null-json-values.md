---
title: Finding null JSON values in Postgres
date: "2024-04-30"
tags: post
---

Postgres' JSONB functionality is _fast_ and _useful_ but when I find myself dropping down from the Django ORM into
SQL to do weird things, the syntax strikes me as confusing and arcane. As such, when I need to do esoteric things it
takes me longer time than I'd like, and in hopes that this saves you ten minutes of Stack Overflow trawling:

```sql
SELECT id, metadata FROM emails_subscriber
WHERE jsonb_typeof(metadata) != 'object'
OR jsonb_path_exists(metadata, '$.keyvalue() ? (@.value == null)')
```

Given a table `emails_subscriber` that has a JSONB column `metadata`, this returns all rows in the table where `metadata` itself is not null but some value _within_ `metadata` is null (e.g. `{"foo": 3, "bar": null}`).
