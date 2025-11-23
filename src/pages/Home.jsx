import React, { useEffect, useState } from "react";
import { getHalls } from "../services/api";
import HallCard from "../components/HallCard";
import Spinner from "../components/Spinner";

export default function Home() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getHalls()
      .then((res) => {
        if (mounted) setHalls(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h1 className="page-title">Community Halls</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid">
          {halls.map((h) => <HallCard key={h.id} hall={h} />)}
        </div>
      )}
    </div>
  );
}
