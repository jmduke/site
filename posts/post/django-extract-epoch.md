---
title: "Truncating timedeltas in Django"
date: "2025-01-13"
tags: post
---

Consider a fan-out-ish model that you want to aggregate a bunch of: likes on a post, for instance.

```python
class Post(models.Model):
    created_at = models.DateTimeField()

class Event(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
```

Let's say we want to aggregate the number of likes on a post _relative to the post's creation time_ (for instance, to visualize the growth of a post's popularity over time), yielding a list of tuples of the form `[(minutes_since_post_creation, number_of_likes)]`.

```python
def test_calculate_popularity_over_time(self):
    post = Post.objects.create(created_at=datetime.datetime(2020, 1, 1))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 1, 0))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 1, 0))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 1, 0))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 2, 0))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 3, 0))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 5, 0))
    results = calculate_popularity_over_time(post)
    assert results == [
        [1, 3],
        [2, 1],
        [3, 1],
        [4, 0],
        [5, 0],
    ]
```

We might naively try to do this in-memory, by pulling everything out of the database and doing the math in Python, but that's going to be slow:

```python
import defaultdict

def calculate_popularity_over_time(post):
    events = Event.objects.filter(post=post)
    minute_to_count = defaultdict(int)

    for event in events:
        minute_to_count[event.created_at.minute] += 1
    return minute_to_count.items()
```

This is an aggregation: databases are good at aggregations!

Your first instinct might be to try to do this using `ExtractMinute`:

```python
from django.db.models.functions import ExtractMinute
from django.db.models import F

def calculate_popularity_over_time(post):
    events = Event.objects.filter(post=post).annotate(
        delta=F("created_at") - F("post__created_at")
        delta_in_minutes=ExtractMinute("delta")
    )
    .order_by("delta_in_minutes")
    .values_list("delta_in_minutes")
    .annotate(count=Count("id"))
```

But this has a bug. Can you spot it? Here's a hint:

```python
def test_calculate_popularity_over_time_different_hours(self):
    post = Post.objects.create(created_at=datetime.datetime(2020, 1, 1))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 0, 1, 0))
    Event.objects.create(post=post, created_at=datetime.datetime(2020, 1, 1, 1, 1, 0))
    results = calculate_popularity_over_time(post)
    assert results == [
        [1, 1],
        [61, 1],
    ]
```

The problem is that `ExtractMinute`, well, _extracts_ the minute, rather than _truncates_ it. Extracting the minute from a `duration` of 1 hour, 30 minutes, and 5 seconds yields `30`, not `90`.

Whatever are we to do? Well, we can take advantage of `EPOCH` to truncate the duration of a duration to its number of seconds, and then convert _that_ to minutes:

```python
from django.db.models.functions import Extract
from django.db.models import ExpressionWrapper, F

class ExtractEpoch(Extract):
    lookup_name = "epoch"


def calculate_popularity_over_time(post):
    events = Event.objects.filter(post=post).annotate(
        delta=F("created_at") - F("post__created_at")
        delta_in_minutes=ExpressionWrapper(
            ExtractEpoch(F("delta")) / 60, output_field=models.IntegerField()
        ),
    )
    .order_by("delta_in_minutes")
    .values_list("delta_in_minutes")
    .annotate(count=Count("id"))
```

I suspect there may be even _more_ elegant and efficient ways to do this, but this satisfies a couple constraints:

- It delegates the heavy lifting to the database
- It doesn't require dropping down to raw SQL or registering intermediate tables
- It's fairly reusable and "Django-ish"
