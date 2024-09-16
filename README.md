# Financial Portfolio Management System

A dynamic **Financial Portfolio Management System** designed for individual investors and financial advisors. This project allows users to create and manage investment portfolios, add assets, log buy/sell transactions, and view real-time portfolio insights through charts and dynamic metrics.

## Features

- **Portfolio Management**: Create, edit, and view portfolios, and add assets like stocks, bonds, etc.
- **Transaction Management**: Log buy/sell transactions for assets, track the history of transactions.
- **Dashboard**: View key financial metrics like total portfolio value, daily change, and portfolio allocation through charts.
- **Transaction Reconciliation**: Check if buy and sell transactions match with automatic reconciliation status.
- **Data Persistence**: Portfolios and transactions are stored using localStorage, ensuring data persistence across sessions.
- **Real-time Updates**: Charts and financial metrics update dynamically based on user input.

## Technologies Used

- **Frontend**: React.js
- **Styling**: TailwindCSS
- **Charts**: Chart.js
- **Storage**: LocalStorage for data persistence

## Installation

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/saifeldeen911/financial-portfolio-management-system.git
   ```
   
2. Navigate to the project directory:

  ```bash
  cd financial-portfolio-management-system
```

3. Install the required dependencies:

```bash
npm install
```
4. Start the application:

```bash
npm start
```

Open http://localhost:3000 to view it in the browser.

## Usage

## Creating a New Portfolio

1. Navigate to the Portfolio Management section.
2. Enter a portfolio name, and click Create Portfolio.
3. Add assets (e.g., stocks, bonds) to the portfolio by entering asset type, symbol, quantity, and price.
   
## Viewing the Dashboard

- The Dashboard shows the total portfolio value, daily changes, and asset allocation through charts.

## Managing Transactions

1. Go to the Transaction Management section.
2. Log buy or sell transactions by selecting the transaction type, asset, quantity, and price.
3. View transaction history and the system will automatically reconcile the transactions.
