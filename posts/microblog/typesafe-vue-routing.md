---
title: "Typesafe routes in Vue"
date: "2024-06-19"
tags: microblog
---

I watched [Gary Bernhardt's talk on static routing](https://www.youtube.com/watch?v=KRMJIiGE0ds) back a few years ago and — I'm not sure if I would call it _formative_, but it stuck in my craw as a platonic ideal of sorts, as something I couldn't really justify adopting within Buttondown but really _wanted_.

I built out and open-sourced some feints in this direction — see [django-typescript-routes](https://github.com/buttondown/django-typescript-routes), which provides a TS router generated from a Django backend — but that's not quite the same thing, and time and time again I found myself in the position of pushing bugs that would have been caught if I had a typesafe router in Vue.

Tanner Linsley makes [the pithiest possible case](https://x.com/tannerlinsley/status/1787979801711759688) for such an abstraction:

> Too many people don't realize they're managing _the_ most critical state of their application in a `/string?Record<string, string># string` type. 🤦‍♂️

I was _thrilled_ to stumble upon the very poorly named [unplugin-vue-router](https://uvr.esm.is/) earlier this year and resolved to spend some time hacking with it to see if it was worth the cost. It was, and I'm glad I did it.

## How it works

Vue Router is a very simple abstraction: you define a list of routes (where a route is a component and a matching path and some metadata), and Router routes for you. Something like this:

```javascript
import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./HomeView.vue";
import UserListView from "./UserListView.vue";
import UserDetailView from "./UserDetailView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/users", component: UserListView },
  { path: "/users/:id", component: UserDetailView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
```

Nothing particularly magical or fancy. The Faustian bargain you sign with UVR, though, is that in order to get typesafe routing you must _also_ adopt file-based routing:

- `./HomeView.vue` becomes `./index.vue`;
- `./UserListView.vue` becomes `./users.vue`;
- `./UserDetailView.vue` becomes `./users.[id].vue`.

And then the above mapping file gets magicked away:

```javascript
import { createMemoryHistory, createRouter } from "vue-router/auto";

const router = createRouter({
  history: createMemoryHistory(),
});
```

I actually don't _mind_ the file-based routing, but it made adoption much more painful — it was very difficult to do a piecemeal migration, and it basically ended up as an omnibus PR touching every single view in the application. (Though that PR was made much safer by the fact that now all the routes had type information!)

You might also notice that the third file was not `/users/[id].vue`, but `/[users].[id].vue`. UVR handles nested routing for things like modals differently than I was used to in Next; you nest modals by plopping them in directories in a way that is logically coherent but still takes a bit of getting used to.

### Three months later

By the time I was truly waist-deep in the UVR migration, it felt like it was:

1. Too late to turn back;
2. Perhaps not worth all the effort just for some type safety.

Three months later, though, I am quite glad I did it. It was a pretty big up-front cost, but has saved me _many_ times over from pushing bad code, and the doubts I had about the approach being 'janky' and messing with VSCode have not borne out.

If you're using Vue, highly recommend. (Now all I need to do is get a similar abstraction for query parameters!)
