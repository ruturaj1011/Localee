import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import LandingPage from './landingPage/LandingPage'
import FindServices from "./findServices/FindServices"
import VendorInfo from "./findServices/VendorInfo"

import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import VendorPanel from './profilePanels/Vendor/VendorPanel';
import UserPanel from './profilePanels/UserPanel/UserPanel.jsx';
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
          <Route path='/user/:id/*' element={<UserPanel />} />
          <Route path='/vendor/:id/*' element={<VendorPanel />} />

          <Route path='/services' element={<ServiceDetailsPage />} />
          <Route path='/serviceInfo' element={<VendorInfo />} />
{/* 
          <Route path='auth/user' element={<RegisterForm role={"user"} />} />
          <Route path='auth/vendor' element={<RegisterForm role={"vendor"} />} /> */}

      </Routes> 

      <Footer />

    </Router>
    
  )
}

export default App
