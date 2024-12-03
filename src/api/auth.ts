import { login } from "@/utils/authService";
import { postApiCall } from "./apiUtils";

interface SignInResponse {
  token: string;
}

interface SignUpResponse {
  id: number;
  username: string;
  email: string;
  expenses: any[]; // Adjust type if the structure of `expenses` is known
}

export const signIn = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  const data = await postApiCall<SignInResponse>("/Users/login", {
    email,
    password,
  });

  // Set session cookie
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
  const signUpData = await postApiCall<SignUpResponse>("/Users", {
    email,
    password,
    username,
  });

  // Automatically log in the user after signing up
  const signInResponse = await signIn(email, password);

  return {
    ...signUpData,
  };
};
