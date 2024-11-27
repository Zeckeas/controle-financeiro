export type Expense = {
  id: number;
  user: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  created_at?: string;
};

export type ExpenseFormData = Omit<Expense, 'id' | 'created_at'>;