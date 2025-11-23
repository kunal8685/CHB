import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../services/api";

export default function BookingForm() {
  // hallId may come from route param or query param; we will read from URL
  const params = new URLSearchParams(window.location.search);
  const hallIdParam = params.get("hallId") || window.location.pathname.split("/book/")[1];
  const hallId = hallIdParam || null;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    hallId: hallId ? Number(hallId) : null,
    name: "",
    email: "",
    mobile: "",
    date: "",
    timeSlot: "",
    amount: ""
  });

  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await createBooking({
        ...form,
        userId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).userId : null
      });
      alert("Booking created. After approval, please pay from Payment page.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Book Hall</h2>
      <form className="card" onSubmit={submit}>
        <label>Name</label>
        <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <label>Email</label>
        <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
        <label>Mobile</label>
        <input value={form.mobile} onChange={(e)=>setForm({...form, mobile:e.target.value})} required />
        <label>Date</label>
        <input type="date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} required />
        <label>Time Slot</label>
        <select value={form.timeSlot} onChange={(e)=>setForm({...form, timeSlot:e.target.value})} required>
          <option value="">Select</option>
          <option>06:00-08:00</option>
          <option>08:00-10:00</option>
          <option>10:00-12:00</option>
          <option>18:00-20:00</option>
        </select>
        <label>Amount (₹)</label>
        <input type="number" value={form.amount} onChange={(e)=>setForm({...form, amount:e.target.value})} required />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit" disabled={busy}>{busy ? "Booking..." : "Book Now"}</button>
        </div>
      </form>
    </div>
  );
}
