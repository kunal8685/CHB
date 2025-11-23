import React, { useState } from "react";
import { payBooking } from "../services/api";

export default function PaymentPage() {
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const doPay = async () => {
    if (!bookingId) return alert("Enter booking ID");
    try {
      const resp = await payBooking(bookingId, "SIM_" + Date.now());
      setMessage("Payment simulated. Receipt downloaded.");
      // the backend returns attachment; browser will receive it when calling via link,
      // but here we don't auto-download binary. We just show message.
    } catch (err) {
      setMessage("Payment failed");
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Simulate Payment</h2>
      <div className="card">
        <label>Booking ID</label>
        <input value={bookingId} onChange={(e)=>setBookingId(e.target.value)} placeholder="e.g. 101" />
        <button className="btn" onClick={doPay}>Pay Now (simulate)</button>
        {message && <div className="muted" style={{ marginTop: 12 }}>{message}</div>}
      </div>
    </div>
  );
}
