import React from 'react';
import Hero from './Hero';
import ServicesCards from '../utils/ServicesCard';

function findServices() {
    return ( 
        <div>
            <Hero />
            <ServicesCards />
            <ServicesCards />
            <ServicesCards />
        </div>
    );
}

export default findServices;