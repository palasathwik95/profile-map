import { createContext, useState, useEffect, useContext } from 'react';
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from '../services/profileService';

const ProfileContext = createContext();

export const useProfiles = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        const data = await fetchProfiles();
        setProfiles(data);
        setError(null);
      } catch (err) {
        setError('Failed to load profiles. Please try again later.');
        console.error('Error loading profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const addNewProfile = async (profileData) => {
    try {
      setLoading(true);
      const newProfile = await addProfile(profileData);
      setProfiles([...profiles, newProfile]);
      return newProfile;
    } catch (err) {
      setError('Failed to add profile. Please try again.');
      console.error('Error adding profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async (id, profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await updateProfile(id, profileData);
      setProfiles(profiles.map(profile => 
        profile.id === id ? updatedProfile : profile
      ));
      return updatedProfile;
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeProfile = async (id) => {
    try {
      setLoading(true);
      await deleteProfile(id);
      setProfiles(profiles.filter(profile => profile.id !== id));
    } catch (err) {
      setError('Failed to delete profile. Please try again.');
      console.error('Error deleting profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfileById = (id) => {
    return profiles.find(profile => profile.id === id) || null;
  };

  const value = {
    profiles,
    loading,
    error,
    addNewProfile,
    editProfile,
    removeProfile,
    getProfileById,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};