
import SearchServices from './SearchServices.jsx';
import { Shield, Star, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 text-gray-900 pt-24 pb-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-50 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" />
            <span className="text-sm font-medium text-gray-700">Top-rated service providers near you</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent leading-tight">
            Find Trusted Local Services<br className="hidden md:block" /> With Just A Few Clicks
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Connect with verified local professionals for all your service needs. Fast, reliable, and hassle-free.
          </p>
          
          <div className="mb-12">
            <SearchServices />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Professionals</h3>
              <p className="text-gray-600 text-sm">Every service provider is background-checked and verified for quality.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Reviewed</h3>
              <p className="text-gray-600 text-sm">Read honest reviews from real customers to make informed decisions.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">Not satisfied with the service? We'll make it right or refund your money.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;