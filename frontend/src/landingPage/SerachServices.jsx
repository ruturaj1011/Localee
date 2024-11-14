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
      
        <div className="flex">
          
          <div className="mt-10 mx-auto
           lg:flex md:flex gap-2">

            <LocationSelector />
           
            <button className="md:w-auto px-8 py-3 my-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
              Search Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
          </div>
        </div>
      
    );
}

export default SearchServices;