// lib/api-client.ts
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5064/api";

// Client-side Axios instance
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for client-side
apiClient.interceptors.request.use(
  async (config) => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      const sessionCookie = cookies.find((c) =>
        c.trim().startsWith("session="),
      );
      const token = sessionCookie?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  },
);

// Server-side fetch wrapper
export async function serverFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies(); // Add await here
  const session = cookieStore.get("session");

  const url = `${baseURL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(session && { Authorization: `Bearer ${session.value}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect("/sign-in");
      }
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    throw error;
  }
}
