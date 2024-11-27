import { useState, useCallback } from 'react';
import { Expense, ExpenseFormData } from '../types/expense';
import { fetchExpenses, addExpense, deleteExpense } from '../lib/db';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses. Please check your Supabase configuration.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddExpense = async (expenseData: ExpenseFormData) => {
    try {
      const data = await addExpense(expenseData);
      setExpenses([...(data || []), ...expenses]);
      setError(null);
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(expense => expense.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error(err);
    }
  };

  return {
    expenses,
    error,
    loading,
    loadExpenses,
    handleAddExpense,
    handleDeleteExpense,
  };
}