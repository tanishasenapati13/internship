import React from "react";
import { Link } from "react-router-dom";

function MainPage({ transactions }) {
  const monthlyTotals = transactions.reduce((acc, { month, amount }) => {
    acc[month] = (acc[month] || 0) + amount;
    return acc;
  }, {});

  const annualTotal = transactions.reduce((sum, { amount }) => sum + amount, 0);

  return (
    <div>
      <h1>Finance Tracker</h1>
      <h2>Annual Expenditure: ${annualTotal}</h2>

      <div>
        {Object.keys(monthlyTotals).map((month) => (
          <div key={month}>
            <h3>{month}</h3>
            <p>Total Expenditure: ${monthlyTotals[month]}</p>
          </div>
        ))}
      </div>

      <Link to="/transactions">
        <button>+ Add Transaction</button>
      </Link>
    </div>
  );
}

export default MainPage;
