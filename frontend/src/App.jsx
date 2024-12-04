import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import LandingPage from './landingPage/LandingPage'
import FindServices from "./findServices/FindServices"
import VendorInfo from "./findServices/VendorInfo"

import { AuthProvider } from "./contexts/authContext";

import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import VendorPanel from './profilePanels/Vendor/VendorPanel';
import UserPanel from './profilePanels/UserPanel/UserPanel.jsx';
import ServiceDetailsPage from "./ServiceDetailsPage/ServiceDetailsPage";
import BecomeAProvider from "./BecomeA_Provider/BecomeAProvider/BecomeAProvider";

import UserLogin from './authComponents/UserLogin.jsx';
import VendorLogin from './authComponents/vendorLogin.jsx';
import UserRegister from './authComponents/UserRegister.jsx';
import VendorRegister from './authComponents/VendorRegister.jsx';

function App() {


  return (

    
      
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <AuthProvider>
        
      
      {/* <Navbar /> */}

      <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/findServices' element={<FindServices />} />
          <Route path='/becomeProvider' element={<BecomeAProvider />} />
          <Route path='/user/:id/*' element={<UserPanel />} />
          <Route path='/vendor/:id/*' element={<VendorPanel />} />

          <Route path='/services' element={<ServiceDetailsPage />} />
          <Route path='/serviceInfo' element={<VendorInfo />} />

          <Route path='/auth/user/login' element={<UserLogin />} />
          <Route path='/auth/user/register' element={<UserRegister />} />

          <Route path='/auth/vendor/login' element={<VendorLogin />} />
          <Route path='/auth/vendor/register' element={<VendorRegister />} />

      </Routes> 

      {/* <Footer /> */}

      </AuthProvider>

    </Router>
    
  )
}

export default App
