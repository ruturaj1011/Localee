import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

function BookAppointmentForm({ showForm, vendorId, serviceId, details }) {
    const userId = localStorage.getItem('id');

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
        event.preventDefault();
        
        console.log(formData);

        await axios.post('http://localhost:8000/localee/book', formData, {
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
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className="bg-white w-96 mt-12 p-4 pt-0 rounded-lg shadow-lg space-y-6 min-w-2xl mx-auto relative">
                <button
                    onClick={() => showForm(false)}
                    className="absolute top-2 right-2 text-gray-800 hover:text-gray-700"
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
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Confirm Appointment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookAppointmentForm;
