import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "./GeneralContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("USERID");

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // 🔥 AUTH CHECK ON LOAD
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          `${BACKEND_URL}/`,
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setUsername(data.user); // 👈 REAL USERNAME
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    verifyUser();
  }, []);

  // 🔥 LOGOUT
  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/logo.png" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* 🔥 PROFILE */}
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <p className="username">{username}</p>
        </div>

        {/* 🔥 DROPDOWN */}
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <p onClick={logout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
