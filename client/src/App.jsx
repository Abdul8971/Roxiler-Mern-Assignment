import React, { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable/TransactionsTable";
import "./App.css";

const App = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div className="mobile-warning">
        <h1>Please open in desktop mode</h1>
      </div>
    );
  }

  return (
    <>
      <TransactionsTable />
    </>
  );
};

export default App;
