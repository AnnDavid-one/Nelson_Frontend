import axios from "axios";

// Single Axios instance used for every mutation in the app (POST/PATCH).
// GET requests go through TanStack Query hooks in src/hooks, which call
// this same instance's `.get` under the hood so caching/dedup applies.
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ?? error?.message ?? "Something went wrong. Please try again.";
    return Promise.reject(new Error(typeof message === "string" ? message : JSON.stringify(message)));
  }
);
