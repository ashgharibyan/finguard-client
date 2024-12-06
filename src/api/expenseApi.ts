import { EnhancedExpenseType } from "@/types/types";
import { getApiCall, postApiCall, putApiCall, deleteApiCall } from "./apiUtils";

interface CreateExpenseResponse {
  id: number;
  description: string;
  amount: number;
  date: Date;
}
export interface CreateExpenseBody {
  description: string;
  amount: number;
  date: Date;
  userId: number;
}

// Create Expense
export const createExpense = async (
  expense: CreateExpenseBody,
): Promise<CreateExpenseResponse> => {
  const data = await postApiCall<CreateExpenseResponse>("/Expenses", expense);
  return data;
};

// Update Expense
export const updateExpense = async (
  id: number,
  expense: Partial<CreateExpenseBody>, // Allow partial updates
): Promise<CreateExpenseResponse> => {
  const data = await putApiCall<CreateExpenseResponse>(
    `/Expenses/${id}`,
    expense,
  );
  return data;
};

// Delete Expense
export const deleteExpense = async (id: number): Promise<void> => {
  await deleteApiCall<void>(`/Expenses/${id}`);
};

// Get Expense
export const getExpense = async (
  id: number,
): Promise<CreateExpenseResponse> => {
  const data = await getApiCall<CreateExpenseResponse>(`/Expenses/${id}`);
  return data;
};

export const getAllExpenses = async (): Promise<EnhancedExpenseType[]> => {
  const data = await getApiCall<EnhancedExpenseType[]>("/Expenses");
  return data;
};
