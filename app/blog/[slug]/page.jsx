import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import { getPost, getPostSlugs } from "@/lib/posts";
import styles from "./post.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const images = post.coverImage ? [{ url: post.coverImage }] : [];
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${slug}/`,
      images,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const firstHeadingDepth = Math.min(...post.headings.map(({ depth }) => depth));

  return (
    <div className="site-page">
      <main className="site-main font-Inter flex flex-col items-center p-4">
        <article className={styles.article} aria-labelledby="post-heading">
          <header className={styles.header}>
            <h1 id="post-heading" className="font-bold text-4xl md:text-7xl text-center mt-4 mb-2">{post.title}</h1>
            {post.tags.length ? <p className="text-center text-sm text-gray-500 mb-4">{post.tags.join(" · ")}</p> : null}
            <Navigation />
          </header>
          <div className={post.headings.length ? styles.layout : styles.body}>
            {post.headings.length ? (
              <aside className={styles.toc}>
                <nav aria-labelledby="toc-heading">
                  <p id="toc-heading" className={styles.tocTitle}>On this page</p>
                  <ul>
                    {post.headings.map(({ id, text, depth }) => (
                      <li key={id} style={{ "--toc-depth": depth - firstHeadingDepth }}>
                        <a href={`#${id}`}>{text || "Untitled section"}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            ) : null}
            <div className={styles.body}>
              <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: post.html }} />
              <p className="mt-8 text-center">
                <a href="/blog/" className="hover:underline text-sm text-gray-500">← Blog</a>
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
