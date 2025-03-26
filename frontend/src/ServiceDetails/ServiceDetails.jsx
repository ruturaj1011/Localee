import React,{useEffect, useState} from "react";
import { Phone, Mail, MessageSquare, MapPinCheckIcon} from "lucide-react";
import Reviews from "./Reviews";
import BookAppointmentForm from "./BookAppointmentForm";
import BookHomeVisitForm from "./BookHomeVisit";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../contexts/flashContext";

import useAuth from "../utils/authMiddleware";

const ProviderDetailsPage = () => {

    const Location = useLocation();

    const details = Location.state || {};

    const id = localStorage.getItem("id");

    const data = details.details;

    // console.log(data);
    const { addFlashMessage } = useFlash();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
          if (data.isStored === true) {
            try {
              const res = await axios.get(`http://localhost:8000/reviews/${data.place_id}`);
              setReviews(res.data);
            } catch (err) {
              console.error("Error fetching reviews:", err);
                addFlashMessage("Failed to fetch reviews.", "error");
            }
          }
        };
      
        fetchReviews();
    }, [data.isStored, data.place_id]);
      

    // console.log(data);

    useAuth();

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
        <div className="min-h-screen bg-gray-50">
            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 z-0">

                {/* Left Section: Provider Details */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 space-y-6">
                    {/* Provider Info */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
                        {data.description && <p className="text-gray-600">{data.description}</p>}
                    </div>

                    {/* Contact Options */}
                    <div className="pt-6 space-y-3">
                        <p className="flex items-center text-gray-600">
                            <MapPinCheckIcon className="mr-2 w-6 h-6 text-green-600" />{data.address}
                        </p>
                        <p className="flex items-center text-gray-600">
                            <Phone className="mr-2 w-5 h-5 text-indigo-500" />
                            {data.phone}
                        </p>
                        <p className="flex items-center text-gray-600">
                            <MessageSquare className="mr-2 w-5 h-5 text-green-500" />
                            WhatsApp: {data.whatsapp}
                        </p>
                        {data.email && <p className="flex items-center text-gray-600">
                            <Mail className="mr-2 w-5 h-5 text-gray-500" />
                            {data.email}
                        </p>}
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
                { AppointmentFormOpen && <BookAppointmentForm showForm={appointmentIsOpen} vendorId={data.owner ? data.owner : null} serviceId={data.place_id} details={data}/>}
                {/* Book Home Visit Form*/}
                { HomeVisitFormOpen && <BookHomeVisitForm showForm={homeVisitIsOpen} vendorId={data.owner ? data.owner : null} serviceId={data.place_id} details={data}/>}

                {/* Right Section: Images Carousel and Reviews */}
                <div className="w-full lg:w-2/3 space-y-6">
                    {/* Image Carousel */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                        <div className="relative">
                            <div className="carousel flex overflow-x-scroll gap-4 hide-scrollbar">
                                {data.images && data.images.map((item, idx) => (
                                    <img
                                        key={idx}
                                        src={item.url}
                                        width={item.width}
                                        alt={`Provider Image ${item}`}
                                        className="rounded-lg w-64 h-48 object-cover"
                                        loading="lazy"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    

                    {/* Reviews Section */}
                    <Reviews reviews={data.isStored === true ? reviews : data.reviews} rating={data.rating} totalRatings={data.totalRatings} serviceId={data.place_id} owner={id} isStored={data.isStored}/>


                    {/* Service Area Map */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Service Area</h3>
                        <div className="h-64 w-full rounded-md overflow-hidden">
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_LOCALEE}&q=${data.address}`}
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
