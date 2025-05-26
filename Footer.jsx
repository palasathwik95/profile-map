import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Profile Map App</h5>
            <p className="mb-0">
              Explore profiles and their locations interactively.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">
              &copy; {year} Profile Map. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;