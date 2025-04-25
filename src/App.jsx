import './output.css';
import {useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faRss} from '@fortawesome/free-solid-svg-icons'
import {faGithub, faStrava, faLinkedin, faInstagram, faDev } from '@fortawesome/free-brands-svg-icons'
import {projects, experiences, about} from './info.js';
import { Canvas } from 'glsl-canvas-js';
import { BrowserRouter, Routes, Route} from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element ={<Gallery />} />
        <Route path="/throwshader" element={<Thrower/>} />
      </Routes>
    </BrowserRouter>
  );
}
function Shader({width, height, code, author}){
  const [sandbox, setSandbox] = useState(null);
  const canvas = useRef(null);
  const options ={
    "backgroundColor": 'rgba(0.0, 0.0, 0.0, 0.0)',
    "alpha": true,
    "antialias": true,
    "depth": true,
    "failIfMajorPerformanceCaveat": false,
    "powerPreference": "default",
    "premultipliedAlpha": true,
    "preserveDrawingBuffer": false,
    "stencil": false,
    "desynchronized": false
  }
  useEffect(() => {
    if(canvas.current && !sandbox){
      window.devicePixelRatio = 1;
      const instance = new Canvas(canvas.current, options);
      instance.load(code)
      setSandbox(instance);
    }
  }, [canvas])
  
  return (
    <div>
      <canvas ref={canvas} data-fragment-url="shader2.frag" id="canvas" height={height} width={width}></canvas>
      <p class="text-right">{author}</p>
    </div>
  )
}

function Headshot(){
  let df = `
  #ifdef GL_ES
  precision mediump float; 
  #endif
  uniform vec2 u_resolution;
  uniform float u_time;
  void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`
  let sc = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  #define PI 3.14159265359
  uniform vec2 u_resolution;
  uniform float u_time;

  vec3 palette( float t ) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(2.0, 1.0, 0.0);
      vec3 d = vec3(0.5,0.2,0.25);

      return a + b*cos( 6.28*(c*t+d) );
  }

  void main(){
      vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
      vec2 uv0 = uv;
      uv = fract(uv * 2.0) - .5;
      vec3 final = vec3(0.0);
      
      float d = length(uv);
      vec3 col = palette(length(uv0) + .2*u_time);
      
      d = cos(d*8. + u_time)/8.;
      d = abs(d);
      d = .05/d;
      
      final += col * d;
      gl_FragColor = vec4(final, 1.0);
  }`;
  const [shader, setShader] = useState(sc);
  return (
    <Shader height = {300} width = {300} code = {shader} author = "arnav" />
  );
}

function Navigation(){
  return (
    <div className="">
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
      <h1 className="text-bold text-7xl text-center"> {true ? "Arnav Choudhury" : "8coolguy"}</h1>
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
function Thrower(){

}

function Gallery() {
  return (
    <h1>Hello World</h1>
  )
}