import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./Avatar";
import "../App.css";
import { AuthContext } from "../contexts/authContext";

function Navbar({ idx }) {
  const [navOption, setNavOption] = useState(idx);
  const { isUserLoggedIn, isVendorLoggedIn } = useContext(AuthContext);

  const hamClick = () => {
    let crossIcon = document.getElementById("crossIcon");
    let hamIcon = document.getElementById("hamIcon");
    let verMenu = document.getElementById("ver-Menu");

    if (hamIcon.classList.contains("hidden")) {
      hamIcon.classList.remove("hidden");
      verMenu.classList.add("hidden");
      crossIcon.classList.add("hidden");
    } else {
      crossIcon.classList.remove("hidden");
      verMenu.classList.remove("hidden");
      hamIcon.classList.add("hidden");
    }
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
                  className={`transition duration-300 ease-in-out hover:text-indigo-700 ${
                    navOption === 0 ? "text-indigo-600 font-semibold" : ""
                  }`}
                  onClick={() => setNavOption(0)}
                >
                  Home
                </Link>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ${
                    navOption === 0 ? "w-full" : "group-hover:w-full"
                  }`}
                ></div>
              </li>

              <li className="nav-items relative group">
                <Link
                  to="/findServices"
                  className={`transition duration-300 ease-in-out hover:text-indigo-700 ${
                    navOption === 1 ? "text-indigo-600 font-semibold" : ""
                  }`}
                  onClick={() => setNavOption(1)}
                >
                  Find Services
                </Link>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ${
                    navOption === 1 ? "w-full" : "group-hover:w-full"
                  }`}
                ></div>
              </li>

              <li className="nav-items relative group">
                <Link
                  to="/becomeProvider"
                  className={`transition duration-300 ease-in-out hover:text-indigo-700 ${
                    navOption === 2 ? "text-indigo-600 font-semibold" : ""
                  }`}
                  onClick={() => setNavOption(2)}
                >
                  Become a Provider
                </Link>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ${
                    navOption === 2 ? "w-full" : "group-hover:w-full"
                  }`}
                ></div>
              </li>
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
              id="ham-btn"
              className="text-gray-700 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={hamClick}
            >
              <i
                id="hamIcon"
                className="fa-solid fa-bars block transition duration-300 ease-in-out"
              ></i>
              <i
                id="crossIcon"
                className="fa-solid fa-xmark hidden transition duration-300 ease-in-out"
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="ver-Menu"
        className="hidden md:hidden bg-white shadow-inner border-t border-gray-100"
      >
        <div className="px-4 pt-2 pb-4 space-y-3">
          <div className="flex justify-center">
            {isUserLoggedIn() || isVendorLoggedIn() ? (
              <AccountMenu />
            ) : (
              <Link
                to="/auth/user/login"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full text-center"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-base font-medium ${
                navOption === 0
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
              onClick={() => {
                setNavOption(0);
                hamClick();
              }}
            >
              Home
            </Link>

            <Link
              to="/findServices"
              className={`px-3 py-2 rounded-md text-base font-medium ${
                navOption === 1
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
              onClick={() => {
                setNavOption(1);
                hamClick();
              }}
            >
              Find Services
            </Link>

            <Link
              to="/becomeProvider"
              className={`px-3 py-2 rounded-md text-base font-medium ${
                navOption === 2
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
              onClick={() => {
                setNavOption(2);
                hamClick();
              }}
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;