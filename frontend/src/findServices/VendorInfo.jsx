import React,{useState} from "react";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";

const ProviderDetailsPage = () => {
    const reviews = [
        { user: "John Doe", review: "Excellent service and very professional!", rating: 4 },
        { user: "Jane Smith", review: "Quick response and highly recommended.", rating: 4 },
        { user: "Alice Brown", review: "Affordable and efficient service.", rating: 4 },
        { user: "Chris Lee", review: "Great experience! Will book again.", rating: 4 },
    ];

    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        setShowReviewForm(false);  // Close the form
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
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
                        <button className="w-full bg-indigo-500 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-600 mb-1">
                            Book Appointment
                        </button>
                        <button className="w-full bg-purple-500 mt-1 text-white px-6 py-3 rounded-md shadow hover:bg-purple-600">
                            Book Home Visit
                        </button>
                    </div>


                    {/* Request Call Back */}
                    <form className="bg-gray-100 p-4 rounded-md shadow-md space-y-3">
                        <h3 className="text-lg font-semibold">Request a Call Back</h3>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="time"
                            placeholder="Preferred Time"
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
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Reviews</h3>

                        {/* Add Review Button */}
                        <div className="mb-4">
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Add Review
                            </button>
                        </div>

                        {/* Reviews List */}
                        <div className="max-h-60 overflow-y-scroll space-y-4 hide-scrollbar">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b pb-4 relative">
                                    <h4 className="font-medium text-gray-900">{review.user}</h4>
                                    <p className="text-gray-600 text-sm">{review.review}</p>

                                    {/* Star Rating in Bottom Right Corner */}
                                    <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill={i < review.rating ? "gold" : "gray"} // Color change based on rating
                                                className="bi bi-star"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3.612 15.443c-.396.208-.863-.1-.743-.577L5.07 9.865 1.37 6.343c-.319-.31-.152-.888.283-.94l4.993-.723 2.06-4.931c.198-.478.846-.478 1.044 0l2.06 4.931 4.993.723c.435.052.602.63.283.94l-3.7 3.522 1.201 4.001c.12.477-.347.785-.743.577L8 12.47l-3.657 2.973a.537.537 0 0 1-.731-.073l-1.201-4.001L3.612 15.443z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Review Form (conditionally rendered) */}
                        {showReviewForm && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Add Your Review</h4>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
                                        <textarea
                                            id="review"
                                            name="review"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            className="mt-1 p-2 w-full border rounded-md"
                                            required
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>


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
    );
};

export default ProviderDetailsPage;
