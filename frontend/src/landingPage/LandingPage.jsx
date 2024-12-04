import React from 'react';

import Hero from './Hero';
import PopularServices from './PopularServices';
import HowItWorks from './HowItWorks';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';

function LandingPage() {
    return ( 
        <div>
            <Navbar idx={0} />
            <Hero />
            <HowItWorks />
            <PopularServices />
            <Footer />
        </div>
     );
}

export default LandingPage;