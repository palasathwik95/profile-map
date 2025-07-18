import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useProfiles } from '../context/ProfileContext';
import ProfileDetail from '../components/profiles/ProfileDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProfileById, loading, error } = useProfiles();
  const [profile, setProfile] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const profileData = getProfileById(id);
        if (profileData) {
          setProfile(profileData);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setNotFound(true);
      }
    };

    fetchProfileDetails();
  }, [id, getProfileById]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  
  if (notFound) {
    return (
      <Container className="py-5 text-center">
        <ErrorMessage message="Profile not found. The profile you're looking for may have been removed or doesn't exist." />
        <Button 
          variant="primary" 
          onClick={handleGoBack} 
          className="mt-3"
        >
          Go Back
        </Button>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <ErrorMessage message={error} />
        <Button 
          variant="primary" 
          onClick={handleGoBack} 
          className="mt-3"
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button 
        variant="outline-primary" 
        onClick={handleGoBack} 
        className="mb-4"
      >
        &larr; Back
      </Button>
      <ProfileDetail profile={profile} />
    </Container>
  );
};

export default ProfilePage;