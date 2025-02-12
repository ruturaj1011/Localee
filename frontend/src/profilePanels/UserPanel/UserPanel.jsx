import React, { useState, useContext } from "react";
import { Calendar, User } from "lucide-react";
import Profile from "../Profile";
import Bookings from "./Bookings";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../utils/Navbar";
import Footer from "../../utils/Footer";
import EditProfile from "../EditProfile";

import { AuthContext } from "../../contexts/authContext";
import useAuth from "../../utils/authMiddleware";
import BookingDetails from "../BookingDetails";

const UserPanel = () => {

    useAuth();

    const {id} = useContext(AuthContext);

  let [selectedMenu, setSelectedMenu] = useState(-1);

    const handleMenuClick = (idx) => {
        setSelectedMenu(idx);
    }

    return (

        <>
        <Navbar ></Navbar>
        <div className="flex h-screen">

            {/* Sidebar */}
            <aside id="vendor-sideBar" className="w-64 bg-indigo-600 text-white flex flex-col pt-4 md:relative md:w-48 lg:w-64">
                <div className="p-4 text-center text-xl font-bold border-b border-indigo-500">
                    User Panel
                </div>
                <nav className="flex-1 p-4 space-y-4">
                    <Link to={`/user/${id}/bookings`} className="flex items-center gap-2 hover:bg-indigo-500 px-3 py-2 rounded" onClick={()=>handleMenuClick(0)} style={selectedMenu==0? {backgroundColor : "rgb(99 102 241)"} : {}}>
                        <Calendar className="w-5 h-5" />
                        My Bookings
                    </Link>
                    <Link to={`/user/${id}/profile`} className="flex items-center gap-2 hover:bg-indigo-500 px-3 py-2 rounded" onClick={()=>handleMenuClick(1)} style={selectedMenu==1? {backgroundColor : "rgb(99 102 241)"} : {}}>
                        <User className="w-5 h-5" />
                        Profile
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-4 md:p-2 lg:p-6 overflow-auto">
                <Routes>
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="profile/edit-profile" element={<EditProfile />} />
                    <Route path="bookings/:id/details" element={<BookingDetails />} />
                </Routes>
            </main>
        </div>

        <Footer />
        </>

    );
};

export default UserPanel;
