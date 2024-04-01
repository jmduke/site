---
title: "Tailwind black magic: swallowing all pointer events"
date: "2024-03-31"
tags: microblog
---

I wrote two days ago about [a real and useful application of Tailwind black magic](/tailwind-black-magic-prose-tables/); here's another.

[Buttondown](https://buttondown.email) has a dropzone component lets folks drag-and-drop items or click on it to get a file-picker. It's used for importing images, archives, CSVs, the works: because it's so flexible, we expose a slot so that components can customize the text and copy as they see fit:

```html
<template>
  <button id="dropzone" ref="dropzoneElement" @click="handleUpload">
    <slot />
  </button>
</template>
```

This of course comes with a problem, which is that if you pass in a block element such as a div:

```html
<template>
  <Dropzone>
    <div> Click to upload a CSV. </div>
  </Dropzone>
</template>
```

Users who click the div _won't_ trigger `handleUpload`, as the div intercepts the click event. You can of course fix this by manually catching and ignoring the click event on the div (or setting it to `pointer-events: none`); _or_ you can add a simple rule to the `button` to ignore pointer events on _all of its_ children:

```html
<template>
  <button
    id="dropzone"
    ref="dropzoneElement"
    class="[&>*]:pointer-events-none"
    @click="handleUpload"
  >
    <slot />
  </button>
</template>
```

And voila! Broken down a little:

1. `[&>*]:pointer-events-none` means "set `pointer-events: none` to all elements that satisfy the rule of `[&>*]`;
2. `[&>*]` is Tailwind-ese for "`> *`, relative to the current element`;
3. `> *` is standard CSS for "all direct children".
