

import Hero from './Hero.jsx';
import PopularServices from './PopularServices.jsx';
import HowItWorks from './HowItWorks.jsx';
import Navbar from '../utils/Navbar.jsx';
import Footer from '../utils/Footer.jsx';

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