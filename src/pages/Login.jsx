import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");  // Changed username to email
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await loginUser({ email, password });  // Send email, not username
      const { token, role, userId, email: userEmail } = res.data;
      login(token, role, { email: userEmail, userId });

      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Input for email
          placeholder="Email"  // Reflect 'Email' here
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button disabled={busy}>{busy ? "Logging In..." : "Login"}</button>
      </form>
    </div>
  );
}
