import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getPost, getPostSlugs } from "@/lib/posts";

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

  return (
    <div className="bg-[#fefefe] bg-[url(diagonales-decalees.png)]">
      <main className="h-auto font-Inter flex flex-col justify-center items-center p-4">
        <article className="w-full md:max-w-[700px]" aria-labelledby="post-heading">
          <h1 id="post-heading" className="text-bold text-4xl md:text-7xl text-center mt-4 mb-2">{post.title}</h1>
          {post.tags.length ? <p className="text-center text-sm text-gray-500 mb-4">{post.tags.join(" · ")}</p> : null}
          <Navigation />
          <div className="break-words overflow-hidden prose-sm" dangerouslySetInnerHTML={{ __html: post.html }} />
          <p className="mt-8 text-center">
            <a href="/blog/" className="hover:underline text-sm text-gray-500">← Blog</a>
          </p>
        </article>
        <Footer />
      </main>
    </div>
  );
}
