import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import LandingPage from './landingPage/LandingPage'
import FindServices from "./findServices/FindServices"
import VendorInfo from "./findServices/VendorInfo"
import ProfilePage from './profilePanels/User/profilePage';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import VendorPanel from './profilePanels/Vendor/VendorPanel';
import ServiceDetailsPage from "./ServiceDetailsPage/ServiceDetailsPage";

function App() {

  return (
      
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <Navbar />

      <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/findServices' element={<FindServices />} />
          <Route path='/becomeProvider' element={<VendorInfo />} />
          <Route path='/user/:id' element={<ProfilePage />} />
          <Route path='/vendor/:id/*' element={<VendorPanel />} />

          <Route path='/service' element={<ServiceDetailsPage />} />

      </Routes> 

      <Footer />

    </Router>
    
  )
}

export default App
