import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const services = [
  // Home Services
  { title: "Electrician" }, { title: "Plumber" }, { title: "Carpenter" }, { title: "Home Cleaning" },
  { title: "Pest Control" }, { title: "Home Painter" }, { title: "Interior Designer" }, { title: "Architect" },
  // Vehicle Services
  { title: "Bike Mechanic" }, { title: "Car Mechanic" }, { title: "Car Wash Service" },
  { title: "Bike Rental" }, { title: "Car Rental" }, { title: "Car Dealer" }, { title: "Garage Service" },
  // Personal Care
  { title: "Salon for Men" }, { title: "Salon for Women" }, { title: "Makeup Artist" }, { title: "Mehendi Artist" },
  { title: "Tattoo Artist" }, { title: "Massage Therapist" }, { title: "Physiotherapist" },
  // Education & Training
  { title: "Tuition Teacher" }, { title: "Music Teacher" }, { title: "Dance Instructor" },
  { title: "Yoga Trainer" }, { title: "Gym Trainer" }, { title: "Driving Instructor" },
  // Professional Services
  { title: "Legal Consultant" }, { title: "Tax Consultant" }, { title: "CA Services" },
  { title: "Real Estate Broker" }, { title: "Packers and Movers" }, { title: "Event Planner" },
  { title: "Wedding Photographer" }, { title: "Caterer" }, { title: "DJ Services" },
  // Miscellaneous Small Services
  { title: "Courier Services" }, { title: "Laundry Services" }, { title: "Xerox & Printing Shop" },
  { title: "Security Guard Services" }, { title: "Old Age Care Services" }, { title: "Baby Care Services" },
  { title: "House Construction" }, { title: "Property Developer" }, { title: "Tour & Travel Agent" },
  { title: "Tailor" }, { title: "Pet Grooming" }, { title: "Cook & Chef Services" }
];

export default function SearchBox({ service, onServiceSelect }) {
  const [query, setQuery] = useState(service || "");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    if (service) {
      setQuery(service);
    }
  }, [service]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setFilteredServices(
        services
          .filter((service) =>
            service.title.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5) // Only show the top 5 relevant suggestions
      );
    } else {
      setFilteredServices([]);
    }
  };

  const handleSuggestionClick = (service) => {
    setQuery(service);
    setFilteredServices([]); // Hide suggestions when a selection is made
    onServiceSelect(service);
  };

  return (
    <div className="relative my-2 lg:w-64 md:w-3/12">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5 z-20" />
      <input
        type="text"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="What service are you looking for?"
        value={query}
        onChange={handleInputChange}
      />
      {filteredServices.length > 0 && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-30 max-h-48 overflow-y-auto">
          {filteredServices.map((service, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(service.title)}
            >
              {service.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}