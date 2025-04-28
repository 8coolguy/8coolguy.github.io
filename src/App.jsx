import './output.css';
import {useEffect, useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faRss} from '@fortawesome/free-solid-svg-icons'
import {faGithub, faStrava, faLinkedin, faInstagram, faDev } from '@fortawesome/free-brands-svg-icons'
import {projects, experiences, about} from './info.js';
import { Canvas } from 'glsl-canvas-js';
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element ={<Gallery />} />
        <Route path="/throwshader" element={<Thrower/>} />
        <Route path="/resume" element={<Resume/>} />
      </Routes>
    </BrowserRouter>
  );
}
function Resume(){
  return (
    <iframe title='Resume' src="resume.pdf" height={window.innerHeight} width="100%"></iframe>
  )
}
const df = `#ifdef GL_ES
precision mediump float; 
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`
function Shader({width, height, code, author, onError, onCompile}){
  const [sandbox, setSandbox] = useState(null);
  const canvas = useRef(null);
  const options ={
    "backgroundColor": 'rgba(0.0, 0.0, 0.0, 0.0)',
    "alpha": true,
    "antialias": true,
    "depth": true,
    "failIfMajorPerformanceCaveat": true,
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
      instance.on("error", onError);
      setSandbox(instance);
    }
  }, [canvas])
  useEffect(() => {
    if(sandbox){
      sandbox.load(code)
      onCompile();
    }
  }, [code])
  
  return (
    <div>
      <canvas ref={canvas} data-fragment-url="shader2.frag" id="canvas" height={height} width={width}></canvas>
      <p class="text-right">{author}</p>
    </div>
  )
}

function Headshot(){
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
      <h1 className="text-bold text-7xl text-center"> {false? "Arnav Choudhury" : "8coolguy"}</h1>
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


function Notification({message, visible, onClick}){
  return (
    <div className={`${!visible?"hidden":""} bg-red-300 px-4 py-3 rounded-lg shadow-md`} onClick={onClick}>
      <p className="text-xl text-bold">Error </p>
      <p>{message}</p>
    </div>
  )
}

function Thrower(){
  const [code, setCode] = useState(df);
  const [author, setAuthor ] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(true)
  const width = window.innerWidth/2;
  const height = window.innerHeight;
  
  function handleChange(event){
    setCode(event.target.value);
  }
  function handleAuthorChange(event){
    setAuthor(event.target.value);
  }
  function handleError(e){
    setErrorMessage(e.error);
    setVisible(true);
  }
  function handleRemove(event){
    event.preventDefault();
    setVisible(false);
  }
  function handleSubmit(event){
    event.preventDefault();
    const codeString = JSON.stringify(code);
    if (codeString.length == 0 || visible || author.length == 0) return;
    fetch("https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod", {
      method:"POST",
      body: JSON.stringify({
        action:"throw",
        code:codeString,
        author:author
      })
    })
      .then((resolve) => resolve.json())
      .then(resolve => {
        if(resolve.statusCode == 400) throw new Error("Api Error");
        window.location.href = "/";
      })
      .catch(err => {
        setErrorMessage(err.message);
        setVisible(true);
      })
  }
  return (
    <div className="flex flex-1 flex-row">
      <form className={`p-8`}>
        <button onClick={handleSubmit} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Submit </button>
        <label for="author">Author: </label>
        <input type="text" id="author" className="border" onChange={handleAuthorChange}></input>
        <textarea id="code" className={`border resize`} value={code} rows={height/27} cols={width/9} ></textarea>
      </form>
      <Shader height = {height} width = {width} code = {code} author = "" onError={handleError} onCompile={() => setVisible(false)}/>
      <div className="right-0 fixed">
        <Notification className={``} visible={visible} message={errorMessage} onClick={handleRemove}/>
      </div>
    </div>
  )
}

function Gallery() {
  return (
    <h1>Hello World</h1>
  )
}