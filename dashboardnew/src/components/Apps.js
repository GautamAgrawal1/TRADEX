import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Menu from "./Menu";
import Home from "./Home";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Login from "./Login";
import Signup from "./Signup";
import { BACKEND_URL } from "./GeneralContext";

const Apps = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const hideMenu =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  // 🔐 AUTH VERIFICATION (FIXED)
  useEffect(() => {
    // 🚫 Do NOT verify auth on login/signup pages
    if (hideMenu) {
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/verify`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          setIsAuth(true);
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [location.pathname]);

  // ⏳ Prevent flicker
  if (loading) return null;

  return (
    <>
      {/* 🧭 Show menu only when authenticated */}
      {isAuth && !hideMenu && <Menu />}

      <Routes>
        {/* 🔒 Protected Routes */}
        {isAuth && <Route path="/*" element={<Home />} />}
        {isAuth && <Route path="/orders" element={<Orders />} />}
        {isAuth && <Route path="/holdings" element={<Holdings />} />}
        {isAuth && <Route path="/positions" element={<Positions />} />}

        {/* 🌐 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Apps;
