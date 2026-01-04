require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// ✅ CORS with credentials
app.use(
  cors({
    origin: [
      "https://main.d1zw08jtuelq1c.amplifyapp.com"
    ],
    credentials: true,
  })
);



app.use(cookieParser());
app.use(express.json());

// 🔐 Auth routes
app.use("/", authRoute);

// -------- Trading Routes --------

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    let { name, qty, price, mode } = req.body;
    qty = Number(qty);
    price = Number(price);

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (mode === "BUY") {
      const holding = await HoldingsModel.findOne({ name });

      if (!holding) {
        await new HoldingsModel({
          name,
          qty,
          avg: price,
          price,
          net: "0%",
          day: "0%",
        }).save();
      } else {
        const totalQty = holding.qty + qty;
        holding.avg =
          (holding.avg * holding.qty + price * qty) / totalQty;
        holding.qty = totalQty;
        holding.price = price;
        await holding.save();
      }

      await new OrdersModel({ name, qty, price, mode }).save();
    }

    if (mode === "SELL") {
      const holding = await HoldingsModel.findOne({ name });

      if (!holding || qty > holding.qty) {
        return res
          .status(400)
          .json({ error: "Insufficient holdings" });
      }

      holding.qty -= qty;
      holding.price = price;

      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ name });
      } else {
        await holding.save();
      }

      await new OrdersModel({ name, qty, price, mode }).save();
    }

    res.json({ message: "Order placed & holdings updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started");
});
