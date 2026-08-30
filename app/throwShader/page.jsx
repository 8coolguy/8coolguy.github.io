import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ThrowShaderLoader from "@/components/ThrowShaderLoader";

export const metadata = {
  title: "Throw Shader",
  description: "Write, preview, and submit a fragment shader to the community gallery.",
  alternates: { canonical: "/throwShader/" },
};

export default function ThrowShaderPage() {
  return (
    <div className="bg-[#fefefe] bg-[url(diagonales-decalees.png)]">
      <main className="h-auto font-Inter flex flex-col justify-center items-center p-4">
        <div className="w-full md:max-w-[700px]">
          <section className="rounded-xl" aria-labelledby="throw-shader-heading">
            <h1 id="throw-shader-heading" className="text-4xl md:text-7xl text-center">Throw Shader</h1>
            <Navigation />
            <p className="text-center text-gray-500 mt-6 mb-8">
              Learn how to write shaders with{" "}
              <a href="https://thebookofshaders.com" className="underline" target="_blank" rel="noopener noreferrer">
                The Book of Shaders
              </a>.
            </p>
            <ThrowShaderLoader />
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
