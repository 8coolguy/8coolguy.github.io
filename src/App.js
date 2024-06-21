import './App.css';
import {projects, experiences} from './info.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import strava from "./strava.svg";
import linkedin from "./linkedin.svg";
import github from "./github.svg";
import instagram from "./instagram.svg";
import headshot from "./headshot.png";
import resume from "./resume.pdf";
import {BrowserRouter,Route,Routes} from "react-router-dom";



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
      <Row  id="intro" >
        <Row className="justify-content-md-center" md="auto">
          <Col md = {6}>
            <header className="left-container">
              <Row>
                <Col className="m-auto">
                  <Image className="headshot" src={headshot}></Image>
                  <h1> Arnav </h1>
                </Col>
              </Row>
              <Row>
                <Container fluid>
                  <Nav className="justify-content-end" style={{ width: "100%" }}>
                  <Nav.Link href="#intro">About</Nav.Link>
                  <Nav.Link href='#experience'>Experience</Nav.Link>
                  <Nav.Link href="#projects">Projects</Nav.Link>
                  <Nav.Link href="#other" disabled>Other</Nav.Link>
                  <Nav.Link href="/resume">Resume</Nav.Link>
                </Nav>
                </Container>
              </Row>
              <Row fluid class="containerfluid flex items-center">
                  <Col href="https://www.instagram.com/notarnav123">
                    <Image
                      src = {instagram} 
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="Instagram"
                    />
                  </Col>
                  <Col href="https://www.linkedin.com/in/arnav-choudhury-scu/">
                    <Image
                      src = {linkedin} 
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="Linkedin"
                    />
                  </Col>
                  <Col href="https://github.com/8coolguy">
                    <Image
                      src = {github} 
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="Github"
                    />
                  </Col>
                  <Col href="https://www.strava.com/athletes/33234384">
                    <Image
                      src = {strava} 
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="Strava"
                    />
                  </Col>
              </Row>   
            </header>
          </Col>
          
          
          <Col md ={6}>
            <Container className="right-container">
              <Card>
                <Card.Body>
                  <p>
                  I am currently an  Computer Science and Engineering Grad. and I spend time building personal projects to improve my skills Right now I am focusing on Backend Development and Fullstack development, but I also have interests in Game Development and Machine Learning. Contact me at achoudhury2@scu.edu
                  </p>
                </Card.Body>
              </Card>
              <div id="experience">
                {experiences.map(job => 
                  <Card mb ={3} className="experience">
                    <Row g={0} className = "flex" noGutters>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Subtitle className="text-muted">{job.date.start} -- {job.date.end}</Card.Subtitle>
                      <Card.Text>{job.description}</Card.Text>
                    </Card.Body>
                    </Row>
                  </Card>
                )}     
              </div>
              <div id="projects">
                {/* <h1>Projects</h1> */}
                {projects.slice(0,8).map(project => 
                  <Card mb ={3} className="project">
                    <Row g={0} className = "flex" noGutters>
                    <Col md = {4} >
                      <Image fluid className="img-fluid" src={project.image} />
                    </Col>
                    <Col md = {8}>
                    <Card.Body>
                      <Card.Title>{project.name}</Card.Title>
                      <Card.Subtitle className="text-muted">{project.date}</Card.Subtitle>
                      <Card.Text>
                        {project.description}
                      </Card.Text>
                      {project.links.Devpost ? (<Card.Link href ={project.links.Devpost}> Devpost </Card.Link>):<></>}
                      {project.links.Github ? (<Card.Link href ={project.links.Github}> Github </Card.Link>):<></>}
                      {project.links.Live ? (<Card.Link href ={project.links.Live}> Live </Card.Link>):<></>}
                      
                    </Card.Body>
                    </Col>
                    </Row>
                  </Card>
                )}     
              </div>
            </Container>
          </Col>
        </Row>
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
