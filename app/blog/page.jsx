import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Writing about software, graphics, simulations, and personal projects.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const groups = posts.reduce((result, post) => {
    const year = post.year || "Misc";
    result[year] = result[year] || [];
    result[year].push(post);
    return result;
  }, {});
  const years = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-[#fefefe] bg-[url(diagonales-decalees.png)]">
      <main className="h-auto font-Inter flex flex-col justify-center items-center p-4">
        <div className="w-full md:max-w-[700px]">
          <section className="rounded-xl" aria-labelledby="blog-heading">
            <h1 id="blog-heading" className="text-bold text-4xl md:text-7xl text-center">Blog</h1>
            <Navigation />
            {!posts.length ? <p className="text-center text-gray-500">No posts yet.</p> : null}

            {years.map((year) => (
              <section key={year} aria-labelledby={`year-${year}`}>
                <h2 id={`year-${year}`} className="text-bold text-xl mt-8 mb-2">{year}</h2>
                <div className="flex flex-col gap-4">
                  {groups[year].map((post) => (
                    <details key={post.slug} className="group border px-4 py-3 -mx-4 rounded-xl transition-colors overflow-hidden">
                      <summary className="cursor-pointer flex items-center justify-between gap-2">
                        <span className="break-words">
                          <span className="font-bold block">{post.title}</span>
                          {post.tags.length ? (
                            <span className="text-sm text-gray-500">{post.tags.join(" · ")}</span>
                          ) : null}
                        </span>
                        <span className="group-open:rotate-180 transition-transform text-gray-400 select-none shrink-0" aria-hidden="true">▾</span>
                      </summary>
                      <p className="mt-4 pt-3 border-t text-sm text-gray-600 leading-relaxed break-words">{post.description}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        <a href={`/blog/${post.slug}/`} className="hover:underline">Read on →</a>
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
