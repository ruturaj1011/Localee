import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa"; // Icons for actions and rating
import { Email, LocationCity, Phone, WhatsApp } from "@mui/icons-material";
import { useFlash } from "../../../contexts/flashContext.jsx";


const ServiceDetails = () => {
    const { id, serviceId } = useParams();
    const { addFlashMessage } = useFlash();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch service details
    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/vendor/${id}/${serviceId}`
                );
                setService(response.data);
            } catch (err) {
                setError("Failed to fetch service details.");
                addFlashMessage("Failed to fetch service details. Please try again.", "error");
                navigate(-1);
                console.error(err);
            }
        };

        // Fetch reviews for the service
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/reviews/${serviceId}`
                );
                setReviews(response.data);
            } catch (err) {
                setError("Failed to fetch reviews.");
                addFlashMessage("Failed to fetch reviews", "error");
                console.error(err);
            }
        };

        fetchServiceDetails();
        fetchReviews();
        setLoading(false);
    }, [serviceId]);

    // Handle remove service
    const handleRemoveService = async () => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/vendor/${id}/services/${serviceId}/delete`
            );
            addFlashMessage("Service removed successfully.", "success");
            navigate(`/vendor/${id}/yourServices`); // Redirect to vendor dashboard
            window.location.reload();
        } catch (err) {
            addFlashMessage("Failed to remove service. Please try again.", "error");
            console.error(err);
        }
    };

    // Handle edit service
    const handleEditService = () => {
        navigate(`/vendor/${id}/yourServices/service/${serviceId}/edit`, { state: { service: service } });
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto bg-white p-8 shadow-2xl rounded-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{service?.serviceName}</h2>

            {/* Service Details */}
            <div className="space-y-8">
                {/* Category and Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                        <p className="text-xl text-gray-800">{service?.category}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                        <p className="text-xl text-gray-800">{service?.description}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Contact Info</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="flex gap-1 "><Email className="mt-1 text-lg text-blue-950" /><p className="text-lg">{service?.email}</p></div>
                        <div className="flex gap-1"><WhatsApp className="pt-1  text-green-700" /><p className="text-lg">{service?.whatsappNumber}</p></div>
                        <div className="flex gap-1"><Phone className="pt-1  text-blue-700" /><p className="text-lg">{service?.contactNumber}</p></div>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                    <p className="text-lg text-gray-800 pt-2">
                        <LocationCity className="pb-1" /> {service?.address}, {service?.city}, {service?.state}, {service?.zip}
                    </p>
                </div>

                {/* Service Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {service?.images.map((img, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={img}
                                    alt={`Service Image ${index + 1}`}
                                    className="w-full h-40 object-cover rounded-lg transform transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Reviews</label>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <img src={review.authorPhoto} alt={review.author} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">{review.author}</p>
                                        <div className="flex items-center space-x-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`text-xl ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700">{review.text}</p>
                                <p className="text-sm text-gray-500 mt-2">{review.time}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg text-gray-800">No reviews yet.</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleEditService}
                        className="flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <FaEdit className="mr-2" /> Edit Service
                    </button>
                    <button
                        onClick={handleRemoveService}
                        className="flex items-center px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <FaTrash className="mr-2" /> Remove Service
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;