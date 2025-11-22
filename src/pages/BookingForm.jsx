// BookingForm.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHall,
  createBooking,
  uploadDocument,
  getBookingsForHall
} from "../services/api"; // Ensure correct import

export default function BookingForm() {
  const { hallId } = useParams();
  const navigate = useNavigate();

  const [hall, setHall] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    timeSlot: "09:00-12:00",
  });

  const [existing, setExisting] = useState([]);

  useEffect(() => {
    getHall(hallId).then((res) => setHall(res.data));
    getBookingsForHall(hallId).then((res) => setExisting(res.data));
  }, [hallId]);

  const timeSlots = [
    "09:00-12:00",
    "12:30-15:30",
    "16:00-19:00",
    "19:30-22:00",
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.mobile || !form.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        hallId: parseInt(hallId),
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        date: form.date,
        timeSlot: form.timeSlot,
      };

      const res = await createBooking(payload);
      const newBookingId = res.data.id;

      setBookingId(newBookingId);
      alert("Booking created! Please upload your document.");
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first.");
    if (!bookingId) return alert("Create booking first.");

    try {
      await uploadDocument(bookingId, file);
      alert("Document uploaded successfully!");
      navigate("/");
    } catch (err) {
      alert("Upload failed");
    }
  };

  if (!hall) return <div>Loading hall...</div>;

  return (
    <div>
      <h2>Book: {hall.name}</h2>
      <div className="card" style={{ marginBottom: 16 }}>
        <p><strong>Address:</strong> {hall.address}</p>
        <p><strong>Capacity:</strong> {hall.capacity}</p>
        <p><strong>Fee per slot:</strong> ₹{hall.fee}</p>
      </div>
      <form className="card" onSubmit={submit}>
        <div className="form-row">
          <label>Full name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Mobile</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Time Slot</label>
          <select name="timeSlot" value={form.timeSlot} onChange={handleChange}>
            {timeSlots.map((ts) => (
              <option key={ts} value={ts}>{ts}</option>
            ))}
          </select>
        </div>
        <button className="btn" type="submit">Create Booking</button>
      </form>

      {bookingId && (
        <div className="card" style={{ marginTop: 16 }}>
          <h4>Upload Document</h4>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button className="btn" onClick={handleUpload} style={{ marginTop: 10 }}>
            Upload
          </button>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <h4>Existing bookings for this hall</h4>
        {existing.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          existing.map((b) => (
            <div key={b.id} className="card" style={{ marginBottom: 8 }}>
              <div>
                <strong>{b.name}</strong> — {b.date} | {b.timeSlot} | {b.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
