import React from 'react';
import { Trash, Trash2 } from 'lucide-react';
import { ArrowRight } from '@mui/icons-material';

function Bookings() {

    const upcomingBookings = [
        { id: 1, name: "John Doe", service: "Home Cleaning", location: "123 Main Street, City", date: "2024-11-20", time: "10:00 AM", status: "Accepted" },
        { id: 2, name: "Jane Smith", service: "Plumbing", location: "123 Main Street, City", date: "2024-11-22", time: "2:00 PM", status: "Pending" },
        { id: 3, name: "John Doe", service: "Home Cleaning", location: "123 Main Street, City", date: "2024-11-20", time: "10:00 AM", status: "Accepted" },
        { id: 4, name: "Jane Smith", service: "Plumbing", location: "123 Main Street, City", date: "2024-11-22", time: "2:00 PM", status: "Accepted" },
        { id: 5, name: "John Doe", service: "Home Cleaning", location: "123 Main Street, City", date: "2024-11-20", time: "10:00 AM", status: "Pending" },
        { id: 6, name: "Jane Smith", service: "Plumbing", location: "123 Main Street, City", date: "2024-11-22", time: "2:00 PM", status: "Accepted" },
    ];
    
    const bookingHistory = [
        { id: 1, name: "Alex Brown", service: "Photography", date: "2024-11-10", status: "Completed" },
        { id: 2, name: "Emily Davis", service: "Beauty & Wellness", date: "2024-11-15", status: "Cancelled" },
    ];
    
    const getStatusBadge = (status) => {
      let badgeClass = "";
  
      switch (status) {
        case "Accepted":
          badgeClass = "bg-green-100 text-green-800";
          break;
        case "Rejected":
          badgeClass = "bg-red-100 text-red-800";
          break;
        case "Pending":
          badgeClass = "bg-yellow-100 text-yellow-800";
          break;
        case "Completed":
            badgeClass = "bg-green-100 text-yellow-800";
            break;
        case "Cancelled":
              badgeClass = "bg-red-100 text-yellow-800";
              break;
        default:
          badgeClass = "bg-gray-100 text-gray-800";
      }
  
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}
        >
          {status}
        </span>
      );
    };
    
    return ( 

        <main className="flex-1 bg-gray-100 p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>

        {/* Two Columns for Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upcoming Bookings */}
          <div className="bg-white p-4 rounded shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
            {upcomingBookings.map((booking) => (
              
              <button key={booking.id} className="p-4 shadow-md w-full border-gray-200 items-center hover:shadow-lg mt-1">

                <div className='text-left'>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-gray-600">{booking.service}</p>
                  <p className="text-gray-500">{booking.date} at {booking.time}</p>
                </div>
                <div className="flex gap-2 justify-between">
                  
                  <p className="text-gray-600 mt-1">Status : {getStatusBadge(booking.status)}</p>
                  <button
                      onClick={() => handleAction(booking.id, "accept")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                    Accept
                  </button>
              
                </div>
              </button>
            ))}
          </div>

          {/* Booking History */}
          <div className="bg-white p-4 rounded shadow h-fit">
            
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
                <p className="text-gray-500">{history.date} - {getStatusBadge(history.status)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
}

export default Bookings;