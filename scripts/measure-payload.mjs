import { readFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";

// Measure only the HTML and its directly referenced JS/CSS. Runtime imports,
// images, fonts, API responses, headers, and transport overhead are excluded.
const root = new URL("../out/", import.meta.url);
const html = await readFile(new URL("index.html", root));
const source = html.toString();
const scripts = [...source.matchAll(/<script\b[^>]*>/g)]
  .filter(([tag]) => !/\bnoModule\b/i.test(tag))
  .map(([tag]) => tag.match(/\bsrc="([^"]+\.js)"/)?.[1]);
const styles = [...source.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]
  .map(([tag]) => tag.match(/\bhref="([^"]+\.css)"/)?.[1]);
const paths = [...new Set([...scripts, ...styles])].filter(Boolean);
const sizes = (buffer) => ({
  raw: buffer.length,
  gzip: gzipSync(buffer).length,
  brotli: brotliCompressSync(buffer).length,
});
const files = await Promise.all(paths.map(async (path) => ({
  path,
  ...sizes(await readFile(new URL(`.${path}`, root))),
})));
const total = (files) => files.reduce((sum, file) => ({
  raw: sum.raw + file.raw,
  gzip: sum.gzip + file.gzip,
  brotli: sum.brotli + file.brotli,
}), { raw: 0, gzip: 0, brotli: 0 });

console.log(JSON.stringify({
  html: sizes(html),
  javascript: total(files.filter(({ path }) => path.endsWith(".js"))),
  css: total(files.filter(({ path }) => path.endsWith(".css"))),
  files,
}, null, 2));
