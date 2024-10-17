---
title: "Migrating to Django 5"
date: "2024-10-17"
tags: post
description: +143, -150
---

The total LOC delta to migrate Buttondown from Django 4 to Django 5 was +143, -150. (I was incentivized to do so because our search right now is quite slow, and the lowest hanging piece of fruit is to move some of the `tsvector` generation out of band, and I'd rather do that using the fancy new [GeneratedField](https://docs.djangoproject.com/en/5.1/ref/models/fields/) abstraction than rolling the SQL myself.)

The process was so boring as to almost not warrant a blog post:

1. Had to remove our usage of `DEFAULT_FILE_STORAGE` and roll it into the `STORAGES` dict which we were already using;
2. Had to bump up [django-typescript-routes](https://github.com/buttondown/django-typescript-routes) and [django-safedelete](https://django-safedelete.readthedocs.io/) to new minor versions (and for the latter create a new migration);
3. Had to trivially rewrite a few tests that were failing because we were incorrectly passing in some non-existent keyword arguments.

The one wrinkle was some still-unattributable change in [Whitenoise / Django](https://whitenoise.readthedocs.io/en/stable/django.html) behavior; we were using `CompressedManifestStaticFilesStorage` and some of our vended CSS had, I guess, [incorrect manifests](https://whitenoise.readthedocs.io/en/stable/django.html#storage-troubleshoot)? It's still not immediately obvious to me what the root cause was, but it was an easy enough fix.

---

Django 5's been in production for us for three days. A grand total of zero post-deploy bugs have surfaced.
