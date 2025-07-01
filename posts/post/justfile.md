---
title: "Justfiles are great"
date: "2025-07-01"
tags: post
---

One of the first things I did when setting up [[Whisperglass]] was to create a `justfile`.

I have grown older. I've either gotten worse at context switching or better at gauging my ability to context switch, and I have become a little bit obsessed with minimizing friction between jumping from project to project or repository to repository wherever possible. One of the really easy ways to do this that requires almost zero setup cost is by making sure every single project I interact with has a `just` file with a standard set of commands. These commands are install, bootstrap, dev, build, test, and lint. A `just` file can, of course, have more commands than this and can be fractal, but those are the core six that every project must have. 

And as a result, it's really easy for me to hop from one repository to the next without having to get briefly stunned in my tracks trying to remember how to just spin up an Eleventy server or whatever. `just` files feel a little bit like Go format to me. And as a result, it's really easy for me, one repository to the next, without having to briefly stunned in my tracks. So I'm trying to remember how to get up an Eleventy server or whatever.

Here’s a sample Justfile for a Django repository:

```just
# Install dependencies
install:
    uv sync

# Run migrations and collect static files
bootstrap:
    uv run python manage.py migrate
    uv run python manage.py collectstatic

# Run the development server
dev:
    uv run python manage.py runserver

# Build the production static files
build:
    uv run python manage.py collectstatic

# Run tests
test:
    uv run pytest

# Run linting
lint:
    uv run ruff check .
    uv run ruff format .
```

Standardizing on `just` has a number of other ancillary benefits:

## Nested justfiles

If you're in a monorepo, you can have a `justfile` in a subrepo and invoke it very elegantly like this:

```zsh
just backend/test
```

It also makes composition into top-level commands very easy. For instance, take this snippet from Buttondown's `justfile`:

```just
install:
    ./scripts/install-brewfile.sh
    pre-commit install
    just check-docker
    just sniper-link/install
    just image-generator/install
    just latex-renderer/install
    just docs/install
    just marketing/install
    just analytics/install
    just app/install
    just internal-docs/install
```

## CI

Making the justfile a source of truth makes it a lot easier to run CI on it. Instead of having another invocation of your test runner in CI that you always forget to update, you can just push the logic into the justfile as a single source of truth.

## Documentation

Justfiles are self-documenting in a way that very few other scripts are. (I wish it was _literally_ more self-documenting: I'd love a HTML-based output of the justfile that was just a bunch of markdown files that I could just open in my browser, but `just --list` is a good start.)

## You get the point

Even if none of these things are world-shattering, they come at zero cost, or at least what rounds down to zero. (I am hospitable to Convinced this is essentially the same thing as `make` or as having a `bin` directory. But at least for me, both of those approaches carry a bit more implicit baggage because you have to spend some time evaluating: is this a real `Makefile` or is this just a task runner? A `just` file is very explicit—you know exactly what it is and what it is used for.)