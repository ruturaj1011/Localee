import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import LocationSelector from '../utils/LocationSelector';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../utils/SearchBox';
import { useFlash } from '../contexts/flashContext';

function SearchServices() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedService, setSelectedService] = useState("");
  const { addFlashMessage } = useFlash();


  const handleServiceSelect = (service) => {
    setSelectedService(service);
    localStorage.setItem('service', service);
  };

  useEffect(() => {
    const storedLoc = localStorage.getItem('location');
    const storedCoord = JSON.parse(localStorage.getItem('coordinates'));
    if (storedLoc && storedCoord) {
      setLocation(storedLoc);
      setCoordinates(storedCoord);
    }

    const storedSer = localStorage.getItem('service');
    if (storedSer) {
      setSelectedService(storedSer);
    }
  }, []);

  const handleLocationSelect = (selectedLocation, lat, lng) => {
    setLocation(selectedLocation);
    setCoordinates({ lat, lng });
    localStorage.setItem('location', selectedLocation);
    localStorage.setItem('coordinates', JSON.stringify({ lat, lng }));
  };

  const handleSearch = () => {
    if (!location || !selectedService) {
      addFlashMessage('Please select a location and service!', 'info');
      return;
    }

    navigate(`/services/${selectedService}`, { state: { service: selectedService, location, coordinates } });
  };

  return (
    <div className="text-center">
      <div className="mt-10 justify-center items-end lg:flex md:flex gap-2">
        <LocationSelector location={location} setLocation={handleLocationSelect} />
        <SearchBox onServiceSelect={handleServiceSelect} />
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