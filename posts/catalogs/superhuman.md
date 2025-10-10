---
title: "Fixing CSS variables in Superhuman"
date: 2025-10-09
tags: post
---

Part of running a business like [Buttondown](https://buttondown.com) is spending more time than you'd like installing esoteric email clients and trying to debug odd rendering behavior. [Superhuman](https://superhuman.com) is one such client, but they do us the favor of being an Electron app with a concomitant Chrome extension. So rather than having to guess at what the black box is telling you, you can just pop open Chrome Inspector and see exactly what's happening in the DOM.

Specifically, we had someone write in and say that their spacing on their emails was a little wonky for reasons passing understanding. I installed and poked around Superhuman and discovered the root cause, which is that Superhuman wraps the emails that they're rendering in a shadow DOM node, a perfectly reasonable thing to do. However, we declare some CSS variables in our emails. And in fact, that CSS variable is what was getting stripped out.

Take the following example:

```css
:root {
  --my-color: red;
}

p {
  color: var(--my-color);
}
```

Simple enough, right? Now imagine that embedded in a page with a shadow DOM:

```html
<template>
  <style>
    :root {
      --my-color: red;
    }
  </style>
  <p>This text should be red.</p>
</template>
```

And yet:

<iframe
  id="css-var-shadow"
  style="width:400px; height:130px; border:1px solid #ccc;"
></iframe>
<script>
  const iframe = document.getElementById("css-var-shadow");
  iframe.onload = function () {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    // Create a host element and attach shadow root
    const host = doc.createElement("div");
    doc.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    // Optional: Set the variable on :root (won't work for shadow dom)
    doc.documentElement.style.setProperty("--my-color", "blue");
    // Set the variable on :host
    const shadowStyle = document.createElement("style");
    shadowStyle.textContent = `
    :root {
      --my-color: red;
    }
  `;
    // Use shadow DOM content with the variable
    const content = document.createElement("p");
    content.textContent =
      "This text uses a CSS variable in shadow DOM: var(--my-color)";
    shadow.appendChild(shadowStyle);
    shadow.appendChild(content);
  };
</script>

The solution to this is simple and probably why you are here if you're on this
article because you googled Superhuman CSS rendering. Instead of declaring the
variable on a root, you need to also declare it on :host, which allows the
scoping to attack DOM nodes or shadow root DOM nodes as well:

```css
:root,
:host {
  --my-color: red;
}

p {
  color: var(--my-color);
}
```

<iframe
  id="css-var-shadow-2"
  style="width:400px; height:130px; border:1px solid #ccc;"
></iframe>
<script>
  const iframe2 = document.getElementById("css-var-shadow-2");
  iframe2.onload = function () {
    const doc = iframe2.contentDocument || iframe2.contentWindow.document;
    // Create a host element and attach shadow root
    const host = doc.createElement("div");
    doc.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    // Optional: Set the variable on :root (won't work for shadow dom)
    doc.documentElement.style.setProperty("--my-color", "blue");
    // Set the variable on :host
    const shadowStyle = document.createElement("style");
    shadowStyle.textContent = `
    :root,
    :host {
      --my-color: red;
    }
    p {
      color: var(--my-color);
    }
  `;
    // Use shadow DOM content with the variable
    const content = document.createElement("p");
    content.textContent =
      "This text uses a CSS variable in shadow DOM: var(--my-color)";
    shadow.appendChild(shadowStyle);
    shadow.appendChild(content);
  };
</script>
