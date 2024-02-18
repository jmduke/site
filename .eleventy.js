const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const iterlinker = require("@photogabble/eleventy-plugin-interlinker");

const STATIC_FILES = ["img", "scripts", "favicon.ico", "styles"];

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
  // END: First-party filters.

  eleventyConfig.addPlugin(iterlinker, {});
  eleventyConfig.addPassthroughCopy({
    "style.out.css": "style.css",
  });

  STATIC_FILES.forEach((file) => {
    eleventyConfig.addPassthroughCopy(file);
  });
  eleventyConfig.addPlugin(syntaxHighlight);

  let options = {
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
  };
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLib);
};
