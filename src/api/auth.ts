import { login } from "@/utils/authService";
import { postApiCall } from "./apiUtils";

interface SignInResponse {
  token: string;
}

interface SignUpResponse {
  token: string;
}

export const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const data = await postApiCall<SignInResponse>("/Users/login", {
    email,
    password,
  });

  if (data.token) {
    await login(data.token);
  }

  return data;
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
): Promise<SignUpResponse> => {
  // Register the user
  const data = await postApiCall<SignUpResponse>("/Users/register", {
    email,
    password,
    username,
  });

  if (data.token) {
    await login(data.token);
  }

  return data;
};
