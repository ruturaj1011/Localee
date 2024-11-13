import React, { useState } from 'react';

function SearchServices() {

    let [location, setLocation] = useState("");
    let [showSuggetions, setShowSuggetions] = useState(true);

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


    return (

        <div>
            {/* Search Form */}
            <div className="relative w-fit z-10 mt-8 bg-white rounded-lg shadow-md p-4 max-w-2xl mx-auto">

                <form onSubmit={() => handleSubmit(location)} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">

                    <div className='lg:flex w-full item-center'>
                        <input
                            type="text"
                            placeholder="Enter your location"
                            className=" p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none text-black"
                            onChange={handleInputChange}
                            value={location}
                        />
                        <span role="button" title="Use current location" className='text-indigo-700 mx-2 p-3 text-lg lg:text-2xl rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none text-black'><i className="fa-solid fa-location-crosshairs"></i></span>
                    </div>
                    {
                        location.trim() && showSuggetions && (
                            <ul className="absolute top-16 w-7/12 bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                                {
                                    address
                                        .filter(
                                            add => add.toLowerCase().startsWith(location.trim().toLowerCase()) && location)
                                        .map((add, idx) => (
                                            <li role='button' onClick={() => handleAddClick(add)} key={idx} className="px-2 py-2 border-b hover:bg-gray-200 cursor-pointer text-black">
                                                {add}
                                            </li>
                                        ))
                                }
                            </ul>
                        )
                    }

                    <button className="w-full sm:w-1/2 bg-blue-600 text-white font-semibold py-3 px-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Search Services
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchServices;