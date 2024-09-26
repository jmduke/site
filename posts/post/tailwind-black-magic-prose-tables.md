---
title: "Tailwind black magic: styling paragraphs within tables"
date: "2024-03-29"
tags: post
---

The new version of the [Buttondown docs site](https://docs.buttondown.com/) is all in on [Keystatic](https://keystatic.com/), [Markdoc](https://markdoc.dev/), and [Tailwind's typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) — which makes it _really easy_ to author beautiful docs in plaintext.

We ran into one small issue, which is that the Markdoc renderer likes to place paragraph tags in table cells, such that:

```
| Column                | Description                          |
|-----------------------|--------------------------------------|
| Subject               | The subject line of the email        |
| Audience              | The audience the email was sent to   |
```

Becomes:

```
<table
  ><thead
    ><tr
      ><th><p>Column</p></th
      ><th><p>Description</p></th></tr
    ></thead
  ><tbody
    ><tr
      ><td><p>Subject</p></td
      ><td><p>The subject line of the email</p></td></tr
    ><tr
      ><td><p>Audience</p></td
      ><td><p>The audience the email was sent to</p></td></tr
    ></tbody
  ></table
>
```

This is problematic as Tailwind's `prose` selector will automatically add a very healthy vertical margin to those paragraphs, spacing out the table!

Rather than drop down to 'raw' CSS, we can apply a gross-but-effective selector to override this:

```
[&_td>p]:!my-0 [&_th>p]:!my-0
```

This translates to:

> For every `p` that is a direct descendant of a `td` or a `th`, set the vertical margin to `0 !important`.

It always takes me ten minutes to re-stumble upon the syntax for `[&_whatever]`, so I'm blogging it as a way of committing it to memory.

(A lot of people will passionately and reasonably argue that such selectors are a code-smell, and I get it, but also — being able to just add those two lines and cargo-cult them around the codebase a bit is actually way easier and way lower in terms of TCO than suddenly having to mentally reconcile two different styling methods. Still, use at your own risk — there's a reason I preface this "tailwind black magic.")
