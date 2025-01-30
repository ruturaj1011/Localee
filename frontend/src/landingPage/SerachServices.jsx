import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import LocationSelector from '../utils/LocationSelector';
import { useNavigate} from "react-router-dom";

function SearchServices() {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleLocationSelect = (selectedLocation, lat, lon) => {
    setLocation(selectedLocation);
    setCoordinates({ lat, lng: lon });
    localStorage.setItem('location', selectedLocation);
    localStorage.setItem('coordinates', JSON.stringify({ lat, lng: lon }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      console.log('Selected Location:', location);
      console.log('Coordinates:', coordinates);

      navigate("/findServices");
    } else {
      alert('Please select a location!');
    }
  };

  return (
    <div className="flex">
      <div className="mt-10 mx-auto lg:flex md:flex gap-2">
        <LocationSelector location={location} setLocation={handleLocationSelect} />
        <button
          className="md:w-auto px-8 py-3 my-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
          onClick={handleSubmit}
        >
          Search Services
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default SearchServices;
