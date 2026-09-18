import Headshot from "@/components/Headshot";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PinnedProjects from "@/components/PinnedProjects";
import { about, pinnedProjects } from "@/lib/info";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[#fefefe] bg-[url(diagonales-decalees.png)]">
      <main className="h-auto font-Inter flex flex-col justify-center items-center p-4">
        <Headshot />
        <div className="home-content">
          <section className="rounded-xl" aria-labelledby="about-heading">
            <div className="home-copy flex flex-1 flex-col justify-around gap-0">
              <h1 id="about-heading" className="home-title text-bold text-4xl md:text-7xl text-center">
                Arnav C.
              </h1>
              <Navigation />
              <p>{about}</p>
            </div>

            <section aria-label="Pinned projects">
              <PinnedProjects projects={pinnedProjects} />
              <p className="mt-4 text-right">
                <Link className="font-bold hover:underline" href="/other-work/">
                  See all other work →
                </Link>
              </p>
            </section>
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
