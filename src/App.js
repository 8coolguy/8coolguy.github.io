import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import image from "./PXL_20220508_032554805.jpeg"





function App() {
  return(
    <div className="App">
      <Navbar>
        <Container fluid>
      
            <Nav className="justify-content-end" style={{ width: "100%" }}>
            
              
              <Nav.Link href="#background">About</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#other">Other</Nav.Link>

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
      <Row id="skills" >
        
        <Container className="section">
        <h1>Skills</h1>
          <div className="skillz">
            <div className="skillz__category"> 
            <div className="skillz__category__label">Languages</div> 
              <ul> 
                <li className="skillz__category__item">Python</li>
                <li className="skillz__category__item">Javascript</li> 
                <li className="skillz__category__item">Java</li> 
                <li className="skillz__category__item">C++</li> 
                <li className="skillz__category__item">C#</li> 
              </ul> </div> 
            <div className="skillz__category">
            <div className="skillz__category__label">Frameworks</div> 
              <ul> 
                <li className="skillz__category__item">React</li> 
                <li className="skillz__category__item">Django</li> 
                <li className="skillz__category__item">Flask</li> 
                <li className="skillz__category__item">Node</li> 
                <li className="skillz__category__item">Express</li> 
                <li className="skillz__category__item">Unity</li> 
                <li className="skillz__category__item">Pandas</li> 
                </ul> 
              </div> 
            <div className="skillz__category"> 
              <div className="skillz__category__label">Tools</div> 
              <ul> 
                <li className="skillz__category__item">Bash</li>
                <li className="skillz__category__item">Git</li> 
                <li className="skillz__category__item">Firebase</li> 
                <li className="skillz__category__item">AWS</li> 
                <li className="skillz__category__item">Postman</li> 
                <li className="skillz__category__item">MongoDB</li> 
              </ul> </div> 
              <div className="skillz__category"> 
              <div className="skillz__category__label">OS</div> 
              <ul> 
                <li className="skillz__category__item">Linux</li> 
                <li className="skillz__category__item">Windows</li> 
                </ul> 
                
              </div>
            </div>

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
                  <a href="https://carbon-footprint-web.herokuapp.com/login">
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
                  <a href="https://blograph.herokuapp.com/home">
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
      <div orientation="left" className="hOvuuP">
        <ul className="">
        <li>
          <a href="https://github.com/8coolguy" aria-label="GitHub" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github">
              <title>GitHub</title>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </li>
        <li>
          
          <a href="https://www.strava.com/athletes/33234384" aria-label="Strava" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" width="40" height="40" viewBox="0 -2 18 18" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-strava">
              <title>Strava</title>
              <path d="M6.731 0 2 9.125h2.788L6.73 5.497l1.93 3.628h2.766L6.731 0zm4.694 9.125-1.372 2.756L8.66 9.125H6.547L10.053 16l3.484-6.875h-2.112z"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/arnavchoudhuryscu" aria-label="Linkedin" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-linkedin">
              <title>LinkedIn</title>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2">
              </circle>
            </svg>
            </a>
        </li>
        <li>
        <a href="https://www.instagram.com/notarnav123" aria-label="Instagram" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram">
          <title>Instagram</title>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          </a>
          </li>
        </ul>
      </div>
      
    

    </div>

    
  );
}

export default App;
