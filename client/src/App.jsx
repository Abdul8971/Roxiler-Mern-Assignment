import React, { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable/TransactionsTable";
import "./App.css";

if (window.innerWidth < 400) {
  alert("Please open in desktop mode");
} 

const App = () => {
  
  return (
    <>
      <TransactionsTable />
    </>
  );
};

export default App;
