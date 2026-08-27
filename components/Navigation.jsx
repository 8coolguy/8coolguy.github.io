import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin, faStrava } from "@fortawesome/free-brands-svg-icons";

const links = [
  ["Instagram", "https://www.instagram.com/notarnav123", faInstagram],
  ["LinkedIn", "https://www.linkedin.com/in/arnav-choudhury-scu/", faLinkedin],
  ["GitHub", "https://github.com/8coolguy", faGithub],
  ["Strava", "https://www.strava.com/athletes/33234384", faStrava],
  ["Blog", "/blog/", faRss],
];

export default function Navigation() {
  return (
    <nav aria-label="Social links">
      <div className="flex flex-row justify-center items-center">
        {links.map(([label, href, icon]) => (
          <a key={label} className="link" href={href} aria-label={label} title={label}>
            <FontAwesomeIcon size="2x" icon={icon} />
          </a>
        ))}
      </div>
    </nav>
  );
}
