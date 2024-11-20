import React, { useState } from "react";
import { UserIcon, CalendarIcon } from "@heroicons/react/outline";
import Profile from "./Profile";
import Bookings from "./Bookings";

const UserPanel = () => {
  const [activeSection, setActiveSection] = useState("user");

  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex flex-col w-64 bg-blue-500 text-white p-6">
        <h1 className="text-4xl font-bold">Localee</h1>
        <ul className="space-y-4 mt-8">
          <li
            className={`flex items-center p-2 rounded-lg cursor-pointer ${
              activeSection === "user"
                ? "bg-white text-blue-500"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveSection("user")}
          >
            <UserIcon className="h-6 w-6 mr-3" />
            <span className="text-lg">User</span>
          </li>
          <li
            className={`flex items-center p-2 rounded-lg cursor-pointer ${
              activeSection === "bookings"
                ? "bg-white text-blue-500"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            <CalendarIcon className="h-6 w-6 mr-3" />
            <span className="text-lg">Bookings</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeSection === "user" && (
            <div>
          <Profile />
          </div>
        )}
        {activeSection === "bookings" && (
          <div>
           <Bookings />
          </div>
        )}
      </div>

      {/* Bottom Navigation for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-500 text-white flex justify-around py-3 shadow-lg">
        <button
          className={`flex flex-col items-center ${
            activeSection === "user" ? "text-blue-200" : "text-white"
          }`}
          onClick={() => setActiveSection("user")}
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-sm">User</span>
        </button>
        <button
          className={`flex flex-col items-center ${
            activeSection === "bookings" ? "text-blue-200" : "text-white"
          }`}
          onClick={() => setActiveSection("bookings")}
        >
          <CalendarIcon className="h-6 w-6" />
          <span className="text-sm">Bookings</span>
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
