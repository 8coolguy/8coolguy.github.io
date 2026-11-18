import { decodeHTML } from "entities";
import { Marked } from "marked";

function headingText(tokens) {
  return tokens.map((token) => {
    if (token.type === "html") return "";
    if (token.type === "br") return " ";
    if (token.tokens) return headingText(token.tokens);
    if (token.type === "codespan" || token.type === "escape") return token.text;
    return decodeHTML(token.text || "");
  }).join("");
}

export function renderMarkdown(markdown = "") {
  const headings = [];
  const usedIds = new Set();
  const parser = new Marked({
    async: false,
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const text = headingText(tokens).replace(/\s+/g, " ").trim();
        const slug = text
          .normalize("NFKC")
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, "")
          .trim()
          .replace(/[\s-]+/g, "-") || "heading";
        const baseId = `section-${slug}`;
        let id = baseId;
        let suffix = 2;
        while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
        usedIds.add(id);
        headings.push({ id, text, depth });

        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
    },
  });

  return { html: parser.parse(markdown), headings };
}
