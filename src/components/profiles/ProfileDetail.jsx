import { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { validateCoordinates } from '../../services/mapService';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const ProfileDetail = ({ profile }) => {
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(null);
  
  useEffect(() => {
    if (profile && profile.coordinates) {
      if (validateCoordinates(profile.coordinates)) {
        setMapReady(true);
        setMapError(null);
      } else {
        setMapError('Invalid location coordinates');
        setMapReady(false);
      }
    }
  }, [profile]);

  if (!profile) return <LoadingSpinner />;

  return (
    <Row className="profile-detail page-transition">
      <Col md={4} className="mb-4 mb-md-0">
        <Card className="border-0 shadow-sm h-100">
          <Card.Img 
            variant="top" 
            src={profile.photo} 
            alt={`${profile.name}'s photo`}
            style={{ height: '300px', objectFit: 'cover' }} 
          />
          <Card.Body>
            <Card.Title as="h2" className="mb-3">{profile.name}</Card.Title>
            <Card.Text>{profile.description}</Card.Text>
            
            <h6 className="mt-4 mb-2">Contact Information</h6>
            <ListGroup variant="flush">
              <ListGroup.Item className="px-0 py-2">
                <strong>Email:</strong> {profile.email}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 py-2">
                <strong>Phone:</strong> {profile.phone}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 py-2">
                <strong>Address:</strong> {profile.address}
              </ListGroup.Item>
            </ListGroup>
            
            <h6 className="mt-4 mb-2">Interests</h6>
            <div>
              {profile.interests && profile.interests.map((interest, index) => (
                <Badge 
                  key={index} 
                  bg="primary" 
                  className="me-2 mb-2 py-2 px-3"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={8}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Body>
            <Card.Title as="h3" className="mb-4">Location</Card.Title>
            <Card.Text className="mb-3">{profile.address}</Card.Text>
            
            {mapError ? (
              <ErrorMessage message={mapError} />
            ) : (
              <div style={{ height: '500px', width: '100%' }}>
                {mapReady && (
                  <MapContainer 
                    center={profile.coordinates} 
                    zoom={14} 
                    style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={profile.coordinates}>
                      <Popup>
                        <strong>{profile.name}</strong><br />
                        {profile.address}
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileDetail;