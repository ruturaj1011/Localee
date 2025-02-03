import React, { useState, useEffect } from 'react';
import LocationSelector from '../../utils/LocationSelector';
import SearchBox from '../../utils/SearchBox';
import { useNavigate } from 'react-router-dom';

const Filters = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedService, setSelectedService] = useState('');
  const [selectedRating, setSelectedRating] = useState('4 stars & above');

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    localStorage.setItem('service', service);
  };

  useEffect(() => {
    const storedSer = localStorage.getItem('service');
    if (storedSer) {
      setSelectedService(storedSer);
    }
  }, []);

  useEffect(() => {
    const storedLoc = localStorage.getItem('location');
    const storedCoord = JSON.parse(localStorage.getItem('coordinates'));
    if (storedLoc && storedCoord) {
      setLocation(storedLoc);
      setCoordinates(storedCoord);
    }
  }, []);

  const handleLocationSelect = (selectedLocation, lat, lng) => {
    setLocation(selectedLocation);
    setCoordinates({ lat, lng });
    localStorage.setItem('location', selectedLocation);
    localStorage.setItem('coordinates', JSON.stringify({ lat, lng }));
  };

  const navigate = useNavigate();
  const handleApplyFilters = () => {
    navigate(`/services/${selectedService}`, { state: { service: selectedService, location, coordinates } });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-72 border border-gray-200 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      <div className="space-y-4">
        <div className="w-72">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Change Search
          </label>
          <SearchBox service={selectedService} onServiceSelect={handleServiceSelect} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Location
          </label>
          <LocationSelector location={location} setLocation={handleLocationSelect} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Ratings
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option>4 stars & above</option>
            <option>3 stars & above</option>
          </select>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handleApplyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;