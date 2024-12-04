import { getToken } from "@/utils/authService";
import axios from "axios";

// Base URL configuration based on environment or platform
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5064/api";

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
      const token = await getToken();

      if (token) {
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
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (window.location.pathname !== "/sign-in") {
            console.error("Unauthorized access - redirecting to sign-in");
            window.location.href = "/sign-in";
          }
          break;

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
