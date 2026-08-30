import Headshot from "@/components/Headshot";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { about, projects } from "@/lib/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faDev, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function HomePage() {
  return (
    <div className="bg-[#fefefe] bg-[url(diagonales-decalees.png)]">
      <main className="h-auto font-Inter flex flex-col justify-center items-center p-4">
        <Headshot />
        <div className="w-full md:max-w-[700px]">
          <section className="rounded-xl" aria-labelledby="about-heading">
            <div className="flex flex-1 flex-col justify-around gap-0">
              <h1 id="about-heading" className="text-bold text-4xl md:text-7xl text-center">
                8coolguy
              </h1>
              <Navigation />
              <p>{about}</p>
            </div>

            <section aria-labelledby="projects-heading">
              <h2 id="projects-heading" className="text-bold text-4xl md:text-7xl text-center">
                Projects
              </h2>
              <div className="gap-4">
                {projects.map((project) => (
                  <article
                    key={project.name}
                    className="group border px-4 py-3 -mx-4 rounded-xl transition-colors"
                  >
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.date}</p>
                    {project.description ? <p>{project.description}</p> : null}
                    <ProjectLinks project={project} />
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}

function ProjectLinks({ project }) {
  const links = [
    ["Devpost", project.links.Devpost, faDev],
    ["GitHub", project.links.Github, faGithub],
    ["Live site", project.links.Live, faArrowUpRightFromSquare],
  ].filter(([, href]) => href);

  if (!links.length) return null;

  return (
    <p className="flex flex-wrap items-center mt-2 text-sm text-gray-500">
      {links.map(([label, href, icon]) => (
        <a key={label} className="link" href={href} aria-label={`${project.name} on ${label}`} title={label}>
          <FontAwesomeIcon size="lg" icon={icon} />
        </a>
      ))}
    </p>
  );
}
