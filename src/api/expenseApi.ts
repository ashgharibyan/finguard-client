import { login } from "@/utils/authService";
import { getApiCall, postApiCall } from "./apiUtils";

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

export const createExpense = async (
  expense: CreateExpenseBody,
): Promise<CreateExpenseResponse> => {
  const data = await postApiCall<CreateExpenseResponse>("/Expenses", expense);

  return data;
};
