import React from 'react';
import { ExpenseStats } from './dashboard/ExpenseStats';
import { ExpenseChart } from './dashboard/ExpenseChart';
import { Expense } from '../types/expense';

interface DashboardProps {
  expenses: Expense[];
}

export function Dashboard({ expenses }: DashboardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
      <ExpenseStats expenses={expenses} />
      <ExpenseChart expenses={expenses} />
    </div>
  );
}