import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartComponent({ month }) {
  const [category, setCategory] = useState({});
  const [dataReceive, setDataReceive] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      const response = await axios.get("http://localhost:5000/api/pie-chart", {
        params: { month },
      });
      const receivedData = response.data;
      setDataReceive(receivedData);

      const categoryCount = {};
      receivedData.forEach((element) => {
        if (categoryCount[element.category]) {
          categoryCount[element.category] += 1;
        } else {
          categoryCount[element.category] = 1;
        }
      });
      setCategory(categoryCount);
    };
    fetchPieChartData();
  }, [month]);

  const data = {
    labels: Object.keys(category),
    datasets: [
      {
        data: Object.values(category),
        backgroundColor: ["aqua", "orange", "purple", "green"],
      },
    ],
  };

  let options = {};

  return (
    <div className="pie-chart-container">
      <div className="pie-chart-wrapper">
        <Pie
          width={600}
          height={300}
          data={data}
          options={options}
          className="pieChart"
        />
      </div>
    </div>
  );
}

export default PieChartComponent;
