import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const { livePrices } = useContext(GeneralContext);
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => setAllHoldings(res.data || []))
      .catch(() => setAllHoldings([]));
  }, []);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>LTP</th>
              <th>Cur. Val</th>
              <th>P&L</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((h, i) => {
              const ltp = livePrices[h.name] ?? h.price;
              const curVal = ltp * h.qty;
              const pnl = curVal - h.avg * h.qty;

              return (
                <tr key={i}>
                  <td>{h.name}</td>
                  <td>{h.qty}</td>
                  <td>{h.avg.toFixed(2)}</td>
                  <td>{ltp.toFixed(2)}</td>
                  <td>{curVal.toFixed(2)}</td>
                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {allHoldings.length > 0 && (
        <VerticalGraph
          data={{
            labels: allHoldings.map((h) => h.name),
            datasets: [
              {
                label: "Live Prices",
                data: allHoldings.map(
                  (h) => livePrices[h.name] ?? h.price
                ),
                backgroundColor: "rgba(255,99,132,0.5)",
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default Holdings;
