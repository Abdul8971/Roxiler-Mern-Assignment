const express = require("express");
const router = express.Router();
const {
  getBarChart,
  getPieChart,
  getProducts,
  getStatistics,
} = require("../controllers/table.controller");
router.get("/products", getProducts);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChart);
router.get("/pie-chart", getPieChart);

module.exports = router;
