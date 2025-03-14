---
title: "Smoke test your Django admin site"
date: "2025-03-12"
tags: post
---

<div class="addendum">3/14/2025: Updated the snippet to include imports and remove some unused stuff. Thanks, Andy!</div>

Here is a confession: I am a very strong proponent of a robust test suite being perhaps the single most important asset of a codebase, but when it comes to auxiliary services like admin sites or CLIs when it comes to testing I tend to ask for forgiveness more than I ask for permission. Django's admin site is no different: and, because Django's admin DSL is very _magic-string_-y, there's a lot of stuff that never gets caught by CI or mypy until a lovely CS agent informs me that something is blowing up in their face.

Take this example, which bites me more often than I care to admit:

```python
from django.contrib import admin

from stripe.models import StripeCustomer


class StripeCustomer(models.Model):
    id = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    email_address = models.EmailField()
    creation_date = models.DateTimeField(auto_now=True)



@admin.register(StripeCustomer)
class StripeCustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "creation_date",
    )
    search_fields = (
        "username",
        "email",
    )
```

One thing that has made my life slightly easier in this respect is a parametric test that just makes sure we can render the empty state for every single admin view. Code snippet first, explanation after:

```python
from django.test import Client
from django.urls import get_resolver, reverse
from django.urls.resolvers import URLResolver


def extract_routes(resolver: URLResolver) -> iter[str]:
    keys = [key for key in resolver.reverse_dict.keys() if isinstance(key, str)]
    for key in keys:
        yield key
    for key, (prefix, subresolver) in resolver.namespace_dict.items():
        for route in extract_routes(subresolver):
            yield f"{key}:{route.name}"


def is_django_admin_route(route_name: str):
    # Matches, e.g., `admin:emails_event_changelist`.
    return route_name.split(":").endswith("changelist")

# This should be either your ROOT_URLCONF or whatever urlconf file your admin is set to.
# Hint: it's whatever file pulls in `admin.site.urls`.
ADMIN_URL_ROUTE = "buttondown.urls.admin"

DJANGO_ADMIN_CHANGELIST_ROUTES = [
    route.name for route in extract_routes(get_resolver(ADMIN_URL_ROUTE))
    if is_django_admin_route(route.name)
]

# The fixture is overkill for this example, but I'm copying this from the actual codebase.
@pytest.fixture
def superuser_client(superuser: User, client: Client) -> Client:
    client.force_login(superuser)
    return client


@pytest.mark.parametrize(
    "url",
    DJANGO_ADMIN_CHANGELIST_ROUTES
)
def test_can_render_route(superuser_client: Any, url: str) -> None:
    url = reverse(url, args=[])
    response = superuser_client.get(url)
    assert response.status_code == 200
```

Okay, a bit of a mouthful, but the final test itself is very clean and tidy and catches a lot of stuff. 

- That `extract_routes` implementation looks scary and magical, and it is — I use a [more robust implementation in `django-typescript-routes`](https://github.com/buttondown/django-typescript-routes/blob/main/typescript_routes/lib/logic.py#L35), which itself we gratefully purloined from `django-js-reverse`. Lots of scary indexing, but its held up well for a while.
- The fixture and `parametrize` assumes usage of `pytest` (you should use pytest!) but it's trivially rewritable to use `subTest` instead.
