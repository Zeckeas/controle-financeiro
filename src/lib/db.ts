import { supabase } from '../config/supabase';
import { Expense, ExpenseFormData } from '../types/expense';

export async function fetchExpenses() {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching expenses:', error);
      throw new Error('Failed to fetch expenses');
    }

    return data as Expense[];
  } catch (error) {
    console.error('Error in fetchExpenses:', error);
    throw new Error('Failed to fetch expenses');
  }
}

export async function addExpense(expense: ExpenseFormData) {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select();

    if (error) {
      console.error('Error adding expense:', error);
      throw new Error('Failed to add expense');
    }

    return data as Expense[];
  } catch (error) {
    console.error('Error in addExpense:', error);
    throw new Error('Failed to add expense');
  }
}

export async function deleteExpense(id: number) {
  try {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting expense:', error);
      throw new Error('Failed to delete expense');
    }
  } catch (error) {
    console.error('Error in deleteExpense:', error);
    throw new Error('Failed to delete expense');
  }
}