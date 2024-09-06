import React, { useState } from "react";

function PortfolioManagement({ portfolios, addPortfolio }) {
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [newAsset, setNewAsset] = useState({
    type: "",
    symbol: "",
    quantity: "",
    price: "",
  });

  const handleCreatePortfolio = () => {
    if (newPortfolioName) {
      addPortfolio({
        id: Date.now(),
        name: newPortfolioName,
        value: 0,
        assets: [],
      });
      setNewPortfolioName("");
    }
  };

  const handleSelectPortfolio = (id) => {
    setSelectedPortfolio(portfolios.find((p) => p.id === id));
  };

  const handleAddAsset = () => {
    if (
      selectedPortfolio &&
      newAsset.type &&
      newAsset.symbol &&
      newAsset.quantity &&
      newAsset.price
    ) {
      const assetValue =
        parseFloat(newAsset.quantity) * parseFloat(newAsset.price);
      const updatedPortfolio = {
        ...selectedPortfolio,
        assets: [
          ...selectedPortfolio.assets,
          { ...newAsset, id: Date.now(), value: assetValue },
        ],
        value: selectedPortfolio.value + assetValue,
      };
      addPortfolio(updatedPortfolio);
      setSelectedPortfolio(updatedPortfolio);
      setNewAsset({ type: "", symbol: "", quantity: "", price: "" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Create New Portfolio</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-grow px-2 py-1 border rounded"
            placeholder="Portfolio Name"
            value={newPortfolioName}
            onChange={(e) => setNewPortfolioName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleCreatePortfolio}
          >
            Create
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Select Portfolio</h2>
        <select
          className="w-full px-2 py-1 border rounded"
          onChange={(e) => handleSelectPortfolio(parseInt(e.target.value))}
          value={selectedPortfolio ? selectedPortfolio.id : ""}
        >
          <option value="">Select a portfolio</option>
          {portfolios.map((portfolio) => (
            <option key={portfolio.id} value={portfolio.id}>
              {portfolio.name}
            </option>
          ))}
        </select>
      </div>
      {selectedPortfolio && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            {selectedPortfolio.name}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Portfolio Value: ${selectedPortfolio.value.toLocaleString()}
          </p>
          <div className="space-y-2 mb-4">
            <h3 className="text-md font-semibold">Add New Asset</h3>
            <select
              className="w-full px-2 py-1 border rounded"
              value={newAsset.type}
              onChange={(e) =>
                setNewAsset({ ...newAsset, type: e.target.value })
              }
            >
              <option value="">Select Asset Type</option>
              <option value="stock">Stock</option>
              <option value="bond">Bond</option>
              <option value="etf">ETF</option>
            </select>
            <input
              type="text"
              className="w-full px-2 py-1 border rounded"
              placeholder="Asset Symbol"
              value={newAsset.symbol}
              onChange={(e) =>
                setNewAsset({ ...newAsset, symbol: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full px-2 py-1 border rounded"
              placeholder="Quantity"
              value={newAsset.quantity}
              onChange={(e) =>
                setNewAsset({ ...newAsset, quantity: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full px-2 py-1 border rounded"
              placeholder="Price"
              value={newAsset.price}
              onChange={(e) =>
                setNewAsset({ ...newAsset, price: e.target.value })
              }
            />
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddAsset}
            >
              Add Asset
            </button>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Portfolio Assets</h3>
            {selectedPortfolio.assets.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Type</th>
                    <th className="text-left">Symbol</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPortfolio.assets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.type}</td>
                      <td>{asset.symbol}</td>
                      <td>{asset.quantity}</td>
                      <td>${parseFloat(asset.price).toFixed(2)}</td>
                      <td>${asset.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No assets in this portfolio yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioManagement;
