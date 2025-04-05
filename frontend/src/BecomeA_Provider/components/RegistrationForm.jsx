import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Store, Award, MapPin, Phone } from 'lucide-react';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/auth/vendor/register');
  };

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left side - Image/Graphic */}
          <div className="w-full md:w-2/5 bg-blue-600 text-white p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Vendor Network</h2>
            <p className="text-blue-100 mb-6">
              Connect with local customers and grow your business by becoming a verified Localee service provider.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Store size={20} className="mr-3 text-blue-200" />
                <span>Showcase your business</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-3 text-blue-200" />
                <span>Serve your local community</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-200" />
                <span>Get direct customer inquiries</span>
              </div>
              <div className="flex items-center">
                <Award size={20} className="mr-3 text-blue-200" />
                <span>Build trust with verification</span>
              </div>
            </div>
          </div>

          {/* Right side - Call to action */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
            <div className="max-w-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Become a Localee Provider</h3>
              <p className="text-gray-600 mb-8">
                Join our community of trusted local service providers. Registration is simple and puts your business in front of customers looking for your services.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h4 className="font-medium text-gray-800 mb-3">What you'll need to register:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Business information</li>
                  <li>• Service categories</li>
                  <li>• Contact details</li>
                  <li>• Business location</li>
                  <li>• Certifications or ID (for verification)</li>
                </ul>
              </div>
              
              <button
                onClick={handleRegisterClick}
                className="w-full md:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
              >
                Register as Provider
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
