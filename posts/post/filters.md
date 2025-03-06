---
title: "Recursive filter schema"
date: 2025-03-06
tags: post
---


When we added support for [complex filtering in Buttondown](), I spent a long time trying to come up with a schema for filters that felt sufficiently ergonomic and future-proof. I had a few constraints, all of which were reasonable:

1. It needed to be JSON-serializable, and trivially parsable by both the front-end and back-end.
2. It needed to be arbitrarily extendible across a number of domains (you could filter subscribers, but also you might want to filter emails or other models.)
3. It needed to be able to handle both _and_ and _or_ logic (folks tagged foo _and_ bar as well as folded tagged foo _or_ bar).
4. It needed to handle nested logic (folks tagged foo _and_ folks tagged _bar_ or _baz_.)

The solution I landed upon is not, I’m sure, a novel one, but googling “recursive filter schema” was unsuccessful and I am really happy with the result so here it is in case you need something like this:

```
@dataclass
class FilterGroup:
  filters: list[Filter]
  groups: list[FilterGroup]
  predicate: "and" | "or"
  

@dataclass
class Filter:
  field: str
  operator: "less_than" | "greater_than" | "equals" | "not_equals" | "contains" | "not_contains"
  value: str
```

And there you have it. Simple, easily serializable/type-safe, can handle everything you throw at it.

For example, a filter for all folks _younger than 18_ or _older than 60 and retired_:

```
FilterGroup(
  predicate="or",
  filters=[
    Field(
      field="age",
      operator="less_than",
      value="18"
    )
  ],
  groups=[
	  FilterGroup(
	    predicate="and",
	    filters=[
		    Field(
			    field="age",
			    operator="greater_than",
			    value="60"
		    ),
		    Field(
			    field="status",
			    operator="equals",
			    value="retired"
		    )
	    ]
	    groups=[],
	  )
  ]
)