import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useFlash } from '../contexts/FlashContext.jsx';

const LocationSelector = ({ location, setLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {addFlashMessage} = useFlash();
  

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5&countrycodes=IN`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      addFlashMessage('Failed to fetch location suggestions. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (city, lat, lng) => {
    if (city === 'Current Location') {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
  
        const data = await response.json(); // Wait for JSON conversion
  
        console.log(data); // Log full response
  
        city = data.display_name; // Get the full address
      } catch (e) {
        console.error(e);
        addFlashMessage("Something went wrong! Please search for your location", "error");
      }
    }
  
    setLocation(city, lat, lng);
    setIsOpen(false);
  };
  

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSelect('Current Location', latitude, longitude);
        },
        (error) => {
          console.error('Error fetching coordinates:', error);
          alert(
            'Unable to fetch your location. Please enable location services.'
          );
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Function to truncate long location names with ellipsis
  const truncateLocation = (locationName) => {
    return locationName.length > 40 ? `${locationName.substring(0, 37)}...` : locationName;
  };

  return (
    <div className="relative my-2 w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label="Open location selector"
      >
        <div className="flex items-center max-w-[90%]">
          <MapPin className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
          <span className="flex-1 text-left text-gray-800 truncate">
            {location ? truncateLocation(location) : 'Where are you located?'}
          </span>
        </div>
        <span className="text-sm text-blue-600 flex-shrink-0">{isOpen ? 'Close' : 'Change'}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Search for your city or area..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                autoFocus
                aria-label="Search locations"
              />
            </div>

            <div className="mt-4">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {suggestions.length > 0 && (
                    <h4 className="text-sm font-medium text-gray-500 mb-2 px-1">
                      Suggestions
                    </h4>
                  )}
                  <div className="grid grid-cols-1 gap-1 max-h-60 overflow-y-auto">
                    {suggestions.map((location) => (
                      <button
                        key={location.place_id}
                        onClick={() =>
                          handleLocationSelect(
                            location.display_name,
                            location.lat,
                            location.lon
                          )
                        }
                        className="flex items-center px-3 py-3 text-left text-gray-700 hover:bg-blue-50 rounded-md transition-colors w-full"
                      >
                        <MapPin className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="line-clamp-2 text-sm">{location.display_name}</span>
                      </button>
                    ))}
                    {suggestions.length === 0 && searchTerm && !isLoading && (
                      <p className="text-sm text-gray-500 py-2 px-1">
                        No locations found. Try a different search term.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={getCurrentLocation}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              >
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {isLoading ? 'Detecting location...' : 'Use my current location'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;