import React, { useEffect, useState } from "react";
import {
  getBookings,
  approveBooking,
  rejectBooking,
  getHalls,
  getDocumentsForBooking
} from "../services/api"; // Ensure correct import

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [halls, setHalls] = useState({});

  useEffect(() => {
    fetchAllBookings();

    // Load all halls for mapping hallId → hallName
    getHalls().then((res) => {
      const hallMap = {};
      res.data.forEach((h) => (hallMap[h.id] = h));
      setHalls(hallMap);
    });
  }, []);

  const fetchAllBookings = () => {
    getBookings()
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to load bookings", err));
  };

  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
      fetchAllBookings();
    } catch (error) {
      alert("Failed to approve booking");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);
      fetchAllBookings();
    } catch (error) {
      alert("Failed to reject booking");
    }
  };

  const viewDocs = async (bookingId) => {
    try {
      const res = await getDocumentsForBooking(bookingId);
      if (res.data.length === 0) {
        alert("No documents uploaded for this booking.");
      } else {
        alert(JSON.stringify(res.data, null, 2)); // Display documents in alert or handle as needed
      }
    } catch (err) {
      alert("Error fetching documents");
    }
  };

  return (
    <div>
      <h2>Admin — Manage Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div className="card" key={b.id} style={{ marginBottom: 12 }}>
          <div>
            <strong>{b.name}</strong> — {b.date} | {b.timeSlot}
          </div>

          <div>
            Hall: {halls[b.hallId]?.name || b.hallId} | Status:{" "}
            <strong>{b.status}</strong>
          </div>

          <button
            className="btn"
            onClick={() => viewDocs(b.id)}
            style={{ marginTop: 8 }}
          >
            View Documents
          </button>

          <div style={{ marginTop: 8 }}>
            {b.status === "PENDING" && (
              <>
                <button
                  className="btn"
                  onClick={() => handleApprove(b.id)}
                  style={{ marginRight: 8 }}
                >
                  Approve
                </button>

                <button className="btn" onClick={() => handleReject(b.id)}>
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
