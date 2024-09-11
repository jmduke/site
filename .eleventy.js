const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const iterlinker = require("@photogabble/eleventy-plugin-interlinker");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginOgImage = require("eleventy-plugin-og-image");

const STATIC_FILES = ["img", "icons", "scripts", "favicon.ico", "styles"];

function getWordCount(inputPath) {
  const content = require("fs").readFileSync(inputPath, "utf8");
  const words = content.split(/\s+/).length;
  return words;
}

module.exports = function (eleventyConfig) {
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
  eleventyConfig.addPlugin(iterlinker, {});

  let options = {
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
  };
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLib);
};
