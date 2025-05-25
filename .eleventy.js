import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import iterlinker from "@photogabble/eleventy-plugin-interlinker";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { encodeHTML } from "entities";

const STATIC_FILES = [
  "img",
  "icons",
  "scripts",
  "favicon.ico",
  "styles",
  "_redirects",
];

export default function (eleventyConfig) {
  // BEGIN: First-party filters.
  eleventyConfig.addFilter("filter", (arr, key, value) => {
    return arr.filter((item) => item.data[key] === value);
  });
  eleventyConfig.addFilter("readablePostDate", (dateObj) => {
    try {
      return dateObj.toISOString().split("T")[0];
    } catch {
      return dateObj;
    }
  });
  eleventyConfig.addFilter("toStars", (rating) => {
    return "★".repeat((rating + 1) / 2);
  });
  eleventyConfig.addCollection("statistics", (collectionAPI) => {
    return [];
  });
  // END: First-party filters.

  eleventyConfig.addPassthroughCopy({
    "style.out.css": "style.css",
  });

  STATIC_FILES.forEach((file) => {
    eleventyConfig.addPassthroughCopy(file);
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(iterlinker, {
    resolvingFns: new Map([["default", async (link, currentPage, interlinker) => {
      try {
      const text = encodeHTML(link.title ?? link.name);
      let href = link.href;
    
      if (link.anchor) {
        href = `${href}#${link.anchor}`;
      }
    
        return href === false ? link.link : `<a href="${href}">${text}</a>`;
      } catch (e) {
        console.error(e);
        return link.link;
      }
    }]]),
  });

  let options = {
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
  };
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLib);
};
