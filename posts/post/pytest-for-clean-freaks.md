---
title: "Colocating your pytest fixtures"
date: "2025-06-26"
tags: post
---


pytest is, in many ways, the `Age of Adz` of the broader Python ecosystem: a rewarding idiosyncratic departure from convention whose quirks and foibles are quickly and easily outweighed by the fact that it’s just really, really good.

Magic name-based dependency injection? Totally new scoping paradigm? Autodiscovery? Sure. All of that is forgivable because the tests themselves become so pleasant to read and write.

And/but/nevertheless, much like `Age of Adz`’ impenetrability being in no small part due to track length (Impossible Soul, the closing track, sums to twenty five minutes across five parts; the title track alone is eight minutes) — `conftest.py`, the vaguely bizarre ur-file which contains all of your fixtures and other various pytest goodies, can quickly get bloated and confusing. [^1]

What I wanted was the same thing I had for tests — *colocation*. If I had, say, a survey model, I wanted to be able to define the fixtures for that model *next* to the model itself but still have it be globally available. Same thing with external services: if I’m mocking out my calls to Stripe, it just makes more sense to organize those mocks closer to the actual implementation code.

I struggled to figure out a way to do this until poking around the docs and realizing that “plugins” are [more of a duck type than an actual _thing_](https://docs.pytest.org/en/stable/how-to/writing_plugins.html#writing-your-own-plugin) — from pytest’s perspective, a plugin is just a module filled with stuff, and therefore I could technically treat a file filled purely with fixtures as a “plugin” imported by my root `conftest.py`.

This means I can do something like this:

```python
# /emails/models/survey/model.py
class Survey(BaseModel):
    identifier = models.CharField(max_length=100)
    question = models.CharField(max_length=500)
    answers = ArrayField(base_field=models.CharField(max_length=500))
    newsletter = models.ForeignKey(
        Newsletter, on_delete=models.CASCADE, related_name="surveys"
    )
    
# /emails/models/survey/model--mock.py
@pytest.fixture
def survey(newsletter: Newsletter) -> Survey:
    return Survey.objects.create(
        newsletter=newsletter,
        identifier="pokemon",
        question="What's your favorite starter?",
        answers=["Bulbasaur", "Charmander", "Squirtle"],
        notes="",
    )

# /conftest.py
pytest_plugins = [
    "emails.models.newsletter.model--mock",
    "emails.models.survey.model--mock",
]
```

There’s no real magic here — well, besides all the magic employed by `pytest`. But it’s a nice tactic that cut our root conftest from ~2KLOC down to a very manageable 200, and made fixtures _much_ more discoverable in the process.

[^1]: Maybe this is not true for all codebases, but for Buttondown there’s a huge swath of objects and services (anything to do with rendering or auth) that can’t really be nested into a specific folder and _must_ be present at root to be globally accessible.