import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import LandingPage from './landingPage/LandingPage'
import FindServices from "./findServices/FindServices"
import ServiceDetails from "./ServiceDetails/ServiceDetails.jsx"

import { AuthProvider } from "./contexts/authContext";
import { FlashProvider } from './contexts/FlashContext';


import VendorPanel from './profilePanels/Vendor/VendorPanel';
import UserPanel from './profilePanels/UserPanel/UserPanel.jsx';
import SelectServiceVendor from "./SelectServiceVendor/SelectServiceVendor.jsx";
import BecomeAProvider from "./BecomeA_Provider/BecomeAProvider/BecomeAProvider";

import UserLogin from './authComponents/UserLogin.jsx';
import VendorLogin from './authComponents/vendorLogin.jsx';
import UserRegister from './authComponents/UserRegister.jsx';
import VendorRegister from './authComponents/VendorRegister.jsx';

function App() {


  return (

    
      
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <FlashProvider>
      <AuthProvider>
        
      
      {/* <Navbar /> */}

      <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/findServices' element={<FindServices />} />
          <Route path='/becomeProvider' element={<BecomeAProvider />} />
          <Route path='/user/:id/*' element={<UserPanel />} />
          <Route path='/vendor/:id/*' element={<VendorPanel />} />

          <Route path='/services/:serviceName' element={<SelectServiceVendor />} />
          <Route path='/serviceInfo/:service/:placeId' element={<ServiceDetails />} />

          <Route path='/auth/user/login' element={<UserLogin />} />
          <Route path='/auth/user/register' element={<UserRegister />} />

          <Route path='/auth/vendor/login' element={<VendorLogin />} />
          <Route path='/auth/vendor/register' element={<VendorRegister />} />

      </Routes> 

      {/* <Footer /> */}

      </AuthProvider>
      </FlashProvider>

    </Router>
    
  )
}

export default App
