import React, { useEffect, useState } from "react";
import { getBookings, approveBooking, rejectBooking, createHall } from "../services/api";
import Spinner from "../components/Spinner";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hallForm, setHallForm] = useState({ name:"", address:"", capacity:0, fee:0 });

  const load = () => {
    setLoading(true);
    getBookings().then(res => setBookings(res.data)).catch(()=>{}).finally(()=>setLoading(false));
  };

  useEffect(()=>{ load(); }, []);

  const doApprove = async (id) => {
    await approveBooking(id);
    load();
  };

  const doReject = async (id) => {
    await rejectBooking(id);
    load();
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await createHall(hallForm);
      alert("Hall created");
      setHallForm({ name:"", address:"", capacity:0, fee:0 });
    } catch (err) {
      alert("Failed");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <section className="admin-grid">
        <div>
          <h3>Create Hall</h3>
          <form className="card" onSubmit={create}>
            <input placeholder="Name" value={hallForm.name} onChange={e=>setHallForm({...hallForm, name:e.target.value})} required />
            <input placeholder="Address" value={hallForm.address} onChange={e=>setHallForm({...hallForm, address:e.target.value})} required />
            <input type="number" placeholder="Capacity" value={hallForm.capacity} onChange={e=>setHallForm({...hallForm, capacity:+e.target.value})} required />
            <input type="number" placeholder="Fee" value={hallForm.fee} onChange={e=>setHallForm({...hallForm, fee:+e.target.value})} required />
            <button className="btn">Create</button>
          </form>
        </div>

        <div>
          <h3>Bookings</h3>
          {loading ? <Spinner /> : (
            <div>
              {bookings.map(b => (
                <div key={b.id} className="admin-booking-row card">
                  <div>
                    <strong>{b.name}</strong> • {b.date} • {b.timeSlot}
                    <div className="muted">Status: {b.status}</div>
                  </div>
                  <div className="admin-actions">
                    <button className="btn-sm" onClick={()=>doApprove(b.id)}>Approve</button>
                    <button className="btn-outline" onClick={()=>doReject(b.id)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
