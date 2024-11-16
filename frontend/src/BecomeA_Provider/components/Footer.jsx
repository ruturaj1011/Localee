import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto text-center px-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Join Localee</h3>
          <p className="text-gray-400 text-sm mt-2">
            Start your journey with Localee today and grow your business!
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="#terms"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Terms & Conditions
          </a>
          <a
            href="#faq"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            FAQs
          </a>
          <a
            href="#support"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Customer Support
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>&copy; 2024 Localee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
