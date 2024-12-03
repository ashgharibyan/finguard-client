import apiClient from "./apiClient"; // Import the configured Axios instance

// GET request
export const getApiCall = async <T = unknown>(
  endpoint: string,
  params = {},
): Promise<T> => {
  const response = await apiClient.get(endpoint, { params });
  console.log(`GET request to ${endpoint} successful:`), response.data;
  return response.data as T;
};

// POST request
export const postApiCall = async <T = unknown>(
  endpoint: string,
  data = {},
): Promise<T> => {
  const response = await apiClient.post(endpoint, data);
  console.log(`POST request to ${endpoint} successful:`);
  return response.data as T;
};
