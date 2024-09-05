---
title: "Improving Django's default pagination performance"
date: "2024-09-05"
tags: microblog
---

Yesterday, I was trying to set a unique constraint for [comments in Buttondown](https://buttondown.com/features/comments/) to prevent accidental double-commenting, and I ran into a problem that I hadn't seen before:

```
index row size 2816 exceeds btree version 4 maximum 2704 for index "emails_comment_email_id_subscriber_id_text_0542cca9_uniq"
DETAIL:  Index row references tuple (165,7) in relation "emails_comment".
HINT:  Values larger than 1/3 of a buffer page cannot be indexed.
Consider a function index of an MD5 hash of the value, or use full text indexing.
```

Simple enough: indexing a very long string is going to be prohibitively bad. It was immediately clear that the right path forward was [to index the MD5 hash of the text](https://stackoverflow.com/questions/41971217/values-larger-than-1-3-of-a-buffer-page-cannot-be-indexed-django-error) rather than the text itself, but the literature on how to do so within the ORM was somewhat lacking:

- A [decades-old tracking ticket had nothing useful](https://code.djangoproject.com/ticket/14904)
- StackOverflow either [recommended dropping down to raw SQL](https://stackoverflow.com/questions/41971217/values-larger-than-1-3-of-a-buffer-page-cannot-be-indexed-django-error) or [didn't think it was possible for uniqueness constraints](https://stackoverflow.com/questions/41955346/python-django-how-to-select-the-index-type/)

However, the solution is actually quite easy! Since [Django 4.0, you can use expression-based uniqueness constraints](https://docs.djangoproject.com/en/dev/releases/4.0/#functional-unique-constraints), and Django even offers a [handy MD5 function](https://docs.djangoproject.com/en/5.1/ref/models/database-functions/#md5) right out of the box. All I had to do was this:

```python
from django.db.models import UniqueConstraint
from django.db.models.functions import MD5

class Comment(models.Model):
    text = models.TextField()
    email = models.EmailField()

    class Meta:
        constraints = [
            models.UniqueConstraint(MD5("text"), "email", name="unique_text_email_idx")
        ]
```

And that's it!
