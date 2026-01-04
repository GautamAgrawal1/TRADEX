import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { BACKEND_URL } from "./GeneralContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
  
      console.log("STATUS:", res.status);
      console.log("DATA:", res.data);
  
      // 🔥 FORCE FULL RELOAD so auth check runs again
      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert("Login failed");
    }
  };
  
  
  
  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to your TradeX account</p>

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
