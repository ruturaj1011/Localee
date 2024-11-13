import React from 'react';
import "../App.css"

function Navbar() {

    const hamClick = () => {

        let crossIcon = document.getElementById("crossIcon");
        let hamIcon = document.getElementById("hamIcon");

        let verMenu = document.getElementById("ver-Menu");

        if(hamIcon.classList.contains("hidden")){
            hamIcon.classList.remove("hidden");

            verMenu.classList.add("hidden");
            crossIcon.classList.add("hidden");
        }
        else{
            crossIcon.classList.remove("hidden");
            verMenu.classList.remove("hidden");

            hamIcon.classList.add("hidden");
        }
    }

    return ( 
        <nav className='px-6 py-3.5 lg:px-8 bg-white fixed shadow-sm w-full z-50'>

            <div id="nav-cont" className='flex justify-between items-center'>
                <div><h1 className='nav-logo text-3xl font-semibold text-indigo-600'>Localee</h1></div>

                <div className='nav-list list-none flex justify-between items-center text-lg font-sm text-slate-800 gap-8'>

                    <li className='nav-items hover:text-indigo-700'><a href="#">Find Services</a></li>

                    <li className='nav-items hover:text-indigo-700'><a href="#" >Become a Provider</a></li>

                    <li className='bg-indigo-600 hover:bg-indigo-700 rounded-3xl py-1.5 px-6 text-white'>
                        <a href="#">Sign In</a>
                    </li>

                </div>
                

                <div className='hamburger hidden text-slate-700'>
                    <button id="ham-btn" className='text-xl ' onClick={hamClick} ><i id="hamIcon" className="fa-solid fa-bars p-1 block rounded hover:border-2 hover:border-indigo-700 transition duration-150 ease-in-out"></i> <i id='crossIcon' className=" fa-solid fa-xmark p-1 hidden rounded hover:border-2 hover:border-neutral-800 transition duration-150 ease-in-out"></i></button>
                </div>
            </div>

            <div id="ver-Menu" className='list-none items-center text-lg font-sm text-slate-800 hidden'>

                <li className='nav-items hover:text-indigo-700 py-1.5 mt-2'><a href="#">Find Services</a></li>

                <li className='nav-items hover:text-indigo-700 py-1.5'><a href="#" >Become a Provider</a></li>

                <li className='bg-indigo-600 hover:bg-indigo-700 rounded-3xl py-1.5 px-6 text-white text-center my-2'>
                    <a href="#">Sign In</a>
                </li>

            </div>
        </nav>
    );
}

export default Navbar;