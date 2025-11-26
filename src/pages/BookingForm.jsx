import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking, uploadDocument } from "../services/api";

export default function BookingForm({ hall }) {
  const [file, setFile] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    hallId: hall.id,
    name: "",
    email: "",
    mobile: "",
    date: "",
    timeSlot: "",
    amount: hall.fee,
  });

  const navigate = useNavigate();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("docType", "ID_PROOF");

      // Upload the document first
      const fileResponse = await uploadDocument(bookingDetails.hallId, formData);

      // After file upload, create the booking
      const bookingResponse = await createBooking(bookingDetails);
      alert("Booking created successfully!");
      navigate(`/payment?bookingId=${bookingResponse.data.id}`);
    } catch (err) {
      console.error("Error", err);
      alert("Booking failed");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h2>Book Your Hall</h2>
        <label>Full Name</label>
        <input
          type="text"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={bookingDetails.email}
          onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
          required
        />
        <label>Mobile</label>
        <input
          type="tel"
          value={bookingDetails.mobile}
          onChange={(e) => setBookingDetails({ ...bookingDetails, mobile: e.target.value })}
          required
        />
        <label>Event Date</label>
        <input
          type="date"
          value={bookingDetails.date}
          onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
          required
        />
        <label>Time Slot</label>
        <select
          value={bookingDetails.timeSlot}
          onChange={(e) => setBookingDetails({ ...bookingDetails, timeSlot: e.target.value })}
          required
        >
          <option value="06:00-08:00">06:00 - 08:00 AM</option>
          <option value="08:00-10:00">08:00 - 10:00 AM</option>
          <option value="10:00-12:00">10:00 - 12:00 PM</option>
          <option value="12:00-14:00">12:00 - 02:00 PM</option>
          <option value="14:00-16:00">02:00 - 04:00 PM</option>
          <option value="16:00-18:00">04:00 - 06:00 PM</option>
          <option value="18:00-20:00">06:00 - 08:00 PM</option>
          <option value="20:00-22:00">08:00 - 10:00 PM</option>
        </select>
        <label>Upload Identity Proof</label>
        <input type="file" onChange={onFileChange} required />
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}
