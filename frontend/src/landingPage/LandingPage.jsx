import React from 'react';

import Hero from './Hero';
import PopularServices from './PopularServices';
import HowItWorks from './HowItWorks';

function LandingPage() {
    return ( 
        <div>
            <Hero />
            <HowItWorks />
            <PopularServices />
        </div>
     );
}

export default LandingPage;