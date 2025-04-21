import './output.css';
import {useEffect, useRef} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faRss} from '@fortawesome/free-solid-svg-icons'
import {faGithub, faStrava, faLinkedin, faInstagram, faDev } from '@fortawesome/free-brands-svg-icons'
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

function Headshot(){
  let canvas = document.getElementById('canvas');
  useEffect(() => {
    //update the window variables
  }, [])
  return (
    <div className="w-[200px] h-[200px]">
      <canvas className="glslCanvas" id="canvas" data-fragment-url="shader.frag" height={200} width={200}></canvas>
    </div>
  );
}

function Navigation(){
  return (
    <div className="">
        <div className="">
          {/* <div className="link" href="/resume.pdf">Resume</div> */}
        </div>

        <div className="flex flex-row justify-center items-center">
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
          <div>
            <a className="link" href="https://8coolguy.bearblog.dev/" ><FontAwesomeIcon size="2x" icon={faRss}/></a>
          </div>
        </div>
    </div>
  );
}

function AboutMe(){
  return (
    <div className="flex flex-1 flex-col justify-around gap-0">
      <h1 className="text-bold text-7xl text-center"> {false ? "Arnav Choudhury" : "8coolguy"}</h1>
      <div>
        <Navigation/>
        <div className="">
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
    <div className= "gap-4">
      {projects.map(project => 
        <div key={project.name} className="group border px-4 py-3 -mx-4 rounded-xl transition-colors">
          {/* <img src={project.image} /> */}
          <div className="">
            <div>
              <div className="font-bold">{project.name}</div>
              <div className="text-sm">{project.date}</div>
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
    <div className="max-w-[700px]">
      <div className="rounded-xl">
        <AboutMe/>
        {/* <Navigation/> */}
        {/* <Experience/> */}
        <h1 className="text-bold text-2xl text-center"> Projects </h1>
        <Projects/>
      </div>
    </div>
  );
}

function Home() {
  return(
  <div className="flex flex-col justify-center items-center p-4">
    <Headshot/>
    <Content/>
  </div>
  );
}
