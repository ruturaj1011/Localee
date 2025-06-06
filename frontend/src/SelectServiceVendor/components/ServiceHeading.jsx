
import { Star } from 'lucide-react';

const ServiceHeading = ({ title, reviews }) => {
  return (
    <div className="pb-4 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        
        {reviews && (
          <div className="flex items-center mt-2 md:mt-0">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {typeof reviews === 'string' ? reviews : `${reviews.rating || '4.5'} (${reviews.count || '0'} reviews)`}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 border-b border-gray-200 dark:border-gray-700"></div>
    </div>
  );
};

export default ServiceHeading;