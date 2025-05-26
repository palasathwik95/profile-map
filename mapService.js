// Map service for handling map-related functionality

// Function to get the map position for a profile based on coordinates
export const getMapPosition = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
    // Default to San Francisco if coordinates are invalid
    return {
      center: [37.7749, -122.4194],
      zoom: 13
    };
  }
  
  return {
    center: coordinates,
    zoom: 13
  };
};

// Function to validate coordinates
export const validateCoordinates = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }
  
  const [latitude, longitude] = coordinates;
  
  // Check if latitude and longitude are valid numbers
  if (isNaN(latitude) || isNaN(longitude)) {
    return false;
  }
  
  // Check if latitude is between -90 and 90
  if (latitude < -90 || latitude > 90) {
    return false;
  }
  
  // Check if longitude is between -180 and 180
  if (longitude < -180 || longitude > 180) {
    return false;
  }
  
  return true;
};

// Function to format address for display
export const formatAddress = (address) => {
  if (!address) return 'Address not available';
  return address;
};

// Function to geocode an address (in a real app, this would call a geocoding API)
export const geocodeAddress = (address) => {
  // This is a mock function. In a real app, you would call a geocoding API
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Mock response - would normally come from a geocoding API
      // Randomly generating coordinates near San Francisco for demo purposes
      const lat = 37.7749 + (Math.random() - 0.5) * 0.1;
      const lng = -122.4194 + (Math.random() - 0.5) * 0.1;
      
      resolve({
        coordinates: [lat, lng],
        formattedAddress: address
      });
    }, 1000);
  });
};

// Helper function to create a custom marker icon
export const createMarkerIcon = (color = 'blue') => {
  // In a real app, you might return a Leaflet icon configuration
  // For this mock service, we'll just return the color
  return color;
};