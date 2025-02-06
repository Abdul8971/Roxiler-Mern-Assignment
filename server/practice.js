const express = require("express");
require("dotenv").config();
// const mongoose = require("mongoose");
const axios = require("axios");
const connectDB = require("./config/db");
const cors = require("cors");
const Product = require("./models/products");
const tableRoutes = require("./routes/table.route");
const app = express();
app.use(cors());
app.use(express.json());

// app.use(dotenv);
const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// Connect to database
connectDB();
// console.log(process.env.PORT);
// console.log(process.env.MONGO_URI);
app.use("/api/table", tableRoutes);
// here the mongodb connection is there
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// API to initialize the database
app.get("/api/init", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    await Product.insertMany(transactions);
    res.status(200).send("Database initialized with seed data");
  } catch (err) {
    res.status(500).send("Error initializing database");
  }
});

// API to list based on month transactions
// app.get("/api/products", async (req, res) => {
//   const { month } = req.query;
//   const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

//   let query = { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } };

//   try {
//     const transactions = await Product.find(query);

//     res.status(200).json({
//       transactions,
//     });
//   } catch (err) {
//     res.status(500).send("Error fetching transactions");
//   }
// });

// // API for statistics
// app.get("/api/statistics", async (req, res) => {
//   const { month } = req.query;
//   const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

//   try {
//     const totalSaleAmount = await Product.aggregate([
//       {
//         $match: {
//           $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
//           sold: true,
//         },
//       },
//       { $group: { _id: null, total: { $sum: "$price" } } },
//     ]);

//     const totalSoldItems = await Product.countDocuments({
//       $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
//       sold: true,
//     });

//     const totalNotSoldItems = await Product.countDocuments({
//       $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
//       sold: false,
//     });

//     res.status(200).json({
//       totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].total : 0,
//       totalSoldItems,
//       totalNotSoldItems,
//     });
//   } catch (err) {
//     res.status(500).send("Error fetching statistics");
//   }
// });

// // API for bar chart data
// app.get("/api/bar-chart", async (req, res) => {
//   const { month } = req.query;
//   const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

//   try {
//     const priceRanges = [
//       { range: "0-100", min: 0, max: 100 },
//       { range: "101-200", min: 101, max: 200 },
//       { range: "201-300", min: 201, max: 300 },
//       { range: "301-400", min: 301, max: 400 },
//       { range: "401-500", min: 401, max: 500 },
//       { range: "501-600", min: 501, max: 600 },
//       { range: "601-700", min: 601, max: 700 },
//       { range: "701-800", min: 701, max: 800 },
//       { range: "801-900", min: 801, max: 900 },
//       { range: "901-above", min: 901, max: Infinity },
//     ];

//     const result = [];

//     for (const range of priceRanges) {
//       const count = await Product.countDocuments({
//         $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
//         price: { $gte: range.min, $lt: range.max },
//       });

//       result.push({ range: range.range, count });
//     }

//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send("Error fetching bar chart data");
//   }
// });

// // // API for pie chart data
// app.get("/api/pie-chart", async (req, res) => {
//   const { month } = req.query;
//   const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

//   try {
//     const transactions = await Product.find({
//       $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
//     }).select("category");

//     res.status(200).json(transactions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching pie chart data");
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
