import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { geocodeAddress } from '../../services/mapService';

const ProfileForm = ({ profile, onSubmit, formType = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    interests: '',
    coordinates: [0, 0]
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (profile && formType === 'edit') {
      setFormData({
        ...profile,
        interests: profile.interests ? profile.interests.join(', ') : ''
      });
    }
  }, [profile, formType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setFormData(prev => ({ ...prev, address }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Process the interests array
      const interestsArray = formData.interests
        .split(',')
        .map(item => item.trim())
        .filter(item => item);
      
      // Geocode the address to get coordinates
      const geocodeResult = await geocodeAddress(formData.address);
      
      const submissionData = {
        ...formData,
        interests: interestsArray,
        coordinates: geocodeResult.coordinates
      };
      
      await onSubmit(submissionData);
    } catch (err) {
      setError('There was an error processing your submission. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="admin-form">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Enter photo URL"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid URL for the photo.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a brief description"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a description.
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleAddressChange}
          placeholder="Enter full address"
          required
        />
        <Form.Text className="text-muted">
          The address will be geocoded to get coordinates for the map.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Please provide an address.
        </Form.Control.Feedback>
      </Form.Group>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3">
        <Form.Label>Interests (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="e.g. Photography, Travel, Cooking"
        />
        <Form.Text className="text-muted">
          Enter interests separated by commas.
        </Form.Text>
      </Form.Group>
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
          className="px-4 py-2"
        >
          {loading ? 'Processing...' : formType === 'edit' ? 'Update Profile' : 'Add Profile'}
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;