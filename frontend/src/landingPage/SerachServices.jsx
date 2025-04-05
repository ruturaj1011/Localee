import React, { useState } from 'react';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import LocationSelector from '../utils/LocationSelector';
import { useNavigate } from "react-router-dom";
import { useFlash } from '../contexts/flashContext';

function SearchServices() {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const {addFlashMessage} = useFlash();

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
      addFlashMessage("Please select a location.", "info"); 
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-white shadow-xl rounded-2xl p-2 md:p-3">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <div className="w-full">
              <LocationSelector 
                location={location} 
                setLocation={handleLocationSelect} 
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center whitespace-nowrap min-w-32"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Services
          </button>
        </form>
        
        {location && (
          <div className="mt-3 px-4 py-2 bg-blue-50 rounded-lg text-sm text-blue-700 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span>Looking for services in <strong>{location}</strong></span>
          </div>
        )}
        
        <div className="mt-4 px-4 flex flex-wrap gap-2">
          <p className="text-xs text-gray-500 mr-2">Popular searches:</p>
          {['Plumbers', 'Electricians', 'Cleaning', 'Lawn Care', 'Tutors'].map((service, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full cursor-pointer transition-colors"
              onClick={() => navigate("/findServices")}
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchServices;