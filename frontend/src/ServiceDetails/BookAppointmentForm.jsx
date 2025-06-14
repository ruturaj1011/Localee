import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useFlash } from '../contexts/FlashContext.jsx';

function BookAppointmentForm({ showForm, vendorId, serviceId, details }) {
    
    const { addFlashMessage } = useFlash();
    const userId = localStorage.getItem('id');
    const [isLoading, setIsLoading] = useState(false);

    console.log(vendorId, serviceId);

    let [formData, setFormData] = useState({
        type: "Appointment",
        customerName: "",
        vendorName: details.name,
        serviceCategory: details.serviceCategory,
        phone: "",
        date: "",
        time: "",
        address: details.address,
        notes: "",
        vendorId: vendorId || null,
        userId: userId || null,
        serviceId: serviceId || null,
    });

    let handleInputChange = (event) => {
        let { name, value } = event.target;
        setFormData((currData) => ({
            ...currData,
            [name]: value
        }));
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);

            console.log(formData);

            await axios.post(`${import.meta.env.VITE_BASE_URL}/localee/${serviceId}/book`, formData, {
                headers: { "Content-Type": "application/json" }
            });

            showForm(false);

            setFormData({
                type: "Appointment",
                customerName: "",
                vendorName: details.name,
                serviceCategory: details.serviceCategory,
                phone: "",
                date: "",
                time: "",
                address: details.address,
                notes: "",
                vendorId: vendorId || null,
                userId: userId || null,
                serviceId: serviceId || null
            });
            addFlashMessage("Appointment booked successfully.", "success");
        }
        catch (err) {
            console.error(err);
            addFlashMessage("Failed to book appointment. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className="bg-white w-96 mt-12 p-4 pt-0 rounded-lg shadow-lg space-y-6 min-w-2xl mx-auto relative">
                <button
                    onClick={() => showForm(false)}
                    className="absolute top-2 right-2 text-gray-800 hover:text-gray-700"
                    disabled={isLoading}
                >
                    <ClearIcon />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 text-center">Book Appointment</h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter your phone number"
                            disabled={isLoading}
                        />
                    </div>

                    <div className='lg:flex gap-5 w-full'>
                        <div className='w-6/12'>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                disabled={isLoading}
                            />
                        </div>
                        <div className='w-6/12'>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                        <textarea
                            id="notes"
                            rows="3"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Provide any additional details"
                            disabled={isLoading}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Booking...
                            </>
                        ) : (
                            'Confirm Appointment'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookAppointmentForm;