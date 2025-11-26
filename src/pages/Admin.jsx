import React, { useState, useEffect } from "react";
import { getBookings, approveBooking, rejectBooking } from "../services/api"; // Make sure the API call is correct

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      const res = await getBookings(); // Corrected API call
      setBookings(res.data); // Ensure you're setting the correct field based on your API response
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  // Handle approve booking
  const handleApprove = async (id) => {
    await approveBooking(id); // API call to approve booking
    fetchBookings(); // Re-fetch bookings after approval
  };

  // Handle reject booking
  const handleReject = async (id) => {
    await rejectBooking(id); // API call to reject booking
    fetchBookings(); // Re-fetch bookings after rejection
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings on initial render
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p>{booking.name}</p>
            <p>{booking.email}</p>
            <button onClick={() => handleApprove(booking.id)}>Approve</button>
            <button onClick={() => handleReject(booking.id)}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
}
