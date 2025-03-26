// components/FlashMessage.jsx
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FlashMessage = ({ message, type = 'success', duration = 5000, onClose }) => {
    
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaTimesCircle className="text-red-500" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400';
      case 'error':
        return 'bg-red-100 border-red-400';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400';
      case 'info':
        return 'bg-blue-100 border-blue-400';
      default:
        return 'bg-blue-100 border-blue-400';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-50 flex items-center p-4 mb-4 border rounded-lg shadow-lg ${getBgColor()} ${
            type === 'error' ? 'text-red-700' : type === 'success' ? 'text-green-700' : type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
          }`}
          style={{ right: '20px', bottom: '20px' }}
        >
          <div className="mr-3 text-xl">{getIcon()}</div>
          <div className="text-sm font-medium">{message}</div>
          <button
            onClick={() => setVisible(false)}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <FaTimesCircle />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlashMessage;