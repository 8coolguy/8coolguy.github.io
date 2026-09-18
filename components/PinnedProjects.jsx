"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

        return (
          <article
            key={project.name}
            className={`${styles.card} ${styles[`card${index + 1}`]} ${isActive ? styles.active : ""}`}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <img
              className={styles.image}
              src={project.image}
              alt=""
              width="1200"
              height="800"
              loading="lazy"
            />
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
                      <FontAwesomeIcon icon={icon} aria-hidden="true" />
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
