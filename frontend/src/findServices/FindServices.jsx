
import Hero from './Hero.jsx';
import ServicesCards from '../utils/ServicesCard.jsx';

import { Wrench, Camera, Home, Scissors, Car, Heart } from 'lucide-react';
import Navbar from '../utils/Navbar.jsx';
import Footer from '../utils/Footer.jsx';

const services = [
    { icon: Wrench, name: 'Plumbing', count: '250+ Providers' },
    { icon: Camera, name: 'Photography', count: '180+ Providers' },
    { icon: Home, name: 'Home Cleaning', count: '320+ Providers' },
    { icon: Scissors, name: 'Beauty & Wellness', count: '290+ Providers' },
    { icon: Car, name: 'Auto Services', count: '150+ Providers' },
    { icon: Heart, name: 'Healthcare', count: '200+ Providers' },
  ];

function findServices() {
    return ( 
        <div>
            <Navbar idx={1}/>
            <Hero />
            <ServicesCards services={services} category={"Populer Services"} subHeading={"eskdfjn"} eleId={"populer"} />
            <ServicesCards services={services} category={"Car Services"} subHeading={"eskdfjn"} eleId={"cars"}/>
            <ServicesCards services={services} category={"Home Services"} subHeading={"eskdfjn"} eleId={"home"}/>
            <Footer />
        </div>
    );
}

export default findServices;