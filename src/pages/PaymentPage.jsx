import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { payBooking } from "../services/api"; // Import the correct API function

export default function PaymentPage() {
  const [bookingId, setBookingId] = useState(null);
  const [paymentRef, setPaymentRef] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setBookingId(urlParams.get("bookingId"));
  }, []);

  const handlePayment = async () => {
    try {
      const res = await payBooking(bookingId, paymentRef); // Replace makePayment with payBooking
      alert("Payment successful!");
      navigate(`/confirmation?bookingId=${bookingId}`);
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <input
        type="text"
        value={paymentRef}
        onChange={(e) => setPaymentRef(e.target.value)}
        placeholder="Enter payment reference"
        required
      />
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
}
