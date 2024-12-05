import { ExpenseType } from "@/types/types";
import { getApiCall } from "./apiUtils";

interface GetUserResponse {
  id: number;
  username: string;
  email: string;
  expenses: ExpenseType[];
}

export const getUser = async (): Promise<GetUserResponse> => {
  const data = await getApiCall<GetUserResponse>("/Users/me");

  return data;
};
