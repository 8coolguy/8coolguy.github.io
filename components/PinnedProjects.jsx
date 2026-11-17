"use client";

import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import ProjectAnimation from "@/components/ProjectAnimation";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faDev, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./PinnedProjects.module.css";

const linkDetails = {
  Github: ["GitHub", faGithub],
  Devpost: ["Devpost", faDev],
  Live: ["Live site", faArrowUpRightFromSquare],
};

export default function PinnedProjects({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const revealButtons = useRef([]);

  function closeProject(index) {
    setActiveProject(null);
    requestAnimationFrame(() => revealButtons.current[index]?.focus());
  }

  return (
    <div className={styles.mosaic}>
      {projects.map((project, index) => {
        const isActive = activeProject === index;
        const descriptionId = `pinned-project-${index}`;
        const wideCard = index === 0 || index === 4;
        const imageSizes = `(max-width: 40rem) calc(100vw - 2rem), (max-width: 62rem) ${wideCard ? "58vw" : "42vw"}, ${wideCard ? "560px" : "400px"}`;

        return (
          <article
            key={project.name}
            className={`${styles.card} ${styles[`card${index + 1}`]} ${isActive ? styles.active : ""}`}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            {project.video ? (
              <ProjectAnimation
                className={styles.image}
                src={project.video}
                poster={project.image}
              />
            ) : project.image ? (
              <img
                className={styles.image}
                src={project.image}
                srcSet={project.imageSrcSet}
                sizes={imageSizes}
                alt=""
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <button
              className={styles.revealButton}
              type="button"
              ref={(button) => {
                revealButtons.current[index] = button;
              }}
              aria-expanded={isActive}
              aria-controls={descriptionId}
              onClick={() => setActiveProject(index)}
            >
              <span className={styles.cardTitle}>{project.name}</span>
              <span className={styles.tapHint}>Tap to view</span>
            </button>
            <div className={styles.overlay} id={descriptionId} inert={!isActive}>
              <button
                className={styles.closeButton}
                type="button"
                aria-label={`Close ${project.name} details`}
                onClick={() => closeProject(index)}
              >
                &times;
              </button>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className={styles.links}>
                {Object.entries(project.links).map(([type, href]) => {
                  const [label, icon] = linkDetails[type];

                  return (
                    <a key={type} href={href} target="_blank" rel="noreferrer">
                      <Icon icon={icon} />
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
