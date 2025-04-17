// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { AuthProvider } from "./contexts/authContext";
import { FlashProvider } from './contexts/FlashContext';
import AppContent from './AppContent';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FlashProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </FlashProvider>
    </Router>
  );
}

export default App;
