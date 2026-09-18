import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faDev, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function ProjectList({ projects }) {
  return (
    <div className="flex flex-col">
      {projects.map((project, index) => (
        <div key={project.name}>
          <article className="py-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="project-title font-bold min-w-0">{project.name}</h2>
              <ProjectLinks project={project} />
            </div>
            <p className="text-sm text-gray-500">{project.date}</p>
            {project.description ? <p>{project.description}</p> : null}
          </article>
          {index < projects.length - 1 ? <hr className="border-gray-400" /> : null}
        </div>
      ))}
    </div>
  );
}

function ProjectLinks({ project }) {
  const links = [
    ["Devpost", project.links.Devpost, faDev],
    ["GitHub", project.links.Github, faGithub],
    ["YouTube", project.links.Youtube, faYoutube],
    ["Live site", project.links.Live, faArrowUpRightFromSquare],
  ].filter(([, href]) => href);

  if (!links.length) return null;

  return (
    <p className="project-links flex flex-wrap items-center shrink-0 text-sm text-gray-500">
      {links.map(([label, href, icon]) => (
        <a key={label} className="link" href={href} aria-label={`${project.name} on ${label}`} title={label}>
          <FontAwesomeIcon size="lg" icon={icon} />
        </a>
      ))}
    </p>
  );
}
