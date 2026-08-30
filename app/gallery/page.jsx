import Footer from "@/components/Footer";
import GalleryLoader from "@/components/GalleryLoader";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Shader Gallery",
  description: "A gallery of community-submitted fragment shaders rendered in WebGL.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <div className="bg-[#fefefe] bg-[url(diagonales-decalees.png)]">
      <main className="h-auto font-Inter flex flex-col justify-center items-center p-4">
        <div className="w-full md:max-w-[700px]">
          <section className="rounded-xl" aria-labelledby="gallery-heading">
            <h1 id="gallery-heading" className="text-4xl md:text-7xl text-center">Gallery</h1>
            <Navigation />
            <p className="text-center text-gray-500 mt-6 mb-8">
              Code that computes the color of every pixel.{" "}
              <a href="/throwShader/" className="underline">Try it here.</a>
            </p>
            <GalleryLoader />
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
