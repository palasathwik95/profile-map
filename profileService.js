import axios from 'axios';

// In a real application, this would be an API URL
// For demo purposes, we'll use a mock data approach
const MOCK_PROFILES = [
  {
    id: '1',
    name: 'John Doe',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Software Engineer with 5 years of experience',
    address: '123 Tech Street, San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    interests: ['Programming', 'Hiking', 'Photography'],
    coordinates: [37.7749, -122.4194]
  },
  {
    id: '2',
    name: 'Jane Smith',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'UX Designer passionate about user experiences',
    address: '456 Design Avenue, New York, NY',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    interests: ['Design', 'Travel', 'Reading'],
    coordinates: [40.7128, -74.0060]
  },
  {
    id: '3',
    name: 'Michael Johnson',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Marketing Specialist with expertise in digital campaigns',
    address: '789 Marketing Blvd, Chicago, IL',
    email: 'michael.johnson@example.com',
    phone: '(555) 456-7890',
    interests: ['Marketing', 'Sports', 'Music'],
    coordinates: [41.8781, -87.6298]
  },
  {
    id: '4',
    name: 'Emily Wilson',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Data Scientist specializing in machine learning',
    address: '101 Data Drive, Seattle, WA',
    email: 'emily.wilson@example.com',
    phone: '(555) 234-5678',
    interests: ['Data Science', 'Chess', 'Mountain Biking'],
    coordinates: [47.6062, -122.3321]
  }
];

// Simulates API fetch with a delay
export const fetchProfiles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROFILES);
    }, 800); // Simulate network delay
  });
};

export const getProfileById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const profile = MOCK_PROFILES.find(p => p.id === id);
      if (profile) {
        resolve(profile);
      } else {
        reject(new Error('Profile not found'));
      }
    }, 500);
  });
};

export const addProfile = (profileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProfile = {
        id: Date.now().toString(),
        ...profileData
      };
      MOCK_PROFILES.push(newProfile);
      resolve(newProfile);
    }, 800);
  });
};

export const updateProfile = (id, profileData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_PROFILES.findIndex(p => p.id === id);
      if (index !== -1) {
        const updatedProfile = { ...MOCK_PROFILES[index], ...profileData };
        MOCK_PROFILES[index] = updatedProfile;
        resolve(updatedProfile);
      } else {
        reject(new Error('Profile not found'));
      }
    }, 800);
  });
};

export const deleteProfile = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_PROFILES.findIndex(p => p.id === id);
      if (index !== -1) {
        MOCK_PROFILES.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error('Profile not found'));
      }
    }, 800);
  });
};

// In a real application, these functions would make actual API calls
// Example of a real API call:
/*
export const fetchProfiles = async () => {
  try {
    const response = await axios.get('/api/profiles');
    return response.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};
*/