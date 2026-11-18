import assert from "node:assert/strict";
import test from "node:test";
import { renderMarkdown } from "./markdown.js";

test("renders formatted headings with plain text TOC labels and matching anchors", () => {
  const { html, headings } = renderMarkdown([
    "# **Getting _started_** with `C++` &amp; HTML",
    "## [Links](https://example.com) and <em>markup</em> &#x1F680;",
    "### Café &lt;setup&gt;",
    "Setext heading\n--------------",
  ].join("\n\n"));

  assert.deepEqual(headings, [
    { id: "section-getting-started-with-c-html", text: "Getting started with C++ & HTML", depth: 1 },
    { id: "section-links-and-markup", text: "Links and markup 🚀", depth: 2 },
    { id: "section-café-setup", text: "Café <setup>", depth: 3 },
    { id: "section-setext-heading", text: "Setext heading", depth: 2 },
  ]);
  for (const { id, depth } of headings) assert.ok(html.includes(`<h${depth} id="${id}">`));
  assert.match(html, /<strong>Getting <em>started<\/em><\/strong>/);
  assert.match(html, /<code>C\+\+<\/code>/);
  assert.match(html, /<a href="https:\/\/example.com">Links<\/a>/);
});

test("avoids duplicate anchors, including collisions with generated suffixes", () => {
  const { headings } = renderMarkdown("# Intro\n# Intro\n## Intro-2\n# Intro\n# !!!\n# ???");
  assert.deepEqual(headings.map(({ id }) => id), [
    "section-intro", "section-intro-2", "section-intro-2-2",
    "section-intro-3", "section-heading", "section-heading-2",
  ]);
  assert.equal(renderMarkdown("# Intro").headings[0].id, "section-intro");
});

test("extracts labels from tokens while preserving literal code and image alt text", () => {
  const { headings } = renderMarkdown('# `&amp; <tag>` &amp; \\&amp; <span title="a > b">Text</span> ![*alt*](/image.png)');
  assert.equal(headings[0].text, "&amp; <tag> & &amp; Text alt");
});

test("preserves Markdown elements and excludes code examples from the TOC", () => {
  const { html, headings } = renderMarkdown([
    "#### Fourth\n##### Fifth\n###### Sixth",
    "Paragraph with **bold**, *emphasis*, ~~deleted~~ and `inline code`.",
    "- First\n  - Nested\n\n1. Ordered\n2. List",
    "- [x] Complete\n- [ ] Pending",
    "> A quote",
    "```js\n# Not a heading\nconst text = '<tag>';\n```",
    "| Name | Value |\n| --- | --- |\n| Test | 1 |",
    "![Alt text](/image.png)",
    '<img src="/logo.png" alt="logo" width="100">',
    "---",
  ].join("\n\n"));

  assert.deepEqual(headings.map(({ depth }) => depth), [4, 5, 6]);
  for (const tag of ["p", "strong", "em", "del", "code", "ul", "ol", "blockquote", "pre", "table", "th", "td"]) {
    assert.ok(html.includes(`<${tag}>`), `Missing ${tag} element`);
  }
  assert.match(html, /<input checked="" disabled="" type="checkbox">/);
  assert.match(html, /<code class="language-js"># Not a heading/);
  assert.match(html, /&lt;tag&gt;/);
  assert.match(html, /<img src="\/image.png" alt="Alt text">/);
  assert.match(html, /<img src="\/logo.png" alt="logo" width="100">/);
  assert.match(html, /<hr>/);
});

test("handles empty and heading-free posts", () => {
  assert.deepEqual(renderMarkdown(), { html: "", headings: [] });
  assert.deepEqual(renderMarkdown("Just text."), { html: "<p>Just text.</p>\n", headings: [] });
});
