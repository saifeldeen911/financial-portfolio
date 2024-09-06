import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import PortfolioManagement from "./components/PortfolioManagement";
import TransactionManagement from "./components/TransactionManagement";

function App() {
  const [portfolios, setPortfolios] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const savedPortfolios =
      JSON.parse(localStorage.getItem("portfolios")) || [];
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setPortfolios(savedPortfolios);
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolios", JSON.stringify(portfolios));
  }, [portfolios]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addPortfolio = (newPortfolio) => {
    setPortfolios((prevPortfolios) => {
      const updatedPortfolios = [...prevPortfolios];
      const index = updatedPortfolios.findIndex(
        (p) => p.id === newPortfolio.id
      );
      if (index !== -1) {
        updatedPortfolios[index] = newPortfolio;
      } else {
        updatedPortfolios.push(newPortfolio);
      }
      return updatedPortfolios;
    });
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Financial Portfolio Management System
      </h1>
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "portfolio" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "transactions"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          Transaction Management
        </button>
      </div>
      {activeTab === "dashboard" && (
        <Dashboard portfolios={portfolios} transactions={transactions} />
      )}
      {activeTab === "portfolio" && (
        <PortfolioManagement
          portfolios={portfolios}
          addPortfolio={addPortfolio}
        />
      )}
      {activeTab === "transactions" && (
        <TransactionManagement
          transactions={transactions}
          addTransaction={addTransaction}
        />
      )}
    </div>
  );
}

export default App;
