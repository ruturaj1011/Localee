import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const address = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai",
    "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur",
    "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara", "Firozabad",
    "Ludhiana", "Rajkot", "Agra", "Nashik", "Meerut", "Faridabad", "Patna",
    "Ghaziabad", "Rajahmundry", "Coimbatore", "Jodhpur", "Madurai", "Varanasi",
    "Gwalior", "Thiruvananthapuram", "Ranchi", "Chandigarh", "Guntur", "Amritsar",
    "Noida", "Jamshedpur", "Hubli", "Mysore", "Tiruchirappalli", "Bareilly",
    "Aligarh", "Moradabad", "Gorakhpur", "Bikaner", "Bhubaneswar", "Salem",
    "Warangal", "Mangalore", "Ujjain", "Jalandhar", "Dehradun", "Ajmer",
    "Kozhikode", "Gulbarga", "Nanded", "Bardhaman", "Ambala", "Sonipat",
    "Rohtak", "Bhilai", "Jammu", "Shimla", "Panaji", "Puducherry", "Kohima",
    "Itanagar", "Shillong", "Aizawl", "Gangtok", "Agartala"
];

const LocationSelector = () => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    setIsOpen(false);
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Popular Cities</h4>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-hidden overflow-x-hidden">
                {address
                  .filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((city) => (
                    <button
                      key={city}
                      onClick={() => handleLocationSelect(city)}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {city}
                    </button>
                  ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  // Here you can add logic to get user's current location
                  handleLocationSelect('Current Location');
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