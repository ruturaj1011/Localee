import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import LandingPage from './landingPage/LandingPage'
import FindServices from "./findServices/FindServices"
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';

function App() {

  return (
      
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <Navbar />

      <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/findServices' element={<FindServices />} />
          <Route path='/becomeProvider' element={<FindServices />} />

      </Routes> 

      <Footer />

    </Router>
    
  )
}

export default App
