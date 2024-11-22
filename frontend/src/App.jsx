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
import BecomeAProvider from "./BecomeA_Provider/BecomeAProvider/BecomeAProvider";

function App() {

  return (
      
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <Navbar />

      <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/findServices' element={<FindServices />} />
          <Route path='/becomeProvider' element={<BecomeAProvider />} />
          <Route path='/user/:id' element={<ProfilePage />} />
          <Route path='/vendor/:id/*' element={<VendorPanel />} />

          <Route path='/services' element={<ServiceDetailsPage />} />
          <Route path='/serviceInfo' element={<VendorInfo />} />

      </Routes> 

      <Footer />

    </Router>
    
  )
}

export default App
