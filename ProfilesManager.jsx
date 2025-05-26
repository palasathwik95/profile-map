import { useState } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import { useProfiles } from '../../context/ProfileContext';
import ProfileForm from './ProfileForm';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProfilesManager = () => {
  const { profiles, loading, error, addNewProfile, editProfile, removeProfile } = useProfiles();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [actionResult, setActionResult] = useState({ show: false, message: '', variant: 'success' });

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProfile(null);
  };

  const handleShowEditModal = (profile) => {
    setSelectedProfile(profile);
    setShowEditModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProfile(null);
  };

  const handleShowDeleteModal = (profile) => {
    setSelectedProfile(profile);
    setShowDeleteModal(true);
  };

  const handleAddProfile = async (profileData) => {
    try {
      await addNewProfile(profileData);
      setShowAddModal(false);
      setActionResult({
        show: true,
        message: 'Profile added successfully!',
        variant: 'success'
      });
    } catch (error) {
      setActionResult({
        show: true,
        message: `Failed to add profile: ${error.message}`,
        variant: 'danger'
      });
    }
  };

  const handleEditProfile = async (profileData) => {
    try {
      await editProfile(selectedProfile.id, profileData);
      setShowEditModal(false);
      setSelectedProfile(null);
      setActionResult({
        show: true,
        message: 'Profile updated successfully!',
        variant: 'success'
      });
    } catch (error) {
      setActionResult({
        show: true,
        message: `Failed to update profile: ${error.message}`,
        variant: 'danger'
      });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await removeProfile(selectedProfile.id);
      setShowDeleteModal(false);
      setSelectedProfile(null);
      setActionResult({
        show: true,
        message: 'Profile deleted successfully!',
        variant: 'success'
      });
    } catch (error) {
      setActionResult({
        show: true,
        message: `Failed to delete profile: ${error.message}`,
        variant: 'danger'
      });
    }
  };

  const clearActionResult = () => {
    setActionResult({ show: false, message: '', variant: 'success' });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="profile-manager">
      {actionResult.show && (
        <Alert 
          variant={actionResult.variant} 
          dismissible 
          onClose={clearActionResult}
          className="mb-4"
        >
          {actionResult.message}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Profiles</h2>
        <Button variant="success" onClick={handleShowAddModal}>
          Add New Profile
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {profiles.length === 0 ? (
        <div className="text-center py-5">
          <p>No profiles found. Add a new profile to get started.</p>
        </div>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.description.substring(0, 50)}...</td>
                <td>{profile.address}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleShowEditModal(profile)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleShowDeleteModal(profile)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Profile Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileForm onSubmit={handleAddProfile} formType="add" />
        </Modal.Body>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProfile && (
            <ProfileForm 
              profile={selectedProfile} 
              onSubmit={handleEditProfile} 
              formType="edit" 
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the profile for {selectedProfile?.name}? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile}>
            Delete Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilesManager;