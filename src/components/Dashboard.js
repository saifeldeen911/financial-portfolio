import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ portfolios, transactions }) {
  const [totalValue, setTotalValue] = useState(0);
  const [dailyChange, setDailyChange] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  useEffect(() => {
    const calculateTotalValue = () => {
      return portfolios.reduce((sum, portfolio) => sum + portfolio.value, 0);
    };

    const newTotalValue = calculateTotalValue();
    setTotalValue(newTotalValue);

    // Simulate daily change (random value between -2% and 2%)
    const change = newTotalValue * (Math.random() * 0.04 - 0.02);
    setDailyChange(change);
    setPercentageChange((change / newTotalValue) * 100);

    // Update chart data
    const assetTypes = [
      ...new Set(portfolios.flatMap((p) => p.assets.map((a) => a.type))),
    ];
    const assetValues = assetTypes.map((type) =>
      portfolios
        .flatMap((p) => p.assets)
        .reduce(
          (sum, asset) => (asset.type === type ? sum + asset.value : sum),
          0
        )
    );

    setChartData({
      labels: assetTypes,
      datasets: [
        {
          data: assetValues,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    });
  }, [portfolios]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Portfolio Value</h2>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Daily Change</h2>
          <p className="text-2xl font-bold">${dailyChange.toLocaleString()}</p>
          <p className="text-sm text-gray-600">
            {percentageChange > 0 ? "+" : ""}
            {percentageChange.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Portfolio Allocation</h2>
          <Pie data={chartData} />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">
          Transaction Reconciliation Status
        </h2>
        <TransactionReconciliation transactions={transactions} />
      </div>
    </div>
  );
}

function TransactionReconciliation({ transactions }) {
  const [status, setStatus] = useState("");
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const buyTotal = transactions
      .filter((t) => t.type === "Buy")
      .reduce((sum, t) => sum + t.price * t.quantity, 0);

    const sellTotal = transactions
      .filter((t) => t.type === "Sell")
      .reduce((sum, t) => sum + t.price * t.quantity, 0);

    const diff = buyTotal - sellTotal;
    setDifference(diff);
    setStatus(diff === 0 ? "Reconciled" : "Discrepancy Detected");
  }, [transactions]);

  return (
    <div>
      <p>Status: {status}</p>
      {status === "Discrepancy Detected" && (
        <p>Discrepancy Amount: ${Math.abs(difference).toFixed(2)}</p>
      )}
    </div>
  );
}

export default Dashboard;
