import React from "react";
import { Link } from "react-router-dom";

export default function HallCard({ hall }) {
  return (
    <div className="card">
      <h3>{hall.name}</h3>
      <p><small>{hall.address}</small></p>
      <p>Capacity: {hall.capacity}</p>
      <p>Amount per slot: ₹{hall.fee}</p>
      <Link to={`/book/${hall.id}`} className="btn">Book Now</Link>
    </div>
  );
}
