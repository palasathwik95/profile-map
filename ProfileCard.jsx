import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { validateCoordinates } from '../../services/mapService';

const ProfileCard = ({ profile }) => {
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState(null);

  const handleShowMap = () => {
    if (!validateCoordinates(profile.coordinates)) {
      setError('Invalid location coordinates');
      return;
    }
    setError(null);
    setShowMap(true);
  };

  const handleCloseMap = () => setShowMap(false);

  return (
    <>
      <Card className="profile-card h-100 shadow-sm">
        <Card.Img 
          variant="top" 
          src={profile.photo} 
          alt={`${profile.name}'s photo`} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h5 mb-2">{profile.name}</Card.Title>
          <Card.Text className="mb-3">{profile.description}</Card.Text>
          <Card.Text className="text-muted small mb-3">{profile.address}</Card.Text>
          
          <div className="mt-auto d-flex justify-content-between">
            <Button 
              variant="outline-primary" 
              as={Link} 
              to={`/profile/${profile.id}`}
              className="px-3"
            >
              View Details
            </Button>
            <Button 
              onClick={handleShowMap} 
              variant="primary"
              className="summary-btn"
            >
              Summary
            </Button>
          </div>
          
          {error && (
            <div className="text-danger mt-2 small">
              {error}
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showMap} onHide={handleCloseMap} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{profile.name}'s Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">{profile.address}</p>
          <div style={{ height: '400px', width: '100%' }}>
            <MapContainer 
              center={profile.coordinates} 
              zoom={13} 
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMap}>
            Close
          </Button>
          <Button 
            variant="primary" 
            as={Link} 
            to={`/profile/${profile.id}`}
            onClick={handleCloseMap}
          >
            View Full Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileCard;