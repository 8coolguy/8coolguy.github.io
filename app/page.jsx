import Headshot from "@/components/Headshot";
import Navigation from "@/components/Navigation";
import ProjectAnimation from "@/components/ProjectAnimation";
import { about, pinnedProjects } from "@/lib/info";
import styles from "./page.module.css";

const categories = [
  "Game development",
  "Parallel computing",
  "Procedural graphics",
  "Full-stack development",
  "AI & learning",
];

const titles = [
  "Conquest",
  "CUDA Neural Networks",
  "Procedural Solar System",
  "Virtual Cycling Rooms",
  "Study Rush",
];

function ProjectMedia({ project, title }) {
  if (project.video) {
    return <ProjectAnimation className={styles.projectVideo} src={project.video} poster={project.image} />;
  }

  if (project.image) {
    return (
      <img
        src={project.image}
        srcSet={project.imageSrcSet}
        sizes="(max-width: 700px) 100vw, 50vw"
        alt={`${title} project preview`}
        width="960"
        height="640"
        loading="lazy"
      />
    );
  }

  return (
    <div className={styles.projectNote}>
      <span>{project.name}</span>
      <strong>Serial.<br />OpenMP.<br />CUDA.</strong>
      <span>Three implementations. One library.</span>
    </div>
  );
}

function Project({ project, index }) {
  const title = titles[index];
  const isFeatured = index === pinnedProjects.length - 1;

  return (
    <article className={`${styles.project} ${isFeatured ? styles.featuredProject : ""}`}>
      <div className={styles.projectMedia}>
        <ProjectMedia project={project} title={title} />
      </div>
      <div>
        <div className={styles.projectHeading}>
          <h3>{title}</h3>
          <span className={styles.category}>{categories[index]}</span>
        </div>
        <details className={styles.details} open>
          <summary><span>About the project</span><span aria-hidden="true">+</span></summary>
          <p>{project.description}</p>
          <div className={styles.projectLinks}>
            {Object.entries(project.links).filter(([, href]) => href).map(([label, href]) => (
              <a href={href} key={label} target="_blank" rel="noreferrer">
                {label === "Github" ? "Source" : label === "Live" ? "Visit project" : label}
              </a>
            ))}
          </div>
        </details>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.wordmark} aria-label="Arnav C. home">
            <img src="/icon.png" alt="" width="48" height="48" />
          </a>
          <nav aria-label="Page navigation">
            <a href="#selected-work">Work</a>
            <a href="/blog/">Writing</a>
            <a href="/resume/">Résumé</a>
          </nav>
        </header>
        <main>
          <div className={styles.hero}>
            <section className={styles.intro} aria-label="About Arnav">
              <p className={styles.eyebrow}><span className={styles.dot} /> Backend engineer & curious human</p>
              <h1>Arnav{" "}<br />Choudhury<span className={styles.titleDot}>.</span></h1>
              <div className={styles.socials}><Navigation /></div>
              <div className={styles.introBottom}>
                <p className={styles.bio}>{about}</p>
                <a className={styles.textLink} href="#selected-work">Explore my work</a>
              </div>
            </section>
            <figure className={styles.shader} aria-label="Live community shader">
              <Headshot />
              <figcaption>
                <a href="/gallery/">A shader from the community. Click to explore the gallery</a>
              </figcaption>
            </figure>
          </div>
          <section className={styles.work} id="selected-work" aria-label="Selected work">
            <div className={styles.sectionHeading}>
              <h2>Selected work</h2>
              <span>A few things I’ve built</span>
            </div>
            <div className={styles.projects}>
              {pinnedProjects.map((project, index) => <Project key={project.name} project={project} index={index} />)}
            </div>
            <a className={styles.allWork} href="/other-work/">
              There’s more where that came from.<span>All other work</span>
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}
