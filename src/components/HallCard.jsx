import React from "react";
import { Link } from "react-router-dom";

export default function HallCard({ hall }) {
  return (
    <div className="card hall-card">
      <div className="hall-image" style={{ backgroundImage: `url(${hall.imageUrl || '/placeholder.png'})` }} />
      <div className="hall-body">
        <h3>{hall.name}</h3>
        <p className="muted">{hall.address}</p>
        <div className="hall-meta">
          <span>Capacity: {hall.capacity}</span>
          <span>Fee: ₹{hall.fee}</span>
        </div>
        <div className="card-actions">
          <Link to={`/hall/${hall.id}`} className="btn-sm">Details</Link>
          <Link to={`/book/${hall.id}`} className="btn-outline">Book Now</Link>
        </div>
      </div>
    </div>
  );
}
