import { login } from "@/utils/authService";
import { getApiCall, postApiCall } from "./apiUtils";

interface GetUserResponse {
  id: number;
  username: string;
  email: string;
  expenses: any[];
}

export const getUser = async (): Promise<GetUserResponse> => {
  const data = await getApiCall<GetUserResponse>("/Users/me");

  return data;
};
