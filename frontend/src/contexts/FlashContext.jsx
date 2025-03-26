// context/FlashContext.jsx
import { createContext, useContext, useState } from 'react';
import FlashMessage from '../utils/FlashMessage';
const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
    
  const [flashMessages, setFlashMessages] = useState([]);

  const addFlashMessage = (message, type = 'success', duration = 5000) => {
    const id = Date.now();
    setFlashMessages((prev) => [...prev, { id, message, type, duration }]);
    
    // Auto-remove after duration
    setTimeout(() => {
      removeFlashMessage(id);
    }, duration);
  };

  const removeFlashMessage = (id) => {
    setFlashMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <FlashContext.Provider value={{ addFlashMessage, removeFlashMessage }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {flashMessages.map((msg) => (
          <FlashMessage
            key={msg.id}
            message={msg.message}
            type={msg.type}
            duration={msg.duration}
            onClose={() => removeFlashMessage(msg.id)}
          />
        ))}
      </div>
    </FlashContext.Provider>
  );
};

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used within a FlashProvider');
  }
  return context;
};