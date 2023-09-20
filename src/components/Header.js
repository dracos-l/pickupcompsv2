import React from 'react';
import DropdownMenu from './DropdownMenu';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const Header = () => {
  return (
    <header>
      <nav>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top">
          <Container fluid>
            <Navbar.Brand href="#home">
                React-Bootstrap
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav class="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    About Us
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    About the Project
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Contact Us
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
  </header>
  );
}

export default Header;
