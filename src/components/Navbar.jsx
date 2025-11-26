import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Home, CreditCard, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { role, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-logo">CHB</div>
          <Link to="/" className="brand-text" onClick={closeMobileMenu}>
            Community Hall Booking
          </Link>
        </div>
        
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${mobileMenu ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/payment" 
            className={`nav-link ${isActive('/payment') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <CreditCard size={18} />
            <span>Payment</span>
          </Link>
          
          {role === "ROLE_ADMIN" && (
            <Link 
              to="/admin" 
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <LayoutDashboard size={18} />
              <span>Admin</span>
            </Link>
          )}

          {/* Register Link added here */}
          <Link
            to="/register"
            className={`nav-link ${isActive('/register') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Register</span>
          </Link>
          
          {localStorage.getItem("token") ? (
            <button className="nav-link logout" onClick={() => { logout(); closeMobileMenu(); }}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <Link 
              to="/login" 
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
