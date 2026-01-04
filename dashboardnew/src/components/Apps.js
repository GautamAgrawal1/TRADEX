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

  // 🔐 AUTH VERIFICATION
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
        {isAuth && <Route path="/*" element={<Home />} />}
        {isAuth && <Route path="/orders" element={<Orders />} />}
        {isAuth && <Route path="/holdings" element={<Holdings />} />}
        {isAuth && <Route path="/positions" element={<Positions />} />}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Apps;
