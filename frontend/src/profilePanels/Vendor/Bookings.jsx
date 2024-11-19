import React from 'react';
import { Trash, Trash2 } from 'lucide-react';

function Bookings() {

    const upcomingBookings = [
        { id: 1, name: "John Doe", service: "Home Cleaning", date: "2024-11-20", time: "10:00 AM" },
        { id: 2, name: "Jane Smith", service: "Plumbing", date: "2024-11-22", time: "2:00 PM" },
    ];
    
    const bookingHistory = [
        { id: 1, name: "Alex Brown", service: "Photography", date: "2024-11-10", status: "Completed" },
        { id: 2, name: "Emily Davis", service: "Beauty & Wellness", date: "2024-11-15", status: "Cancelled" },
    ];
    
    const handleAction = (id, action) => {
        console.log(`Booking ID: ${id} | Action: ${action}`);
    };
    
    return ( 

        <main className="flex-1 bg-gray-100 p-6 mt-16">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>

        {/* Two Columns for Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-gray-600">{booking.service}</p>
                  <p className="text-gray-500">{booking.date} at {booking.time}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(booking.id, "accept")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(booking.id, "reject")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Booking History */}
          <div className="bg-white p-4 rounded shadow">
            
            <div className='flex justify-between'>
              <h2 className="text-lg font-semibold mb-4">Booking History</h2>
              <button className='rounded-2xl w-fit px-2 py-1 h-fit border-2 flex text-sm font-medium hover:border-stone-600'>Clear All <Trash2 size={18} className='mt-0.2 ms-1' /></button>
            </div>

            {bookingHistory.map((history) => (
              <div key={history.id} className="p-4 border-b border-gray-200">
                <div className='flex justify-between'>
                  <p className="font-medium">{history.name}</p>
                  <button><Trash size={16} strokeWidth={1.25} /></button>
                </div>
                <p className="text-gray-600">{history.service}</p>
                <p className="text-gray-500">{history.date} - {history.status}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
}

export default Bookings;