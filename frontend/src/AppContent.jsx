// AppContent.jsx
import {useState, useEffect, useContext} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import LandingPage from './landingPage/LandingPage.jsx';
import FindServices from "./findServices/FindServices.jsx";
import ServiceDetails from "./ServiceDetails/ServiceDetails.jsx";

import VendorPanel from './profilePanels/Vendor/VendorPanel.jsx';
import UserPanel from './profilePanels/UserPanel/UserPanel.jsx';
import SelectServiceVendor from "./SelectServiceVendor/SelectServiceVendor.jsx";
import BecomeAProvider from "./BecomeA_Provider/BecomeAProvider/BecomeAProvider.jsx";

import UserLogin from './authComponents/UserLogin.jsx';
import VendorLogin from './authComponents/VendorLogin.jsx';
import UserRegister from './authComponents/UserRegister.jsx';
import VendorRegister from './authComponents/VendorRegister.jsx';

import ChatBot from './utils/ChatBot.jsx';
import { AuthContext } from './contexts/authContext.jsx';

const AppContent = () => {
  const location = useLocation();

  const showChatBot = location.pathname === "/" || location.pathname === "/findServices" || location.pathname === "/becomeProvider";

  const { id } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/${id}`);
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
