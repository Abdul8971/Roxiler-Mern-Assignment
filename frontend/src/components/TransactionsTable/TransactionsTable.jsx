import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionsTable.css";
import Statistics from "../Statistics/Statistics";
import BarChartComponent from "../BarChart/BarChart";
import PieChartComponent from "../PieChart/PieChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products", {
          params: { month: selectedMonth },
        });
        setTransactions(response.data.transactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(true);
        setTransactions([]);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [selectedMonth, searchInput]);

  useEffect(() => {
    filterProducts();
  }, [transactions, searchInput]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filterProducts = () => {
    if (searchInput !== "") {
      setFilteredProducts(
        transactions.filter((product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(transactions);
    }
  };

  function handleNextMonth() {
    const currentIndex = months.indexOf(selectedMonth);
    const nextIndex = (currentIndex + 1) % months.length;
    setSelectedMonth(months[nextIndex]);
  }

  function handlePrevMonth() {
    const currentIndex = months.indexOf(selectedMonth);
    const prevIndex = (currentIndex - 1 + months.length) % months.length;
    setSelectedMonth(months[prevIndex]);
  }

  if (error) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <div className="container">
      <header className="navbar">
        <input
          type="text"
          placeholder="Search transaction"
          className="input"
          value={searchInput}
          onChange={handleSearch}
        />
        <a href="#StatisticsBox">Statistics</a>
        <a href="#BarChart">BarChart</a>
        <a href="#PieChart">PieChart</a>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </header>
      <main className="inner-container">
        <section className="table-section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.sold ? "Yes" : "No"}</td>
                  <td>
                    <img src={product.image} alt="" className="table-img" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <h1 style={{ position: "absolute", left: "700px", top: "350px" }}>
              Loading...
            </h1>
          )}
        </section>
        <section id="StatisticsBox">
          {searchInput === "" && !loading && (
            <Statistics month={selectedMonth} />
          )}
        </section>
        <section id="BarChart">
          {searchInput === "" && !loading && (
            <BarChartComponent month={selectedMonth} />
          )}
        </section>
        <section id="PieChart">
          {searchInput === "" && !loading && (
            <PieChartComponent month={selectedMonth} />
          )}
        </section>
      </main>
      <footer>
        <p>Page No: {months.indexOf(selectedMonth) + 1}</p>
        <div>
          <button className="prev" onClick={handlePrevMonth}>
            Previous
          </button>
          <button className="next" onClick={handleNextMonth}>
            Next
          </button>
        </div>
        <p className="pages">Pages:12</p>
      </footer>
    </div>
  );
}

export default TransactionsTable;
