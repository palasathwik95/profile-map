import { Container, Row, Col, Card } from 'react-bootstrap';
import ProfilesManager from '../components/admin/ProfilesManager';

const AdminPage = () => {
  return (
    <Container className="py-5 page-transition">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Admin Dashboard</h1>
          <p className="lead">
            Manage profiles in the system. Add new profiles, edit existing ones, or remove profiles as needed.
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <ProfilesManager />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;