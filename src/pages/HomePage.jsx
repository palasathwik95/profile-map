import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileList from '../components/profiles/ProfileList';

const HomePage = () => {
  return (
    <div className="page-transition">
      <div className="bg-light py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start">
              <h1 className="display-4 fw-bold mb-4">Profile Map Explorer</h1>
              <p className="lead mb-4">
                Discover and explore profiles on an interactive map. View detailed information about each profile and their geographic location.
              </p>
              <Button 
                as={Link} 
                to="/admin" 
                variant="primary" 
                size="lg" 
                className="px-4 py-2"
              >
                Manage Profiles
              </Button>
            </Col>
            <Col md={4} className="d-none d-md-block">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="People collaborating" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <ProfileList />
      </Container>
    </div>
  );
};

export default HomePage;