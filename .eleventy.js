const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "style.out.css": "style.css",
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  eleventyConfig.addPlugin(syntaxHighlight);
};
