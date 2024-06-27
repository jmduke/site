---
title: "Pytest: test for print statements"
date: "2024-06-27"
tags: microblog
---

Inspired by [Adam Johnson's test for pending migrations](https://adamj.eu/tech/2024/06/23/django-test-pending-migrations/), and of course in conversation with my own [love of weird tests](/posts/essays/weird-tests-tacit-knowledge), I offer a similar concept: a test for finding stray `print` statements in your codebase, with a ratchet array for stuff to ignore.

```python
import glob

PATH = "**/*.py"

irrelevant_paths = (
    "/commands/",
    "node_modules",
)

def test_no_print_statements() -> None:
    all_files = glob.glob(PATH, recursive=True)
    relevant_files = [
        filename for filename in all_files
        if not any(
            irrelevant_path in filename
            for irrelevant_path in irrelevant_paths
        )
    ]
    files_with_print = [
        filename for filename in relevant_files
        if "print(" in open(filename).read()
    ]
    assert not files_with_print, f"Print statements found in {files_with_print}"
```

I anticipate a concern being "this is slow! you're opening thousands of files!", to which I reply: this test is faster than any other test you have that touches a database. That being said, I'm sure there are edge cases or ways to improve it, so please let me know!
