import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Expense Tracker
          </h1>
          <div className="max-w-2xl mx-auto">
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
