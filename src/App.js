import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { token, role, logout } = useContext(AuthContext);

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Community Hall Booking</h1>

          <nav>
            <Link to="/">Home</Link>

            {" | "}

            {/* Show Admin menu only if role=ADMIN */}
            {role === "ADMIN" && <Link to="/admin">Admin</Link>}

            {" | "}

            {/* If logged in → show Logout ; else Login */}
            {!token ? (
              <Link to="/login">Login</Link>
            ) : (
              <button
                onClick={logout}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">© CHB - Demo</div>
      </footer>
    </div>
  );
}
