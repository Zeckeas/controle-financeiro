import { useState, useCallback } from 'react';
import { Expense, ExpenseFormData } from '../../types/expense';
import { supabase } from '../supabase';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (supabaseError) throw supabaseError;
      setExpenses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expenseData: ExpenseFormData) => {
    try {
      setError(null);
      const { error: supabaseError } = await supabase.from('expenses').insert([expenseData]);
      if (supabaseError) throw supabaseError;
      await fetchExpenses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add expense');
      throw err;
    }
  }, [fetchExpenses]);

  const deleteExpense = useCallback(async (id: number) => {
    try {
      setError(null);
      const { error: supabaseError } = await supabase.from('expenses').delete().eq('id', id);
      if (supabaseError) throw supabaseError;
      await fetchExpenses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete expense');
      throw err;
    }
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    deleteExpense,
  };
}