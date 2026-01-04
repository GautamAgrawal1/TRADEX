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

  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/`, {}, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setIsAuth(true);
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <>
      {isAuth && !hideMenu && <Menu />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default Apps;
