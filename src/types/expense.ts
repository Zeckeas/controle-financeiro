export type Expense = {
  id: number;
  user: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export type ExpenseFormData = Omit<Expense, 'id'>;

export const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Entertainment',
  'Health',
  'Shopping',
  'Others'
] as const;

export type Category = typeof categories[number];