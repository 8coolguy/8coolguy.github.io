import './App.css';
import {projects, experiences, about} from './info.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import headshot from "./headshot.png";
import {BrowserRouter,Route,Routes} from "react-router-dom";
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
  return(
    <div className="App">      
      <Row  className="background" >
          <Col   md = {5}>
          <div className="left-container">
              <Image fluid className="headshot" src={headshot}></Image>
              <h1> Arnav Choudhury</h1>
              
              <div className="links">
                <Nav.Link className="link" href="#intro">About</Nav.Link>
                <Nav.Link className="link" href='#experience'>Experience</Nav.Link>
                <Nav.Link className="link" href="#projects">Projects</Nav.Link>
                <Nav.Link className="link" href="https://8coolguy.bearblog.dev/" >Blog</Nav.Link>
                <Nav.Link className="link" href="/resume.pdf">Resume</Nav.Link>
              </div>

              <Row>
                <Col  >
                  <a className="link" href ="https://www.instagram.com/notarnav123"> <FontAwesomeIcon size="2x" icon={faInstagram}/></a>
                </Col>
                <Col >
                  <a className="link" href="https://www.linkedin.com/in/arnav-choudhury-scu/" ><FontAwesomeIcon size="2x" icon={faLinkedin}/></a>
                </Col>
                <Col >
                  <a className="link" href="https://github.com/8coolguy" ><FontAwesomeIcon size="2x" icon={faGithub}/></a>
                </Col>
                <Col >
                  <a className="link" href="https://www.strava.com/athletes/33234384" ><FontAwesomeIcon size="2x" icon={faStrava}/></a>
                </Col>
              </Row>

            </div>
          </Col>
          <Col md ={7}>
            <Container className="right-container">
              <h2> About </h2>
              <Card className="car">
                <Card.Body>
                  <p>
                    {about}
                  </p>
                </Card.Body>
              </Card>

              <div id="experience">
                <h2> Experience </h2>
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
                <h2>Projects</h2>
                {projects.slice(0,12).map(project => 
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

                          {project.links.Devpost ? (<a className="link" href ={project.links.Devpost}> <FontAwesomeIcon size="lg" icon={faDev}/> </a>):<></>}
                          {project.links.Github ? (<a className="link" href ={project.links.Github}> <FontAwesomeIcon size="lg" icon={faGithub}/> </a>):<></>}
                          {project.links.Live ? (<a className="link" href ={project.links.Live}> <FontAwesomeIcon size="lg" icon={faArrowUpRightFromSquare} /> </a>):<></>}

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
