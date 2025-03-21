import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../features/expensesSlice";
import { editExpense } from "../features/expensesSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses.expenses || []);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState("null");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditedTitle(expense.title);
    setEditedAmount(expense.amount);
    setEditedCategory(expense.category);
  };

  const handleSave = () => {
    dispatch(
      editExpense({
        id: editingId,
        title: editedTitle,
        amount: parseFloat(editedAmount),
        category: editedCategory,
        date: new Date().toISOString(),
      })
    );
    setEditingId(null);
    setEditingId("");
    setEditedTitle("");
    setEditedAmount("");
    setEditedCategory("");
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.amount.toString().includes(searchQuery) ||
      formatDate(expense.date).includes(searchQuery)
  );

  return (
    <div className="space-y-4 mt-4 min-h-screen  px-4 max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search by Title or Amount or Category or Date..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></input>
      <Link to="/">
        <button className=" bg-neutral-300 hover:bg-blue-300 text-black font-bold py-1 px-1 mt-1 rounded focus:outline-none focus:shadow-outline">
          Add New Expense
        </button>
      </Link>
      {filteredExpenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
        >
          {editingId === expense.id ? (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.name}>
                    {categorie.icon} {categorie.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {expense.title}
              </h3>
              <p className="text-gray-600">
                ₹{expense.amount} - {expense.category}
              </p>
              <p className="text-gray-600">Date: {formatDate(expense.date)}</p>
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(expense)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteExpense(expense.id))}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default ExpenseList;
