import { login } from "@/utils/authService";
import { getApiCall, postApiCall } from "./apiUtils";

interface GetUserResponse {
  id: number;
  username: string;
  email: string;
  expenses: any[]; // Adjust type if the structure of `expenses` is known
}

export const getUserById = async (
  email: string,
  password: string,
): Promise<GetUserResponse> => {
  const data = await getApiCall<GetUserResponse>("/Users/login", {
    email,
    password,
  });

  return data;
};
