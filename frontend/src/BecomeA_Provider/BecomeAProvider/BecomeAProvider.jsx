import React from 'react'
import Header from '../components/Header'
import WhyJoin from '../components/WhyJoin'
import HowItWorks from '../components/HowItWorks'
import RegistrationForm from '../components/RegistrationForm'
import Footer from '../components/Footer';
import Navbar from '../../utils/Navbar'

const BecomeAProvider = () => {
  return (
   <>
    <Navbar idx={2} />
    <Header />
    <WhyJoin />
    <HowItWorks />
    <RegistrationForm />
    <Footer />
   </>
  )
}

export default BecomeAProvider