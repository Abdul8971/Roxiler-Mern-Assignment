const Product = require("../models/products");

const getProducts = async (req, res) => {
  let { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  let query = { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } };

  try {
    const transactions = await Product.find(query);

    res.status(200).json({
      transactions,
    });
  } catch (err) {
    res.status(500).send("Error fetching transactions");
  }
};

// API for statistics
const getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  try {
    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          sold: true,
        },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await Product.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: true,
    });

    const totalNotSoldItems = await Product.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (err) {
    res.status(500).send("Error fetching statistics");
  }
};

// API for bar chart data
const getBarChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  try {
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const result = [];

    for (const range of priceRanges) {
      const count = await Product.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        price: { $gte: range.min, $lt: range.max },
      });

      result.push({ range: range.range, count });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error fetching bar chart data");
  }
};

// // API for pie chart data
const getPieChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

  try {
    const transactions = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    }).select("category");

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching pie chart data");
  }
};

module.exports = { getBarChart, getPieChart, getProducts, getStatistics };
