import "server-only";

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content", "blogs");

function unquote(value) {
  return value.replace(/^["']|["']$/g, "").trim();
}

export function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontMatter = match ? match[1] : "";
  const body = match ? raw.slice(match[0].length) : raw;
  const get = (key) => {
    const result = frontMatter.match(new RegExp(`^[ \\t]*${key}[ \\t]*:[ \\t]*(.*)$`, "m"));
    return result ? unquote(result[1]) : "";
  };

  let tags = [];
  const inlineTags = get("tags");
  if (inlineTags && inlineTags !== "[]") {
    tags = inlineTags
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((tag) => unquote(tag))
      .filter(Boolean);
  } else if (/^[ \t]*tags[ \t]*:[ \t]*$/m.test(frontMatter)) {
    const lines = frontMatter.split("\n");
    const tagLine = lines.findIndex((line) => /^[ \t]*tags[ \t]*:[ \t]*$/.test(line));
    for (let index = tagLine + 1; index < lines.length; index += 1) {
      const tag = lines[index].match(/^\s*[-*]\s*(.+)\s*$/);
      if (tag) tags.push(unquote(tag[1]));
      else if (lines[index].trim() && /^\S/.test(lines[index])) break;
    }
  }

  return {
    title: get("title") || null,
    year: /^\d{4}$/.test(get("year")) ? get("year") : "",
    date: get("date"),
    excerpt: get("excerpt"),
    coverImage: get("coverImage"),
    link: get("link"),
    tags,
    body,
  };
}

export function excerpt(body, length = 180) {
  const text = (body || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_>~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_") && !name.startsWith("."))
    .map((name) => name.replace(/\.md$/i, ""));
}

export function getPost(slug) {
  if (!getPostSlugs().includes(slug)) return null;
  const raw = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8");
  const post = parseFrontMatter(raw);
  return {
    ...post,
    slug,
    title: post.title || slug,
    description: post.excerpt || excerpt(post.body),
    html: marked.parse(post.body || ""),
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map(getPost)
    .sort((a, b) => {
      const aDate = a.date || `${a.year || "0000"}-01-01`;
      const bDate = b.date || `${b.year || "0000"}-01-01`;
      return bDate.localeCompare(aDate) || a.title.localeCompare(b.title);
    });
}
