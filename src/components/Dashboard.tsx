import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense } from '../types/expense';

interface DashboardProps {
  expenses: Expense[];
}

export function Dashboard({ expenses }: DashboardProps) {
  const totalByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(totalByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const myExpenses = expenses
    .filter((expense) => expense.user === 'Me')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const fianceeExpenses = expenses
    .filter((expense) => expense.user === 'Fiancée')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Total de Despesas</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">R$ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Minhas Despesas</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">R$ {myExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Despesas da Noiva</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">R$ {fianceeExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Despesas por Categoria</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
              <Legend />
              <Bar dataKey="amount" fill="#3B82F6" name="Valor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}