import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Menu from "./Menu";
import Home from "./Home";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Login from "./Login";
import Signup from "./Signup";

const Apps = () => {
  const location = useLocation();

  const hideMenu =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideMenu && <Menu />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Apps;
