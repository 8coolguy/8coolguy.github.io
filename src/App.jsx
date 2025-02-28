import './output.css';
import {useEffect, useRef} from 'react';
import {projects, experiences, about} from './info.js';
import headshot from "./headshot.png";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {faGithub, faStrava, faLinkedin, faInstagram, faDev } from '@fortawesome/free-brands-svg-icons'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  let height = window.innerHeight;
  let width = window.innerWidth;
  let canvas = document.getElementById('canvas');
  const ref = useRef(null);

  useEffect(() => {
    console.log("canvas", ref.current);
  }, [])
  
  return(
    <div className="">
    <div className="">
      <div className="-z-1 fixed">
        <canvas ref ={ref} className="glslCanvas" id="canvas" data-fragment-url="shader.frag" width={width} height={height}></canvas>
      </div>
        <div>
          <div className="z-50">
              <img fluid className="headshot" src={headshot}></img>
              <h1> Arnav Choudhury</h1>
              
              <div className="links">
                <div className="link" href="#intro">About</div>
                <div className="link" href='#experience'>Experience</div>
                <div className="link" href="#projects">Projects</div>
                <div className="link" href="https://8coolguy.bearblog.dev/" >Blog</div>
                <div className="link" href="/resume.pdf">Resume</div>
              </div>

              <div>
                <div>
                  <a className="link" href ="https://www.instagram.com/notarnav123"> <FontAwesomeIcon size="2x" icon={faInstagram}/></a>
                </div>
                <div>
                  <a className="link" href="https://www.linkedin.com/in/arnav-choudhury-scu/" ><FontAwesomeIcon size="2x" icon={faLinkedin}/></a>
                </div>
                <div>
                  <a className="link" href="https://github.com/8coolguy" ><FontAwesomeIcon size="2x" icon={faGithub}/></a>
                </div>
                <div>
                  <a className="link" href="https://www.strava.com/athletes/33234384" ><FontAwesomeIcon size="2x" icon={faStrava}/></a>
                </div>
              </div>

            </div>
          </div>
          <div>
            <div className="right-container">
              <h2> About </h2>
              <div className="car">
                <div>
                  <p>
                    {about}
                  </p>
                </div>
              </div>

              <div id="experience">
                <h2> Experience </h2>
                {experiences.map(job => 
                  <div className="car" mb ={3}>
                    <div g={0} noGutters>
                      <div>
                        <div>{job.title}</div>
                        <div className="text-muted">{job.date.start} -- {job.date.end}</div>
                        <div>{job.description}</div>
                      </div>
                    </div>
                  </div>
                )}     
              </div>

              <div id="projects">
                <h2>Projects</h2>
                {projects.slice(0,12).map(project => 
                  <div className="car" mb ={3}> 
                    <div g={0}>
                      <div md = {4} >
                        <img fluid src={project.image} />
                      </div>
                      <div md = {8}>
                        <div>
                          <div>{project.name}</div>
                          <div className="text-muted">{project.date}</div>
                          
                          <div>
                            {project.description}
                          </div>

                          {project.links.Devpost ? (<a className="link" href ={project.links.Devpost}> <FontAwesomeIcon size="lg" icon={faDev}/> </a>):<></>}
                          {project.links.Github ? (<a className="link" href ={project.links.Github}> <FontAwesomeIcon size="lg" icon={faGithub}/> </a>):<></>}
                          {project.links.Live ? (<a className="link" href ={project.links.Live}> <FontAwesomeIcon size="lg" icon={faArrowUpRightFromSquare} /> </a>):<></>}

                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
