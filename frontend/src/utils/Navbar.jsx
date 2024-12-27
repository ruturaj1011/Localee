import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from './Avatar';
import "../App.css"

import { AuthContext } from '../contexts/authContext';

function Navbar({idx}) {

    const [navOption, setNavOption] = useState(idx);

    const hamClick = () => {

        let crossIcon = document.getElementById("crossIcon");
        let hamIcon = document.getElementById("hamIcon");

        let verMenu = document.getElementById("ver-Menu");

        if (hamIcon.classList.contains("hidden")) {
            hamIcon.classList.remove("hidden");

            verMenu.classList.add("hidden");
            crossIcon.classList.add("hidden");
        }
        else {
            crossIcon.classList.remove("hidden");
            verMenu.classList.remove("hidden");

            hamIcon.classList.add("hidden");
        }
    }

    
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <nav className='px-6 py-3.5 lg:px-8 bg-white shadow-md w-full z-500 '>

            <div id="nav-cont" className='flex justify-between items-center'>
                <div><h1 className='nav-logo text-3xl font-semibold text-indigo-600'>Localee</h1></div>

                <div className='nav-list list-none flex justify-between items-center text-lg font-medium text-slate-800 gap-8'>


                    <li className='nav-items hover:text-indigo-700' onClick={() => setNavOption(0)}><Link to="/" style={navOption == 0 ? { color: "rgb(79 70 229)" } : {}}>Home</Link></li>

                    <li className='nav-items hover:text-indigo-700' onClick={() => setNavOption(1)}><Link to="/findServices" style={navOption == 1 ? { color: "rgb(79 70 229)" } : {}}>Find Services</Link></li>

                    <li className='nav-items hover:text-indigo-700' onClick={() => setNavOption(2)}><Link to="/becomeProvider" style={navOption == 2 ? { color: "rgb(79 70 229)" } : {}} >Become a Provider</Link></li>

                    {(isLoggedIn()) ? <AccountMenu /> : <li className='bg-indigo-600 hover:bg-indigo-700 rounded-3xl py-1.5 px-6 text-white  text-center'>
                        <Link to="/auth/user/login" className='text-xl'>Sign In</Link>
                    </li>}
                </div>


                <div className='hamburger hidden text-slate-700'>
                    <button id="ham-btn" className='text-xl ' onClick={hamClick} ><i id="hamIcon" className="fa-solid fa-bars p-1 block rounded hover:border-2 hover:border-indigo-700 transition duration-150 ease-in-out"></i> <i id='crossIcon' className=" fa-solid fa-xmark p-1 hidden rounded hover:border-2 hover:border-neutral-800 transition duration-150 ease-in-out"></i></button>
                </div>
            </div>

            <div id="ver-Menu" className='list-none items-center text-lg font-sm text-slate-800 hidden'>

            {(isLoggedIn()) ? <AccountMenu /> : <li className='bg-indigo-600 hover:bg-indigo-700 rounded-3xl py-1.5 px-6 text-white mt-4 text-center'>
                        <Link to="/auth/user/login" className='text-xl'>Sign In</Link>
                    </li>}

                <li className='nav-items hover:text-indigo-700 py-1.5 mt-2'><Link to="/findServices">Find Services</Link></li>

                <li className='nav-items hover:text-indigo-700 py-1.5'><Link to="/becomeProvider" >Become a Provider</Link></li>

                
            </div>
        </nav>
    );
}

export default Navbar;