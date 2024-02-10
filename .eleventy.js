const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
let markdownIt = require("markdown-it");
let markdownItFootnote = require("markdown-it-footnote");

const STATIC_FILES = ["img", "scripts", "favicon.ico", "styles"];

module.exports = function (eleventyConfig) {
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
