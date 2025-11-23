import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { role, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">CHB</Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/payment">Payment</Link>
        {role === "ROLE_ADMIN" && <Link to="/admin">Admin</Link>}
        {localStorage.getItem("token") ? (
          <button className="btn-ghost" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}
