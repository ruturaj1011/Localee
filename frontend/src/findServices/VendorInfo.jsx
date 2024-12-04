import React,{useState} from "react";
import { Phone, Mail, MessageSquare} from "lucide-react";
import Reviews from "./Reviews";
import BookAppointmentForm from "./BookAppointmentForm";
import BookHomeVisitForm from "./BookHomeVisit";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

const ProviderDetailsPage = () => {

    let [AppointmentFormOpen, setAppointmentFormOpen] = useState(false);
    let [HomeVisitFormOpen, setHomeVisitFormOpen] = useState(false);

    const appointmentIsOpen = (val) => {

        if(HomeVisitFormOpen == true){
            setHomeVisitFormOpen(false);
        }
        setAppointmentFormOpen(val);
    }
    const homeVisitIsOpen = (val) => {
        if(AppointmentFormOpen == true){
            setAppointmentFormOpen(false);
        }
        setHomeVisitFormOpen(val);
    }

    let [callBackFormData, setCallBackFormData] = useState({
        name:"",
        phone:"",
        time:""
    });

    const inputChange = (event) => {

        let inpField = event.target.name;
        let inpValue = event.target.value;

        setCallBackFormData( (currData) => {
            currData[inpField] = inpValue;

            return {...currData};
        })

    }
    const handleCallBackSubmit = (event) => {
        event.preventDefault();
        console.log(callBackFormData);

        setCallBackFormData({
            name:"",
            phone:"",
            time:""
        })
    }
    
    return (
        <>
        
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 z-0">
                {/* Left Section: Provider Details */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 space-y-6">
                    {/* Provider Info */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Provider Name</h2>
                        <p className="text-gray-600">
                            Experienced and trusted professional providing quality services in
                            your area.
                        </p>
                    </div>

                    {/* Contact Options */}
                    <div className="pt-6 space-y-3">
                        <p className="flex items-center text-gray-600">
                            <Phone className="mr-2 w-5 h-5 text-indigo-500" />
                            +1 234 567 890
                        </p>
                        <p className="flex items-center text-gray-600">
                            <MessageSquare className="mr-2 w-5 h-5 text-green-500" />
                            WhatsApp: +1 234 567 891
                        </p>
                        <p className="flex items-center text-gray-600">
                            <Mail className="mr-2 w-5 h-5 text-gray-500" />
                            vendor.email@example.com
                        </p>
                    </div>



                    {/* Book Home Visit */ /* Book Appointment */}
                    <div>
                        <button onClick={() => {appointmentIsOpen(true)}} className="w-full bg-indigo-500 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-600 mb-1 ">
                            Book Appointment
                        </button>
                        <button onClick={() => {homeVisitIsOpen(true)}} className="w-full bg-purple-500 mt-1 text-white px-6 py-3 rounded-md shadow hover:bg-purple-600">
                            Book Home Visit
                        </button>
                    </div>


                    {/* Request Call Back */}
                    <form onSubmit={handleCallBackSubmit} className="bg-gray-100 p-4 rounded-md shadow-md space-y-3">
                        <h3 className="text-lg font-semibold">Request a Call Back</h3>
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            value={callBackFormData.name}
                            onChange={inputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={callBackFormData.phone}
                            onChange={inputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="time"
                            placeholder="Preferred Time"
                            name="time"
                            value={callBackFormData.time}
                            onChange={inputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Book Appointment Form*/}
                { AppointmentFormOpen && <BookAppointmentForm showForm={appointmentIsOpen} />}
                {/* Book Home Visit Form*/}
                { HomeVisitFormOpen && <BookHomeVisitForm showForm={homeVisitIsOpen} />}

                {/* Right Section: Images Carousel and Reviews */}
                <div className="w-full lg:w-2/3 space-y-6">
                    {/* Image Carousel */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                        <div className="relative">
                            <div className="carousel flex overflow-x-scroll gap-4 hide-scrollbar">
                                {[1, 2, 3, 4].map((item) => (
                                    <img
                                        key={item}
                                        src={"https://img.freepik.com/free-photo/man-doing-professional-home-cleaning-service_23-2150359014.jpg?t=st=1731408751~exp=1731412351~hmac=e4c53501a1bb2e6596e81ce11e74be606b4be342604f52f38d23aff855a5d82b&w=740"}
                                        alt={`Provider Image ${item}`}
                                        className="rounded-lg w-64 h-48 object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    

                    {/* Reviews Section */}
                    <Reviews />


                    {/* Service Area Map */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Service Area</h3>
                        <div className="h-64 w-full rounded-md overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d241318.1160988851!2d72.87284949697013!3d19.07298367015031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1604911832890!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                className="border border-gray-300"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <Footer />
        </>
    );
};

export default ProviderDetailsPage;
