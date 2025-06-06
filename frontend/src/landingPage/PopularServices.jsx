import { useState } from 'react';
import { Wrench, Camera, Home, Scissors, Car, Heart, Star, ChevronRight } from 'lucide-react';

const services = [
  { 
    icon: Wrench, 
    name: 'Plumbing', 
    count: '250+ Providers', 
    description: 'Expert plumbers for repairs, installations, and maintenance',
    color: 'bg-blue-500'
  },
  { 
    icon: Camera, 
    name: 'Photography', 
    count: '180+ Providers', 
    description: 'Professional photographers for all your special moments',
    color: 'bg-purple-500'
  },
  { 
    icon: Home, 
    name: 'Home Cleaning', 
    count: '320+ Providers', 
    description: 'Top-rated cleaning services for a spotless home',
    color: 'bg-green-500'
  },
  { 
    icon: Scissors, 
    name: 'Beauty & Wellness', 
    count: '290+ Providers', 
    description: 'Experienced professionals for all your beauty needs',
    color: 'bg-pink-500'
  },
  { 
    icon: Car, 
    name: 'Auto Services', 
    count: '150+ Providers', 
    description: 'Reliable mechanics and auto care specialists',
    color: 'bg-amber-500'
  },
  { 
    icon: Heart, 
    name: 'Healthcare', 
    count: '200+ Providers', 
    description: 'Quality healthcare services from trusted professionals',
    color: 'bg-red-500'
  },
];

function PopularServices() {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <Star className="text-yellow-400 w-6 h-6 mr-2" fill="currentColor" />
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">Most Requested</span>
              <Star className="text-yellow-400 w-6 h-6 ml-2" fill="currentColor" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most booked services with top-rated professionals in your area
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${service.color} text-white p-3 rounded-lg`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <p className="text-gray-500 flex items-center">
                      <span>{service.count}</span>
                      <span className="inline-flex ml-2 items-center">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                        <span className="text-sm">Available Now</span>
                      </span>
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className={`flex items-center justify-between ${hoveredService === index ? 'text-blue-600' : 'text-gray-700'} font-medium transition-colors duration-300`}>
                  <span>View Providers</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-500">+{Math.floor(Math.random() * 50) + 20} more</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-medium text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition-all duration-300 hover:shadow-lg">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopularServices;