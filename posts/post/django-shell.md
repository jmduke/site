---
title: "Adding imports to the Django shell"
date: 2025-10-10
tags: post
---

I was excited to finally remove `django-extensions` from my `pyproject.toml` file when 5.2 dropped because they added support for automatic model import. However, I found myself missing one other little escape hatch that `django-extensions` exposed, which was the ability to import other arbitrary modules into the namespace. [Django explains how to do bring in modules without a namespace](https://docs.djangoproject.com/en/5.2/howto/custom-shell/), but I wanted to be able to inoculate my shell, since most of my modules follow a similar structure (exposing a single `call` function).

It took the bare minimum of sleuthing to figure out how to hack this in for myself, and now here I am to share that sleuthing with you. Behold, a code snippet that is hopefully self-explanatory:

```python
from django.core.management.commands import shell


class Command(shell.Command):
    def get_namespace(self, **options):
        from emails.models.newsletter import actions as newsletter_actions
        from emails.models.subscriber_import import actions as subscriber_import_actions

        namespace = super().get_namespace(**options)
        namespace["newsletter_actions"] = newsletter_actions
        namespace["subscriber_import_actions"] = subscriber_import_actions

        return namespace
```
