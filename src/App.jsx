import {useEffect, useRef} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {faGithub, faStrava, faLinkedin, faInstagram, faDev } from '@fortawesome/free-brands-svg-icons'
import './output.css';
import {projects, experiences, about} from './info.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function Background(){
  let height = window.innerHeight;
  let width = window.innerWidth;
  let canvas = document.getElementById('canvas');
  const ref = useRef(null);

  useEffect(() => {
    //update the window variables
  }, [])
  return (
    <div className="-z-1 fixed">
      <canvas ref={ref} className="glslCanvas" id="canvas" data-fragment-url="shader.frag" width={width} height={height}></canvas>
    </div>
  );
}

function Navigation(){
  return (
    <div className="">
        <div className="">
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
  );
}

function AboutMe(){
  return (
    <div className="flex flex-1 flex-col justify-around gap-0">
      <h1 className="text-bold lg:text-9xl md:text-2xl sm:text-md text-center"> {true ? "Arnav Choudhury" : "8coolguy"}</h1>
      <div className="">
        <div>
          <p>
            {about}
          </p>
        </div>
      </div>
    </div>
  );
}

function Experience(){
  return (
    <div id="experience">
      <h2> Experience </h2>
      {experiences.map(job => 
        <div className="car" mb ={3}>
          <div>
            <div>
              <div>{job.title}</div>
              <div className="text-muted">{job.date.start} -- {job.date.end}</div>
              <div>{job.description}</div>
            </div>
          </div>
        </div>
      )}     
    </div>
  );
}

function Projects(){
  return (
    <div id="projects" className= "lg:columns-4 md:columns-2 sm:columns-1 gap-0">
      {projects.slice(0,12).map(project => 
        <div key={project.name} className={`bg-cover bg-no-repeat bg-[url(${project.image})] w-full h-full`}>
          <img className ="invisible" src={project.image} />
          <div className="project-details">
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
      )}
    </div>
  );
}

function Content(){
  return (
    <div className="px-96 sm:px-64 py-16">
      <div className="bg-gray-500/50 backdrop-blur-[20px] rounded-xl">
        <AboutMe/>
        {/* <Navigation/> */}
        {/* <Experience/> */}
        <Projects/>
      </div>
    </div>
  );
}

function Home() {
  
  return(
  <div className="">
    <Background/>
    <Content/>
  </div>
  );
}
