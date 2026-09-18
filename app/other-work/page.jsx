import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProjectList from "@/components/ProjectList";
import { projects } from "@/lib/info";

export const metadata = {
  title: "Other Work",
  description: "More software, graphics, machine learning, embedded systems, and game projects by Arnav C.",
  alternates: { canonical: "/other-work/" },
};

export default function OtherWorkPage() {
  return (
    <div className="site-page">
      <main className="site-main font-Inter flex flex-col items-center p-4">
        <div className="w-full md:max-w-[700px]">
          <section className="rounded-xl" aria-labelledby="other-work-heading">
            <h1 id="other-work-heading" className="text-bold text-4xl md:text-7xl text-center">
              Other Work
            </h1>
            <Navigation />
            <p className="mb-8">A collection of projects, experiments, and things I have built over the years.</p>
            <ProjectList projects={projects} />
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
