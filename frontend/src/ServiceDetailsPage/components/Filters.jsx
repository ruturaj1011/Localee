import React from 'react';
import LocationSelector from '../../utils/LocationSelector';

const Filters = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-72 border border-gray-200 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      <div className="space-y-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Location
          </label>
          <LocationSelector />
        </div>

        {/* Ratings Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Ratings
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none">
            <option>4 stars & above</option>
            <option>3 stars & above</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
