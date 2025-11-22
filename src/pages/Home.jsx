import React, { useEffect, useState } from "react";
import { getHalls } from "../services/api";
import HallCard from "../components/HallCard";

export default function Home() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHalls()
      .then((res) => {
        setHalls(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load halls. Make sure backend is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading halls...</div>;

  return (
    <div>
      <h2>Available Community Halls</h2>
      <div className="hall-grid">
        {halls.map((h) => (
          <HallCard key={h.id} hall={h} />
        ))}
      </div>
    </div>
  );
}
