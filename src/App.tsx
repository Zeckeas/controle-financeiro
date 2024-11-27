import React, { useEffect } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import { useExpenses } from './hooks/useExpenses';

function App() {
  const { expenses, error, loading, loadExpenses, handleAddExpense, handleDeleteExpense } = useExpenses();
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'expenses'>('dashboard');

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Control System</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'expenses'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Expenses
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          activeTab === 'dashboard' ? (
            <Dashboard expenses={expenses} />
          ) : (
            <div className="space-y-8">
              <ExpenseForm onSubmit={handleAddExpense} />
              <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;