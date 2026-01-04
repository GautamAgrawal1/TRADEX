import React, { useState, useEffect } from "react";
import axios from "axios";
import { watchlist } from "../data/data";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://2rh4y7471k.execute-api.ap-south-1.amazonaws.com/prod";

const GeneralContext = React.createContext();

export const GeneralContextProvider = ({ children }) => {
  // BUY / SELL WINDOWS
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // HOLDINGS
  const [allHoldings, setAllHoldings] = useState([]);

  // 🔥 LIVE PRICES (LEVEL 1)
  const [livePrices, setLivePrices] = useState({});

  // ---------------- LIVE PRICE SIMULATION ----------------
  useEffect(() => {
    const initialPrices = {};
    watchlist.forEach((s) => {
      initialPrices[s.name] = s.price;
    });
    setLivePrices(initialPrices);

    const interval = setInterval(() => {
      setLivePrices((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          const change = (Math.random() - 0.5) * 5;
          updated[key] = +(updated[key] + change).toFixed(2);
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ---------------- HOLDINGS FETCH ----------------
  const fetchHoldings = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/allHoldings`);      setAllHoldings(Array.isArray(res.data) ? res.data : []);
    } catch {
      setAllHoldings([]);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  // ---------------- WINDOW CONTROLS ----------------
  const openBuyWindow = (uid) => {
    setSelectedStock(uid);
    setIsBuyOpen(true);
  };

  const openSellWindow = (uid) => {
    setSelectedStock(uid);
    setIsSellOpen(true);
  };

  const closeBuyWindow = () => setIsBuyOpen(false);
  const closeSellWindow = () => setIsSellOpen(false);

  return (
    <GeneralContext.Provider
      value={{
        livePrices,
        allHoldings,
        fetchHoldings,
        openBuyWindow,
        openSellWindow,
        closeBuyWindow,
        closeSellWindow,
      }}
    >
      {children}

      {isBuyOpen && <BuyActionWindow uid={selectedStock} />}
      {isSellOpen && <SellActionWindow uid={selectedStock} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
