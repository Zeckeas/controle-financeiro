import React from 'react';
import { Expense } from '../../types/expense';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const myExpenses = expenses.filter(e => e.user === 'Me');
  const fianceeExpenses = expenses.filter(e => e.user === 'Fiancée');
  const myTotal = myExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const fianceeTotal = fianceeExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Expenses</h3>
        <p className="text-3xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
      </div>
      
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-2">My Expenses</h3>
        <p className="text-3xl font-bold text-green-600">${myTotal.toFixed(2)}</p>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">Fiancée's Expenses</h3>
        <p className="text-3xl font-bold text-purple-600">${fianceeTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}