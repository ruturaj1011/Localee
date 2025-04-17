// AppContent.jsx
import {React, useState, useEffect, useContext} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import LandingPage from './landingPage/LandingPage';
import FindServices from "./findServices/FindServices";
import ServiceDetails from "./ServiceDetails/ServiceDetails";

import VendorPanel from './profilePanels/Vendor/VendorPanel';
import UserPanel from './profilePanels/UserPanel/UserPanel';
import SelectServiceVendor from "./SelectServiceVendor/SelectServiceVendor";
import BecomeAProvider from "./BecomeA_Provider/BecomeAProvider/BecomeAProvider";

import UserLogin from './authComponents/UserLogin';
import VendorLogin from './authComponents/vendorLogin';
import UserRegister from './authComponents/UserRegister';
import VendorRegister from './authComponents/VendorRegister';

import ChatBot from './utils/ChatBot';
import { AuthContext } from './contexts/authContext.jsx';

const AppContent = () => {
  const location = useLocation();

  const showChatBot = location.pathname === "/" || location.pathname === "/findServices" || location.pathname === "/becomeProvider";

  const { id } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const res = await axios.get(`http://localhost:8000/profile/${id}`);
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
        setUser(null);
      console.error("Error fetching user data:", err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <>
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

      {showChatBot && <ChatBot user={user} />}
    </>
  );
};

export default AppContent;
