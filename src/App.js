import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import image from "./backshot.jpg";
import action from "./action.jpeg";
import notFound from "./notfound.png";
import resume from "./resume.pdf";
import strava from "./strava.svg";
import linkedin from "./linkedin.svg";
import github from "./github.svg";
import instagram from "./instagram.svg";
import headshot from "./headshot.png";
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
function NA(){
  return(
    <div>Work in Progress</div>);
}

function Home() {
  return(
    <div className="App">
      <Navbar className="navbar">
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
            <Navbar.Brand href="https://www.linkedin.com/in/arnav-choudhury-scu/">
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
              <Nav.Link href="#intro">About</Nav.Link>
              <Nav.Link href='#experience' disabled>Experience</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#other" disabled>Other</Nav.Link>
              
              <Nav.Link href="https://drive.google.com/file/d/1sjYX7RhOaZOO09FIlZL8K5ianLdb5Cpy/view?usp=sharing">Resume</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      
      
      
      <Row style={{backgroundImage:`url(${image})`}}  id="intro" >
        <Container className="section">
          <Row className="justify-content-md-center" md="auto">
            <Col className="m-auto">
              <img className="headshot" src={headshot}></img>
            </Col>
            <Col>
              
              <Card>
                  <Card.Body>
                <p>hii. My name is
                <h1 > Arnav Choudhury</h1>
                I am currently an undergrad Computer Science and Engineering student at Santa Clara University and I spend time building personal projects to improve my skills Right now I am focusing on Backend Development and Fullstack development, but I also have interests in Game Development and Machine Learning. Contact me at achoudhury2@scu.edu
                </p>
                </Card.Body>
              </Card>
              
            </Col>
          </Row> 
        </Container>
      </Row>
      
    
      
      
    
      <Row id="projects" >
        <Container className="section">
          <h1>Projects</h1>
          <Row xs={1} md={2} className="g-4">
          <Card className='project' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://i.imgur.com/wjhMVRO.png" />
            <Card.Body>
              <Card.Title>Chill Spaces</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">November 2022</Card.Subtitle>
              <Card.Text>
                Website that helps you find the quietest parts of a city. Built with React, Firebase, and Flask.
              </Card.Text>
              <Card.Link href="https://devpost.com/software/chillspaces">Devpost</Card.Link>
            </Card.Body>
          </Card>
          
          <Card className='project' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://i.imgur.com/czxFKmU.jpg" />
            <Card.Body>
              <Card.Title>Carbon Footprint Tracker</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">September 2022</Card.Subtitle>
              <Card.Text>
                Website that helps you track and visualize your carbon footprint by tracking six categories of usage. Built with React and Firebase.
              </Card.Text>
              <Card.Link href="#">Github</Card.Link>
            </Card.Body>
          </Card>

          <Card className='project' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://imgur.com/VFgIFUX.png" />
            <Card.Body>
              <Card.Title>Blog Graph</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">July 2022</Card.Subtitle>
              <Card.Text>
                Website that helps you blog with a graph visualization. Built with React, Mongo and AWS.
              </Card.Text>
              <Card.Link href="https://github.com/8coolguy/BlogGraph">Github</Card.Link>
            </Card.Body>
          </Card>
          <Card className='project' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://i.imgur.com/4DwHWaA.png" />
            <Card.Body>
              <Card.Title>California Predictive Fire Model</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">December 2021</Card.Subtitle>
              <Card.Text>
              With CAL Fire data of the past 10 years of wildfires, weather data, and local county data, I am trying to build a predictive fire model that tries to predict the size of a wild fire based on given variables.
              </Card.Text>
              <Card.Link href="https://github.com/8coolguy/cali-fire-analysis">Github</Card.Link>
            </Card.Body>
          </Card>
          <Card className='project' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://i.imgur.com/yG7f32h.png" />
            <Card.Body>
              <Card.Title>Paper Prisons Crime Classifiers Model</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">October 2021</Card.Subtitle>
              <Card.Text>
                Built a language processor that would be able to classify whether a criminal charge can be expunged or not. Able to classify 50% of the given datasets as expungeable or non-expungeable crime.
              </Card.Text>
              <Card.Link href="https://github.com/8coolguy/paper_prisons_crime_classifiers">Github</Card.Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://i.imgur.com/7WkeEGY.png" />
            <Card.Body>
              <Card.Title>Rabbit Ecosystem Simulation</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">July 2021</Card.Subtitle>
              <Card.Text>
              Programmed a simulation of a rabbit ecosystem where I tracked how it reacted to external variables like predators, water, land features. Developed a Q learning reinforcement model for each rabbit to make decisions based on their surroundings. Utilized the concepts of polymorphism and inheritance to effectively create simulated animals.
              </Card.Text>
              <Card.Link href="https://github.com/8coolguy/eco-system-sim">Github</Card.Link>
            </Card.Body>
          </Card>

          <Card className='project' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://i.imgur.com/6vtGrmj.gif" />
            <Card.Body>
              <Card.Title>Proceduraly Generated Solar System</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">June 2021</Card.Subtitle>
              <Card.Text>
              Created a simulation using Unity that can proceduraly generate a solar system with unique planets and stars. Implemented different methods of coherent noise to planets to generate unique terrain on planets.
              </Card.Text>
              <Card.Link href="https://github.com/8coolguy/pcg-solar-system/">Github</Card.Link>
            </Card.Body>
          </Card>
          </Row>
    
          

            
            
            
                

          
          
        
          
          
          
          
              
                
        </Container>
      </Row>
      <Row id="triathlon" >
        <Container className="section">
        <h1>Triathlon</h1>
        <Row>

        <Col xs={6} md={4}>
        <img className="action" src={action}></img>
        </Col>
        <Col xs={6} md={4}>
        <Card>
          <Card.Body>I am currently the vice president of the Santa Clara Triathlon club. We are trying to grow and collabrative and competitve environment for new and experienced members to thrive. I also work hard to try to compete at a high level </Card.Body>
        </Card>
          
        </Col>
        <Col xs={6} md={4}><iframe height='454' width='300' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/33234384/latest-rides/b83afe7a36c7074e111ae54598b2463d5166cb3d'></iframe></Col>
        
        </Row>  
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
