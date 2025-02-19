---
title: "YOLO-squashing our Django repository"
date: 2025-02-19
tags: post
---

[Buttondown's](https://buttondown.com) core application is a Django app, and a fairly long-lived one at that — it was, until recently, sporting around seven hundred migration files (five hundred of which were in `emails`, the "main" module of the app). An engineer pointed out that the _majority_ of our five minute backend test suite was spent not even running the tests but just setting up the database and running all of these migrations in parallel.

I had been procrastinating squashing migrations for a while; the last time I did so was around two years ago, when I was being careful to the point of agony by using the official [squash tooling](https://docs.djangoproject.com/en/5.1/topics/migrations/#migration-squashing) offered by Django. Django's official squashing mechanism is clever, but tends to fall down when you have cross-module dependencies, and I lost an entire afternoon to trying to massage things into a workable state.

This time, I went with a different tactic: just delete the damn things and start over. (This is something that is inconsiderate if you have lots of folks working on the codebase or you're letting folks self-host the codebase; neither of these apply to us.)

`rm rf **/migrations/*` worked well for speeding up the test suite, but it was insufficient for actually handling things in production. For this, I borrowed a snippet from [django-zero-migrations](https://github.com/ambient-innovation/django-migration-zero/blob/master/django_migration_zero/services/deployment.py#L12) (a library around essentially the same concept):

```python
from django.core.management import call_command
from django.db.migrations.recorder import MigrationRecorder

MigrationRecorder.Migration.objects.all().delete()
call_command("migrate", fake=True)
```

And voila. No fuss, no downtime. Deployments are faster; CI is _much_ faster; the codebase is 24K lines lighter. There was no second shoe.

If you were like me 24 hours ago, trying to find some vague permission from a stranger to do this the janky way: consider the permission granted. Just take a snapshot of your database beforehand just in case, and rimraf away.
