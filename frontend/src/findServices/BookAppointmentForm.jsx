import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

function BookAppointmentForm({ showForm }) {

    let [formData, setFormData] = useState({

        name: "",
        phone: "",
        date: "",
        time: "",
        notes: ""
    });

    let handleInputChange = (event) => {

        let fieldName = event.target.name;
        let newValue = event.target.value;

        setFormData((currData) => {
            currData[fieldName] = newValue;

            return { ...currData };
        });
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        showForm(false);

        setFormData({
            name: "",
            phone: "",
            date: "",
            time: "",
            notes: ""
        });
    }

    return (

        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>

            <div className="bg-white w-96 mt-12 p-4  pt-0 rounded-lg shadow-lg space-y-6 min-w-2xl mx-auto relative">

                <button
                        onClick={() => showForm(false)}
                        className="absolute top-2 right-2 text-gray-800 hover:text-gray-700"
                    >
                        <ClearIcon />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 text-center">Book Appointment</h2>
                <form className="space-y-3 " onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className='lg:flex gap-5 w-full'>
                        <div className='w-6/12'>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Preferred Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name='date'
                            value={formData.date}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                        <div className='w-6/12'>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Preferred Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            name='time'
                            value={formData.time}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Additional Notes
                        </label>
                        <textarea
                            id="notes"
                            rows="3"
                            name='notes'
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