// App.js
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import { AuthProvider } from "./contexts/authContext.jsx";
import { FlashProvider } from './contexts/FlashContext.jsx';
import AppContent from './AppContent.jsx';

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
