import { getToken } from "@/utils/authService";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Narek House
// const baseURL = "http://192.168.6.126:8000/api";

// Base URL configuration based on environment or platform
const baseURL = "http://localhost:5064/api";

// Create the Axios instance with the base URL and default headers
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the token from SecureStore
      const token = getToken();

      if (token) {
        // Add the token to the Authorization header with "Token" scheme
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error(
            "Unauthorized access - possible invalid or expired token.",
          );
          redirect("/(auth)/sign-in");
        case 500:
          console.error("Server error. Please try again later.");
          break;
        default:
          console.error("Error:", error.message);
      }
    } else if (error.request) {
      console.error(
        "Network error. Check your internet connection:",
        error.message,
      );
    } else {
      console.error("Unexpected error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
