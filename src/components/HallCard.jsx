import React from "react";
import { MapPin, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function HallCard({ hall }) {
  return (
    <div className="hall-card">
      <div className="hall-image">
        <img src={hall.imageUrl || "https://images.unsplash.com/photo-1519167758481-83f29da8c89f?w=400&h=300&fit=crop"} alt={hall.name} />
        <div className="hall-badge">Available</div>
      </div>
      
      <div className="hall-content">
        <h3 className="hall-name">{hall.name}</h3>
        
        <div className="hall-info">
          <div className="info-item">
            <MapPin size={16} />
            <span>{hall.address}</span>
          </div>
          <div className="info-item">
            <Users size={16} />
            <span>{hall.capacity} guests</span>
          </div>
          <div className="info-item">
            <DollarSign size={16} />
            <span>₹{hall.fee?.toLocaleString()}</span>
          </div>
        </div>

        <div className="hall-actions">
          <Link to={`/hall/${hall.id}`} className="btn-secondary">
            View Details
          </Link>
          <Link to={`/book/${hall.id}`} className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}