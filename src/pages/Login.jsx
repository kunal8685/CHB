import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await loginUser({ username, password });
      const { token, role, userId } = res.data;
      login(token, role, { username, userId });
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn" disabled={busy}>{busy ? "Signing..." : "Sign in"}</button>
      </form>
    </div>
  );
}
