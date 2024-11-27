import React, { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Dashboard } from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useExpenses } from './lib/hooks/useExpenses';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses'>('dashboard');
  const { expenses, loading, error, fetchExpenses, addExpense, deleteExpense } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Controle Financeiro</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                    activeTab === 'dashboard'
                      ? 'text-white bg-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('expenses')}
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                    activeTab === 'expenses'
                      ? 'text-white bg-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Despesas
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && <ErrorMessage message={error} />}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {activeTab === 'dashboard' ? (
                <Dashboard expenses={expenses} />
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <ExpenseForm onSubmit={addExpense} />
                    </div>
                    <div className="md:col-span-2">
                      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;