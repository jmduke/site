---
title: Postgres batch enqueuing in ten lines of Django
date: "2023-12-15"
tags: microblog
---

It hasn't failed me yet:

```python
BATCH_SIZE = 100

def batch_proess(queryset) -> None:
    count = queryset.count()
    if count == 0:
        time.sleep(10)
        return
    with transaction.atomic():
        batch = list(
            queryset.select_for_update(of=("self",), skip_locked=True).values_list(
                "id", flat=True
            )[:BATCH_SIZE]
        )
        # Do whatever you need to do with the batch here.
    return
```
