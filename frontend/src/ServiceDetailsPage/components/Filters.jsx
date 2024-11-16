import React from 'react';

const Filters = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>
      <div className="space-y-4">
        {/* Location Filter */}
        <div>
          <label className="block text-white font-medium">Location</label>
          <select className="w-full border border-blue-300 rounded p-2 mt-1">
            <option>Select Location</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
        </div>

        {/* Ratings Filter */}
        <div>
          <label className="block text-white font-medium">Ratings</label>
          <select className="w-full border border-gray-300 rounded p-2 mt-1">
            <option>4 stars & above</option>
            <option>3 stars & above</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-white  font-medium">Availability</label>
          <select className="w-full border border-gray-300 rounded p-2 mt-1">
            <option>Same day</option>
            <option>Next day</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-white  font-medium">Sort By</label>
          <select className="w-full border border-gray-300 rounded p-2 mt-1">
            <option>Price: Low to High</option>
            <option>Ratings</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
