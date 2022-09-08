import './App.css';
import Stack from 'react-bootstrap/Stack';
import SidebarMenu from 'react-bootstrap-sidebar-menu';

function App() {
  return (

    <div className="App">
      <SidebarMenu>
        <SidebarMenu.Header>
          <SidebarMenu.Brand>
            {"another icon"}
          </SidebarMenu.Brand>
          <SidebarMenu.Toggle />
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {"Hello"}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>
                {"Help 2"}
              </SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
          </SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon />
              <SidebarMenu.Nav.Title>
                {"Help"}
              </SidebarMenu.Nav.Title>
            </SidebarMenu.Sub.Toggle>
            <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Icon>
                    {"Projects"}
                  </SidebarMenu.Nav.Icon>
                  <SidebarMenu.Nav.Title>
                    {"About"}
                  </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Body>
      </SidebarMenu>
      <Stack gap={3}>
        <div className="bg-light border">First item</div>
        <div className="bg-light border">Second item</div>
        <div className="bg-light border">Third item</div>
      </Stack>
    </div>
  );
}

export default App;
