import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useFlash } from '../contexts/FlashContext.jsx';
import { useNavigate } from 'react-router-dom';

const ServicesCards = ({ services, category, subHeading, eleId }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isHovering, setIsHovering] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const { addFlashMessage } = useFlash();
  const navigate = useNavigate();
  
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      
      if (containerRef.current) {
        const container = containerRef.current;
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [services]);

  const handleScroll = () => {
    if (containerRef.current) {
      const position = containerRef.current.scrollLeft;
      setScrollPosition(position);
      setShowLeftArrow(position > 10);
      setShowRightArrow(position < maxScroll - 10);
    }
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    
    const cardWidth = container.querySelector('div').offsetWidth + 32; // Card width + gap
    const scrollAmount = direction === 'right' ? cardWidth : -cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const onBPClick = (service) => {
    if(localStorage.getItem('location') == null || localStorage.getItem('coordinates') == null) {
      addFlashMessage("Please select a location first", "info");
      return;
    }

    const location = localStorage.getItem('location');
    const coordinates = JSON.parse(localStorage.getItem('coordinates'));

    localStorage.setItem('service', service);

    navigate(`/services/${service}`, { state: { service, location, coordinates, minRating : 1 } });
  }

  const progressPercentage = maxScroll === 0 ? 0 : (scrollPosition / maxScroll) * 100;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Progress Bar */}
        <div className="flex justify-between items-end mb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{category}</h2>
            <p className="mt-3 text-xl text-gray-600">
              {subHeading}
            </p>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex items-center gap-3">
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!showLeftArrow}
                  className={`p-3 rounded-full text-white focus:outline-none transition-all duration-300 ${
                    showLeftArrow 
                      ? 'bg-indigo-500 hover:bg-indigo-600 shadow-md' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!showRightArrow}
                  className={`p-3 rounded-full text-white focus:outline-none transition-all duration-300 ${
                    showRightArrow 
                      ? 'bg-indigo-500 hover:bg-indigo-600 shadow-md' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main carousel container */}
        <div className="relative">
          {/* Scroll Indicators for Mobile */}
          {isMobile && (
            <div className="flex justify-center mt-4 mb-6 gap-1">
              {Array.from({ length: Math.ceil(services.length / 2) }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i * 50 <= scrollPosition && scrollPosition < (i + 1) * 50 
                      ? 'bg-indigo-500 w-4' 
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          )}
          
          {/* Side gradient effects */}
          {showLeftArrow && (
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
          )}
          
          {showRightArrow && (
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>
          )}
          
          {/* Services Cards */}
          <div
            ref={containerRef}
            id={eleId}
            className="flex overflow-x-scroll gap-6 py-6 hide-scrollbar snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 min-w-[280px] max-w-[320px] flex-shrink-0 snap-start group relative overflow-hidden"
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => onBPClick(service.name.toLowerCase())}
              >
                {/* Top accent line with animation */}
                <div 
                  className="h-1 bg-indigo-500 w-0 group-hover:w-full transition-all duration-500 absolute top-0 left-0 right-0"
                ></div>
                
                <div className="p-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors duration-300">
                    <service.icon className={`h-7 w-7 text-indigo-600 ${isHovering === index ? 'scale-110' : ''} transition-transform duration-300`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">{service.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 mb-5">{service.count}</p>
                  
                  <Link
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center py-2 pr-1 border-b border-transparent hover:border-indigo-600 transition-all duration-300"
                  >
                    Browse Providers
                    <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovering === index ? 'translate-x-1' : ''}`} />
                  </Link>
                </div>
                
                {/* Background pattern for visual interest */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 rounded-full bg-indigo-500 -mr-10 -mb-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;