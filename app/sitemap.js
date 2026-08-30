import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  const pages = ["", "/blog", "/gallery", "/throwShader", "/resume"];
  const staticPages = pages.map((path) => ({
    url: `${SITE_URL}${path}/`.replace(`${SITE_URL}//`, `${SITE_URL}/`),
    lastModified: new Date(),
  }));
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : new Date(`${post.year || "2021"}-01-01`),
  }));

  return [...staticPages, ...posts];
}
