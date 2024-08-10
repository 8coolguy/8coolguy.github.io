import './App.css';
import {projects, experiences, about} from './info.js';
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
import {BrowserRouter,Route,Routes} from "react-router-dom";

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
  return(
    <div className="App">      
      <Row  className="background" >
          <Col md = {4}>
            <div className="left-container">
              <Image fluid className="headshot" src={headshot}></Image>
              <h1> Arnav Choudhury</h1>
              <div className="links">
                <Nav.Link className="link" href="#intro">About</Nav.Link>
                <Nav.Link className="link" href='#experience'>Experience</Nav.Link>
                <Nav.Link className="link" href="#projects">Projects</Nav.Link>
                <Nav.Link className="link" href="https://blog-two-teal-35.vercel.app/" >Blog</Nav.Link>
                <Nav.Link className="link" href="/resume.pdf">Resume</Nav.Link>
              </div>


            <Row>
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
            </div>
          </Col>
          <Col md ={8}>
            <Container className="right-container">
              <h1> About </h1>
              <Card className="car">
                <Card.Body>
                  <p>
                    {about}
                  </p>
                </Card.Body>
              </Card>

              <div id="experience">
                <h1> Experience </h1>
                {experiences.map(job => 
                  <Card className="car" mb ={3}>
                    <Row g={0} noGutters>
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
                <h1>Projects</h1>
                {projects.slice(0,7).map(project => 
                  <Card className="car" mb ={3}> 
                    <Row g={0}>
                      <Col md = {4} >
                        <Image fluid src={project.image} />
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
    </div>
  );
}
