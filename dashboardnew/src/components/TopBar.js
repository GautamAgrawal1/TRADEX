import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">26328.55</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">85762.01</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
