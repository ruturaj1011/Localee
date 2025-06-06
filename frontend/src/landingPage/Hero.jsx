
import SearchServices from './SerachServices.jsx';
import { CheckCircle, Star, Users, ShieldCheck } from 'lucide-react';

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center" 
           style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/man-doing-professional-home-cleaning-service_23-2150359014.jpg?t=st=1731408751~exp=1731412351~hmac=e4c53501a1bb2e6596e81ce11e74be606b4be342604f52f38d23aff855a5d82b&w=740")' }}>
      </div>
      
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-blue-500/60"></div>
      
      {/* Geometric accents */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-blue-300/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-blue-300/20 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-blue-300/20 rounded-full"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Pre-title */}
          <div className="bg-blue-500/30 backdrop-blur-sm inline-block px-4 py-1 rounded-full mb-6 animate-fadeIn">
            <span className="text-white text-sm font-medium tracking-wide uppercase flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" /> Trusted by 50,000+ customers
            </span>
          </div>
          
          {/* Main title with animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fadeInUp">
            Find Trusted Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Services</span> with Localee
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl mb-10 text-blue-100 max-w-2xl mx-auto animate-fadeInUp delay-100">
            Easily connect with vetted professionals in your area for fast, reliable, and high-quality service — all in just a few clicks.
          </p>
          
          {/* Search component with animation */}
          <div className="animate-fadeInUp delay-200 relative z-10">
            <SearchServices />
          </div>
          
          {/* Stats section with improved styling */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-2xl">1,000+</p>
                <p className="text-blue-100 text-sm">Verified Providers</p>
              </div>
            </div>
            
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-2xl">50,000+</p>
                <p className="text-blue-100 text-sm">Happy Customers</p>
              </div>
            </div>
            
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <Star className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-2xl">4.8/5</p>
                <p className="text-blue-100 text-sm">Average Rating</p>
              </div>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 text-center">
            <p className="text-blue-200 text-sm mb-3">TRUSTED BY LEADING BRANDS</p>
            <div className="flex justify-center space-x-8 opacity-70">
              {['Company A', 'Company B', 'Company C', 'Company D'].map((company, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-md px-4 py-2 text-white font-semibold">
                  {company}
                </div>
              ))}
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
}

export default Hero;