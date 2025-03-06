import React from 'react';
import { Trash, Trash2 } from 'lucide-react';
import { ArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

function Bookings() {

    const [pendingBookings, setPendingBookings] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [acceptedBookings, setAcceptedBookings] = useState([]);

    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    const fetchBookings = async () => {
      try {

        const bookings = await axios.get(`http://localhost:8000/localee/${role}/${id}/bookingslist`);

        setPendingBookings(bookings.data.pendingBookings);
        setAcceptedBookings(bookings.data.acceptedBookings);
        setBookingHistory(bookings.data.bookingHistory);

        console.log(bookings.data);
      }
      catch (error) { 
        console.error("Error fetching bookings:", error);
      }
    }

    useEffect(() => {
      fetchBookings();
    }, [id]);
    
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
    

    const navigate = useNavigate();
      
    const onBookingClick = (booking) => {
          navigate(`/vendor/${id}/bookings/${booking.id}/details`, { state: booking });
        };

    return ( 

        <main className="flex-1 bg-gray-100 p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>

        {/* Two Columns for Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upcoming Bookings */}
          <div className="bg-white p-4 rounded shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
            {pendingBookings.map((booking) => (
              
              <div key={booking._id} className="p-4 shadow-md w-full border-gray-200 items-center hover:shadow-lg mt-1" onClick={()=>onBookingClick(booking)}>

                <div className='text-left'>
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-gray-600">{booking.serviceCategory}</p>
                  <p className="text-gray-600">{booking.type}</p>
                  {booking.time ? <p className="text-gray-500">{booking.date}  at {booking.time}</p> : <p className="text-gray-500">{booking.date} </p>}
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
              </div>
            ))}
            {acceptedBookings.map((booking) => (
              
              <div key={booking.id} className="p-4 shadow-md w-full border-gray-200 items-center hover:shadow-lg mt-1" onClick={()=>onBookingClick(booking)}>

                <div className='text-left'>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-gray-600">{booking.serviceName}</p>
                  <p className="text-gray-600">{booking.type}</p>
                  {booking.time ? <p className="text-gray-500">{booking.date}  at {booking.time}</p> : <p className="text-gray-500">{booking.date} </p>}
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
              </div>
            ))}

            {pendingBookings.length === 0 && acceptedBookings.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <p>No upcoming bookings</p>
              </div>
            )}
          </div>

          {/* Booking History */}
          <div className="bg-white p-4 rounded shadow h-fit">
            
            <div className='flex justify-between'>
              <h2 className="text-lg font-semibold mb-4">Booking History</h2>
              <button className='rounded-2xl w-fit px-2 py-1 h-fit border-2 flex text-sm font-medium hover:border-stone-600'>Clear All <Trash2 size={18} className='mt-0.2 ms-1' /></button>
            </div>

            {bookingHistory.length > 0 ? bookingHistory.map((history) => (
              <div key={history.id} className="p-4 border-b border-gray-200">
                <div className='flex justify-between'>
                  <p className="font-medium">{history.name}</p>
                  <button><Trash size={16} strokeWidth={1.25} /></button>
                </div>
                <p className="text-gray-600">{history.service}</p>
                <p className="text-gray-500">{history.date} - {getStatusBadge(history.status)}</p>
              </div>
            )) : <div className="p-4 text-center text-gray-500">
                  <p>No upcoming bookings</p>
                </div>
            }
          </div>
        </div>
      </main>
    );
}

export default Bookings;