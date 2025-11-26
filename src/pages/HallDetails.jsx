import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getHall, getBookingsForHall } from "../services/api";
import Spinner from "../components/Spinner";
import { MapPin, Users, DollarSign, Calendar, Clock, ArrowLeft } from "lucide-react";

export default function HallDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hall, setHall] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    Promise.all([
      getHall(id).then(res => setHall(res.data)).catch(() => setError(true)),
      getBookingsForHall(id).then(res => setBookings(res.data)).catch(() => setBookings([]))
    ]).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '3rem' }}>
        <Spinner />
      </div>
    );
  }

  if (error || !hall) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
        <div style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>
          <h2>Hall not found</h2>
          <p>The hall you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1>Hall Details</h1>
      </div>

      <div className="hall-details-container">
        <div className="hall-details-card">
          <div className="hall-details-image">
            <img src={hall.imageUrl || "https://images.unsplash.com/photo-1519167758481-83f29da8c89f?w=800&h=400&fit=crop"} alt={hall.name} />
          </div>
          
          <div className="hall-details-content">
            <h1 className="hall-details-name">{hall.name}</h1>
            
            <div className="hall-details-info">
              <div className="info-item-large">
                <MapPin size={20} />
                <span>{hall.address}</span>
              </div>
              <div className="info-item-large">
                <Users size={20} />
                <span>Capacity: {hall.capacity} guests</span>
              </div>
              <div className="info-item-large">
                <DollarSign size={20} />
                <span>Fee: ₹{hall.fee?.toLocaleString()}</span>
              </div>
            </div>

            <Link to={`/book/${hall.id}`} className="btn-primary btn-large">
              Book This Hall
            </Link>
          </div>
        </div>

        <div className="bookings-section">
          <h3>Existing Bookings</h3>
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map(b => (
                <div className="booking-row" key={b.id}>
                  <div className="booking-row-info">
                    <Calendar size={16} />
                    <span>{b.date}</span>
                  </div>
                  <div className="booking-row-info">
                    <Clock size={16} />
                    <span>{b.timeSlot}</span>
                  </div>
                  <span className={`status-badge ${b.status?.toLowerCase() || 'pending'}`}>
                    {b.status || 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-bookings">No bookings yet for this hall</p>
          )}
        </div>
      </div>
    </div>
  );
}