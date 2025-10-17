---
title: "Someone built it; someone has to build it"
date: 2025-10-16
tags: post
---

This afternoon I stumbled upon [this ticket from Tom Forbes](https://forum.djangoproject.com/t/towards-a-more-efficient-bulk-update-with-values-and-update-from/36496) about a faster bulk update mechanism in Django.

Django's ORM workings can be complex, but the concept behind the ticket is fairly simple. If you were to use `bulk_update`, like so:

```python
subscribers = Subscribers.all()
for s in subscribers:
  s.subscriber_type = random.choice(['good','bad'])

Subscriber.objects.bulk_update(subscribers, ['subscriber_type'])
```

This compiles into a query like this:

```sql
UPDATE emails_subscriber
SET subscriber_type = (
  case when id = 1 then 'a'
  case when id = 2 then 'b'
  case when id = 3 then 'b'
  case when id = 4 then 'a'
)
```

This genre of query, beyond being an eyesore, is obviously "bad" especially if you imagine the common use case for a bulk update (not four rows, but hundreds or thousands.) The more proper way to compile such a query is something like this:

```sql
UPDATE emails_subscriber
SET subscriber_type = v.subscriber_type
FROM (VALUES (1, 'a'), (2, 'b'), (3, 'b'), (4, 'a')) AS v(id, subscriber_type)
WHERE emails_subscriber.id = v.id;
```

I bring this up for three reasons:

1. A reminder to myself that some of our most expensive queries are bulk updates of this genre, and we should probably optimize them;
2. We've known for _seven years_ that a core Django API is sub-optimal, as if we needed more proof that there's tremendous value in investing in optimizing frameworks, even mature ones;
3. It can be tempting to treat framework internals as [haunted forests](https://increment.com/software-architecture/exit-the-haunted-forest/) whose decisions and mechanisms are so abstract as to be unknowable and so obscure as to be untouchable. In reality, they are just like anything else: an accumulation of decisions made by smart people, over time, in a particular context, under particular constraints. Someone built it; it can probably be improved, but someone has to build that too.
