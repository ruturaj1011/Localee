import  { useState, useEffect } from 'react';
import LocationSelector from '../../utils/LocationSelector.jsx';
import SearchBox from '../../utils/SearchBox.jsx';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Star, Sliders } from 'lucide-react';

const Filters = (serviceProviders) => {
  // Maintain the same state management
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedService, setSelectedService] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const navigate = useNavigate();

  // Keep the same service selection handler
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    localStorage.setItem('service', service);
  };

  // Maintain the same useEffect hooks for initializing from localStorage
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

  // Keep the same location selection handler
  const handleLocationSelect = (selectedLocation, lat, lng) => {
    setLocation(selectedLocation);
    setCoordinates({ lat, lng });
    localStorage.setItem('location', selectedLocation);
    localStorage.setItem('coordinates', JSON.stringify({ lat, lng }));
  };

  // Keep the same apply filters handler
  const handleApplyFilters = () => {

    let minRating = selectedRating;

    navigate(`/services/${selectedService}`, { state: { service: selectedService, location, coordinates, minRating } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mt-4 overflow-hidden">
      {/* Header with toggle button */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 flex justify-between items-center cursor-pointer"
           onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Sliders className="h-5 w-5 mr-2" />
          Filters
        </h2>
        <button className="text-white">
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Collapsible content */}
      {isExpanded && (
        <div className="p-4 space-y-5">
          {/* Service search section */}
          <div className="filter-group">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Search className="h-4 w-4 mr-2 text-blue-500" />
              Change Search
            </label>
            <SearchBox 
              service={selectedService} 
              onServiceSelect={handleServiceSelect} 
            />
            {selectedService && (
              <div className="mt-2 text-sm text-blue-600">
                Currently searching: <span className="font-medium">{selectedService}</span>
              </div>
            )}
          </div>

          {/* Location selection section */}
          <div className="filter-group">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              Select Location
            </label>
            <LocationSelector 
              location={location} 
              setLocation={handleLocationSelect} 
            />
            {location && (
              <div className="mt-2 text-sm text-blue-600">
                Current location: <span className="font-medium">{location}</span>
              </div>
            )}
          </div>

          {/* Rating filter section */}
          <div className="filter-group p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
    <Star className="h-5 w-5 mr-2 text-yellow-400" />
    <span className="font-semibold">Minimum Rating</span>
  </label>
  
  <div className="flex flex-col space-y-3">
    <div className="flex items-center justify-between">
      <input
        type="range"
        min="1"
        max="5"
        step="0.5"
        value={selectedRating}
        onChange={(e) => setSelectedRating(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
    
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-lg font-bold text-indigo-600 mr-1">
          {selectedRating}
        </span>
        <div className="flex">
          {[...Array(Math.floor(selectedRating))].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
          {selectedRating % 1 !== 0 && (
            <Star className="h-5 w-5 text-yellow-400 fill-current opacity-50" />
          )}
        </div>
      </div>
      
      <span className="text-sm text-gray-500">
        & above
      </span>
    </div>
  </div>
</div>

          {/* Apply button */}
          <button
            onClick={handleApplyFilters}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;