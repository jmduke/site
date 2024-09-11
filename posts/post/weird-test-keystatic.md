---
title: "Weird test: internal link checking"
date: "2024-04-20"
tags: post
---

I wrote last month about [using weird tests](https://jmduke.com/posts/essays/weird-tests-tacit-knowledge/). Here's another example: checking for broken internal links in our upcoming docsite redesign!

```js
const extractInternalLinks = (content: string): string[] => {
  // Check for internal links only, in the form of [text](/path).
  const internalLinks = content.match(/\[.*?\]\(\/.*?\)/g);
  return (
    (internalLinks
      ?.map((link) => {
        const path = link.match(/\(\/.*?\)/)
          ? link.match(/\(\/.*?\)/)![0].slice(2, -1)
          : null;

        // For now, we'll filter out any images or other non-page links under
        // the assumption that they can be caught elsewhere (e.g. the build step.)
        if (path && path.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|pdf)$/)) {
          return null;
        }
        return path;
      })
      .filter((link) => link !== null) as string[]) || []
  );
};

const MARKDOC_DIRECTORY = "content/pages";

// Make sure all mdoc files with internal links are valid.
fs.readdirSync(MARKDOC_DIRECTORY).forEach((filename) => {
  test("Check internal links in " + filename, () => {
    const fullyQualifiedFilename = `${MARKDOC_DIRECTORY}/${filename}`;
    const content = fs.readFileSync(fullyQualifiedFilename, "utf-8");
    const internalLinks = extractInternalLinks(content);
    internalLinks.forEach((outboundPath) => {
      const mungedOutboundPath = mungeInternalLinks(outboundPath);
      const expectedOutboundFilename = `${MARKDOC_DIRECTORY}/${mungedOutboundPath}.mdoc`;
      expect(
        fs.existsSync(expectedOutboundFilename),
        `Internal link to "/${outboundPath}" in "${filename}" does not exist.`
      ).toBeTruthy();
    });
  });
});
```

This is admittedly _less_ weird than some other examples I've written about, but the core idea is the same: your test runner is a fast, ergonomic, pre-existing tool to express invariants upon your codebase, and it's easier to reach for something like this than pull in another third-party dependency.
