import './output.css';
import {useEffect, useState, useRef, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faRss} from '@fortawesome/free-solid-svg-icons'
import {faGithub, faStrava, faLinkedin, faInstagram, faDev } from '@fortawesome/free-brands-svg-icons'
import {projects, experiences, about} from './info.js';
import { Canvas } from 'glsl-canvas-js';
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router';

function debounce(func, delay){
  let timeoutid;
  return (...args) => {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(() => func(...args), delay);
  }
}
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
const vert = '#version 300 es\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nin vec2 a_position;\nin vec2 a_texcoord;\n\nout vec2 v_texcoord;\n\nvoid main() {\n gl_Position = vec4(a_position, 0.0, 1.0);\n v_texcoord = a_texcoord;\n}\n';
const df = `#ifdef GL_ES
precision mediump float; 
#endif
uniform vec2 u_resolution;
uniform float u_time;
void main(){gl_FragColor = vec4(vec3(0.0), 1.0);}`
function Shader({width, height, code, author, onError, onCompile}){
  const canvas = useRef(null);
  window.devicePixelRatio = 1;
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
  const sandbox = useRef(null);
  const box = useRef(null);
  const [scrolly, setScroll] = useState(0);
  const isGlsl2 = (newCode) =>{
    if(newCode.length == 0) return false;
    const version_dec = newCode.split("\n")[0];
    if(version_dec == "#version 300 es") return true;
    return false;
  }

  const isBoundingBox = (element) =>{
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
  const isViewable = (instance) => {
    if (isBoundingBox(box.current)){
      instance.play();
    }else{
      instance.pause();
    }
  }
  useEffect(() => {
    if(canvas.current && !sandbox.current){
      const instance = new Canvas(canvas.current, options)
      if (isGlsl2(code)) instance.load(code,vert);
      else instance.load(code);
      instance.on("error", onError);
      sandbox.current = instance;
    }
  }, [canvas])
  useEffect(() => {
    handleChange(code);
  }, [code])
  useEffect(() => {
    handleScroll(scrolly);
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolly])
  function compile(newCode){
    const instance = sandbox.current;
    if(instance){
      if (isGlsl2(newCode)) instance.load(newCode,vert);
      else instance.load(newCode);
      sandbox.current = instance;
      if(box.current) isViewable(instance);
      onCompile();
    }
  }
  const handleChange = useCallback(
    debounce((code) => { 
      compile(code);
    }, 700),
    []
  );
  const handleScroll = useCallback(
    debounce((newScrollY) => { 
      const instance = sandbox.current;
      if(instance) isViewable(instance);
    }, 700),
    []
  );
  
  return (
    <div ref={box}>
      <canvas ref={canvas} id="canvas" height={height} width={width}></canvas>
      <p className="text-right">{author}</p>
    </div>
  )
}

function Headshot(){
  const [shader, setShader] = useState(df);
  const [author, setAuthor] = useState("");
  useEffect(() => {
    fetch("https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod", {
      method:"POST",
      body: JSON.stringify({
        action:"catch",
      })
    })
      .then((res)=>res.json())
      .then((res)=>{
        const data = JSON.parse(res.body);
        setShader(JSON.parse(data.code));
        setAuthor(data.author);
      })
      .catch(err=>console.error(err))
  }, [])
  
  return (
    <Shader height = {300} width = {300} code = {shader} author = {author} onError={()=>{}} onCompile={()=>{}}/>
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
              <div className="text-sm text-gray-500">{project.date}</div>
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
    <div className="md:max-w-[700px] max-w-[300px]">
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

function Home(){
  return(
  <div className="h-auto flex flex-col justify-center items-center p-4">
    <Headshot/>
    <Content/>
    <Footer/>
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
  const [width, setWidth] = useState(window.innerWidth/2);
  const [height, setHeight] = useState(window.innerHeight);
  
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
  const handleResize = useCallback(
    debounce((event) => { 
      console.log(window);
      setWidth(window.outerWidth/2);
      setHeight(window.outerHeight);
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
  return (
    <div className="flex flex-1 flex-row">
      <form className={`p-8`}>
        <button onClick={handleSubmit} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Submit </button>
        <label htmlFor="author"> Author: </label>
        <input type="text" id="author" className="resize border rounded" onChange={handleAuthorChange}></input>
        <textarea id="code" className="border resize rounded font-mono" value={code} rows={height/27} cols={width/9} onChange={handleChange}></textarea>
      </form>
      <Shader height = {height} width = {width} code = {code} author = "" onError={handleError} onCompile={() => setVisible(false)}/>
      <div className="right-0 fixed">
        <Notification className={``} visible={visible} message={errorMessage} onClick={handleRemove}/>
      </div>
    </div>
  )
}

function Gallery() {
  const [shaders, setShaders] = useState([]);
  useEffect(() => {
    fetch("https://dxn4pwl2vg.execute-api.us-west-1.amazonaws.com/prod", {
      method:"POST",
      body: JSON.stringify({
        action:"batch",
        count:-1
      })
    })
      .then((resolve) => resolve.json())
      .then(resolve => {
        if(resolve.statusCode == 400) throw new Error("Api Error"); 
        const data = JSON.parse(resolve.body);
        setShaders(data);
      })
      .catch(err => {
        console.error("error:", err);
      })
  }, [])
  
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-bold text-7xl text-center"> Gallery </h1>
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-8">
      {shaders.filter((element)=>{return element.code.length > 0}).map((element)=>{
        const code = JSON.parse(element.code);
        return (
          <Shader key ={element.id} height = {300} width = {300} code = {code} author = {element.author} onError={()=>{}} onCompile={()=>{}}/>
        )
      })}
      </div>
    </div>
  )
}
function Footer(){
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center"> 2025 <a href="" className="hover:underline">8coolguy</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
            <li>
                <a href="/throwShader" className="hover:underline me-4 md:me-6">Throw Shader</a>
            </li>
            <li>
                <a href="/gallery" className="hover:underline me-4 md:me-6"> Gallery </a>
            </li>
            <li>
                <a href="mailto:arnavc02@gmail.com" className="hover:underline">Contact</a>
            </li>
        </ul>
    </footer>
  )
}