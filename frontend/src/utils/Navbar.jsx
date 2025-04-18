import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./Avatar";
import "../App.css";
import { AuthContext } from "../contexts/authContext";
import { useFlash } from "../contexts/flashContext";

function Navbar({ idx }) {
  const [navOption, setNavOption] = useState(idx);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isUserLoggedIn, isVendorLoggedIn,logout } = useContext(AuthContext);
  const { addFlashMessage } = useFlash();

  
  
  // Get user info for profile display
  const currentUser = localStorage.getItem("role");
  const id  = localStorage.getItem("id");
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navOption]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-lg w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="nav-cont" className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text cursor-pointer">
                Localee
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="nav-list list-none flex justify-between items-center text-base font-medium text-gray-700 gap-8">
              <li className="nav-items relative group">
                <Link
                  to="/"
                  className={`transition duration-300 ease-in-out hover:text-indigo-700 ${navOption === 0 ? "text-indigo-600 font-semibold" : ""}`}
                  onClick={() => setNavOption(0)}
                >
                  Home
                </Link>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ${navOption === 0 ? "w-full" : "group-hover:w-full"}`}
                ></div>
              </li>

              <li className="nav-items relative group">
                <Link
                  to="/findServices"
                  className={`transition duration-300 ease-in-out hover:text-indigo-700 ${navOption === 1 ? "text-indigo-600 font-semibold" : ""}`}
                  onClick={() => setNavOption(1)}
                >
                  Find Services
                </Link>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ${navOption === 1 ? "w-full" : "group-hover:w-full"}`}
                ></div>
              </li>

              {/* Only show 'Become a Provider' if user is NOT logged in */}
              {isUserLoggedIn() && (
                <li className="nav-items relative group">
                  <Link
                    to="/becomeProvider"
                    className={`transition duration-300 ease-in-out hover:text-indigo-700 ${navOption === 2 ? "text-indigo-600 font-semibold" : ""}`}
                    onClick={() => setNavOption(2)}
                  >
                    Become a Provider
                  </Link>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ${navOption === 2 ? "w-full" : "group-hover:w-full"}`}
                  ></div>
                </li>
              )}
            </div>

            {/* Authentication button or Account Menu */}
            {isUserLoggedIn() || isVendorLoggedIn() ? (
              <AccountMenu />
            ) : (
              <div className="flex items-center ml-6">
                <Link
                  to="/auth/user/login"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <i className="fa-solid fa-xmark transition duration-300 ease-in-out"></i>
              ) : (
                <i className="fa-solid fa-bars transition duration-300 ease-in-out"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu with user-centric profile */}
      <div
        className={`md:hidden bg-white shadow-inner border-t border-gray-100 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        {/* User Profile Section at the top of mobile menu */}
        {(isUserLoggedIn() || isVendorLoggedIn()) && (
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-lg font-semibold overflow-hidden">
                  {currentUser?.profilePic ? (
                    <img 
                      src={currentUser.profilePic} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    currentUser?.charAt(0)
                  )}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-800">
                  {currentUser}
                </p>
                <p className="text-sm text-gray-500">
                  {isUserLoggedIn() ? "User" : "Provider"}
                </p>
              </div>
            </div>
            
            {/* Quick action buttons */}
            <div className="flex gap-2 mt-3">
              <Link 
                to={`/${currentUser}/${id}/profile`} 
                onClick={toggleMobileMenu}
                className="flex-1 bg-white border border-gray-200 text-indigo-600 text-center text-sm font-medium py-2 px-3 rounded-md hover:bg-indigo-50 transition duration-200"
              >
                {id && "My Profile"}
              </Link>
              <Link
                to={`/${currentUser}/${id}/bookings`} 
                className="flex-1 bg-white border border-gray-200 text-indigo-600 text-center text-sm font-medium py-2 px-3 rounded-md hover:bg-indigo-50 transition duration-200"
                onClick={toggleMobileMenu}
              >
                {id  &&"Bookings"}
              </Link>
              {currentUser == 'vendor' && <Link
                to={`/vendor/${id}/yourServices`} 
                className="flex-1 bg-white border border-gray-200 text-indigo-600 text-center text-sm font-medium py-2 px-3 rounded-md hover:bg-indigo-50 transition duration-200"
                onClick={toggleMobileMenu}
              >
                {id  && "My Services"}
              </Link>
              } 
            </div>
          </div>
        )}
        
        {/* Signin button for non-logged users */}
        {!isUserLoggedIn() && !isVendorLoggedIn() && (
          <div className="px-4 pt-4 pb-2">
            <Link
              to="/auth/user/login"
              className="block w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out text-center"
            >
              Sign In
            </Link>
            <div className="text-center mt-2 text-sm text-gray-500">
              <span>New to Localee? </span>
              <Link to="/auth/user/register" className="text-indigo-600 font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div className="px-4 py-3 space-y-1 border-t border-gray-100 mt-2">
          <Link
            to="/"
            className={`block px-3 py-2.5 rounded-md text-base font-medium ${
              navOption === 0
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            }`}
            onClick={() => setNavOption(0)}
          >
            <i className="fa-solid fa-home mr-3 w-5 text-center"></i>
            Home
          </Link>

          <Link
            to="/findServices"
            className={`block px-3 py-2.5 rounded-md text-base font-medium ${
              navOption === 1
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            }`}
            onClick={() => setNavOption(1)}
          >
            <i className="fa-solid fa-search mr-3 w-5 text-center"></i>
            Find Services
          </Link>

          {/* Only show 'Become a Provider' in mobile menu if user is NOT logged in */}
          {currentUser == 'user' && (
            <Link
              to="/becomeProvider"
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                navOption === 2
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
              onClick={() => setNavOption(2)}
            >
              <i className="fa-solid fa-briefcase mr-3 w-5 text-center"></i>
              Become a Provider
            </Link>
          )}
        </div>
        
        {/* Additional user actions at bottom */}
        {(isUserLoggedIn() || isVendorLoggedIn()) && (
          <div className="px-4 py-3 border-t border-gray-100">
            <button 
              className="flex items-center w-full px-3 py-2.5 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              // Assuming you have a logout function in AuthContext
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
                addFlashMessage("You logged out successfully!", "success");
              }}
            >
              <i className="fa-solid fa-sign-out-alt mr-3 w-5 text-center"></i>
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;