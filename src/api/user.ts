import { ExpenseType } from "@/types/types";
import { serverFetch } from "./api-client";

interface GetUserResponse {
  id: number;
  username: string;
  email: string;
  expenses: ExpenseType[];
}

export async function getUser(): Promise<GetUserResponse> {
  return serverFetch<GetUserResponse>("/Users/me");
}
