import React, { useState, useEffect } from "react";
import axios from "axios";
import "./statistics.css";
const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get("http://localhost:5000/api/statistics", {
        params: { month },
      });
      setStatistics(response.data);
    };
    fetchStatistics();
  }, [month]);

  return (
    <div className="statistics-container">
      <div className="statistics-innerContainer">
        <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
        <div>Total Sold Items: {statistics.totalSoldItems}</div>
        <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
      </div>
    </div>
  );
};

export default Statistics;
