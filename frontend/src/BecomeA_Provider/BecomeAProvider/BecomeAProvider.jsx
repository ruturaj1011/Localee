
import Header from '../components/Header.jsx'
import WhyJoin from '../components/WhyJoin.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import RegistrationForm from '../components/RegistrationForm.jsx'
import Footer from '../components/Footer.jsx';
import Navbar from '../../utils/Navbar.jsx'

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