---
title: "Capture tacit knowledge in tests"
date: "2024-03-04"
tags: microblog
---

Working on Buttondown — or any mature, complex codebase — effectively and quickly requires a lot of tacit knowledge
that I've done a hitherto-poor job of documenting, a fact I am learning more and more quickly as I start to scale up
the number of folks working on the codebase.

_Documentation_ in the literal sense is a good first step and final step, of course, but when a codebase is in the "process" of being documented writing down "this is how you do X" does often not actually _solve_ the problem of making sure everyone can do X safely and quickly.

One thing that I've found useful, in the spirit of shifting process to the left, is capturing steps in tests. Here's a simple (but real!) example: adding new Django modules to the codebase. Whenever you run `python manage.py startapp`, you _also_ need to add the new app to a bunch of different places:

- `pytest.ini`, so tests are run;
- `pyproject.toml`, so files are linted;
- `modules.txt`, so metrics are exported.

The _perfect_ solution to this problem is creating a script that automatically adds a new app to all the relevant places and stuffing it into a Justfile, but that's a pretty big piece of work that requires thought and error handling and a whole slew of other stuff. Instead, it's comparatively easy to just capture these constraints in a test:

```python
# This test suite ensures that, when we create or rename a module,
# we update all the relevant configurations so that we lint/test/etc. that module.
from django.conf import settings

RELEVANT_FILES = ["./pyproject.toml", "./pytest.ini", "./modules.txt"]


def pytest_generate_tests(metafunc):
    parameters = []
    for filename in RELEVANT_FILES:
        for module in settings.BUTTONDOWN_APPS:
            parameters.append((module, filename))
    metafunc.parametrize("module,filename", parameters)


def test_module_is_present_in_pytest(module: str, filename: str) -> None:
    assert module in open(filename).read()
```
