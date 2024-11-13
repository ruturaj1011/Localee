import React from 'react';

import Navbar from "../utils/Navbar";
import Hero from './Hero';
import PopularServices from './PopularServices';
import HowItWorks from './HowItWorks';
import Footer from "../utils/Footer";

function LandingPage() {
    return ( 
        <div>
            <Navbar />
            <Hero />
            <PopularServices />
            <HowItWorks />
            <Footer />
        </div>
     );
}

export default LandingPage;