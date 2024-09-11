---
title: RSS in Next 14
date: "2024-09-05"
---

We finished [Buttondown](https://buttondown.com)’s migration from MDX to Markdoc last week. It went swimmingly, except for one little hitch: our RSS feeds, which sat on top of `getServerSideProps` and read in the flat `.mdoc` files, threw 500s in Vercel. (They worked fine locally and in CI, but then those files were purged by Vercel as part of the post-compile deploy.)

I was considering going back to our previous (slightly janky but perfectly reasonable) approach of having a script that generates the RSS files and then just serving them as static asset, but [Max Stoiber pointed me in the right direction](https://x.com/mxstbr/status/1829581434639851982):

- Create an App Router `Route Handler`
- Set `dynamic="force-static"`
- Build the XML in-band.

This means all we had to do was this:

```ts
import { createReader } from "@keystatic/core/reader";
import config, { localBaseURL } from "../../../keystatic.config";

const reader = createReader(localBaseURL, config);

export const dynamic = "force-static";

const CHANNEL_METADATA = {
  title: "Buttondown's blog",
  description: "Buttondown's blog — guides, tutorials, and more",
  link: "https://buttondown.com",
};

export async function GET() {
  const slugs = await reader.collections.blog.list();

  const rawPostData = await Promise.all(
    slugs.map(async (slug) => {
      const response = await reader.collections.blog.read(slug, {
        resolveLinkedFiles: true,
      });
      return {
        slug,
        ...response,
      };
    })
  );

  const sortedPostData = rawPostData.sort((a, b) => {
    const coercedADate = new Date(a.date || "");
    const coercedBDate = new Date(b.date || "");
    return coercedBDate.getTime() - coercedADate.getTime();
  });

  const items = sortedPostData.map((post) => ({
    title: post.title,
    description: post.description,
    link: `https://buttondown.com/blog/${post.slug}`,
    pubDate: new Date(post.date || "").toUTCString(),
  }));
  const rssFeed = `<rss version="2.0">
        <channel>
            <title>${CHANNEL_METADATA.title}</title>
            <description>${CHANNEL_METADATA.description}</description>
            <link>${CHANNEL_METADATA.link}</link>
            ${items
              .map(
                (item) => `<item>
                <title>${item.title}</title>
                <description>${item.description}</description>
                <link>${item.link}</link>
                <pubDate>${item.pubDate}</pubDate>
            </item>`
              )
              .join("\n")}
        </channel>
    </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
```

Hopefully, Next will make this all a thing of the past and create a lightweight DSL like they did for [sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). In the meantime, though, I hope this helps!
