import React from 'react';

function Footer() {
    return ( 
        <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center sm:justify-start mb-8">
            {/* Logo Section */}
            <h1 className="text-6xl font-bold text-white">Localee</h1>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
              <p className="text-gray-400">
                Localee connects you with trusted local service providers, making it easy to find and book the help you need.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: contact@locallink.com</p>
              <p className="text-gray-400">Phone: +91-123-456-7890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#facebook" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#twitter" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#instagram" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
            &copy; 2024 Localee
          </div>
        </div>
      </footer>
    );
}

export default Footer;