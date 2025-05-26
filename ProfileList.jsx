import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useProfiles } from '../../context/ProfileContext';
import ProfileCard from './ProfileCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const ProfileList = () => {
  const { profiles, loading, error } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Filter profiles based on search term and filter criteria
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCriteria === 'all') return matchesSearch;
    
    // Additional filters could be added here based on other criteria
    return matchesSearch;
  });

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <InputGroup>
            <Form.Control
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search profiles"
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select 
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            aria-label="Filter profiles"
          >
            <option value="all">All Profiles</option>
            <option value="san-francisco">San Francisco</option>
            <option value="new-york">New York</option>
            <option value="chicago">Chicago</option>
            <option value="seattle">Seattle</option>
          </Form.Select>
        </Col>
      </Row>

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-5">
          <h3>No profiles found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredProfiles.map(profile => (
            <Col key={profile.id} xs={12} md={6} lg={4} className="mb-4">
              <ProfileCard profile={profile} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProfileList;