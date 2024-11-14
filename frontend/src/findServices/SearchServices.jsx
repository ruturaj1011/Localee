import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import LocationSelector from '../utils/LocationSelector';

function SearchServices() {

    let [location, setLocation] = useState("");

    function handleSubmit(location) {
        event.preventDefault();
        setLocation("");
        console.log(location);
    }
    function handleInputChange(event) {

        setLocation(event.target.value);
        console.log(event.target.value);
        setShowSuggetions(true);
    }
    function handleAddClick(add){
        setLocation(add);
        console.log(location);
        setShowSuggetions(false);
    }

    return (
      
        <div className="text-center">
          
          <div className="mt-10 justify-center items-end lg:flex md:flex gap-2">

            <LocationSelector />

            <div className="relative my-2 lg:w-3/12 md:w-3/12">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5 z-20" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="What service are you looking for?"
                />
            </div>
           
            <button className="w-full md:w-auto px-8 py-3 my-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
              Search Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
          </div>
        </div>
      
    );
}

export default SearchServices;