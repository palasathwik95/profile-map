import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Profile Map
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;