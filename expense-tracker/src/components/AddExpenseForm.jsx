import React from "react";
import { useState } from "react";
import { addExpense } from "../features/expensesSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Food & Dining", icon: "🍔" },
  { id: 2, name: "Transportation", icon: "🚗" },
  { id: 3, name: "Housing", icon: "🏠" },
  { id: 4, name: "Health & Fitness", icon: "💊" },
  { id: 5, name: "Entertainment", icon: "🎬" },
  { id: 6, name: "Shopping", icon: "🛍️" },
  { id: 7, name: "Travel", icon: "✈️" },
  { id: 8, name: "Education", icon: "📚" },
  { id: 9, name: "Personal Care", icon: "💇" },
  { id: 10, name: "Miscellaneous", icon: "🎁" },
];

const AddExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("categories[0].name");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };
    dispatch(addExpense(newExpense));
    setTitle("");
    setAmount("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.map((catagorie) => (
              <option key={catagorie.id} value={catagorie.name}>
                {catagorie.icon} {catagorie.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Expense
        </button>
      </form>
      <Link to="/expenseList">
        <button className=" hover:bg-blue-300 text-black font-bold py-1 px-1 mt-1 rounded focus:outline-none focus:shadow-outline">
          Show Expenses
        </button>
      </Link>
    </>
  );
};

export default AddExpenseForm;
