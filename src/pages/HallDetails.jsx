import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHall, getBookingsForHall } from "../services/api";
import Spinner from "../components/Spinner";

export default function HallDetails() {
  const { id } = useParams();
  const [hall, setHall] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHall(id).then(res => setHall(res.data)).catch(()=>{});
    getBookingsForHall(id)
      .then(res => setBookings(res.data))
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, [id]);

  if (!hall) return <Spinner />;

  return (
    <div>
      <div className="detail-hero">
        <img src={hall.imageUrl || "/placeholder.png"} alt={hall.name} />
        <div>
          <h1>{hall.name}</h1>
          <p className="muted">{hall.address}</p>
          <div className="hall-meta">Capacity: {hall.capacity} • Fee: ₹{hall.fee}</div>
          <div style={{ marginTop: 12 }}>
            <Link to={`/book/${hall.id}`} className="btn">Book this hall</Link>
          </div>
        </div>
      </div>

      <section>
        <h3>Existing Bookings</h3>
        {loading ? <Spinner /> : (
          bookings.length ? bookings.map(b => (
            <div className="booking-row" key={b.id}>
              <div>{b.date} • {b.timeSlot}</div>
              <div className="muted">Status: {b.status}</div>
            </div>
          )) : <div className="muted">No bookings</div>
        )}
      </section>
    </div>
  );
}
