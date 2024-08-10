---
title: "Improving Django's default pagination performance"
date: "2024-08-10"
tags: microblog
---

Buttondown's [API calls](https://docs.buttondown.com/api-introduction) are very fast, and one of the reasons why is that we've removed every single possible database query that we can.

The most recent was what looked like a fairly benign `COUNT(*) query`, coming from the [default Django paginator](https://docs.djangoproject.com/en/5.0/topics/pagination/); if you're gonna paginate things, you need to know how many to paginate, fair enough.

However, it irked me a little bit that we were _always_ doing that `COUNT(*)` query even when we didn't need to: say, if we were returning a list of 14 emails we can put up to 50 emails in a page. Objectively speaking, that `COUNT(*)` query is unnecessary overhead: we know there aren't any more emails than that, since we've serialized a full list that is _less_ than the page size.

I went poking around for solutions to this problem, and came across [a great article from Peter Be](https://www.peterbe.com/plog/how-to-avoid-a-count-query-in-django-if-you-can) that abstractly talks about both the use case that I had in mind _and_ the right solution, which was at a high level: count and serialize the full results list up until the maximum page size, and _then_ make a full count query if you hit the page size.

Peter's snippet is more pseudocode than actual code, and I wanted something that I could actually use as a drop-in replacement to the Django paginator. Here it is, in full!:

```python
from typing import Generic, TypeVar

from django.core.paginator import Page as DjangoPage
from django.core.paginator import PageNotAnInteger
from django.core.paginator import Paginator as DjangoPaginator

class Paginator(DjangoPaginator):
    def validate_number(self, number) -> int:
        try:
            if isinstance(number, float) and not number.is_integer():
                raise ValueError
            number = int(number)
        except (TypeError, ValueError):
            raise PageNotAnInteger("That page number is not an integer")
        return number

    def page(self, number) -> DjangoPage:
        validated_number = self.validate_number(number)
        if validated_number != 1:
            return super().page(number)
        internal_results = []
        for i in self.object_list[: self.per_page]:
            internal_results.append(i)
            if len(internal_results) == self.per_page:
                break
        if len(internal_results) < self.per_page:
            # The below override correctly throws a type error because we are
            # overriding a read-only cached property (ie a method) with a constant.
            # This is the whole point of this subclass, so we ignore the type error.
            self.count = len(internal_results)  # type: ignore
        return DjangoPage(internal_results, validated_number, self)
```

Note that it _is_ important to override `validate_number`, too: that contains a sneaky little check of `.count`, which is a read-only cached property (ie a method) that triggers the `COUNT(*)` query.
