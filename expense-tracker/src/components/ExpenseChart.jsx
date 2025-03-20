import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#a65df3"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[50%] text-center m-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Expense Distribution
      </h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;
