import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import LocationSelector from '../utils/LocationSelector';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../utils/SearchBox';

function SearchServices() {
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedService, setSelectedService] = useState("");

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    localStorage.setItem('service', service); // Use the newly selected service
    console.log('Selected Service:', service); // Log the correct value
  };

  // Check localStorage for previously selected location
  useEffect(() => {
    const storedLoc = localStorage.getItem('location');
    const storedCoord = JSON.parse(localStorage.getItem('coordinates'));
    if (storedLoc && storedCoord) {
      setLocation(storedLoc);
      setCoordinates(storedCoord);
    }
  }, []);

  // Handle location selection
  const handleLocationSelect = (selectedLocation, lat, lon) => {
    setLocation(selectedLocation);
    setCoordinates({ lat, lng: lon });
    localStorage.setItem('location', selectedLocation);
    localStorage.setItem('coordinates', JSON.stringify({ lat, lng: lon }));
  };

  const handleSearch = () => {
    if (!location || !selectedService) {
      alert('Please select a location and service to search for services.');
      return;
    }

    console.log('Searching for services in:', location, coordinates, selectedService);
    navigate('/findServices'); // Navigate to results page
  };

  return (
    <div className="text-center">
      <div className="mt-10 justify-center items-end lg:flex md:flex gap-2">
        {/* Location Selector */}
        <LocationSelector location={location} setLocation={handleLocationSelect} />

        <SearchBox onServiceSelect={handleServiceSelect}/>
        
        {/* Search Button */}
        <button
          className="w-full md:w-auto px-8 py-3 my-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
          onClick={handleSearch}
        >
          Search Services
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default SearchServices;
