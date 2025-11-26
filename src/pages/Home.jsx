import React, { useEffect, useState } from "react";
import { getHalls } from "../services/api";
import HallCard from "../components/HallCard";
import Spinner from "../components/Spinner";
import { Search } from "lucide-react";

export default function Home() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredHalls = halls.filter(hall => 
    hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hall.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <div className="hero-section">
        <h1 className="hero-title">Find Your Perfect Venue</h1>
        <p className="hero-subtitle">Book community halls for weddings, events, and celebrations</p>
        
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search halls by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <Spinner />
        </div>
      ) : filteredHalls.length > 0 ? (
        <div className="halls-grid">
          {filteredHalls.map((hall) => (
            <HallCard key={hall.id} hall={hall} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>
          <p style={{ fontSize: '1.2rem' }}>No halls found matching your search.</p>
        </div>
      )}
    </div>
  );
}