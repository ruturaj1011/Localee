import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const LocationSelector = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {

    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=IN`
      );      
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationSelect = async (city, lat, lon) => {
    if (lat === -1 || lon === -1) {
      try {
        // Make a request to get the lat and lon based on the city name
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&limit=1&countrycodes=IN`
        );
        const data = await response.json();
  
        if (data && data.length > 0) {
          const { lat, lon } = data[0]; // Get the latitude and longitude of the first result
          setSelectedLocation(city);
          setIsOpen(false);
          console.log(city, lat, lon);
        } else {
          console.error("No location found for this city.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    } else {
      // If lat and lon are valid, use them directly
      setSelectedLocation(city);
      setIsOpen(false);
      console.log(city, lat, lon);
    }
  };
  

  return (
    <div className="relative my-2 w-fit min-w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <MapPin className="h-5 w-5 text-gray-600 mr-2" />
        <span className="flex-1 text-left text-gray-800">
          {selectedLocation || 'Select your location'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search for your city..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
              />
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Suggestions</h4>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-hidden overflow-x-hidden">
                {suggestions.length <= 0 ? 
                  <button
                      onClick={() => handleLocationSelect(searchTerm, -1, -1)}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {searchTerm}
                  </button>
                   :
                suggestions.map((location) => (
                  
                  <button
                    key={location.place_id}
                    onClick={() => handleLocationSelect(location.name, location.lat, location.lon)}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    {location.display_name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const { latitude, longitude } = position.coords;

                        try {

                          handleLocationSelect("current", latitude, longitude); // Pass the short address
                        } catch (error) {
                          console.error("Error fetching location details:", error);
                          alert("Unable to fetch location details. Please try again.");
                        }
                      },
                      (error) => {
                        console.error("Error fetching coordinates:", error);
                        alert("Unable to fetch your location. Please enable location services.");
                      }
                    );
                  } else {
                    alert("Geolocation is not supported by your browser.");
                  }
                }}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Use current location
              </button>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;