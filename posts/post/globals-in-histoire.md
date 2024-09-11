---
date: 2024-03-17
title: "Globals in Histoire"
tags: post
---

[Histoire](https://github.com/histoire-dev/histoire), like so many other tools in the Vue ecosystem, is a bit of a neglected younger sibling to [Storybook](https://storybook.js.org/) — a little bit uglier, with worse documentation and a couple rough edges, but much more tightly integrated with Vue and Vite. [^1]

One thing that was not particularly obvious with using Histoire was how to declare a global variable. (There are a number of global variables Buttondown uses, but here's a common example: we drop Stripe's public client ID in to the Vue app by vending it in the request.)

Histoire doesn't document this, but the solution is pretty easy:

1. Vite lets you declare globals via the `define` namespace within `vite.config.js`.
2. Histoire lets you add vite overrides specific for histoire within the `histoire.vite` namespace.

Combine these and you get the answer:

```js
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

export default defineConfig({
  histoire: {
    vite: {
      define: {
        STRIPE_CLIENT_ID: 123,
      },
    },
  },

  // The rest of your vite config.
});
```

Hope this saves you ten minutes of Googling!

[^1]: I know Storybook 8 — released only a few days ago — purports to be better out of the box here, but in my brief time investigating this is not the case. Pulling in React and an entire slew of tools _just_ for snapshotting was a bridge too far for me.
