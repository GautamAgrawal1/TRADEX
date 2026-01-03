import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { allHoldings, livePrices } = useContext(GeneralContext);

  const investment = allHoldings.reduce(
    (sum, h) => sum + h.avg * h.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, h) =>
      sum + (livePrices[h.name] ?? h.price) * h.qty,
    0
  );

  const pnl = currentValue - investment;
  const pnlPercent =
    investment === 0 ? 0 : (pnl / investment) * 100;

  return (
    <>
      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {pnl.toFixed(2)}{" "}
              <small>{pnlPercent.toFixed(2)}%</small>
            </h3>
            <p>P&L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>{investment.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
