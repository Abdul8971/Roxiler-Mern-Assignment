const express = require("express");
require("dotenv").config();
const axios = require("axios");
const connectDB = require("./config/db");
const cors = require("cors");
const Product = require("./models/products");
const tableRoutes = require("./routes/table.route");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/table", tableRoutes);

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
