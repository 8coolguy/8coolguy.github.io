import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import image from "./PXL_20220508_032554805.jpeg"
import resume from "./resume.pdf";
import strava from "./strava.svg"
import linkedin from "./linkedin.svg"
import github from "./github.svg"
import instagram from "./instagram.svg"
import {BrowserRouter,Link,Route,Routes} from "react-router-dom";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return(
    <div className="App">
      
      <Navbar>
        <Container fluid>
            <Nav className="justify-content" style={{ width: "100%" }}>
            
            
            <Navbar.Brand href="https://www.instagram.com/notarnav123">
              <img
                src = {instagram} 
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Instagram"
              />
            </Navbar.Brand>
            <Navbar.Brand href="https://www.linkedin.com/in/arnavchoudhuryscu">
              <img
                src = {linkedin} 
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Linkedin"
              />
            </Navbar.Brand>
            <Navbar.Brand href="https://github.com/8coolguy">
              <img
                src = {github} 
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Github"
              />
            </Navbar.Brand>
            <Navbar.Brand href="https://www.strava.com/athletes/33234384">
              <img
                src = {strava} 
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Strava"
              />
            </Navbar.Brand>
            
            
            
            </Nav>
        </Container>
        <Container fluid>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <Nav.Link href="#background">About</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#other" disabled>Other</Nav.Link>
              <Nav.Link href="/resume">Resume</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <Row style={{backgroundImage:`url(${image})`}}  id="intro" >
        <Container className="section">
          <p>hii. My name is</p>
          <h1> Arnav Choudhury</h1>
          <p>
            I am an aspiring software engineer.
          </p>
          <p>:)</p>
        </Container>
      </Row>
      <br/>
      <Row id="background">
        <Container className="section">
          <h1>About</h1>
          <p> I am currently an undergrad Computer Science and Engineering student at Santa Clara University and I spend time building personal projects to improve my skills Right now I am focusing on Backend Development and Fullstack development, but I also have interests in Game Development and Machine Learning. Contact me at achoudhury2@scu.edu</p>
        </Container>
      </Row>
      
      <br/>
      <Row id="projects" >
        <Container className="section">
          <h1>Projects</h1>
          <div className="card-mb-6">

            <div className="row g-0">
              <div className="col-md-4">
                  <a href="https://devpost.com/software/chillspaces">
                  <img className="media-object" src="https://i.imgur.com/wjhMVRO.png" width="100%" height="100%"></img>
                  </a>
              </div>
              <div className="col-md-8">
                  <h4 className="card-title">Chill Spaces</h4>
                  <h6>Completed:November 13, 2022</h6>
                  <p className="card-text">Website that helps you find the quietest and least congested places in a city. Built with React and Flask. Won second place at Inrix Hackathon.</p>  
              </div>
            </div>
            <div className="row g-0">
              <div className="col-md-4">
                  <a href="https://goldfish-app-py52r.ondigitalocean.app/">
                  <img className="media-object" src="https://i.imgur.com/czxFKmU.jpg" width="100%" height="100%"></img>
                  </a>
              </div>
              <div className="col-md-8">
                  <h4 className="card-title">Carbon Footprint Tracker</h4>
                  <h6>Completed:September 10, 2022</h6>
                  <p className="card-text">Website that helps you track and visualize your carbon footprint by tracking six categories. Database and Authentication uses Firebase and Client side uses React with custom server made with Express</p>  
              </div>
            </div>
            <div className="row g-0">
              <div className="col-md-4">
                  <a href="https://github.com/8coolguy/BlogGraph">
                  <img className="media-object" src="https://imgur.com/VFgIFUX.png" width="100%" height="100%"></img>
                  </a>
              </div>
              <div className="col-md-8">
                  <h4 className="card-title">BlogGraph</h4>
                  <h6>Completed:July 1, 2022</h6>
                  <p className="card-text">Built a full stack React application that visualizes blogs as graphs where related blogs are connected by nodes. MongoDB for the database, Express for the server, and AWS for the file system and the authentication system.</p> 
              </div>
              </div>
            </div>
                

          <div className="card-mb-6">
              <div className="row g-0">
                  <div className="col-md-4">
                      <a href="https://github.com/8coolguy/cali-fire-analysis">
                      <img className="media-object" src="https://i.imgur.com/4DwHWaA.png" width="100%" height="100%"></img>
                      </a>
                  </div>
                  <div className="col-md-8">
                      <h4 className="card-title">California Predictive Fire Model</h4>
                      <h6>Completed:Dec. 21, 2021</h6>
                      <p className="card-text">With CAL Fire data of the past 10 years of wildfires, weather data, and local county data, I am trying to build a predictive fire model that tries to predict the size of a wild fire based on given variables. Work on this project is in progress.</p>  
                  </div>
              </div>
          </div>
    
          <div className="card-mb-6">
              <div className="row g-0">
                  <div className="col-md-4">
                      <a href="https://github.com/8coolguy/paper_prisons_crime_classifiers">
                      <img className="media-object" src="https://i.imgur.com/yG7f32h.png" width="100%" height="100%"></img>
                      </a>
                  </div>
                  <div className="col-md-8">
                      <h4 className="card-title">Paper Prisons Crime Classifiers Model</h4>
                      <h6>Completed:Oct. 20, 2021</h6>
                      <p className="card-text">Built a language processor that would be able to classify whether a criminal charge can be expunged or not. Able to classify 50% of the given datasets as expungeable or non-expungeable crime.</p>  
                  
                  
                  </div>
              </div>
          </div>
          
          <div className="card-mb-6">
              <div className="row g-0">
                  <div className="col-md-4">
                      <a href="https://github.com/8coolguy/eco-system-sim">
                      <img className="media-object" src="https://i.imgur.com/7WkeEGY.png" width="100%" height="100%"></img>
                      </a>
                  </div>
                  <div className="col-md-8">
                      <h4 className="card-title">Rabbit Ecosystem Simulation</h4>
                      <h6>Completed:July 23, 2021</h6>
                      <p className="card-text">Programmed a simulation of a rabbit ecosystem where I tracked how it reacted to external variables like predators, water, land features. Developed a Q learning reinforcement model for each rabbit to make decisions based on their surroundings. Utilized the concepts of polymorphism and inheritance to effectively create simulated animals.</p>  
                  
                  
                  </div>
              </div>
          </div>
          
          <div className="card-mb-6">
              <div className="row g-0">
                  <div className="col-md-4">
                      <a href="https://github.com/8coolguy/pcg-solar-system/">
                      <img className="media-object" src="https://i.imgur.com/6vtGrmj.gif" width="100%" height="100%"></img>
                      </a>
                  </div>
                  <div className="col-md-8">
                      <h4 className="card-title">Proceduraly Generated Solar System</h4>
                      <h6>Completed:June 29, 2021</h6>
                      <p className="card-text">Created a simulation using Unity that can proceduraly generate a solar system with unique planets and stars. Implemented different methods of coherent noise to planets to generate unique terrain on planets.</p>  
                  </div>
              </div>
          </div>
              
                
        </Container>
      </Row>
      
  
    </div>
  );
}

function Resume(){
  return(
    <div id="resume">
      <iframe title='Resume' src={resume} frameborder="0" height="100%" width="100%"></iframe>
    </div>
  )
}
