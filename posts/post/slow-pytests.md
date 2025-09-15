---
title: "Why our pytest suite is slow"
date: "2025-09-14"
tags: post
---

The speed of Buttondown's pytest suite (which I've written about [here](https://jmduke.com/posts/post/print-test/), [here](https://jmduke.com/posts/post/cursor/), and [here](https://jmduke.com/posts/post/pytest-for-clean-freaks/)) is a bit of a scissor for my friends and colleagues: depending on who you ask, it is (at around three minutes when parallelized on Blacksmith) either _quite fast_ given its robustness or _unfathomably slow_.

We've done all of the obvious and reasonable things to speed it up (which I'm defining as "all the stuff in [Adam Johnson's excellent book on the subject](https://adamchainz.gumroad.com/l/suydt)"): all the Postgres and Django knobs have been turned, all the HTTP requests are mocked, and all the fixtures are colocated. With all of that low-hanging fruit picked, we're left with the problem of finding a very high ladder and then making sure we place it under the right copse of trees.

First off: [shout out to pyinstrument](https://pypi.org/project/pyinstrument/). Almost every Python profiler feels _dated_ in some way: annoying to use, difficult to interpret, or both. Pyinstrument is the exception: it's easy to use, easy to interpret, and it's fast. I can drop the following snippet into my suite:

```python
import pathlib
import pytest
from pyinstrument import Profiler

@pytest.fixture(autouse=True, scope="session")
def auto_profile(request):
    """
    Automatically profile all tests in a module and save HTML reports to .profiles.
    Requires pyinstrument to be installed.
    """
    if Profiler is None:
        yield
        return

    TESTS_ROOT = pathlib.Path(__file__).parent
    PROFILE_ROOT = TESTS_ROOT / ".pytest"
    profiler = Profiler()
    profiler.start()

    yield

    profiler.stop()
    PROFILE_ROOT.mkdir(exist_ok=True)
    results_file = PROFILE_ROOT / "output.html"
    profiler.write_html(str(results_file))
```

And then, when I run `pytest`, I get a lovely little HTML file output. Very ergonomic!

Anyway. The problem goes like this:

1. Buttondown uses [pytest-django](https://pytest-django.readthedocs.io/en/latest/). This library, amongst other things, manages the Django test client, handles migrations, and generally makes it easier to run tests that are "Django-aware".
2. pytest-django is (correctly) opinionated _against_ invoking the database in tests, because hitting the database is slow. It forces you to manually enable database access via a `db` fixture, and what's more you can't do so at any scope other than `function`.
3. As such, all of our database fixtures are scoped to `function`.
4. Buttondown's core object is the `Newsletter`. Many tests require the presence of a `Newsletter` object in the database (for permissions checking, auditing, etc.).
5. The `Newsletter` object is _expensive_ to create: lots of associated objects, lots of lookups. Right now, on my M4, it takes around 100ms to create a `Newsletter` object in a test.
6. Expensive object plus no fixture reuse equals slow tests.

There are "flip a switch" answers and there are "chisel away at granite" answers. I am tempted to just mock out a lot of the newsletter creation process; this feels like it would be a thing I regret doing. The real thing to do is to start blessing a "suite-wide" fixture that's scoped to `session` and can be used for cases where we need a Newsletter object handy but don't actually mutate it, and that's in fact what I've started doing:

```python

@pytest.fixture(autouse=True, scope="session")
def global_fixtures(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        for shard in Newsletter.Shard.values:
            PostmarkServer.objects.get_or_create(
                name=shard,
                postmark_id=f"server_{shard}",
                api_key=f"key_{shard}",
                color=f"color_{shard}",
            )
        user, _ = User.objects.get_or_create(username="test")
        account, _ = Account.objects.get_or_create(username="test", user=user)
        newsletter, _ = Newsletter.objects.get_or_create(
            id=GLOBALLY_AVAILABLE_NEWSLETTER_ID,
            username="test",
            name="Test",
            owning_account=account,
        )
        Permission.objects.get_or_create(newsletter=newsletter, account=account)
```

Which means instead of having to invoke a `newsletter` fixture in every test:

```python
def test_subscriber_email_validation(newsletter):
    response = post(
        payload={
            "email_address": "telemachus@buttondown.email",
            "newsletter_id": newsletter.id,
        },
        client=client,
    )
    assert response.status_code == 200, response.json()
```

I can just do this:

```python
def test_valid_email_with_no_subscriber(client) -> None:
    response = post(
        payload={
            "email_address": "telemachus@buttondown.email",
            "newsletter_id": GLOBALLY_AVAILABLE_NEWSLETTER_ID,
        },
        client=client,
    )
    assert response.status_code == 200, response.json()
```

This is not, to be clear, a brilliant insight. Everyone knows that having a global fixture set is generally a good idea; but, for all of the nice investments in testing that we've made, a _literal_ global fixture set has not been one of them.

---

One may also ask if it's worth optimizing this at all. A single test suite that I applied this approach to dropped from four seconds to a little under two seconds: a dramatic change, but is it worth the labor? I don't think it's a clear-cut answer, but I tend to say yes. Two reasons why:

1. Test suites more than any other part of a codebase tend to accelerate in whatever direction they're headed. Very excellent suites stay very excellent; suites that are a little janky tend to become more janky. (This is particularly true in our LLM world: LLMs are pretty good at writing tests, but they're even better at pattern matching.)
2. Performance in the test suite is a useful proxy for performance in the codebase as a whole. Many of these issues, like the one we're discussing here, are just about `pytest` itself and not Buttondown, but many aren't. And, given that a test suite's value is directly proportional to its resemblance to "the real world", being able to clear out artificial noise from the suite's performance means being able to better-surface actual performance issues.

(BTW: if there's something obvious I'm missing here, please let me know!)
