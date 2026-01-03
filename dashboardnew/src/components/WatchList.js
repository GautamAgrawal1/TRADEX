import React, { useState, useContext } from "react";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
  "#0288d1",
  "#388e3c",
  "#f57c00",
  "#7b1fa2",
  "#c62828",
];
const WatchList = () => {
  const { livePrices, openBuyWindow, openSellWindow } =
    useContext(GeneralContext);

  const data = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Live Price",
        data: watchlist.map(
          (s) => livePrices[s.name] ?? s.price
        ),
        backgroundColor: COLORS.slice(0, watchlist.length),
        borderColor: "#111",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          className="search"
          placeholder="Search eg: INFY, TCS"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          const price = livePrices[stock.name] ?? stock.price;
          const isDown = price < stock.price;

          return (
            <li key={index}>
              <div className="item">
                <p className={isDown ? "down" : "up"}>
                  {stock.name}
                </p>

                <div className="itemInfo">
                  {isDown ? (
                    <KeyboardArrowDown className="down" />
                  ) : (
                    <KeyboardArrowUp className="up" />
                  )}
                  <span className="price">
                    {price.toFixed(2)}
                  </span>
                </div>
              </div>

              <span className="actions">
                <Tooltip title="Buy" TransitionComponent={Grow}>
                  <button
                    className="buy"
                    onClick={() => openBuyWindow(stock.name)}
                  >
                    Buy
                  </button>
                </Tooltip>

                <Tooltip title="Sell" TransitionComponent={Grow}>
                  <button
                    className="sell"
                    onClick={() => openSellWindow(stock.name)}
                  >
                    Sell
                  </button>
                </Tooltip>

                <button className="action">
                  <BarChartOutlined />
                </button>
                <button className="action">
                  <MoreHoriz />
                </button>
              </span>
            </li>
          );
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;
