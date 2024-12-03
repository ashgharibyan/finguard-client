// Expense type for frontend use
export interface ExpenseType {
  id: number; // Expense ID
  description: string; // Description of the expense
  amount: number; // Expense amount
  date: string; // Date of the expense (ISO 8601 formatted string)
}

// User type for frontend use
export interface UserType {
  id: number; // User ID
  username: string; // Username of the user
  email: string; // Email of the user
  expenses: ExpenseType[]; // Array of user's expenses
}
